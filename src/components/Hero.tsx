
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-grow-line');
        }
      },
      { threshold: 0.1 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-diagonal-lines opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Tagline with decoration */}
            <div className="relative inline-block">
              <div className="flex items-center">
                <div className="h-px w-6 bg-gold/70"></div>
                <p className="text-gold px-3 text-sm uppercase tracking-wider font-medium">
                  Unlock Your Connection Code
                </p>
                <div className="h-px w-6 bg-gold/70"></div>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream">
              A <span className="gold-text">Living Network</span> Experience
            </h1>
            
            {/* Animated line */}
            <div ref={lineRef} className="w-20 h-0.5 bg-gold/70 scale-x-0"></div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto">
              Join a dynamic community that embodies the principles of 
              <span className="font-medium text-gold"> The Connection Code</span>. 
              Not just a book launch—a movement where your participation creates 
              real connections.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href="#join" className="gold-btn animate-fade-in-up">
                Join The Network
              </a>
              <a href="#book" className="navy-btn animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Learn More
              </a>
            </div>
            
            {/* Interactive prompt */}
            <p className="text-sm text-cream/70 animate-pulse-gold mt-8">
              Scroll to see the Connection Map grow in real-time
            </p>
          </div>
        </div>
      </div>
      
      {/* Abstract decorative elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-gold/20 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-gold/20 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-gold/20 rounded-full opacity-20"></div>
    </section>
  );
};

export default Hero;
