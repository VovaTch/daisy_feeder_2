import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body className={`${font.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
