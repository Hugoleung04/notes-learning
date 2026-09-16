import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteFrontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  topic?: string;
};

export type NoteMeta = NoteFrontmatter & {
  slug: string;
  excerpt: string;
};

export type Note = NoteMeta & {
  content: string;
};

function ensureNotesDir(): void {
  if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR, { recursive: true });
  }
}

function excerptFromContent(content: string, max = 160): string {
  const plain = content
    .replace(/^#+\s+.*/gm, "")
    .replace(/[`*_>~\[\]()]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).trimEnd() + "…";
}

function parseNoteFile(filename: string): Note {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const title = typeof data.title === "string" ? data.title : slug;
  const date =
    typeof data.date === "string"
      ? data.date
      : data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : "1970-01-01";
  const tags = Array.isArray(data.tags)
    ? data.tags.map(String)
    : typeof data.tags === "string"
      ? [data.tags]
      : [];
  const topic =
    typeof data.topic === "string" && data.topic.trim()
      ? data.topic.trim()
      : undefined;

  return {
    slug,
    title,
    date,
    tags,
    topic,
    excerpt: excerptFromContent(content),
    content,
  };
}

export function getAllNotes(): NoteMeta[] {
  ensureNotesDir();
  const files = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"));

  return files
    .map((f) => {
      const note = parseNoteFile(f);
      const { content: _c, ...meta } = note;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getNoteBySlug(slug: string): Note | null {
  ensureNotesDir();
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseNoteFile(`${slug}.md`);
}

export function getAllSlugs(): string[] {
  return getAllNotes().map((n) => n.slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const note of getAllNotes()) {
    for (const tag of note.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getAllTopics(): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const note of getAllNotes()) {
    if (!note.topic) continue;
    counts.set(note.topic, (counts.get(note.topic) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
}

export function getNotesByTag(tag: string): NoteMeta[] {
  return getAllNotes().filter((n) =>
    n.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getNotesByTopic(topic: string): NoteMeta[] {
  return getAllNotes().filter(
    (n) => n.topic && n.topic.toLowerCase() === topic.toLowerCase()
  );
}

export function topicToSlug(topic: string): string {
  return encodeURIComponent(topic);
}

export function slugToTopic(slug: string): string {
  return decodeURIComponent(slug);
}
