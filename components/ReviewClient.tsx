"use client";

import { useState } from "react";
import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export default function ReviewClient({
  topic,
  notes,
}: {
  topic: string;
  notes: NoteMeta[];
}) {
  const [index, setIndex] = useState(0);

  if (notes.length === 0) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        No notes in this topic yet.
      </p>
    );
  }

  const note = notes[index];
  const atStart = index === 0;
  const atEnd = index === notes.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          Card {index + 1} of {notes.length}
        </span>
        <Link
          href={`/topics/${encodeURIComponent(topic)}`}
          className="hover:text-amber-700 dark:hover:text-amber-400"
        >
          ← Back to topic
        </Link>
      </div>

      <article className="card min-h-[220px]">
        <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {topic}
        </p>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          {note.title}
        </h2>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          {note.date}
        </p>
        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          {note.excerpt || "Open the full note for details."}
        </p>
        <div className="mt-6">
          <Link
            href={`/notes/${note.slug}`}
            className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-400"
          >
            Open full note →
          </Link>
        </div>
      </article>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={atStart}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900"
        >
          ← Previous
        </button>
        <button
          type="button"
          disabled={atEnd}
          onClick={() => setIndex((i) => Math.min(notes.length - 1, i + 1))}
          className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-zinc-950"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
