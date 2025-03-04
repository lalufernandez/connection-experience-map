
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const TheCall = () => {
  return (
    <section id="the-call" className="py-24 bg-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pattern-diagonal-lines opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Image area */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative art-deco-border p-1 lg:p-2 bg-navy-light/30 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-md">
                  <img 
                    src="/lovable-uploads/374ba205-af76-40fc-abc4-570c6699dda4.png" 
                    alt="Joe Polish smiling" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center">
                    <p className="text-cream text-lg md:text-xl italic font-medium">
                      "You're one conversation away from a breakthrough—let's make it this one. Join me."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content area */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full mb-4">
                YOUR NETWORK STARTS NOW
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The <span className="text-gold">Call</span>
              </h2>
              
              <p className="text-xl text-cream/90 mb-8 leading-relaxed">
                The Connection Code isn't just words on a page—it's a way of life. 
                Pre-order now, join the map, and let's build something extraordinary together. 
                Your next big opportunity is waiting.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a 
                  href="https://amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="gold-btn inline-flex items-center gap-2 group"
                >
                  <span>Pre-Order The Connection Code</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                
                <a 
                  href="#join" 
                  className="navy-btn inline-flex items-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Get Chapter 1 Free + Join the Map</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract decorative elements */}
      <div className="absolute bottom-1/4 left-10 w-32 h-32 border border-gold/20 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-10 w-24 h-24 border border-gold/20 rounded-full opacity-20"></div>
    </section>
  );
};

export default TheCall;
