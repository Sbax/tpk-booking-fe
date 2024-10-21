import { Header } from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prenotazioni | TPK! 2024",
  description: "Prenotazioni per Total Party Kon 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-4 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
