import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your Result",
  description: "Check your exam results online at Valley ICT. Enter your roll number to view your exam results and certificate. Instant result verification available.",
  keywords: [
    "Exam Results",
    "Check Result",
    "Valley ICT Results",
    "IT Exam Results",
    "Online Result Check",
    "Result Verification"
  ],
  openGraph: {
    title: "Check Your Result - Valley ICT",
    description: "Check your exam results online at Valley ICT. Enter your roll number to view your exam results and certificate.",
    url: "/results",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Check Your Result - Valley ICT",
    description: "Check your exam results online at Valley ICT. Enter your roll number to view your results.",
  },
  alternates: {
    canonical: "/results",
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
