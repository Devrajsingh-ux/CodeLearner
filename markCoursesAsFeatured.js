/**
 * Mark popular courses as featured for home page display
 */

const { Client, Databases, Query } = require("node-appwrite");

const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  apiKey: process.env.APPWRITE_API_KEY,
  databaseId: process.env.APPWRITE_DATABASE_ID
};

// Popular courses to feature
const FEATURED_COURSES = [
  "python",      // Most popular for beginners
  "javascript",  // Essential for web dev
  "java",        // Enterprise favorite
  "typescript",  // Modern web development
  "go",          // Modern backend
  "rust",        // Systems programming
  "html",        // Web fundamentals
  "css"          // Web styling
];

async function markAsFeatured() {
  console.log("🌟 Marking popular courses as featured...\n");
  
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
    
  const databases = new Databases(client);
  
  try {
    let updated = 0;
    
    for (const slug of FEATURED_COURSES) {
      try {
        // Find course by slug
        const courses = await databases.listDocuments(
          config.databaseId, 
          "courses", 
          [Query.equal("slug", slug), Query.limit(1)]
        );
        
        if (courses.documents.length === 0) {
          console.log(`⚠️  Course not found: ${slug}`);
          continue;
        }
        
        const course = courses.documents[0];
        
        // Update to featured
        await databases.updateDocument(
          config.databaseId,
          "courses",
          course.$id,
          { isFeatured: true }
        );
        
        updated++;
        console.log(`✅ Marked as featured: ${course.title}`);
        
      } catch (error) {
        console.error(`❌ Failed to update ${slug}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully marked ${updated} courses as featured!`);
    console.log("\n💡 Home page should now show courses in the Featured tab.");
    
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

markAsFeatured();
