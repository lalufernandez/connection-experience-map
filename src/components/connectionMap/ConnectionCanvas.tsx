
import React, { useEffect, useRef } from 'react';
import { ConnectionNode } from '@/types/connectionMap';

type ConnectionCanvasProps = {
  nodes: ConnectionNode[];
  containerRef: React.RefObject<HTMLDivElement>;
  isGenerating: boolean;
};

const ConnectionCanvas: React.FC<ConnectionCanvasProps> = ({ nodes, containerRef, isGenerating }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

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
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [nodes, containerRef]);

  return (
    <>
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
    </>
  );
};

export default ConnectionCanvas;
