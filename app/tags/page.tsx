import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Filter notes by tag.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-sm text-zinc-500">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link href={`/tags/${encodeURIComponent(tag)}`} className="chip text-sm !px-3 !py-1.5">
                #{tag}{" "}
                <span className="opacity-60">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
