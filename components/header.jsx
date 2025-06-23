"use client"

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <div>
            <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <div>
                                <Image src={"/images/LOGO.JPG"} alt='logo' width={50} height={50}/>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium transition-colors cursor-pointer"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium transition-colors cursor-pointer"
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium transition-colors cursor-pointer"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium transition-colors cursor-pointer"
                                >
                                    Contact
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-800 hover:text-teal-600 p-2"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <button
                                onClick={() => scrollToSection('home')}
                                className="block w-full text-left text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection('services')}
                                className="block w-full text-left text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="block w-full text-left text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="block w-full text-left text-gray-800 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Header