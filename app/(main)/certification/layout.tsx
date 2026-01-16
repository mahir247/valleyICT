import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description: "Verify your Valley ICT certificate online. Enter your name, roll number, or registration number to view and verify your certificate. Check certificate authenticity instantly.",
  keywords: [
    "Certificate Verification",
    "Verify Certificate",
    "Valley ICT Certificate",
    "IT Certificate Check",
    "Online Certificate Verification",
    "Certificate Search"
  ],
  openGraph: {
    title: "Certificate Verification - Valley ICT",
    description: "Verify your Valley ICT certificate online. Enter your name, roll number, or registration number to view and verify your certificate.",
    url: "/certification",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Certificate Verification - Valley ICT",
    description: "Verify your Valley ICT certificate online. Enter your details to view and verify your certificate.",
  },
  alternates: {
    canonical: "/certification",
  },
};

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
