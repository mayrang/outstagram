import { client } from "./sanity";

export async function getFollowings(username: string) {
  const followings = await client.fetch(
    `*[_type=="user" && username == "${username}"][0]{followings[]->{name, username, image, email}}`
  );
  console.log(followings);
  return followings;
}
