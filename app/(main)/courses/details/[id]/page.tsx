import Image from "next/image";
import Link from "next/link";
import data from "@/data/courses.json";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

// Helper function to find a course by ID and include category
const getCourse = (id: string) => {
    const courseId = parseInt(id);
    if (isNaN(courseId)) return null;

    for (const category of data) {
        const course = category.courses.find((c) => c.id === courseId);
        if (course) {
            return {
                ...course,
                category: category.category
            };
        }
    }
    return null;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const course = getCourse(id);

    if (!course) {
        return {
            title: 'Course Not Found',
            description: 'The requested course could not be found.',
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valleyict.com';
    const courseUrl = `${siteUrl}/courses/details/${id}`;
    
    // Create description from course detail (first 160 characters)
    let description = `Learn ${course.title} at Valley ICT. Duration: ${course.duration}. Expert instructors, hands-on training, and career support.`;
    if (course.detail) {
        const plainText = course.detail.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim();
        if (plainText.length > 0) {
            description = plainText.length > 160 ? plainText.substring(0, 157) + '...' : plainText;
        }
    }

    const imageSrc = course.imageSrc ? `/${course.imageSrc}` : '/images/hero.png';

    return {
        title: course.title,
        description: description,
        keywords: [
            course.title,
            `${course.title} Course`,
            course.category,
            "IT Training",
            "Professional Course",
            "Valley ICT",
            course.duration
        ],
        openGraph: {
            title: `${course.title} - Valley ICT`,
            description: description,
            url: courseUrl,
            type: 'website',
            images: [
                {
                    url: imageSrc,
                    width: 1200,
                    height: 630,
                    alt: course.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${course.title} - Valley ICT`,
            description: description,
            images: [imageSrc],
        },
        alternates: {
            canonical: `/courses/details/${id}`,
        },
    };
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = getCourse(id);

    if (!course) {
        return notFound();
    }

    const imageSrc = `/${course.imageSrc}`;
    console.log(imageSrc);

    return (
        <main className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <div className="container mx-auto px-4 py-12">

                {/* --------------------------------------------------------------------------------
                   TOP SECTION
                   Left: Title & Stats
                   Right: Course Image Banner
                -------------------------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Side: Title & Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                            {course.title}
                        </h1>

                        <div className="flex flex-wrap gap-4">
                            {/* Stat Card 1: Duration */}
                            <div className="border border-gray-200 rounded-2xl p-4 min-w-[100px] text-center">
                                <p className="text-gray-500 text-sm mb-1">Duration</p>
                                <p className="font-bold text-gray-900 text-lg">{course.duration}</p>
                            </div>
                            {/* Stat Card 2: Lectures (Placeholder) */}
                            <div className="border border-gray-200 rounded-2xl p-4 min-w-[100px] text-center">
                                <p className="text-gray-500 text-sm mb-1">Lectures</p>
                                <p className="font-bold text-gray-900 text-lg">90</p>
                            </div>
                            {/* Stat Card 3: Projects (Placeholder) */}
                            <div className="border border-gray-200 rounded-2xl p-4 min-w-[100px] text-center">
                                <p className="text-gray-500 text-sm mb-1">Projects</p>
                                <p className="font-bold text-gray-900 text-lg">5</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image Banner */}
                    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                            src={imageSrc}
                            alt={course.title}
                            placeholder="blur"
                            blurDataURL={imageSrc}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* --------------------------------------------------------------------------------
                   BOTTOM SECTION
                   Left: Description
                   Right: Admission Sidebar
                -------------------------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: Course Description */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Description</h3>
                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify">
                                <ReactMarkdown
    components={{
      h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-gray-900 my-4" {...props} />,
      h2: ({node, ...props}) => <h2 className="text-3xl font-semibold text-gray-900 my-3" {...props} />,
      h3: ({node, ...props}) => <h3 className="text-2xl font-medium text-gray-800 my-2" {...props} />,
      p: ({node, ...props}) => <p className="mb-4" {...props} />,
      li: ({node, ...props}) => <li className="ml-5 list-disc mb-2" {...props} />,
      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
      em: ({node, ...props}) => <em className="italic" {...props} />,
    }}
  >
    {course.detail}
  </ReactMarkdown>
                            </div>
                        </div>

                        {/* Requirements (Moved here since modules are gone, to fill space) */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                    No prior experience required (for beginner courses)
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                    A computer with internet access
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                    Passion for learning and dedication
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Admission Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-purple-50 rounded-3xl p-8 sticky top-8 border border-purple-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Admission Is Going On
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Enroll now to any of our Offline (On-Campus) or Online (Live Class) courses as per your suitable time.
                            </p>

                            <div className="text-center mb-8">
                                <p className="text-gray-500 font-medium text-lg uppercase tracking-wide">Course Fee</p>
                                <div className="flex items-center justify-center gap-3 mt-2">
                                    <h3 className="text-4xl font-extrabold text-gray-900">BDT {course.discountedPrice}</h3>
                                    <span className="text-lg text-gray-400 line-through font-medium">{course.originalPrice}</span>
                                </div>
                                <span className="inline-block mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                    {course.discount}% OFF
                                </span>
                            </div>

                            <Link
                                href="/courses/enroll"
                                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-200 transform hover:-translate-y-1"
                            >
                                Enroll Now
                            </Link>

                            <div className="mt-8 space-y-4 pt-8 border-t border-purple-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-semibold text-gray-900">{course.duration}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Lectures</span>
                                    <span className="font-semibold text-gray-900">90</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Certificate</span>
                                    <span className="font-semibold text-gray-900">Yes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
