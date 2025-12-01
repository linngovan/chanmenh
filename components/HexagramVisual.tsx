import React from 'react';
import { LineType } from '../types';

interface HexagramVisualProps {
  lines: LineType[];
  activeLineIndex?: number; // For animation during tossing
}

const HexagramVisual: React.FC<HexagramVisualProps> = ({ lines, activeLineIndex }) => {
  // Logic remains: Lines stored Bottom -> Top, Displayed Top -> Bottom
  const renderLines = [...lines].reverse(); 

  const getLineNumber = (renderIndex: number) => 6 - renderIndex;

  return (
    <div className="flex flex-col gap-4 w-56 mx-auto p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
      {[...Array(6)].map((_, i) => {
        const lineNumber = getLineNumber(i); 
        const arrayIndex = lineNumber - 1;   
        const lineType = lines[arrayIndex]; 

        const isFilled = arrayIndex < lines.length;
        const isNew = arrayIndex === lines.length - 1;

        return (
          <div 
            key={i} 
            className={`h-3 w-full flex justify-between transition-all duration-700 ${isFilled ? 'opacity-100 scale-100' : 'opacity-20 scale-95'} ${isNew ? 'animate-pulse' : ''}`}
          >
            {isFilled ? (
              lineType === LineType.Yang ? (
                // Yang Line: Solid White Neon
                <div className="w-full h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"></div>
              ) : (
                // Yin Line: Broken Purple Neon
                <>
                  <div className="w-[42%] h-full bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                  <div className="w-[42%] h-full bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                </>
              )
            ) : (
               // Placeholder
               <div className="w-full h-full bg-white/5 rounded-full border border-white/5"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HexagramVisual;