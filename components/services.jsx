"use client"

import { services } from '@/public/constants';
import React, { useState } from 'react'
import { ChevronDown, ShoppingCart } from 'lucide-react';
import Image from 'next/image';


const Services = () => {

    const [showMoreServices, setShowMoreServices] = useState(false);

    const visibleServices = showMoreServices ? services : services.slice(0, 3);

    const handleOrderPlacement = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdQiNb2UPx29yYxkYG-uUH2NAG1N2Q8Av_pwmFdvm29KKTIbw/viewform?usp=sf_link', '_blank');
    };

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">Services</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative">
                            {/* Image section - full width at top */}
                            <div className={`h-48 ${service.color} p-4`}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={200}
                                    height={200}
                                    className="object-contain w-full h-full max-w-none"
                                />
                            </div>

                            {/* Content section */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed text-center">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => setShowMoreServices(!showMoreServices)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                    >
                        {showMoreServices ? 'Show Less' : 'Show More Services'}
                        <ChevronDown
                            className={`ml-2 transform transition-transform duration-300 ${showMoreServices ? 'rotate-180' : ''}`}
                            size={20}
                        />
                    </button>
                </div>
            </div>

            {/* Order Placement Section */}
            <div className="mt-16 text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-600 text-lg mb-6">
                        Place your order now and let us help you achieve your goals with our professional services.
                    </p>
                    <button
                        onClick={handleOrderPlacement}
                        className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto text-lg cursor-pointer"
                    >
                        <ShoppingCart className="mr-3" size={24} />
                        Place Order
                    </button>
                </div>
            </div>
        </section >
    )
}

export default Services
