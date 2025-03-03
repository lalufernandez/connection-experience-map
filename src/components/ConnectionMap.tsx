
import React, { useEffect, useRef, useState } from 'react';

type ConnectionNode = {
  id: number;
  x: number;
  y: number;
  size: number;
  connections: number[];
};

const ConnectionMap = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [nodes, setNodes] = useState<ConnectionNode[]>([]);
  const [connectionsCount, setConnectionsCount] = useState(0);
  
  // Create initial network
  useEffect(() => {
    const initialNodes: ConnectionNode[] = [];
    
    // Create center node (Joe Polish)
    initialNodes.push({
      id: 0,
      x: 50,
      y: 50,
      size: 15,
      connections: []
    });
    
    // Add some initial connections
    for (let i = 1; i < 15; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const distance = 25 + Math.random() * 10;
      
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      initialNodes.push({
        id: i,
        x: x,
        y: y,
        size: 3 + Math.random() * 3,
        connections: [0] // Connected to center node
      });
      
      // Update center node's connections
      initialNodes[0].connections.push(i);
    }
    
    // Add some random connections between nodes
    for (let i = 1; i < initialNodes.length; i++) {
      const numConnections = Math.floor(Math.random() * 3);
      
      for (let j = 0; j < numConnections; j++) {
        let targetId;
        
        do {
          targetId = 1 + Math.floor(Math.random() * (initialNodes.length - 1));
        } while (targetId === i || initialNodes[i].connections.includes(targetId));
        
        initialNodes[i].connections.push(targetId);
        initialNodes[targetId].connections.push(i);
      }
    }
    
    setNodes(initialNodes);
    
    // Count total connections
    let total = 0;
    initialNodes.forEach(node => {
      total += node.connections.length;
    });
    setConnectionsCount(total / 2); // Divide by 2 because each connection is counted twice
    
    // After 3 seconds, start adding new connections
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle drawing and animation
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions based on container
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Animation function
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 0.5;
      
      nodes.forEach(node => {
        const startX = (node.x / 100) * canvas.width;
        const startY = (node.y / 100) * canvas.height;
        
        node.connections.forEach(connId => {
          const targetNode = nodes.find(n => n.id === connId);
          if (targetNode) {
            const endX = (targetNode.x / 100) * canvas.width;
            const endY = (targetNode.y / 100) * canvas.height;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;
        const size = node.size;
        
        ctx.beginPath();
        
        // Joe Polish node (center)
        if (node.id === 0) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          gradient.addColorStop(0, '#F4CF60');
          gradient.addColorStop(1, '#AA8C20');
          
          ctx.fillStyle = gradient;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add a glow effect
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          ctx.shadowBlur = 10;
          ctx.arc(x, y, size + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Regular nodes
          const connections = node.connections.length;
          let color;
          
          if (connections > 3) {
            color = 'rgba(212, 175, 55, 0.8)';
          } else if (connections > 1) {
            color = 'rgba(212, 175, 55, 0.6)';
          } else {
            color = 'rgba(212, 175, 55, 0.4)';
          }
          
          ctx.fillStyle = color;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Continue animation
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(render);
    
    // Every few seconds, add a new connection if not in generating state
    const growInterval = setInterval(() => {
      if (!isGenerating) {
        addNewConnection();
      }
    }, 2000);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
      clearInterval(growInterval);
    };
  }, [nodes, isGenerating]);
  
  // Add a new connection to the network
  const addNewConnection = () => {
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      
      // Create a new node
      const id = newNodes.length;
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      // Decide whether to connect to center or another node
      const connectToCenter = Math.random() > 0.4;
      const connectionId = connectToCenter ? 0 : 1 + Math.floor(Math.random() * (newNodes.length - 1));
      
      const newNode: ConnectionNode = {
        id,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
        size: 2 + Math.random() * 3,
        connections: [connectionId]
      };
      
      // Update target node's connections
      const targetNode = newNodes.find(n => n.id === connectionId);
      if (targetNode) {
        targetNode.connections.push(id);
      }
      
      // Maybe add one more random connection
      if (Math.random() > 0.7) {
        let secondConnId;
        do {
          secondConnId = Math.floor(Math.random() * newNodes.length);
        } while (secondConnId === connectionId || secondConnId === id);
        
        newNode.connections.push(secondConnId);
        
        const secondNode = newNodes.find(n => n.id === secondConnId);
        if (secondNode) {
          secondNode.connections.push(id);
        }
      }
      
      newNodes.push(newNode);
      
      // Update connection count
      setConnectionsCount(prev => prev + newNode.connections.length);
      
      return newNodes;
    });
  };
  
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
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img 
                src="/lovable-uploads/374ba205-af76-40fc-abc4-570c6699dda4.png" 
                alt="The Connection Code" 
                className="w-24 h-auto opacity-70 loading-key"
              />
              <p className="text-gold mt-4 animate-pulse">Generating network...</p>
            </div>
          ) : null}
          
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
          
          <div className="absolute bottom-4 left-4 glass-panel rounded-md px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gold animate-pulse-gold"></div>
              <p className="text-sm text-cream">
                <span className="font-bold text-gold">{nodes.length}</span> Members
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-gold/50 animate-pulse-gold" style={{ animationDelay: '0.5s' }}></div>
              <p className="text-sm text-cream">
                <span className="font-bold text-gold">{connectionsCount}</span> Connections
              </p>
            </div>
          </div>
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
