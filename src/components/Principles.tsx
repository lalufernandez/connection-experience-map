
import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const principles = [
  {
    id: 1,
    title: "Give First",
    description: "Success comes from creating value before expecting anything in return. By helping others achieve their goals, you create a network eager to support you."
  },
  {
    id: 2,
    title: "Build Authentic Connections",
    description: "True networking transcends transactions. Develop genuine relationships based on mutual respect, shared values, and common interests."
  },
  {
    id: 3,
    title: "Create Value Multipliers",
    description: "Structure your networking efforts to create exponential returns. Position yourself at the center of value creation for maximum impact."
  },
  {
    id: 4,
    title: "Leverage Strategic Relationships",
    description: "Not all connections have equal importance. Identify and nurture relationships that align with your vision and can accelerate progress."
  },
  {
    id: 5,
    title: "Embrace Reciprocity",
    description: "The most valuable networks function on balanced give-and-take. Foster an environment where support flows naturally in all directions."
  }
];

const Principles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  return (
    <section id="principles" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full mb-4">
            THE PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core Principles of <span className="text-gold">The Connection Code</span>
          </h2>
          <p className="text-lg text-cream/80 max-w-2xl mx-auto">
            Joe Polish has distilled decades of relationship-building expertise into 
            these fundamental principles that can transform your network and life.
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="art-deco-border bg-navy-light/50 opacity-0 translate-y-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-gold mr-3 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-cream">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-cream/80 flex-grow">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#join" className="gold-btn inline-flex">
            Join Our Community
          </a>
          <p className="text-sm text-cream/60 mt-4">
            Experience these principles in action within our growing network.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-40 h-40 rounded-full bg-gold/5 -z-10"></div>
      <div className="absolute bottom-20 right-0 w-60 h-60 rounded-full bg-gold/5 -z-10"></div>
    </section>
  );
};

export default Principles;
