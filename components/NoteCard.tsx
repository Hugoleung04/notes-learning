import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export default function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <article className="card">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <time dateTime={note.date}>{note.date}</time>
        {note.topic && (
          <>
            <span aria-hidden>·</span>
            <Link
              href={`/topics/${encodeURIComponent(note.topic)}`}
              className="text-amber-700 hover:underline dark:text-amber-400"
            >
              {note.topic}
            </Link>
          </>
        )}
      </div>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">
        <Link
          href={`/notes/${note.slug}`}
          className="text-zinc-900 hover:text-amber-700 dark:text-zinc-50 dark:hover:text-amber-400"
        >
          {note.title}
        </Link>
      </h2>
      {note.excerpt && (
        <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {note.excerpt}
        </p>
      )}
      {note.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/tags/${encodeURIComponent(tag)}`} className="chip">
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
