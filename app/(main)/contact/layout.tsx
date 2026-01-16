import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Valley ICT. Visit us at Khagdohor Bazar, Sadar, Mymensingh. Call us at +880 1943-665958 or email valleyictbd24@gmail.com. We read our emails every day.",
  keywords: [
    "Contact Valley ICT",
    "IT Institute Contact",
    "Valley ICT Address",
    "IT Training Contact",
    "Mymensingh IT Institute",
    "Valley ICT Phone Number"
  ],
  openGraph: {
    title: "Contact Us - Valley ICT",
    description: "Get in touch with Valley ICT. Visit us at Khagdohor Bazar, Sadar, Mymensingh. Call +880 1943-665958 or email valleyictbd24@gmail.com.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Valley ICT",
    description: "Get in touch with Valley ICT. Visit us at Khagdohor Bazar, Sadar, Mymensingh.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
