"use client";

import Link from "next/link";

const WA_LINK = "https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20your%20AI%20services.";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-7 right-7 z-[999] flex flex-col gap-3 items-end">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-green-wa text-white px-5 py-3.5 rounded-full font-semibold text-sm shadow-[0_8px_28px_rgba(37,211,102,0.4)] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(37,211,102,0.5)] no-underline"
      >
        <span className="text-lg">💬</span>
        Chat on WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex items-center gap-2 bg-navy-mid text-white border border-white/15 px-4 py-2.5 rounded-full font-semibold text-xs shadow-[0_8px_24px_rgba(13,27,62,0.4)] transition-all duration-200 hover:bg-navy-light hover:-translate-y-0.5 no-underline"
      >
        📋 Send Requirement
      </Link>
    </div>
  );
}