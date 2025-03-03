
import React from 'react';

const BookPreview = () => {
  return (
    <section id="book" className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-diagonal-lines opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Book Cover */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 md:w-80 aspect-[1/1.6] rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(212,175,55,0.2)] transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="/lovable-uploads/374ba205-af76-40fc-abc4-570c6699dda4.png" 
                  alt="The Connection Code by Joe Polish" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-gold/30 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 border border-gold/30 rounded-full opacity-50"></div>
            </div>
          </div>
          
          {/* Book Info */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full mb-4">
              NEW RELEASE
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The Connection Code
            </h2>
            
            <h3 className="text-xl text-gold mb-6">
              How to Build a Powerful Network That Changes Everything
            </h3>
            
            <p className="text-lg text-cream/90 mb-6">
              In "The Connection Code," Joe Polish reveals the transformative power of strategic relationships 
              and how to cultivate them authentically. Drawing from decades of building one of the world's most 
              respected business networks, Joe shares his proven system for turning casual contacts into valuable 
              connections.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-md">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <span className="text-sm text-cream/90">Revolutionary Networking Strategies</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-md">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <span className="text-sm text-cream/90">Relationship-Building Principles</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-md">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <span className="text-sm text-cream/90">Practical Connection Frameworks</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#join" 
                className="gold-btn"
              >
                Pre-Order Now
              </a>
              <a 
                href="#principles" 
                className="navy-btn"
              >
                Explore Principles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPreview;
