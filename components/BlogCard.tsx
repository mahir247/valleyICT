"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface BlogCardProps {
  id: number;
  title: string;
  main_block: string;
  image_url: string;
  index?: number;
}

const BlogCard = ({ id, title, main_block, image_url, index = 0 }: BlogCardProps) => {
  return (
    <ScrollAnimation
      delay={index * 0.1}
      duration={0.6}
      direction="up"
      className="h-full"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
        <div className="relative h-56 w-full group overflow-hidden">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
              <Link href={`/blog/${id}`}>
                {title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {main_block}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link
              href={`/blog/${id}`}
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
            >
              Read Full Story
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default BlogCard;
