import { Curriculum } from '../types';

export const rCurriculum: Curriculum = {
  meta: {
    slug: 'r',
    title: 'R Programming',
    shortDescription: 'Master R - statistical computing and graphics',
    longDescription: 'Complete R Programming course from basics to professional level. Learn R 4.3+ with modern best practices, hands-on projects, and industry-standard techniques. Focus on Statistical analysis, data visualization, research.',
    icon: '📊',
    color: '#276DC3',
    category: 'Programming Languages',
    tags: ['r', 'Statistical analysis'],
    prerequisites: ['Statistics basics helpful'],
    targetAudience: [
      'Beginners to R',
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
      'Data Analysis',
      'Statistical Modeling',
      'Data Visualization',
      'Research'
    ],
    toolsAndTechnologies: [
      'R R 4.3+',
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
      title: 'R Basics',
      description: 'Begin your R journey. Learn fundamental syntax, core concepts, and write your first programs.',
      prerequisites: [],
      estimatedDuration: '2-3 weeks',
      learningOutcomes: [
          "Understand R syntax and fundamentals",
          "Write and execute basic programs",
          "Work with core data types and structures",
          "Apply basic operations and logic",
          "Debug simple code issues"
],
      chapters: [
        {
          id: 'L1C1',
          title: 'Introduction',
          description: 'Learn introduction in R. Master core concepts with practical examples and real-world applications.',
          duration: '74 mins',
          objectives: [
            'Understand Introduction fundamentals',
            'Apply Introduction in practical scenarios',
            'Write clean, efficient code using Introduction',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Introduction Fundamentals',
              content: 'Introduction is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Introduction example in R
// Example demonstrating Introduction
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Introduction',
              content: 'Applying Introduction in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Introduction in Action',
              description: 'A practical example showing how to use Introduction effectively in R projects.',
              code: `// Practical Introduction example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Introduction
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Introduction in a real-world context, showing best practices for R development.'
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
              explanation: 'This shows a more advanced approach to Introduction, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Introduction for robust R applications',
            'Statistical Modeling: Implementing Introduction in production systems',
            'Data Visualization: Using Introduction for scalable architecture',
            'Research: Applying Introduction in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C1E1',
              title: 'Introduction Basics Exercise',
              description: 'Practice Introduction fundamentals by implementing a solution in R.',
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
                'Follow R syntax and conventions',
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
          summary: 'You\'ve mastered Introduction! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C2',
          title: 'Vectors',
          description: 'Learn vectors in R. Master core concepts with practical examples and real-world applications.',
          duration: '66 mins',
          objectives: [
            'Understand Vectors fundamentals',
            'Apply Vectors in practical scenarios',
            'Write clean, efficient code using Vectors',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Vectors Fundamentals',
              content: 'Vectors is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Vectors example in R
// Example demonstrating Vectors
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Vectors',
              content: 'Applying Vectors in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Vectors in Action',
              description: 'A practical example showing how to use Vectors effectively in R projects.',
              code: `// Practical Vectors example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Vectors
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Vectors in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Vectors Usage',
              description: 'Building on basics to show more sophisticated Vectors patterns.',
              code: `// Advanced Vectors pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Vectors, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Vectors for robust R applications',
            'Statistical Modeling: Implementing Vectors in production systems',
            'Data Visualization: Using Vectors for scalable architecture',
            'Research: Applying Vectors in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C2E1',
              title: 'Vectors Basics Exercise',
              description: 'Practice Vectors fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Vectors
// Your solution here

`,
              solution: `// Solution for Vectors exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Vectors concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C2E2',
              title: 'Vectors Advanced Challenge',
              description: 'A more challenging exercise that combines Vectors with other concepts learned.',
              starterCode: `// TODO: Advanced Vectors implementation
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
                'Apply Vectors principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Vectors! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C3',
          title: 'Data Types',
          description: 'Learn data types in R. Master core concepts with practical examples and real-world applications.',
          duration: '87 mins',
          objectives: [
            'Understand Data Types fundamentals',
            'Apply Data Types in practical scenarios',
            'Write clean, efficient code using Data Types',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Data Types Fundamentals',
              content: 'Data Types is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Data Types example in R
// Example demonstrating Data Types
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Data Types',
              content: 'Applying Data Types in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Data Types in Action',
              description: 'A practical example showing how to use Data Types effectively in R projects.',
              code: `// Practical Data Types example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Data Types
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Data Types in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Data Types Usage',
              description: 'Building on basics to show more sophisticated Data Types patterns.',
              code: `// Advanced Data Types pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Data Types, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Data Types for robust R applications',
            'Statistical Modeling: Implementing Data Types in production systems',
            'Data Visualization: Using Data Types for scalable architecture',
            'Research: Applying Data Types in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C3E1',
              title: 'Data Types Basics Exercise',
              description: 'Practice Data Types fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Data Types
// Your solution here

`,
              solution: `// Solution for Data Types exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Data Types concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C3E2',
              title: 'Data Types Advanced Challenge',
              description: 'A more challenging exercise that combines Data Types with other concepts learned.',
              starterCode: `// TODO: Advanced Data Types implementation
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
                'Apply Data Types principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Data Types! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C4',
          title: 'Basic Operations',
          description: 'Learn basic operations in R. Master core concepts with practical examples and real-world applications.',
          duration: '61 mins',
          objectives: [
            'Understand Basic Operations fundamentals',
            'Apply Basic Operations in practical scenarios',
            'Write clean, efficient code using Basic Operations',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Basic Operations Fundamentals',
              content: 'Basic Operations is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Basic Operations example in R
// Example demonstrating Basic Operations
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Basic Operations',
              content: 'Applying Basic Operations in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Basic Operations in Action',
              description: 'A practical example showing how to use Basic Operations effectively in R projects.',
              code: `// Practical Basic Operations example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Basic Operations
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Basic Operations in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Basic Operations Usage',
              description: 'Building on basics to show more sophisticated Basic Operations patterns.',
              code: `// Advanced Basic Operations pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Basic Operations, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Basic Operations for robust R applications',
            'Statistical Modeling: Implementing Basic Operations in production systems',
            'Data Visualization: Using Basic Operations for scalable architecture',
            'Research: Applying Basic Operations in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C4E1',
              title: 'Basic Operations Basics Exercise',
              description: 'Practice Basic Operations fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Basic Operations
// Your solution here

`,
              solution: `// Solution for Basic Operations exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Basic Operations concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C4E2',
              title: 'Basic Operations Advanced Challenge',
              description: 'A more challenging exercise that combines Basic Operations with other concepts learned.',
              starterCode: `// TODO: Advanced Basic Operations implementation
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
                'Apply Basic Operations principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Basic Operations! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C5',
          title: 'Functions',
          description: 'Learn functions in R. Master core concepts with practical examples and real-world applications.',
          duration: '37 mins',
          objectives: [
            'Understand Functions fundamentals',
            'Apply Functions in practical scenarios',
            'Write clean, efficient code using Functions',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Functions Fundamentals',
              content: 'Functions is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Functions example in R
// Example demonstrating Functions
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Functions',
              content: 'Applying Functions in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Functions in Action',
              description: 'A practical example showing how to use Functions effectively in R projects.',
              code: `// Practical Functions example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Functions
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Functions in a real-world context, showing best practices for R development.'
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
              explanation: 'This shows a more advanced approach to Functions, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Functions for robust R applications',
            'Statistical Modeling: Implementing Functions in production systems',
            'Data Visualization: Using Functions for scalable architecture',
            'Research: Applying Functions in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C5E1',
              title: 'Functions Basics Exercise',
              description: 'Practice Functions fundamentals by implementing a solution in R.',
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
                'Follow R syntax and conventions',
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
          summary: 'You\'ve mastered Functions! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'R Fundamentals Project',
        description: 'Build a console application demonstrating R basics',
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
      title: 'R Beginner',
      description: 'Build on fundamentals with control structures, functions, and data manipulation. Create functional R applications.',
      prerequisites: ['Complete R Basics'],
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
          title: 'Control Flow',
          description: 'Learn control flow in R. Master core concepts with practical examples and real-world applications.',
          duration: '77 mins',
          objectives: [
            'Understand Control Flow fundamentals',
            'Apply Control Flow in practical scenarios',
            'Write clean, efficient code using Control Flow',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Control Flow Fundamentals',
              content: 'Control Flow is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Control Flow example in R
// Example demonstrating Control Flow
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Control Flow',
              content: 'Applying Control Flow in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Control Flow in Action',
              description: 'A practical example showing how to use Control Flow effectively in R projects.',
              code: `// Practical Control Flow example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Control Flow
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Control Flow in a real-world context, showing best practices for R development.'
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
              explanation: 'This shows a more advanced approach to Control Flow, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Control Flow for robust R applications',
            'Statistical Modeling: Implementing Control Flow in production systems',
            'Data Visualization: Using Control Flow for scalable architecture',
            'Research: Applying Control Flow in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C1E1',
              title: 'Control Flow Basics Exercise',
              description: 'Practice Control Flow fundamentals by implementing a solution in R.',
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
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C1E2',
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
          summary: 'You\'ve mastered Control Flow! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C2',
          title: 'Loops',
          description: 'Learn loops in R. Master core concepts with practical examples and real-world applications.',
          duration: '61 mins',
          objectives: [
            'Understand Loops fundamentals',
            'Apply Loops in practical scenarios',
            'Write clean, efficient code using Loops',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Loops Fundamentals',
              content: 'Loops is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Loops example in R
// Example demonstrating Loops
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Loops',
              content: 'Applying Loops in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Loops in Action',
              description: 'A practical example showing how to use Loops effectively in R projects.',
              code: `// Practical Loops example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Loops
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Loops in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Loops Usage',
              description: 'Building on basics to show more sophisticated Loops patterns.',
              code: `// Advanced Loops pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Loops, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Loops for robust R applications',
            'Statistical Modeling: Implementing Loops in production systems',
            'Data Visualization: Using Loops for scalable architecture',
            'Research: Applying Loops in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C2E1',
              title: 'Loops Basics Exercise',
              description: 'Practice Loops fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Loops
// Your solution here

`,
              solution: `// Solution for Loops exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Loops concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C2E2',
              title: 'Loops Advanced Challenge',
              description: 'A more challenging exercise that combines Loops with other concepts learned.',
              starterCode: `// TODO: Advanced Loops implementation
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
                'Apply Loops principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Loops! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C3',
          title: 'Data Frames',
          description: 'Learn data frames in R. Master core concepts with practical examples and real-world applications.',
          duration: '75 mins',
          objectives: [
            'Understand Data Frames fundamentals',
            'Apply Data Frames in practical scenarios',
            'Write clean, efficient code using Data Frames',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Data Frames Fundamentals',
              content: 'Data Frames is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Data Frames example in R
// Example demonstrating Data Frames
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Data Frames',
              content: 'Applying Data Frames in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Data Frames in Action',
              description: 'A practical example showing how to use Data Frames effectively in R projects.',
              code: `// Practical Data Frames example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Data Frames
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Data Frames in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Data Frames Usage',
              description: 'Building on basics to show more sophisticated Data Frames patterns.',
              code: `// Advanced Data Frames pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Data Frames, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Data Frames for robust R applications',
            'Statistical Modeling: Implementing Data Frames in production systems',
            'Data Visualization: Using Data Frames for scalable architecture',
            'Research: Applying Data Frames in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C3E1',
              title: 'Data Frames Basics Exercise',
              description: 'Practice Data Frames fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Data Frames
// Your solution here

`,
              solution: `// Solution for Data Frames exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Data Frames concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C3E2',
              title: 'Data Frames Advanced Challenge',
              description: 'A more challenging exercise that combines Data Frames with other concepts learned.',
              starterCode: `// TODO: Advanced Data Frames implementation
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
                'Apply Data Frames principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Data Frames! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C4',
          title: 'Lists',
          description: 'Learn lists in R. Master core concepts with practical examples and real-world applications.',
          duration: '37 mins',
          objectives: [
            'Understand Lists fundamentals',
            'Apply Lists in practical scenarios',
            'Write clean, efficient code using Lists',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Lists Fundamentals',
              content: 'Lists is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Lists example in R
// Example demonstrating Lists
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Lists',
              content: 'Applying Lists in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Lists in Action',
              description: 'A practical example showing how to use Lists effectively in R projects.',
              code: `// Practical Lists example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Lists
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Lists in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Lists Usage',
              description: 'Building on basics to show more sophisticated Lists patterns.',
              code: `// Advanced Lists pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Lists, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Lists for robust R applications',
            'Statistical Modeling: Implementing Lists in production systems',
            'Data Visualization: Using Lists for scalable architecture',
            'Research: Applying Lists in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C4E1',
              title: 'Lists Basics Exercise',
              description: 'Practice Lists fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Lists
// Your solution here

`,
              solution: `// Solution for Lists exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Lists concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C4E2',
              title: 'Lists Advanced Challenge',
              description: 'A more challenging exercise that combines Lists with other concepts learned.',
              starterCode: `// TODO: Advanced Lists implementation
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
                'Apply Lists principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Lists! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C5',
          title: 'Factors',
          description: 'Learn factors in R. Master core concepts with practical examples and real-world applications.',
          duration: '44 mins',
          objectives: [
            'Understand Factors fundamentals',
            'Apply Factors in practical scenarios',
            'Write clean, efficient code using Factors',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Factors Fundamentals',
              content: 'Factors is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Factors example in R
// Example demonstrating Factors
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Factors',
              content: 'Applying Factors in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Factors in Action',
              description: 'A practical example showing how to use Factors effectively in R projects.',
              code: `// Practical Factors example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Factors
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Factors in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Factors Usage',
              description: 'Building on basics to show more sophisticated Factors patterns.',
              code: `// Advanced Factors pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Factors, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Factors for robust R applications',
            'Statistical Modeling: Implementing Factors in production systems',
            'Data Visualization: Using Factors for scalable architecture',
            'Research: Applying Factors in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C5E1',
              title: 'Factors Basics Exercise',
              description: 'Practice Factors fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Factors
// Your solution here

`,
              solution: `// Solution for Factors exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Factors concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C5E2',
              title: 'Factors Advanced Challenge',
              description: 'A more challenging exercise that combines Factors with other concepts learned.',
              starterCode: `// TODO: Advanced Factors implementation
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
                'Apply Factors principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Factors! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C6',
          title: 'Reading Data',
          description: 'Learn reading data in R. Master core concepts with practical examples and real-world applications.',
          duration: '36 mins',
          objectives: [
            'Understand Reading Data fundamentals',
            'Apply Reading Data in practical scenarios',
            'Write clean, efficient code using Reading Data',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Reading Data Fundamentals',
              content: 'Reading Data is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Reading Data example in R
// Example demonstrating Reading Data
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Reading Data',
              content: 'Applying Reading Data in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Reading Data in Action',
              description: 'A practical example showing how to use Reading Data effectively in R projects.',
              code: `// Practical Reading Data example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Reading Data
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Reading Data in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Reading Data Usage',
              description: 'Building on basics to show more sophisticated Reading Data patterns.',
              code: `// Advanced Reading Data pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Reading Data, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Reading Data for robust R applications',
            'Statistical Modeling: Implementing Reading Data in production systems',
            'Data Visualization: Using Reading Data for scalable architecture',
            'Research: Applying Reading Data in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C6E1',
              title: 'Reading Data Basics Exercise',
              description: 'Practice Reading Data fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Reading Data
// Your solution here

`,
              solution: `// Solution for Reading Data exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Reading Data concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C6E2',
              title: 'Reading Data Advanced Challenge',
              description: 'A more challenging exercise that combines Reading Data with other concepts learned.',
              starterCode: `// TODO: Advanced Reading Data implementation
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
                'Apply Reading Data principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Reading Data! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Interactive R Application',
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
      title: 'R Intermediate',
      description: 'Master advanced features, modules, and real-world development patterns in R.',
      prerequisites: ['Complete R Beginner'],
      estimatedDuration: '4-5 weeks',
      learningOutcomes: [
          "Master R advanced features",
          "Organize code with best practices",
          "Handle errors and edge cases",
          "Work with external data and APIs",
          "Build production-quality code"
],
      chapters: [
        {
          id: 'L3C1',
          title: 'dplyr',
          description: 'Learn dplyr in R. Master core concepts with practical examples and real-world applications.',
          duration: '86 mins',
          objectives: [
            'Understand dplyr fundamentals',
            'Apply dplyr in practical scenarios',
            'Write clean, efficient code using dplyr',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'dplyr Fundamentals',
              content: 'dplyr is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// dplyr example in R
// Example demonstrating dplyr
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical dplyr',
              content: 'Applying dplyr in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'dplyr in Action',
              description: 'A practical example showing how to use dplyr effectively in R projects.',
              code: `// Practical dplyr example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing dplyr
  return "Practical result";
}
`,
              explanation: 'This example demonstrates dplyr in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced dplyr Usage',
              description: 'Building on basics to show more sophisticated dplyr patterns.',
              code: `// Advanced dplyr pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to dplyr, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging dplyr for robust R applications',
            'Statistical Modeling: Implementing dplyr in production systems',
            'Data Visualization: Using dplyr for scalable architecture',
            'Research: Applying dplyr in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C1E1',
              title: 'dplyr Basics Exercise',
              description: 'Practice dplyr fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement dplyr
// Your solution here

`,
              solution: `// Solution for dplyr exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review dplyr concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C1E2',
              title: 'dplyr Advanced Challenge',
              description: 'A more challenging exercise that combines dplyr with other concepts learned.',
              starterCode: `// TODO: Advanced dplyr implementation
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
                'Apply dplyr principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered dplyr! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C2',
          title: 'ggplot2',
          description: 'Learn ggplot2 in R. Master core concepts with practical examples and real-world applications.',
          duration: '55 mins',
          objectives: [
            'Understand ggplot2 fundamentals',
            'Apply ggplot2 in practical scenarios',
            'Write clean, efficient code using ggplot2',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'ggplot2 Fundamentals',
              content: 'ggplot2 is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// ggplot2 example in R
// Example demonstrating ggplot2
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical ggplot2',
              content: 'Applying ggplot2 in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'ggplot2 in Action',
              description: 'A practical example showing how to use ggplot2 effectively in R projects.',
              code: `// Practical ggplot2 example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing ggplot2
  return "Practical result";
}
`,
              explanation: 'This example demonstrates ggplot2 in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced ggplot2 Usage',
              description: 'Building on basics to show more sophisticated ggplot2 patterns.',
              code: `// Advanced ggplot2 pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to ggplot2, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging ggplot2 for robust R applications',
            'Statistical Modeling: Implementing ggplot2 in production systems',
            'Data Visualization: Using ggplot2 for scalable architecture',
            'Research: Applying ggplot2 in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C2E1',
              title: 'ggplot2 Basics Exercise',
              description: 'Practice ggplot2 fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement ggplot2
// Your solution here

`,
              solution: `// Solution for ggplot2 exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review ggplot2 concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C2E2',
              title: 'ggplot2 Advanced Challenge',
              description: 'A more challenging exercise that combines ggplot2 with other concepts learned.',
              starterCode: `// TODO: Advanced ggplot2 implementation
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
                'Apply ggplot2 principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered ggplot2! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C3',
          title: 'tidyr',
          description: 'Learn tidyr in R. Master core concepts with practical examples and real-world applications.',
          duration: '89 mins',
          objectives: [
            'Understand tidyr fundamentals',
            'Apply tidyr in practical scenarios',
            'Write clean, efficient code using tidyr',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'tidyr Fundamentals',
              content: 'tidyr is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// tidyr example in R
// Example demonstrating tidyr
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical tidyr',
              content: 'Applying tidyr in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'tidyr in Action',
              description: 'A practical example showing how to use tidyr effectively in R projects.',
              code: `// Practical tidyr example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing tidyr
  return "Practical result";
}
`,
              explanation: 'This example demonstrates tidyr in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced tidyr Usage',
              description: 'Building on basics to show more sophisticated tidyr patterns.',
              code: `// Advanced tidyr pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to tidyr, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging tidyr for robust R applications',
            'Statistical Modeling: Implementing tidyr in production systems',
            'Data Visualization: Using tidyr for scalable architecture',
            'Research: Applying tidyr in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C3E1',
              title: 'tidyr Basics Exercise',
              description: 'Practice tidyr fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement tidyr
// Your solution here

`,
              solution: `// Solution for tidyr exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review tidyr concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C3E2',
              title: 'tidyr Advanced Challenge',
              description: 'A more challenging exercise that combines tidyr with other concepts learned.',
              starterCode: `// TODO: Advanced tidyr implementation
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
                'Apply tidyr principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered tidyr! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C4',
          title: 'Statistical Tests',
          description: 'Learn statistical tests in R. Master core concepts with practical examples and real-world applications.',
          duration: '55 mins',
          objectives: [
            'Understand Statistical Tests fundamentals',
            'Apply Statistical Tests in practical scenarios',
            'Write clean, efficient code using Statistical Tests',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Statistical Tests Fundamentals',
              content: 'Statistical Tests is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Statistical Tests example in R
// Example demonstrating Statistical Tests
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Statistical Tests',
              content: 'Applying Statistical Tests in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Statistical Tests in Action',
              description: 'A practical example showing how to use Statistical Tests effectively in R projects.',
              code: `// Practical Statistical Tests example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Statistical Tests
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Statistical Tests in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Statistical Tests Usage',
              description: 'Building on basics to show more sophisticated Statistical Tests patterns.',
              code: `// Advanced Statistical Tests pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Statistical Tests, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Statistical Tests for robust R applications',
            'Statistical Modeling: Implementing Statistical Tests in production systems',
            'Data Visualization: Using Statistical Tests for scalable architecture',
            'Research: Applying Statistical Tests in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C4E1',
              title: 'Statistical Tests Basics Exercise',
              description: 'Practice Statistical Tests fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Statistical Tests
// Your solution here

`,
              solution: `// Solution for Statistical Tests exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Statistical Tests concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C4E2',
              title: 'Statistical Tests Advanced Challenge',
              description: 'A more challenging exercise that combines Statistical Tests with other concepts learned.',
              starterCode: `// TODO: Advanced Statistical Tests implementation
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
                'Apply Statistical Tests principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Statistical Tests! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C5',
          title: 'Linear Models',
          description: 'Learn linear models in R. Master core concepts with practical examples and real-world applications.',
          duration: '75 mins',
          objectives: [
            'Understand Linear Models fundamentals',
            'Apply Linear Models in practical scenarios',
            'Write clean, efficient code using Linear Models',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Linear Models Fundamentals',
              content: 'Linear Models is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Linear Models example in R
// Example demonstrating Linear Models
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Linear Models',
              content: 'Applying Linear Models in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Linear Models in Action',
              description: 'A practical example showing how to use Linear Models effectively in R projects.',
              code: `// Practical Linear Models example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Linear Models
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Linear Models in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Linear Models Usage',
              description: 'Building on basics to show more sophisticated Linear Models patterns.',
              code: `// Advanced Linear Models pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Linear Models, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Linear Models for robust R applications',
            'Statistical Modeling: Implementing Linear Models in production systems',
            'Data Visualization: Using Linear Models for scalable architecture',
            'Research: Applying Linear Models in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C5E1',
              title: 'Linear Models Basics Exercise',
              description: 'Practice Linear Models fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Linear Models
// Your solution here

`,
              solution: `// Solution for Linear Models exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Linear Models concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C5E2',
              title: 'Linear Models Advanced Challenge',
              description: 'A more challenging exercise that combines Linear Models with other concepts learned.',
              starterCode: `// TODO: Advanced Linear Models implementation
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
                'Apply Linear Models principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Linear Models! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C6',
          title: 'Packages',
          description: 'Learn packages in R. Master core concepts with practical examples and real-world applications.',
          duration: '49 mins',
          objectives: [
            'Understand Packages fundamentals',
            'Apply Packages in practical scenarios',
            'Write clean, efficient code using Packages',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Packages Fundamentals',
              content: 'Packages is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Packages example in R
// Example demonstrating Packages
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Packages',
              content: 'Applying Packages in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Packages in Action',
              description: 'A practical example showing how to use Packages effectively in R projects.',
              code: `// Practical Packages example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Packages
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Packages in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Packages Usage',
              description: 'Building on basics to show more sophisticated Packages patterns.',
              code: `// Advanced Packages pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Packages, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Packages for robust R applications',
            'Statistical Modeling: Implementing Packages in production systems',
            'Data Visualization: Using Packages for scalable architecture',
            'Research: Applying Packages in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C6E1',
              title: 'Packages Basics Exercise',
              description: 'Practice Packages fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Packages
// Your solution here

`,
              solution: `// Solution for Packages exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Packages concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C6E2',
              title: 'Packages Advanced Challenge',
              description: 'A more challenging exercise that combines Packages with other concepts learned.',
              starterCode: `// TODO: Advanced Packages implementation
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
                'Apply Packages principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Packages! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C7',
          title: 'RMarkdown',
          description: 'Learn rmarkdown in R. Master core concepts with practical examples and real-world applications.',
          duration: '39 mins',
          objectives: [
            'Understand RMarkdown fundamentals',
            'Apply RMarkdown in practical scenarios',
            'Write clean, efficient code using RMarkdown',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'RMarkdown Fundamentals',
              content: 'RMarkdown is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// RMarkdown example in R
// Example demonstrating RMarkdown
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical RMarkdown',
              content: 'Applying RMarkdown in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'RMarkdown in Action',
              description: 'A practical example showing how to use RMarkdown effectively in R projects.',
              code: `// Practical RMarkdown example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing RMarkdown
  return "Practical result";
}
`,
              explanation: 'This example demonstrates RMarkdown in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced RMarkdown Usage',
              description: 'Building on basics to show more sophisticated RMarkdown patterns.',
              code: `// Advanced RMarkdown pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to RMarkdown, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging RMarkdown for robust R applications',
            'Statistical Modeling: Implementing RMarkdown in production systems',
            'Data Visualization: Using RMarkdown for scalable architecture',
            'Research: Applying RMarkdown in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C7E1',
              title: 'RMarkdown Basics Exercise',
              description: 'Practice RMarkdown fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement RMarkdown
// Your solution here

`,
              solution: `// Solution for RMarkdown exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review RMarkdown concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C7E2',
              title: 'RMarkdown Advanced Challenge',
              description: 'A more challenging exercise that combines RMarkdown with other concepts learned.',
              starterCode: `// TODO: Advanced RMarkdown implementation
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
                'Apply RMarkdown principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered RMarkdown! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'R Full-Featured Application',
        description: 'Build a complete application with advanced features',
        requirements: [
          "Modular architecture",
          "Data persistence",
          "Error handling and logging",
          "Implements Data Analysis"
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
      title: 'R Advanced',
      description: 'Learn professional R development with design patterns, testing, and optimization techniques.',
      prerequisites: ['Complete R Intermediate'],
      estimatedDuration: '5-6 weeks',
      learningOutcomes: [
          "Apply software design patterns",
          "Implement comprehensive testing",
          "Optimize code performance",
          "Master R ecosystem",
          "Architect scalable systems"
],
      chapters: [
        {
          id: 'L4C1',
          title: 'Advanced ggplot2',
          description: 'Learn advanced ggplot2 in R. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Advanced ggplot2 fundamentals',
            'Apply Advanced ggplot2 in practical scenarios',
            'Write clean, efficient code using Advanced ggplot2',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Advanced ggplot2 Fundamentals',
              content: 'Advanced ggplot2 is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Advanced ggplot2 example in R
// Example demonstrating Advanced ggplot2
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Advanced ggplot2',
              content: 'Applying Advanced ggplot2 in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Advanced ggplot2 in Action',
              description: 'A practical example showing how to use Advanced ggplot2 effectively in R projects.',
              code: `// Practical Advanced ggplot2 example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Advanced ggplot2
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Advanced ggplot2 in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Advanced ggplot2 Usage',
              description: 'Building on basics to show more sophisticated Advanced ggplot2 patterns.',
              code: `// Advanced Advanced ggplot2 pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Advanced ggplot2, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Advanced ggplot2 for robust R applications',
            'Statistical Modeling: Implementing Advanced ggplot2 in production systems',
            'Data Visualization: Using Advanced ggplot2 for scalable architecture',
            'Research: Applying Advanced ggplot2 in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C1E1',
              title: 'Advanced ggplot2 Basics Exercise',
              description: 'Practice Advanced ggplot2 fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Advanced ggplot2
// Your solution here

`,
              solution: `// Solution for Advanced ggplot2 exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Advanced ggplot2 concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C1E2',
              title: 'Advanced ggplot2 Advanced Challenge',
              description: 'A more challenging exercise that combines Advanced ggplot2 with other concepts learned.',
              starterCode: `// TODO: Advanced Advanced ggplot2 implementation
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
                'Apply Advanced ggplot2 principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Advanced ggplot2! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C2',
          title: 'Shiny',
          description: 'Learn shiny in R. Master core concepts with practical examples and real-world applications.',
          duration: '71 mins',
          objectives: [
            'Understand Shiny fundamentals',
            'Apply Shiny in practical scenarios',
            'Write clean, efficient code using Shiny',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Shiny Fundamentals',
              content: 'Shiny is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Shiny example in R
// Example demonstrating Shiny
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Shiny',
              content: 'Applying Shiny in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Shiny in Action',
              description: 'A practical example showing how to use Shiny effectively in R projects.',
              code: `// Practical Shiny example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Shiny
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Shiny in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Shiny Usage',
              description: 'Building on basics to show more sophisticated Shiny patterns.',
              code: `// Advanced Shiny pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Shiny, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Shiny for robust R applications',
            'Statistical Modeling: Implementing Shiny in production systems',
            'Data Visualization: Using Shiny for scalable architecture',
            'Research: Applying Shiny in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C2E1',
              title: 'Shiny Basics Exercise',
              description: 'Practice Shiny fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Shiny
// Your solution here

`,
              solution: `// Solution for Shiny exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Shiny concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C2E2',
              title: 'Shiny Advanced Challenge',
              description: 'A more challenging exercise that combines Shiny with other concepts learned.',
              starterCode: `// TODO: Advanced Shiny implementation
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
                'Apply Shiny principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Shiny! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C3',
          title: 'Machine Learning',
          description: 'Learn machine learning in R. Master core concepts with practical examples and real-world applications.',
          duration: '62 mins',
          objectives: [
            'Understand Machine Learning fundamentals',
            'Apply Machine Learning in practical scenarios',
            'Write clean, efficient code using Machine Learning',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Machine Learning Fundamentals',
              content: 'Machine Learning is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Machine Learning example in R
// Example demonstrating Machine Learning
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Machine Learning',
              content: 'Applying Machine Learning in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Machine Learning in Action',
              description: 'A practical example showing how to use Machine Learning effectively in R projects.',
              code: `// Practical Machine Learning example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Machine Learning
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Machine Learning in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Machine Learning Usage',
              description: 'Building on basics to show more sophisticated Machine Learning patterns.',
              code: `// Advanced Machine Learning pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Machine Learning, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Machine Learning for robust R applications',
            'Statistical Modeling: Implementing Machine Learning in production systems',
            'Data Visualization: Using Machine Learning for scalable architecture',
            'Research: Applying Machine Learning in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C3E1',
              title: 'Machine Learning Basics Exercise',
              description: 'Practice Machine Learning fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Machine Learning
// Your solution here

`,
              solution: `// Solution for Machine Learning exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Machine Learning concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C3E2',
              title: 'Machine Learning Advanced Challenge',
              description: 'A more challenging exercise that combines Machine Learning with other concepts learned.',
              starterCode: `// TODO: Advanced Machine Learning implementation
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
                'Apply Machine Learning principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Machine Learning! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C4',
          title: 'Time Series',
          description: 'Learn time series in R. Master core concepts with practical examples and real-world applications.',
          duration: '61 mins',
          objectives: [
            'Understand Time Series fundamentals',
            'Apply Time Series in practical scenarios',
            'Write clean, efficient code using Time Series',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Time Series Fundamentals',
              content: 'Time Series is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Time Series example in R
// Example demonstrating Time Series
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Time Series',
              content: 'Applying Time Series in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Time Series in Action',
              description: 'A practical example showing how to use Time Series effectively in R projects.',
              code: `// Practical Time Series example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Time Series
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Time Series in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Time Series Usage',
              description: 'Building on basics to show more sophisticated Time Series patterns.',
              code: `// Advanced Time Series pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Time Series, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Time Series for robust R applications',
            'Statistical Modeling: Implementing Time Series in production systems',
            'Data Visualization: Using Time Series for scalable architecture',
            'Research: Applying Time Series in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C4E1',
              title: 'Time Series Basics Exercise',
              description: 'Practice Time Series fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Time Series
// Your solution here

`,
              solution: `// Solution for Time Series exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Time Series concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C4E2',
              title: 'Time Series Advanced Challenge',
              description: 'A more challenging exercise that combines Time Series with other concepts learned.',
              starterCode: `// TODO: Advanced Time Series implementation
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
                'Apply Time Series principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Time Series! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C5',
          title: 'Advanced Stats',
          description: 'Learn advanced stats in R. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Advanced Stats fundamentals',
            'Apply Advanced Stats in practical scenarios',
            'Write clean, efficient code using Advanced Stats',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Advanced Stats Fundamentals',
              content: 'Advanced Stats is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Advanced Stats example in R
// Example demonstrating Advanced Stats
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Advanced Stats',
              content: 'Applying Advanced Stats in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Advanced Stats in Action',
              description: 'A practical example showing how to use Advanced Stats effectively in R projects.',
              code: `// Practical Advanced Stats example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Advanced Stats
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Advanced Stats in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Advanced Stats Usage',
              description: 'Building on basics to show more sophisticated Advanced Stats patterns.',
              code: `// Advanced Advanced Stats pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Advanced Stats, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Advanced Stats for robust R applications',
            'Statistical Modeling: Implementing Advanced Stats in production systems',
            'Data Visualization: Using Advanced Stats for scalable architecture',
            'Research: Applying Advanced Stats in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C5E1',
              title: 'Advanced Stats Basics Exercise',
              description: 'Practice Advanced Stats fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Advanced Stats
// Your solution here

`,
              solution: `// Solution for Advanced Stats exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Advanced Stats concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C5E2',
              title: 'Advanced Stats Advanced Challenge',
              description: 'A more challenging exercise that combines Advanced Stats with other concepts learned.',
              starterCode: `// TODO: Advanced Advanced Stats implementation
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
                'Apply Advanced Stats principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Advanced Stats! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C6',
          title: 'Performance',
          description: 'Learn performance in R. Master core concepts with practical examples and real-world applications.',
          duration: '60 mins',
          objectives: [
            'Understand Performance fundamentals',
            'Apply Performance in practical scenarios',
            'Write clean, efficient code using Performance',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Performance Fundamentals',
              content: 'Performance is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Performance example in R
// Example demonstrating Performance
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Performance',
              content: 'Applying Performance in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Performance in Action',
              description: 'A practical example showing how to use Performance effectively in R projects.',
              code: `// Practical Performance example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Performance
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Performance in a real-world context, showing best practices for R development.'
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
              explanation: 'This shows a more advanced approach to Performance, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Performance for robust R applications',
            'Statistical Modeling: Implementing Performance in production systems',
            'Data Visualization: Using Performance for scalable architecture',
            'Research: Applying Performance in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C6E1',
              title: 'Performance Basics Exercise',
              description: 'Practice Performance fundamentals by implementing a solution in R.',
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
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C6E2',
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
          summary: 'You\'ve mastered Performance! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C7',
          title: 'Package Development',
          description: 'Learn package development in R. Master core concepts with practical examples and real-world applications.',
          duration: '53 mins',
          objectives: [
            'Understand Package Development fundamentals',
            'Apply Package Development in practical scenarios',
            'Write clean, efficient code using Package Development',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Package Development Fundamentals',
              content: 'Package Development is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Package Development example in R
// Example demonstrating Package Development
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Package Development',
              content: 'Applying Package Development in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Package Development in Action',
              description: 'A practical example showing how to use Package Development effectively in R projects.',
              code: `// Practical Package Development example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Package Development
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Package Development in a real-world context, showing best practices for R development.'
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
              explanation: 'This shows a more advanced approach to Package Development, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Package Development for robust R applications',
            'Statistical Modeling: Implementing Package Development in production systems',
            'Data Visualization: Using Package Development for scalable architecture',
            'Research: Applying Package Development in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C7E1',
              title: 'Package Development Basics Exercise',
              description: 'Practice Package Development fundamentals by implementing a solution in R.',
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
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C7E2',
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
          summary: 'You\'ve mastered Package Development! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Professional R System',
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
      title: 'R Professional',
      description: 'Build production-ready R applications with industry best practices and professional workflows.',
      prerequisites: ['Complete R Advanced'],
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
          title: 'Production R',
          description: 'Learn production r in R. Master core concepts with practical examples and real-world applications.',
          duration: '56 mins',
          objectives: [
            'Understand Production R fundamentals',
            'Apply Production R in practical scenarios',
            'Write clean, efficient code using Production R',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Production R Fundamentals',
              content: 'Production R is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Production R example in R
// Example demonstrating Production R
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Production R',
              content: 'Applying Production R in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Production R in Action',
              description: 'A practical example showing how to use Production R effectively in R projects.',
              code: `// Practical Production R example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Production R
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Production R in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Production R Usage',
              description: 'Building on basics to show more sophisticated Production R patterns.',
              code: `// Advanced Production R pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Production R, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Production R for robust R applications',
            'Statistical Modeling: Implementing Production R in production systems',
            'Data Visualization: Using Production R for scalable architecture',
            'Research: Applying Production R in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C1E1',
              title: 'Production R Basics Exercise',
              description: 'Practice Production R fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Production R
// Your solution here

`,
              solution: `// Solution for Production R exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Production R concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C1E2',
              title: 'Production R Advanced Challenge',
              description: 'A more challenging exercise that combines Production R with other concepts learned.',
              starterCode: `// TODO: Advanced Production R implementation
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
                'Apply Production R principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Production R! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C2',
          title: 'Shiny Apps',
          description: 'Learn shiny apps in R. Master core concepts with practical examples and real-world applications.',
          duration: '68 mins',
          objectives: [
            'Understand Shiny Apps fundamentals',
            'Apply Shiny Apps in practical scenarios',
            'Write clean, efficient code using Shiny Apps',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Shiny Apps Fundamentals',
              content: 'Shiny Apps is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Shiny Apps example in R
// Example demonstrating Shiny Apps
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Shiny Apps',
              content: 'Applying Shiny Apps in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Shiny Apps in Action',
              description: 'A practical example showing how to use Shiny Apps effectively in R projects.',
              code: `// Practical Shiny Apps example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Shiny Apps
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Shiny Apps in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Shiny Apps Usage',
              description: 'Building on basics to show more sophisticated Shiny Apps patterns.',
              code: `// Advanced Shiny Apps pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Shiny Apps, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Shiny Apps for robust R applications',
            'Statistical Modeling: Implementing Shiny Apps in production systems',
            'Data Visualization: Using Shiny Apps for scalable architecture',
            'Research: Applying Shiny Apps in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C2E1',
              title: 'Shiny Apps Basics Exercise',
              description: 'Practice Shiny Apps fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Shiny Apps
// Your solution here

`,
              solution: `// Solution for Shiny Apps exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Shiny Apps concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C2E2',
              title: 'Shiny Apps Advanced Challenge',
              description: 'A more challenging exercise that combines Shiny Apps with other concepts learned.',
              starterCode: `// TODO: Advanced Shiny Apps implementation
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
                'Apply Shiny Apps principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Shiny Apps! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C3',
          title: 'APIs with plumber',
          description: 'Learn apis with plumber in R. Master core concepts with practical examples and real-world applications.',
          duration: '82 mins',
          objectives: [
            'Understand APIs with plumber fundamentals',
            'Apply APIs with plumber in practical scenarios',
            'Write clean, efficient code using APIs with plumber',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'APIs with plumber Fundamentals',
              content: 'APIs with plumber is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// APIs with plumber example in R
// Example demonstrating APIs with plumber
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical APIs with plumber',
              content: 'Applying APIs with plumber in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'APIs with plumber in Action',
              description: 'A practical example showing how to use APIs with plumber effectively in R projects.',
              code: `// Practical APIs with plumber example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing APIs with plumber
  return "Practical result";
}
`,
              explanation: 'This example demonstrates APIs with plumber in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced APIs with plumber Usage',
              description: 'Building on basics to show more sophisticated APIs with plumber patterns.',
              code: `// Advanced APIs with plumber pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to APIs with plumber, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging APIs with plumber for robust R applications',
            'Statistical Modeling: Implementing APIs with plumber in production systems',
            'Data Visualization: Using APIs with plumber for scalable architecture',
            'Research: Applying APIs with plumber in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C3E1',
              title: 'APIs with plumber Basics Exercise',
              description: 'Practice APIs with plumber fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement APIs with plumber
// Your solution here

`,
              solution: `// Solution for APIs with plumber exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review APIs with plumber concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C3E2',
              title: 'APIs with plumber Advanced Challenge',
              description: 'A more challenging exercise that combines APIs with plumber with other concepts learned.',
              starterCode: `// TODO: Advanced APIs with plumber implementation
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
                'Apply APIs with plumber principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered APIs with plumber! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C4',
          title: 'Big Data with sparklyr',
          description: 'Learn big data with sparklyr in R. Master core concepts with practical examples and real-world applications.',
          duration: '78 mins',
          objectives: [
            'Understand Big Data with sparklyr fundamentals',
            'Apply Big Data with sparklyr in practical scenarios',
            'Write clean, efficient code using Big Data with sparklyr',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Big Data with sparklyr Fundamentals',
              content: 'Big Data with sparklyr is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Big Data with sparklyr example in R
// Example demonstrating Big Data with sparklyr
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Big Data with sparklyr',
              content: 'Applying Big Data with sparklyr in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Big Data with sparklyr in Action',
              description: 'A practical example showing how to use Big Data with sparklyr effectively in R projects.',
              code: `// Practical Big Data with sparklyr example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Big Data with sparklyr
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Big Data with sparklyr in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Big Data with sparklyr Usage',
              description: 'Building on basics to show more sophisticated Big Data with sparklyr patterns.',
              code: `// Advanced Big Data with sparklyr pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Big Data with sparklyr, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Big Data with sparklyr for robust R applications',
            'Statistical Modeling: Implementing Big Data with sparklyr in production systems',
            'Data Visualization: Using Big Data with sparklyr for scalable architecture',
            'Research: Applying Big Data with sparklyr in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C4E1',
              title: 'Big Data with sparklyr Basics Exercise',
              description: 'Practice Big Data with sparklyr fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Big Data with sparklyr
// Your solution here

`,
              solution: `// Solution for Big Data with sparklyr exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Big Data with sparklyr concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C4E2',
              title: 'Big Data with sparklyr Advanced Challenge',
              description: 'A more challenging exercise that combines Big Data with sparklyr with other concepts learned.',
              starterCode: `// TODO: Advanced Big Data with sparklyr implementation
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
                'Apply Big Data with sparklyr principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Big Data with sparklyr! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C5',
          title: 'Reproducible Research',
          description: 'Learn reproducible research in R. Master core concepts with practical examples and real-world applications.',
          duration: '55 mins',
          objectives: [
            'Understand Reproducible Research fundamentals',
            'Apply Reproducible Research in practical scenarios',
            'Write clean, efficient code using Reproducible Research',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Reproducible Research Fundamentals',
              content: 'Reproducible Research is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Reproducible Research example in R
// Example demonstrating Reproducible Research
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Reproducible Research',
              content: 'Applying Reproducible Research in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Reproducible Research in Action',
              description: 'A practical example showing how to use Reproducible Research effectively in R projects.',
              code: `// Practical Reproducible Research example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Reproducible Research
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Reproducible Research in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Reproducible Research Usage',
              description: 'Building on basics to show more sophisticated Reproducible Research patterns.',
              code: `// Advanced Reproducible Research pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Reproducible Research, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Reproducible Research for robust R applications',
            'Statistical Modeling: Implementing Reproducible Research in production systems',
            'Data Visualization: Using Reproducible Research for scalable architecture',
            'Research: Applying Reproducible Research in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C5E1',
              title: 'Reproducible Research Basics Exercise',
              description: 'Practice Reproducible Research fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Reproducible Research
// Your solution here

`,
              solution: `// Solution for Reproducible Research exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Reproducible Research concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C5E2',
              title: 'Reproducible Research Advanced Challenge',
              description: 'A more challenging exercise that combines Reproducible Research with other concepts learned.',
              starterCode: `// TODO: Advanced Reproducible Research implementation
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
                'Apply Reproducible Research principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Reproducible Research! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C6',
          title: 'Bioinformatics',
          description: 'Learn bioinformatics in R. Master core concepts with practical examples and real-world applications.',
          duration: '68 mins',
          objectives: [
            'Understand Bioinformatics fundamentals',
            'Apply Bioinformatics in practical scenarios',
            'Write clean, efficient code using Bioinformatics',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Bioinformatics Fundamentals',
              content: 'Bioinformatics is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Bioinformatics example in R
// Example demonstrating Bioinformatics
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Bioinformatics',
              content: 'Applying Bioinformatics in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Bioinformatics in Action',
              description: 'A practical example showing how to use Bioinformatics effectively in R projects.',
              code: `// Practical Bioinformatics example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Bioinformatics
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Bioinformatics in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Bioinformatics Usage',
              description: 'Building on basics to show more sophisticated Bioinformatics patterns.',
              code: `// Advanced Bioinformatics pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Bioinformatics, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Bioinformatics for robust R applications',
            'Statistical Modeling: Implementing Bioinformatics in production systems',
            'Data Visualization: Using Bioinformatics for scalable architecture',
            'Research: Applying Bioinformatics in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C6E1',
              title: 'Bioinformatics Basics Exercise',
              description: 'Practice Bioinformatics fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Bioinformatics
// Your solution here

`,
              solution: `// Solution for Bioinformatics exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Bioinformatics concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C6E2',
              title: 'Bioinformatics Advanced Challenge',
              description: 'A more challenging exercise that combines Bioinformatics with other concepts learned.',
              starterCode: `// TODO: Advanced Bioinformatics implementation
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
                'Apply Bioinformatics principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Bioinformatics! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C7',
          title: 'Advanced ML',
          description: 'Learn advanced ml in R. Master core concepts with practical examples and real-world applications.',
          duration: '31 mins',
          objectives: [
            'Understand Advanced ML fundamentals',
            'Apply Advanced ML in practical scenarios',
            'Write clean, efficient code using Advanced ML',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Advanced ML Fundamentals',
              content: 'Advanced ML is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Advanced ML example in R
// Example demonstrating Advanced ML
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Advanced ML',
              content: 'Applying Advanced ML in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Advanced ML in Action',
              description: 'A practical example showing how to use Advanced ML effectively in R projects.',
              code: `// Practical Advanced ML example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Advanced ML
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Advanced ML in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Advanced ML Usage',
              description: 'Building on basics to show more sophisticated Advanced ML patterns.',
              code: `// Advanced Advanced ML pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Advanced ML, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Advanced ML for robust R applications',
            'Statistical Modeling: Implementing Advanced ML in production systems',
            'Data Visualization: Using Advanced ML for scalable architecture',
            'Research: Applying Advanced ML in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C7E1',
              title: 'Advanced ML Basics Exercise',
              description: 'Practice Advanced ML fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Advanced ML
// Your solution here

`,
              solution: `// Solution for Advanced ML exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Advanced ML concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C7E2',
              title: 'Advanced ML Advanced Challenge',
              description: 'A more challenging exercise that combines Advanced ML with other concepts learned.',
              starterCode: `// TODO: Advanced Advanced ML implementation
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
                'Apply Advanced ML principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Advanced ML! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C8',
          title: 'Data Science Projects',
          description: 'Learn data science projects in R. Master core concepts with practical examples and real-world applications.',
          duration: '76 mins',
          objectives: [
            'Understand Data Science Projects fundamentals',
            'Apply Data Science Projects in practical scenarios',
            'Write clean, efficient code using Data Science Projects',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Data Science Projects Fundamentals',
              content: 'Data Science Projects is a crucial concept in R. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for R development and is used extensively in real-world applications.',
              codeExample: `// Data Science Projects example in R
// Example demonstrating Data Science Projects
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for R development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow R best practices'
              ]
            },
            {
              title: 'Practical Data Science Projects',
              content: 'Applying Data Science Projects in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional R development.',
              keyPoints: [
                'Follow R conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Data Science Projects in Action',
              description: 'A practical example showing how to use Data Science Projects effectively in R projects.',
              code: `// Practical Data Science Projects example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Data Science Projects
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Data Science Projects in a real-world context, showing best practices for R development.'
            },
            {
              title: 'Advanced Data Science Projects Usage',
              description: 'Building on basics to show more sophisticated Data Science Projects patterns.',
              code: `// Advanced Data Science Projects pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Data Science Projects, commonly seen in professional R codebases.'
            }
          ],
          realWorldUseCases: [
            'Data Analysis: Leveraging Data Science Projects for robust R applications',
            'Statistical Modeling: Implementing Data Science Projects in production systems',
            'Data Visualization: Using Data Science Projects for scalable architecture',
            'Research: Applying Data Science Projects in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C8E1',
              title: 'Data Science Projects Basics Exercise',
              description: 'Practice Data Science Projects fundamentals by implementing a solution in R.',
              starterCode: `// TODO: Implement Data Science Projects
// Your solution here

`,
              solution: `// Solution for Data Science Projects exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Data Science Projects concepts from this chapter',
                'Follow R syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C8E2',
              title: 'Data Science Projects Advanced Challenge',
              description: 'A more challenging exercise that combines Data Science Projects with other concepts learned.',
              starterCode: `// TODO: Advanced Data Science Projects implementation
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
                'Apply Data Science Projects principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Data Science Projects! You can now confidently use these concepts in your R projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Production R Application',
        description: 'Build and deploy a production-ready system',
        requirements: [
          "Data Analysis",
          "Statistical Modeling",
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
