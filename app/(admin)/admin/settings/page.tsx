"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        setTimeout(() => {
            setLoading(false);
            setMessage("Settings saved successfully!");
            setTimeout(() => setMessage(""), 3000);
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-navy font-plus-jakarta mb-6">
                Settings
            </h2>

            {message && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6 max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Site Name
                        </label>
                        <input
                            type="text"
                            defaultValue="NGEN IT"
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            defaultValue="admin@ngenitltd.com"
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            WhatsApp Number
                        </label>
                        <input
                            type="text"
                            defaultValue="+8801XXXXXXXXX"
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                            loading
                                ? "bg-grey-400 cursor-not-allowed"
                                : "bg-navy hover:bg-navy-light hover:-translate-y-0.5"
                        }`}
                    >
                        {loading ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}