import { Client, Account, Databases } from "appwrite";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!ENDPOINT || !PROJECT) {
  // Don't throw at import time — show a clear runtime warning and allow the
  // app to continue so the UI can surface a helpful error instead of crashing
  // the whole server. Auth flows will fail with network errors which we catch
  // and display to the user.
  // eslint-disable-next-line no-console
  console.warn(
    "Appwrite env vars are missing: NEXT_PUBLIC_APPWRITE_ENDPOINT and/or NEXT_PUBLIC_APPWRITE_PROJECT_ID. Configure them in your hosting environment.",
  );
}

const client = new Client();
if (ENDPOINT) client.setEndpoint(ENDPOINT);
if (PROJECT) client.setProject(PROJECT);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
