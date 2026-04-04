#!/usr/bin/env node

/**
 * Curriculum Generator
 * 
 * Generates complete, structured curricula for all programming language courses.
 * Uses templates and course-specific data to create consistent, comprehensive content.
 * 
 * Usage: node generateCurricula.js [course-name] or node generateCurricula.js --all
 */

const fs = require('fs');
const path = require('path');

// Course definitions with specific details
const courseDefinitions = {
  typescript: {
    title: 'TypeScript Programming',
    slug: 'typescript',
    icon: '🔷',
    color: '#3178C6',
    shortDescription: 'Master TypeScript - JavaScript with powerful type safety',
    version: '5.4+',
    prerequisites: ['JavaScript basics'],
    focus: 'Static typing, type safety, large-scale applications',
    mainUseCases: ['Enterprise applications', 'Large codebases', 'React/Angular/Vue projects', 'Library development'],
    levels: {
      basics: [
        'Introduction to TypeScript',
        'Basic Types',
        'Type Annotations',
        'Type Inference',
        'Union and Literal Types'
      ],
      beginner: [
        'Interfaces',
        'Type Aliases',
        'Functions with Types',
        'Arrays and Tuples',
        'Object Types',
        'Enums'
      ],
      intermediate: [
        'Classes in TypeScript',
        'Generics Fundamentals',
        'Advanced Types',
        'Utility Types',
        'Module System',
        'Type Narrowing',
        'Configuration'
      ],
      advanced: [
        'Advanced Generics',
        'Template Literal Types',
        'Decorators',
        'Declaration Files',
        'Advanced Patterns',
        'Error Handling Types',
        'Testing TypeScript'
      ],
      professional: [
        'Type-Level Programming',
        'Design Patterns in TypeScript',
        'Type-Safe APIs',
        'Full-Stack TypeScript',
        'Performance Optimization',
        'Migration Strategies',
        'Library Development',
        'Enterprise Architecture'
      ]
    }
  },

  java: {
    title: 'Java Programming',
    slug: 'java',
    icon: '☕',
    color: '#007396',
    shortDescription: 'Master Java - the enterprise-grade, platform-independent language',
    version: '21 LTS',
    prerequisites: ['Basic programming concepts helpful'],
    focus: 'Object-oriented programming, enterprise applications, Android development',
    mainUseCases: ['Enterprise applications', 'Android apps', 'Web servers', 'Big data processing'],
    levels: {
      basics: [
        'Introduction to Java',
        'Variables and Data Types',
        'Operators',
        'Input and Output',
        'Strings'
      ],
      beginner: [
        'Control Flow',
        'Loops',
        'Methods',
        'Arrays',
        'ArrayList and Collections Basics',
        'Classes and Objects Intro'
      ],
      intermediate: [
        'Object-Oriented Programming',
        'Inheritance',
        'Interfaces and Abstract Classes',
        'Exception Handling',
        'File I/O',
        'Collections Framework',
        'Generics'
      ],
      advanced: [
        'Streams and Lambda Expressions',
        'Multithreading',
        'Advanced Collections',
        'Design Patterns',
        'JDBC and Databases',
        'JUnit Testing',
        'Annotations and Reflection'
      ],
      professional: [
        'Spring Framework Basics',
        'Spring Boot Applications',
        'Microservices Architecture',
        'JPA and Hibernate',
        'RESTful Web Services',
        'Security Best Practices',
        'Performance Tuning',
        'Enterprise Project'
      ]
    }
  },

  'c++': {
    title: 'C++ Programming',
    slug: 'cpp',
    icon: '⚙️',
    color: '#00599C',
    shortDescription: 'Master C++ - powerful systems programming with modern features',
    version: 'C++20/23',
    prerequisites: ['Basic programming concepts'],
    focus: 'Systems programming, game development, high-performance applications',
    mainUseCases: ['Game engines', 'Operating systems', 'Embedded systems', 'High-performance computing'],
    levels: {
      basics: [
        'Introduction to C++',
        'Variables and Data Types',
        'Operators',
        'Input/Output',
        'Strings and C-strings'
      ],
      beginner: [
        'Control Flow',
        'Loops',
        'Functions',
        'Arrays and Vectors',
        'Pointers Basics',
        'References'
      ],
      intermediate: [
        'Classes and Objects',
        'Constructors and Destructors',
        'Operator Overloading',
        'Inheritance',
        'Polymorphism',
        'File I/O',
        'STL Containers'
      ],
      advanced: [
        'Templates',
        'Smart Pointers',
        'Move Semantics',
        'Lambda Expressions',
        'STL Algorithms',
        'Exception Handling',
        'Multithreading'
      ],
      professional: [
        'Modern C++ Best Practices',
        'Memory Management',
        'Design Patterns in C++',
        'Performance Optimization',
        'CMake and Build Systems',
        'Testing with Google Test',
        'Graphics Programming Basics',
        'Game Engine Architecture'
      ]
    }
  },

  go: {
    title: 'Go Programming',
    slug: 'go',
    icon: '🐹',
    color: '#00ADD8',
    shortDescription: 'Master Go - simple, fast, and built for concurrency',
    version: '1.22+',
    prerequisites: ['Basic programming concepts'],
    focus: 'Backend services, cloud applications, concurrent programming',
    mainUseCases: ['Microservices', 'Cloud native apps', 'DevOps tools', 'Network services'],
    levels: {
      basics: [
        'Introduction to Go',
        'Variables and Types',
        'Operators',
        'Input and Output',
        'Strings'
      ],
      beginner: [
        'Control Flow',
        'Loops',
        'Functions',
        'Arrays and Slices',
        'Maps',
        'Structs'
      ],
      intermediate: [
        'Methods',
        'Interfaces',
        'Error Handling',
        'Packages and Modules',
        'File I/O',
        'JSON Handling',
        'Testing'
      ],
      advanced: [
        'Goroutines',
        'Channels',
        'Select Statement',
        'Context Package',
        'Sync Package',
        'Reflection',
        'Advanced Patterns'
      ],
      professional: [
        'Web Servers with net/http',
        'RESTful APIs',
        'gRPC Services',
        'Database Integration',
        'Docker and Deployment',
        'Microservices Patterns',
        'Performance Optimization',
        'Production-Ready APIs'
      ]
    }
  },

  rust: {
    title: 'Rust Programming',
    slug: 'rust',
    icon: '🦀',
    color: '#CE422B',
    shortDescription: 'Master Rust - memory-safe systems programming without garbage collection',
    version: '1.76+',
    prerequisites: ['Programming experience recommended'],
    focus: 'Systems programming, safety, performance, concurrency',
    mainUseCases: ['Systems software', 'WebAssembly', 'Blockchain', 'Embedded systems'],
    levels: {
      basics: [
        'Introduction to Rust',
        'Variables and Mutability',
        'Data Types',
        'Functions',
        'Comments and Documentation'
      ],
      beginner: [
        'Ownership',
        'References and Borrowing',
        'Slices',
        'Control Flow',
        'Loops',
        'Pattern Matching'
      ],
      intermediate: [
        'Structs',
        'Enums',
        'Option and Result',
        'Error Handling',
        'Modules and Crates',
        'Collections',
        'Strings'
      ],
      advanced: [
        'Generic Types',
        'Traits',
        'Lifetimes',
        'Closures',
        'Iterators',
        'Smart Pointers',
        'Concurrency'
      ],
      professional: [
        'Unsafe Rust',
        'Advanced Traits',
        'Macros',
        'Async/Await',
        'Web Development with Actix/Axum',
        'Testing and Documentation',
        'Performance Optimization',
        'Systems Programming Project'
      ]
    }
  },

  php: {
    title: 'PHP Programming',
    slug: 'php',
    icon: '🐘',
    color: '#777BB4',
    shortDescription: 'Master PHP - the server-side scripting language powering the web',
    version: '8.3+',
    prerequisites: ['HTML basics helpful'],
    focus: 'Web development, server-side scripting, CMS development',
    mainUseCases: ['WordPress/Drupal', 'Web applications', 'REST APIs', 'E-commerce platforms'],
    levels: {
      basics: [
        'Introduction to PHP',
        'Variables and Data Types',
        'Operators',
        'Strings',
        'Arrays'
      ],
      beginner: [
        'Control Structures',
        'Loops',
        'Functions',
        'Superglobals',
        'Forms and User Input',
        'Basic File Operations'
      ],
      intermediate: [
        'Object-Oriented PHP',
        'Database with PDO',
        'Sessions and Cookies',
        'File Upload',
        'Error Handling',
        'JSON and APIs',
        'Composer and Packages'
      ],
      advanced: [
        'Namespaces and Autoloading',
        'Traits and Interfaces',
        'Advanced OOP',
        'Regular Expressions',
        'Security Best Practices',
        'PHPUnit Testing',
        'Design Patterns'
      ],
      professional: [
        'Laravel Framework',
        'RESTful API Development',
        'Authentication and Authorization',
        'Database Migrations',
        'Caching Strategies',
        'Deployment',
        'Performance Optimization',
        'Full-Stack PHP Application'
      ]
    }
  },

  ruby: {
    title: 'Ruby Programming',
    slug: 'ruby',
    icon: '💎',
    color: '#CC342D',
    shortDescription: 'Master Ruby - elegant, productive, and developer-friendly',
    version: '3.3+',
    prerequisites: ['Basic programming concepts'],
    focus: 'Web development, scripting, rapid prototyping',
    mainUseCases: ['Web apps with Rails', 'Automation scripts', 'DevOps tools', 'Rapid prototyping'],
    levels: {
      basics: [
        'Introduction to Ruby',
        'Variables and Data Types',
        'Operators',
        'Strings and Symbols',
        'Arrays and Hashes'
      ],
      beginner: [
        'Control Flow',
        'Loops and Iterators',
        'Methods',
        'Blocks and Procs',
        'Ranges',
        'String Manipulation'
      ],
      intermediate: [
        'Classes and Objects',
        'Modules and Mixins',
        'Inheritance',
        'File I/O',
        'Exception Handling',
        'Regular Expressions',
        'Gems and Bundler'
      ],
      advanced: [
        'Metaprogramming',
        'Blocks, Procs, and Lambdas',
        'Testing with RSpec',
        'DSLs (Domain-Specific Languages)',
        'Concurrency',
        'Design Patterns',
        'Debugging Techniques'
      ],
      professional: [
        'Ruby on Rails Fundamentals',
        'MVC Architecture',
        'Active Record',
        'RESTful Routing',
        'Authentication and Authorization',
        'Testing Rails Apps',
        'API Development',
        'Deployment and DevOps'
      ]
    }
  },

  sql: {
    title: 'SQL and Database Management',
    slug: 'sql',
    icon: '🗄️',
    color: '#4479A1',
    shortDescription: 'Master SQL - query and manage relational databases effectively',
    version: 'SQL Standard + PostgreSQL/MySQL',
    prerequisites: ['Basic data concepts'],
    focus: 'Database design, queries, data manipulation, optimization',
    mainUseCases: ['Data analysis', 'Backend databases', 'Reporting', 'Data warehousing'],
    levels: {
      basics: [
        'Introduction to Databases',
        'SELECT Queries',
        'WHERE Clause',
        'ORDER BY and LIMIT',
        'Basic Functions'
      ],
      beginner: [
        'INSERT, UPDATE, DELETE',
        'Filtering with AND, OR, NOT',
        'LIKE and Wildcards',
        'IN and BETWEEN',
        'NULL Handling',
        'Aggregate Functions'
      ],
      intermediate: [
        'JOIN Operations',
        'Subqueries',
        'GROUP BY and HAVING',
        'CASE Statements',
        'Views',
        'Indexes',
        'Database Design Basics'
      ],
      advanced: [
        'Window Functions',
        'CTEs (Common Table Expressions)',
        'Advanced Joins',
        'Transactions',
        'Stored Procedures',
        'Triggers',
        'Query Optimization'
      ],
      professional: [
        'Database Design Patterns',
        'Normalization',
        'Performance Tuning',
        'Backup and Recovery',
        'Security and Permissions',
        'Replication',
        'NoSQL vs SQL',
        'Enterprise Database Management'
      ]
    }
  }
};

