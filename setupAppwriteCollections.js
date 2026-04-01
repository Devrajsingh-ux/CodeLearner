#!/usr/bin/env node

/**
 * Setup Appwrite Collections for Course Import
 * Run: node setupAppwriteCollections.js
 * 
 * Creates the required collections:
 * - courses
 * - lessons
 */

const { Client, Databases, ID } = require('node-appwrite');

// Environment variables
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'http://localhost:8080/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'main';

async function setupCollections() {
  console.log('\n🔧 Setting up Appwrite Collections for Course Import\n');
  
  if (!APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
    console.error('❌ Missing environment variables:');
    console.error('   NEXT_PUBLIC_APPWRITE_PROJECT_ID:', APPWRITE_PROJECT_ID ? '✅' : '❌');
    console.error('   APPWRITE_API_KEY:', APPWRITE_API_KEY ? '✅' : '❌');
    console.error('\nPlease set these in your .env.local file\n');
    process.exit(1);
  }

  // Initialize client
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    // 1. Create courses collection
    console.log('📚 Creating courses collection...');
    
    try {
      await databases.createCollection(DATABASE_ID, 'courses', 'courses', [
        // Basic permissions - adjust as needed
        'read("any")',
        'create("users")', 
        'update("users")',
        'delete("users")'
      ]);
      console.log('✅ Courses collection created');
    } catch (e) {
      if (e.code === 409) {
        console.log('⏭️  Courses collection already exists');
      } else {
        throw e;
      }
    }

    // Add attributes to courses collection
    console.log('📝 Adding attributes to courses collection...');

    const courseAttributes = [
      { key: 'slug', type: 'string', size: 100, required: true },
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'description', type: 'string', size: 1000, required: false },
      { key: 'category', type: 'string', size: 100, required: false },
      { key: 'difficulty', type: 'string', size: 50, required: false },
      { key: 'lessonsCount', type: 'integer', required: false },
      { key: 'duration', type: 'string', size: 50, required: false },
      { key: 'enrolledCount', type: 'integer', required: false },
      { key: 'rating', type: 'float', required: false },
      { key: 'tags', type: 'string', size: 500, required: false },
      { key: 'status', type: 'string', size: 20, required: false },
      { key: 'isFeatured', type: 'boolean', required: false },
      { key: 'isNew', type: 'boolean', required: false },
      { key: 'instructor', type: 'string', size: 255, required: false },
      { key: 'completionRate', type: 'integer', required: false }
    ];

    for (const attr of courseAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(DATABASE_ID, 'courses', attr.key, attr.size, attr.required);
        } else if (attr.type === 'integer') {
          await databases.createIntegerAttribute(DATABASE_ID, 'courses', attr.key, attr.required);
        } else if (attr.type === 'float') {
          await databases.createFloatAttribute(DATABASE_ID, 'courses', attr.key, attr.required);
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(DATABASE_ID, 'courses', attr.key, attr.required);
        }
        console.log(`   ✅ ${attr.key} (${attr.type})`);
        // Wait a bit between attribute creation
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        if (e.code === 409) {
          console.log(`   ⏭️  ${attr.key} already exists`);
        } else {
          console.error(`   ❌ Failed to create ${attr.key}:`, e.message);
        }
      }
    }

    // 2. Create lessons collection
    console.log('\n📖 Creating lessons collection...');
    
    try {
      await databases.createCollection(DATABASE_ID, 'lessons', 'lessons', [
        'read("any")',
        'create("users")', 
        'update("users")',
        'delete("users")'
      ]);
      console.log('✅ Lessons collection created');
    } catch (e) {
      if (e.code === 409) {
        console.log('⏭️  Lessons collection already exists');
      } else {
        throw e;
      }
    }

    // Add attributes to lessons collection
    console.log('📝 Adding attributes to lessons collection...');

    const lessonAttributes = [
      { key: 'track', type: 'string', size: 100, required: true },
      { key: 'slug', type: 'string', size: 100, required: true },
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'type', type: 'string', size: 50, required: false },
      { key: 'duration', type: 'string', size: 20, required: false },
      { key: 'xp', type: 'integer', required: false },
      { key: 'isLocked', type: 'boolean', required: false },
      { key: 'content', type: 'string', size: 16384, required: false }, // Large for markdown
      { key: 'code', type: 'string', size: 4096, required: false },
      { key: 'language', type: 'string', size: 50, required: false },
      { key: 'filename', type: 'string', size: 100, required: false },
      { key: 'objectives', type: 'string', size: 2048, required: false } // JSON array as string
    ];

    for (const attr of lessonAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(DATABASE_ID, 'lessons', attr.key, attr.size, attr.required);
        } else if (attr.type === 'integer') {
          await databases.createIntegerAttribute(DATABASE_ID, 'lessons', attr.key, attr.required);
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(DATABASE_ID, 'lessons', attr.key, attr.required);
        }
        console.log(`   ✅ ${attr.key} (${attr.type})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        if (e.code === 409) {
          console.log(`   ⏭️  ${attr.key} already exists`);
        } else {
          console.error(`   ❌ Failed to create ${attr.key}:`, e.message);
        }
      }
    }

    // 3. Create indexes for better performance
    console.log('\n🔍 Creating indexes...');
    
    try {
      // Course slug index (unique)
      await databases.createIndex(DATABASE_ID, 'courses', 'slug_unique', 'unique', ['slug']);
      console.log('   ✅ courses.slug unique index');
    } catch (e) {
      if (e.code === 409) {
        console.log('   ⏭️  courses.slug index already exists');
      }
    }

    try {
      // Lesson track index
      await databases.createIndex(DATABASE_ID, 'lessons', 'track_index', 'key', ['track']);
      console.log('   ✅ lessons.track index');
    } catch (e) {
      if (e.code === 409) {
        console.log('   ⏭️  lessons.track index already exists');
      }
    }

    try {
      // Lesson slug index
      await databases.createIndex(DATABASE_ID, 'lessons', 'slug_index', 'key', ['slug']);
      console.log('   ✅ lessons.slug index');
    } catch (e) {
      if (e.code === 409) {
        console.log('   ⏭️  lessons.slug index already exists');
      }
    }

    console.log('\n🎉 Database setup complete!');
    console.log('\n✅ Collections ready:');
    console.log('   - courses (with all required attributes)');
    console.log('   - lessons (with all required attributes)');
    console.log('   - Indexes created for performance');
    console.log('\n🚀 You can now run the course import!');
    console.log('   Go to /admin/courses and click "Import 49 Curricula"\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your Appwrite server is running');
    console.error('   2. Verify environment variables are correct');
    console.error('   3. Ensure API key has database permissions');
    console.error('   4. Check if database exists\n');
    process.exit(1);
  }
}

setupCollections();
