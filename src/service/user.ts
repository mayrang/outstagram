import { ProfileUser, SearchUser } from "@/model/user";
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
    .then((users: SearchUser[]) =>
      users.map((user) => ({ ...user, followers: user.followers ?? 0, followings: user.followings ?? 0 }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      "followings": count(followings),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username== "${username}"])
    }`
    )
    .then((user: ProfileUser) => ({
      ...user,
      followings: user.followings ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmarks(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [{ _ref: postId, _type: "reference" }])
    .commit({
      // Adds a `_key` attribute to array items, unique within the array, to
      // ensure it can be addressed uniquely in a real-time collaboration context
      autoGenerateArrayKeys: true,
    });
}

export async function removeBookmarks(userId: string, postId: string) {
  console.log("check");
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function addFollow(userId: string, followUserId: string) {
  return client
    .transaction()
    .patch(userId, (user) =>
      user.setIfMissing({ followings: [] }).append("followings", [{ _ref: followUserId, _type: "reference" }])
    )
    .patch(followUserId, (user) =>
      user.setIfMissing({ followers: [] }).append("followers", [{ _ref: userId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeFollow(userId: string, followUserId: string) {
  return client
    .transaction()
    .patch(userId, (user) => user.unset([`followings[_ref=="${followUserId}"]`]))
    .patch(followUserId, (user) => user.unset([`followers[_ref=="${userId}"]`]))
    .commit();
}
