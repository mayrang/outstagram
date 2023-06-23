import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "text": comments[0]->content,
  "comments": count(comments),
  "likes": likes[]->username,
  "id": _id,
  "createdAt": _createdAt
`;

export async function getPosts(username: string) {
  const posts = await client.fetch(
    `*[_type == 'post' && author._ref in *[_type == 'user' && username == "${username}"][0].followings[]._ref || author->username == "${username}"] | order(_createdAt desc){${simplePostProjection}}`
  );

  // const users = await client.fetch(
  //   `*[_type == 'user' && _id in *[_type == 'user' && username == '${username}'][0].followings[]._ref || username=="${username}"]{...}`
  // );
  // console.log("user", users.length);
  return posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }));
}
