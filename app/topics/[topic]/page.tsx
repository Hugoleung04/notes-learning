import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoteCard from "@/components/NoteCard";
import { getAllTopics, getNotesByTopic, slugToTopic } from "@/lib/notes";

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return getAllTopics().map(({ topic }) => ({
    topic: encodeURIComponent(topic),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: raw } = await params;
  const topic = slugToTopic(raw);
  return { title: topic };
}

export default async function TopicDetailPage({ params }: Props) {
  const { topic: raw } = await params;
  const topic = slugToTopic(raw);
  const notes = getNotesByTopic(topic);

  if (notes.length === 0) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/topics" className="hover:text-amber-700 dark:hover:text-amber-400">
            Topics
          </Link>
          <span aria-hidden> / </span>
          <span>{topic}</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{topic}</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {notes.length} note{notes.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href={`/topics/${encodeURIComponent(topic)}/review`}
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 dark:bg-amber-500 dark:text-zinc-950"
          >
            Start review
          </Link>
        </div>
      </header>

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
