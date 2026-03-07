import { Client, Account, Databases, ID } from "appwrite";

// NEXT_PUBLIC_ env vars are baked into the browser bundle at build time.
// Hardcoded strings act as safe fallbacks so the SDK is always configured
// even when the host hasn't set the env vars yet.
const ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ??
  "https://sgp.cloud.appwrite.io/v1";

const PROJECT =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ??
  "69aa826d003e711776fd";

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