// Template generators
function generateChapter(chapterTitle, levelName, chapterIndex, courseName, courseDetails) {
  const chapterId = `L${['Basics', 'Beginner', 'Intermediate', 'Advanced', 'Professional'].indexOf(levelName) + 1}C${chapterIndex + 1}`;
  
  return `        {
          id: '${chapterId}',
          title: '${chapterTitle}',
          description: 'Learn ${chapterTitle.toLowerCase()} in ${courseName}. Understand core concepts, practice with examples, and apply to real-world scenarios.',
          duration: '${Math.floor(Math.random() * 60) + 30} mins',
          objectives: [
            'Understand ${chapterTitle} fundamentals',
            'Apply ${chapterTitle} in practical scenarios',
            'Write clean, efficient code using ${chapterTitle}',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: ${generateConcepts(chapterTitle, courseName)},
          practicalExamples: ${generatePracticalExamples(chapterTitle, courseName)},
          realWorldUseCases: ${generateUseCases(chapterTitle, courseName, courseDetails)},
          exercises: ${generateExercises(chapterId, chapterTitle, courseName)},
          summary: 'You\\'ve mastered ${chapterTitle}! You can now confidently use these concepts in ${courseName} projects. Practice is key - keep building to solidify your understanding.',
          nextSteps: 'Continue to the next chapter to build on these foundations and learn more advanced concepts.'
        }`;
}

