
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BookPreview from '../components/BookPreview';
import Principles from '../components/Principles';
import ConnectionMap from '../components/ConnectionMap';
import JoinCommunity from '../components/JoinCommunity';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scroll functionality
  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href === '#' ? 'body' : href.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        event.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    return () => document.removeEventListener('click', handleHashLinkClick);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-navy dark">
      <Navbar />
      <Hero />
      <BookPreview />
      <Principles />
      <ConnectionMap />
      <JoinCommunity />
      <Footer />
    </div>
  );
};

export default Index;
