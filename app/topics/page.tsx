import type { Metadata } from "next";
import Link from "next/link";
import { getAllTopics } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Learning topics",
};

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Learning topics</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Group notes by topic and review them one by one.
        </p>
      </header>

      {topics.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Add a <code className="text-xs">topic</code> field in frontmatter to see topics here.
        </p>
      ) : (
        <ul className="grid gap-3">
          {topics.map(({ topic, count }) => (
            <li key={topic} className="card !p-0 overflow-hidden">
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href={`/topics/${encodeURIComponent(topic)}`}
                    className="text-lg font-semibold hover:text-amber-700 dark:hover:text-amber-400"
                  >
                    {topic}
                  </Link>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {count} note{count === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/topics/${encodeURIComponent(topic)}`}
                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700"
                  >
                    View notes
                  </Link>
                  <Link
                    href={`/topics/${encodeURIComponent(topic)}/review`}
                    className="rounded-full bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-500 dark:bg-amber-500 dark:text-zinc-950"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
