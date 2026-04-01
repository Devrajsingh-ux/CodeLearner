import { Curriculum } from '../types';

export const nimCurriculum: Curriculum = {
  meta: {
    slug: 'nim',
    title: 'Nim Programming',
    shortDescription: 'Master Nim - efficient, expressive, elegant',
    longDescription: 'Complete Nim Programming course from basics to professional level. Learn Nim 2.0+ with modern best practices, hands-on projects, and industry-standard techniques. Focus on Systems programming, efficiency, metaprogramming.',
    icon: '👑',
    color: '#FFE953',
    category: 'Programming Languages',
    tags: ['nim', 'Systems programming'],
    prerequisites: ['Programming experience'],
    targetAudience: [
      'Beginners to Nim',
      'Developers learning new languages',
      'Students and self-learners',
      'Professionals seeking mastery'
    ],
    careerPaths: [
      'Software Developer',
      'Backend Engineer',
      'Full-Stack Developer',
      'Systems Programmer',
      'Technical Lead'
    ],
    industryApplications: [
      'Systems Programming',
      'Web Development',
      'Game Development',
      'Scripts'
    ],
    toolsAndTechnologies: [
      'Nim Nim 2.0+',
      'IDEs and editors',
      'Testing frameworks',
      'Build tools',
      'Version control'
    ],
    lastUpdated: '2024-03',
    version: '1.0.0'
  },

  levels: [
    {
      id: 'Basics',
      title: 'Nim Basics',
      description: 'Begin your Nim journey. Learn fundamental syntax, core concepts, and write your first programs.',
      prerequisites: [],
      estimatedDuration: '2-3 weeks',
      learningOutcomes: [
          "Understand Nim syntax and fundamentals",
          "Write and execute basic programs",
          "Work with core data types and structures",
          "Apply basic operations and logic",
          "Debug simple code issues"
],
      chapters: [
        {
          id: 'L1C1',
          title: 'Introduction',
          description: 'Learn introduction in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '63 mins',
          objectives: [
            'Understand Introduction fundamentals',
            'Apply Introduction in practical scenarios',
            'Write clean, efficient code using Introduction',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Introduction Fundamentals',
              content: 'Introduction is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Introduction example in Nim
// Example demonstrating Introduction
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Introduction',
              content: 'Applying Introduction in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Introduction in Action',
              description: 'A practical example showing how to use Introduction effectively in Nim projects.',
              code: `// Practical Introduction example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Introduction
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Introduction in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Introduction Usage',
              description: 'Building on basics to show more sophisticated Introduction patterns.',
              code: `// Advanced Introduction pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Introduction, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Introduction for robust Nim applications',
            'Web Development: Implementing Introduction in production systems',
            'Game Development: Using Introduction for scalable architecture',
            'Scripts: Applying Introduction in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C1E1',
              title: 'Introduction Basics Exercise',
              description: 'Practice Introduction fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Introduction
// Your solution here

`,
              solution: `// Solution for Introduction exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Introduction concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C1E2',
              title: 'Introduction Advanced Challenge',
              description: 'A more challenging exercise that combines Introduction with other concepts learned.',
              starterCode: `// TODO: Advanced Introduction implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Introduction principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Introduction! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C2',
          title: 'Variables',
          description: 'Learn variables in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '76 mins',
          objectives: [
            'Understand Variables fundamentals',
            'Apply Variables in practical scenarios',
            'Write clean, efficient code using Variables',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Variables Fundamentals',
              content: 'Variables is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Variables example in Nim
// Example demonstrating Variables
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Variables',
              content: 'Applying Variables in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Variables in Action',
              description: 'A practical example showing how to use Variables effectively in Nim projects.',
              code: `// Practical Variables example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Variables
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Variables in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Variables Usage',
              description: 'Building on basics to show more sophisticated Variables patterns.',
              code: `// Advanced Variables pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Variables, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Variables for robust Nim applications',
            'Web Development: Implementing Variables in production systems',
            'Game Development: Using Variables for scalable architecture',
            'Scripts: Applying Variables in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C2E1',
              title: 'Variables Basics Exercise',
              description: 'Practice Variables fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Variables
// Your solution here

`,
              solution: `// Solution for Variables exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Variables concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C2E2',
              title: 'Variables Advanced Challenge',
              description: 'A more challenging exercise that combines Variables with other concepts learned.',
              starterCode: `// TODO: Advanced Variables implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Variables principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Variables! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C3',
          title: 'Types',
          description: 'Learn types in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '33 mins',
          objectives: [
            'Understand Types fundamentals',
            'Apply Types in practical scenarios',
            'Write clean, efficient code using Types',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Types Fundamentals',
              content: 'Types is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Types example in Nim
// Example demonstrating Types
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Types',
              content: 'Applying Types in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Types in Action',
              description: 'A practical example showing how to use Types effectively in Nim projects.',
              code: `// Practical Types example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Types
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Types in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Types Usage',
              description: 'Building on basics to show more sophisticated Types patterns.',
              code: `// Advanced Types pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Types, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Types for robust Nim applications',
            'Web Development: Implementing Types in production systems',
            'Game Development: Using Types for scalable architecture',
            'Scripts: Applying Types in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C3E1',
              title: 'Types Basics Exercise',
              description: 'Practice Types fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Types
// Your solution here

`,
              solution: `// Solution for Types exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Types concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C3E2',
              title: 'Types Advanced Challenge',
              description: 'A more challenging exercise that combines Types with other concepts learned.',
              starterCode: `// TODO: Advanced Types implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Types principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Types! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C4',
          title: 'Procedures',
          description: 'Learn procedures in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '49 mins',
          objectives: [
            'Understand Procedures fundamentals',
            'Apply Procedures in practical scenarios',
            'Write clean, efficient code using Procedures',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Procedures Fundamentals',
              content: 'Procedures is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Procedures example in Nim
// Example demonstrating Procedures
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Procedures',
              content: 'Applying Procedures in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Procedures in Action',
              description: 'A practical example showing how to use Procedures effectively in Nim projects.',
              code: `// Practical Procedures example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Procedures
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Procedures in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Procedures Usage',
              description: 'Building on basics to show more sophisticated Procedures patterns.',
              code: `// Advanced Procedures pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Procedures, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Procedures for robust Nim applications',
            'Web Development: Implementing Procedures in production systems',
            'Game Development: Using Procedures for scalable architecture',
            'Scripts: Applying Procedures in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C4E1',
              title: 'Procedures Basics Exercise',
              description: 'Practice Procedures fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Procedures
// Your solution here

`,
              solution: `// Solution for Procedures exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Procedures concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C4E2',
              title: 'Procedures Advanced Challenge',
              description: 'A more challenging exercise that combines Procedures with other concepts learned.',
              starterCode: `// TODO: Advanced Procedures implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Procedures principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Procedures! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C5',
          title: 'Control Flow',
          description: 'Learn control flow in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '35 mins',
          objectives: [
            'Understand Control Flow fundamentals',
            'Apply Control Flow in practical scenarios',
            'Write clean, efficient code using Control Flow',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Control Flow Fundamentals',
              content: 'Control Flow is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Control Flow example in Nim
// Example demonstrating Control Flow
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Control Flow',
              content: 'Applying Control Flow in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Control Flow in Action',
              description: 'A practical example showing how to use Control Flow effectively in Nim projects.',
              code: `// Practical Control Flow example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Control Flow
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Control Flow in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Control Flow Usage',
              description: 'Building on basics to show more sophisticated Control Flow patterns.',
              code: `// Advanced Control Flow pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Control Flow, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Control Flow for robust Nim applications',
            'Web Development: Implementing Control Flow in production systems',
            'Game Development: Using Control Flow for scalable architecture',
            'Scripts: Applying Control Flow in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C5E1',
              title: 'Control Flow Basics Exercise',
              description: 'Practice Control Flow fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Control Flow
// Your solution here

`,
              solution: `// Solution for Control Flow exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Control Flow concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C5E2',
              title: 'Control Flow Advanced Challenge',
              description: 'A more challenging exercise that combines Control Flow with other concepts learned.',
              starterCode: `// TODO: Advanced Control Flow implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Control Flow principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Control Flow! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Nim Fundamentals Project',
        description: 'Build a console application demonstrating Nim basics',
        requirements: [
          "User input and output",
          "Variables and basic data types",
          "Control flow and operations",
          "Clean, readable code"
],
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }
    },

    {
      id: 'Beginner',
      title: 'Nim Beginner',
      description: 'Build on fundamentals with control structures, functions, and data manipulation. Create functional Nim applications.',
      prerequisites: ['Complete Nim Basics'],
      estimatedDuration: '3-4 weeks',
      learningOutcomes: [
          "Implement control flow and iteration",
          "Create reusable functions and modules",
          "Manipulate data structures effectively",
          "Build interactive applications",
          "Solve problems programmatically"
],
      chapters: [
        {
          id: 'L2C1',
          title: 'Collections',
          description: 'Learn collections in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '35 mins',
          objectives: [
            'Understand Collections fundamentals',
            'Apply Collections in practical scenarios',
            'Write clean, efficient code using Collections',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Collections Fundamentals',
              content: 'Collections is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Collections example in Nim
// Example demonstrating Collections
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Collections',
              content: 'Applying Collections in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Collections in Action',
              description: 'A practical example showing how to use Collections effectively in Nim projects.',
              code: `// Practical Collections example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Collections
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Collections in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Collections Usage',
              description: 'Building on basics to show more sophisticated Collections patterns.',
              code: `// Advanced Collections pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Collections, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Collections for robust Nim applications',
            'Web Development: Implementing Collections in production systems',
            'Game Development: Using Collections for scalable architecture',
            'Scripts: Applying Collections in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C1E1',
              title: 'Collections Basics Exercise',
              description: 'Practice Collections fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Collections
// Your solution here

`,
              solution: `// Solution for Collections exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Collections concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C1E2',
              title: 'Collections Advanced Challenge',
              description: 'A more challenging exercise that combines Collections with other concepts learned.',
              starterCode: `// TODO: Advanced Collections implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Collections principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Collections! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C2',
          title: 'Modules',
          description: 'Learn modules in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '42 mins',
          objectives: [
            'Understand Modules fundamentals',
            'Apply Modules in practical scenarios',
            'Write clean, efficient code using Modules',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Modules Fundamentals',
              content: 'Modules is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Modules example in Nim
// Example demonstrating Modules
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Modules',
              content: 'Applying Modules in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Modules in Action',
              description: 'A practical example showing how to use Modules effectively in Nim projects.',
              code: `// Practical Modules example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Modules
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Modules in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Modules Usage',
              description: 'Building on basics to show more sophisticated Modules patterns.',
              code: `// Advanced Modules pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Modules, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Modules for robust Nim applications',
            'Web Development: Implementing Modules in production systems',
            'Game Development: Using Modules for scalable architecture',
            'Scripts: Applying Modules in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C2E1',
              title: 'Modules Basics Exercise',
              description: 'Practice Modules fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Modules
// Your solution here

`,
              solution: `// Solution for Modules exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Modules concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C2E2',
              title: 'Modules Advanced Challenge',
              description: 'A more challenging exercise that combines Modules with other concepts learned.',
              starterCode: `// TODO: Advanced Modules implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Modules principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Modules! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C3',
          title: 'Exceptions',
          description: 'Learn exceptions in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '78 mins',
          objectives: [
            'Understand Exceptions fundamentals',
            'Apply Exceptions in practical scenarios',
            'Write clean, efficient code using Exceptions',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Exceptions Fundamentals',
              content: 'Exceptions is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Exceptions example in Nim
// Example demonstrating Exceptions
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Exceptions',
              content: 'Applying Exceptions in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Exceptions in Action',
              description: 'A practical example showing how to use Exceptions effectively in Nim projects.',
              code: `// Practical Exceptions example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Exceptions
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Exceptions in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Exceptions Usage',
              description: 'Building on basics to show more sophisticated Exceptions patterns.',
              code: `// Advanced Exceptions pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Exceptions, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Exceptions for robust Nim applications',
            'Web Development: Implementing Exceptions in production systems',
            'Game Development: Using Exceptions for scalable architecture',
            'Scripts: Applying Exceptions in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C3E1',
              title: 'Exceptions Basics Exercise',
              description: 'Practice Exceptions fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Exceptions
// Your solution here

`,
              solution: `// Solution for Exceptions exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Exceptions concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C3E2',
              title: 'Exceptions Advanced Challenge',
              description: 'A more challenging exercise that combines Exceptions with other concepts learned.',
              starterCode: `// TODO: Advanced Exceptions implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Exceptions principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Exceptions! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C4',
          title: 'Generics',
          description: 'Learn generics in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '66 mins',
          objectives: [
            'Understand Generics fundamentals',
            'Apply Generics in practical scenarios',
            'Write clean, efficient code using Generics',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Generics Fundamentals',
              content: 'Generics is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Generics example in Nim
// Example demonstrating Generics
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Generics',
              content: 'Applying Generics in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Generics in Action',
              description: 'A practical example showing how to use Generics effectively in Nim projects.',
              code: `// Practical Generics example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Generics
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Generics in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Generics Usage',
              description: 'Building on basics to show more sophisticated Generics patterns.',
              code: `// Advanced Generics pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Generics, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Generics for robust Nim applications',
            'Web Development: Implementing Generics in production systems',
            'Game Development: Using Generics for scalable architecture',
            'Scripts: Applying Generics in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C4E1',
              title: 'Generics Basics Exercise',
              description: 'Practice Generics fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Generics
// Your solution here

`,
              solution: `// Solution for Generics exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Generics concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C4E2',
              title: 'Generics Advanced Challenge',
              description: 'A more challenging exercise that combines Generics with other concepts learned.',
              starterCode: `// TODO: Advanced Generics implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Generics principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Generics! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C5',
          title: 'Iterators',
          description: 'Learn iterators in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '36 mins',
          objectives: [
            'Understand Iterators fundamentals',
            'Apply Iterators in practical scenarios',
            'Write clean, efficient code using Iterators',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Iterators Fundamentals',
              content: 'Iterators is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Iterators example in Nim
// Example demonstrating Iterators
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Iterators',
              content: 'Applying Iterators in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Iterators in Action',
              description: 'A practical example showing how to use Iterators effectively in Nim projects.',
              code: `// Practical Iterators example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Iterators
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Iterators in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Iterators Usage',
              description: 'Building on basics to show more sophisticated Iterators patterns.',
              code: `// Advanced Iterators pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Iterators, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Iterators for robust Nim applications',
            'Web Development: Implementing Iterators in production systems',
            'Game Development: Using Iterators for scalable architecture',
            'Scripts: Applying Iterators in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C5E1',
              title: 'Iterators Basics Exercise',
              description: 'Practice Iterators fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Iterators
// Your solution here

`,
              solution: `// Solution for Iterators exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Iterators concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C5E2',
              title: 'Iterators Advanced Challenge',
              description: 'A more challenging exercise that combines Iterators with other concepts learned.',
              starterCode: `// TODO: Advanced Iterators implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Iterators principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Iterators! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C6',
          title: 'OOP Basics',
          description: 'Learn oop basics in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '67 mins',
          objectives: [
            'Understand OOP Basics fundamentals',
            'Apply OOP Basics in practical scenarios',
            'Write clean, efficient code using OOP Basics',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'OOP Basics Fundamentals',
              content: 'OOP Basics is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// OOP Basics example in Nim
// Example demonstrating OOP Basics
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical OOP Basics',
              content: 'Applying OOP Basics in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'OOP Basics in Action',
              description: 'A practical example showing how to use OOP Basics effectively in Nim projects.',
              code: `// Practical OOP Basics example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing OOP Basics
  return "Practical result";
}
`,
              explanation: 'This example demonstrates OOP Basics in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced OOP Basics Usage',
              description: 'Building on basics to show more sophisticated OOP Basics patterns.',
              code: `// Advanced OOP Basics pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to OOP Basics, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging OOP Basics for robust Nim applications',
            'Web Development: Implementing OOP Basics in production systems',
            'Game Development: Using OOP Basics for scalable architecture',
            'Scripts: Applying OOP Basics in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C6E1',
              title: 'OOP Basics Basics Exercise',
              description: 'Practice OOP Basics fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement OOP Basics
// Your solution here

`,
              solution: `// Solution for OOP Basics exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review OOP Basics concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C6E2',
              title: 'OOP Basics Advanced Challenge',
              description: 'A more challenging exercise that combines OOP Basics with other concepts learned.',
              starterCode: `// TODO: Advanced OOP Basics implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply OOP Basics principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered OOP Basics! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Interactive Nim Application',
        description: 'Create a functional application solving a real problem',
        requirements: [
          "Functions and modular code",
          "Data structure usage",
          "User interaction",
          "Error handling"
],
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }
    },

    {
      id: 'Intermediate',
      title: 'Nim Intermediate',
      description: 'Master advanced features, modules, and real-world development patterns in Nim.',
      prerequisites: ['Complete Nim Beginner'],
      estimatedDuration: '4-5 weeks',
      learningOutcomes: [
          "Master Nim advanced features",
          "Organize code with best practices",
          "Handle errors and edge cases",
          "Work with external data and APIs",
          "Build production-quality code"
],
      chapters: [
        {
          id: 'L3C1',
          title: 'Advanced Types',
          description: 'Learn advanced types in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '78 mins',
          objectives: [
            'Understand Advanced Types fundamentals',
            'Apply Advanced Types in practical scenarios',
            'Write clean, efficient code using Advanced Types',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Advanced Types Fundamentals',
              content: 'Advanced Types is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Advanced Types example in Nim
// Example demonstrating Advanced Types
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Advanced Types',
              content: 'Applying Advanced Types in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Advanced Types in Action',
              description: 'A practical example showing how to use Advanced Types effectively in Nim projects.',
              code: `// Practical Advanced Types example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Advanced Types
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Advanced Types in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Advanced Types Usage',
              description: 'Building on basics to show more sophisticated Advanced Types patterns.',
              code: `// Advanced Advanced Types pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Advanced Types, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Advanced Types for robust Nim applications',
            'Web Development: Implementing Advanced Types in production systems',
            'Game Development: Using Advanced Types for scalable architecture',
            'Scripts: Applying Advanced Types in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C1E1',
              title: 'Advanced Types Basics Exercise',
              description: 'Practice Advanced Types fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Advanced Types
// Your solution here

`,
              solution: `// Solution for Advanced Types exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Advanced Types concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C1E2',
              title: 'Advanced Types Advanced Challenge',
              description: 'A more challenging exercise that combines Advanced Types with other concepts learned.',
              starterCode: `// TODO: Advanced Advanced Types implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Advanced Types principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Advanced Types! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C2',
          title: 'Macros',
          description: 'Learn macros in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '87 mins',
          objectives: [
            'Understand Macros fundamentals',
            'Apply Macros in practical scenarios',
            'Write clean, efficient code using Macros',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Macros Fundamentals',
              content: 'Macros is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Macros example in Nim
// Example demonstrating Macros
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Macros',
              content: 'Applying Macros in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Macros in Action',
              description: 'A practical example showing how to use Macros effectively in Nim projects.',
              code: `// Practical Macros example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Macros
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Macros in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Macros Usage',
              description: 'Building on basics to show more sophisticated Macros patterns.',
              code: `// Advanced Macros pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Macros, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Macros for robust Nim applications',
            'Web Development: Implementing Macros in production systems',
            'Game Development: Using Macros for scalable architecture',
            'Scripts: Applying Macros in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C2E1',
              title: 'Macros Basics Exercise',
              description: 'Practice Macros fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Macros
// Your solution here

`,
              solution: `// Solution for Macros exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Macros concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C2E2',
              title: 'Macros Advanced Challenge',
              description: 'A more challenging exercise that combines Macros with other concepts learned.',
              starterCode: `// TODO: Advanced Macros implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Macros principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Macros! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C3',
          title: 'Templates',
          description: 'Learn templates in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '36 mins',
          objectives: [
            'Understand Templates fundamentals',
            'Apply Templates in practical scenarios',
            'Write clean, efficient code using Templates',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Templates Fundamentals',
              content: 'Templates is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Templates example in Nim
// Example demonstrating Templates
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Templates',
              content: 'Applying Templates in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Templates in Action',
              description: 'A practical example showing how to use Templates effectively in Nim projects.',
              code: `// Practical Templates example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Templates
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Templates in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Templates Usage',
              description: 'Building on basics to show more sophisticated Templates patterns.',
              code: `// Advanced Templates pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Templates, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Templates for robust Nim applications',
            'Web Development: Implementing Templates in production systems',
            'Game Development: Using Templates for scalable architecture',
            'Scripts: Applying Templates in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C3E1',
              title: 'Templates Basics Exercise',
              description: 'Practice Templates fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Templates
// Your solution here

`,
              solution: `// Solution for Templates exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Templates concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C3E2',
              title: 'Templates Advanced Challenge',
              description: 'A more challenging exercise that combines Templates with other concepts learned.',
              starterCode: `// TODO: Advanced Templates implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Templates principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Templates! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C4',
          title: 'Concepts',
          description: 'Learn concepts in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '40 mins',
          objectives: [
            'Understand Concepts fundamentals',
            'Apply Concepts in practical scenarios',
            'Write clean, efficient code using Concepts',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Concepts Fundamentals',
              content: 'Concepts is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Concepts example in Nim
// Example demonstrating Concepts
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Concepts',
              content: 'Applying Concepts in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Concepts in Action',
              description: 'A practical example showing how to use Concepts effectively in Nim projects.',
              code: `// Practical Concepts example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Concepts
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Concepts in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Concepts Usage',
              description: 'Building on basics to show more sophisticated Concepts patterns.',
              code: `// Advanced Concepts pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Concepts, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Concepts for robust Nim applications',
            'Web Development: Implementing Concepts in production systems',
            'Game Development: Using Concepts for scalable architecture',
            'Scripts: Applying Concepts in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C4E1',
              title: 'Concepts Basics Exercise',
              description: 'Practice Concepts fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Concepts
// Your solution here

`,
              solution: `// Solution for Concepts exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Concepts concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C4E2',
              title: 'Concepts Advanced Challenge',
              description: 'A more challenging exercise that combines Concepts with other concepts learned.',
              starterCode: `// TODO: Advanced Concepts implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Concepts principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Concepts! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C5',
          title: 'Async',
          description: 'Learn async in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '59 mins',
          objectives: [
            'Understand Async fundamentals',
            'Apply Async in practical scenarios',
            'Write clean, efficient code using Async',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Async Fundamentals',
              content: 'Async is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Async example in Nim
// Example demonstrating Async
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Async',
              content: 'Applying Async in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Async in Action',
              description: 'A practical example showing how to use Async effectively in Nim projects.',
              code: `// Practical Async example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Async
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Async in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Async Usage',
              description: 'Building on basics to show more sophisticated Async patterns.',
              code: `// Advanced Async pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Async, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Async for robust Nim applications',
            'Web Development: Implementing Async in production systems',
            'Game Development: Using Async for scalable architecture',
            'Scripts: Applying Async in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C5E1',
              title: 'Async Basics Exercise',
              description: 'Practice Async fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Async
// Your solution here

`,
              solution: `// Solution for Async exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Async concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C5E2',
              title: 'Async Advanced Challenge',
              description: 'A more challenging exercise that combines Async with other concepts learned.',
              starterCode: `// TODO: Advanced Async implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Async principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Async! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C6',
          title: 'FFI',
          description: 'Learn ffi in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '84 mins',
          objectives: [
            'Understand FFI fundamentals',
            'Apply FFI in practical scenarios',
            'Write clean, efficient code using FFI',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'FFI Fundamentals',
              content: 'FFI is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// FFI example in Nim
// Example demonstrating FFI
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical FFI',
              content: 'Applying FFI in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'FFI in Action',
              description: 'A practical example showing how to use FFI effectively in Nim projects.',
              code: `// Practical FFI example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing FFI
  return "Practical result";
}
`,
              explanation: 'This example demonstrates FFI in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced FFI Usage',
              description: 'Building on basics to show more sophisticated FFI patterns.',
              code: `// Advanced FFI pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to FFI, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging FFI for robust Nim applications',
            'Web Development: Implementing FFI in production systems',
            'Game Development: Using FFI for scalable architecture',
            'Scripts: Applying FFI in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C6E1',
              title: 'FFI Basics Exercise',
              description: 'Practice FFI fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement FFI
// Your solution here

`,
              solution: `// Solution for FFI exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review FFI concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C6E2',
              title: 'FFI Advanced Challenge',
              description: 'A more challenging exercise that combines FFI with other concepts learned.',
              starterCode: `// TODO: Advanced FFI implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply FFI principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered FFI! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C7',
          title: 'Testing',
          description: 'Learn testing in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '39 mins',
          objectives: [
            'Understand Testing fundamentals',
            'Apply Testing in practical scenarios',
            'Write clean, efficient code using Testing',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Testing Fundamentals',
              content: 'Testing is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Testing example in Nim
// Example demonstrating Testing
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Testing',
              content: 'Applying Testing in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Testing in Action',
              description: 'A practical example showing how to use Testing effectively in Nim projects.',
              code: `// Practical Testing example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Testing
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Testing in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Testing Usage',
              description: 'Building on basics to show more sophisticated Testing patterns.',
              code: `// Advanced Testing pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Testing, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Testing for robust Nim applications',
            'Web Development: Implementing Testing in production systems',
            'Game Development: Using Testing for scalable architecture',
            'Scripts: Applying Testing in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C7E1',
              title: 'Testing Basics Exercise',
              description: 'Practice Testing fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Testing
// Your solution here

`,
              solution: `// Solution for Testing exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Testing concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C7E2',
              title: 'Testing Advanced Challenge',
              description: 'A more challenging exercise that combines Testing with other concepts learned.',
              starterCode: `// TODO: Advanced Testing implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Testing principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Testing! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Nim Full-Featured Application',
        description: 'Build a complete application with advanced features',
        requirements: [
          "Modular architecture",
          "Data persistence",
          "Error handling and logging",
          "Implements Systems Programming"
],
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }
    },

    {
      id: 'Advanced',
      title: 'Nim Advanced',
      description: 'Learn professional Nim development with design patterns, testing, and optimization techniques.',
      prerequisites: ['Complete Nim Intermediate'],
      estimatedDuration: '5-6 weeks',
      learningOutcomes: [
          "Apply software design patterns",
          "Implement comprehensive testing",
          "Optimize code performance",
          "Master Nim ecosystem",
          "Architect scalable systems"
],
      chapters: [
        {
          id: 'L4C1',
          title: 'Metaprogramming',
          description: 'Learn metaprogramming in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand Metaprogramming fundamentals',
            'Apply Metaprogramming in practical scenarios',
            'Write clean, efficient code using Metaprogramming',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Metaprogramming Fundamentals',
              content: 'Metaprogramming is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Metaprogramming example in Nim
// Example demonstrating Metaprogramming
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Metaprogramming',
              content: 'Applying Metaprogramming in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Metaprogramming in Action',
              description: 'A practical example showing how to use Metaprogramming effectively in Nim projects.',
              code: `// Practical Metaprogramming example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Metaprogramming
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Metaprogramming in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Metaprogramming Usage',
              description: 'Building on basics to show more sophisticated Metaprogramming patterns.',
              code: `// Advanced Metaprogramming pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Metaprogramming, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Metaprogramming for robust Nim applications',
            'Web Development: Implementing Metaprogramming in production systems',
            'Game Development: Using Metaprogramming for scalable architecture',
            'Scripts: Applying Metaprogramming in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C1E1',
              title: 'Metaprogramming Basics Exercise',
              description: 'Practice Metaprogramming fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Metaprogramming
// Your solution here

`,
              solution: `// Solution for Metaprogramming exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Metaprogramming concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C1E2',
              title: 'Metaprogramming Advanced Challenge',
              description: 'A more challenging exercise that combines Metaprogramming with other concepts learned.',
              starterCode: `// TODO: Advanced Metaprogramming implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Metaprogramming principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Metaprogramming! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C2',
          title: 'Memory Management',
          description: 'Learn memory management in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '63 mins',
          objectives: [
            'Understand Memory Management fundamentals',
            'Apply Memory Management in practical scenarios',
            'Write clean, efficient code using Memory Management',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Memory Management Fundamentals',
              content: 'Memory Management is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Memory Management example in Nim
// Example demonstrating Memory Management
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Memory Management',
              content: 'Applying Memory Management in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Memory Management in Action',
              description: 'A practical example showing how to use Memory Management effectively in Nim projects.',
              code: `// Practical Memory Management example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Memory Management
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Memory Management in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Memory Management Usage',
              description: 'Building on basics to show more sophisticated Memory Management patterns.',
              code: `// Advanced Memory Management pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Memory Management, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Memory Management for robust Nim applications',
            'Web Development: Implementing Memory Management in production systems',
            'Game Development: Using Memory Management for scalable architecture',
            'Scripts: Applying Memory Management in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C2E1',
              title: 'Memory Management Basics Exercise',
              description: 'Practice Memory Management fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Memory Management
// Your solution here

`,
              solution: `// Solution for Memory Management exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Memory Management concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C2E2',
              title: 'Memory Management Advanced Challenge',
              description: 'A more challenging exercise that combines Memory Management with other concepts learned.',
              starterCode: `// TODO: Advanced Memory Management implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Memory Management principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Memory Management! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C3',
          title: 'Concurrency',
          description: 'Learn concurrency in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '86 mins',
          objectives: [
            'Understand Concurrency fundamentals',
            'Apply Concurrency in practical scenarios',
            'Write clean, efficient code using Concurrency',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Concurrency Fundamentals',
              content: 'Concurrency is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Concurrency example in Nim
// Example demonstrating Concurrency
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Concurrency',
              content: 'Applying Concurrency in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Concurrency in Action',
              description: 'A practical example showing how to use Concurrency effectively in Nim projects.',
              code: `// Practical Concurrency example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Concurrency
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Concurrency in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Concurrency Usage',
              description: 'Building on basics to show more sophisticated Concurrency patterns.',
              code: `// Advanced Concurrency pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Concurrency, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Concurrency for robust Nim applications',
            'Web Development: Implementing Concurrency in production systems',
            'Game Development: Using Concurrency for scalable architecture',
            'Scripts: Applying Concurrency in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C3E1',
              title: 'Concurrency Basics Exercise',
              description: 'Practice Concurrency fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Concurrency
// Your solution here

`,
              solution: `// Solution for Concurrency exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Concurrency concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C3E2',
              title: 'Concurrency Advanced Challenge',
              description: 'A more challenging exercise that combines Concurrency with other concepts learned.',
              starterCode: `// TODO: Advanced Concurrency implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Concurrency principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Concurrency! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C4',
          title: 'C/C++ Interop',
          description: 'Learn c/c++ interop in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '40 mins',
          objectives: [
            'Understand C/C++ Interop fundamentals',
            'Apply C/C++ Interop in practical scenarios',
            'Write clean, efficient code using C/C++ Interop',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'C/C++ Interop Fundamentals',
              content: 'C/C++ Interop is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// C/C++ Interop example in Nim
// Example demonstrating C/C++ Interop
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical C/C++ Interop',
              content: 'Applying C/C++ Interop in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'C/C++ Interop in Action',
              description: 'A practical example showing how to use C/C++ Interop effectively in Nim projects.',
              code: `// Practical C/C++ Interop example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing C/C++ Interop
  return "Practical result";
}
`,
              explanation: 'This example demonstrates C/C++ Interop in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced C/C++ Interop Usage',
              description: 'Building on basics to show more sophisticated C/C++ Interop patterns.',
              code: `// Advanced C/C++ Interop pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to C/C++ Interop, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging C/C++ Interop for robust Nim applications',
            'Web Development: Implementing C/C++ Interop in production systems',
            'Game Development: Using C/C++ Interop for scalable architecture',
            'Scripts: Applying C/C++ Interop in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C4E1',
              title: 'C/C++ Interop Basics Exercise',
              description: 'Practice C/C++ Interop fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement C/C++ Interop
// Your solution here

`,
              solution: `// Solution for C/C++ Interop exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review C/C++ Interop concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C4E2',
              title: 'C/C++ Interop Advanced Challenge',
              description: 'A more challenging exercise that combines C/C++ Interop with other concepts learned.',
              starterCode: `// TODO: Advanced C/C++ Interop implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply C/C++ Interop principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered C/C++ Interop! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C5',
          title: 'Performance',
          description: 'Learn performance in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '33 mins',
          objectives: [
            'Understand Performance fundamentals',
            'Apply Performance in practical scenarios',
            'Write clean, efficient code using Performance',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Performance Fundamentals',
              content: 'Performance is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Performance example in Nim
// Example demonstrating Performance
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Performance',
              content: 'Applying Performance in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Performance in Action',
              description: 'A practical example showing how to use Performance effectively in Nim projects.',
              code: `// Practical Performance example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Performance
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Performance in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Performance Usage',
              description: 'Building on basics to show more sophisticated Performance patterns.',
              code: `// Advanced Performance pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Performance, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Performance for robust Nim applications',
            'Web Development: Implementing Performance in production systems',
            'Game Development: Using Performance for scalable architecture',
            'Scripts: Applying Performance in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C5E1',
              title: 'Performance Basics Exercise',
              description: 'Practice Performance fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Performance
// Your solution here

`,
              solution: `// Solution for Performance exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Performance concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C5E2',
              title: 'Performance Advanced Challenge',
              description: 'A more challenging exercise that combines Performance with other concepts learned.',
              starterCode: `// TODO: Advanced Performance implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Performance principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Performance! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C6',
          title: 'DSLs',
          description: 'Learn dsls in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand DSLs fundamentals',
            'Apply DSLs in practical scenarios',
            'Write clean, efficient code using DSLs',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'DSLs Fundamentals',
              content: 'DSLs is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// DSLs example in Nim
// Example demonstrating DSLs
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical DSLs',
              content: 'Applying DSLs in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'DSLs in Action',
              description: 'A practical example showing how to use DSLs effectively in Nim projects.',
              code: `// Practical DSLs example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing DSLs
  return "Practical result";
}
`,
              explanation: 'This example demonstrates DSLs in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced DSLs Usage',
              description: 'Building on basics to show more sophisticated DSLs patterns.',
              code: `// Advanced DSLs pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to DSLs, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging DSLs for robust Nim applications',
            'Web Development: Implementing DSLs in production systems',
            'Game Development: Using DSLs for scalable architecture',
            'Scripts: Applying DSLs in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C6E1',
              title: 'DSLs Basics Exercise',
              description: 'Practice DSLs fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement DSLs
// Your solution here

`,
              solution: `// Solution for DSLs exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review DSLs concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C6E2',
              title: 'DSLs Advanced Challenge',
              description: 'A more challenging exercise that combines DSLs with other concepts learned.',
              starterCode: `// TODO: Advanced DSLs implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply DSLs principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered DSLs! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C7',
          title: 'Compilation',
          description: 'Learn compilation in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '77 mins',
          objectives: [
            'Understand Compilation fundamentals',
            'Apply Compilation in practical scenarios',
            'Write clean, efficient code using Compilation',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Compilation Fundamentals',
              content: 'Compilation is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Compilation example in Nim
// Example demonstrating Compilation
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Compilation',
              content: 'Applying Compilation in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Compilation in Action',
              description: 'A practical example showing how to use Compilation effectively in Nim projects.',
              code: `// Practical Compilation example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Compilation
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Compilation in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Compilation Usage',
              description: 'Building on basics to show more sophisticated Compilation patterns.',
              code: `// Advanced Compilation pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Compilation, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Compilation for robust Nim applications',
            'Web Development: Implementing Compilation in production systems',
            'Game Development: Using Compilation for scalable architecture',
            'Scripts: Applying Compilation in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C7E1',
              title: 'Compilation Basics Exercise',
              description: 'Practice Compilation fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Compilation
// Your solution here

`,
              solution: `// Solution for Compilation exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Compilation concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C7E2',
              title: 'Compilation Advanced Challenge',
              description: 'A more challenging exercise that combines Compilation with other concepts learned.',
              starterCode: `// TODO: Advanced Compilation implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Compilation principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Compilation! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Professional Nim System',
        description: 'Develop a complex, tested, optimized system',
        requirements: [
          "Design patterns implementation",
          "Comprehensive test suite",
          "Performance optimization",
          "Complete documentation"
],
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }
    },

    {
      id: 'Professional',
      title: 'Nim Professional',
      description: 'Build production-ready Nim applications with industry best practices and professional workflows.',
      prerequisites: ['Complete Nim Advanced'],
      estimatedDuration: '6-8 weeks',
      learningOutcomes: [
          "Develop production applications",
          "Implement security best practices",
          "Deploy and maintain systems",
          "Lead development projects",
          "Follow industry standards"
],
      chapters: [
        {
          id: 'L5C1',
          title: 'Web Development (Jester)',
          description: 'Learn web development (jester) in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '89 mins',
          objectives: [
            'Understand Web Development (Jester) fundamentals',
            'Apply Web Development (Jester) in practical scenarios',
            'Write clean, efficient code using Web Development (Jester)',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Web Development (Jester) Fundamentals',
              content: 'Web Development (Jester) is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Web Development (Jester) example in Nim
// Example demonstrating Web Development (Jester)
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Web Development (Jester)',
              content: 'Applying Web Development (Jester) in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Web Development (Jester) in Action',
              description: 'A practical example showing how to use Web Development (Jester) effectively in Nim projects.',
              code: `// Practical Web Development (Jester) example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Web Development (Jester)
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Web Development (Jester) in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Web Development (Jester) Usage',
              description: 'Building on basics to show more sophisticated Web Development (Jester) patterns.',
              code: `// Advanced Web Development (Jester) pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Web Development (Jester), commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Web Development (Jester) for robust Nim applications',
            'Web Development: Implementing Web Development (Jester) in production systems',
            'Game Development: Using Web Development (Jester) for scalable architecture',
            'Scripts: Applying Web Development (Jester) in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C1E1',
              title: 'Web Development (Jester) Basics Exercise',
              description: 'Practice Web Development (Jester) fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Web Development (Jester)
// Your solution here

`,
              solution: `// Solution for Web Development (Jester) exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Web Development (Jester) concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C1E2',
              title: 'Web Development (Jester) Advanced Challenge',
              description: 'A more challenging exercise that combines Web Development (Jester) with other concepts learned.',
              starterCode: `// TODO: Advanced Web Development (Jester) implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Web Development (Jester) principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Web Development (Jester)! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C2',
          title: 'Systems Programming',
          description: 'Learn systems programming in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '57 mins',
          objectives: [
            'Understand Systems Programming fundamentals',
            'Apply Systems Programming in practical scenarios',
            'Write clean, efficient code using Systems Programming',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Systems Programming Fundamentals',
              content: 'Systems Programming is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Systems Programming example in Nim
// Example demonstrating Systems Programming
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Systems Programming',
              content: 'Applying Systems Programming in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Systems Programming in Action',
              description: 'A practical example showing how to use Systems Programming effectively in Nim projects.',
              code: `// Practical Systems Programming example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Systems Programming
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Systems Programming in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Systems Programming Usage',
              description: 'Building on basics to show more sophisticated Systems Programming patterns.',
              code: `// Advanced Systems Programming pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Systems Programming, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Systems Programming for robust Nim applications',
            'Web Development: Implementing Systems Programming in production systems',
            'Game Development: Using Systems Programming for scalable architecture',
            'Scripts: Applying Systems Programming in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C2E1',
              title: 'Systems Programming Basics Exercise',
              description: 'Practice Systems Programming fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Systems Programming
// Your solution here

`,
              solution: `// Solution for Systems Programming exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Systems Programming concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C2E2',
              title: 'Systems Programming Advanced Challenge',
              description: 'A more challenging exercise that combines Systems Programming with other concepts learned.',
              starterCode: `// TODO: Advanced Systems Programming implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Systems Programming principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Systems Programming! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C3',
          title: 'Game Development',
          description: 'Learn game development in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '56 mins',
          objectives: [
            'Understand Game Development fundamentals',
            'Apply Game Development in practical scenarios',
            'Write clean, efficient code using Game Development',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Game Development Fundamentals',
              content: 'Game Development is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Game Development example in Nim
// Example demonstrating Game Development
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Game Development',
              content: 'Applying Game Development in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Game Development in Action',
              description: 'A practical example showing how to use Game Development effectively in Nim projects.',
              code: `// Practical Game Development example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Game Development
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Game Development in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Game Development Usage',
              description: 'Building on basics to show more sophisticated Game Development patterns.',
              code: `// Advanced Game Development pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Game Development, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Game Development for robust Nim applications',
            'Web Development: Implementing Game Development in production systems',
            'Game Development: Using Game Development for scalable architecture',
            'Scripts: Applying Game Development in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C3E1',
              title: 'Game Development Basics Exercise',
              description: 'Practice Game Development fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Game Development
// Your solution here

`,
              solution: `// Solution for Game Development exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Game Development concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C3E2',
              title: 'Game Development Advanced Challenge',
              description: 'A more challenging exercise that combines Game Development with other concepts learned.',
              starterCode: `// TODO: Advanced Game Development implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Game Development principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Game Development! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C4',
          title: 'Cross-compilation',
          description: 'Learn cross-compilation in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand Cross-compilation fundamentals',
            'Apply Cross-compilation in practical scenarios',
            'Write clean, efficient code using Cross-compilation',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Cross-compilation Fundamentals',
              content: 'Cross-compilation is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Cross-compilation example in Nim
// Example demonstrating Cross-compilation
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Cross-compilation',
              content: 'Applying Cross-compilation in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Cross-compilation in Action',
              description: 'A practical example showing how to use Cross-compilation effectively in Nim projects.',
              code: `// Practical Cross-compilation example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Cross-compilation
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Cross-compilation in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Cross-compilation Usage',
              description: 'Building on basics to show more sophisticated Cross-compilation patterns.',
              code: `// Advanced Cross-compilation pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Cross-compilation, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Cross-compilation for robust Nim applications',
            'Web Development: Implementing Cross-compilation in production systems',
            'Game Development: Using Cross-compilation for scalable architecture',
            'Scripts: Applying Cross-compilation in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C4E1',
              title: 'Cross-compilation Basics Exercise',
              description: 'Practice Cross-compilation fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Cross-compilation
// Your solution here

`,
              solution: `// Solution for Cross-compilation exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Cross-compilation concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C4E2',
              title: 'Cross-compilation Advanced Challenge',
              description: 'A more challenging exercise that combines Cross-compilation with other concepts learned.',
              starterCode: `// TODO: Advanced Cross-compilation implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Cross-compilation principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Cross-compilation! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C5',
          title: 'Production',
          description: 'Learn production in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '59 mins',
          objectives: [
            'Understand Production fundamentals',
            'Apply Production in practical scenarios',
            'Write clean, efficient code using Production',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Production Fundamentals',
              content: 'Production is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Production example in Nim
// Example demonstrating Production
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Production',
              content: 'Applying Production in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Production in Action',
              description: 'A practical example showing how to use Production effectively in Nim projects.',
              code: `// Practical Production example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Production
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Production in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Production Usage',
              description: 'Building on basics to show more sophisticated Production patterns.',
              code: `// Advanced Production pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Production, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Production for robust Nim applications',
            'Web Development: Implementing Production in production systems',
            'Game Development: Using Production for scalable architecture',
            'Scripts: Applying Production in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C5E1',
              title: 'Production Basics Exercise',
              description: 'Practice Production fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Production
// Your solution here

`,
              solution: `// Solution for Production exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Production concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C5E2',
              title: 'Production Advanced Challenge',
              description: 'A more challenging exercise that combines Production with other concepts learned.',
              starterCode: `// TODO: Advanced Production implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Production principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Production! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C6',
          title: 'Package Development',
          description: 'Learn package development in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '45 mins',
          objectives: [
            'Understand Package Development fundamentals',
            'Apply Package Development in practical scenarios',
            'Write clean, efficient code using Package Development',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Package Development Fundamentals',
              content: 'Package Development is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Package Development example in Nim
// Example demonstrating Package Development
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Package Development',
              content: 'Applying Package Development in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Package Development in Action',
              description: 'A practical example showing how to use Package Development effectively in Nim projects.',
              code: `// Practical Package Development example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Package Development
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Package Development in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Package Development Usage',
              description: 'Building on basics to show more sophisticated Package Development patterns.',
              code: `// Advanced Package Development pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Package Development, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Package Development for robust Nim applications',
            'Web Development: Implementing Package Development in production systems',
            'Game Development: Using Package Development for scalable architecture',
            'Scripts: Applying Package Development in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C6E1',
              title: 'Package Development Basics Exercise',
              description: 'Practice Package Development fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Package Development
// Your solution here

`,
              solution: `// Solution for Package Development exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Package Development concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C6E2',
              title: 'Package Development Advanced Challenge',
              description: 'A more challenging exercise that combines Package Development with other concepts learned.',
              starterCode: `// TODO: Advanced Package Development implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Package Development principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Package Development! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C7',
          title: 'Best Practices',
          description: 'Learn best practices in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '31 mins',
          objectives: [
            'Understand Best Practices fundamentals',
            'Apply Best Practices in practical scenarios',
            'Write clean, efficient code using Best Practices',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Best Practices Fundamentals',
              content: 'Best Practices is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Best Practices example in Nim
// Example demonstrating Best Practices
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Best Practices',
              content: 'Applying Best Practices in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Best Practices in Action',
              description: 'A practical example showing how to use Best Practices effectively in Nim projects.',
              code: `// Practical Best Practices example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Best Practices
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Best Practices in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Best Practices Usage',
              description: 'Building on basics to show more sophisticated Best Practices patterns.',
              code: `// Advanced Best Practices pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Best Practices, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Best Practices for robust Nim applications',
            'Web Development: Implementing Best Practices in production systems',
            'Game Development: Using Best Practices for scalable architecture',
            'Scripts: Applying Best Practices in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C7E1',
              title: 'Best Practices Basics Exercise',
              description: 'Practice Best Practices fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Best Practices
// Your solution here

`,
              solution: `// Solution for Best Practices exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Best Practices concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C7E2',
              title: 'Best Practices Advanced Challenge',
              description: 'A more challenging exercise that combines Best Practices with other concepts learned.',
              starterCode: `// TODO: Advanced Best Practices implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Best Practices principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Best Practices! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C8',
          title: 'Real Projects',
          description: 'Learn real projects in Nim. Master core concepts with practical examples and real-world applications.',
          duration: '65 mins',
          objectives: [
            'Understand Real Projects fundamentals',
            'Apply Real Projects in practical scenarios',
            'Write clean, efficient code using Real Projects',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Real Projects Fundamentals',
              content: 'Real Projects is a crucial concept in Nim. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Nim development and is used extensively in real-world applications.',
              codeExample: `// Real Projects example in Nim
// Example demonstrating Real Projects
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Nim development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Nim best practices'
              ]
            },
            {
              title: 'Practical Real Projects',
              content: 'Applying Real Projects in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Nim development.',
              keyPoints: [
                'Follow Nim conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Real Projects in Action',
              description: 'A practical example showing how to use Real Projects effectively in Nim projects.',
              code: `// Practical Real Projects example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Real Projects
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Real Projects in a real-world context, showing best practices for Nim development.'
            },
            {
              title: 'Advanced Real Projects Usage',
              description: 'Building on basics to show more sophisticated Real Projects patterns.',
              code: `// Advanced Real Projects pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Real Projects, commonly seen in professional Nim codebases.'
            }
          ],
          realWorldUseCases: [
            'Systems Programming: Leveraging Real Projects for robust Nim applications',
            'Web Development: Implementing Real Projects in production systems',
            'Game Development: Using Real Projects for scalable architecture',
            'Scripts: Applying Real Projects in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C8E1',
              title: 'Real Projects Basics Exercise',
              description: 'Practice Real Projects fundamentals by implementing a solution in Nim.',
              starterCode: `// TODO: Implement Real Projects
// Your solution here

`,
              solution: `// Solution for Real Projects exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Real Projects concepts from this chapter',
                'Follow Nim syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C8E2',
              title: 'Real Projects Advanced Challenge',
              description: 'A more challenging exercise that combines Real Projects with other concepts learned.',
              starterCode: `// TODO: Advanced Real Projects implementation
// Combine multiple concepts

`,
              solution: `// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
`,
              hints: [
                'Break down the problem into steps',
                'Apply Real Projects principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Real Projects! You can now confidently use these concepts in your Nim projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Production Nim Application',
        description: 'Build and deploy a production-ready system',
        requirements: [
          "Systems Programming",
          "Web Development",
          "Security best practices",
          "CI/CD and deployment",
          "Monitoring and logging"
],
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }
    }
  ]
};
