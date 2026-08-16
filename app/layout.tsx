import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";
import ConditionalHeader from "@/components/shared/ConditionalHeader";
import ConditionalFooter from "@/components/shared/ConditionalFooter";
import { Toaster } from "react-hot-toast";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "NGEN IT — AI Services | Practical AI Solutions for Business and Industry",
    template: "%s | NGEN IT",
  },
  description:
    "NGEN IT helps organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
  keywords: [
    "AI Services",
    "Artificial Intelligence",
    "Business AI",
    "AI Consulting",
    "Generative AI",
    "Industrial AI",
    "Machine Learning",
    "Automation",
    "Computer Vision",
    "AI Solutions",
  ],
  authors: [{ name: "NGEN IT LIMITED" }],
  creator: "NGEN IT LIMITED",
  publisher: "NGEN IT LIMITED",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ngenitltd.com",
    title: "NGEN IT — AI Services | Practical AI Solutions for Business and Industry",
    description:
      "NGEN IT helps organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
    siteName: "NGEN IT",
    images: [
      {
        url: "https://ngenitltd.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NGEN IT AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NGEN IT — AI Services | Practical AI Solutions for Business and Industry",
    description:
      "NGEN IT helps organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
    images: ["https://ngenitltd.com/og-image.jpg"],
    creator: "@ngenit",
    site: "@ngenit",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#00C2CB",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#0D1B3E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NGEN IT",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ngenitltd.com",
    languages: {
      "en-US": "https://ngenitltd.com",
    },
  },
  category: "technology",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0D1B3E" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1B3E" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ConditionalHeader />
        <main>{children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
              },
              success: {
                duration: 5000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 6000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </main>
        <ConditionalFooter />
        <FloatingButtons />
      </body>
    </html>
  );
}