import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Psychoterapia Sandra Anczarska",
  description:
    "Prowadzę psychoterapię i wsparcie psychologiczne w Mysłowicach oraz online. Sandra Anczarska, psycholog i psychoterapeutka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${manrope.variable} ${plusJakartaSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
