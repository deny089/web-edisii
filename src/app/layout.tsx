import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Crimson_Text } from "next/font/google";
import { cn } from "@/lib/utils";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "EDISII",
  description: "Art print publisher company profile website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", crimsonText.variable)}>
      <body className="overflow-x-hidden font-sans antialiased">{children}</body>
    </html>
  );
}
