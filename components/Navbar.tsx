"use client";

import { Search, Phone, Mail, Facebook, Youtube, Linkedin, Instagram, Twitter, MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/courses", label: "Courses" },
    { href: "/results", label: "Results" },
    { href: "/certification", label: "Certification" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-gray-100 border-b border-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <a href="tel:+8801943665958" className="flex items-center gap-1 hover:text-purple-600 transition">
                <Phone size={14} />
                <span>+880 1943-665958</span>
              </a>
              <a href="mailto:valleyictbd24@gmail.com" className="flex items-center gap-1 hover:text-purple-600 transition">
                <Mail size={14} />
                <span>valleyictbd24@gmail.com</span>
              </a>
            </div>

            {/* Social Media & Login */}
            <div className="flex items-center gap-4">
              {/* Online Admission Button */}
              <div className="admission-button-wrapper animate-colorful-shadow">
                <Link
                  href="/courses/enroll"
                  className="admission-button"
                >
                  <span>Online Admission</span>
                </Link>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/share/1CFzBbGLtk/" 
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-700 transition" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-700 transition" aria-label="Pinterest">
                  <MessageCircleHeart size={18} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - খালি রাখা হয়েছে পরবর্তীতে ছবি বসানোর জন্য */}

            <div className="flex items-center">
              <Link href="/" className="flex items-center mr-1">
                <Image src={logo} alt="Logo" width={70} height={70} />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative font-medium transition-colors duration-300 ${isActive
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-purple-600"
                      }`}
                  >
                    <span className="relative inline-block pb-1">
                      {link.label}
                      {/* Underline Animation */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ease-in-out ${isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                          }`}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your Roll Number"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        router.push(`/results?roll=${value}`);
                      }
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Mobile Menu Button - Sidebar Toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <span className={`w-6 h-0.5 bg-gray-700 transition ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;