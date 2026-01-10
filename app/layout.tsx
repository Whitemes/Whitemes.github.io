import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johnny Ramananjatovo | Full-Stack Developer & DevOps",
  description: "Immersive 3D portfolio showcasing full-stack projects, AI pipelines, and production-grade architectures. Built with Next.js, React Three Fiber, and TypeScript.",
  keywords: ["Portfolio", "Full-Stack Developer", "DevOps", "3D Portfolio", "React Three Fiber", "Next.js"],
  authors: [{ name: "Johnny Ramananjatovo" }],
  openGraph: {
    title: "Johnny Ramananjatovo | Portfolio",
    description: "Full-Stack Developer & DevOps engineer crafting elegant solutions",
    type: "website",
  },
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
      </body>
    </html>
  );
}
