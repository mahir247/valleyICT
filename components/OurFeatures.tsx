"use client";

import { Headphones, Users, Award, BookOpen } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

const FeatureCard = ({ icon, title, description, index = 0 }: FeatureCardProps) => {
  return (
    <ScrollAnimation
      delay={index * 0.1}
      duration={0.5}
      direction="up"
    >
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </ScrollAnimation>
  );
};

const OurFeatures = () => {
  const features = [
    {
      icon: <Headphones className="text-purple-600" size={32} />,
      title: "24/7 Support",
      description: "Get round-the-clock assistance from our dedicated support team. We're always here to help you succeed in your learning journey.",
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience. Our instructors are committed to your success and growth.",
    },
    {
      icon: <Award className="text-purple-600" size={32} />,
      title: "Certified Courses",
      description: "Receive recognized certificates upon completion. Boost your career with credentials that matter in the job market.",
    },
    {
      icon: <BookOpen className="text-purple-600" size={32} />,
      title: "Comprehensive Curriculum",
      description: "Access well-structured courses covering all essential topics. Learn at your own pace with lifetime access to materials.",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Features
          </h2>
          <p className="text-gray-600 text-lg">
            Why choose us for your learning journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;

