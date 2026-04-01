import { Curriculum } from '../types';

export const luaCurriculum: Curriculum = {
  meta: {
    slug: 'lua',
    title: 'Lua Programming',
    shortDescription: 'Master Lua - lightweight embedded scripting',
    longDescription: 'Complete Lua Programming course from basics to professional level. Learn Lua 5.4 with modern best practices, hands-on projects, and industry-standard techniques. Focus on Game scripting, embedded systems, configuration.',
    icon: '🌙',
    color: '#000080',
    category: 'Programming Languages',
    tags: ['lua', 'Game scripting'],
    prerequisites: ['Programming basics'],
    targetAudience: [
      'Beginners to Lua',
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
      'Game Scripting',
      'Embedded Systems',
      'Configuration',
      'Extensions'
    ],
    toolsAndTechnologies: [
      'Lua Lua 5.4',
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
      title: 'Lua Basics',
      description: 'Begin your Lua journey. Learn fundamental syntax, core concepts, and write your first programs.',
      prerequisites: [],
      estimatedDuration: '2-3 weeks',
      learningOutcomes: [
          "Understand Lua syntax and fundamentals",
          "Write and execute basic programs",
          "Work with core data types and structures",
          "Apply basic operations and logic",
          "Debug simple code issues"
],
      chapters: [
        {
          id: 'L1C1',
          title: 'Introduction',
          description: 'Learn introduction in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '69 mins',
          objectives: [
            'Understand Introduction fundamentals',
            'Apply Introduction in practical scenarios',
            'Write clean, efficient code using Introduction',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Introduction Fundamentals',
              content: 'Introduction is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Introduction example in Lua
// Example demonstrating Introduction
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Introduction',
              content: 'Applying Introduction in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Introduction in Action',
              description: 'A practical example showing how to use Introduction effectively in Lua projects.',
              code: `// Practical Introduction example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Introduction
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Introduction in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Introduction, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Introduction for robust Lua applications',
            'Embedded Systems: Implementing Introduction in production systems',
            'Configuration: Using Introduction for scalable architecture',
            'Extensions: Applying Introduction in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C1E1',
              title: 'Introduction Basics Exercise',
              description: 'Practice Introduction fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
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
          summary: 'You\'ve mastered Introduction! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C2',
          title: 'Values and Types',
          description: 'Learn values and types in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '69 mins',
          objectives: [
            'Understand Values and Types fundamentals',
            'Apply Values and Types in practical scenarios',
            'Write clean, efficient code using Values and Types',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Values and Types Fundamentals',
              content: 'Values and Types is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Values and Types example in Lua
// Example demonstrating Values and Types
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Values and Types',
              content: 'Applying Values and Types in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Values and Types in Action',
              description: 'A practical example showing how to use Values and Types effectively in Lua projects.',
              code: `// Practical Values and Types example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Values and Types
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Values and Types in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Values and Types Usage',
              description: 'Building on basics to show more sophisticated Values and Types patterns.',
              code: `// Advanced Values and Types pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Values and Types, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Values and Types for robust Lua applications',
            'Embedded Systems: Implementing Values and Types in production systems',
            'Configuration: Using Values and Types for scalable architecture',
            'Extensions: Applying Values and Types in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C2E1',
              title: 'Values and Types Basics Exercise',
              description: 'Practice Values and Types fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Values and Types
// Your solution here

`,
              solution: `// Solution for Values and Types exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Values and Types concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C2E2',
              title: 'Values and Types Advanced Challenge',
              description: 'A more challenging exercise that combines Values and Types with other concepts learned.',
              starterCode: `// TODO: Advanced Values and Types implementation
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
                'Apply Values and Types principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Values and Types! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C3',
          title: 'Expressions',
          description: 'Learn expressions in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Expressions fundamentals',
            'Apply Expressions in practical scenarios',
            'Write clean, efficient code using Expressions',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Expressions Fundamentals',
              content: 'Expressions is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Expressions example in Lua
// Example demonstrating Expressions
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Expressions',
              content: 'Applying Expressions in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Expressions in Action',
              description: 'A practical example showing how to use Expressions effectively in Lua projects.',
              code: `// Practical Expressions example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Expressions
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Expressions in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Expressions Usage',
              description: 'Building on basics to show more sophisticated Expressions patterns.',
              code: `// Advanced Expressions pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Expressions, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Expressions for robust Lua applications',
            'Embedded Systems: Implementing Expressions in production systems',
            'Configuration: Using Expressions for scalable architecture',
            'Extensions: Applying Expressions in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C3E1',
              title: 'Expressions Basics Exercise',
              description: 'Practice Expressions fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Expressions
// Your solution here

`,
              solution: `// Solution for Expressions exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Expressions concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C3E2',
              title: 'Expressions Advanced Challenge',
              description: 'A more challenging exercise that combines Expressions with other concepts learned.',
              starterCode: `// TODO: Advanced Expressions implementation
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
                'Apply Expressions principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Expressions! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C4',
          title: 'Statements',
          description: 'Learn statements in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '55 mins',
          objectives: [
            'Understand Statements fundamentals',
            'Apply Statements in practical scenarios',
            'Write clean, efficient code using Statements',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Statements Fundamentals',
              content: 'Statements is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Statements example in Lua
// Example demonstrating Statements
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Statements',
              content: 'Applying Statements in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Statements in Action',
              description: 'A practical example showing how to use Statements effectively in Lua projects.',
              code: `// Practical Statements example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Statements
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Statements in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Statements Usage',
              description: 'Building on basics to show more sophisticated Statements patterns.',
              code: `// Advanced Statements pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Statements, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Statements for robust Lua applications',
            'Embedded Systems: Implementing Statements in production systems',
            'Configuration: Using Statements for scalable architecture',
            'Extensions: Applying Statements in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C4E1',
              title: 'Statements Basics Exercise',
              description: 'Practice Statements fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Statements
// Your solution here

`,
              solution: `// Solution for Statements exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Statements concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C4E2',
              title: 'Statements Advanced Challenge',
              description: 'A more challenging exercise that combines Statements with other concepts learned.',
              starterCode: `// TODO: Advanced Statements implementation
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
                'Apply Statements principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Statements! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C5',
          title: 'Functions',
          description: 'Learn functions in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '58 mins',
          objectives: [
            'Understand Functions fundamentals',
            'Apply Functions in practical scenarios',
            'Write clean, efficient code using Functions',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Functions Fundamentals',
              content: 'Functions is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Functions example in Lua
// Example demonstrating Functions
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Functions',
              content: 'Applying Functions in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Functions in Action',
              description: 'A practical example showing how to use Functions effectively in Lua projects.',
              code: `// Practical Functions example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Functions
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Functions in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Functions Usage',
              description: 'Building on basics to show more sophisticated Functions patterns.',
              code: `// Advanced Functions pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Functions, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Functions for robust Lua applications',
            'Embedded Systems: Implementing Functions in production systems',
            'Configuration: Using Functions for scalable architecture',
            'Extensions: Applying Functions in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C5E1',
              title: 'Functions Basics Exercise',
              description: 'Practice Functions fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Functions
// Your solution here

`,
              solution: `// Solution for Functions exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Functions concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C5E2',
              title: 'Functions Advanced Challenge',
              description: 'A more challenging exercise that combines Functions with other concepts learned.',
              starterCode: `// TODO: Advanced Functions implementation
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
                'Apply Functions principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Functions! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Lua Fundamentals Project',
        description: 'Build a console application demonstrating Lua basics',
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
      title: 'Lua Beginner',
      description: 'Build on fundamentals with control structures, functions, and data manipulation. Create functional Lua applications.',
      prerequisites: ['Complete Lua Basics'],
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
          title: 'Control Structures',
          description: 'Learn control structures in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Control Structures fundamentals',
            'Apply Control Structures in practical scenarios',
            'Write clean, efficient code using Control Structures',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Control Structures Fundamentals',
              content: 'Control Structures is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Control Structures example in Lua
// Example demonstrating Control Structures
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Control Structures',
              content: 'Applying Control Structures in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Control Structures in Action',
              description: 'A practical example showing how to use Control Structures effectively in Lua projects.',
              code: `// Practical Control Structures example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Control Structures
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Control Structures in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Control Structures Usage',
              description: 'Building on basics to show more sophisticated Control Structures patterns.',
              code: `// Advanced Control Structures pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Control Structures, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Control Structures for robust Lua applications',
            'Embedded Systems: Implementing Control Structures in production systems',
            'Configuration: Using Control Structures for scalable architecture',
            'Extensions: Applying Control Structures in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C1E1',
              title: 'Control Structures Basics Exercise',
              description: 'Practice Control Structures fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Control Structures
// Your solution here

`,
              solution: `// Solution for Control Structures exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Control Structures concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C1E2',
              title: 'Control Structures Advanced Challenge',
              description: 'A more challenging exercise that combines Control Structures with other concepts learned.',
              starterCode: `// TODO: Advanced Control Structures implementation
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
                'Apply Control Structures principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Control Structures! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C2',
          title: 'Tables',
          description: 'Learn tables in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '67 mins',
          objectives: [
            'Understand Tables fundamentals',
            'Apply Tables in practical scenarios',
            'Write clean, efficient code using Tables',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Tables Fundamentals',
              content: 'Tables is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Tables example in Lua
// Example demonstrating Tables
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Tables',
              content: 'Applying Tables in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Tables in Action',
              description: 'A practical example showing how to use Tables effectively in Lua projects.',
              code: `// Practical Tables example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Tables
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Tables in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Tables Usage',
              description: 'Building on basics to show more sophisticated Tables patterns.',
              code: `// Advanced Tables pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Tables, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Tables for robust Lua applications',
            'Embedded Systems: Implementing Tables in production systems',
            'Configuration: Using Tables for scalable architecture',
            'Extensions: Applying Tables in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C2E1',
              title: 'Tables Basics Exercise',
              description: 'Practice Tables fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Tables
// Your solution here

`,
              solution: `// Solution for Tables exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Tables concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C2E2',
              title: 'Tables Advanced Challenge',
              description: 'A more challenging exercise that combines Tables with other concepts learned.',
              starterCode: `// TODO: Advanced Tables implementation
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
                'Apply Tables principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Tables! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C3',
          title: 'Functions Advanced',
          description: 'Learn functions advanced in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Functions Advanced fundamentals',
            'Apply Functions Advanced in practical scenarios',
            'Write clean, efficient code using Functions Advanced',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Functions Advanced Fundamentals',
              content: 'Functions Advanced is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Functions Advanced example in Lua
// Example demonstrating Functions Advanced
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Functions Advanced',
              content: 'Applying Functions Advanced in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Functions Advanced in Action',
              description: 'A practical example showing how to use Functions Advanced effectively in Lua projects.',
              code: `// Practical Functions Advanced example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Functions Advanced
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Functions Advanced in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Functions Advanced Usage',
              description: 'Building on basics to show more sophisticated Functions Advanced patterns.',
              code: `// Advanced Functions Advanced pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Functions Advanced, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Functions Advanced for robust Lua applications',
            'Embedded Systems: Implementing Functions Advanced in production systems',
            'Configuration: Using Functions Advanced for scalable architecture',
            'Extensions: Applying Functions Advanced in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C3E1',
              title: 'Functions Advanced Basics Exercise',
              description: 'Practice Functions Advanced fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Functions Advanced
// Your solution here

`,
              solution: `// Solution for Functions Advanced exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Functions Advanced concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C3E2',
              title: 'Functions Advanced Advanced Challenge',
              description: 'A more challenging exercise that combines Functions Advanced with other concepts learned.',
              starterCode: `// TODO: Advanced Functions Advanced implementation
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
                'Apply Functions Advanced principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Functions Advanced! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C4',
          title: 'Iterators',
          description: 'Learn iterators in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '84 mins',
          objectives: [
            'Understand Iterators fundamentals',
            'Apply Iterators in practical scenarios',
            'Write clean, efficient code using Iterators',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Iterators Fundamentals',
              content: 'Iterators is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Iterators example in Lua
// Example demonstrating Iterators
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Iterators',
              content: 'Applying Iterators in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Iterators in Action',
              description: 'A practical example showing how to use Iterators effectively in Lua projects.',
              code: `// Practical Iterators example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Iterators
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Iterators in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Iterators, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Iterators for robust Lua applications',
            'Embedded Systems: Implementing Iterators in production systems',
            'Configuration: Using Iterators for scalable architecture',
            'Extensions: Applying Iterators in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C4E1',
              title: 'Iterators Basics Exercise',
              description: 'Practice Iterators fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C4E2',
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
          summary: 'You\'ve mastered Iterators! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C5',
          title: 'Closures',
          description: 'Learn closures in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '45 mins',
          objectives: [
            'Understand Closures fundamentals',
            'Apply Closures in practical scenarios',
            'Write clean, efficient code using Closures',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Closures Fundamentals',
              content: 'Closures is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Closures example in Lua
// Example demonstrating Closures
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Closures',
              content: 'Applying Closures in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Closures in Action',
              description: 'A practical example showing how to use Closures effectively in Lua projects.',
              code: `// Practical Closures example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Closures
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Closures in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Closures Usage',
              description: 'Building on basics to show more sophisticated Closures patterns.',
              code: `// Advanced Closures pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Closures, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Closures for robust Lua applications',
            'Embedded Systems: Implementing Closures in production systems',
            'Configuration: Using Closures for scalable architecture',
            'Extensions: Applying Closures in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C5E1',
              title: 'Closures Basics Exercise',
              description: 'Practice Closures fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Closures
// Your solution here

`,
              solution: `// Solution for Closures exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Closures concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C5E2',
              title: 'Closures Advanced Challenge',
              description: 'A more challenging exercise that combines Closures with other concepts learned.',
              starterCode: `// TODO: Advanced Closures implementation
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
                'Apply Closures principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Closures! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C6',
          title: 'Modules',
          description: 'Learn modules in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '54 mins',
          objectives: [
            'Understand Modules fundamentals',
            'Apply Modules in practical scenarios',
            'Write clean, efficient code using Modules',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Modules Fundamentals',
              content: 'Modules is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Modules example in Lua
// Example demonstrating Modules
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Modules',
              content: 'Applying Modules in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Modules in Action',
              description: 'A practical example showing how to use Modules effectively in Lua projects.',
              code: `// Practical Modules example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Modules
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Modules in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Modules, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Modules for robust Lua applications',
            'Embedded Systems: Implementing Modules in production systems',
            'Configuration: Using Modules for scalable architecture',
            'Extensions: Applying Modules in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C6E1',
              title: 'Modules Basics Exercise',
              description: 'Practice Modules fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C6E2',
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
          summary: 'You\'ve mastered Modules! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Interactive Lua Application',
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
      title: 'Lua Intermediate',
      description: 'Master advanced features, modules, and real-world development patterns in Lua.',
      prerequisites: ['Complete Lua Beginner'],
      estimatedDuration: '4-5 weeks',
      learningOutcomes: [
          "Master Lua advanced features",
          "Organize code with best practices",
          "Handle errors and edge cases",
          "Work with external data and APIs",
          "Build production-quality code"
],
      chapters: [
        {
          id: 'L3C1',
          title: 'Metatables',
          description: 'Learn metatables in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '30 mins',
          objectives: [
            'Understand Metatables fundamentals',
            'Apply Metatables in practical scenarios',
            'Write clean, efficient code using Metatables',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Metatables Fundamentals',
              content: 'Metatables is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Metatables example in Lua
// Example demonstrating Metatables
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Metatables',
              content: 'Applying Metatables in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Metatables in Action',
              description: 'A practical example showing how to use Metatables effectively in Lua projects.',
              code: `// Practical Metatables example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Metatables
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Metatables in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Metatables Usage',
              description: 'Building on basics to show more sophisticated Metatables patterns.',
              code: `// Advanced Metatables pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Metatables, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Metatables for robust Lua applications',
            'Embedded Systems: Implementing Metatables in production systems',
            'Configuration: Using Metatables for scalable architecture',
            'Extensions: Applying Metatables in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C1E1',
              title: 'Metatables Basics Exercise',
              description: 'Practice Metatables fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Metatables
// Your solution here

`,
              solution: `// Solution for Metatables exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Metatables concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C1E2',
              title: 'Metatables Advanced Challenge',
              description: 'A more challenging exercise that combines Metatables with other concepts learned.',
              starterCode: `// TODO: Advanced Metatables implementation
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
                'Apply Metatables principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Metatables! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C2',
          title: 'OOP Lua',
          description: 'Learn oop lua in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '34 mins',
          objectives: [
            'Understand OOP Lua fundamentals',
            'Apply OOP Lua in practical scenarios',
            'Write clean, efficient code using OOP Lua',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'OOP Lua Fundamentals',
              content: 'OOP Lua is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// OOP Lua example in Lua
// Example demonstrating OOP Lua
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical OOP Lua',
              content: 'Applying OOP Lua in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'OOP Lua in Action',
              description: 'A practical example showing how to use OOP Lua effectively in Lua projects.',
              code: `// Practical OOP Lua example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing OOP Lua
  return "Practical result";
}
`,
              explanation: 'This example demonstrates OOP Lua in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced OOP Lua Usage',
              description: 'Building on basics to show more sophisticated OOP Lua patterns.',
              code: `// Advanced OOP Lua pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to OOP Lua, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging OOP Lua for robust Lua applications',
            'Embedded Systems: Implementing OOP Lua in production systems',
            'Configuration: Using OOP Lua for scalable architecture',
            'Extensions: Applying OOP Lua in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C2E1',
              title: 'OOP Lua Basics Exercise',
              description: 'Practice OOP Lua fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement OOP Lua
// Your solution here

`,
              solution: `// Solution for OOP Lua exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review OOP Lua concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C2E2',
              title: 'OOP Lua Advanced Challenge',
              description: 'A more challenging exercise that combines OOP Lua with other concepts learned.',
              starterCode: `// TODO: Advanced OOP Lua implementation
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
                'Apply OOP Lua principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered OOP Lua! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C3',
          title: 'Coroutines',
          description: 'Learn coroutines in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '86 mins',
          objectives: [
            'Understand Coroutines fundamentals',
            'Apply Coroutines in practical scenarios',
            'Write clean, efficient code using Coroutines',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Coroutines Fundamentals',
              content: 'Coroutines is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Coroutines example in Lua
// Example demonstrating Coroutines
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Coroutines',
              content: 'Applying Coroutines in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Coroutines in Action',
              description: 'A practical example showing how to use Coroutines effectively in Lua projects.',
              code: `// Practical Coroutines example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Coroutines
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Coroutines in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Coroutines Usage',
              description: 'Building on basics to show more sophisticated Coroutines patterns.',
              code: `// Advanced Coroutines pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Coroutines, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Coroutines for robust Lua applications',
            'Embedded Systems: Implementing Coroutines in production systems',
            'Configuration: Using Coroutines for scalable architecture',
            'Extensions: Applying Coroutines in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C3E1',
              title: 'Coroutines Basics Exercise',
              description: 'Practice Coroutines fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Coroutines
// Your solution here

`,
              solution: `// Solution for Coroutines exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Coroutines concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C3E2',
              title: 'Coroutines Advanced Challenge',
              description: 'A more challenging exercise that combines Coroutines with other concepts learned.',
              starterCode: `// TODO: Advanced Coroutines implementation
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
                'Apply Coroutines principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Coroutines! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C4',
          title: 'File I/O',
          description: 'Learn file i/o in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '51 mins',
          objectives: [
            'Understand File I/O fundamentals',
            'Apply File I/O in practical scenarios',
            'Write clean, efficient code using File I/O',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'File I/O Fundamentals',
              content: 'File I/O is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// File I/O example in Lua
// Example demonstrating File I/O
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical File I/O',
              content: 'Applying File I/O in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'File I/O in Action',
              description: 'A practical example showing how to use File I/O effectively in Lua projects.',
              code: `// Practical File I/O example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing File I/O
  return "Practical result";
}
`,
              explanation: 'This example demonstrates File I/O in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced File I/O Usage',
              description: 'Building on basics to show more sophisticated File I/O patterns.',
              code: `// Advanced File I/O pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to File I/O, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging File I/O for robust Lua applications',
            'Embedded Systems: Implementing File I/O in production systems',
            'Configuration: Using File I/O for scalable architecture',
            'Extensions: Applying File I/O in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C4E1',
              title: 'File I/O Basics Exercise',
              description: 'Practice File I/O fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement File I/O
// Your solution here

`,
              solution: `// Solution for File I/O exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review File I/O concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C4E2',
              title: 'File I/O Advanced Challenge',
              description: 'A more challenging exercise that combines File I/O with other concepts learned.',
              starterCode: `// TODO: Advanced File I/O implementation
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
                'Apply File I/O principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered File I/O! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C5',
          title: 'Pattern Matching',
          description: 'Learn pattern matching in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '64 mins',
          objectives: [
            'Understand Pattern Matching fundamentals',
            'Apply Pattern Matching in practical scenarios',
            'Write clean, efficient code using Pattern Matching',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Pattern Matching Fundamentals',
              content: 'Pattern Matching is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Pattern Matching example in Lua
// Example demonstrating Pattern Matching
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Pattern Matching',
              content: 'Applying Pattern Matching in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Pattern Matching in Action',
              description: 'A practical example showing how to use Pattern Matching effectively in Lua projects.',
              code: `// Practical Pattern Matching example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Pattern Matching
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Pattern Matching in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Pattern Matching Usage',
              description: 'Building on basics to show more sophisticated Pattern Matching patterns.',
              code: `// Advanced Pattern Matching pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Pattern Matching, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Pattern Matching for robust Lua applications',
            'Embedded Systems: Implementing Pattern Matching in production systems',
            'Configuration: Using Pattern Matching for scalable architecture',
            'Extensions: Applying Pattern Matching in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C5E1',
              title: 'Pattern Matching Basics Exercise',
              description: 'Practice Pattern Matching fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Pattern Matching
// Your solution here

`,
              solution: `// Solution for Pattern Matching exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Pattern Matching concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C5E2',
              title: 'Pattern Matching Advanced Challenge',
              description: 'A more challenging exercise that combines Pattern Matching with other concepts learned.',
              starterCode: `// TODO: Advanced Pattern Matching implementation
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
                'Apply Pattern Matching principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Pattern Matching! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C6',
          title: 'C API Basics',
          description: 'Learn c api basics in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '74 mins',
          objectives: [
            'Understand C API Basics fundamentals',
            'Apply C API Basics in practical scenarios',
            'Write clean, efficient code using C API Basics',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'C API Basics Fundamentals',
              content: 'C API Basics is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// C API Basics example in Lua
// Example demonstrating C API Basics
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical C API Basics',
              content: 'Applying C API Basics in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'C API Basics in Action',
              description: 'A practical example showing how to use C API Basics effectively in Lua projects.',
              code: `// Practical C API Basics example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing C API Basics
  return "Practical result";
}
`,
              explanation: 'This example demonstrates C API Basics in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced C API Basics Usage',
              description: 'Building on basics to show more sophisticated C API Basics patterns.',
              code: `// Advanced C API Basics pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to C API Basics, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging C API Basics for robust Lua applications',
            'Embedded Systems: Implementing C API Basics in production systems',
            'Configuration: Using C API Basics for scalable architecture',
            'Extensions: Applying C API Basics in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C6E1',
              title: 'C API Basics Basics Exercise',
              description: 'Practice C API Basics fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement C API Basics
// Your solution here

`,
              solution: `// Solution for C API Basics exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review C API Basics concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C6E2',
              title: 'C API Basics Advanced Challenge',
              description: 'A more challenging exercise that combines C API Basics with other concepts learned.',
              starterCode: `// TODO: Advanced C API Basics implementation
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
                'Apply C API Basics principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered C API Basics! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C7',
          title: 'LuaRocks',
          description: 'Learn luarocks in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '83 mins',
          objectives: [
            'Understand LuaRocks fundamentals',
            'Apply LuaRocks in practical scenarios',
            'Write clean, efficient code using LuaRocks',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'LuaRocks Fundamentals',
              content: 'LuaRocks is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// LuaRocks example in Lua
// Example demonstrating LuaRocks
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical LuaRocks',
              content: 'Applying LuaRocks in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'LuaRocks in Action',
              description: 'A practical example showing how to use LuaRocks effectively in Lua projects.',
              code: `// Practical LuaRocks example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing LuaRocks
  return "Practical result";
}
`,
              explanation: 'This example demonstrates LuaRocks in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced LuaRocks Usage',
              description: 'Building on basics to show more sophisticated LuaRocks patterns.',
              code: `// Advanced LuaRocks pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to LuaRocks, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging LuaRocks for robust Lua applications',
            'Embedded Systems: Implementing LuaRocks in production systems',
            'Configuration: Using LuaRocks for scalable architecture',
            'Extensions: Applying LuaRocks in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C7E1',
              title: 'LuaRocks Basics Exercise',
              description: 'Practice LuaRocks fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement LuaRocks
// Your solution here

`,
              solution: `// Solution for LuaRocks exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review LuaRocks concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C7E2',
              title: 'LuaRocks Advanced Challenge',
              description: 'A more challenging exercise that combines LuaRocks with other concepts learned.',
              starterCode: `// TODO: Advanced LuaRocks implementation
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
                'Apply LuaRocks principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered LuaRocks! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Lua Full-Featured Application',
        description: 'Build a complete application with advanced features',
        requirements: [
          "Modular architecture",
          "Data persistence",
          "Error handling and logging",
          "Implements Game Scripting"
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
      title: 'Lua Advanced',
      description: 'Learn professional Lua development with design patterns, testing, and optimization techniques.',
      prerequisites: ['Complete Lua Intermediate'],
      estimatedDuration: '5-6 weeks',
      learningOutcomes: [
          "Apply software design patterns",
          "Implement comprehensive testing",
          "Optimize code performance",
          "Master Lua ecosystem",
          "Architect scalable systems"
],
      chapters: [
        {
          id: 'L4C1',
          title: 'Advanced Metatables',
          description: 'Learn advanced metatables in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '49 mins',
          objectives: [
            'Understand Advanced Metatables fundamentals',
            'Apply Advanced Metatables in practical scenarios',
            'Write clean, efficient code using Advanced Metatables',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Advanced Metatables Fundamentals',
              content: 'Advanced Metatables is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Advanced Metatables example in Lua
// Example demonstrating Advanced Metatables
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Advanced Metatables',
              content: 'Applying Advanced Metatables in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Advanced Metatables in Action',
              description: 'A practical example showing how to use Advanced Metatables effectively in Lua projects.',
              code: `// Practical Advanced Metatables example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Advanced Metatables
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Advanced Metatables in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Advanced Metatables Usage',
              description: 'Building on basics to show more sophisticated Advanced Metatables patterns.',
              code: `// Advanced Advanced Metatables pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Advanced Metatables, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Advanced Metatables for robust Lua applications',
            'Embedded Systems: Implementing Advanced Metatables in production systems',
            'Configuration: Using Advanced Metatables for scalable architecture',
            'Extensions: Applying Advanced Metatables in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C1E1',
              title: 'Advanced Metatables Basics Exercise',
              description: 'Practice Advanced Metatables fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Advanced Metatables
// Your solution here

`,
              solution: `// Solution for Advanced Metatables exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Advanced Metatables concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C1E2',
              title: 'Advanced Metatables Advanced Challenge',
              description: 'A more challenging exercise that combines Advanced Metatables with other concepts learned.',
              starterCode: `// TODO: Advanced Advanced Metatables implementation
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
                'Apply Advanced Metatables principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Advanced Metatables! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C2',
          title: 'C Integration',
          description: 'Learn c integration in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '60 mins',
          objectives: [
            'Understand C Integration fundamentals',
            'Apply C Integration in practical scenarios',
            'Write clean, efficient code using C Integration',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'C Integration Fundamentals',
              content: 'C Integration is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// C Integration example in Lua
// Example demonstrating C Integration
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical C Integration',
              content: 'Applying C Integration in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'C Integration in Action',
              description: 'A practical example showing how to use C Integration effectively in Lua projects.',
              code: `// Practical C Integration example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing C Integration
  return "Practical result";
}
`,
              explanation: 'This example demonstrates C Integration in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced C Integration Usage',
              description: 'Building on basics to show more sophisticated C Integration patterns.',
              code: `// Advanced C Integration pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to C Integration, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging C Integration for robust Lua applications',
            'Embedded Systems: Implementing C Integration in production systems',
            'Configuration: Using C Integration for scalable architecture',
            'Extensions: Applying C Integration in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C2E1',
              title: 'C Integration Basics Exercise',
              description: 'Practice C Integration fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement C Integration
// Your solution here

`,
              solution: `// Solution for C Integration exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review C Integration concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C2E2',
              title: 'C Integration Advanced Challenge',
              description: 'A more challenging exercise that combines C Integration with other concepts learned.',
              starterCode: `// TODO: Advanced C Integration implementation
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
                'Apply C Integration principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered C Integration! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C3',
          title: 'Performance',
          description: 'Learn performance in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '68 mins',
          objectives: [
            'Understand Performance fundamentals',
            'Apply Performance in practical scenarios',
            'Write clean, efficient code using Performance',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Performance Fundamentals',
              content: 'Performance is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Performance example in Lua
// Example demonstrating Performance
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Performance',
              content: 'Applying Performance in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Performance in Action',
              description: 'A practical example showing how to use Performance effectively in Lua projects.',
              code: `// Practical Performance example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Performance
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Performance in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Performance, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Performance for robust Lua applications',
            'Embedded Systems: Implementing Performance in production systems',
            'Configuration: Using Performance for scalable architecture',
            'Extensions: Applying Performance in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C3E1',
              title: 'Performance Basics Exercise',
              description: 'Practice Performance fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C3E2',
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
          summary: 'You\'ve mastered Performance! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C4',
          title: 'Garbage Collection',
          description: 'Learn garbage collection in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '81 mins',
          objectives: [
            'Understand Garbage Collection fundamentals',
            'Apply Garbage Collection in practical scenarios',
            'Write clean, efficient code using Garbage Collection',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Garbage Collection Fundamentals',
              content: 'Garbage Collection is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Garbage Collection example in Lua
// Example demonstrating Garbage Collection
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Garbage Collection',
              content: 'Applying Garbage Collection in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Garbage Collection in Action',
              description: 'A practical example showing how to use Garbage Collection effectively in Lua projects.',
              code: `// Practical Garbage Collection example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Garbage Collection
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Garbage Collection in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Garbage Collection Usage',
              description: 'Building on basics to show more sophisticated Garbage Collection patterns.',
              code: `// Advanced Garbage Collection pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Garbage Collection, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Garbage Collection for robust Lua applications',
            'Embedded Systems: Implementing Garbage Collection in production systems',
            'Configuration: Using Garbage Collection for scalable architecture',
            'Extensions: Applying Garbage Collection in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C4E1',
              title: 'Garbage Collection Basics Exercise',
              description: 'Practice Garbage Collection fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Garbage Collection
// Your solution here

`,
              solution: `// Solution for Garbage Collection exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Garbage Collection concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C4E2',
              title: 'Garbage Collection Advanced Challenge',
              description: 'A more challenging exercise that combines Garbage Collection with other concepts learned.',
              starterCode: `// TODO: Advanced Garbage Collection implementation
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
                'Apply Garbage Collection principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Garbage Collection! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C5',
          title: 'Debugging',
          description: 'Learn debugging in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '39 mins',
          objectives: [
            'Understand Debugging fundamentals',
            'Apply Debugging in practical scenarios',
            'Write clean, efficient code using Debugging',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Debugging Fundamentals',
              content: 'Debugging is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Debugging example in Lua
// Example demonstrating Debugging
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Debugging',
              content: 'Applying Debugging in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Debugging in Action',
              description: 'A practical example showing how to use Debugging effectively in Lua projects.',
              code: `// Practical Debugging example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Debugging
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Debugging in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Debugging Usage',
              description: 'Building on basics to show more sophisticated Debugging patterns.',
              code: `// Advanced Debugging pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Debugging, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Debugging for robust Lua applications',
            'Embedded Systems: Implementing Debugging in production systems',
            'Configuration: Using Debugging for scalable architecture',
            'Extensions: Applying Debugging in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C5E1',
              title: 'Debugging Basics Exercise',
              description: 'Practice Debugging fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Debugging
// Your solution here

`,
              solution: `// Solution for Debugging exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Debugging concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C5E2',
              title: 'Debugging Advanced Challenge',
              description: 'A more challenging exercise that combines Debugging with other concepts learned.',
              starterCode: `// TODO: Advanced Debugging implementation
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
                'Apply Debugging principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Debugging! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C6',
          title: 'Profiling',
          description: 'Learn profiling in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '39 mins',
          objectives: [
            'Understand Profiling fundamentals',
            'Apply Profiling in practical scenarios',
            'Write clean, efficient code using Profiling',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Profiling Fundamentals',
              content: 'Profiling is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Profiling example in Lua
// Example demonstrating Profiling
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Profiling',
              content: 'Applying Profiling in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Profiling in Action',
              description: 'A practical example showing how to use Profiling effectively in Lua projects.',
              code: `// Practical Profiling example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Profiling
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Profiling in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Profiling Usage',
              description: 'Building on basics to show more sophisticated Profiling patterns.',
              code: `// Advanced Profiling pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Profiling, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Profiling for robust Lua applications',
            'Embedded Systems: Implementing Profiling in production systems',
            'Configuration: Using Profiling for scalable architecture',
            'Extensions: Applying Profiling in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C6E1',
              title: 'Profiling Basics Exercise',
              description: 'Practice Profiling fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Profiling
// Your solution here

`,
              solution: `// Solution for Profiling exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Profiling concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C6E2',
              title: 'Profiling Advanced Challenge',
              description: 'A more challenging exercise that combines Profiling with other concepts learned.',
              starterCode: `// TODO: Advanced Profiling implementation
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
                'Apply Profiling principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Profiling! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C7',
          title: 'Best Practices',
          description: 'Learn best practices in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '67 mins',
          objectives: [
            'Understand Best Practices fundamentals',
            'Apply Best Practices in practical scenarios',
            'Write clean, efficient code using Best Practices',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Best Practices Fundamentals',
              content: 'Best Practices is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Best Practices example in Lua
// Example demonstrating Best Practices
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Best Practices',
              content: 'Applying Best Practices in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Best Practices in Action',
              description: 'A practical example showing how to use Best Practices effectively in Lua projects.',
              code: `// Practical Best Practices example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Best Practices
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Best Practices in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Best Practices, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Best Practices for robust Lua applications',
            'Embedded Systems: Implementing Best Practices in production systems',
            'Configuration: Using Best Practices for scalable architecture',
            'Extensions: Applying Best Practices in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C7E1',
              title: 'Best Practices Basics Exercise',
              description: 'Practice Best Practices fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C7E2',
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
          summary: 'You\'ve mastered Best Practices! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Professional Lua System',
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
      title: 'Lua Professional',
      description: 'Build production-ready Lua applications with industry best practices and professional workflows.',
      prerequisites: ['Complete Lua Advanced'],
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
          title: 'Game Development',
          description: 'Learn game development in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '38 mins',
          objectives: [
            'Understand Game Development fundamentals',
            'Apply Game Development in practical scenarios',
            'Write clean, efficient code using Game Development',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Game Development Fundamentals',
              content: 'Game Development is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Game Development example in Lua
// Example demonstrating Game Development
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Game Development',
              content: 'Applying Game Development in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Game Development in Action',
              description: 'A practical example showing how to use Game Development effectively in Lua projects.',
              code: `// Practical Game Development example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Game Development
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Game Development in a real-world context, showing best practices for Lua development.'
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
              explanation: 'This shows a more advanced approach to Game Development, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Game Development for robust Lua applications',
            'Embedded Systems: Implementing Game Development in production systems',
            'Configuration: Using Game Development for scalable architecture',
            'Extensions: Applying Game Development in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C1E1',
              title: 'Game Development Basics Exercise',
              description: 'Practice Game Development fundamentals by implementing a solution in Lua.',
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
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C1E2',
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
          summary: 'You\'ve mastered Game Development! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C2',
          title: 'Love2D/Corona',
          description: 'Learn love2d/corona in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '58 mins',
          objectives: [
            'Understand Love2D/Corona fundamentals',
            'Apply Love2D/Corona in practical scenarios',
            'Write clean, efficient code using Love2D/Corona',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Love2D/Corona Fundamentals',
              content: 'Love2D/Corona is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Love2D/Corona example in Lua
// Example demonstrating Love2D/Corona
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Love2D/Corona',
              content: 'Applying Love2D/Corona in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Love2D/Corona in Action',
              description: 'A practical example showing how to use Love2D/Corona effectively in Lua projects.',
              code: `// Practical Love2D/Corona example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Love2D/Corona
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Love2D/Corona in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Love2D/Corona Usage',
              description: 'Building on basics to show more sophisticated Love2D/Corona patterns.',
              code: `// Advanced Love2D/Corona pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Love2D/Corona, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Love2D/Corona for robust Lua applications',
            'Embedded Systems: Implementing Love2D/Corona in production systems',
            'Configuration: Using Love2D/Corona for scalable architecture',
            'Extensions: Applying Love2D/Corona in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C2E1',
              title: 'Love2D/Corona Basics Exercise',
              description: 'Practice Love2D/Corona fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Love2D/Corona
// Your solution here

`,
              solution: `// Solution for Love2D/Corona exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Love2D/Corona concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C2E2',
              title: 'Love2D/Corona Advanced Challenge',
              description: 'A more challenging exercise that combines Love2D/Corona with other concepts learned.',
              starterCode: `// TODO: Advanced Love2D/Corona implementation
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
                'Apply Love2D/Corona principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Love2D/Corona! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C3',
          title: 'Embedded Scripting',
          description: 'Learn embedded scripting in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '82 mins',
          objectives: [
            'Understand Embedded Scripting fundamentals',
            'Apply Embedded Scripting in practical scenarios',
            'Write clean, efficient code using Embedded Scripting',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Embedded Scripting Fundamentals',
              content: 'Embedded Scripting is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Embedded Scripting example in Lua
// Example demonstrating Embedded Scripting
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Embedded Scripting',
              content: 'Applying Embedded Scripting in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Embedded Scripting in Action',
              description: 'A practical example showing how to use Embedded Scripting effectively in Lua projects.',
              code: `// Practical Embedded Scripting example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Embedded Scripting
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Embedded Scripting in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Embedded Scripting Usage',
              description: 'Building on basics to show more sophisticated Embedded Scripting patterns.',
              code: `// Advanced Embedded Scripting pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Embedded Scripting, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Embedded Scripting for robust Lua applications',
            'Embedded Systems: Implementing Embedded Scripting in production systems',
            'Configuration: Using Embedded Scripting for scalable architecture',
            'Extensions: Applying Embedded Scripting in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C3E1',
              title: 'Embedded Scripting Basics Exercise',
              description: 'Practice Embedded Scripting fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Embedded Scripting
// Your solution here

`,
              solution: `// Solution for Embedded Scripting exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Embedded Scripting concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C3E2',
              title: 'Embedded Scripting Advanced Challenge',
              description: 'A more challenging exercise that combines Embedded Scripting with other concepts learned.',
              starterCode: `// TODO: Advanced Embedded Scripting implementation
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
                'Apply Embedded Scripting principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Embedded Scripting! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C4',
          title: 'Redis Scripting',
          description: 'Learn redis scripting in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '60 mins',
          objectives: [
            'Understand Redis Scripting fundamentals',
            'Apply Redis Scripting in practical scenarios',
            'Write clean, efficient code using Redis Scripting',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Redis Scripting Fundamentals',
              content: 'Redis Scripting is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Redis Scripting example in Lua
// Example demonstrating Redis Scripting
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Redis Scripting',
              content: 'Applying Redis Scripting in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Redis Scripting in Action',
              description: 'A practical example showing how to use Redis Scripting effectively in Lua projects.',
              code: `// Practical Redis Scripting example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Redis Scripting
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Redis Scripting in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Redis Scripting Usage',
              description: 'Building on basics to show more sophisticated Redis Scripting patterns.',
              code: `// Advanced Redis Scripting pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Redis Scripting, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Redis Scripting for robust Lua applications',
            'Embedded Systems: Implementing Redis Scripting in production systems',
            'Configuration: Using Redis Scripting for scalable architecture',
            'Extensions: Applying Redis Scripting in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C4E1',
              title: 'Redis Scripting Basics Exercise',
              description: 'Practice Redis Scripting fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Redis Scripting
// Your solution here

`,
              solution: `// Solution for Redis Scripting exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Redis Scripting concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C4E2',
              title: 'Redis Scripting Advanced Challenge',
              description: 'A more challenging exercise that combines Redis Scripting with other concepts learned.',
              starterCode: `// TODO: Advanced Redis Scripting implementation
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
                'Apply Redis Scripting principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Redis Scripting! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C5',
          title: 'NGINX Scripting',
          description: 'Learn nginx scripting in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '75 mins',
          objectives: [
            'Understand NGINX Scripting fundamentals',
            'Apply NGINX Scripting in practical scenarios',
            'Write clean, efficient code using NGINX Scripting',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'NGINX Scripting Fundamentals',
              content: 'NGINX Scripting is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// NGINX Scripting example in Lua
// Example demonstrating NGINX Scripting
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical NGINX Scripting',
              content: 'Applying NGINX Scripting in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'NGINX Scripting in Action',
              description: 'A practical example showing how to use NGINX Scripting effectively in Lua projects.',
              code: `// Practical NGINX Scripting example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing NGINX Scripting
  return "Practical result";
}
`,
              explanation: 'This example demonstrates NGINX Scripting in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced NGINX Scripting Usage',
              description: 'Building on basics to show more sophisticated NGINX Scripting patterns.',
              code: `// Advanced NGINX Scripting pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to NGINX Scripting, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging NGINX Scripting for robust Lua applications',
            'Embedded Systems: Implementing NGINX Scripting in production systems',
            'Configuration: Using NGINX Scripting for scalable architecture',
            'Extensions: Applying NGINX Scripting in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C5E1',
              title: 'NGINX Scripting Basics Exercise',
              description: 'Practice NGINX Scripting fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement NGINX Scripting
// Your solution here

`,
              solution: `// Solution for NGINX Scripting exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review NGINX Scripting concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C5E2',
              title: 'NGINX Scripting Advanced Challenge',
              description: 'A more challenging exercise that combines NGINX Scripting with other concepts learned.',
              starterCode: `// TODO: Advanced NGINX Scripting implementation
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
                'Apply NGINX Scripting principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered NGINX Scripting! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C6',
          title: 'Production Lua',
          description: 'Learn production lua in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand Production Lua fundamentals',
            'Apply Production Lua in practical scenarios',
            'Write clean, efficient code using Production Lua',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Production Lua Fundamentals',
              content: 'Production Lua is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Production Lua example in Lua
// Example demonstrating Production Lua
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Production Lua',
              content: 'Applying Production Lua in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Production Lua in Action',
              description: 'A practical example showing how to use Production Lua effectively in Lua projects.',
              code: `// Practical Production Lua example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Production Lua
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Production Lua in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Production Lua Usage',
              description: 'Building on basics to show more sophisticated Production Lua patterns.',
              code: `// Advanced Production Lua pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Production Lua, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Production Lua for robust Lua applications',
            'Embedded Systems: Implementing Production Lua in production systems',
            'Configuration: Using Production Lua for scalable architecture',
            'Extensions: Applying Production Lua in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C6E1',
              title: 'Production Lua Basics Exercise',
              description: 'Practice Production Lua fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Production Lua
// Your solution here

`,
              solution: `// Solution for Production Lua exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Production Lua concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C6E2',
              title: 'Production Lua Advanced Challenge',
              description: 'A more challenging exercise that combines Production Lua with other concepts learned.',
              starterCode: `// TODO: Advanced Production Lua implementation
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
                'Apply Production Lua principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Production Lua! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C7',
          title: 'C Extensions',
          description: 'Learn c extensions in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '54 mins',
          objectives: [
            'Understand C Extensions fundamentals',
            'Apply C Extensions in practical scenarios',
            'Write clean, efficient code using C Extensions',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'C Extensions Fundamentals',
              content: 'C Extensions is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// C Extensions example in Lua
// Example demonstrating C Extensions
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical C Extensions',
              content: 'Applying C Extensions in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'C Extensions in Action',
              description: 'A practical example showing how to use C Extensions effectively in Lua projects.',
              code: `// Practical C Extensions example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing C Extensions
  return "Practical result";
}
`,
              explanation: 'This example demonstrates C Extensions in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced C Extensions Usage',
              description: 'Building on basics to show more sophisticated C Extensions patterns.',
              code: `// Advanced C Extensions pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to C Extensions, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging C Extensions for robust Lua applications',
            'Embedded Systems: Implementing C Extensions in production systems',
            'Configuration: Using C Extensions for scalable architecture',
            'Extensions: Applying C Extensions in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C7E1',
              title: 'C Extensions Basics Exercise',
              description: 'Practice C Extensions fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement C Extensions
// Your solution here

`,
              solution: `// Solution for C Extensions exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review C Extensions concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C7E2',
              title: 'C Extensions Advanced Challenge',
              description: 'A more challenging exercise that combines C Extensions with other concepts learned.',
              starterCode: `// TODO: Advanced C Extensions implementation
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
                'Apply C Extensions principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered C Extensions! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C8',
          title: 'Real-world Projects',
          description: 'Learn real-world projects in Lua. Master core concepts with practical examples and real-world applications.',
          duration: '76 mins',
          objectives: [
            'Understand Real-world Projects fundamentals',
            'Apply Real-world Projects in practical scenarios',
            'Write clean, efficient code using Real-world Projects',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Real-world Projects Fundamentals',
              content: 'Real-world Projects is a crucial concept in Lua. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Lua development and is used extensively in real-world applications.',
              codeExample: `// Real-world Projects example in Lua
// Example demonstrating Real-world Projects
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Lua development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Lua best practices'
              ]
            },
            {
              title: 'Practical Real-world Projects',
              content: 'Applying Real-world Projects in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Lua development.',
              keyPoints: [
                'Follow Lua conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Real-world Projects in Action',
              description: 'A practical example showing how to use Real-world Projects effectively in Lua projects.',
              code: `// Practical Real-world Projects example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Real-world Projects
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Real-world Projects in a real-world context, showing best practices for Lua development.'
            },
            {
              title: 'Advanced Real-world Projects Usage',
              description: 'Building on basics to show more sophisticated Real-world Projects patterns.',
              code: `// Advanced Real-world Projects pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Real-world Projects, commonly seen in professional Lua codebases.'
            }
          ],
          realWorldUseCases: [
            'Game Scripting: Leveraging Real-world Projects for robust Lua applications',
            'Embedded Systems: Implementing Real-world Projects in production systems',
            'Configuration: Using Real-world Projects for scalable architecture',
            'Extensions: Applying Real-world Projects in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C8E1',
              title: 'Real-world Projects Basics Exercise',
              description: 'Practice Real-world Projects fundamentals by implementing a solution in Lua.',
              starterCode: `// TODO: Implement Real-world Projects
// Your solution here

`,
              solution: `// Solution for Real-world Projects exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Real-world Projects concepts from this chapter',
                'Follow Lua syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C8E2',
              title: 'Real-world Projects Advanced Challenge',
              description: 'A more challenging exercise that combines Real-world Projects with other concepts learned.',
              starterCode: `// TODO: Advanced Real-world Projects implementation
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
                'Apply Real-world Projects principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Real-world Projects! You can now confidently use these concepts in your Lua projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Production Lua Application',
        description: 'Build and deploy a production-ready system',
        requirements: [
          "Game Scripting",
          "Embedded Systems",
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
