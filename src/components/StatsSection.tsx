'use client'

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          {/* Left Content (60%) */}
          <div className="md:w-[60%]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore millions of offerings
            </h2>
            <p className="text-gray-600 text-lg">
              tailored to your specific needs
            </p>
          </div>

          {/* Right Content (40%) - Stats */}
          <div className="md:w-[40%] flex flex-col gap-8 border-l border-gray-200 pl-8">
            <div className="flex items-center gap-4">
              <div className="text-center flex-1">
                <p className="text-4xl font-bold text-primary">
                  {isVisible && <CountUp end={50} suffix="+" duration={2} />}
                  {!isVisible && "0+"}
                </p>
                <p className="text-gray-600 text-sm mt-1">Services</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center flex-1">
                <p className="text-4xl font-bold text-primary">
                  {isVisible && <CountUp end={7} suffix="+" duration={2} />}
                  {!isVisible && "0+"}
                </p>
                <p className="text-gray-600 text-sm mt-1">Cities</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center flex-1">
                <p className="text-4xl font-bold text-primary">
                  {isVisible && <CountUp end={5} suffix=" ⭐️" duration={2} decimals={1} />}
                  {!isVisible && "0.0 ⭐️"}
                </p>
                <p className="text-gray-600 text-sm mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Marquee Section */}
      <div className="w-full bg-primary/5 mt-12">
        <div className="overflow-hidden py-3">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4">📞 Live Customer Support</span>
            <span className="mx-4">5🌟 Rated Services</span>
            <span className="mx-4">📞 Live Customer Support</span>
            <span className="mx-4">5🌟 Rated Services</span>
            <span className="mx-4">📞 Live Customer Support</span>
            <span className="mx-4">5🌟 Rated Services</span>
          </div>
        </div>
      </div>

      {/* Section Separator */}
      <div className="container-custom">
        <hr className="border-t border-gray-200 mt-12" />
      </div>
    </section>
  );
};

export default StatsSection;