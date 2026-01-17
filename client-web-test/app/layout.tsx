import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpiraledgeChatWidget } from "@/components/widget-nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tend - Farm Management Software",
  description: "The Leading Farm Management Software for Modern Growers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpiraledgeChatWidget
          apiUrl="https://crm-api-staging.spiraledge.com"
          widgetId="9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88"
          pusherKey="64b7865cd83eddfb95c1"
          pusherCluster="mt1"
        />
      </body>
    </html>
  );
}
