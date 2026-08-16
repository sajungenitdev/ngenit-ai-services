"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Admin/Sidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminFooter from "@/components/Admin/AdminFooter";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === "/admin/login") {
            setLoading(false);
            setIsAuthenticated(true);
            return;
        }

        const checkAuth = async () => {
            try {
                const response = await fetch("/api/admin/verify");
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/admin/login");
                }
            } catch {
                router.push("/admin/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // If on login page, render without sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-off-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen bg-off-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
                <AdminFooter />
            </div>
        </div>
    );
}