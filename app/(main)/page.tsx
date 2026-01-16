import Hero from "@/components/Hero";
import CourseCategory from "@/components/CourseCategory";
import OurCourses from "@/components/OurCourses";
import FreeSeminar from "@/components/FreeSeminar";
import OurFeatures from "@/components/OurFeatures";
import Testimonials from "@/components/Testimonials";
import connectToDatabase from "@/app/lib/mongodb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Valley ICT - Bangladesh's premier IT training institute. We offer professional courses in Graphics Design, Web Development, Digital Marketing, Data Entry, and Freelancing. Expert instructors, modern labs, and career support since 1999.",
  openGraph: {
    title: "Valley ICT - Best IT Institute In Bangladesh Since 1999",
    description: "Professional IT training institute offering Graphics Design, Web Development, Digital Marketing, and Freelancing courses. Expert instructors, modern labs, and career support.",
    url: "/",
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
  },
  alternates: {
    canonical: "/",
  },
};

const Home = async () => {
  await connectToDatabase();

  return (
    <div>
      <Hero />
      <CourseCategory />
      <OurCourses />
      <FreeSeminar />
      <OurFeatures />
      <Testimonials />
    </div>
  )
}

export default Home