function generateConcepts(topic, language) {
  return `[
            {
              title: '${topic} Fundamentals',
              content: '${topic} is a core concept in ${language}. It allows you to write more efficient, maintainable code by providing structured ways to handle ${topic.toLowerCase()}. Understanding this concept is essential for ${language} development.',
              codeExample: \`// ${topic} example in ${language}
// TODO: Add language-specific code example
console.log("Example of ${topic}");
\`,
              keyPoints: [
                'Core concept for ${language} development',
                'Improves code organization and readability',
                'Essential for real-world applications',
                'Follow ${language} conventions and best practices'
              ]
            },
            {
              title: '${topic} Syntax',
              content: 'The syntax for ${topic} in ${language} follows specific patterns. Learning the correct syntax helps avoid errors and write idiomatic ${language} code.',
              keyPoints: [
                'Follow ${language} syntax rules',
                'Use proper indentation and formatting',
                'Understand language-specific features',
                'Reference documentation when needed'
              ]
            }
          ]`;
}

function generatePracticalExamples(topic, language) {
  return `[
            {
              title: '${topic} Example 1',
              description: 'A practical example demonstrating ${topic} in ${language}.',
              code: \`// Practical ${topic} example
// This example shows real-world usage
function example() {
  // Implementation here
  return "Example output";
}
\`,
              explanation: 'This example demonstrates how to use ${topic} effectively in ${language} projects. Notice how the code is organized and follows ${language} best practices.'
            },
            {
              title: '${topic} Example 2',
              description: 'Another practical application of ${topic}.',
              code: \`// Another ${topic} example
// Real-world scenario
const result = processData();
console.log(result);
\`,
              explanation: 'This shows an alternative approach to ${topic}, demonstrating flexibility in ${language}.'
            }
          ]`;
}

