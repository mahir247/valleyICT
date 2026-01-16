import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://valleyict.com'),
  title: {
    default: "Valley ICT - Best IT Institute In Bangladesh Since 1999",
    template: "%s | Valley ICT"
  },
  description: "Valley ICT is Bangladesh's premier IT training institute providing professional courses in Graphics Design, Web Development, Digital Marketing, Data Entry, and Freelancing since 1999. Join us for expert-led training and career support.",
  keywords: [
    "IT Institute Bangladesh",
    "Computer Training Bangladesh",
    "Graphics Design Course",
    "Web Development Course",
    "Digital Marketing Course",
    "Freelancing Training",
    "IT Training Mymensingh",
    "Valley ICT",
    "Best IT Institute",
    "Professional IT Courses"
  ],
  authors: [{ name: "Valley ICT" }],
  creator: "Valley ICT",
  publisher: "Valley ICT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Valley ICT",
    title: "Valley ICT - Best IT Institute In Bangladesh Since 1999",
    description: "Professional IT training institute offering Graphics Design, Web Development, Digital Marketing, and Freelancing courses. Expert instructors, modern labs, and career support.",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Valley ICT - Best IT Institute In Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valley ICT - Best IT Institute In Bangladesh Since 1999",
    description: "Professional IT training institute offering Graphics Design, Web Development, Digital Marketing, and Freelancing courses.",
    images: ["/images/hero.png"],
    creator: "@valleyict",
  },
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
