import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoteCard from "@/components/NoteCard";
import { getAllTags, getNotesByTag } from "@/lib/notes";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  return { title: `#${tag}` };
}

export default async function TagDetailPage({ params }: Props) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  const notes = getNotesByTag(tag);

  if (notes.length === 0) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/tags" className="hover:text-amber-700 dark:hover:text-amber-400">
            Tags
          </Link>
          <span aria-hidden> / </span>
          <span>#{tag}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">#{tag}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {notes.length} note{notes.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
