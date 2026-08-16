"use client";

import { HeroData } @/types/admin/hero

interface HeroPreviewProps {
    data: HeroData;
}

export default function HeroPreview({ data }: HeroPreviewProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-navy font-plus-jakarta">
                    Live Preview
                </h3>
                <span className="text-xs text-grey-400">
                    How your hero section will look
                </span>
            </div>

            <div className="relative bg-navy rounded-xl overflow-hidden min-h-[500px]">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(30,95,212,0.25)_0%,transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(0,194,203,0.15)_0%,transparent_50%)]"></div>
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                    }}
                />

                <div className="relative z-10 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Text Content */}
                        <div className="text-center lg:text-left">
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                {data.badge}
                            </span>
                            <h1 className="text-white text-3xl font-extrabold font-plus-jakarta leading-[1.1] mt-4">
                                {data.title}
                                <br />
                                <span className="bg-gradient-to-r from-cyan to-cyan-light bg-clip-text text-transparent">
                                    {data.highlightedText}
                                </span>
                            </h1>
                            <p className="text-white/70 text-sm leading-relaxed mt-4 max-w-md mx-auto lg:mx-0">
                                {data.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                                <span className="inline-flex items-center px-6 py-2.5 bg-cyan text-navy rounded-lg text-sm font-semibold">
                                    {data.buttonPrimary}
                                </span>
                                <span className="inline-flex items-center px-6 py-2.5 bg-transparent border border-white/40 text-white rounded-lg text-sm font-semibold">
                                    {data.buttonSecondary}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t border-white/10 justify-center lg:justify-start">
                                {Object.values(data.stats).map((stat, i) => (
                                    <div key={i} className="text-center lg:text-left">
                                        <div className="font-extrabold text-cyan text-lg">
                                            {stat.value}
                                        </div>
                                        <div className="text-white/55 text-xs">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Dashboard */}
                        <div className="relative flex justify-center items-center">
                            {/* Floating Card Left */}
                            <div className="absolute top-[-10px] left-[-20px] bg-white rounded-xl px-3 py-2 shadow-2xl flex items-center gap-2 text-[0.7rem] font-semibold text-navy whitespace-nowrap z-10 hidden lg:flex">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></div>
                                {data.floatingCards.left}
                            </div>

                            {/* Dashboard Card */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-full max-w-[360px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#FFBC2E]"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#28CA41]"></div>
                                    <span className="text-white/50 text-[0.65rem] ml-auto">
                                        {data.dashboard.title}
                                    </span>
                                </div>

                                {/* Services Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {data.dashboard.services.map((service, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 rounded-lg p-2.5 border border-white/5 hover:bg-cyan/10 hover:border-cyan/30 transition-all"
                                        >
                                            <div className="text-lg mb-1">{service.icon}</div>
                                            <div className="text-[0.6rem] font-semibold text-white/85">
                                                {service.name}
                                            </div>
                                            <div className="text-[0.55rem] text-cyan mt-0.5">
                                                {service.tag}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Metrics */}
                                <div className="flex gap-1.5">
                                    {data.dashboard.metrics.map((metric, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-white/5 rounded-lg p-2 border border-white/5"
                                        >
                                            <div className="font-bold text-sm text-white">
                                                {metric.value}
                                            </div>
                                            <div className="text-[0.55rem] text-white/40">
                                                {metric.label}
                                            </div>
                                            <div className="text-cyan text-[0.55rem] mt-0.5 font-semibold">
                                                {metric.trend}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Card Right */}
                            <div className="absolute bottom-5 right-[-20px] bg-white rounded-xl px-3 py-2 shadow-2xl flex items-center gap-2 text-[0.7rem] font-semibold text-navy whitespace-nowrap z-10 hidden lg:flex">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></div>
                                {data.floatingCards.right}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-xs text-grey-400 text-center">
                This is a simplified preview. The actual hero section includes
                animations, floating orbs, and full responsiveness.
            </div>
        </div>
    );
}