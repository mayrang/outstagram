import { Comment, FullPost, SimplePost } from "@/model/post";
import { AuthUser } from "@/model/user";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

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
  const { data: fullPost, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: glabalMutate } = useSWRConfig();
  const addComment = useCallback(
    (comment: Comment) => {
      if (!fullPost) return;
      const newfullPost = {
        ...fullPost,
        comments: [...fullPost.comments, comment],
      };

      return mutate(updateComment(fullPost.id, comment.comment), {
        optimisticData: newfullPost,
        revalidate: false,
        rollbackOnError: true,
        populateCache: false,
      }).then(() => glabalMutate("/api/posts"));
    },
    [fullPost, mutate]
  );
  return { fullPost, isLoading, error, addComment };
}
