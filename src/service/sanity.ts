import { createClient } from "@sanity/client";

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string | null;
};

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});
