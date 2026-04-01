/**
 * Clear all courses and lessons from Appwrite for testing
 * Run: node clearAppwriteData.js
 */

const { Client, Databases, Query } = require("node-appwrite");

const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  apiKey: process.env.APPWRITE_API_KEY,
  databaseId: process.env.APPWRITE_DATABASE_ID || "zentax_db"
};

async function clearData() {
  console.log("🗑️  Clearing all courses and lessons for fresh import test...\n");
  
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
    
  const databases = new Databases(client);
  
  try {
    // Clear lessons first (they may reference courses)
    console.log("📖 Clearing lessons...");
    let lessons = await databases.listDocuments(config.databaseId, "lessons", [Query.limit(1000)]);
    let deleteCount = 0;
    
    while (lessons.documents.length > 0) {
      for (const lesson of lessons.documents) {
        try {
          await databases.deleteDocument(config.databaseId, "lessons", lesson.$id);
          deleteCount++;
          console.log(`   ✓ Deleted lesson ${deleteCount}: ${lesson.title}`);
        } catch (error) {
          console.error(`   ❌ Failed to delete lesson ${lesson.$id}:`, error.message);
        }
      }
      // Get next batch
      lessons = await databases.listDocuments(config.databaseId, "lessons", [Query.limit(1000)]);
    }
    
    console.log(`\n✅ Deleted ${deleteCount} lessons`);
    
    // Clear courses
    console.log("\n📚 Clearing courses...");
    let courses = await databases.listDocuments(config.databaseId, "courses", [Query.limit(1000)]);
    deleteCount = 0;
    
    while (courses.documents.length > 0) {
      for (const course of courses.documents) {
        try {
          await databases.deleteDocument(config.databaseId, "courses", course.$id);
          deleteCount++;
          console.log(`   ✓ Deleted course ${deleteCount}: ${course.title}`);
        } catch (error) {
          console.error(`   ❌ Failed to delete course ${course.$id}:`, error.message);
        }
      }
      // Get next batch
      courses = await databases.listDocuments(config.databaseId, "courses", [Query.limit(1000)]);
    }
    
    console.log(`\n✅ Deleted ${deleteCount} courses`);
    console.log("\n🎉 Database cleared! Ready for fresh import.");
    
  } catch (error) {
    console.error("❌ Clear failed:", error);
    process.exit(1);
  }
}

clearData();