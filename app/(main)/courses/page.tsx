import CourseCard from "@/components/CourseCard";
import data from "@/data/courses.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Browse our extensive collection of professional IT courses including Graphics Design, Web Development, Digital Marketing, Data Entry, and Freelancing. Start your learning journey today with expert instructors and modern labs.",
  keywords: [
    "IT Courses Bangladesh",
    "Graphics Design Course",
    "Web Development Course",
    "Digital Marketing Course",
    "Data Entry Course",
    "Freelancing Course",
    "Professional IT Training",
    "Online IT Courses"
  ],
  openGraph: {
    title: "All Courses - Valley ICT",
    description: "Browse our extensive collection of professional IT courses. Graphics Design, Web Development, Digital Marketing, Data Entry, and Freelancing courses available.",
    url: "/courses",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Valley ICT Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Courses - Valley ICT",
    description: "Browse our extensive collection of professional IT courses. Graphics Design, Web Development, Digital Marketing, and more.",
    images: ["/images/hero.png"],
  },
  alternates: {
    canonical: "/courses",
  },
};

const CoursesPage = () => {
    return (
        <main className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        All Courses
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse our extensive collection of courses across various categories.
                        Start your learning journey today.
                    </p>
                </div>

                {/* Course Categories */}
                <div className="space-y-16">
                    {data.map((category) => (
                        <section key={category.id}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-8 w-1.5 bg-purple-600 rounded-full"></div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {category.category}
                                </h2>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6">
                                {category.courses.map((course, courseIndex) => (
                                    <div key={course.id} className="w-full sm:w-[350px]">
                                        <CourseCard
                                            id={course.id}
                                            title={course.title}
                                            imageSrc={course.imageSrc ? `/${course.imageSrc}` : undefined}
                                            duration={course.duration}
                                            rating={course.rating}
                                            reviews={course.reviews}
                                            students={course.students}
                                            originalPrice={course.originalPrice}
                                            discount={course.discount}
                                            discountedPrice={course.discountedPrice}
                                            index={courseIndex}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CoursesPage;
