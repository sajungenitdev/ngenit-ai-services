import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/shared/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "NGEN IT — AI Services | Practical AI Solutions for Business and Industry",
  description:
    "NGEN IT helps organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}