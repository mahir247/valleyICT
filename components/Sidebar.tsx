"use client";

import { X, Phone, Mail, Facebook, Youtube, Linkedin, Instagram, Twitter, MessageCircleHeart, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
      {/* Overlay with Blur */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar - Slide from Right */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Close Button - Top Left Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition z-10"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        {/* Sidebar Header - Top Bar Content */}
        <div className="bg-gray-100 border-b border-gray-200 py-4 px-4 pt-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-3 mb-4">
            <a href="tel:+8801943665958" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
              <Phone size={16} />
              <span>+880 1943-665958</span>
            </a>
            <a href="mailto:valleyictbd24@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
              <Mail size={16} />
              <span>valleyictbd24@gmail.com</span>
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <a href="https://www.facebook.com/yaqubal.mahir.3" className="text-gray-600 hover:text-blue-600 transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600 transition" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600 transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-700 transition" aria-label="Pinterest">
              <MessageCircleHeart size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block px-6 py-3 font-medium transition ${isActive
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Roll Number"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value) {
                      router.push(`/results?roll=${value}`);
                      onClose();
                    }
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling?.querySelector('input') as HTMLInputElement;
                const value = input?.value.trim();
                if (value) {
                  router.push(`/results?roll=${value}`);
                  onClose();
                }
              }}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

