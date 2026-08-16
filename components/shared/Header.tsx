"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import AiServicesMenus from "./NavBarMenus/AiServicesMenus";
import IndustrialMenus from "./NavBarMenus/IndustrialMenus";
import { getServices } from "@/services/serviceApi";
import { getIndustries } from "@/services/industryApi";
import { ServiceData } from "@/types/admin/service";
import { IndustryData } from "@/types/admin/industry";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [industriesOpen, setIndustriesOpen] = useState(false);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [industries, setIndustries] = useState<IndustryData[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, industriesData] = await Promise.all([
                    getServices(),
                    getIndustries()
                ]);
                setServices(servicesData);
                setIndustries(industriesData);
            } catch (error) {
                console.error("Error fetching header data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (mobileOpen && !target.closest(`.${styles.mobileDrawer}`) && !target.closest(`.${styles.navToggle}`)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [mobileOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileOpen]);

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
                <div className={styles.container}>
                    <div className={styles.navInner}>
                        <Link href="/" className={styles.navLogo}>
                            <span className={styles.logoBadge}>N</span>
                            <span className={styles.logoText}>NGEN IT</span>
                        </Link>

                        <ul className={styles.navMenu}>
                            {/* AI Services Dropdown */}
                            <li
                                className={styles.navItem}
                                onMouseEnter={() => setServicesOpen(true)}
                                onMouseLeave={() => setServicesOpen(false)}
                            >
                                <span className={styles.navLink}>
                                    AI Services
                                    <svg
                                        className={styles.arrow}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </span>
                                <AiServicesMenus isOpen={servicesOpen} services={services} />
                            </li>

                            {/* Industry Solutions Dropdown */}
                            <li
                                className={styles.navItem}
                                onMouseEnter={() => setIndustriesOpen(true)}
                                onMouseLeave={() => setIndustriesOpen(false)}
                            >
                                <span className={styles.navLink}>
                                    Industry Solutions
                                    <svg
                                        className={styles.arrow}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </span>
                                <IndustrialMenus isOpen={industriesOpen} industries={industries} />
                            </li>

                            <li className={styles.navItem}>
                                <Link href="/usecases" className={styles.navLink}>
                                    Use Cases
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/solutions" className={styles.navLink}>
                                    AI Solutions
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/about" className={styles.navLink}>
                                    About Us
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/insights" className={styles.navLink}>
                                    Insights
                                </Link>
                            </li>
                        </ul>

                        <div className={styles.navCta}>
                            <Link href="/contact" className={styles.btnConsult}>
                                Consult Us
                            </Link>
                            <button
                                className={styles.navToggle}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    {mobileOpen ? (
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    ) : (
                                        <path d="M3 12h18M3 6h18M3 18h18" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div
                className={`${styles.overlay} ${mobileOpen ? styles.overlayOpen : ""}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Drawer */}
            <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ""}`}>
                <div className={styles.drawerHeader}>
                    <Link href="/" className={styles.drawerLogo} onClick={() => setMobileOpen(false)}>
                        <span className={styles.logoBadge}>N</span>
                        <span className={styles.logoText}>NGEN IT</span>
                    </Link>
                    <button
                        className={styles.drawerClose}
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                <div className={styles.drawerBody}>
                    <Link href="/" className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                        Home
                    </Link>

                    <div className={styles.drawerAccordion}>
                        <div
                            className={styles.drawerAccordionTrigger}
                            onClick={() => setServicesOpen(!servicesOpen)}
                        >
                            <span>AI Services</span>
                            <span className={styles.drawerAccordionIcon}>
                                {servicesOpen ? "−" : "+"}
                            </span>
                        </div>
                        {servicesOpen && (
                            <div className={styles.drawerAccordionContent}>
                                {services.map((s) => (
                                    <Link
                                        href={`/service/${s._id}`}
                                        key={s._id}
                                        className={styles.drawerSubLink}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <span className={styles.drawerSubIcon}>{s.icon}</span>
                                        {s.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.drawerAccordion}>
                        <div
                            className={styles.drawerAccordionTrigger}
                            onClick={() => setIndustriesOpen(!industriesOpen)}
                        >
                            <span>Industry Solutions</span>
                            <span className={styles.drawerAccordionIcon}>
                                {industriesOpen ? "−" : "+"}
                            </span>
                        </div>
                        {industriesOpen && (
                            <div className={styles.drawerAccordionContent}>
                                {industries.map((i) => (
                                    <Link
                                        href={`/industries/${i.slug || i._id}`}
                                        key={i._id}
                                        className={styles.drawerSubLink}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <span className={styles.drawerSubIcon}>{i.icon}</span>
                                        {i.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/usecases" className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                        Use Cases
                    </Link>
                    <Link href="/solutions" className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                        AI Solutions
                    </Link>
                    <Link href="/about" className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                        About Us
                    </Link>
                    <Link href="/insights" className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                        Insights
                    </Link>

                    <div className={styles.drawerFooter}>
                        <Link href="/contact" className={styles.drawerConsultBtn} onClick={() => setMobileOpen(false)}>
                            Consult Us
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}