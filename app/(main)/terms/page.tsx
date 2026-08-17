"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
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
                        <span className="text-white/80">Terms of Service</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Legal
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Terms of Service
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Please read these terms carefully before using our services.
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
                            Welcome to NGEN IT LIMITED ("we", "our", "us"). These Terms of Service
                            ("Terms") govern your use of our website and services. By accessing or
                            using our website, you agree to be bound by these Terms.
                        </p>
                        <p className="text-black">
                            If you do not agree with any part of these Terms, please do not use our
                            website or services.
                        </p>

                        {/* Acceptance of Terms */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            2. Acceptance of Terms
                        </h2>
                        <p className="text-black">
                            By using our website and services, you acknowledge that you have read,
                            understood, and agree to be bound by these Terms. These Terms apply to
                            all visitors, users, and others who access or use the website.
                        </p>
                        <p className="text-black">
                            We reserve the right to update or modify these Terms at any time without
                            prior notice. Your continued use of the website after any changes
                            constitutes your acceptance of the new Terms.
                        </p>

                        {/* Services Provided */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            3. Services Provided
                        </h2>
                        <p className="text-black">
                            NGEN IT provides AI consulting, solutions, and implementation services
                            including but not limited to:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>AI Strategy and Consulting</li>
                            <li>Generative AI Solutions</li>
                            <li>Intelligent Automation</li>
                            <li>Data Analytics and Machine Learning</li>
                            <li>Computer Vision Solutions</li>
                            <li>Industrial AI</li>
                            <li>Custom AI Application Development</li>
                        </ul>
                        <p className="text-black">
                            All services are subject to availability and may be modified or
                            discontinued at our discretion.
                        </p>

                        {/* User Obligations */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            4. User Obligations
                        </h2>
                        <p className="text-black">When using our website and services, you agree to:</p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                Provide accurate and complete information when requested
                            </li>
                            <li>
                                Use the website in compliance with all applicable laws and regulations
                            </li>
                            <li>
                                Not engage in any activity that could harm, disable, or impair the
                                website or its functionality
                            </li>
                            <li>
                                Not attempt to gain unauthorized access to any part of the website
                            </li>
                            <li>
                                Not use the website for any unlawful or fraudulent purpose
                            </li>
                            <li>
                                Not transmit any viruses, malware, or harmful code
                            </li>
                        </ul>

                        {/* Intellectual Property */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            5. Intellectual Property
                        </h2>
                        <p className="text-black">
                            All content on this website, including text, graphics, logos, icons,
                            images, software, and other materials, is the property of NGEN IT
                            LIMITED or its content suppliers and is protected by copyright,
                            trademark, and other intellectual property laws.
                        </p>
                        <p className="text-black">
                            You may not reproduce, distribute, modify, create derivative works of,
                            publicly display, or commercially exploit any content without our
                            prior written consent.
                        </p>

                        {/* User Content */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            6. User Content
                        </h2>
                        <p className="text-black">
                            By submitting content (including feedback, suggestions, or other
                            information) to us, you grant NGEN IT a worldwide, perpetual,
                            royalty-free license to use, reproduce, modify, and distribute that
                            content for any purpose.
                        </p>
                        <p className="text-black">
                            You represent and warrant that you have all necessary rights to grant
                            this license and that your content does not infringe any third-party rights.
                        </p>

                        {/* Third-Party Links */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            7. Third-Party Links
                        </h2>
                        <p className="text-black">
                            Our website may contain links to third-party websites or services that
                            are not owned or controlled by NGEN IT. We have no control over, and
                            assume no responsibility for, the content, privacy policies, or practices
                            of any third-party websites.
                        </p>
                        <p className="text-black">
                            We encourage you to review the terms and conditions and privacy policies
                            of any third-party websites you visit.
                        </p>

                        {/* Disclaimer of Warranties */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            8. Disclaimer of Warranties
                        </h2>
                        <p className="text-black">
                            The website and services are provided on an "AS IS" and "AS AVAILABLE" basis.
                            NGEN IT makes no warranties, expressed or implied, regarding the
                            operation, accuracy, reliability, or completeness of the website or its content.
                        </p>
                        <p className="text-black">
                            To the fullest extent permitted by law, we disclaim all warranties,
                            including but not limited to implied warranties of merchantability,
                            fitness for a particular purpose, and non-infringement.
                        </p>

                        {/* Limitation of Liability */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            9. Limitation of Liability
                        </h2>
                        <p className="text-black">
                            To the maximum extent permitted by law, NGEN IT shall not be liable for
                            any indirect, incidental, special, consequential, or punitive damages,
                            including without limitation loss of profits, data, use, goodwill, or
                            other intangible losses, resulting from:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>Your use or inability to use the website or services</li>
                            <li>Any unauthorized access to or use of our servers and/or personal information</li>
                            <li>Any interruption or cessation of transmission to or from our website</li>
                            <li>Any bugs, viruses, or other harmful code that may be transmitted</li>
                            <li>Any errors or omissions in any content</li>
                        </ul>

                        {/* Indemnification */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            10. Indemnification
                        </h2>
                        <p className="text-black">
                            You agree to indemnify and hold harmless NGEN IT, its officers, employees,
                            agents, and affiliates from any claims, damages, losses, liabilities,
                            and expenses arising out of your use of the website or services, your
                            violation of these Terms, or your violation of any third-party rights.
                        </p>

                        {/* Termination */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            11. Termination
                        </h2>
                        <p className="text-black">
                            We may terminate or suspend your access to the website immediately,
                            without prior notice or liability, for any reason, including without
                            limitation if you breach these Terms.
                        </p>
                        <p className="text-black">
                            Upon termination, your right to use the website will cease immediately.
                        </p>

                        {/* Governing Law */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            12. Governing Law
                        </h2>
                        <p className="text-black">
                            These Terms shall be governed and construed in accordance with the laws
                            of Bangladesh, without regard to its conflict of law provisions.
                        </p>
                        <p className="text-black">
                            Any dispute arising under these Terms shall be subject to the exclusive
                            jurisdiction of the courts located in Dhaka, Bangladesh.
                        </p>

                        {/* Severability */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            13. Severability
                        </h2>
                        <p className="text-black">
                            If any provision of these Terms is found to be unenforceable or invalid
                            under applicable law, the remaining provisions shall remain in full
                            force and effect.
                        </p>

                        {/* Entire Agreement */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            14. Entire Agreement
                        </h2>
                        <p className="text-black">
                            These Terms constitute the entire agreement between you and NGEN IT
                            regarding your use of the website and supersede all prior agreements
                            and understandings.
                        </p>

                        {/* Contact Information */}
                        <h2 className="text-2xl py-3 font-bold text-navy font-plus-jakarta">
                            15. Contact Us
                        </h2>
                        <p className="text-black">
                            If you have any questions about these Terms, please contact us:
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
                                <strong>Phone:</strong>{" "}
                                <a
                                    href="tel:+8801XXXXXXXXX"
                                    className="text-cyan hover:underline"
                                >
                                    +8801XXXXXXXXX
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
                        <div className="mt-8 p-6 bg-off-white text-black rounded-xl border border-grey-200">
                            <p className="text-sm text-grey-500">
                                These Terms of Service were last updated on{" "}
                                <strong>{currentDate}</strong>.
                            </p>
                            <p className="text-sm text-grey-500 mt-2">
                                By continuing to use our website, you agree to these Terms of Service.
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
                                Have Questions About<br />Our Terms?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                We're here to help. Reach out to us with any questions about our Terms of Service.
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