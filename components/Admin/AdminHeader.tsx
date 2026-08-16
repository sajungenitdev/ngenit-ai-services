"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get page title from pathname
    const getPageTitle = () => {
        const segments = pathname?.split("/").filter(Boolean) || [];
        if (segments.length <= 1) return "Dashboard";
        
        // Handle nested routes like /admin/services/create
        const lastSegment = segments[segments.length - 1];
        if (lastSegment === "create") return "Create New";
        if (lastSegment === "edit") return "Edit";
        
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    };

    const getBreadcrumbs = () => {
        const segments = pathname?.split("/").filter(Boolean) || [];
        const breadcrumbs = [];
        let currentPath = "";

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;
            
            // Skip "admin" in breadcrumb or make it "Home"
            if (segment === "admin") {
                breadcrumbs.push({
                    label: "Home",
                    path: "/admin/dashboard",
                });
                continue;
            }

            // Skip "create" and "edit" in breadcrumb path
            if (segment === "create" || segment === "edit") {
                continue;
            }

            breadcrumbs.push({
                label: segment.charAt(0).toUpperCase() + segment.slice(1),
                path: currentPath,
            });
        }

        return breadcrumbs;
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <header className="bg-white border-b border-grey-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-10 flex-shrink-0">
            {/* Left Side - Title & Breadcrumbs */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-off-white transition-colors"
                >
                    <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div>
                    <h1 className="text-lg md:text-xl font-bold text-navy font-plus-jakarta">
                        {getPageTitle()}
                    </h1>
                    {breadcrumbs.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-grey-400">
                            {breadcrumbs.map((crumb, index) => (
                                <span key={crumb.path} className="flex items-center gap-1">
                                    {index > 0 && <span>/</span>}
                                    <span className="hover:text-navy transition-colors">
                                        {crumb.label}
                                    </span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
                {/* Search (optional) */}
                <button className="p-2 rounded-lg hover:bg-off-white transition-colors text-grey-400 hover:text-navy">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-off-white transition-colors text-grey-400 hover:text-navy">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-off-white transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-white font-bold text-sm">
                            A
                        </div>
                        <span className="hidden md:block text-sm font-medium text-navy">Admin</span>
                        <svg className={`w-4 h-4 text-grey-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-grey-100 py-2 z-20">
                                <div className="px-4 py-3 border-b border-grey-100">
                                    <p className="text-sm font-semibold text-navy">Admin</p>
                                    <p className="text-xs text-grey-400">admin@ngenitltd.com</p>
                                </div>
                                <button className="w-full text-left px-4 py-2 text-sm text-grey-600 hover:bg-off-white transition-colors flex items-center gap-2">
                                    <span>👤</span> Profile
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-grey-600 hover:bg-off-white transition-colors flex items-center gap-2">
                                    <span>⚙️</span> Settings
                                </button>
                                <hr className="my-1 border-grey-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-off-white transition-colors flex items-center gap-2"
                                >
                                    <span>🚪</span> Logout
                                </button>
                            </div>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}