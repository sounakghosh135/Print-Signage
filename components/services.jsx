"use client"

import { services } from '@/public/constants';
import React, { useState } from 'react'
import { ChevronDown, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Services = () => {
    const [showMoreServices, setShowMoreServices] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);

    const visibleServices = showMoreServices ? services : services.slice(0, 3);

    const handleOrderPlacement = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdQiNb2UPx29yYxkYG-uUH2NAG1N2Q8Av_pwmFdvm29KKTIbw/viewform?usp=sf_link', '_blank');
    };

    return (
        <section id="services" className="py-24 bg-gradient-to-br from-teal-50 via-white to-teal-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Enhanced Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-teal-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover our comprehensive range of professional services designed to elevate your business
                    </p>
                </div>

                {/* Enhanced Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {visibleServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-teal-500/10 relative">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                {/* Image section with enhanced styling */}
                                <div className={`h-56 ${service.color} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <div className="relative z-10 p-6 h-full flex items-center justify-center">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            width={200}
                                            height={200}
                                            className="object-contain w-full h-full max-w-[180px] transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Enhanced Content section */}
                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-teal-700 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed text-center">
                                        {service.description}
                                    </p>

                                    {/* Progress indicator */}
                                    <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-700 ${hoveredService === service.id ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Show More Button */}
                <div className="text-center mb-20">
                    <button
                        onClick={() => setShowMoreServices(!showMoreServices)}
                        className="group bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center mx-auto backdrop-blur-sm border border-teal-500/20"
                    >
                        <span className="mr-3">
                            {showMoreServices ? 'Show Less' : 'Show More Services'}
                        </span>
                        <ChevronDown
                            className={`transform transition-transform duration-500 group-hover:scale-110 ${showMoreServices ? 'rotate-180' : ''}`}
                            size={20}
                        />
                    </button>
                </div>

                {/* Enhanced Order Placement Section */}
                <div className="relative">
                    <div className="bg-gradient-to-br from-white via-white/95 to-teal-50/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 max-w-4xl mx-auto relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700"></div>

                        <div className="relative z-10 text-center">

                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-800 bg-clip-text text-transparent mb-6">
                                Ready to Get Started?
                            </h3>
                            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                                Place your order now and let us help you achieve your goals with our professional services.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={handleOrderPlacement}
                                    className="group bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-700 hover:via-teal-800 hover:to-teal-700 text-white font-bold px-6 py-5 md:px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center text-lg cursor-pointer backdrop-blur-sm border border-teal-500/20 relative overflow-hidden"
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                                    <ShoppingCart className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
                                    <span className="relative z-10">Place Order Now</span>
                                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;