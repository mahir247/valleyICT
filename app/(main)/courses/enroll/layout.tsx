import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Enrollment",
  description: "Enroll in Valley ICT courses today! Fill out the enrollment form with your information. We offer both Offline (On-Campus) and Online (Live Class) courses. Expert instructors, hands-on training, and job placement assistance.",
  keywords: [
    "Course Enrollment",
    "Enroll in IT Course",
    "Valley ICT Enrollment",
    "IT Course Registration",
    "Online Course Enrollment",
    "Offline Course Enrollment"
  ],
  openGraph: {
    title: "Course Enrollment - Valley ICT",
    description: "Enroll in Valley ICT courses today! Fill out the enrollment form. We offer both Offline (On-Campus) and Online (Live Class) courses.",
    url: "/courses/enroll",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Course Enrollment - Valley ICT",
    description: "Enroll in Valley ICT courses today! Fill out the enrollment form for Offline or Online courses.",
  },
  alternates: {
    canonical: "/courses/enroll",
  },
};

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
