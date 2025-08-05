"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer min-w-[160px] h-[56px]"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900 shadow-lg cursor-pointer min-w-[160px] h-[56px]"
              >
                Our Services
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdQiNb2UPx29yYxkYG-uUH2NAG1N2Q8Av_pwmFdvm29KKTIbw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-teal-700 hover:bg-teal-50 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white min-w-[160px] h-[56px]"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-lg lg:max-w-xl h-72 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden relative cursor-pointer transition-transform hover:scale-105 active:scale-95 group"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSfuvpafTKOO0XNW_75ove7z9RQCFaBx_PuUVBKaV5sJ8bFW5w/viewform?usp=header",
                  "_blank"
                )
              }
            >
              <Image
                src={"/images/hero.png"}
                alt="hero image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />

              {/* Text Overlay - Centered in Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-[200px] px-4">
                  <h3 className="text-white font-extrabold text-sm md:text-base lg:text-lg leading-tight tracking-tight drop-shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    CLICK HERE FOR
                  </h3>
                  <h3 className="text-white font-extrabold text-base md:text-lg lg:text-xl leading-tight tracking-tight drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 mt-0.5">
                    TODAY'S OFFER
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
