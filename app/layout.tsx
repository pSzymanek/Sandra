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

const siteUrl = "https://sandra-ten.vercel.app";
const siteTitle = "Sandra Anczarska | Psychoterapia Mysłowice";
const siteDescription =
  "Psychoterapia i wsparcie psychologiczne w Mysłowicach oraz online. Sandra Anczarska, psycholog i psychoterapeutka Gestalt w procesie szkolenia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sandra Anczarska",
  },
  description: siteDescription,
  applicationName: "Psychoterapia Sandra Anczarska",
  keywords: [
    "Sandra Anczarska",
    "psychoterapia Mysłowice",
    "psycholog Mysłowice",
    "psychoterapeutka Gestalt",
    "konsultacja psychologiczna",
    "psychoterapia online",
  ],
  authors: [{ name: "Sandra Anczarska" }],
  creator: "Sandra Anczarska",
  publisher: "Sandra Anczarska",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName: "Psychoterapia Sandra Anczarska",
    images: [
      {
        url: "/images/sandra-anczarska.jpg",
        width: 528,
        height: 530,
        alt: "Portret Sandry Anczarskiej, psycholog i psychoterapeutki w Mysłowicach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/sandra-anczarska.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
