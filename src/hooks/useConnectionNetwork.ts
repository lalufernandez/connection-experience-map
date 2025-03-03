
import { useState, useEffect } from 'react';
import { ConnectionNode } from '@/types/connectionMap';

export const useConnectionNetwork = () => {
  const [isGenerating, setIsGenerating] = useState(true);
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

  // Effect to grow the network periodically
  useEffect(() => {
    if (isGenerating) return;
    
    const growInterval = setInterval(() => {
      addNewConnection();
    }, 2000);
    
    return () => clearInterval(growInterval);
  }, [isGenerating]);

  return {
    isGenerating,
    nodes,
    connectionsCount
  };
};
