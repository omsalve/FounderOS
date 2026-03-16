import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  // Expose as both names so old .font-heading classes and new --font-head var both work
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "FounderOS",
  description: "Turn goals into daily execution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable}`}
    >
      <head>
        {/*
          Wire --font-head to the same value as --font-heading so both
          the old components and new Quiet OS components resolve Bebas Neue.
        */}
        <style>{`
          :root { --font-head: var(--font-heading), 'Bebas Neue', system-ui, sans-serif; }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}