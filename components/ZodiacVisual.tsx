import React from 'react';

interface ZodiacVisualProps {
  selectedYear: number | null;
}

const ZODIAC_ORDER = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

const ZodiacVisual: React.FC<ZodiacVisualProps> = ({ selectedYear }) => {
  const getActiveIndex = () => {
    if (!selectedYear) return -1;
    // (Year - 4) % 12. 
    let index = (selectedYear - 4) % 12;
    if (index < 0) index += 12;
    return index;
  };

  const activeIndex = getActiveIndex();
  
  // Calculate angle for the connecting line
  // Start from -90deg (Top). Each step is 30deg.
  const activeAngle = (activeIndex * 30) - 90;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto flex items-center justify-center select-none">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Outer Nebular Glow */}
      <div className="absolute inset-0 bg-purple-600/10 blur-[60px] rounded-full animate-pulse"></div>

      {/* 2. Rotating Runes/Dashed Ring (Slow Clockwise) */}
      <div className="absolute inset-0 border border-purple-500/10 rounded-full animate-[spin_60s_linear_infinite]">
        <div className="absolute inset-2 border border-dashed border-purple-400/20 rounded-full"></div>
         {/* Decorative dots on the ring */}
        {[0, 90, 180, 270].map((deg) => (
           <div key={deg} className="absolute w-2 h-2 bg-purple-500/30 rounded-full top-1/2 left-1/2" 
                style={{ transform: `rotate(${deg}deg) translate(190px) translate(-50%, -50%)` }}></div>
        ))}
      </div>

      {/* 3. Inner Tech Ring (Fast Counter-Clockwise) */}
      <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse] shadow-[0_0_15px_rgba(139,92,246,0.1)_inset]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-purple-500/50"></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-purple-500/50"></div>
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-purple-500/50"></div>
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-purple-500/50"></div>
      </div>

      {/* --- CONNECTING LINE (SVG) --- */}
      {selectedYear && activeIndex !== -1 && (
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <defs>
            <linearGradient id="beamGradient" x1="50%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#faf5ff" stopOpacity="1" />
            </linearGradient>
            <filter id="glowLine">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <line 
            x1="50%" y1="50%" 
            x2="50%" y2="0%" // Points to top, then we rotate the whole SVG or calculated coords. 
            // Better: calculate x2, y2 based on angle.
            // Center is 50%, 50%. Radius approx 140px.
            // Actually, simpler to rotate a div line. Let's use CSS for the line.
          />
        </svg>
      )}

      {/* CSS Based Beam */}
      {selectedYear && activeIndex !== -1 && (
         <div 
            className="absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-white origin-left z-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ 
               width: '140px', // Radius distance
               transform: `rotate(${activeAngle}deg) translateY(-50%)`,
               transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
         >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
         </div>
      )}


      {/* --- ZODIAC ITEMS --- */}
      {ZODIAC_ORDER.map((animal, i) => {
        const angle = (i * 30) - 90; // Start from top
        const radius = 140; // Spacing from center
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        const isActive = i === activeIndex;

        return (
          <div
            key={animal}
            className={`absolute flex items-center justify-center transition-all duration-700
              ${isActive ? 'z-20' : 'z-10'}
            `}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className={`
              relative flex items-center justify-center rounded-full border transition-all duration-500
              ${isActive 
                ? 'w-12 h-12 bg-[#0f0720] border-purple-300 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-125' 
                : 'w-8 h-8 bg-black/20 border-white/10 text-slate-500 hover:border-white/30'
              }
            `}>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-white' : ''}`}>
                {animal}
              </span>
              
              {/* Active Halo */}
              {isActive && (
                <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
              )}
            </div>
          </div>
        );
      })}

      {/* --- CENTER DISPLAY --- */}
      <div className="absolute z-30 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-[#05030a] border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.2)] backdrop-blur-md">
         {/* Inner decorative circle */}
         <div className="absolute inset-1 border border-white/5 rounded-full"></div>
         
         {selectedYear ? (
           <>
              <div className="text-4xl md:text-5xl font-thin text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {selectedYear}
              </div>
              <div className="text-purple-300 text-xs font-bold uppercase tracking-[0.2em] mt-2 border-t border-purple-500/30 pt-1">
                {activeIndex !== -1 ? ZODIAC_ORDER[activeIndex] : '...'}
              </div>
           </>
         ) : (
           <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
         )}
      </div>
      
    </div>
  );
};

export default ZodiacVisual;