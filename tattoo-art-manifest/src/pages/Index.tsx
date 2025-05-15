import React, { useState, useRef, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import Navbar from '@/components/Navbar'; 
import Hero from '@/components/Hero'; 
import Gallery from '@/components/Gallery'; 
import BookingForm from '@/components/BookingForm'; 
import Footer from '@/components/Footer'; 
import img1 from '../asset/img1.jpg'; 
import img2 from '../asset/img2.jpg'; 
import img3 from '../asset/img3.jpg'; 
import img4 from '../asset/img4.jpg'; 
import img5 from '../asset/img5.jpg'; 
import img6 from '../asset/img6.jpg'; 
import home from '../asset/home.jpg';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  
  // Check for booking parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('booking') === 'true') {
      setIsBookingOpen(true);
    }
  }, [location]);
  
  // Placeholder images for gallery
  // These would be replaced by actual uploaded images
  const galleryImages = [
    img1, img2, img3, img4, img5, img6
  ];
  
  // Placeholder hero image
  const heroImageUrl = home;
  
  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };
  
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-tattoo-darker text-white">
      <Navbar onBookingClick={handleOpenBooking} scrollToSection={scrollToSection} />
      
      <main className="flex-grow">
        <Hero onBookingClick={handleOpenBooking} heroImageUrl={heroImageUrl} />
        <Gallery images={galleryImages} />
      </main>
      
      <Footer scrollToSection={scrollToSection} />
      
      <BookingForm isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
};

export default Index;