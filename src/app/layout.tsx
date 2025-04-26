import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { SelectedLanguagesProvider } from "./providers";
import Head from "next/head";

const bricolageGrotesque = Luckiest_Guy({
  weight: ["400"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ragools.com"),
  title: {
    default: "Ragool Krishnan | Front-End Developer",
    template: "%s | Ragool Krishnan Portfolio",
  },
  applicationName: "Ragool Krishnan Portfolio",
  generator: "Next.js",
  authors: [{ name: "Ragool Krishnan", url: "https://www.ragools.com" }],
  creator: "Ragool Krishnan",
  description:
    "Innovative Front-End Engineer crafting high-performance, SEO-optimized React & Next.js applications with TypeScript and intuitive user experiences.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "SEO",
    "Ragool",
    "krishnan",
    "Ragool Krishnan",
    "Web Performance",
    "User Experience",
    "Portfolio",
  ],
  category: "Web Development Portfolio",
  formatDetection: {
    email: false,
    telephone: true,
    address: false,
    date: false,
  },

  referrer: "strict-origin-when-cross-origin",

  manifest: "/site.webmanifest",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification=YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "18e9832c5f364a9d",
    other: {
      "facebook-domain-verification": "YOUR_FACEBOOK_VERIFICATION_CODE",
    },
  },
  bookmarks: [
    "https://www.ragools.com",
    "https://github.com/loogark",
    "https://www.linkedin.com/in/ragool-krishnan",
  ],
  alternates: {
    canonical: "https://www.ragools.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    title: "Ragool Krishnan | Web Developer",
    description:
      "Innovative Web Developer crafting high-performance, SEO-optimized React & Next.js applications with TypeScript and intuitive user experiences.",
    url: "https://www.ragools.com",
    siteName: "Ragool Krishnan Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.ragools.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ragool Krishnan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragool Krishnan | Web Developer",
    description:
      "Innovative Web Developer crafting high-performance, SEO-optimized React & Next.js applications with TypeScript and intuitive user experiences.",
    site: "@your_twitter_handle",
    creator: "@your_twitter_handle",
    images: ["https://www.ragools.com/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <body
        className={`${bricolageGrotesque.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SelectedLanguagesProvider>{children}</SelectedLanguagesProvider>
        <div id="popup-root" />
      </body>
    </html>
  );
}
