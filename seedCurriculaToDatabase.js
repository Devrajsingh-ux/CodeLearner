#!/usr/bin/env node

/**
 * Seed all 49 curricula to Appwrite database
 * Run this script after setting up your Appwrite instance
 * 
 * Usage: node seedCurriculaToDatabase.js
 */

const readline = require('readline');

const ADMIN_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function promptConfirm(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question + ' (y/n): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function seedCurricula() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║     Seed All 49 Curricula to Appwrite Database       ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`📡 Target: ${ADMIN_BASE_URL}/api/admin/courses/seed-curricula\n`);
  
  const confirmed = await promptConfirm('This will import all 49 language courses to the database. Continue?');
  
  if (!confirmed) {
    console.log('\n❌ Operation cancelled.\n');
    process.exit(0);
  }

  console.log('\n🚀 Starting import...\n');

  try {
    // Note: This requires admin authentication via cookies
    // Run this from the admin panel or manually add admin session cookie
    const response = await fetch(`${ADMIN_BASE_URL}/api/admin/courses/seed-curricula`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // You'll need to add admin session cookie here in production
      // credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Import failed');
    }

    console.log('\n✅ Import completed successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Results:`);
    console.log(`   Total courses: ${data.total}`);
    console.log(`   ✅ Success: ${data.success}`);
    console.log(`   ⏭️  Skipped (already exists): ${data.skipped}`);
    console.log(`   ❌ Failed: ${data.failed}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (data.details.success.length > 0) {
      console.log('✅ Successfully imported:');
      data.details.success.forEach((slug) => {
        console.log(`   - ${slug}`);
      });
      console.log('');
    }

    if (data.details.skipped.length > 0) {
      console.log('⏭️  Skipped (already in database):');
      data.details.skipped.forEach((slug) => {
        console.log(`   - ${slug}`);
      });
      console.log('');
    }

    if (data.details.failed.length > 0) {
      console.log('❌ Failed:');
      data.details.failed.forEach(({ slug, error }) => {
        console.log(`   - ${slug}: ${error}`);
      });
      console.log('');
    }

    console.log('🎉 All done! Your courses are now available on the website.\n');

  } catch (error) {
    console.error('\n❌ Error during import:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. Your Next.js dev server is running');
    console.error('   2. Appwrite is configured correctly');
    console.error('   3. You have admin privileges\n');
    process.exit(1);
  }
}

seedCurricula();
