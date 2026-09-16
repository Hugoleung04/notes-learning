"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export default function SearchClient({ notes }: { notes: NoteMeta[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      const hay = [
        n.title,
        n.excerpt,
        n.topic ?? "",
        ...n.tags,
        n.slug,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [notes, query]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Search notes
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, tag, topic, excerpt…"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none ring-amber-400/40 transition focus:border-amber-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-amber-600"
          autoFocus
        />
      </label>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {results.length} result{results.length === 1 ? "" : "s"}
        {query.trim() ? ` for “${query.trim()}”` : ""}
      </p>

      <ul className="space-y-3">
        {results.map((note) => (
          <li key={note.slug} className="card !p-4">
            <div className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
              {note.date}
              {note.topic ? ` · ${note.topic}` : ""}
            </div>
            <Link
              href={`/notes/${note.slug}`}
              className="font-semibold text-zinc-900 hover:text-amber-700 dark:text-zinc-50 dark:hover:text-amber-400"
            >
              {note.title}
            </Link>
            {note.excerpt && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {note.excerpt}
              </p>
            )}
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          No matching notes. Try another keyword.
        </p>
      )}
    </div>
  );
}
