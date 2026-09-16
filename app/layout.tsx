import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Notes + Learn",
    template: "%s · Notes + Learn",
  },
  description: "Personal markdown notes and learning topics",
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <footer className="mx-auto max-w-3xl px-4 pb-10 text-center text-xs text-zinc-400 sm:px-6 dark:text-zinc-600">
          Markdown notes · no database · file-based CMS
        </footer>
      </body>
    </html>
  );
}
