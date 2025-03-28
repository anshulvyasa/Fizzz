"use client";

import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/HowItWorks";

export default function Home() {

  return (
    <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
     <HeroSection/>
     <FeatureSection/>
     <HowItWorksSection/>
    </div>
  );
}