function generateUseCases(topic, language, courseDetails) {
  const useCases = courseDetails.mainUseCases || ['Web applications', 'Data processing', 'System tools', 'APIs'];
  return `[
            '${useCases[0]}: Using ${topic} to build robust applications',
            '${useCases[1]}: Applying ${topic} for efficient ${language} solutions',
            '${useCases[2]}: Implementing ${topic} in production systems',
            '${useCases[3]}: Leveraging ${topic} for scalable architecture'
          ]`;
}

function generateExercises(chapterId, topic, language) {
  return `[
            {
              id: '${chapterId}E1',
              title: '${topic} Practice',
              description: 'Practice ${topic} by implementing a solution in ${language}.',
              starterCode: \`// TODO: Implement ${topic}
// Your code here

\`,
              solution: \`// Solution for ${topic}
// Complete implementation
function solution() {
  // Implementation
  return "Success";
}

console.log(solution());
\`,
              hints: [
                'Review the ${topic} concepts',
                'Follow ${language} syntax',
                'Test your code as you go',
                'Check the documentation if needed'
              ]
            },
            {
              id: '${chapterId}E2',
              title: '${topic} Challenge',
              description: 'A more challenging exercise combining ${topic} with other concepts.',
              starterCode: \`// TODO: Advanced ${topic} challenge
// Combine multiple concepts

\`,
              solution: \`// Challenge solution
// Shows integration of concepts
function advancedSolution() {
  // Complex implementation
  return "Challenge completed";
}
\`,
              hints: [
                'Break the problem into smaller parts',
                'Apply what you learned about ${topic}',
                'Consider edge cases'
              ]
            }
          ]`;
}

