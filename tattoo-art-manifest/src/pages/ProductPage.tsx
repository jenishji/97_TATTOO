import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductsPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSize, setSelectedSize] = useState('large');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Simulate loading the product image
  const productImageUrl = "/src/asset/product.jpg";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePurchase = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-tattoo-darker text-white">
      <Navbar 
        onBookingClick={() => {}} 
        scrollToSection={scrollToSection} 
      />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Banner */}
        <div className="w-full bg-tattoo-dark/70 py-16 mb-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient">Premium Aftercare</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Take care of your tattoo investment with our specially formulated products
            </p>
          </div>
        </div>

        {/* Success Message Toast */}
        {showSuccessMessage && (
          <div className="fixed top-24 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-fade-in z-50 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Added to cart successfully!</span>
          </div>
        )}
        
        {/* Main Product Section - 2 Column Grid */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            {/* Left Column - Product Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-tattoo-gold">97 Tattoo Balm – Care Beyond the Needle</h3>
                <p className="text-gray-300 mb-4 text-lg">
                  Your tattoo deserves more than just ink — it deserves lasting care.
                  Introducing 97 Tattoo Balm, a premium aftercare product specially formulated to heal, protect, and preserve your tattoo. 
                  Made with natural ingredients and crafted for all skin types, this balm keeps your tattoo looking fresh and vibrant for years to come.
                </p>
                
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Why Choose 97 Tattoo Balm?</h4>
                  <ul className="space-y-2 text-gray-300 pl-1 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-tattoo-gold mt-0.5 flex-shrink-0" />
                      <span>100% Natural Formula – No chemicals, no harsh additives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-tattoo-gold mt-0.5 flex-shrink-0" />
                      <span>Soothes & Heals – Reduces redness, itchiness, and promotes faster healing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-tattoo-gold mt-0.5 flex-shrink-0" />
                      <span>Moisturizes Deeply – Keeps your skin soft and nourished without clogging pores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-tattoo-gold mt-0.5 flex-shrink-0" />
                      <span>Preserves Ink Vibrancy – Prevents fading and enhances tattoo definition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-tattoo-gold mt-0.5 flex-shrink-0" />
                      <span>Non-Greasy Finish – Lightweight texture that absorbs quickly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image & Purchase */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative perspective">
                {/* Premium Badge - Now positioned on top of the image */}
                <div className="absolute -top-5 -right-5 bg-tattoo-gold text-black font-bold rounded-full p-6 transform rotate-12 z-10">
                  <div className="transform -rotate-12">
                    <div className="text-sm">PREMIUM</div>
                    <div className="text-xl">QUALITY</div>
                  </div>
                </div>
                
                {/* Flip Card Container */}
                <div 
                  className="w-full h-[400px] cursor-pointer preserve-3d transition-all duration-700"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  onMouseEnter={() => setIsFlipped(true)}
                  onMouseLeave={() => setIsFlipped(false)}
                >
                  {/* Front - Product Image */}
                  <div 
                    className="perspective preserve-3d backface-hidden w-full h-full rounded-lg bg-cover bg-center absolute backface-hidden"
                    style={{ 
                      backgroundImage: `url(${productImageUrl || "/api/placeholder/400/400"})`,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  />
                  
                  {/* Back - Product Details Card */}
                  <div 
                    className="perspective preserve-3d backface-hidden w-full h-full rounded-lg absolute backface-hidden bg-tattoo-darker border-2 border-tattoo-gold/30"
                    style={{ 
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  >
                    <div className="p-8 h-full flex flex-col justify-center">
                      <h4 className="text-2xl font-bold text-white mb-6 text-center">Product Details</h4>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="bg-tattoo-dark/50 p-4 rounded-lg">
                          <p className="text-tattoo-gold font-semibold mb-1">Net Weight:</p>
                          <p className="text-gray-300 text-lg">50g (Large)</p>
                          <p className="text-gray-300 text-lg">30g (Small)</p>
                        </div>
                        <div className="bg-tattoo-dark/50 p-4 rounded-lg">
                          <p className="text-tattoo-gold font-semibold mb-1">Shelf Life:</p>
                          <p className="text-gray-300 text-lg">12 months</p>
                        </div>
                        <div className="bg-tattoo-dark/50 p-4 rounded-lg">
                          <p className="text-tattoo-gold font-semibold mb-1">Made in:</p>
                          <p className="text-gray-300 text-lg">India</p>
                        </div>
                        <div className="bg-tattoo-dark/50 p-4 rounded-lg">
                          <p className="text-tattoo-gold font-semibold mb-1">For inquiries:</p>
                          <a href="tel:+919316025125" className="text-gray-300 hover:text-tattoo-gold text-lg">+91 9316025125</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Size Selection and Pricing */}
                <div className="mt-8">
                  <div className="flex justify-center gap-4 mb-4">
                    <button 
                      className={`px-4 py-2 rounded ${selectedSize === 'small' 
                        ? 'bg-tattoo-gold text-black font-bold' 
                        : 'bg-tattoo-darker text-gray-300 border border-tattoo-gold/30'}`}
                      onClick={() => setSelectedSize('small')}
                    >
                      Small (30g)
                    </button>
                    <button 
                      className={`px-4 py-2 rounded ${selectedSize === 'large' 
                        ? 'bg-tattoo-gold text-black font-bold' 
                        : 'bg-tattoo-darker text-gray-300 border border-tattoo-gold/30'}`}
                      onClick={() => setSelectedSize('large')}
                    >
                      Large (50g)
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <p className="text-2xl font-semibold text-tattoo-gold">
                      ₹{selectedSize === 'small' ? '399' : '799'}.00
                    </p>
                    <Button 
                      onClick={handlePurchase}
                      className="bg-tattoo-gold hover:bg-amber-600 text-black font-semibold"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Key Ingredients and How to Use */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Key Ingredients */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-2xl font-bold text-white border-b border-tattoo-gold/30 pb-2 mb-4">Key Ingredients</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-tattoo-darker p-4 rounded-lg hover:bg-tattoo-darker/80 transition-all hover:translate-y-[-5px]">
                  <h5 className="font-semibold text-tattoo-gold">Shea Butter</h5>
                  <p className="text-sm text-gray-400">Deep hydration and skin protection</p>
                </div>
                <div className="bg-tattoo-darker p-4 rounded-lg hover:bg-tattoo-darker/80 transition-all hover:translate-y-[-5px]">
                  <h5 className="font-semibold text-tattoo-gold">Coconut Oil</h5>
                  <p className="text-sm text-gray-400">Natural antibacterial and anti-inflammatory</p>
                </div>
                <div className="bg-tattoo-darker p-4 rounded-lg hover:bg-tattoo-darker/80 transition-all hover:translate-y-[-5px]">
                  <h5 className="font-semibold text-tattoo-gold">Beeswax</h5>
                  <p className="text-sm text-gray-400">Creates a breathable shield</p>
                </div>
                <div className="bg-tattoo-darker p-4 rounded-lg hover:bg-tattoo-darker/80 transition-all hover:translate-y-[-5px]">
                  <h5 className="font-semibold text-tattoo-gold">Vitamin E</h5>
                  <p className="text-sm text-gray-400">Supports skin regeneration</p>
                </div>
                <div className="bg-tattoo-darker p-4 rounded-lg col-span-2 hover:bg-tattoo-darker/80 transition-all hover:translate-y-[-5px]">
                  <h5 className="font-semibold text-tattoo-gold">Essential Oils</h5>
                  <p className="text-sm text-gray-400">Light fragrance and added skin benefits</p>
                </div>
              </div>
            </div>
            
            {/* How to Use */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <h4 className="text-2xl font-bold text-white border-b border-tattoo-gold/30 pb-2 mb-4">How to Use</h4>
              <ol className="space-y-4 text-gray-300 list-decimal pl-5">
                <li className="p-3 bg-tattoo-darker/50 rounded-lg">
                  Wash your tattoo gently with lukewarm water and pat dry
                </li>
                <li className="p-3 bg-tattoo-darker/50 rounded-lg">
                  Apply a thin layer of 97 Tattoo Balm 2-3 times daily
                </li>
                <li className="p-3 bg-tattoo-darker/50 rounded-lg">
                  Continue use for 7–14 days or as advised by your artist
                </li>
                <li className="p-3 bg-tattoo-darker/50 rounded-lg">
                  Store in a cool, dry place
                </li>
              </ol>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-6xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '1s' }}>
            <h4 className="text-2xl md:text-3xl font-bold text-center mb-10">
              <span className="gold-gradient">Customer Reviews</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <div className="flex items-center text-tattoo-gold mb-2">
                  ★★★★★
                </div>
                <p className="text-gray-300 italic mb-4">"This balm saved my tattoo! My skin healed so much faster and the colors stayed vibrant. Highly recommend!"</p>
                <p className="text-tattoo-gold font-medium">- Rahul S.</p>
              </div>
              
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <div className="flex items-center text-tattoo-gold mb-2">
                  ★★★★★
                </div>
                <p className="text-gray-300 italic mb-4">"Non-greasy and absorbs quickly. My artist recommended this and now I won't use anything else. Worth every rupee!"</p>
                <p className="text-tattoo-gold font-medium">- Priya M.</p>
              </div>
              
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <div className="flex items-center text-tattoo-gold mb-2">
                  ★★★★★
                </div>
                <p className="text-gray-300 italic mb-4">"The natural ingredients make a huge difference. No irritation even on my sensitive skin. My sleeve looks amazing!"</p>
                <p className="text-tattoo-gold font-medium">- Vikram K.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <h4 className="text-2xl md:text-3xl font-bold text-center mb-10">
              <span className="gold-gradient">Frequently Asked Questions</span>
            </h4>
            <div className="space-y-6">
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <h5 className="text-xl font-semibold text-tattoo-gold mb-2">Is this suitable for all skin types?</h5>
                <p className="text-gray-300">Yes! Our balm is formulated for all skin types, including sensitive skin. It's hypoallergenic and free from common irritants.</p>
              </div>
              
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <h5 className="text-xl font-semibold text-tattoo-gold mb-2">How long does one container last?</h5>
                <p className="text-gray-300">Our large size (50g) typically lasts for 2-3 medium-sized tattoos, while the small size (30g) is perfect for a single tattoo or touch-up.</p>
              </div>
              
              <div className="bg-tattoo-dark p-6 rounded-lg border border-tattoo-gold/20">
                <h5 className="text-xl font-semibold text-tattoo-gold mb-2">When should I start using it after getting a tattoo?</h5>
                <p className="text-gray-300">Follow your artist's advice, but typically you can start applying 97 Tattoo Balm 24-48 hours after getting your tattoo, once the initial bandage is removed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default ProductsPage;