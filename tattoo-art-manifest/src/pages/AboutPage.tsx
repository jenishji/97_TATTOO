
import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenBooking = () => {
    // Redirect to home page with booking form open
    window.location.href = '/?booking=true';
  };

  return (
    <div className="flex flex-col min-h-screen bg-tattoo-darker text-white">
      <Navbar onBookingClick={handleOpenBooking} scrollToSection={scrollToSection} />
      
      <main className="flex-grow">
        <About />
      </main>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default AboutPage;
