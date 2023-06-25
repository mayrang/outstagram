import { ProfileUser } from "@/model/user";
import { client } from "./sanity";

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string | null;
};

export async function createUser({ id, username, name, email, image }: User) {
  try {
    const result = await client.createIfNotExists({
      _id: id,
      _type: "user",
      username,
      name,
      email,
      image,
      followings: [],
      followers: [],
      bookmarks: [],
    });

    return result;
  } catch (err) {
    console.log(err);
    return "에러가 발생했습니다.";
  }
}

export async function getUser(username: string) {
  const user = await client.fetch(
    `*[_type=="user" && username == "${username}"][0]{..., "id": _id, "bookmarks":bookmarks[]->_id, followers[]->{username, image}, followings[]->{ username, image}}`
  );

  return user;
}

export async function getSearchUsers(keyword?: string) {
  const query = keyword ? `&& username == "${keyword}" || name == "${keyword}"` : "";
  return client
    .fetch(`*[_type=="user" ${query}]{...,  "followings": count(followings), "followers": count(followers)}`)
    .then((users: ProfileUser[]) =>
      users.map((user) => ({ ...user, followers: user.followers ?? 0, followings: user.followings ?? 0 }))
    );
}
