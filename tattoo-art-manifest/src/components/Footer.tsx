
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  scrollToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const navigate = useNavigate();

  const handleNavClick = (section: string) => {
    if (section === 'about') {
      navigate('/about');
    } else {
      navigate('/');
      // Add a small delay to ensure the navigation completes before scrolling
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    }
  };

  return (
    <div className="bg-tattoo-darker border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-tattoo-gold">STUDIO 97</span> TATTOO
            </h3>
            <p className="text-gray-400 mb-4">
              Premium custom tattoos crafted with precision and passion. We bring your ideas to life.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/97tattoosjaipur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-tattoo-gold text-gray-300 transition-colors"
              >
                <Instagram />
              </a>
              <a 
                href="https://facebook.com/studio97tattoo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-tattoo-gold text-gray-300 transition-colors"
              >
                <Facebook />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Jaipur</li>
              <li>Mumbai</li>
              <li>Ahmedabad</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="hover:text-tattoo-gold transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="hover:text-tattoo-gold transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('gallery')}
                  className="hover:text-tattoo-gold transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('products')}
                  className="hover:text-tattoo-gold transition-colors"
                >
                  Products
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; 2025 Studio 97 Tattoo. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <a href="tel:+919316025125" className="hover:text-tattoo-gold">+91 93160 25125</a> | <a href="mailto:97tattoosjaipur@gmail.com" className="hover:text-tattoo-gold">97tattoosjaipur@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
