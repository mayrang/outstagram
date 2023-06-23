import { client } from "./sanity";

export async function getPosts(username: string) {
  const posts = await client.fetch(
    `*[_type == 'post' && author._ref in *[_type == 'user' && _id in *[_type == 'user' && username == '${username}'][0].followings[]._ref || username=="${username}"]._id]{"likes": count(likes[]->), photo, _id, _createdAt, _updatedAt, "author": author->{username, image}, "comment": comments[][0]{"username": author->.username, content} }`
  );

  // const users = await client.fetch(
  //   `*[_type == 'user' && _id in *[_type == 'user' && username == '${username}'][0].followings[]._ref || username=="${username}"]{...}`
  // );
  // console.log("user", users.length);
  return posts;
}
