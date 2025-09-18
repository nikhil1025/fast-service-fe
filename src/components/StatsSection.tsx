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
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Left Content (60%) */}
          <div className="w-full lg:w-[60%] text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Explore millions of offerings
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              tailored to your specific needs
            </p>
          </div>

          {/* Right Content (40%) - Stats */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 lg:gap-8 lg:border-l border-gray-200 lg:pl-8">
            <div className="flex flex-row items-center justify-around gap-6 sm:gap-4">
              <div className="text-center flex-1">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  {/* {isVisible && <CountUp end={50} suffix="+" duration={2} />}
                  {!isVisible && "0+"} */}
                  3,000+
                </p>
                <p className="text-gray-600 text-sm mt-1">Services</p>
              </div>

              <div className="hidden sm:block h-12 w-px bg-gray-200" />

              <div className="text-center flex-1">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  {isVisible && <CountUp end={7} suffix="+" duration={2} />}
                  {!isVisible && "0+"}
                </p>
                <p className="text-gray-600 text-sm mt-1">Cities</p>
              </div>

              <div className="hidden sm:block h-12 w-px bg-gray-200" />

              <div className="text-center flex-1">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  {isVisible && (
                    <CountUp end={5} suffix=" ⭐️" duration={2} decimals={1} />
                  )}
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
          <div className="animate-marquee whitespace-nowrap text-sm sm:text-base">
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