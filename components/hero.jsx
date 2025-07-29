"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="pt-16 relative min-h-screen flex items-center"
    >
      {/* Background with printer image effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-blue-600/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 flex flex-col gap-1 md:gap-1.5 lg:gap-2">
              <span>Get Eye-Catching</span>
              <span>Sign Boards for</span>
              <span>Your Business</span>
            </h1>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Our Services
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdQiNb2UPx29yYxkYG-uUH2NAG1N2Q8Av_pwmFdvm29KKTIbw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-teal-700 font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden relative">
              <Image
                src={"/images/hero.png"}
                alt="hero image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
