"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
    const pathname = usePathname();

    // Don't show header on admin pages
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) {
        return null;
    }

    return <Header />;
}