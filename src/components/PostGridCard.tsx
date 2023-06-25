import { SimplePost } from "@/model/post";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import DetailPost from "./DetailPost";

type Props = {
  post: SimplePost;
};

export default function PostGridCard({ post }: Props) {
  const [modal, setModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const handlePost = () => {
    if (user) {
      setModal(true);
    } else {
      signIn();
    }
  };
  return (
    <>
      {modal && (
        <ModalPortal>
          <PostModal onClose={() => setModal(false)}>
            <DetailPost post={post} />
          </PostModal>
        </ModalPortal>
      )}
      <button onClick={handlePost} key={post.id} className="relative w-full h-[400px]">
        <Image fill src={post.image} alt={`photo by ${post.username}`} />
      </button>
    </>
  );
}
