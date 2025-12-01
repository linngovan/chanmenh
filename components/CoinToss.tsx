import React, { useState, useEffect } from 'react';
import { LineType } from '../types';

interface CoinTossProps {
  onTossComplete: (lineResult: LineType) => void;
  tossCount: number;
}

const CoinToss: React.FC<CoinTossProps> = ({ onTossComplete, tossCount }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [coins, setCoins] = useState<number[]>([0, 0, 0]); // 0: Tail, 1: Head

  useEffect(() => {
    // Tự động bắt đầu gieo hào sau một khoảng trễ ngắn
    let spinTimer: ReturnType<typeof setTimeout>;
    let resultTimer: ReturnType<typeof setTimeout>;
    let completeTimer: ReturnType<typeof setTimeout>;

    const startTossSequence = () => {
      // 1. Chờ một chút trước khi bắt đầu xoay (để người dùng kịp nhìn thấy hào trước đó đã xong hoặc chuẩn bị tâm thế)
      spinTimer = setTimeout(() => {
        setIsSpinning(true);

        // 2. Thời gian xoay đồng xu (1.2s)
        resultTimer = setTimeout(() => {
          // Logic ngẫu nhiên: Head=1, Tail=0
          const newCoins = [
            Math.random() > 0.5 ? 1 : 0,
            Math.random() > 0.5 ? 1 : 0,
            Math.random() > 0.5 ? 1 : 0
          ];
          setCoins(newCoins);
          setIsSpinning(false);

          // Tính toán kết quả: Tail(2) + Head(3)
          const sum = newCoins.reduce((acc, val) => acc + (val === 1 ? 3 : 2), 0);
          // Tổng lẻ (7, 9) = Dương, Tổng chẵn (6, 8) = Âm
          const resultLine = (sum % 2 !== 0) ? LineType.Yang : LineType.Yin;

          // 3. Chờ người dùng nhìn thấy mặt đồng xu (1.2s) trước khi gửi kết quả lên App
          completeTimer = setTimeout(() => {
            onTossComplete(resultLine);
          }, 1200); 

        }, 1200); 

      }, 800);
    };

    startTossSequence();

    return () => {
      clearTimeout(spinTimer);
      clearTimeout(resultTimer);
      clearTimeout(completeTimer);
    };
  }, [tossCount, onTossComplete]);

  return (
    <div className="flex flex-col items-center gap-10 py-6">
      {/* Coins Container */}
      <div className="flex gap-6 perspective-500">
        {coins.map((coinVal, idx) => (
          <div key={idx} className={`w-24 h-24 relative preserve-3d transition-all duration-[1.2s] ${isSpinning ? 'animate-spin-coin' : ''}`}>
             {/* Coin Faces */}
             
             {/* HEAD (Yang) - Modern Silver Face */}
             <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center coin-face border-2 border-white ${coinVal === 1 ? '' : 'hidden'}`}>
                <div className="w-20 h-20 rounded-full border border-slate-300 flex items-center justify-center bg-slate-200">
                   <div className="w-16 h-16 rounded-full border border-slate-300 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                      <span className="text-purple-600 text-sm font-bold tracking-widest uppercase">Dương</span>
                   </div>
                </div>
             </div>

             {/* TAIL (Yin) - Dark Platinum Face */}
             <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center coin-face border-2 border-purple-500/50 ${coinVal === 0 ? '' : 'hidden'}`}>
                <div className="w-20 h-20 rounded-full border border-slate-600 flex items-center justify-center bg-slate-800">
                   {/* Geometric Pattern for Yin */}
                   <div className="w-10 h-10 border-2 border-purple-500 rotate-45 bg-purple-900/50 flex items-center justify-center">
                      <span className="text-purple-200 text-xs font-bold -rotate-45">Âm</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Progress / Status Indicator */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-xl font-light text-white tracking-[0.2em] uppercase animate-pulse">
          {isSpinning ? 'Đang gieo...' : `Đang luận hào ${tossCount + 1}`}
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-1000 ease-out"
            style={{ width: `${((tossCount) / 6) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-purple-300/60 text-xs font-light tracking-wide mt-2">
          Hãy giữ tâm tĩnh lặng
        </p>
      </div>
    </div>
  );
};

export default CoinToss;