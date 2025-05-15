import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check screen size to determine number of visible items
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const itemsPerView = isMobile ? 1 : 3;
  const totalPages = Math.ceil(images.length / itemsPerView);

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerView;
      return nextIndex >= images.length ? 0 : nextIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500); // Match duration with transition
  };

  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - itemsPerView;
      return nextIndex < 0 ? Math.max(0, images.length - (images.length % itemsPerView || itemsPerView)) : nextIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500); // Match duration with transition
  };

  // Function to go to a specific image set
  const goToImageSet = (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const normalizedIndex = Math.floor(index / itemsPerView) * itemsPerView;
    setCurrentIndex(normalizedIndex);
    
    setTimeout(() => setIsAnimating(false), 500); // Match duration with transition
  };

  // Update carousel position
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate the percentage to translate based on the current index
      const translateXPercentage = -(currentIndex / images.length) * 100;
      carouselRef.current.style.transform = `translateX(${translateXPercentage}%)`;
    }
  }, [currentIndex, images.length]);

  return (
    <div id="gallery" className="py-20 bg-tattoo-darker relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient">Our Tattoo Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our collection of custom tattoos crafted with precision and passion. Each piece tells a unique story.
          </p>
        </div>
        
        <div className="carousel relative overflow-hidden">
          {/* Carousel container */}
          <div className="carousel-container overflow-hidden h-[350px] md:h-[450px]">
            {/* Carousel inner */}
            <div 
              ref={carouselRef} 
              className="carousel-inner flex transition-transform duration-500 ease-in-out h-full"
              style={{ width: `${(images.length / itemsPerView) * 100}%` }}
            >
              {images.map((image, index) => (
                <div 
                  key={`image-${index}`} 
                  className="carousel-item px-2"
                  style={{ width: `${100 / images.length}%` }}
                >
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative group">
                    <div
                      className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {images.length > itemsPerView && (
            <>
              <Button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3"
                size="icon"
                variant="ghost"
                disabled={isAnimating}
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </Button>
              
              <Button
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3"
                size="icon"
                variant="ghost"
                disabled={isAnimating}
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </Button>
              
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full",
                      Math.floor(currentIndex / itemsPerView) === index ? "bg-tattoo-gold" : "bg-gray-600"
                    )}
                    onClick={() => goToImageSet(index * itemsPerView)}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;