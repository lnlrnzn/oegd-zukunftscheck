import type { Metadata } from "next";
import { Sora, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÖGD Zukunftscheck — Wie zukunftsfähig ist Ihr Gesundheitsamt?",
  description:
    "Self-Assessment für Gesundheitsämter: Personaldaten einsehen, Digitalisierungsgrad prüfen, Handlungsempfehlungen erhalten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sora.variable} ${sourceSerif.variable}`}>
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
