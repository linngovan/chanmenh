import React from 'react';

export const YinYangSymbol: React.FC<{ className?: string, spinning?: boolean }> = ({ className = "", spinning = false }) => {
  return (
    <div className={`relative rounded-full border border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.5)] overflow-hidden ${className} ${spinning ? 'animate-[spin_2s_linear_infinite]' : ''}`} style={{ width: '100%', height: '100%' }}>
      {/* Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1e1b4b]"></div> {/* indigo-950 */}
      
      {/* Top circle (Dark in White side) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full" style={{ top: '0', width: '50%', height: '50%' }}></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1e1b4b] rounded-full shadow-inner" style={{ top: '25%', width: '15%', height: '15%' }}></div>

      {/* Bottom circle (White in Dark side) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#1e1b4b] rounded-full" style={{ bottom: '0', width: '50%', height: '50%' }}></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ bottom: '25%', width: '15%', height: '15%' }}></div>
    </div>
  );
};