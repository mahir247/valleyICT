import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import blogsData from '@/data/blogs.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return blogsData.map((blog) => ({
        id: blog.id.toString(),
    }));
}

export const dynamicParams = true; // Allow dynamic params if data changes

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const blogId = parseInt(id);
    const blog = blogsData.find((b) => b.id === blogId);

    if (!blog) {
        return {
            title: 'Blog Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valleyict.com';
    const blogUrl = `${siteUrl}/blog/${id}`;
    const description = blog.main_block.length > 160 
        ? blog.main_block.substring(0, 157) + '...' 
        : blog.main_block;

    return {
        title: blog.title,
        description: description,
        keywords: [
            blog.title,
            "IT Blog",
            "Technology Blog",
            "Tech News",
            "Valley ICT Blog"
        ],
        openGraph: {
            title: blog.title,
            description: description,
            url: blogUrl,
            type: 'article',
            images: [
                {
                    url: blog.image_url,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
            siteName: 'Valley ICT',
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: description,
            images: [blog.image_url],
        },
        alternates: {
            canonical: `/blog/${id}`,
        },
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;
    const blogId = parseInt(id);
    const blog = blogsData.find((b) => b.id === blogId);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Image Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src={blog.image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Blogs
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 mt-6 text-white/90 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>By Admin</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>Oct 24, 2024</span> {/* Static date as placeholder since not in JSON */}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>
            </div>

            <article className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
                    {/* Main Block - Highlighted */}
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 md:p-8 rounded-r-xl mb-10 not-prose">
                        <p className="text-xl md:text-2xl font-medium text-purple-900 italic leading-relaxed">
                            "{blog.main_block}"
                        </p>
                    </div>

                    {/* Full Text */}
                    <div className="whitespace-pre-line leading-loose text-gray-800">
                        {blog.full_text}
                    </div>
                </div>

                {/* Share / Tags Section (Placeholder) */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-200 cursor-pointer transition">
                        #Technology
                    </span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-200 cursor-pointer transition">
                        #Innovation
                    </span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-200 cursor-pointer transition">
                        #Future
                    </span>
                </div>
            </article>
        </div>
    );
}
