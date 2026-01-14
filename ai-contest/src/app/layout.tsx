import type { Metadata } from "next";
import "@fontsource/inter/300.css"; // Light
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/600.css"; // Semi-bold
import "@fontsource/inter/700.css"; // Bold
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Code Review Dashboard",
  description: "Track and manage code reviews efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans">
        <main className="container mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}
