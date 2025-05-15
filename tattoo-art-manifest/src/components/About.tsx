
import React from 'react';
import { cn } from '@/lib/utils';
import product2 from '../asset/product2.jpg';

const About: React.FC = () => {
  return (
    <div id="about" className="py-20 bg-tattoo-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gold-gradient">About Studio 97 Tattoo</span>
            </h2>
            <div className="w-24 h-1 bg-tattoo-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-ratio-1/1 rounded-lg overflow-hidden">
                <div 
                  className="w-full h-[400px] bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${product2})`,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                    transform: 'rotate(-180deg)'
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-tattoo-gold">Crafting Artistic Expressions Since 2019</h3>
              <p className="text-gray-300">
                At Studio 97 Tattoo, we blend creativity with hygiene to craft tattoos that tell your story. Based in Jaipur with services across Mumbai and Ahmedabad, we offer both in-studio and doorstep tattooing experiences. Our mission is simple — to give you timeless, meaningful tattoos in a safe, relaxed environment.
              </p>
              <p className="text-gray-300">
                Our team of skilled artists specializes in various tattooing styles, from intricate blackwork to vibrant realism. We pride ourselves on our attention to detail, hygiene standards, and the personal touch we bring to each design.
              </p>
              <p className="text-gray-300">
                Whether you're looking for your first tattoo or adding to your collection, our expert artists will guide you through the process, ensuring your vision comes to life with precision and passion.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-tattoo-darker rounded-lg">
                  <h4 className="font-bold text-xl text-tattoo-gold">500+</h4>
                  <p className="text-sm text-gray-400">Happy Clients</p>
                </div>
                <div className="text-center p-4 bg-tattoo-darker rounded-lg">
                  <h4 className="font-bold text-xl text-tattoo-gold">3</h4>
                  <p className="text-sm text-gray-400">Studio Locations</p>
                </div>
                <div className="text-center p-4 bg-tattoo-darker rounded-lg">
                  <h4 className="font-bold text-xl text-tattoo-gold">6+</h4>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-tattoo-darker rounded-lg">
                  <h4 className="font-bold text-xl text-tattoo-gold">100%</h4>
                  <p className="text-sm text-gray-400">Sterilized Equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
