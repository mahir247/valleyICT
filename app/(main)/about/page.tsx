import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Valley ICT - Bangladesh's premier IT training institute. Established to bridge the gap between education and industry demands, we provide top-tier technical education with expert instructors, modern labs, and career support.",
  keywords: [
    "About Valley ICT",
    "IT Institute Bangladesh",
    "Computer Training Center",
    "IT Education Bangladesh",
    "Valley ICT History",
    "IT Training Institute"
  ],
  openGraph: {
    title: "About Us - Valley ICT",
    description: "Learn about Valley ICT - Bangladesh's premier IT training institute. Expert instructors, modern labs, and career support since 1999.",
    url: "/about",
    images: [
      {
        url: "/about-header.png",
        width: 1200,
        height: 630,
        alt: "About Valley ICT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Valley ICT",
    description: "Learn about Valley ICT - Bangladesh's premier IT training institute. Expert instructors, modern labs, and career support.",
    images: ["/about-header.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[700px]">
                <Image
                    src="/about-header.png"
                    alt="Valley ICT Office environment"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Valley ICT</h2>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Welcome to <strong>Valley ICT</strong>, your premier destination for professional computer training and skill development.
                            Established to bridge the gap between education and industry demands, we pride ourselves on providing top-tier technical education to students and professionals alike.
                        </p>
                        <p>
                            At Valley ICT, we believe in practical, hands-on learning. Our state-of-the-art labs and experienced instructors ensure that every student gains real-world skills that are immediately applicable in the job market. Whether you are looking to master web development, graphic design, digital marketing, or basic computer literacy, we have a course tailored for you.
                        </p>
                        <p>
                            Our mission is to empower individuals through technology. We are committed to fostering a learning environment that is inclusive, innovative, and inspiring. Join us at Valley ICT and take the next step towards a successful career in the tech industry.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-700 mb-2">Expert Instructors</h3>
                            <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-700 mb-2">Modern Labs</h3>
                            <p className="text-gray-600">Practice in fully equipped computer labs with the latest software.</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-700 mb-2">Career Support</h3>
                            <p className="text-gray-600">Get guidance and support to land your dream job in IT.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
