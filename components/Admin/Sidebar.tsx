"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import {
    LayoutDashboard,
    Contact,
    Layers,
    Building2,
    Lightbulb,
    Target,
    Newspaper,
    Quote,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Plus,
    List,
    Sparkles,
    Home,
} from "lucide-react";

// Types
interface SubMenuItem {
    icon: React.ReactNode;
    label: string;
    href: string;
}

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    subItems?: SubMenuItem[];
}

// Menu Configuration - Clean and Organized
const menuItems: MenuItem[] = [
    {
        icon: <LayoutDashboard className="w-4 h-4" />,
        label: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        icon: <Home className="w-4 h-4" />,
        label: "Home Page",
        href: "/admin/home-page",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "Overview", href: "/admin/home-page" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Hero Section", href: "/admin/home-page/hero-section" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Trust Bar", href: "/admin/home-page/trust-bar" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Out come", href: "/admin/home-page/outcomes" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Methodology", href: "/admin/home-page/methodology" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Why NGEN IT", href: "/admin/home-page/why-ngen" },
            { icon: <List className="w-3.5 h-3.5" />, label: "Call To Action", href: "/admin/home-page/cta-banner" },
        ],
    },
    {
        icon: <Layers className="w-4 h-4" />,
        label: "Services",
        href: "/admin/services",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "All Services", href: "/admin/services" },
            { icon: <Plus className="w-3.5 h-3.5" />, label: "Create Service", href: "/admin/services/create" },
        ],
    },
    {
        icon: <Building2 className="w-4 h-4" />,
        label: "Industries",
        href: "/admin/industries",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "All Industries", href: "/admin/industries" },
            { icon: <Plus className="w-3.5 h-3.5" />, label: "Create Industry", href: "/admin/industries/create" },
        ],
    },
    {
        icon: <Lightbulb className="w-4 h-4" />,
        label: "Solutions",
        href: "/admin/solutions",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "All Solutions", href: "/admin/solutions" },
            { icon: <Plus className="w-3.5 h-3.5" />, label: "Create Solution", href: "/admin/solutions/create" },
        ],
    },
    {
        icon: <Target className="w-4 h-4" />,
        label: "Use Cases",
        href: "/admin/usecases",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "All Use Cases", href: "/admin/usecases" },
            { icon: <Plus className="w-3.5 h-3.5" />, label: "Create Use Case", href: "/admin/usecases/create" },
        ],
    },
    {
        icon: <Newspaper className="w-4 h-4" />,
        label: "Insights",
        href: "/admin/insights",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "All Insights", href: "/admin/insights" },
            { icon: <Plus className="w-3.5 h-3.5" />, label: "Create Insight", href: "/admin/insights/create" },
        ],
    },
    {
        icon: <Quote className="w-4 h-4" />,
        label: "About Us",
        href: "/admin/about-us",
    },
    {
        icon: <Users className="w-4 h-4" />,
        label: "Contact Page",
        href: "/admin/contact",
        subItems: [
            { icon: <List className="w-3.5 h-3.5" />, label: "Contacts Page", href: "/admin/contact" },
            { icon: <List className="w-3.5 h-3.5" />, label: "All Contacts", href: "/admin/contact/all-contacts" },
        ],
    },
    {
        icon: <Settings className="w-4 h-4" />,
        label: "Settings",
        href: "/admin/settings",
    },
];

// Header Sub-component
const SidebarHeader = () => (
    <div className="p-5 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight leading-none">
                    NGEN IT
                </span>
                <span className="text-[11px] font-medium text-slate-400 mt-1">
                    Admin Panel
                </span>
            </div>
        </div>
    </div>
);

// Floating Flyout Submenu
const SubmenuFlyout = ({
    parentLabel,
    subItems,
    isOpen,
    onMouseEnter,
    onMouseLeave,
    parentRef,
}: {
    parentLabel: string;
    subItems: SubMenuItem[];
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    parentRef: React.RefObject<HTMLDivElement | null>;
}) => {
    const pathname = usePathname();
    const [topPosition, setTopPosition] = useState(0);

    useEffect(() => {
        if (isOpen && parentRef.current) {
            const rect = parentRef.current.getBoundingClientRect();
            setTopPosition(rect.top);
        }
    }, [isOpen, parentRef]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed left-[260px] w-52 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/60 py-2 z-[9999] transition-all duration-150 ease-out animate-in fade-in zoom-in-95 before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-4"
            style={{ top: `${topPosition}px` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="px-3 py-1.5 border-b border-slate-800 mb-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    {parentLabel}
                </span>
            </div>
            {subItems.map((subItem) => {
                const isActive = pathname === subItem.href;
                return (
                    <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`flex items-center gap-2.5 px-3 py-2 mx-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${isActive
                            ? "bg-cyan-500/15 text-cyan-400 font-semibold"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                            }`}
                    >
                        <span className={isActive ? "text-cyan-400" : "text-slate-400"}>
                            {subItem.icon}
                        </span>
                        <span>{subItem.label}</span>
                        {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

// Menu Item Component
const MenuItemComponent = ({
    item,
    isActive,
    isParentActive,
}: {
    item: MenuItem;
    isActive: boolean;
    isParentActive: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 100);
    }, []);

    if (!hasSubItems) {
        return (
            <Link
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${isActive
                    ? "bg-slate-800/90 text-cyan-400 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                    }`}
            >
                {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400" />
                )}
                <div className="flex items-center gap-3">
                    <span className={isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200 transition-colors"}>
                        {item.icon}
                    </span>
                    <span>{item.label}</span>
                </div>
            </Link>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={item.href}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${isParentActive || isHovered
                    ? "bg-slate-800/90 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                    }`}
            >
                {isParentActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400" />
                )}

                <div className="flex items-center gap-3">
                    <span className={isParentActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200 transition-colors"}>
                        {item.icon}
                    </span>
                    <span>{item.label}</span>
                </div>

                <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${isHovered ? "translate-x-1 text-cyan-400" : ""
                        }`}
                />
            </Link>

            <SubmenuFlyout
                parentLabel={item.label}
                subItems={item.subItems!}
                isOpen={isHovered}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                parentRef={containerRef}
            />
        </div>
    );
};

// Logout Button
const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    }, [router]);

    return (
        <div className="p-3 border-t border-slate-800/80 flex-shrink-0 bg-slate-900/50">
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 text-sm font-medium group"
            >
                <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                <span>Logout</span>
            </button>
        </div>
    );
};

// Main Sidebar Component
export default function Sidebar() {
    const pathname = usePathname();

    const getActiveState = useCallback(
        (item: MenuItem): { isActive: boolean; isParentActive: boolean } => {
            const isActive = pathname === item.href;
            const isParentActive =
                isActive ||
                (item.subItems?.some((sub) => sub.href === pathname) ?? false);
            return { isActive, isParentActive };
        },
        [pathname]
    );

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-screen overflow-visible select-none relative z-40">
            <SidebarHeader />

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    Navigation
                </div>
                {menuItems.map((item) => {
                    const { isActive, isParentActive } = getActiveState(item);
                    return (
                        <MenuItemComponent
                            key={item.label}
                            item={item}
                            isActive={isActive}
                            isParentActive={isParentActive}
                        />
                    );
                })}
            </nav>

            <LogoutButton />
        </aside>
    );
}