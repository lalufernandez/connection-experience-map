
import React from 'react';
import ConnectionMap from '../components/ConnectionMap';

const StandaloneConnectionMap = () => {
  return (
    <div className="bg-navy min-h-screen">
      <ConnectionMap />
      
      {/* CSS Variables and Base Styles - Include this in your GHL funnel */}
      <style>
        {`
        :root {
          --color-navy: #0D1B2A;
          --color-navy-dark: #080F18;
          --color-navy-light: #1B263B;
          --color-gold: #D4AF37;
          --color-cream: #F0E6D2;
        }
        
        .bg-navy {
          background-color: var(--color-navy);
        }
        
        .bg-navy-dark {
          background-color: var(--color-navy-dark);
        }
        
        .bg-gold {
          background-color: var(--color-gold);
        }
        
        .text-gold {
          color: var(--color-gold);
        }
        
        .text-cream {
          color: var(--color-cream);
        }
        
        .border-gold {
          border-color: var(--color-gold);
        }
        
        .gold-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          background-color: var(--color-gold);
          color: var(--color-navy-dark);
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .gold-btn:hover {
          background-color: transparent;
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
        
        .navy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          background-color: var(--color-navy-light);
          color: var(--color-cream);
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          border: 1px solid var(--color-navy-light);
        }
        
        .navy-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
        
        .glass-panel {
          background: rgba(27, 38, 59, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }
        
        .art-deco-border {
          position: relative;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        
        .art-deco-border::before,
        .art-deco-border::after {
          content: '';
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-color: var(--color-gold);
          opacity: 0.6;
        }
        
        .art-deco-border::before {
          top: -2px;
          left: -2px;
          border-top: 2px solid;
          border-left: 2px solid;
        }
        
        .art-deco-border::after {
          bottom: -2px;
          right: -2px;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }
        
        @keyframes pulse-gold {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-gold {
          animation: pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .loading-key {
          animation: loadingKey 3s infinite;
        }
        
        @keyframes loadingKey {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(0);
            opacity: 0.7;
          }
        }
        `}
      </style>
    </div>
  );
};

export default StandaloneConnectionMap;
