import CourseCard from "@/components/CourseCard";
import data from "@/data/courses.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const categoryId = parseInt(id);
    const category = data.find((c) => c.id === categoryId);

    if (!category) {
        return {
            title: 'Category Not Found',
            description: 'The requested course category could not be found.',
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valleyict.com';
    const categoryUrl = `${siteUrl}/courses/${id}`;
    const description = `Explore our professional courses in ${category.category}. Expert instructors, hands-on training, and career support.`;

    return {
        title: `${category.category} Courses`,
        description: description,
        keywords: [
            category.category,
            `${category.category} Course Bangladesh`,
            "IT Training",
            "Professional Courses",
            "Valley ICT"
        ],
        openGraph: {
            title: `${category.category} Courses - Valley ICT`,
            description: description,
            url: categoryUrl,
            type: 'website',
            images: [
                {
                    url: category.imageSrc ? `/${category.imageSrc}` : '/images/hero.png',
                    width: 1200,
                    height: 630,
                    alt: `${category.category} Courses`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category.category} Courses - Valley ICT`,
            description: description,
            images: [category.imageSrc ? `/${category.imageSrc}` : '/images/hero.png'],
        },
        alternates: {
            canonical: `/courses/${id}`,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { id } = await params;
    const categoryId = parseInt(id);

    const category = data.find((c) => c.id === categoryId);

    if (!category) {
        notFound();
    }

    return (
        <main className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {category.category}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our professional courses in {category.category}.
                    </p>
                </div>

                {/* Courses Grid */}
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
            </div>
        </main>
    );
}
