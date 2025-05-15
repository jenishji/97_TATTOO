import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  onBookingClick: () => void;
  heroImageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick, heroImageUrl }) => {
  const heroStyle = {
    '--image-url': `url(${heroImageUrl})`,
  } as React.CSSProperties;

  return (
    <div 
      id="home"
      className="min-h-screen flex items-center relative hero-gradient"
      style={heroStyle}
    >
      <div className="container mx-auto px-4 md:px-6 py-32 pt-40">
        <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            <span className="block">Ink Your Story</span>
            <span className="gold-gradient">with Precision & Passion</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in opacity-90" style={{ animationDelay: '0.2s' }}>
            Premium Custom Tattoos | Doorstep & Studio Services<br />
            <span className="font-semibold">Jaipur, Mumbai, Ahmedabad</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={onBookingClick}
              className={cn(
                "bg-tattoo-gold hover:bg-amber-600 text-black font-semibold px-8 py-6",
                "flex items-center gap-2 text-lg transition-all duration-300"
              )}
            >
              Book Your Session <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                const offersSection = document.getElementById('offers');
                if (offersSection) {
                  offersSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                "border-white/30 hover:border-white text-white hover:text-white",
                "px-8 py-6 text-lg hover:bg-white/10 transition-all duration-300"
              )}
            >
              View Offers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;