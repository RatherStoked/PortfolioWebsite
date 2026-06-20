import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Stokes",
  description: "Engineer + Designer + Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100 dark:bg-zinc-900 cursor-custom custom-scrollbar">
      <body className="bg-gray-100 dark:bg-zinc-900">{children}</body>
    </html>
  );
}
