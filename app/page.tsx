import Link from "next/link";
import NoteCard from "@/components/NoteCard";
import { getAllNotes, getAllTags, getAllTopics } from "@/lib/notes";

export default function HomePage() {
  const notes = getAllNotes().slice(0, 8);
  const topics = getAllTopics();
  const tags = getAllTags();

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Notes<span className="text-amber-600 dark:text-amber-400">+</span>Learn
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Daily markdown notes, organized by topic and tags. Drop a file into{" "}
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            content/notes/
          </code>{" "}
          and it shows up here.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/notes"
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
          >
            Browse notes
          </Link>
          <Link
            href="/topics"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:border-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-amber-600"
          >
            Learning topics
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:border-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-amber-600"
          >
            Search
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Recent notes</h2>
          <Link
            href="/notes"
            className="text-sm text-amber-700 hover:underline dark:text-amber-400"
          >
            View all
          </Link>
        </div>
        {notes.length === 0 ? (
          <p className="text-sm text-zinc-500">No notes yet. Add a markdown file to get started.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Topics</h2>
          {topics.length === 0 ? (
            <p className="text-sm text-zinc-500">No topics yet.</p>
          ) : (
            <ul className="space-y-2">
              {topics.map(({ topic, count }) => (
                <li key={topic}>
                  <Link
                    href={`/topics/${encodeURIComponent(topic)}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-4 py-3 text-sm transition hover:border-amber-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-700/50"
                  >
                    <span className="font-medium">{topic}</span>
                    <span className="text-zinc-400">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Tags</h2>
          {tags.length === 0 ? (
            <p className="text-sm text-zinc-500">No tags yet.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <Link href={`/tags/${encodeURIComponent(tag)}`} className="chip">
                    #{tag} <span className="opacity-60">({count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