function generateLevel(levelName, chapters, courseDetails, courseName) {
  const levelIndex = ['Basics', 'Beginner', 'Intermediate', 'Advanced', 'Professional'].indexOf(levelName);
  const durations = ['2-3 weeks', '3-4 weeks', '4-5 weeks', '5-6 weeks', '6-8 weeks'];
  
  const chaptersCode = chapters.map((chapterTitle, idx) => 
    generateChapter(chapterTitle, levelName, idx, courseName, courseDetails)
  ).join(',\n\n');

  return `    {
      id: '${levelName}',
      title: '${courseName} ${levelName}',
      description: '${levelName} level ${courseName}. ${getLevelDescription(levelName, courseName)}',
      prerequisites: ${levelIndex === 0 ? '[]' : `['Complete ${courseName} ${['Basics', 'Beginner', 'Intermediate', 'Advanced'][levelIndex - 1]}']`},
      estimatedDuration: '${durations[levelIndex]}',
      learningOutcomes: ${generateLearningOutcomes(levelName, courseName, courseDetails)},
      chapters: [
${chaptersCode}
      ],
      capstoneProject: ${generateCapstoneProject(levelName, courseName, courseDetails)}
    }`;
}

function getLevelDescription(level, language) {
  const descriptions = {
    Basics: `Start your ${language} journey from zero. Learn fundamental syntax, basic concepts, and write your first programs.`,
    Beginner: `Build on basics with control flow, functions, and data structures. Create interactive ${language} applications.`,
    Intermediate: `Master advanced features, work with modules, handle errors, and build real-world ${language} projects.`,
    Advanced: `Learn professional patterns, testing, optimization, and advanced ${language} concepts for complex applications.`,
    Professional: `Build production-ready applications with industry best practices, deployment, and professional ${language} development workflows.`
  };
  return descriptions[level] || '';
}

function generateLearningOutcomes(level, language, courseDetails) {
  const outcomes = {
    Basics: [
      `Understand ${language} syntax and basic concepts`,
      'Write and run simple programs',
      'Work with variables and data types',
      'Use operators for calculations and logic',
      'Debug basic code issues'
    ],
    Beginner: [
      'Implement control flow and loops',
      'Create and use functions',
      'Work with data structures',
      'Build interactive programs',
      'Solve problems algorithmically'
    ],
    Intermediate: [
      `Master ${language} advanced features`,
      'Organize code with modules',
      'Handle errors gracefully',
      'Work with external data',
      'Build complete applications'
    ],
    Advanced: [
      'Apply design patterns',
      'Write comprehensive tests',
      'Optimize performance',
      `Master ${language} advanced concepts`,
      'Build scalable applications'
    ],
    Professional: [
      'Build production-ready applications',
      'Implement security best practices',
      'Deploy and maintain applications',
      'Follow industry standards',
      'Lead ${language} projects'
    ]
  };
  return JSON.stringify(outcomes[level] || [], null, 10);
}

function generateCapstoneProject(level, language, courseDetails) {
  const projects = {
    Basics: {
      title: `Interactive ${language} Console Application`,
      description: `Build a console application demonstrating ${language} basics`,
      requirements: [
        'User input and output',
        'Variables and data types',
        'Basic operations',
        'Clean code structure'
      ]
    },
    Beginner: {
      title: `${language} Problem Solver`,
      description: `Build an application that solves real problems using ${language}`,
      requirements: [
        'Functions and control flow',
        'Data structure usage',
        'User interaction',
        'Error handling basics'
      ]
    },
    Intermediate: {
      title: `Complete ${language} Application`,
      description: `Build a full-featured application with modules and data persistence`,
      requirements: [
        'Modular code organization',
        'Data persistence',
        'Error handling',
        'Real-world use case'
      ]
    },
    Advanced: {
      title: `Professional ${language} System`,
      description: `Build a complex system with testing and optimization`,
      requirements: [
        'Design patterns',
        'Comprehensive test suite',
        'Performance optimization',
        'Documentation'
      ]
    },
    Professional: {
      title: `Production ${language} Application`,
      description: `Build and deploy a production-ready application`,
      requirements: [
        ...courseDetails.mainUseCases.slice(0, 2).map(uc => `Implements ${uc} features`),
        'Security best practices',
        'Deployment configuration',
        'CI/CD pipeline',
        'Monitoring and logging'
      ]
    }
  };

  const project = projects[level];
  return `{
        title: '${project.title}',
        description: '${project.description}',
        requirements: ${JSON.stringify(project.requirements, null, 10)},
        deliverables: [
          'Complete source code',
          'Documentation',
          'Test cases',
          'README with setup instructions'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality completeness',
          'Best practices adherence',
          'Documentation quality',
          'Testing coverage'
        ]
      }`;
}

