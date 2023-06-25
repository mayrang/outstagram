"use client";

import { SearchUser } from "@/model/user";
import React, { useState } from "react";
import useSWR from "swr";
import UserCard from "./UserCard";
import GridSpinner from "./ui/icons/GridSpinner";
import useDebounce from "@/hooks/useDebounce";
export default function SearchUser() {
  const [keyword, setKeyword] = useState("");
  const deboundedKeyword = useDebounce(keyword, 1000);
  const { data: users, isLoading, error } = useSWR<SearchUser[]>(`/api/search/${deboundedKeyword}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-full flex flex-col items-center my-4 max-w-3xl">
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-3 text-xl border border-gray-300 outline-none"
          placeholder="Search for a username or name"
        />
      </form>
      {isLoading && <GridSpinner />}
      {error && <p>뭔가.. 뭔가 잘못됨..</p>}
      {!isLoading && !error && users?.length === 0 && <p>유저가 없습니다.</p>}
      {users && (
        <ul className="w-full p-6 flex flex-col items-center gap-2">
          {users.map((user) => (
            <li className="w-full" key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
