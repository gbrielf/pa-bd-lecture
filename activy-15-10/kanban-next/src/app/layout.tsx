import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { MenuBar } from "@/components/MenuBar/MenuBar";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        className={`${montserrat.variable} montserrat antialiased`}
      >
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
