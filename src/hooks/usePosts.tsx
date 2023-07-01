import { Comment, SimplePost } from "@/model/post";
import { AuthUser } from "@/model/user";
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

async function updateComment(id: string, comment: string) {
  return fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      id,
      comment,
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

  const addComment = (comment: Comment, post: SimplePost) => {
    const newPost = {
      ...post,
      comment: post.comments + 1,
    };
    const newPosts = posts?.map((post) => (post.id === newPost.id ? newPost : post));
    return mutate(updateComment(post.id, comment.comment), {
      optimisticData: newPosts,
      revalidate: false,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  return { posts, isLoading, error, setLikes, addComment };
}
