import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel - Valley ICT",
  description: "Admin panel for managing Valley ICT website",
};

import BodyCleanup from '@/components/BodyCleanup';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {/* Client cleanup runs after mount to remove attributes injected by browser extensions */}
        <BodyCleanup />
        {children}
      </body>
    </html>
  );
}
