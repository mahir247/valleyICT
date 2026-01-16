import CourseCategoryCard from "./CourseCategoryCard";
import i from "@/public/GD.jpg"

import data from "@/data/courses.json";
const CourseCategory = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Course Category
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Explore our popular course categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {
            data.map((course, index) => (
              <CourseCategoryCard
                key={course.id}
                id={course.id}
                title={course.category}
                imageSrc={course.imageSrc}
                alt={course.category}
                index={index}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CourseCategory;
