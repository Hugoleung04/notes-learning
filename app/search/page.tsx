import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  const notes = getAllNotes();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Client-side search over titles, excerpts, tags, and topics.
        </p>
      </header>
      <SearchClient notes={notes} />
    </div>
  );
}
