import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const crimsonText = localFont({
  src: [
    {
      path: "../fonts/CrimsonText-Regular-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CrimsonText-Semibold-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/CrimsonText-Bold-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EDISII",
  description: "Art print publisher company profile website.",
  icons: {
    icon: "/assets/favicon-edisii.jpg.jpeg",
    shortcut: "/assets/favicon-edisii.jpg.jpeg",
    apple: "/assets/favicon-edisii.jpg.jpeg",
  },
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
