import type { Metadata } from "next";
import { Edu_AU_VIC_WA_NT_Hand, Lilita_One } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
