/**
 * Assign better categories to courses for proper home page display
 */

const { Client, Databases, Query } = require("node-appwrite");

const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  apiKey: process.env.APPWRITE_API_KEY,
  databaseId: process.env.APPWRITE_DATABASE_ID
};

// Course category mappings
const COURSE_CATEGORIES = {
  // Frontend
  "html": "Frontend",
  "css": "Frontend", 
  "sass": "Frontend",
  "less": "Frontend",
  "javascript": "Frontend",
  "typescript": "Frontend",
  
  // Backend
  "python": "Backend",
  "java": "Backend",
  "go": "Backend",
  "rust": "Backend",
  "php": "Backend",
  "ruby": "Backend",
  "csharp": "Backend",
  
  // Mobile
  "swift": "Mobile",
  "kotlin": "Mobile",
  "dart": "Mobile",
  "objective-c": "Mobile",
  
  // Systems
  "c": "Systems",
  "cpp": "Systems",
  "assembly": "Systems",
  "fortran": "Systems",
  
  // Data & AI
  "r": "Data & AI",
  "julia": "Data & AI",
  "matlab": "Data & AI",
  "sql": "Data & AI",
  
  // Web3 & Security
  "solidity": "Web3 & Security",
  
  // DevOps & Cloud
  "shell": "DevOps & Cloud",
  "powershell": "DevOps & Cloud",
  
  // All others remain "Languages"
};

async function assignCategories() {
  console.log("🏷️  Assigning better categories to courses...\n");
  
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
    
  const databases = new Databases(client);
  
  try {
    let updated = 0;
    
    for (const [slug, category] of Object.entries(COURSE_CATEGORIES)) {
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
        
        // Update category
        await databases.updateDocument(
          config.databaseId,
          "courses",
          course.$id,
          { category: category }
        );
        
        updated++;
        console.log(`✅ ${course.title} → ${category}`);
        
      } catch (error) {
        console.error(`❌ Failed to update ${slug}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully categorized ${updated} courses!`);
    console.log("\n💡 Home page tabs should now show diverse course categories.");
    
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

assignCategories();
