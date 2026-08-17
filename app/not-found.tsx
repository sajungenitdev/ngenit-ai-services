// app/not-found.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, CSSProperties } from "react";
import {
    Home,
    ArrowLeft,
    Search,
    Bot,
    Sparkles,
    Cpu,
    Zap,
    Globe,
    Shield,
    RefreshCw,
    Send,
    AlertTriangle,
    Brain,
    Network,
} from "lucide-react";

interface ParticleStyle extends CSSProperties {
    "--tx"?: string;
    "--ty"?: string;
    "--tx2"?: string;
    "--ty2"?: string;
}

export default function NotFound() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [matrixChars, setMatrixChars] = useState<string[]>([]);
    const [scanLine, setScanLine] = useState(0);
    const [particles, setParticles] = useState<Array<{ top: string; left: string; delay: string; duration: string; opacity: number; styleVars: ParticleStyle }>>([]);

    // Hydration-safe random particles initialization
    useEffect(() => {
        const generatedParticles = Array.from({ length: 12 }, (_, i) => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${i * 0.8}s`,
            duration: `${3 + Math.random() * 4}s`,
            opacity: 0.1 + Math.random() * 0.3,
            styleVars: {
                "--tx": `${(Math.random() - 0.5) * 100}px`,
                "--ty": `${(Math.random() - 0.5) * 100}px`,
                "--tx2": `${(Math.random() - 0.5) * 100}px`,
                "--ty2": `${(Math.random() - 0.5) * 100}px`,
            } as ParticleStyle,
        }));
        setParticles(generatedParticles);
    }, []);

    // Matrix rain effect
    useEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:<>?";
        const interval = setInterval(() => {
            setMatrixChars(
                Array.from({ length: 20 }, () =>
                    chars.charAt(Math.floor(Math.random() * chars.length))
                )
            );
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Scanning line animation
    useEffect(() => {
        const interval = setInterval(() => {
            setScanLine((prev) => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Matrix Rain Effect */}
            <div className="absolute top-0 right-10 opacity-20 font-mono text-xs text-cyan-500 pointer-events-none hidden lg:block">
                {matrixChars.map((char, i) => (
                    <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                        {char}
                    </div>
                ))}
            </div>

            {/* Scanning Line */}
            <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 pointer-events-none transition-all duration-75"
                style={{
                    top: `${scanLine}%`,
                    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                }}
            />

            {/* Animated Floating Orbs */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] animate-pulse [animation-delay:1000ms] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

            {/* Dynamic Glowing Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                            top: p.top,
                            left: p.left,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            opacity: p.opacity,
                            ...p.styleVars,
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-3xl w-full text-center z-10">
                {/* AI Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md mb-8 animate-bounce">
                    <div className="relative">
                        <Cpu className="w-4 h-4 text-cyan-400 animate-spin [animation-duration:4s]" />
                        <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full blur-md animate-ping opacity-50" />
                    </div>
                    <span className="text-xs font-mono tracking-wider text-cyan-300 uppercase">
                        Neural Route: 404_NOT_FOUND
                    </span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                </div>

                {/* Main 404 Header with Glitch Effect */}
                <div className="relative mb-6 select-none group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-indigo-500/20 blur-3xl -z-10 animate-pulse" />

                    <h1 className="text-8xl sm:text-[10rem] font-extrabold tracking-tighter text-cyan-400 relative drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                        404
                        <span className="absolute top-0 left-0 text-cyan-400 opacity-30 blur-sm translate-x-1 translate-y-1">
                            404
                        </span>
                        <span className="absolute top-0 left-0 text-cyan-400 opacity-20 blur-lg translate-x-2 translate-y-2">
                            404
                        </span>
                        <span className="absolute inset-0 text-cyan-400 opacity-50 blur-2xl">
                            404
                        </span>
                    </h1>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                </div>

                {/* Error Message */}
                <div className="mb-8 space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
                        <Brain className="w-6 h-6 text-cyan-400 animate-pulse" />
                        <span>AI Node Lost in Deep Space</span>
                        <Sparkles className="w-5 h-5 text-cyan-400 animate-spin [animation-duration:6s]" />
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                        Our neural network couldn't locate this page coordinates. It may have been recalibrated or deleted from the system.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                            <Network className="w-3 h-3" />
                            Error Code: 404
                        </span>
                        <span className="w-px h-4 bg-slate-800" />
                        <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Node: Missing
                        </span>
                    </div>
                </div>

                {/* AI Search Panel */}
                <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-10 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition-all duration-500 group-focus-within:opacity-75" />
                    <div className="relative flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 group-focus-within:border-cyan-500/50">
                        <Search className="ml-4 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors flex-shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ask AI assistant to locate content..."
                            className="w-full px-4 py-3.5 bg-transparent text-slate-200 placeholder-slate-500 text-sm focus:outline-none"
                            disabled={isSearching}
                        />
                        <button
                            type="submit"
                            disabled={isSearching || !searchQuery.trim()}
                            className="mr-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSearching ? (
                                <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <Bot className="w-3.5 h-3.5" />
                                    <span>Query</span>
                                    <Send className="w-3 h-3" />
                                </>
                            )}
                        </button>
                    </div>
                    {searchQuery && !isSearching && (
                        <div className="absolute -bottom-6 left-0 right-0 text-xs text-cyan-400/60 font-mono">
                            <span className="flex items-center justify-center gap-1">
                                <Zap className="w-3 h-3" />
                                {searchQuery.length} characters analyzed
                            </span>
                        </div>
                    )}
                </form>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:scale-95 group"
                    >
                        <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>Return to Core</span>
                        <Globe className="w-4 h-4 opacity-50" />
                    </Link>
                    <button
                        onClick={handleGoBack}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span>Previous Node</span>
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-slate-800/80">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                            <Shield className="w-3 h-3 text-cyan-400" />
                            <span>System Status:</span>
                            <span className="text-cyan-400">Operational</span>
                        </span>
                        <span className="w-px h-4 bg-slate-800 hidden sm:block" />
                        <Link
                            href="/contact"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4 hover:decoration-cyan-500/60 flex items-center gap-1.5"
                        >
                            <span>🛠️</span>
                            Diagnostic Support
                        </Link>
                        <span className="w-px h-4 bg-slate-800 hidden sm:block" />
                        <Link
                            href="/about"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4 hover:decoration-cyan-500/60 flex items-center gap-1.5"
                        >
                            <span>📡</span>
                            System Architecture
                        </Link>
                        <span className="w-px h-4 bg-slate-800 hidden sm:block" />
                        <span className="flex items-center gap-1.5 text-slate-600">
                            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                            <span>AI Online</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}