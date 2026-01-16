import AdminSidebar from "@/components/AdminSidebar";

export default function WAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
