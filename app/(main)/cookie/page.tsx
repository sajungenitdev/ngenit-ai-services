"use client";

import Link from "next/link";

export default function CookiePolicyPage() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            {/* Page Hero */}
            <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/80">Cookie Policy</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Legal
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Cookie Policy
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Learn about how NGEN IT uses cookies to enhance your browsing experience and protect your privacy.
                    </p>
                    <p className="text-white/40 text-sm mt-2">
                        Last Updated: {currentDate}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="prose prose-lg prose-grey max-w-none">
                        {/* Introduction */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta mt-0">
                            1. Introduction
                        </h2>
                        <p className="text-black">
                            NGEN IT LIMITED ("we", "our", "us") uses cookies and similar tracking technologies
                            on our website. This Cookie Policy explains what cookies are, how we use them,
                            and how you can manage your preferences.
                        </p>

                        {/* What are Cookies */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            2. What Are Cookies?
                        </h2>
                        <p className="text-black">
                            Cookies are small text files that are placed on your computer or mobile device
                            when you visit a website. They are widely used to make websites work more
                            efficiently and to provide information to the website owners.
                        </p>
                        <p className="text-black">
                            Cookies help us:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our website</li>
                            <li>Improve your browsing experience</li>
                            <li>Provide relevant content and advertisements</li>
                        </ul>

                        {/* Types of Cookies */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            3. Types of Cookies We Use
                        </h2>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            a) Essential Cookies
                        </h3>
                        <p className="text-black">
                            These cookies are necessary for the website to function properly. They enable
                            core functionality such as page navigation, security, and access to protected
                            areas of the website. You cannot opt out of these cookies.
                        </p>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            b) Performance Cookies
                        </h3>
                        <p className="text-black">
                            These cookies help us understand how visitors interact with our website by
                            collecting and reporting information anonymously. This helps us improve the
                            performance and user experience of our site.
                        </p>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            c) Functional Cookies
                        </h3>
                        <p className="text-black">
                            These cookies enable the website to provide enhanced functionality and
                            personalization. They may be set by us or by third-party providers whose
                            services we have added to our pages.
                        </p>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            d) Targeting/Advertising Cookies
                        </h3>
                        <p className="text-black">
                            These cookies are used to deliver advertisements that are more relevant to
                            you and your interests. They may also be used to limit the number of times
                            you see an advertisement and to measure the effectiveness of advertising
                            campaigns.
                        </p>

                        {/* How We Use Cookies */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            4. How We Use Cookies
                        </h2>
                        <p className="text-black">
                            We use cookies for the following purposes:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Authentication:</strong> To identify you when you log in to
                                our website and to maintain your session.
                            </li>
                            <li>
                                <strong>Preferences:</strong> To remember your preferences and settings
                                such as language and region.
                            </li>
                            <li>
                                <strong>Analytics:</strong> To analyze how our website is used and to
                                improve its performance.
                            </li>
                            <li>
                                <strong>Marketing:</strong> To display relevant advertisements and to
                                measure the effectiveness of our marketing campaigns.
                            </li>
                        </ul>

                        {/* Third-Party Cookies */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            5. Third-Party Cookies
                        </h2>
                        <p className="text-black">
                            Some of the cookies on our website are set by third-party services that we use.
                            These third parties may collect information about your online activities over
                            time and across different websites.
                        </p>
                        <p className="text-black">
                            We use the following third-party services that may set cookies:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Google Analytics:</strong> For website analytics and performance
                                tracking.
                            </li>
                            <li>
                                <strong>YouTube:</strong> For embedded video content.
                            </li>
                            <li>
                                <strong>LinkedIn:</strong> For social sharing and professional networking
                                features.
                            </li>
                            <li>
                                <strong>Twitter/X:</strong> For social sharing and embedded content.
                            </li>
                        </ul>

                        {/* Managing Cookies */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            6. Managing Your Cookie Preferences
                        </h2>
                        <p className="text-black">
                            You can manage your cookie preferences at any time by adjusting your browser
                            settings. Most web browsers allow you to:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>View and delete cookies</li>
                            <li>Block cookies from specific websites</li>
                            <li>Block all cookies</li>
                            <li>Delete all cookies when you close your browser</li>
                        </ul>
                        <p className="text-black">
                            To learn more about how to manage cookies in your browser, visit the help
                            section of your browser or the following links:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <a
                                    href="https://support.google.com/chrome/answer/95647"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan hover:underline"
                                >
                                    Google Chrome
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan hover:underline"
                                >
                                    Mozilla Firefox
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan hover:underline"
                                >
                                    Apple Safari
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan hover:underline"
                                >
                                    Microsoft Edge
                                </a>
                            </li>
                        </ul>

                        {/* Changes to This Policy */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            7. Changes to This Policy
                        </h2>
                        <p className="text-black">
                            We may update this Cookie Policy from time to time to reflect changes in
                            our practices or for legal and regulatory reasons. We will notify you of
                            any material changes by posting the updated policy on this page.
                        </p>
                        <p className="text-black">
                            We encourage you to review this Cookie Policy periodically to stay informed
                            about how we use cookies.
                        </p>

                        {/* Contact Information */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            8. Contact Us
                        </h2>
                        <p className="text-black">
                            If you have any questions about our use of cookies or this Cookie Policy,
                            please contact us:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:ai@ngenitltd.com"
                                    className="text-cyan hover:underline"
                                >
                                    ai@ngenitltd.com
                                </a>
                            </li>
                            <li>
                                <strong>Address:</strong> NGEN IT LIMITED, Dhaka, Bangladesh
                            </li>
                            <li>
                                <strong>Website:</strong>{" "}
                                <Link href="/" className="text-cyan hover:underline">
                                    www.ngenitltd.com
                                </Link>
                            </li>
                        </ul>

                        {/* Footer Note */}
                        <div className="mt-8 p-6 text-black bg-off-white rounded-xl border border-grey-200">
                            <p className="text-sm text-grey-500">
                                This Cookie Policy was last updated on{" "}
                                <strong>{currentDate}</strong>.
                            </p>
                            <p className="text-sm text-grey-500 mt-2">
                                By continuing to use our website, you consent to our use of cookies
                                as described in this policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.15] text-white max-w-[560px]">
                                Have Questions About<br />Our Policies?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Our team is here to help. Reach out to us with any questions or concerns.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                View Privacy Policy →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}