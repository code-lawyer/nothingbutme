import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getProfile } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const profile = getProfile();
  return {
    title: profile.name,
    description: profile.identityTags || profile.intro || "个人网站",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
