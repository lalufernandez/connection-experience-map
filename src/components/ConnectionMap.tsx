
import React, { useRef } from 'react';
import ConnectionCanvas from './connectionMap/ConnectionCanvas';
import ConnectionStats from './connectionMap/ConnectionStats';
import { useConnectionNetwork } from '@/hooks/useConnectionNetwork';

const ConnectionMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isGenerating, nodes, connectionsCount } = useConnectionNetwork();
  
  return (
    <section id="community" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full mb-4">
            LIVE CONNECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Connection Map
          </h2>
          <p className="text-lg text-cream/80 max-w-2xl mx-auto">
            Watch as our community grows in real-time. Every dot represents a person, 
            every line a connection made through shared values and goals.
          </p>
        </div>
        
        <div ref={containerRef} className="relative w-full aspect-square max-w-3xl mx-auto bg-navy-dark/50 rounded-lg overflow-hidden art-deco-border">
          <ConnectionCanvas 
            nodes={nodes} 
            containerRef={containerRef} 
            isGenerating={isGenerating} 
          />
          
          <ConnectionStats 
            nodesCount={nodes.length} 
            connectionsCount={connectionsCount} 
          />
        </div>
        
        <div className="mt-10 text-center">
          <a href="#join" className="gold-btn inline-flex items-center">
            <span>Join The Network</span>
          </a>
          <p className="text-sm text-cream/50 mt-4">
            Every new member enriches our community's collective wisdom.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectionMap;
