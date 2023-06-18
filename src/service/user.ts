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
    const result = await client.createOrReplace({
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
