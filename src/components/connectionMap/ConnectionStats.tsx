
import React from 'react';

type ConnectionStatsProps = {
  nodesCount: number;
  connectionsCount: number;
};

const ConnectionStats: React.FC<ConnectionStatsProps> = ({ nodesCount, connectionsCount }) => {
  return (
    <div className="absolute bottom-4 left-4 glass-panel rounded-md px-4 py-2">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-gold animate-pulse-gold"></div>
        <p className="text-sm text-cream">
          <span className="font-bold text-gold">{nodesCount}</span> Members
        </p>
      </div>
      <div className="flex items-center space-x-2 mt-1">
        <div className="w-3 h-3 rounded-full bg-gold/50 animate-pulse-gold" style={{ animationDelay: '0.5s' }}></div>
        <p className="text-sm text-cream">
          <span className="font-bold text-gold">{connectionsCount}</span> Connections
        </p>
      </div>
    </div>
  );
};

export default ConnectionStats;
