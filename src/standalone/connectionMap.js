
// Standalone Connection Map for GHL Integration
(function() {
  // Configuration options
  const config = {
    containerId: 'connection-map-container', // The ID of the container element
    backgroundColor: '#0D1B2A',
    nodeColor: '#D4AF37',
    lineColor: 'rgba(212, 175, 55, 0.3)',
    centerNodeSize: 15,
    regularNodeSize: 4,
    updateInterval: 2000 // Time in ms between adding new nodes
  };

  // Internal state
  let nodes = [];
  let connectionsCount = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let animationId = null;
  let isGenerating = true;

  // Canvas elements
  let canvas, ctx, container, statsElement;

  // Initialize the map
  function init() {
    // Create container if it doesn't exist
    container = document.getElementById(config.containerId);
    if (!container) {
      console.error('Connection map container not found. Please add a div with id="' + config.containerId + '"');
      return;
    }

    // Set container style
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '0';
    container.style.paddingBottom = '100%'; // Maintain aspect ratio
    container.style.backgroundColor = config.backgroundColor;
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    container.style.border = '1px solid rgba(212, 175, 55, 0.3)';
    
    // Add art deco border decorations
    addArtDecoBorder(container);

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.left = '0';
    canvas.style.top = '0';
    container.appendChild(canvas);

    // Create stats element
    statsElement = document.createElement('div');
    statsElement.style.position = 'absolute';
    statsElement.style.bottom = '16px';
    statsElement.style.left = '16px';
    statsElement.style.backgroundColor = 'rgba(27, 38, 59, 0.6)';
    statsElement.style.backdropFilter = 'blur(8px)';
    statsElement.style.borderRadius = '4px';
    statsElement.style.padding = '8px 16px';
    statsElement.style.color = '#F0E6D2';
    statsElement.style.fontSize = '14px';
    statsElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    statsElement.style.border = '1px solid rgba(212, 175, 55, 0.1)';
    container.appendChild(statsElement);

    // Show loading message
    const loadingElement = document.createElement('div');
    loadingElement.id = 'connection-map-loading';
    loadingElement.style.position = 'absolute';
    loadingElement.style.inset = '0';
    loadingElement.style.display = 'flex';
    loadingElement.style.flexDirection = 'column';
    loadingElement.style.alignItems = 'center';
    loadingElement.style.justifyContent = 'center';
    loadingElement.style.backgroundColor = config.backgroundColor;
    loadingElement.style.zIndex = '1';
    
    const keyIcon = document.createElement('div');
    keyIcon.style.width = '96px';
    keyIcon.style.height = '96px';
    keyIcon.style.opacity = '0.7';
    keyIcon.style.marginBottom = '16px';
    keyIcon.style.animation = 'pulse-key 1.5s infinite alternate ease-in-out';
    keyIcon.innerHTML = `
      <svg viewBox="0 0 100 100" fill="#D4AF37">
        <path d="M60,20 C60,20 65,25 70,35 C75,45 75,55 70,65 C65,75 60,80 60,80 L40,80 C40,80 35,75 30,65 C25,55 25,45 30,35 C35,25 40,20 40,20 L60,20 Z M50,35 C53,35 55,37 55,40 C55,43 53,45 50,45 C47,45 45,43 45,40 C45,37 47,35 50,35 Z M50,50 L50,70 L55,70 L55,60 L60,60 L60,70 L65,70 L65,50 L50,50 Z"/>
      </svg>
    `;
    
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Generating network...';
    loadingText.style.color = '#D4AF37';
    loadingText.style.animation = 'pulse 2s infinite alternate';
    
    loadingElement.appendChild(keyIcon);
    loadingElement.appendChild(loadingText);
    container.appendChild(loadingElement);

    // Add styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes pulse-key {
        0% { transform: scale(0.98) rotate(-3deg); opacity: 0.7; }
        100% { transform: scale(1.02) rotate(3deg); opacity: 1; }
      }
      @keyframes pulse {
        0% { opacity: 0.5; }
        100% { opacity: 1; }
      }
      .connection-dot-pulse {
        animation: pulse 2s infinite alternate;
      }
    `;
    document.head.appendChild(styleEl);

    // Get context and resize
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize nodes
    createInitialNodes();
    
    // Start rendering
    render();

    // After 3 seconds, hide loading overlay and start adding nodes
    setTimeout(() => {
      const loadingEl = document.getElementById('connection-map-loading');
      if (loadingEl) {
        loadingEl.style.opacity = '0';
        loadingEl.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          if (loadingEl.parentNode) {
            loadingEl.parentNode.removeChild(loadingEl);
          }
        }, 500);
      }
      isGenerating = false;
      
      // Start adding nodes every few seconds
      setInterval(addNewConnection, config.updateInterval);
    }, 3000);
  }

  // Add art deco border to the container
  function addArtDecoBorder(element) {
    // Top left corner
    const topLeft = document.createElement('div');
    topLeft.style.position = 'absolute';
    topLeft.style.top = '-2px';
    topLeft.style.left = '-2px';
    topLeft.style.width = '32px';
    topLeft.style.height = '32px';
    topLeft.style.borderTop = '2px solid rgba(212, 175, 55, 0.6)';
    topLeft.style.borderLeft = '2px solid rgba(212, 175, 55, 0.6)';
    element.appendChild(topLeft);
    
    // Bottom right corner
    const bottomRight = document.createElement('div');
    bottomRight.style.position = 'absolute';
    bottomRight.style.bottom = '-2px';
    bottomRight.style.right = '-2px';
    bottomRight.style.width = '32px';
    bottomRight.style.height = '32px';
    bottomRight.style.borderBottom = '2px solid rgba(212, 175, 55, 0.6)';
    bottomRight.style.borderRight = '2px solid rgba(212, 175, 55, 0.6)';
    element.appendChild(bottomRight);
  }

  // Resize canvas to match container
  function resizeCanvas() {
    if (!canvas || !container) return;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvasWidth = rect.width;
    canvasHeight = rect.height;
  }

  // Create initial network of nodes
  function createInitialNodes() {
    nodes = [];
    
    // Create center node (Joe Polish)
    nodes.push({
      id: 0,
      x: 50,
      y: 50,
      size: config.centerNodeSize,
      connections: []
    });
    
    // Add initial connections
    for (let i = 1; i < 15; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const distance = 25 + Math.random() * 10;
      
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      nodes.push({
        id: i,
        x: x,
        y: y,
        size: 3 + Math.random() * 3,
        connections: [0] // Connected to center node
      });
      
      // Update center node's connections
      nodes[0].connections.push(i);
    }
    
    // Add some random connections between nodes
    for (let i = 1; i < nodes.length; i++) {
      const numConnections = Math.floor(Math.random() * 3);
      
      for (let j = 0; j < numConnections; j++) {
        let targetId;
        
        do {
          targetId = 1 + Math.floor(Math.random() * (nodes.length - 1));
        } while (targetId === i || nodes[i].connections.includes(targetId));
        
        nodes[i].connections.push(targetId);
        nodes[targetId].connections.push(i);
      }
    }
    
    // Count total connections
    countConnections();
  }

  // Count all connections in the network
  function countConnections() {
    let total = 0;
    nodes.forEach(node => {
      total += node.connections.length;
    });
    connectionsCount = total / 2; // Divide by 2 because each connection is counted twice
    
    // Update stats display
    updateStats();
  }

  // Update stats display
  function updateStats() {
    if (!statsElement) return;
    
    statsElement.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <div class="connection-dot-pulse" style="width: 10px; height: 10px; border-radius: 50%; background-color: #D4AF37; margin-right: 8px;"></div>
        <span><strong style="color: #D4AF37;">${nodes.length}</strong> Members</span>
      </div>
      <div style="display: flex; align-items: center;">
        <div class="connection-dot-pulse" style="width: 10px; height: 10px; border-radius: 50%; background-color: rgba(212, 175, 55, 0.5); margin-right: 8px; animation-delay: 0.5s;"></div>
        <span><strong style="color: #D4AF37;">${connectionsCount}</strong> Connections</span>
      </div>
    `;
  }

  // Add a new connection to the network
  function addNewConnection() {
    // Create a new node
    const id = nodes.length;
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 40;
    
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    
    // Decide whether to connect to center or another node
    const connectToCenter = Math.random() > 0.4;
    const connectionId = connectToCenter ? 0 : 1 + Math.floor(Math.random() * (nodes.length - 1));
    
    const newNode = {
      id,
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
      size: 2 + Math.random() * 3,
      connections: [connectionId]
    };
    
    // Update target node's connections
    const targetNode = nodes.find(n => n.id === connectionId);
    if (targetNode) {
      targetNode.connections.push(id);
    }
    
    // Maybe add one more random connection
    if (Math.random() > 0.7) {
      let secondConnId;
      do {
        secondConnId = Math.floor(Math.random() * nodes.length);
      } while (secondConnId === connectionId || secondConnId === id);
      
      newNode.connections.push(secondConnId);
      
      const secondNode = nodes.find(n => n.id === secondConnId);
      if (secondNode) {
        secondNode.connections.push(id);
      }
    }
    
    nodes.push(newNode);
    
    // Update connection count
    countConnections();
  }

  // Render the connection map
  function render() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw connections
    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = 0.5;
    
    nodes.forEach(node => {
      const startX = (node.x / 100) * canvasWidth;
      const startY = (node.y / 100) * canvasHeight;
      
      node.connections.forEach(connId => {
        const targetNode = nodes.find(n => n.id === connId);
        if (targetNode) {
          const endX = (targetNode.x / 100) * canvasWidth;
          const endY = (targetNode.y / 100) * canvasHeight;
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      });
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const x = (node.x / 100) * canvasWidth;
      const y = (node.y / 100) * canvasHeight;
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
    animationId = requestAnimationFrame(render);
  }

  // Public API
  window.ConnectionMap = {
    init: init,
    addConnection: addNewConnection
  };
})();
