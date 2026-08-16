"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Don't show header on admin pages
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) {
        return null;
    }

    return <Footer />;
}