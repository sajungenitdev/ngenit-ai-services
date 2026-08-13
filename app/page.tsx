import ConsultSection from '@/components/Home/ConsultSection/ConsultSection';
import CtaBanner from '@/components/Home/CtaBannerSection/CtaBanner';
import Hero from '@/components/Home/HeroBanner/HeroBanner';
import IndustriesSection from '@/components/Home/IndustriesSection/IndustriesSection';
import MethodologySection from '@/components/Home/MethodologySection/MethodologySection';
import OutcomesSection from '@/components/Home/OutcomesSection/OutcomesSection';
import ServicesSection from '@/components/Home/ServicesSection/ServicesSection';
import SolutionsSection from '@/components/Home/SolutionsSection/SolutionsSection';
import TrustBar from '@/components/Home/TrustBar/TrustBar';
import WhyNgenSection from '@/components/Home/WhyNgenSection/WhyNgenSection';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <OutcomesSection />
      <IndustriesSection />
      <MethodologySection />
      <SolutionsSection/>
      <WhyNgenSection />
      <CtaBanner />
      <ConsultSection />
    </div>
  );
};

export default page;