import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { getAllSlugs, getNoteBySlug } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note not found" };
  return { title: note.title, description: note.excerpt };
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/notes" className="hover:text-amber-700 dark:hover:text-amber-400">
            Notes
          </Link>
          <span aria-hidden>/</span>
          <time dateTime={note.date}>{note.date}</time>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {note.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {note.topic && (
            <Link
              href={`/topics/${encodeURIComponent(note.topic)}`}
              className="chip chip-active"
            >
              {note.topic}
            </Link>
          )}
          {note.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="chip"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <Markdown content={note.content} />
    </article>
  );
}
