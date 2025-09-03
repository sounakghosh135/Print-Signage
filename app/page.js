import React from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Footer from '@/components/footer';
import Contact from '@/components/contact';
import Services from '@/components/services';
import ReviewsSection from '@/components/ReviewsSection';

const PrintSignageWebsite = () => {
  

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* About Section */}
      <About />

      {/* Review section */}
      <ReviewsSection />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrintSignageWebsite;