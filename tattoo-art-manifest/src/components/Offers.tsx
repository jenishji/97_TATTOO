import React from 'react';
import { Sparkles, Tag, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OfferItem {
  title: string;
  description: string;
  discount: string;
  expiry?: string;
  icon: React.ReactNode;
}

const Offers: React.FC = () => {
  const offers: OfferItem[] = [
    {
      title: "First-Timer Special",
      description: "New to tattoos? Get your first piece at a special rate!",
      discount: "20% OFF",
      expiry: "Limited time offer",
      icon: <Sparkles className="h-10 w-10 text-amber-400" />
    },
    {
      title: "Bring-a-Friend Discount",
      description: "Bring a friend for a tattoo session and both get a discount",
      discount: "15% OFF",
      icon: <Tag className="h-10 w-10 text-amber-400" />
    },
    {
      title: "Flash Day Special",
      description: "Every last Saturday of the month. Pre-designed tattoos at special rates!",
      discount: "Up to 30% OFF",
      expiry: "One day only, monthly",
      icon: <Clock className="h-10 w-10 text-amber-400" />
    },
    {
      title: "Loyalty Program",
      description: "Get discounts on your subsequent tattoos",
      discount: "10% OFF",
      expiry: "For returning clients",
      icon: <Percent className="h-10 w-10 text-amber-400" />
    }
  ];

  return (
    <div id="offers" className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">
            Exclusive Offers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Limited-time discounts and special promotions for our tattoo enthusiasts.
            Don't miss your chance to get inked at the best prices!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={`offer-${index}`}
              className="bg-gray-900 border-2 border-gray-800 rounded-xl p-8 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6 bg-gray-800 p-4 rounded-full inline-block">
                {offer.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{offer.title}</h3>
              <p className="text-gray-300 mb-6 text-md">{offer.description}</p>
              <div className="text-amber-400 text-3xl font-bold mb-3">{offer.discount}</div>
              {offer.expiry && (
                <p className="text-sm text-gray-400">{offer.expiry}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* <div className="mt-20">
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-0.5 rounded-2xl max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-10">
              <h3 className="text-amber-400 text-3xl font-bold mb-4">Limited Time Mega Offer!</h3>
              <p className="text-gray-200 mb-8 text-lg">
                Book your custom full sleeve tattoo before June 30th and get a
                complimentary touch-up session worth ₹5,000 absolutely free!
              </p>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-6 text-lg rounded-xl transition-colors duration-300"
              >
                Claim This Offer
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Offers;