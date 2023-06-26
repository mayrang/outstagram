import SearchUser from "@/components/SearchUser";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description: "search user",
};

export default function SearchPage() {
  return <SearchUser />;
}
