"use client";

import {
    LayoutDashboard,
    Calendar,
    FileText,
    Users,
    MessageSquare,
    Key,
    LogOut,
    Menu,
    X,
    Award
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
    onLogout?: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            href: "/w-admin",
            description: "Overview"
        },
        {
            icon: Calendar,
            label: "Free Seminar",
            href: "/w-admin/seminar",
            description: "Manage seminar dates"
        },
        {
            icon: FileText,
            label: "Student Results",
            href: "/w-admin/results",
            description: "Add & manage results"
        },
        {
            icon: Award,
            label: "Certificates",
            href: "/w-admin/certification",
            description: "Add & manage certificates"
        },
        {
            icon: Users,
            label: "Enrollments",
            href: "/w-admin/enrollments",
            description: "View enrollments"
        },
        {
            icon: MessageSquare,
            label: "Messages",
            href: "/w-admin/messages",
            description: "Contact messages"
        },
        {
            icon: Key,
            label: "Credentials",
            href: "/w-admin/credentials",
            description: "Change password"
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/w-admin/login");
        if (onLogout) onLogout();
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white
          w-64 flex flex-col shadow-2xl z-40 transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Header */}
                <div className="p-6 border-b border-purple-700">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <p className="text-purple-200 text-sm mt-1">Valley ICT</p>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
                    <style jsx global>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`
                      flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive
                                                ? "bg-white text-purple-900 shadow-lg"
                                                : "hover:bg-purple-700/50 text-purple-100"
                                            }
                    `}
                                    >
                                        <Icon
                                            size={22}
                                            className={`mt-0.5 ${isActive ? "text-purple-600" : ""}`}
                                        />
                                        <div className="flex-1">
                                            <div className={`font-semibold ${isActive ? "text-purple-900" : ""}`}>
                                                {item.label}
                                            </div>
                                            <div
                                                className={`text-xs ${isActive ? "text-purple-700" : "text-purple-300"
                                                    }`}
                                            >
                                                {item.description}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-purple-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-semibold"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
