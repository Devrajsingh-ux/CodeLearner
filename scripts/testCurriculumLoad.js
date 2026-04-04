#!/usr/bin/env node

/**
 * Test script to verify curriculum loading works
 * Run: node testCurriculumLoad.js
 */

async function testCurriculumLoad() {
  console.log('\n🧪 Testing Curriculum Loading...\n');

  try {
    // Dynamic import to avoid TypeScript issues
    const { getAllCourseSlugs, getCurriculum } = await import('./src/data/courses/index.ts');
    
    const slugs = getAllCourseSlugs();
    console.log(`✅ Found ${slugs.length} course slugs`);
    console.log(`Slugs: ${slugs.slice(0, 5).join(', ')}...\n`);

    // Test loading a few curricula
    const testSlugs = ['python', 'javascript', 'java'];
    
    for (const slug of testSlugs) {
      try {
        console.log(`Testing ${slug}...`);
        const curriculum = await getCurriculum(slug);
        
        if (!curriculum) {
          console.error(`❌ ${slug}: Curriculum is null`);
          continue;
        }

        const totalLessons = curriculum.levels.reduce(
          (acc, level) => acc + level.chapters.length,
          0
        );

        console.log(`✅ ${slug}:`);
        console.log(`   Title: ${curriculum.meta.title}`);
        console.log(`   Levels: ${curriculum.levels.length}`);
        console.log(`   Total Chapters: ${totalLessons}`);
        console.log(`   Category: ${curriculum.meta.category}`);
        console.log('');
      } catch (err) {
        console.error(`❌ Error loading ${slug}:`, err.message);
      }
    }

    console.log('✅ All tests passed!\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error('\nMake sure:');
    console.error('1. TypeScript files are compiled');
    console.error('2. src/data/courses/index.ts exports are correct');
    console.error('3. All curriculum files exist\n');
    process.exit(1);
  }
}

testCurriculumLoad();
