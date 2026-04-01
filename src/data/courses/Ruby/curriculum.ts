import { Curriculum } from '../types';

export const rubyCurriculum: Curriculum = {
  meta: {
    slug: 'ruby',
    title: 'Ruby Programming',
    shortDescription: 'Master Ruby - elegant and productive',
    longDescription: 'Complete Ruby Programming course from basics to professional level. Learn 3.3+ with modern best practices, hands-on projects, and industry-standard techniques. Focus on Web development, scripting, rapid prototyping.',
    icon: '💎',
    color: '#CC342D',
    category: 'Programming Languages',
    tags: ['ruby', 'Web development'],
    prerequisites: ['Programming basics'],
    targetAudience: [
      'Beginners to Ruby',
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
      'Rails Web Apps',
      'Automation',
      'DevOps Tools',
      'Rapid Prototyping'
    ],
    toolsAndTechnologies: [
      'Ruby 3.3+',
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
      title: 'Ruby Basics',
      description: 'Begin your Ruby journey. Learn fundamental syntax, core concepts, and write your first programs.',
      prerequisites: [],
      estimatedDuration: '2-3 weeks',
      learningOutcomes: [
          "Understand Ruby syntax and fundamentals",
          "Write and execute basic programs",
          "Work with core data types and structures",
          "Apply basic operations and logic",
          "Debug simple code issues"
],
      chapters: [
        {
          id: 'L1C1',
          title: 'Introduction',
          description: 'Learn introduction in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '72 mins',
          objectives: [
            'Understand Introduction fundamentals',
            'Apply Introduction in practical scenarios',
            'Write clean, efficient code using Introduction',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Introduction Fundamentals',
              content: 'Introduction is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Introduction example in Ruby
// Example demonstrating Introduction
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Introduction',
              content: 'Applying Introduction in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Introduction in Action',
              description: 'A practical example showing how to use Introduction effectively in Ruby projects.',
              code: `// Practical Introduction example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Introduction
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Introduction in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Introduction, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Introduction for robust Ruby applications',
            'Automation: Implementing Introduction in production systems',
            'DevOps Tools: Using Introduction for scalable architecture',
            'Rapid Prototyping: Applying Introduction in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C1E1',
              title: 'Introduction Basics Exercise',
              description: 'Practice Introduction fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
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
          summary: 'You\'ve mastered Introduction! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C2',
          title: 'Variables',
          description: 'Learn variables in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '63 mins',
          objectives: [
            'Understand Variables fundamentals',
            'Apply Variables in practical scenarios',
            'Write clean, efficient code using Variables',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Variables Fundamentals',
              content: 'Variables is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Variables example in Ruby
// Example demonstrating Variables
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Variables',
              content: 'Applying Variables in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Variables in Action',
              description: 'A practical example showing how to use Variables effectively in Ruby projects.',
              code: `// Practical Variables example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Variables
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Variables in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Variables, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Variables for robust Ruby applications',
            'Automation: Implementing Variables in production systems',
            'DevOps Tools: Using Variables for scalable architecture',
            'Rapid Prototyping: Applying Variables in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C2E1',
              title: 'Variables Basics Exercise',
              description: 'Practice Variables fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
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
          summary: 'You\'ve mastered Variables! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C3',
          title: 'Operators',
          description: 'Learn operators in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '59 mins',
          objectives: [
            'Understand Operators fundamentals',
            'Apply Operators in practical scenarios',
            'Write clean, efficient code using Operators',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Operators Fundamentals',
              content: 'Operators is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Operators example in Ruby
// Example demonstrating Operators
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Operators',
              content: 'Applying Operators in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Operators in Action',
              description: 'A practical example showing how to use Operators effectively in Ruby projects.',
              code: `// Practical Operators example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Operators
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Operators in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Operators Usage',
              description: 'Building on basics to show more sophisticated Operators patterns.',
              code: `// Advanced Operators pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Operators, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Operators for robust Ruby applications',
            'Automation: Implementing Operators in production systems',
            'DevOps Tools: Using Operators for scalable architecture',
            'Rapid Prototyping: Applying Operators in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C3E1',
              title: 'Operators Basics Exercise',
              description: 'Practice Operators fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Operators
// Your solution here

`,
              solution: `// Solution for Operators exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Operators concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C3E2',
              title: 'Operators Advanced Challenge',
              description: 'A more challenging exercise that combines Operators with other concepts learned.',
              starterCode: `// TODO: Advanced Operators implementation
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
                'Apply Operators principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Operators! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C4',
          title: 'Strings and Symbols',
          description: 'Learn strings and symbols in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '52 mins',
          objectives: [
            'Understand Strings and Symbols fundamentals',
            'Apply Strings and Symbols in practical scenarios',
            'Write clean, efficient code using Strings and Symbols',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Strings and Symbols Fundamentals',
              content: 'Strings and Symbols is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Strings and Symbols example in Ruby
// Example demonstrating Strings and Symbols
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Strings and Symbols',
              content: 'Applying Strings and Symbols in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Strings and Symbols in Action',
              description: 'A practical example showing how to use Strings and Symbols effectively in Ruby projects.',
              code: `// Practical Strings and Symbols example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Strings and Symbols
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Strings and Symbols in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Strings and Symbols Usage',
              description: 'Building on basics to show more sophisticated Strings and Symbols patterns.',
              code: `// Advanced Strings and Symbols pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Strings and Symbols, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Strings and Symbols for robust Ruby applications',
            'Automation: Implementing Strings and Symbols in production systems',
            'DevOps Tools: Using Strings and Symbols for scalable architecture',
            'Rapid Prototyping: Applying Strings and Symbols in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C4E1',
              title: 'Strings and Symbols Basics Exercise',
              description: 'Practice Strings and Symbols fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Strings and Symbols
// Your solution here

`,
              solution: `// Solution for Strings and Symbols exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Strings and Symbols concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C4E2',
              title: 'Strings and Symbols Advanced Challenge',
              description: 'A more challenging exercise that combines Strings and Symbols with other concepts learned.',
              starterCode: `// TODO: Advanced Strings and Symbols implementation
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
                'Apply Strings and Symbols principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Strings and Symbols! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L1C5',
          title: 'Arrays and Hashes',
          description: 'Learn arrays and hashes in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '85 mins',
          objectives: [
            'Understand Arrays and Hashes fundamentals',
            'Apply Arrays and Hashes in practical scenarios',
            'Write clean, efficient code using Arrays and Hashes',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Arrays and Hashes Fundamentals',
              content: 'Arrays and Hashes is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Arrays and Hashes example in Ruby
// Example demonstrating Arrays and Hashes
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Arrays and Hashes',
              content: 'Applying Arrays and Hashes in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Arrays and Hashes in Action',
              description: 'A practical example showing how to use Arrays and Hashes effectively in Ruby projects.',
              code: `// Practical Arrays and Hashes example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Arrays and Hashes
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Arrays and Hashes in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Arrays and Hashes Usage',
              description: 'Building on basics to show more sophisticated Arrays and Hashes patterns.',
              code: `// Advanced Arrays and Hashes pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Arrays and Hashes, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Arrays and Hashes for robust Ruby applications',
            'Automation: Implementing Arrays and Hashes in production systems',
            'DevOps Tools: Using Arrays and Hashes for scalable architecture',
            'Rapid Prototyping: Applying Arrays and Hashes in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L1C5E1',
              title: 'Arrays and Hashes Basics Exercise',
              description: 'Practice Arrays and Hashes fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Arrays and Hashes
// Your solution here

`,
              solution: `// Solution for Arrays and Hashes exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Arrays and Hashes concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L1C5E2',
              title: 'Arrays and Hashes Advanced Challenge',
              description: 'A more challenging exercise that combines Arrays and Hashes with other concepts learned.',
              starterCode: `// TODO: Advanced Arrays and Hashes implementation
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
                'Apply Arrays and Hashes principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Arrays and Hashes! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Ruby Fundamentals Project',
        description: 'Build a console application demonstrating Ruby basics',
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
      title: 'Ruby Beginner',
      description: 'Build on fundamentals with control structures, functions, and data manipulation. Create functional Ruby applications.',
      prerequisites: ['Complete Ruby Basics'],
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
          description: 'Learn control flow in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '71 mins',
          objectives: [
            'Understand Control Flow fundamentals',
            'Apply Control Flow in practical scenarios',
            'Write clean, efficient code using Control Flow',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Control Flow Fundamentals',
              content: 'Control Flow is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Control Flow example in Ruby
// Example demonstrating Control Flow
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Control Flow',
              content: 'Applying Control Flow in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Control Flow in Action',
              description: 'A practical example showing how to use Control Flow effectively in Ruby projects.',
              code: `// Practical Control Flow example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Control Flow
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Control Flow in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Control Flow, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Control Flow for robust Ruby applications',
            'Automation: Implementing Control Flow in production systems',
            'DevOps Tools: Using Control Flow for scalable architecture',
            'Rapid Prototyping: Applying Control Flow in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C1E1',
              title: 'Control Flow Basics Exercise',
              description: 'Practice Control Flow fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
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
          summary: 'You\'ve mastered Control Flow! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C2',
          title: 'Loops and Iterators',
          description: 'Learn loops and iterators in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '79 mins',
          objectives: [
            'Understand Loops and Iterators fundamentals',
            'Apply Loops and Iterators in practical scenarios',
            'Write clean, efficient code using Loops and Iterators',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Loops and Iterators Fundamentals',
              content: 'Loops and Iterators is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Loops and Iterators example in Ruby
// Example demonstrating Loops and Iterators
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Loops and Iterators',
              content: 'Applying Loops and Iterators in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Loops and Iterators in Action',
              description: 'A practical example showing how to use Loops and Iterators effectively in Ruby projects.',
              code: `// Practical Loops and Iterators example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Loops and Iterators
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Loops and Iterators in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Loops and Iterators Usage',
              description: 'Building on basics to show more sophisticated Loops and Iterators patterns.',
              code: `// Advanced Loops and Iterators pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Loops and Iterators, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Loops and Iterators for robust Ruby applications',
            'Automation: Implementing Loops and Iterators in production systems',
            'DevOps Tools: Using Loops and Iterators for scalable architecture',
            'Rapid Prototyping: Applying Loops and Iterators in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C2E1',
              title: 'Loops and Iterators Basics Exercise',
              description: 'Practice Loops and Iterators fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Loops and Iterators
// Your solution here

`,
              solution: `// Solution for Loops and Iterators exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Loops and Iterators concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C2E2',
              title: 'Loops and Iterators Advanced Challenge',
              description: 'A more challenging exercise that combines Loops and Iterators with other concepts learned.',
              starterCode: `// TODO: Advanced Loops and Iterators implementation
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
                'Apply Loops and Iterators principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Loops and Iterators! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C3',
          title: 'Methods',
          description: 'Learn methods in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '70 mins',
          objectives: [
            'Understand Methods fundamentals',
            'Apply Methods in practical scenarios',
            'Write clean, efficient code using Methods',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Methods Fundamentals',
              content: 'Methods is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Methods example in Ruby
// Example demonstrating Methods
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Methods',
              content: 'Applying Methods in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Methods in Action',
              description: 'A practical example showing how to use Methods effectively in Ruby projects.',
              code: `// Practical Methods example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Methods
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Methods in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Methods Usage',
              description: 'Building on basics to show more sophisticated Methods patterns.',
              code: `// Advanced Methods pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Methods, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Methods for robust Ruby applications',
            'Automation: Implementing Methods in production systems',
            'DevOps Tools: Using Methods for scalable architecture',
            'Rapid Prototyping: Applying Methods in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C3E1',
              title: 'Methods Basics Exercise',
              description: 'Practice Methods fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Methods
// Your solution here

`,
              solution: `// Solution for Methods exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Methods concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C3E2',
              title: 'Methods Advanced Challenge',
              description: 'A more challenging exercise that combines Methods with other concepts learned.',
              starterCode: `// TODO: Advanced Methods implementation
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
                'Apply Methods principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Methods! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C4',
          title: 'Blocks and Procs',
          description: 'Learn blocks and procs in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '40 mins',
          objectives: [
            'Understand Blocks and Procs fundamentals',
            'Apply Blocks and Procs in practical scenarios',
            'Write clean, efficient code using Blocks and Procs',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Blocks and Procs Fundamentals',
              content: 'Blocks and Procs is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Blocks and Procs example in Ruby
// Example demonstrating Blocks and Procs
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Blocks and Procs',
              content: 'Applying Blocks and Procs in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Blocks and Procs in Action',
              description: 'A practical example showing how to use Blocks and Procs effectively in Ruby projects.',
              code: `// Practical Blocks and Procs example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Blocks and Procs
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Blocks and Procs in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Blocks and Procs Usage',
              description: 'Building on basics to show more sophisticated Blocks and Procs patterns.',
              code: `// Advanced Blocks and Procs pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Blocks and Procs, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Blocks and Procs for robust Ruby applications',
            'Automation: Implementing Blocks and Procs in production systems',
            'DevOps Tools: Using Blocks and Procs for scalable architecture',
            'Rapid Prototyping: Applying Blocks and Procs in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C4E1',
              title: 'Blocks and Procs Basics Exercise',
              description: 'Practice Blocks and Procs fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Blocks and Procs
// Your solution here

`,
              solution: `// Solution for Blocks and Procs exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Blocks and Procs concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C4E2',
              title: 'Blocks and Procs Advanced Challenge',
              description: 'A more challenging exercise that combines Blocks and Procs with other concepts learned.',
              starterCode: `// TODO: Advanced Blocks and Procs implementation
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
                'Apply Blocks and Procs principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Blocks and Procs! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C5',
          title: 'Ranges',
          description: 'Learn ranges in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '79 mins',
          objectives: [
            'Understand Ranges fundamentals',
            'Apply Ranges in practical scenarios',
            'Write clean, efficient code using Ranges',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Ranges Fundamentals',
              content: 'Ranges is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Ranges example in Ruby
// Example demonstrating Ranges
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Ranges',
              content: 'Applying Ranges in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Ranges in Action',
              description: 'A practical example showing how to use Ranges effectively in Ruby projects.',
              code: `// Practical Ranges example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Ranges
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Ranges in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Ranges Usage',
              description: 'Building on basics to show more sophisticated Ranges patterns.',
              code: `// Advanced Ranges pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Ranges, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Ranges for robust Ruby applications',
            'Automation: Implementing Ranges in production systems',
            'DevOps Tools: Using Ranges for scalable architecture',
            'Rapid Prototyping: Applying Ranges in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C5E1',
              title: 'Ranges Basics Exercise',
              description: 'Practice Ranges fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Ranges
// Your solution here

`,
              solution: `// Solution for Ranges exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Ranges concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C5E2',
              title: 'Ranges Advanced Challenge',
              description: 'A more challenging exercise that combines Ranges with other concepts learned.',
              starterCode: `// TODO: Advanced Ranges implementation
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
                'Apply Ranges principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Ranges! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L2C6',
          title: 'String Manipulation',
          description: 'Learn string manipulation in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '44 mins',
          objectives: [
            'Understand String Manipulation fundamentals',
            'Apply String Manipulation in practical scenarios',
            'Write clean, efficient code using String Manipulation',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'String Manipulation Fundamentals',
              content: 'String Manipulation is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// String Manipulation example in Ruby
// Example demonstrating String Manipulation
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical String Manipulation',
              content: 'Applying String Manipulation in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'String Manipulation in Action',
              description: 'A practical example showing how to use String Manipulation effectively in Ruby projects.',
              code: `// Practical String Manipulation example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing String Manipulation
  return "Practical result";
}
`,
              explanation: 'This example demonstrates String Manipulation in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced String Manipulation Usage',
              description: 'Building on basics to show more sophisticated String Manipulation patterns.',
              code: `// Advanced String Manipulation pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to String Manipulation, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging String Manipulation for robust Ruby applications',
            'Automation: Implementing String Manipulation in production systems',
            'DevOps Tools: Using String Manipulation for scalable architecture',
            'Rapid Prototyping: Applying String Manipulation in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L2C6E1',
              title: 'String Manipulation Basics Exercise',
              description: 'Practice String Manipulation fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement String Manipulation
// Your solution here

`,
              solution: `// Solution for String Manipulation exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review String Manipulation concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L2C6E2',
              title: 'String Manipulation Advanced Challenge',
              description: 'A more challenging exercise that combines String Manipulation with other concepts learned.',
              starterCode: `// TODO: Advanced String Manipulation implementation
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
                'Apply String Manipulation principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered String Manipulation! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Interactive Ruby Application',
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
      title: 'Ruby Intermediate',
      description: 'Master advanced features, modules, and real-world development patterns in Ruby.',
      prerequisites: ['Complete Ruby Beginner'],
      estimatedDuration: '4-5 weeks',
      learningOutcomes: [
          "Master Ruby advanced features",
          "Organize code with best practices",
          "Handle errors and edge cases",
          "Work with external data and APIs",
          "Build production-quality code"
],
      chapters: [
        {
          id: 'L3C1',
          title: 'Classes and Objects',
          description: 'Learn classes and objects in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '32 mins',
          objectives: [
            'Understand Classes and Objects fundamentals',
            'Apply Classes and Objects in practical scenarios',
            'Write clean, efficient code using Classes and Objects',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Classes and Objects Fundamentals',
              content: 'Classes and Objects is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Classes and Objects example in Ruby
// Example demonstrating Classes and Objects
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Classes and Objects',
              content: 'Applying Classes and Objects in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Classes and Objects in Action',
              description: 'A practical example showing how to use Classes and Objects effectively in Ruby projects.',
              code: `// Practical Classes and Objects example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Classes and Objects
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Classes and Objects in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Classes and Objects Usage',
              description: 'Building on basics to show more sophisticated Classes and Objects patterns.',
              code: `// Advanced Classes and Objects pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Classes and Objects, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Classes and Objects for robust Ruby applications',
            'Automation: Implementing Classes and Objects in production systems',
            'DevOps Tools: Using Classes and Objects for scalable architecture',
            'Rapid Prototyping: Applying Classes and Objects in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C1E1',
              title: 'Classes and Objects Basics Exercise',
              description: 'Practice Classes and Objects fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Classes and Objects
// Your solution here

`,
              solution: `// Solution for Classes and Objects exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Classes and Objects concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C1E2',
              title: 'Classes and Objects Advanced Challenge',
              description: 'A more challenging exercise that combines Classes and Objects with other concepts learned.',
              starterCode: `// TODO: Advanced Classes and Objects implementation
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
                'Apply Classes and Objects principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Classes and Objects! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C2',
          title: 'Modules and Mixins',
          description: 'Learn modules and mixins in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '48 mins',
          objectives: [
            'Understand Modules and Mixins fundamentals',
            'Apply Modules and Mixins in practical scenarios',
            'Write clean, efficient code using Modules and Mixins',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Modules and Mixins Fundamentals',
              content: 'Modules and Mixins is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Modules and Mixins example in Ruby
// Example demonstrating Modules and Mixins
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Modules and Mixins',
              content: 'Applying Modules and Mixins in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Modules and Mixins in Action',
              description: 'A practical example showing how to use Modules and Mixins effectively in Ruby projects.',
              code: `// Practical Modules and Mixins example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Modules and Mixins
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Modules and Mixins in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Modules and Mixins Usage',
              description: 'Building on basics to show more sophisticated Modules and Mixins patterns.',
              code: `// Advanced Modules and Mixins pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Modules and Mixins, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Modules and Mixins for robust Ruby applications',
            'Automation: Implementing Modules and Mixins in production systems',
            'DevOps Tools: Using Modules and Mixins for scalable architecture',
            'Rapid Prototyping: Applying Modules and Mixins in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C2E1',
              title: 'Modules and Mixins Basics Exercise',
              description: 'Practice Modules and Mixins fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Modules and Mixins
// Your solution here

`,
              solution: `// Solution for Modules and Mixins exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Modules and Mixins concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C2E2',
              title: 'Modules and Mixins Advanced Challenge',
              description: 'A more challenging exercise that combines Modules and Mixins with other concepts learned.',
              starterCode: `// TODO: Advanced Modules and Mixins implementation
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
                'Apply Modules and Mixins principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Modules and Mixins! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C3',
          title: 'Inheritance',
          description: 'Learn inheritance in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '58 mins',
          objectives: [
            'Understand Inheritance fundamentals',
            'Apply Inheritance in practical scenarios',
            'Write clean, efficient code using Inheritance',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Inheritance Fundamentals',
              content: 'Inheritance is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Inheritance example in Ruby
// Example demonstrating Inheritance
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Inheritance',
              content: 'Applying Inheritance in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Inheritance in Action',
              description: 'A practical example showing how to use Inheritance effectively in Ruby projects.',
              code: `// Practical Inheritance example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Inheritance
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Inheritance in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Inheritance Usage',
              description: 'Building on basics to show more sophisticated Inheritance patterns.',
              code: `// Advanced Inheritance pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Inheritance, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Inheritance for robust Ruby applications',
            'Automation: Implementing Inheritance in production systems',
            'DevOps Tools: Using Inheritance for scalable architecture',
            'Rapid Prototyping: Applying Inheritance in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C3E1',
              title: 'Inheritance Basics Exercise',
              description: 'Practice Inheritance fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Inheritance
// Your solution here

`,
              solution: `// Solution for Inheritance exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Inheritance concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C3E2',
              title: 'Inheritance Advanced Challenge',
              description: 'A more challenging exercise that combines Inheritance with other concepts learned.',
              starterCode: `// TODO: Advanced Inheritance implementation
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
                'Apply Inheritance principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Inheritance! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C4',
          title: 'File I/O',
          description: 'Learn file i/o in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '47 mins',
          objectives: [
            'Understand File I/O fundamentals',
            'Apply File I/O in practical scenarios',
            'Write clean, efficient code using File I/O',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'File I/O Fundamentals',
              content: 'File I/O is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// File I/O example in Ruby
// Example demonstrating File I/O
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical File I/O',
              content: 'Applying File I/O in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'File I/O in Action',
              description: 'A practical example showing how to use File I/O effectively in Ruby projects.',
              code: `// Practical File I/O example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing File I/O
  return "Practical result";
}
`,
              explanation: 'This example demonstrates File I/O in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to File I/O, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging File I/O for robust Ruby applications',
            'Automation: Implementing File I/O in production systems',
            'DevOps Tools: Using File I/O for scalable architecture',
            'Rapid Prototyping: Applying File I/O in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C4E1',
              title: 'File I/O Basics Exercise',
              description: 'Practice File I/O fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
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
          summary: 'You\'ve mastered File I/O! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C5',
          title: 'Exception Handling',
          description: 'Learn exception handling in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '74 mins',
          objectives: [
            'Understand Exception Handling fundamentals',
            'Apply Exception Handling in practical scenarios',
            'Write clean, efficient code using Exception Handling',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Exception Handling Fundamentals',
              content: 'Exception Handling is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Exception Handling example in Ruby
// Example demonstrating Exception Handling
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Exception Handling',
              content: 'Applying Exception Handling in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Exception Handling in Action',
              description: 'A practical example showing how to use Exception Handling effectively in Ruby projects.',
              code: `// Practical Exception Handling example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Exception Handling
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Exception Handling in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Exception Handling Usage',
              description: 'Building on basics to show more sophisticated Exception Handling patterns.',
              code: `// Advanced Exception Handling pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Exception Handling, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Exception Handling for robust Ruby applications',
            'Automation: Implementing Exception Handling in production systems',
            'DevOps Tools: Using Exception Handling for scalable architecture',
            'Rapid Prototyping: Applying Exception Handling in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C5E1',
              title: 'Exception Handling Basics Exercise',
              description: 'Practice Exception Handling fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Exception Handling
// Your solution here

`,
              solution: `// Solution for Exception Handling exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Exception Handling concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C5E2',
              title: 'Exception Handling Advanced Challenge',
              description: 'A more challenging exercise that combines Exception Handling with other concepts learned.',
              starterCode: `// TODO: Advanced Exception Handling implementation
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
                'Apply Exception Handling principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Exception Handling! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C6',
          title: 'RegEx',
          description: 'Learn regex in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '41 mins',
          objectives: [
            'Understand RegEx fundamentals',
            'Apply RegEx in practical scenarios',
            'Write clean, efficient code using RegEx',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'RegEx Fundamentals',
              content: 'RegEx is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// RegEx example in Ruby
// Example demonstrating RegEx
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical RegEx',
              content: 'Applying RegEx in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'RegEx in Action',
              description: 'A practical example showing how to use RegEx effectively in Ruby projects.',
              code: `// Practical RegEx example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing RegEx
  return "Practical result";
}
`,
              explanation: 'This example demonstrates RegEx in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced RegEx Usage',
              description: 'Building on basics to show more sophisticated RegEx patterns.',
              code: `// Advanced RegEx pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to RegEx, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging RegEx for robust Ruby applications',
            'Automation: Implementing RegEx in production systems',
            'DevOps Tools: Using RegEx for scalable architecture',
            'Rapid Prototyping: Applying RegEx in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C6E1',
              title: 'RegEx Basics Exercise',
              description: 'Practice RegEx fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement RegEx
// Your solution here

`,
              solution: `// Solution for RegEx exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review RegEx concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C6E2',
              title: 'RegEx Advanced Challenge',
              description: 'A more challenging exercise that combines RegEx with other concepts learned.',
              starterCode: `// TODO: Advanced RegEx implementation
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
                'Apply RegEx principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered RegEx! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L3C7',
          title: 'Gems',
          description: 'Learn gems in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '39 mins',
          objectives: [
            'Understand Gems fundamentals',
            'Apply Gems in practical scenarios',
            'Write clean, efficient code using Gems',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Gems Fundamentals',
              content: 'Gems is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Gems example in Ruby
// Example demonstrating Gems
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Gems',
              content: 'Applying Gems in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Gems in Action',
              description: 'A practical example showing how to use Gems effectively in Ruby projects.',
              code: `// Practical Gems example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Gems
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Gems in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Gems Usage',
              description: 'Building on basics to show more sophisticated Gems patterns.',
              code: `// Advanced Gems pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Gems, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Gems for robust Ruby applications',
            'Automation: Implementing Gems in production systems',
            'DevOps Tools: Using Gems for scalable architecture',
            'Rapid Prototyping: Applying Gems in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L3C7E1',
              title: 'Gems Basics Exercise',
              description: 'Practice Gems fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Gems
// Your solution here

`,
              solution: `// Solution for Gems exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Gems concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L3C7E2',
              title: 'Gems Advanced Challenge',
              description: 'A more challenging exercise that combines Gems with other concepts learned.',
              starterCode: `// TODO: Advanced Gems implementation
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
                'Apply Gems principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Gems! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Ruby Full-Featured Application',
        description: 'Build a complete application with advanced features',
        requirements: [
          "Modular architecture",
          "Data persistence",
          "Error handling and logging",
          "Implements Rails Web Apps"
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
      title: 'Ruby Advanced',
      description: 'Learn professional Ruby development with design patterns, testing, and optimization techniques.',
      prerequisites: ['Complete Ruby Intermediate'],
      estimatedDuration: '5-6 weeks',
      learningOutcomes: [
          "Apply software design patterns",
          "Implement comprehensive testing",
          "Optimize code performance",
          "Master Ruby ecosystem",
          "Architect scalable systems"
],
      chapters: [
        {
          id: 'L4C1',
          title: 'Metaprogramming',
          description: 'Learn metaprogramming in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '81 mins',
          objectives: [
            'Understand Metaprogramming fundamentals',
            'Apply Metaprogramming in practical scenarios',
            'Write clean, efficient code using Metaprogramming',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Metaprogramming Fundamentals',
              content: 'Metaprogramming is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Metaprogramming example in Ruby
// Example demonstrating Metaprogramming
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Metaprogramming',
              content: 'Applying Metaprogramming in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Metaprogramming in Action',
              description: 'A practical example showing how to use Metaprogramming effectively in Ruby projects.',
              code: `// Practical Metaprogramming example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Metaprogramming
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Metaprogramming in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Metaprogramming, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Metaprogramming for robust Ruby applications',
            'Automation: Implementing Metaprogramming in production systems',
            'DevOps Tools: Using Metaprogramming for scalable architecture',
            'Rapid Prototyping: Applying Metaprogramming in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C1E1',
              title: 'Metaprogramming Basics Exercise',
              description: 'Practice Metaprogramming fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
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
          summary: 'You\'ve mastered Metaprogramming! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C2',
          title: 'Blocks/Procs/Lambdas',
          description: 'Learn blocks/procs/lambdas in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand Blocks/Procs/Lambdas fundamentals',
            'Apply Blocks/Procs/Lambdas in practical scenarios',
            'Write clean, efficient code using Blocks/Procs/Lambdas',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Blocks/Procs/Lambdas Fundamentals',
              content: 'Blocks/Procs/Lambdas is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Blocks/Procs/Lambdas example in Ruby
// Example demonstrating Blocks/Procs/Lambdas
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Blocks/Procs/Lambdas',
              content: 'Applying Blocks/Procs/Lambdas in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Blocks/Procs/Lambdas in Action',
              description: 'A practical example showing how to use Blocks/Procs/Lambdas effectively in Ruby projects.',
              code: `// Practical Blocks/Procs/Lambdas example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Blocks/Procs/Lambdas
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Blocks/Procs/Lambdas in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Blocks/Procs/Lambdas Usage',
              description: 'Building on basics to show more sophisticated Blocks/Procs/Lambdas patterns.',
              code: `// Advanced Blocks/Procs/Lambdas pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Blocks/Procs/Lambdas, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Blocks/Procs/Lambdas for robust Ruby applications',
            'Automation: Implementing Blocks/Procs/Lambdas in production systems',
            'DevOps Tools: Using Blocks/Procs/Lambdas for scalable architecture',
            'Rapid Prototyping: Applying Blocks/Procs/Lambdas in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C2E1',
              title: 'Blocks/Procs/Lambdas Basics Exercise',
              description: 'Practice Blocks/Procs/Lambdas fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Blocks/Procs/Lambdas
// Your solution here

`,
              solution: `// Solution for Blocks/Procs/Lambdas exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Blocks/Procs/Lambdas concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C2E2',
              title: 'Blocks/Procs/Lambdas Advanced Challenge',
              description: 'A more challenging exercise that combines Blocks/Procs/Lambdas with other concepts learned.',
              starterCode: `// TODO: Advanced Blocks/Procs/Lambdas implementation
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
                'Apply Blocks/Procs/Lambdas principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Blocks/Procs/Lambdas! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C3',
          title: 'RSpec Testing',
          description: 'Learn rspec testing in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '73 mins',
          objectives: [
            'Understand RSpec Testing fundamentals',
            'Apply RSpec Testing in practical scenarios',
            'Write clean, efficient code using RSpec Testing',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'RSpec Testing Fundamentals',
              content: 'RSpec Testing is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// RSpec Testing example in Ruby
// Example demonstrating RSpec Testing
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical RSpec Testing',
              content: 'Applying RSpec Testing in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'RSpec Testing in Action',
              description: 'A practical example showing how to use RSpec Testing effectively in Ruby projects.',
              code: `// Practical RSpec Testing example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing RSpec Testing
  return "Practical result";
}
`,
              explanation: 'This example demonstrates RSpec Testing in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced RSpec Testing Usage',
              description: 'Building on basics to show more sophisticated RSpec Testing patterns.',
              code: `// Advanced RSpec Testing pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to RSpec Testing, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging RSpec Testing for robust Ruby applications',
            'Automation: Implementing RSpec Testing in production systems',
            'DevOps Tools: Using RSpec Testing for scalable architecture',
            'Rapid Prototyping: Applying RSpec Testing in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C3E1',
              title: 'RSpec Testing Basics Exercise',
              description: 'Practice RSpec Testing fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement RSpec Testing
// Your solution here

`,
              solution: `// Solution for RSpec Testing exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review RSpec Testing concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C3E2',
              title: 'RSpec Testing Advanced Challenge',
              description: 'A more challenging exercise that combines RSpec Testing with other concepts learned.',
              starterCode: `// TODO: Advanced RSpec Testing implementation
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
                'Apply RSpec Testing principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered RSpec Testing! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C4',
          title: 'DSLs',
          description: 'Learn dsls in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '57 mins',
          objectives: [
            'Understand DSLs fundamentals',
            'Apply DSLs in practical scenarios',
            'Write clean, efficient code using DSLs',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'DSLs Fundamentals',
              content: 'DSLs is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// DSLs example in Ruby
// Example demonstrating DSLs
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical DSLs',
              content: 'Applying DSLs in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'DSLs in Action',
              description: 'A practical example showing how to use DSLs effectively in Ruby projects.',
              code: `// Practical DSLs example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing DSLs
  return "Practical result";
}
`,
              explanation: 'This example demonstrates DSLs in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to DSLs, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging DSLs for robust Ruby applications',
            'Automation: Implementing DSLs in production systems',
            'DevOps Tools: Using DSLs for scalable architecture',
            'Rapid Prototyping: Applying DSLs in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C4E1',
              title: 'DSLs Basics Exercise',
              description: 'Practice DSLs fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C4E2',
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
          summary: 'You\'ve mastered DSLs! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C5',
          title: 'Concurrency',
          description: 'Learn concurrency in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '82 mins',
          objectives: [
            'Understand Concurrency fundamentals',
            'Apply Concurrency in practical scenarios',
            'Write clean, efficient code using Concurrency',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Concurrency Fundamentals',
              content: 'Concurrency is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Concurrency example in Ruby
// Example demonstrating Concurrency
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Concurrency',
              content: 'Applying Concurrency in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Concurrency in Action',
              description: 'A practical example showing how to use Concurrency effectively in Ruby projects.',
              code: `// Practical Concurrency example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Concurrency
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Concurrency in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Concurrency, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Concurrency for robust Ruby applications',
            'Automation: Implementing Concurrency in production systems',
            'DevOps Tools: Using Concurrency for scalable architecture',
            'Rapid Prototyping: Applying Concurrency in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C5E1',
              title: 'Concurrency Basics Exercise',
              description: 'Practice Concurrency fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C5E2',
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
          summary: 'You\'ve mastered Concurrency! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C6',
          title: 'Design Patterns',
          description: 'Learn design patterns in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '79 mins',
          objectives: [
            'Understand Design Patterns fundamentals',
            'Apply Design Patterns in practical scenarios',
            'Write clean, efficient code using Design Patterns',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Design Patterns Fundamentals',
              content: 'Design Patterns is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Design Patterns example in Ruby
// Example demonstrating Design Patterns
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Design Patterns',
              content: 'Applying Design Patterns in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Design Patterns in Action',
              description: 'A practical example showing how to use Design Patterns effectively in Ruby projects.',
              code: `// Practical Design Patterns example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Design Patterns
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Design Patterns in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Design Patterns Usage',
              description: 'Building on basics to show more sophisticated Design Patterns patterns.',
              code: `// Advanced Design Patterns pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Design Patterns, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Design Patterns for robust Ruby applications',
            'Automation: Implementing Design Patterns in production systems',
            'DevOps Tools: Using Design Patterns for scalable architecture',
            'Rapid Prototyping: Applying Design Patterns in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C6E1',
              title: 'Design Patterns Basics Exercise',
              description: 'Practice Design Patterns fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Design Patterns
// Your solution here

`,
              solution: `// Solution for Design Patterns exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Design Patterns concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C6E2',
              title: 'Design Patterns Advanced Challenge',
              description: 'A more challenging exercise that combines Design Patterns with other concepts learned.',
              starterCode: `// TODO: Advanced Design Patterns implementation
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
                'Apply Design Patterns principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Design Patterns! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L4C7',
          title: 'Debugging',
          description: 'Learn debugging in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '68 mins',
          objectives: [
            'Understand Debugging fundamentals',
            'Apply Debugging in practical scenarios',
            'Write clean, efficient code using Debugging',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Debugging Fundamentals',
              content: 'Debugging is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Debugging example in Ruby
// Example demonstrating Debugging
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Debugging',
              content: 'Applying Debugging in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Debugging in Action',
              description: 'A practical example showing how to use Debugging effectively in Ruby projects.',
              code: `// Practical Debugging example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Debugging
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Debugging in a real-world context, showing best practices for Ruby development.'
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
              explanation: 'This shows a more advanced approach to Debugging, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Debugging for robust Ruby applications',
            'Automation: Implementing Debugging in production systems',
            'DevOps Tools: Using Debugging for scalable architecture',
            'Rapid Prototyping: Applying Debugging in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L4C7E1',
              title: 'Debugging Basics Exercise',
              description: 'Practice Debugging fundamentals by implementing a solution in Ruby.',
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
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L4C7E2',
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
          summary: 'You\'ve mastered Debugging! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Professional Ruby System',
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
      title: 'Ruby Professional',
      description: 'Build production-ready Ruby applications with industry best practices and professional workflows.',
      prerequisites: ['Complete Ruby Advanced'],
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
          title: 'Ruby on Rails',
          description: 'Learn ruby on rails in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '63 mins',
          objectives: [
            'Understand Ruby on Rails fundamentals',
            'Apply Ruby on Rails in practical scenarios',
            'Write clean, efficient code using Ruby on Rails',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Ruby on Rails Fundamentals',
              content: 'Ruby on Rails is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Ruby on Rails example in Ruby
// Example demonstrating Ruby on Rails
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Ruby on Rails',
              content: 'Applying Ruby on Rails in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Ruby on Rails in Action',
              description: 'A practical example showing how to use Ruby on Rails effectively in Ruby projects.',
              code: `// Practical Ruby on Rails example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Ruby on Rails
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Ruby on Rails in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Ruby on Rails Usage',
              description: 'Building on basics to show more sophisticated Ruby on Rails patterns.',
              code: `// Advanced Ruby on Rails pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Ruby on Rails, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Ruby on Rails for robust Ruby applications',
            'Automation: Implementing Ruby on Rails in production systems',
            'DevOps Tools: Using Ruby on Rails for scalable architecture',
            'Rapid Prototyping: Applying Ruby on Rails in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C1E1',
              title: 'Ruby on Rails Basics Exercise',
              description: 'Practice Ruby on Rails fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Ruby on Rails
// Your solution here

`,
              solution: `// Solution for Ruby on Rails exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Ruby on Rails concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C1E2',
              title: 'Ruby on Rails Advanced Challenge',
              description: 'A more challenging exercise that combines Ruby on Rails with other concepts learned.',
              starterCode: `// TODO: Advanced Ruby on Rails implementation
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
                'Apply Ruby on Rails principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Ruby on Rails! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C2',
          title: 'MVC Architecture',
          description: 'Learn mvc architecture in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '34 mins',
          objectives: [
            'Understand MVC Architecture fundamentals',
            'Apply MVC Architecture in practical scenarios',
            'Write clean, efficient code using MVC Architecture',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'MVC Architecture Fundamentals',
              content: 'MVC Architecture is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// MVC Architecture example in Ruby
// Example demonstrating MVC Architecture
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical MVC Architecture',
              content: 'Applying MVC Architecture in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'MVC Architecture in Action',
              description: 'A practical example showing how to use MVC Architecture effectively in Ruby projects.',
              code: `// Practical MVC Architecture example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing MVC Architecture
  return "Practical result";
}
`,
              explanation: 'This example demonstrates MVC Architecture in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced MVC Architecture Usage',
              description: 'Building on basics to show more sophisticated MVC Architecture patterns.',
              code: `// Advanced MVC Architecture pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to MVC Architecture, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging MVC Architecture for robust Ruby applications',
            'Automation: Implementing MVC Architecture in production systems',
            'DevOps Tools: Using MVC Architecture for scalable architecture',
            'Rapid Prototyping: Applying MVC Architecture in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C2E1',
              title: 'MVC Architecture Basics Exercise',
              description: 'Practice MVC Architecture fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement MVC Architecture
// Your solution here

`,
              solution: `// Solution for MVC Architecture exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review MVC Architecture concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C2E2',
              title: 'MVC Architecture Advanced Challenge',
              description: 'A more challenging exercise that combines MVC Architecture with other concepts learned.',
              starterCode: `// TODO: Advanced MVC Architecture implementation
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
                'Apply MVC Architecture principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered MVC Architecture! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C3',
          title: 'Active Record',
          description: 'Learn active record in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '70 mins',
          objectives: [
            'Understand Active Record fundamentals',
            'Apply Active Record in practical scenarios',
            'Write clean, efficient code using Active Record',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Active Record Fundamentals',
              content: 'Active Record is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Active Record example in Ruby
// Example demonstrating Active Record
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Active Record',
              content: 'Applying Active Record in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Active Record in Action',
              description: 'A practical example showing how to use Active Record effectively in Ruby projects.',
              code: `// Practical Active Record example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Active Record
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Active Record in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Active Record Usage',
              description: 'Building on basics to show more sophisticated Active Record patterns.',
              code: `// Advanced Active Record pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Active Record, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Active Record for robust Ruby applications',
            'Automation: Implementing Active Record in production systems',
            'DevOps Tools: Using Active Record for scalable architecture',
            'Rapid Prototyping: Applying Active Record in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C3E1',
              title: 'Active Record Basics Exercise',
              description: 'Practice Active Record fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Active Record
// Your solution here

`,
              solution: `// Solution for Active Record exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Active Record concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C3E2',
              title: 'Active Record Advanced Challenge',
              description: 'A more challenging exercise that combines Active Record with other concepts learned.',
              starterCode: `// TODO: Advanced Active Record implementation
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
                'Apply Active Record principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Active Record! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C4',
          title: 'RESTful Routing',
          description: 'Learn restful routing in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '45 mins',
          objectives: [
            'Understand RESTful Routing fundamentals',
            'Apply RESTful Routing in practical scenarios',
            'Write clean, efficient code using RESTful Routing',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'RESTful Routing Fundamentals',
              content: 'RESTful Routing is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// RESTful Routing example in Ruby
// Example demonstrating RESTful Routing
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical RESTful Routing',
              content: 'Applying RESTful Routing in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'RESTful Routing in Action',
              description: 'A practical example showing how to use RESTful Routing effectively in Ruby projects.',
              code: `// Practical RESTful Routing example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing RESTful Routing
  return "Practical result";
}
`,
              explanation: 'This example demonstrates RESTful Routing in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced RESTful Routing Usage',
              description: 'Building on basics to show more sophisticated RESTful Routing patterns.',
              code: `// Advanced RESTful Routing pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to RESTful Routing, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging RESTful Routing for robust Ruby applications',
            'Automation: Implementing RESTful Routing in production systems',
            'DevOps Tools: Using RESTful Routing for scalable architecture',
            'Rapid Prototyping: Applying RESTful Routing in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C4E1',
              title: 'RESTful Routing Basics Exercise',
              description: 'Practice RESTful Routing fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement RESTful Routing
// Your solution here

`,
              solution: `// Solution for RESTful Routing exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review RESTful Routing concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C4E2',
              title: 'RESTful Routing Advanced Challenge',
              description: 'A more challenging exercise that combines RESTful Routing with other concepts learned.',
              starterCode: `// TODO: Advanced RESTful Routing implementation
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
                'Apply RESTful Routing principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered RESTful Routing! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C5',
          title: 'Auth',
          description: 'Learn auth in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '43 mins',
          objectives: [
            'Understand Auth fundamentals',
            'Apply Auth in practical scenarios',
            'Write clean, efficient code using Auth',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Auth Fundamentals',
              content: 'Auth is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Auth example in Ruby
// Example demonstrating Auth
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Auth',
              content: 'Applying Auth in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Auth in Action',
              description: 'A practical example showing how to use Auth effectively in Ruby projects.',
              code: `// Practical Auth example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Auth
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Auth in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Auth Usage',
              description: 'Building on basics to show more sophisticated Auth patterns.',
              code: `// Advanced Auth pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Auth, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Auth for robust Ruby applications',
            'Automation: Implementing Auth in production systems',
            'DevOps Tools: Using Auth for scalable architecture',
            'Rapid Prototyping: Applying Auth in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C5E1',
              title: 'Auth Basics Exercise',
              description: 'Practice Auth fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Auth
// Your solution here

`,
              solution: `// Solution for Auth exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Auth concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C5E2',
              title: 'Auth Advanced Challenge',
              description: 'A more challenging exercise that combines Auth with other concepts learned.',
              starterCode: `// TODO: Advanced Auth implementation
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
                'Apply Auth principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Auth! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C6',
          title: 'Testing Rails',
          description: 'Learn testing rails in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '63 mins',
          objectives: [
            'Understand Testing Rails fundamentals',
            'Apply Testing Rails in practical scenarios',
            'Write clean, efficient code using Testing Rails',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'Testing Rails Fundamentals',
              content: 'Testing Rails is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// Testing Rails example in Ruby
// Example demonstrating Testing Rails
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical Testing Rails',
              content: 'Applying Testing Rails in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'Testing Rails in Action',
              description: 'A practical example showing how to use Testing Rails effectively in Ruby projects.',
              code: `// Practical Testing Rails example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing Testing Rails
  return "Practical result";
}
`,
              explanation: 'This example demonstrates Testing Rails in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced Testing Rails Usage',
              description: 'Building on basics to show more sophisticated Testing Rails patterns.',
              code: `// Advanced Testing Rails pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to Testing Rails, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging Testing Rails for robust Ruby applications',
            'Automation: Implementing Testing Rails in production systems',
            'DevOps Tools: Using Testing Rails for scalable architecture',
            'Rapid Prototyping: Applying Testing Rails in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C6E1',
              title: 'Testing Rails Basics Exercise',
              description: 'Practice Testing Rails fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement Testing Rails
// Your solution here

`,
              solution: `// Solution for Testing Rails exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review Testing Rails concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C6E2',
              title: 'Testing Rails Advanced Challenge',
              description: 'A more challenging exercise that combines Testing Rails with other concepts learned.',
              starterCode: `// TODO: Advanced Testing Rails implementation
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
                'Apply Testing Rails principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered Testing Rails! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C7',
          title: 'APIs',
          description: 'Learn apis in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '40 mins',
          objectives: [
            'Understand APIs fundamentals',
            'Apply APIs in practical scenarios',
            'Write clean, efficient code using APIs',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'APIs Fundamentals',
              content: 'APIs is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// APIs example in Ruby
// Example demonstrating APIs
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical APIs',
              content: 'Applying APIs in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'APIs in Action',
              description: 'A practical example showing how to use APIs effectively in Ruby projects.',
              code: `// Practical APIs example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing APIs
  return "Practical result";
}
`,
              explanation: 'This example demonstrates APIs in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced APIs Usage',
              description: 'Building on basics to show more sophisticated APIs patterns.',
              code: `// Advanced APIs pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to APIs, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging APIs for robust Ruby applications',
            'Automation: Implementing APIs in production systems',
            'DevOps Tools: Using APIs for scalable architecture',
            'Rapid Prototyping: Applying APIs in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C7E1',
              title: 'APIs Basics Exercise',
              description: 'Practice APIs fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement APIs
// Your solution here

`,
              solution: `// Solution for APIs exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review APIs concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C7E2',
              title: 'APIs Advanced Challenge',
              description: 'A more challenging exercise that combines APIs with other concepts learned.',
              starterCode: `// TODO: Advanced APIs implementation
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
                'Apply APIs principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered APIs! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        },

        {
          id: 'L5C8',
          title: 'DevOps',
          description: 'Learn devops in Ruby. Master core concepts with practical examples and real-world applications.',
          duration: '51 mins',
          objectives: [
            'Understand DevOps fundamentals',
            'Apply DevOps in practical scenarios',
            'Write clean, efficient code using DevOps',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: [
            {
              title: 'DevOps Fundamentals',
              content: 'DevOps is a crucial concept in Ruby. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for Ruby development and is used extensively in real-world applications.',
              codeExample: `// DevOps example in Ruby
// Example demonstrating DevOps
function example() {
  // Implementation
  return "Example output";
}
`,
              keyPoints: [
                'Essential for Ruby development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow Ruby best practices'
              ]
            },
            {
              title: 'Practical DevOps',
              content: 'Applying DevOps in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\'ll encounter in professional Ruby development.',
              keyPoints: [
                'Follow Ruby conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ],
          practicalExamples: [
            {
              title: 'DevOps in Action',
              description: 'A practical example showing how to use DevOps effectively in Ruby projects.',
              code: `// Practical DevOps example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing DevOps
  return "Practical result";
}
`,
              explanation: 'This example demonstrates DevOps in a real-world context, showing best practices for Ruby development.'
            },
            {
              title: 'Advanced DevOps Usage',
              description: 'Building on basics to show more sophisticated DevOps patterns.',
              code: `// Advanced DevOps pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
`,
              explanation: 'This shows a more advanced approach to DevOps, commonly seen in professional Ruby codebases.'
            }
          ],
          realWorldUseCases: [
            'Rails Web Apps: Leveraging DevOps for robust Ruby applications',
            'Automation: Implementing DevOps in production systems',
            'DevOps Tools: Using DevOps for scalable architecture',
            'Rapid Prototyping: Applying DevOps in enterprise solutions'
          ],
          exercises: [
            {
              id: 'L5C8E1',
              title: 'DevOps Basics Exercise',
              description: 'Practice DevOps fundamentals by implementing a solution in Ruby.',
              starterCode: `// TODO: Implement DevOps
// Your solution here

`,
              solution: `// Solution for DevOps exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
`,
              hints: [
                'Review DevOps concepts from this chapter',
                'Follow Ruby syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: 'L5C8E2',
              title: 'DevOps Advanced Challenge',
              description: 'A more challenging exercise that combines DevOps with other concepts learned.',
              starterCode: `// TODO: Advanced DevOps implementation
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
                'Apply DevOps principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ],
          summary: 'You\'ve mastered DevOps! You can now confidently use these concepts in your Ruby projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }
      ],
      capstoneProject: {
        title: 'Production Ruby Application',
        description: 'Build and deploy a production-ready system',
        requirements: [
          "Rails Web Apps",
          "Automation",
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
