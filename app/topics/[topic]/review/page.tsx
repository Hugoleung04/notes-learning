import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewClient from "@/components/ReviewClient";
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
  return { title: `Review · ${topic}` };
}

export default async function TopicReviewPage({ params }: Props) {
  const { topic: raw } = await params;
  const topic = slugToTopic(raw);
  const notes = getNotesByTopic(topic);

  if (notes.length === 0) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/topics" className="hover:text-amber-700 dark:hover:text-amber-400">
            Topics
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={`/topics/${encodeURIComponent(topic)}`}
            className="hover:text-amber-700 dark:hover:text-amber-400"
          >
            {topic}
          </Link>
          <span aria-hidden> / </span>
          <span>Review</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Review: {topic}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Cycle through notes in this topic. Open any card for the full markdown.
        </p>
      </header>

      <ReviewClient topic={topic} notes={notes} />
    </div>
  );
}
