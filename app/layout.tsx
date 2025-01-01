import type { Metadata } from "next";
import { Edu_AU_VIC_WA_NT_Hand } from "next/font/google";
import "./globals.css";

const font = Edu_AU_VIC_WA_NT_Hand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daisy Feeder 2",
  description: "Log Daisy's fattening habits, Mew! 🐾",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
