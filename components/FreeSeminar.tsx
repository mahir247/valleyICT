"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import seminarImage from "@/images/seminar.jpg";
import { Calendar } from "lucide-react";
import SeminarFormModal from "./SeminarFormModal";
import ScrollAnimation from "./ScrollAnimation";

interface SeminarCardProps {
  title: string;
  date: string;
  description: string;
  onJoinClick: () => void;
  index?: number;
}

interface Seminar {
  title: string;
  date: string;
  description: string;
}

const SeminarCard = ({ title, date, description, onJoinClick, index = 0 }: SeminarCardProps) => {
  const formatDateTime = (date: string | Date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  const formatedDate = formatDateTime(date);
  return (
    <ScrollAnimation
      delay={index * 0.15}
      duration={0.6}
      direction="right"
    >
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Date */}
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Calendar size={18} />
            <span className="text-sm font-semibold">{formatedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>

          {/* Join Button */}
          <button
            onClick={onJoinClick}
            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Join Now
          </button>
        </div>
      </div>
      </div>
    </ScrollAnimation>
  );
};

const FreeSeminar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState("");
  const [seminars, setSeminar] = useState<Seminar[]>([]);

  useEffect(() => {
    const fetchSeminar = async () => {
      const response = await fetch("/api/seminars");
      const data = await response.json();
      setSeminar(data.data[0].seminars as Seminar[]);
    };
    fetchSeminar();
  }, []);


  const handleJoinClick = (seminarTitle: string) => {
    setSelectedSeminar(seminarTitle);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Join Our Free Seminars
          </h2>
          <p className="text-gray-600 text-lg">
            Enhance your skills with our free educational seminars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={seminarImage}
                alt="Free Seminar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Seminar Cards */}
          <div className="order-1 lg:order-2 space-y-6">
            {seminars.map((seminar, index) => (
              <SeminarCard
                key={index}
                title={seminar.title}
                date={seminar.date}
                description={seminar.description}
                onJoinClick={() => handleJoinClick(seminar.title)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <SeminarFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seminarTitle={selectedSeminar}
      />
    </section>
  );
};

export default FreeSeminar;

