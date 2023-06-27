import { SimplePost } from "@/model/post";
import useSWR from "swr";

async function updateLikes(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({
      id,
      like,
    }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>("/api/posts");
  const setLikes = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like ? [...post.likes, username] : post.likes.filter((like) => like !== username),
    };
    const newPosts = posts?.map((post) => (post.id === newPost.id ? newPost : post));
    return mutate(updateLikes(post.id, like), {
      optimisticData: newPosts,
      revalidate: false,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  return { posts, isLoading, error, setLikes };
}
