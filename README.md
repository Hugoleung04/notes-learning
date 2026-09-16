# Notes + Learn

Personal markdown notes and learning app. Daily notes are files; topics and tags come from frontmatter. No database, no auth.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · gray-matter · react-markdown

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

## Add a daily note

1. Create a file under `content/notes/` using this name pattern:

   ```text
   content/notes/YYYY-MM-DD-slug.md
   ```

   Example: `content/notes/2026-09-17-morning-ideas.md`

2. Use this frontmatter schema:

   ```yaml
   ---
   title: Your note title
   date: YYYY-MM-DD
   tags:
     - tag-one
     - tag-two
   topic: Optional Topic Name
   ---
   ```

   | Field   | Type       | Required | Notes                          |
   |---------|------------|----------|--------------------------------|
   | `title` | string     | yes      | Display title                  |
   | `date`  | YYYY-MM-DD | yes      | Sort / filter key              |
   | `tags`  | string[]   | yes*     | Can be empty `[]`              |
   | `topic` | string     | no       | Groups notes for Learn/Review  |

3. Write the body in Markdown below the frontmatter. Restart or refresh the app — notes are read from disk at build/request time.

## Features

- Home: recent notes + topic & tag lists
- Note detail with readable typography
- Browse / filter by tag and topic
- Client-side search over titles, excerpts, tags, topics
- Learning view + simple review cycle per topic
- Dark mode (system preference + toggle)

## Deploy on Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com)
2. Framework preset: **Next.js** (defaults are fine)
3. Deploy — no env vars required

After deploy, push new markdown files to `content/notes/` and Vercel will rebuild.

## Project layout

```text
app/                 # App Router pages
components/          # UI (header, cards, search, review, markdown)
content/notes/       # Markdown notes (CMS)
lib/notes.ts         # Load & parse notes from disk
```
