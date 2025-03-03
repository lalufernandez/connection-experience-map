
import React, { useState } from 'react';
import { toast } from "sonner";

const JoinCommunity = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Welcome to The Connection Code community!");
      setIsSubmitting(false);
      setEmail('');
      setName('');
    }, 1500);
  };
  
  return (
    <section id="join" className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pattern-diagonal-lines opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="art-deco-border bg-navy-light/40 backdrop-blur-sm">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full mb-4">
                JOIN US
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unlock Your <span className="text-gold">Connection Code</span>
              </h2>
              <p className="text-lg text-cream/80 max-w-2xl mx-auto">
                Join our community of relationship-focused leaders and get exclusive 
                access to content from Joe Polish and the growing network.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cream mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-navy border border-gold/30 focus:border-gold/70 rounded-md 
                            text-cream placeholder-cream/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cream mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-navy border border-gold/30 focus:border-gold/70 rounded-md 
                            text-cream placeholder-cream/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                    placeholder="you@example.com"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full gold-btn mt-2 flex items-center justify-center ${
                    isSubmitting ? 'opacity-80' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Join The Community'
                  )}
                </button>
              </div>
              
              <p className="text-xs text-cream/50 text-center mt-4">
                By joining, you'll receive exclusive updates about The Connection Code and related offerings.
                We respect your privacy and will never share your information.
              </p>
            </form>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-gold text-xl font-bold mb-1">Early Access</div>
                <p className="text-sm text-cream/70">Be first to get book excerpts</p>
              </div>
              
              <div className="w-px h-10 bg-gold/30 hidden sm:block"></div>
              
              <div className="flex flex-col items-center">
                <div className="text-gold text-xl font-bold mb-1">Exclusive Content</div>
                <p className="text-sm text-cream/70">Bonus materials and workshops</p>
              </div>
              
              <div className="w-px h-10 bg-gold/30 hidden sm:block"></div>
              
              <div className="flex flex-col items-center">
                <div className="text-gold text-xl font-bold mb-1">Community Access</div>
                <p className="text-sm text-cream/70">Connect with fellow members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
