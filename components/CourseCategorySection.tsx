import Link from "next/link";
import { ReactNode } from "react";

interface CourseCategorySectionProps {
  categoryName: string;
  children: ReactNode;
}

const CourseCategorySection = ({
  categoryName,
  children,
}: CourseCategorySectionProps) => {
  return (
    <div className="mb-12">
      {/* Category Title & See All Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-purple-600 mb-3">
            {categoryName}
          </h3>
          {/* Colorful Underline */}
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full"></div>
        </div>
        <Link href="/courses" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
          See All
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {children}
      </div>
    </div>
  );
};

export default CourseCategorySection;

