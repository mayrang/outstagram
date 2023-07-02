"use client";
import { SimpleUser } from "@/model/user";
import React, { useState, useRef } from "react";
import AvatarBadge from "./ui/AvatarBadge";
import Button from "./ui/Button";
import Image from "next/image";
import FileIcon from "./ui/icons/FileIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/icons/GridSpinner";

type Props = {
  user: SimpleUser;
};

export default function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleDrag = (e: React.DragEvent) => {
    console.log("123");
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    console.log(1);
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragging(false);
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("text", textRef.current?.value || "");
    formData.append("file", file as Blob);
    fetch("/api/new", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
        }
        router.replace("/");
      })
      .catch((err) => setError(err.statusText))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl  flex flex-col  items-center"
    >
      {isLoading && (
        <div className="absolute inset-0 flex justify-center pt-24 bg-sky-200/20">
          <GridSpinner />
        </div>
      )}
      {error && <div className="w-full text-lg font-bold text-red-400 bg-red-100 py-4">{error}</div>}
      <div className="w-full flex justify-center items-center gap-2">
        <AvatarBadge username={username} image={image} size="medium" />
        <p className="font-bold text-xl">{username}</p>
      </div>
      <div className="w-full mt-2">
        <input className="hidden" onChange={handleChange} accept="image/*" type="file" id="image-id" />
        <label
          className="w-full relative flex flex-col items-center justify-center border-2 border-sky-400  border-dashed h-40"
          htmlFor="image-id"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <Image src={URL.createObjectURL(file)} alt="content image" fill sizes={"650"} className="object-cover" />
          ) : (
            <>
              <FileIcon />
              <p>Drag and Drop your image..</p>
            </>
          )}

          {dragging && <div className={`absolute inset-0 z-20 bg-sky-400/20 pointer-events-none`}></div>}
        </label>
      </div>
      <textarea required ref={textRef} rows={10} className="w-full border-none outline-none" />
      <Button onClick={() => {}} text="Post" />
    </form>
  );
}
