#!/usr/bin/env node

if (process.argv.length < 5) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password> <name>');
  process.exit(2);
}

const [,, email, password, ...nameParts] = process.argv;
const name = nameParts.join(' ') || 'Admin User';

const ENDPOINT = process.env.APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT  = process.env.APPWRITE_PROJECT_ID || '69aa826d003e711776fd';
const API_KEY  = process.env.APPWRITE_API_KEY;

(async () => {
  try {
    const appwrite = await import('appwrite');
    const { Client } = appwrite;

    const client = new Client()
      .setEndpoint(ENDPOINT)
      .setProject(PROJECT);

    if (API_KEY) {
      client.setKey(API_KEY);
      const { Users } = appwrite;
      const users = new Users(client);

      console.log('Creating admin user via Admin API...');
      const created = await users.create('unique()', email, password, name);
      const userId = created.$id || created.id;
      console.log('User created:', userId);

      console.log('Updating user preferences to set role=admin...');
      await users.updatePrefs(userId, { role: 'admin' });

      console.log('Admin user created and role set.');
      console.log(`Email: ${email}`);
      process.exit(0);
    } else {
      // No API key — fall back to creating a user via public Account endpoint
      const { Account } = appwrite;
      const account = new Account(client);
      console.log('APPWRITE_API_KEY not set — creating account via public API (no role prefs set).');
      const created = await account.create('unique()', email, password, name);
      console.log('User created (no admin prefs):', created.$id || created.id);
      console.log('To mark this user as admin, set prefs.role = "admin" in the Appwrite Console or run this script with APPWRITE_API_KEY set.');
      process.exit(0);
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
})();
