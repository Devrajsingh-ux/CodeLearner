/**
 * /api/admin/courses/seed-curricula
 * 
 * POST → Import all 49 generated curricula into Appwrite database
 * Creates course records and lessons from the TypeScript curriculum files
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_COURSES,
  COL_LESSONS,
} from "@/lib/appwriteServer";
import { requireAdminAuth } from "@/security/auth";
import { getAllCourseSlugs, getCurriculum } from "@/data/courses/index";
import type { Curriculum, Level, Chapter } from "@/data/courses/types";

export async function POST(req: NextRequest) {
  try {
    // Require admin authentication
    const adminSession = await requireAdminAuth(req);
    if (!adminSession) {
      return NextResponse.json(
        { error: "Unauthorized. Admin login required." },
        { status: 401 }
      );
    }

    const { databases } = createAdminClient();
    const slugs = getAllCourseSlugs();
    
    console.log(`Starting import of ${slugs.length} courses...`);
    
    const results = {
      success: [] as string[],
      failed: [] as { slug: string; error: string }[],
      skipped: [] as string[],
    };

    for (const slug of slugs) {
      try {
        console.log(`Processing course: ${slug}`);
        
        // Check if course already exists
        const existing = await databases.listDocuments(DB_ID, COL_COURSES, [
          Query.equal("slug", slug),
          Query.limit(1),
        ]);

        if (existing.total > 0) {
          console.log(`Skipping ${slug} - already exists`);
          results.skipped.push(slug);
          continue;
        }

        // Load curriculum
        const curriculum = await getCurriculum(slug);
        if (!curriculum) {
          console.error(`Failed to load curriculum for ${slug}`);
          results.failed.push({ slug, error: "Curriculum not found" });
          continue;
        }

        // Calculate totals
        const totalLessons = curriculum.levels.reduce(
          (acc, level) => acc + level.chapters.length,
          0
        );
        const estimatedHours = curriculum.levels.reduce((acc, level) => {
          const hours = parseInt(level.estimatedDuration?.match(/(\d+)/)?.[1] || "1");
          return acc + hours;
        }, 0);

        console.log(`Creating course ${slug} with ${totalLessons} lessons`);

        // Create course document with all required fields
        const courseData = {
          slug: curriculum.meta.slug,
          title: curriculum.meta.title,
          description: curriculum.meta.longDescription || curriculum.meta.shortDescription,
          category: curriculum.meta.category || "Languages",
          difficulty: "Beginner",
          lessonsCount: totalLessons,
          duration: `${Math.max(estimatedHours * 7, 10)}h`,
          enrolledCount: 0,
          rating: 4.5,
          tags: Array.isArray(curriculum.meta.tags) ? curriculum.meta.tags.join(',') : '',
          status: "published",
          isFeatured: false,
          isNew: true,
          instructor: "CodeLearner Team",
          completionRate: 0,
        };

        await databases.createDocument(
          DB_ID,
          COL_COURSES,
          ID.unique(),
          courseData
        );

        console.log(`Course ${slug} created successfully`);

        // Create lessons from all levels and chapters
        let lessonOrder = 1;
        for (const level of curriculum.levels) {
          for (const chapter of level.chapters) {
            const lessonData = {
              track: slug,
              slug: `lesson-${lessonOrder}`,
              title: `${level.title}: ${chapter.title}`,
              type: "exercise",
              duration: chapter.duration || "45m",
              xp: 50,
              isLocked: lessonOrder > 1,
              content: formatLessonContent(chapter, level),
              code: chapter.exercises?.[0]?.starterCode || `// Start coding here\n// This is ${curriculum.meta.title} Lesson ${lessonOrder}\n`,
              language: detectLanguage(curriculum.meta.slug),
              filename: `${chapter.id.toLowerCase()}.${getFileExtension(curriculum.meta.slug)}`,
              objectives: Array.isArray(chapter.objectives) ? JSON.stringify(chapter.objectives) : JSON.stringify([]),
            };

            await databases.createDocument(
              DB_ID,
              COL_LESSONS,
              ID.unique(),
              lessonData
            );
            
            lessonOrder++;
          }
        }

        console.log(`Created ${lessonOrder - 1} lessons for ${slug}`);
        results.success.push(slug);
        
      } catch (error: any) {
        console.error(`Error importing ${slug}:`, error);
        results.failed.push({ slug, error: error.message || String(error) });
      }
    }

    console.log(`Import completed: ${results.success.length} success, ${results.failed.length} failed, ${results.skipped.length} skipped`);

    return NextResponse.json({
      message: "Curriculum import completed",
      total: slugs.length,
      success: results.success.length,
      failed: results.failed.length,
      skipped: results.skipped.length,
      details: results,
    });

  } catch (error: any) {
    console.error("Seed curricula error:", error);
    return NextResponse.json(
      { error: "Failed to seed curricula", details: error.message || String(error) },
      { status: 500 }
    );
  }
}

function formatLessonContent(chapter: Chapter, level: Level): string {
  let content = `# ${chapter.title}\n\n`;
  content += `${chapter.description}\n\n`;
  
  content += `## Learning Objectives\n\n`;
  chapter.objectives?.forEach((obj) => {
    content += `- ${obj}\n`;
  });
  content += `\n`;

  if (chapter.concepts && chapter.concepts.length > 0) {
    content += `## Key Concepts\n\n`;
    chapter.concepts.forEach((concept) => {
      content += `### ${concept.title}\n\n`;
      content += `${concept.content}\n\n`;
      if (concept.codeExample) {
        content += `\`\`\`\n${concept.codeExample}\n\`\`\`\n\n`;
      }
      if (concept.keyPoints && concept.keyPoints.length > 0) {
        concept.keyPoints.forEach((point) => {
          content += `- ${point}\n`;
        });
        content += `\n`;
      }
    });
  }

  if (chapter.practicalExamples && chapter.practicalExamples.length > 0) {
    content += `## Practical Examples\n\n`;
    chapter.practicalExamples.forEach((example) => {
      content += `### ${example.title}\n\n`;
      content += `${example.description}\n\n`;
      if (example.code) {
        content += `\`\`\`\n${example.code}\n\`\`\`\n\n`;
      }
      content += `${example.explanation}\n\n`;
    });
  }

  if (chapter.realWorldUseCases && chapter.realWorldUseCases.length > 0) {
    content += `## Real-World Use Cases\n\n`;
    chapter.realWorldUseCases.forEach((useCase) => {
      content += `- ${useCase}\n`;
    });
    content += `\n`;
  }

  if (chapter.summary) {
    content += `## Summary\n\n${chapter.summary}\n\n`;
  }

  if (chapter.nextSteps) {
    content += `## Next Steps\n\n${chapter.nextSteps}\n`;
  }

  return content;
}

function detectLanguage(slug: string): string {
  const langMap: Record<string, string> = {
    python: "python",
    javascript: "javascript",
    typescript: "typescript",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "csharp",
    go: "go",
    rust: "rust",
    php: "php",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    dart: "dart",
    html: "html",
    css: "css",
    sass: "scss",
    less: "less",
    sql: "sql",
    graphql: "graphql",
    shell: "bash",
    powershell: "powershell",
  };
  return langMap[slug.toLowerCase()] || "javascript";
}

function getFileExtension(slug: string): string {
  const extMap: Record<string, string> = {
    python: "py",
    javascript: "js",
    typescript: "ts",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "cs",
    go: "go",
    rust: "rs",
    php: "php",
    ruby: "rb",
    swift: "swift",
    kotlin: "kt",
    dart: "dart",
    html: "html",
    css: "css",
    sass: "scss",
    less: "less",
    sql: "sql",
    graphql: "graphql",
    shell: "sh",
    powershell: "ps1",
  };
  return extMap[slug.toLowerCase()] || "txt";
}
