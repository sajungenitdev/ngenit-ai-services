"use client";

import { useEffect, useRef } from "react";
import { SERVICES } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            const header = entry.target.querySelector('.section-header');
            if (header) {
              setTimeout(() => {
                header.classList.add('visible');
              }, 100);
            }

            // Animate cards with stagger
            const cards = entry.target.querySelectorAll('.service-card-wrapper');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, 200 + index * 80);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white" id="services" ref={sectionRef}>
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
            AI Services
          </span>
          <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
            Complete AI Services for<br />Modern Organizations
          </h2>
          <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
            From AI strategy and intelligent automation to custom applications,
            computer vision and industrial AI — we help organizations move from
            AI ideas to measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card-wrapper opacity-0 translate-y-[30px] transition-all duration-700"
            >
              <ServiceCard
                id={service.id}
                icon={service.icon}
                name={service.name}
                summary={service.summary}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .service-card-wrapper.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}