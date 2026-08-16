"use client";

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-grey-200 px-6 py-3 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-grey-400">
                <div className="flex items-center gap-4">
                    <span>
                        © {currentYear} <span className="text-navy font-medium">NGEN IT LIMITED</span>
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span>All rights reserved</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>v1.0.0</span>
                    <span className="hidden sm:inline">|</span>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span>System Online</span>
                    </div>
                    <span className="hidden sm:inline">|</span>
                    <button 
                        onClick={() => window.location.reload()}
                        className="hover:text-navy transition-colors"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>
        </footer>
    );
}