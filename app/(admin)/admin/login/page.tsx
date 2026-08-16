"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@ngenitltd.com");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store token for API calls
                localStorage.setItem('admin_token', data.token || '');
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Login failed. Please check your credentials.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-grey-100">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2.5 mb-4">
                        <span className="bg-gradient-to-r from-cyan to-blue text-white font-extrabold text-sm px-3 py-1.5 rounded-md">
                            N
                        </span>
                        <span className="font-plus-jakarta font-extrabold text-lg text-navy">
                            NGEN IT
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Admin Login
                    </h1>
                    <p className="text-grey-400 text-sm mt-1">
                        Sign in to manage your dashboard
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@ngenitltd.com"
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all pr-12"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Auto-login hint */}
                    <div className="mb-6 text-xs text-grey-400 bg-off-white p-3 rounded-lg border border-grey-100">
                        <span className="font-medium text-navy">💡 Quick Login:</span> Credentials are pre-filled. Just click Sign In.
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-200 ${loading
                            ? "bg-grey-400 cursor-not-allowed"
                            : "bg-navy hover:bg-navy-light hover:-translate-y-0.5"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="text-center pt-5">
                    <Link href="/" className="text-blue hover:text-cyan transition-colors text-sm font-medium">
                        ← Return Home
                    </Link>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-grey-400 text-xs">
                        © {new Date().getFullYear()} NGEN IT LIMITED. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}