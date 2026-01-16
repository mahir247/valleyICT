"use client";

import { User } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

interface TestimonialCardProps {
  name: string;
  comment: string;
  index?: number;
}

const TestimonialCard = ({ name, comment, index = 0 }: TestimonialCardProps) => {
  return (
    <ScrollAnimation
      delay={index * 0.1}
      duration={0.5}
      direction="up"
    >
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="text-gray-500" size={32} />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
        {name}
      </h3>

      {/* Comment */}
      <p className="text-gray-600 text-sm leading-relaxed text-center">
        {comment}
      </p>
      </div>
    </ScrollAnimation>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "রহিম উদ্দিন",
      comment: "এই কোর্সটি আমার জন্য খুবই উপকারী হয়েছে। শিক্ষকরা খুব ভালোভাবে শিখিয়েছেন এবং সবকিছু সহজভাবে বুঝিয়েছেন। আমি এখন গ্রাফিক্স ডিজাইনে কাজ করতে পারছি।",
    },
    {
      name: "ফাতেমা খাতুন",
      comment: "আমি ফ্রিল্যান্সিং কোর্সটি করেছি এবং এখন আমি অনলাইনে কাজ করছি। কোর্সের ম্যাটেরিয়ালগুলো খুবই ভালো এবং ব্যবহারিক। আমি সবাইকে এই কোর্স করার পরামর্শ দেব।",
    },
    {
      name: "করিম আহমেদ",
      comment: "ওয়েব ডেভেলপমেন্ট কোর্সটি করার পর আমি এখন একটি ভালো চাকরি পেয়েছি। কোর্সের কন্টেন্ট খুবই আপডেটেড এবং বাস্তব জীবনের সাথে সম্পর্কিত।",
    },
    {
      name: "আয়েশা বেগম",
      comment: "ডিজিটাল মার্কেটিং কোর্সটি আমার ব্যবসায় অনেক সাহায্য করেছে। আমি এখন নিজের ব্যবসার জন্য মার্কেটিং করতে পারছি। শিক্ষকরা খুবই সহায়ক ছিলেন।",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our successful students
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              comment={testimonial.comment}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

