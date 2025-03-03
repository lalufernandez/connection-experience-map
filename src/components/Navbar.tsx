
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                     ${isScrolled ? 'bg-navy-dark/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold">J</div>
              <span className="text-xl font-semibold text-cream">Joe Polish</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-link">About</a>
            <a href="#book" className="nav-link">The Book</a>
            <a href="#principles" className="nav-link">Principles</a>
            <a href="#community" className="nav-link">Community</a>
            <a href="#join" className="gold-btn !py-2">Join Now</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cream focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-navy-dark/95 backdrop-blur-md shadow-lg py-4 px-4 border-t border-gold/20 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#book" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>The Book</a>
              <a href="#principles" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Principles</a>
              <a href="#community" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Community</a>
              <a href="#join" className="gold-btn text-center" onClick={() => setIsMenuOpen(false)}>Join Now</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
