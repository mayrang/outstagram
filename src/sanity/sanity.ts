import { createClient } from "@sanity/client";

type User = {
  _type: string;
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
};

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});

export async function createUser(user: User) {
  try {
    const result = await client.createOrReplace(user);

    return result;
  } catch (err) {
    console.log(err);
    return "에러가 발생했습니다.";
  }
}