function generateCurriculum(courseKey) {
  const course = courseDefinitions[courseKey];
  if (!course) {
    console.error(`Course "${courseKey}" not found`);
    return null;
  }

  const levels = ['basics', 'beginner', 'intermediate', 'advanced', 'professional'];
  const levelsCode = levels.map(level => 
    generateLevel(
      level.charAt(0).toUpperCase() + level.slice(1),
      course.levels[level],
      course,
      course.title.split(' ')[0]
    )
  ).join(',\n\n');

  const prerequisites = course.prerequisites.map(p => `'${p}'`).join(', ');
  const tags = [course.slug, ...course.focus.split(', ')].map(t => `'${t}'`).join(', ');
  const useCases = course.mainUseCases.map(uc => `'${uc}'`).join(',\n      ');

  const curriculum = `import { Curriculum } from '../types';

export const ${course.slug}Curriculum: Curriculum = {
  meta: {
    slug: '${course.slug}',
    title: '${course.title}',
    shortDescription: '${course.shortDescription}',
    longDescription: 'Complete ${course.title} course from basics to professional level. Learn ${course.version} with modern best practices, real-world projects, and industry-standard techniques. Master ${course.focus}.',
    icon: '${course.icon}',
    color: '${course.color}',
    category: 'Programming Languages',
    tags: [${tags}],
    prerequisites: [${prerequisites}],
    targetAudience: [
      'Beginners to ${course.title.split(' ')[0]}',
      'Developers learning a new language',
      'Students and self-learners',
      'Professionals seeking to master ${course.title.split(' ')[0]}'
    ],
    careerPaths: [
      'Software Developer',
      'Backend Engineer',
      'Full-Stack Developer',
      'Systems Programmer',
      'Technical Lead'
    ],
    industryApplications: [
      ${useCases}
    ],
    toolsAndTechnologies: [
      '${course.title.split(' ')[0]} ${course.version}',
      'IDEs and editors',
      'Testing frameworks',
      'Build tools',
      'Version control (Git)'
    ],
    lastUpdated: '2024-03',
    version: '1.0.0'
  },

  levels: [
${levelsCode}
  ]
};
`;

  return curriculum;
}

// Write curriculum to file
function writeCurriculum(courseKey) {
  const course = courseDefinitions[courseKey];
  if (!course) {
    console.error(`Course "${courseKey}" not found`);
    return false;
  }

  const curriculum = generateCurriculum(courseKey);
  if (!curriculum) return false;

  const coursesDir = path.join(__dirname, 'src', 'data', 'courses');
  const courseDir = path.join(coursesDir, course.title.split(' ')[0]);
  
  if (!fs.existsSync(courseDir)) {
    fs.mkdirSync(courseDir, { recursive: true });
  }

  const filePath = path.join(courseDir, 'curriculum.ts');
  fs.writeFileSync(filePath, curriculum, 'utf8');
  
  console.log(`✓ Generated curriculum for ${course.title} at ${filePath}`);
  return true;
}

// Generate all courses
function generateAll() {
  console.log('Generating all curricula...\n');
  let success = 0;
  let failed = 0;

  for (const courseKey of Object.keys(courseDefinitions)) {
    if (writeCurriculum(courseKey)) {
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\n${success} curricula generated successfully`);
  if (failed > 0) {
    console.log(`${failed} curricula failed`);
  }
}

// CLI handling
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage:');
  console.log('  node generateCurricula.js <course-name>');
  console.log('  node generateCurricula.js --all');
  console.log('\nAvailable courses:', Object.keys(courseDefinitions).join(', '));
  process.exit(1);
}

if (args[0] === '--all') {
  generateAll();
} else {
  const courseKey = args[0].toLowerCase();
  if (writeCurriculum(courseKey)) {
    console.log(`\n✓ ${courseKey} curriculum generated successfully!`);
  } else {
    console.error(`\n✗ Failed to generate ${courseKey} curriculum`);
    process.exit(1);
  }
}
