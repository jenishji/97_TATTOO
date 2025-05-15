
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import logo from '../asset/logo.png';

interface NavbarProps {
  onBookingClick: () => void;
  scrollToSection: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookingClick, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section: string) => {
    if (section === 'about') {
      navigate('/about');
    } 
    else if(section === 'products'){
      navigate('./products')
    }
    else {
      // We're already on the home page, just scroll to the section
      navigate('/');
      // Add a small delay to ensure the navigation completes before scrolling
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-tattoo-darker py-2 shadow-md" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="no-underline flex gap-2 items-center">
            <img src={logo} alt=' ' className='w-6 h-6 font-bold'/>
            <h1 className={cn(
              "font-bold text-white transition-all duration-300",
              isScrolled ? "text-xl" : "text-2xl"
            )}>
              <span className="text-tattoo-gold">STUDIO 97</span> TATTOO
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-white hover:text-tattoo-gold transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="text-white hover:text-tattoo-gold transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('gallery')}
            className="text-white hover:text-tattoo-gold transition-colors"
          >
            Gallery
          </button>
          <button 
            onClick={() => handleNavClick('products')}
            className="text-white hover:text-tattoo-gold transition-colors"
          >
            Products
          </button>
          <Button 
            onClick={onBookingClick}
            size="sm" 
            className="bg-tattoo-gold hover:bg-amber-600 text-black font-semibold"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white" 
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-tattoo-darker animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-white hover:text-tattoo-gold transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-white hover:text-tattoo-gold transition-colors py-2"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('gallery')} 
              className="text-white hover:text-tattoo-gold transition-colors py-2"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('products')} 
              className="text-white hover:text-tattoo-gold transition-colors py-2"
            >
              Products
            </button>
            <Button 
              onClick={() => {
                onBookingClick();
                setIsMobileMenuOpen(false);
              }} 
              className="bg-tattoo-gold hover:bg-amber-600 text-black font-semibold"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
