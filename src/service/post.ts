import { Comment, FullPost, SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "text": comments[0].content,
  "comments": count(comments),
  "likes": likes[]->username,
  "id": _id,
  "createdAt": _createdAt
`;

export async function getPosts(username: string) {
  return client
    .fetch(
      `*[_type == 'post' && author._ref in *[_type == 'user' && username == "${username}"][0].followings[]._ref || author->username == "${username}"] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
  // const users = await client.fetch(
  //   `*[_type == 'user' && _id in *[_type == 'user' && username == '${username}'][0].followings[]._ref || username=="${username}"]{...}`
  // );
  // console.log("user", users.length);
}

export async function getPost(postId: string) {
  console.log(postId);
  return client
    .fetch(
      `*[_type=="post" && _id == "${postId}" ][0]{
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      likes[],
      "text": comments[0].content,
      comments[]{"username": author->username, "image":author->image, "comment":content },
      "id": _id,
      "createdAt": _createdAt
    } `
    )
    .then((post: FullPost) => ({ ...post, image: urlFor(post.image) }));
}

export async function getUserPosts(username: string) {
  return client
    .fetch(`*[_type == "post" && author->username == "${username}"]{${simplePostProjection}}`)
    .then(mapPosts);
}

export async function getLikedPosts(username: string) {
  return client
    .fetch(`*[_type == "post" && "${username}" in likes[]->username ]{${simplePostProjection}}`)
    .then(mapPosts);
}

export async function getBookmarkedPost(username: string) {
  return client
    .fetch(
      `*[_type == "post" &&  _id in *[_type == "user" && author->username == "${username}"].bookmarks[]._ref]{${simplePostProjection}}`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image), likes: post.likes ?? [] }));
}

export async function addLikes(postId: string, userId: string) {
  console.log(postId, userId);
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [{ _ref: userId, _type: "reference" }])
    .commit({
      // Adds a `_key` attribute to array items, unique within the array, to
      // ensure it can be addressed uniquely in a real-time collaboration context
      autoGenerateArrayKeys: true,
    });
}

export async function removeLikes(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset(["likes[0]", `likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [{ author: { _ref: userId, _type: "reference" }, content: comment }])
    .commit({ autoGenerateArrayKeys: true });
}
