import { Client, Account, Databases, ID } from "appwrite";

/**
 * Client-side Appwrite SDK configuration.
 * Environment variables MUST be set - no hardcoded fallbacks for security.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

// Validate required environment variables at runtime (browser only)
if (typeof window !== 'undefined') {
  if (!ENDPOINT) {
    console.error("CRITICAL: NEXT_PUBLIC_APPWRITE_ENDPOINT is not set");
  }
  if (!PROJECT) {
    console.error("CRITICAL: NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set");
  }
}

const client = new Client();

// Only configure if env vars are available (prevents crashes during build)
if (ENDPOINT && PROJECT) {
  client.setEndpoint(ENDPOINT).setProject(PROJECT);
}

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
