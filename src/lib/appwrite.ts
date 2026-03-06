import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69aa826d003e711776fd");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
