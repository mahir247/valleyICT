"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import courseCardImage from "@/public/courseCard1.png";
import ScrollAnimation from "./ScrollAnimation";

interface CourseCardProps {
  id: number;
  title: string;
  duration?: string;
  rating?: number;
  reviews?: number;
  students?: number;
  originalPrice?: string;
  discount?: number;
  discountedPrice?: string;
  imageSrc?: string | StaticImageData;
  index?: number;
}

const CourseCard = ({
  id,
  title,
  duration = "30 Hours",
  rating = 4,
  reviews = 498,
  students = 1985,
  originalPrice = "৳15,000",
  discount = 50,
  discountedPrice = "৳7,500",
  imageSrc,
  index = 0,
}: CourseCardProps) => {
  // Default image from images folder
  const cardImage = imageSrc || courseCardImage;

  return (
    <ScrollAnimation
      delay={index * 0.1}
      duration={0.6}
      direction="up"
      className="h-full"
    >
      <div className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link href={`/courses/details/${id}`}>
        {/* Top Section - Gradient Background with Image */}
        <div className="relative h-48 bg-gradient-to-b from-blue-700 to-blue-400 overflow-hidden shrink-0">
          {/* Background Image */}
          <Image
            src={cardImage}
            alt={title}
            fill
            className="object-cover opacity-100 group-hover:scale-110 transition-all duration-300"
          />

          {/* Decorative Icons */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Course Details */}
        <div className="flex flex-col grow p-6">
          {/* Duration */}
          <p className="text-red-600 text-sm font-medium mb-2">
            Duration: {duration}
          </p>

          {/* Course Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h4>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {reviews} Reviews
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {students.toLocaleString()} Students
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-gray-400 text-sm line-through">
                {originalPrice}
              </p>
              <p className="text-red-600 text-sm font-semibold">
                {discount}% off
              </p>
              <p className="text-gray-900 text-2xl font-bold">
                {discountedPrice}
              </p>
            </div>

            {/* Enroll Button */}
            <Link
              href="/courses/enroll"
              className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 border border-purple-700"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </Link>
      </div>
    </ScrollAnimation>
  );
};

export default CourseCard;

