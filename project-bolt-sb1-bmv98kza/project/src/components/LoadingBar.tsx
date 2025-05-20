import React, { useEffect, useState } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      setProgress(0);
      
      interval = setInterval(() => {
        setProgress(prev => {
          // Slow down near completion to create a more realistic effect
          const increment = prev < 70 ? 7 : prev < 90 ? 3 : 1;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            clearInterval(interval);
            if (onComplete) {
              setTimeout(onComplete, 300); // Small delay for visual completion
            }
          }
          
          return newProgress;
        });
      }, 100);
    } else {
      setProgress(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, onComplete]);
  
  if (!isLoading && progress === 0) {
    return null;
  }
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 overflow-hidden transition-all">
      <div 
        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 relative"
        style={{ width: `${progress}%` }}
      >
        {/* Particles for added visual effect */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 h-full w-1 bg-white/30 animate-pulse" 
            style={{ 
              left: `${i * 20}%`, 
              animationDelay: `${i * 0.2}s`,
              opacity: isLoading ? 1 : 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingBar;