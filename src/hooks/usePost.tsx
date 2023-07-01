import { Comment, FullPost, SimplePost } from "@/model/post";
import { AuthUser } from "@/model/user";
import useSWR from "swr";

async function updateComment(id: string, comment: string) {
  return fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      id,
      comment,
    }),
  }).then((res) => res.json());
}
export default function usePost(postId: string) {
  const { data: fullPost, isLoading, error, mutate } = useSWR<FullPost>(`/api/post/${postId}`);

  const addComment = (comment: Comment) => {
    if (!fullPost) return;
    const newfullPost = {
      ...fullPost,
      comment: [...fullPost.comments, comment],
    };

    return mutate(updateComment(fullPost.id, comment.comment), {
      optimisticData: newfullPost,
      revalidate: false,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  return { fullPost, isLoading, error, addComment };
}
