import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MenuBar } from "@/components/MenuBar/MenuBar";
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
  title: "Kanban Board - Next.js",
  description: "Sistema de gerenciamento de tarefas estilo Kanban",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
