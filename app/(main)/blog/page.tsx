import React from 'react';
import blogsData from '@/data/blogs.json';
import BlogCard from '@/components/BlogCard';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Stay updated with the latest trends in technology, education, and career development. Read our expert articles on AI, Blockchain, Web Development, Digital Marketing, and more.',
    keywords: [
        "IT Blog Bangladesh",
        "Technology Blog",
        "IT News",
        "Tech Articles",
        "Career Development",
        "IT Education Blog",
        "Technology Trends"
    ],
    openGraph: {
        title: 'Blog - Valley ICT',
        description: 'Stay updated with the latest trends in technology, education, and career development. Read our expert articles on AI, Blockchain, Web Development, and more.',
        url: '/blog',
        images: [
            {
                url: '/images/hero.png',
                width: 1200,
                height: 630,
                alt: 'Valley ICT Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog - Valley ICT',
        description: 'Stay updated with the latest trends in technology, education, and career development.',
        images: ['/images/hero.png'],
    },
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Latest <span className="text-purple-600">Blogs</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest trends in technology, education, and career development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogsData.map((blog, index) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            main_block={blog.main_block}
                            image_url={blog.image_url}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
