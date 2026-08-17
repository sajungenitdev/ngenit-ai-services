"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
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
                        <span className="text-white/80">Privacy Policy</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Legal
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Privacy Policy
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        We are committed to protecting your privacy and ensuring the security of your personal information.
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
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta mt-0">
                            1. Introduction
                        </h2>
                        <p className="text-black">
                            NGEN IT LIMITED ("we", "our", "us") respects your privacy and is committed to
                            protecting your personal data. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our website or
                            interact with our services.
                        </p>
                        <p className="text-black">
                            Please read this Privacy Policy carefully. By using our website, you agree to
                            the collection and use of information in accordance with this policy.
                        </p>

                        {/* Information We Collect */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            2. Information We Collect
                        </h2>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            a) Personal Information You Provide
                        </h3>
                        <p className="text-black">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>Fill out contact or consultation forms</li>
                            <li>Subscribe to our newsletter or updates</li>
                            <li>Request information about our services</li>
                            <li>Apply for a job or partnership</li>
                            <li>Communicate with us via email, phone, or social media</li>
                        </ul>
                        <p className="text-black">The personal information we collect may include:</p>
                        <ul className="text-gray-600 py-3">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Company name and job title</li>
                            <li>Country and location</li>
                            <li>Any other information you choose to provide</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            b) Automatically Collected Information
                        </h3>
                        <p className="text-black">
                            When you visit our website, we may automatically collect certain information
                            about your device and browsing activity, including:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website or source</li>
                            <li>Clickstream data and navigation patterns</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-navy font-plus-jakarta">
                            c) Cookies and Tracking Technologies
                        </h3>
                        <p className="text-black">
                            We use cookies and similar tracking technologies to enhance your browsing
                            experience, analyze website traffic, and personalize content. For more
                            information, please see our{" "}
                            <Link href="/cookie-policy" className="text-cyan hover:underline">
                                Cookie Policy
                            </Link>
                            .
                        </p>

                        {/* How We Use Your Information */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-black">We use the information we collect for the following purposes:</p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>To provide and maintain our services:</strong> To respond to
                                your inquiries, provide consultations, and deliver the services you request.
                            </li>
                            <li>
                                <strong>To communicate with you:</strong> To send you updates, newsletters,
                                marketing materials, and other information that may be of interest to you.
                            </li>
                            <li>
                                <strong>To improve our website:</strong> To analyze usage patterns and
                                enhance the user experience.
                            </li>
                            <li>
                                <strong>To ensure security:</strong> To detect, prevent, and address
                                technical issues and security breaches.
                            </li>
                            <li>
                                <strong>To comply with legal obligations:</strong> To meet our legal
                                and regulatory requirements.
                            </li>
                        </ul>

                        {/* Legal Basis for Processing */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            4. Legal Basis for Processing
                        </h2>
                        <p className="text-black">
                            We process your personal information under the following legal bases:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Consent:</strong> When you have given us explicit consent to
                                process your data for specific purposes.
                            </li>
                            <li>
                                <strong>Contract:</strong> When processing is necessary for the performance
                                of a contract with you or to take steps at your request before entering
                                into a contract.
                            </li>
                            <li>
                                <strong>Legal obligation:</strong> When processing is necessary to
                                comply with applicable laws and regulations.
                            </li>
                            <li>
                                <strong>Legitimate interests:</strong> When processing is necessary
                                for our legitimate business interests, provided your rights and freedoms
                                do not override those interests.
                            </li>
                        </ul>

                        {/* Disclosure of Your Information */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            5. Disclosure of Your Information
                        </h2>
                        <p className="text-black">
                            We may share your personal information with third parties in the following
                            circumstances:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Service Providers:</strong> We may share your information with
                                trusted third-party service providers who assist us in operating our
                                website, conducting our business, or providing services to you.
                            </li>
                            <li>
                                <strong>Legal Requirements:</strong> We may disclose your information
                                if required to do so by law or in response to valid requests by public
                                authorities.
                            </li>
                            <li>
                                <strong>Business Transfers:</strong> In the event of a merger, acquisition,
                                or sale of assets, your information may be transferred to the new owner.
                            </li>
                            <li>
                                <strong>With Your Consent:</strong> We may share your information with
                                third parties when you have given us explicit consent to do so.
                            </li>
                        </ul>

                        {/* Data Security */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            6. Data Security
                        </h2>
                        <p className="text-black">
                            We implement appropriate technical and organizational measures to protect
                            your personal information from unauthorized access, use, disclosure,
                            alteration, or destruction. However, please note that no method of
                            transmission over the internet or electronic storage is 100% secure.
                        </p>
                        <p className="text-black">
                            We use industry-standard security practices, including:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>Encryption of sensitive data in transit (SSL/TLS)</li>
                            <li>Secure storage of personal information</li>
                            <li>Access controls and authentication measures</li>
                            <li>Regular security audits and monitoring</li>
                        </ul>

                        {/* Data Retention */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            7. Data Retention
                        </h2>
                        <p className="text-black">
                            We will retain your personal information only for as long as necessary to
                            fulfill the purposes for which it was collected, including for the purposes
                            of satisfying any legal, accounting, or reporting requirements.
                        </p>
                        <p className="text-black">
                            When we no longer need your personal information, we will securely delete
                            or anonymize it.
                        </p>

                        {/* Your Rights */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            8. Your Rights
                        </h2>
                        <p className="text-black">
                            You have certain rights regarding your personal information, including:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>
                                <strong>Access:</strong> You have the right to request access to the
                                personal information we hold about you.
                            </li>
                            <li>
                                <strong>Rectification:</strong> You have the right to request that we
                                correct any inaccurate or incomplete information.
                            </li>
                            <li>
                                <strong>Erasure:</strong> You have the right to request that we delete
                                your personal information under certain circumstances.
                            </li>
                            <li>
                                <strong>Restriction:</strong> You have the right to request that we
                                restrict the processing of your information.
                            </li>
                            <li>
                                <strong>Objection:</strong> You have the right to object to our
                                processing of your information for direct marketing purposes.
                            </li>
                            <li>
                                <strong>Data Portability:</strong> You have the right to request a
                                copy of your information in a structured, machine-readable format.
                            </li>
                        </ul>
                        <p className="text-black">
                            To exercise any of these rights, please contact us using the information
                            provided in the "Contact Us" section below.
                        </p>

                        {/* Children's Privacy */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            9. Children's Privacy
                        </h2>
                        <p className="text-black">
                            Our website is not intended for children under the age of 16. We do not
                            knowingly collect personal information from children. If you are a parent
                            or guardian and believe that your child has provided us with personal
                            information, please contact us and we will take steps to remove that
                            information.
                        </p>

                        {/* International Data Transfers */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            10. International Data Transfers
                        </h2>
                        <p className="text-black">
                            As a global organization with offices and partners in multiple countries,
                            we may transfer your personal information to countries outside your country
                            of residence. We ensure that appropriate safeguards are in place to protect
                            your information in accordance with applicable data protection laws.
                        </p>
                        <p className="text-black">
                            Our offices and operations are located in:
                        </p>
                        <ul className="text-gray-600 py-3">
                            <li>Bangladesh (Headquarters)</li>
                            <li>United Kingdom</li>
                            <li>Singapore</li>
                            <li>Portugal</li>
                            <li>UAE / Middle East</li>
                        </ul>

                        {/* Changes to This Policy */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            11. Changes to This Policy
                        </h2>
                        <p className="text-black">
                            We may update this Privacy Policy from time to time to reflect changes in
                            our practices or for legal and regulatory reasons. We will notify you of
                            any material changes by posting the updated policy on this page and
                            updating the "Last Updated" date.
                        </p>
                        <p className="text-black">
                            We encourage you to review this Privacy Policy periodically to stay
                            informed about how we protect your privacy.
                        </p>

                        {/* Contact Information */}
                        <h2 className="text-2xl pb-3 font-bold text-navy font-plus-jakarta">
                            12. Contact Us
                        </h2>
                        <p className="text-black">
                            If you have any questions, concerns, or requests regarding this Privacy
                            Policy or our data practices, please contact us:
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
                        <div className="mt-8 p-6 bg-off-white rounded-xl text-black border border-grey-200">
                            <p className="text-sm text-grey-500">
                                This Privacy Policy was last updated on{" "}
                                <strong>{currentDate}</strong>.
                            </p>
                            <p className="text-sm text-grey-500 mt-2">
                                By continuing to use our website, you consent to our Privacy Policy.
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
                                Have Questions About<br />Your Privacy?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                We're here to help. Reach out to us with any privacy-related questions or concerns.
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
                                href="/cookie-policy"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                View Cookie Policy →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}