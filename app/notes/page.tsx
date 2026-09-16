import type { Metadata } from "next";
import NoteCard from "@/components/NoteCard";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "All notes",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">All notes</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {notes.length} note{notes.length === 1 ? "" : "s"}, newest first
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
