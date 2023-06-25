"use client";
import UserProfileList from "@/components/UserProfileList";
import { DetailUser } from "@/model/user";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSWR<DetailUser[]>(`/api/search/${search.trim() === "" ? "all" : search}`);

  console.log(data);
  return (
    <section className="flex flex-col mx-auto w-full max-w-[850px] p-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-2 py-4 text-xl border outline-none"
        placeholder="Search for a username or name"
      />
      {data && <UserProfileList userList={data} />}
    </section>
  );
}
