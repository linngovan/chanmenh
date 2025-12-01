import React, { useState, useEffect, useRef } from 'react';
import { AppState, HoroscopeResponse, UserInput } from './types';
import InputForm from './components/InputForm';
import ZodiacVisual from './components/ZodiacVisual';
import { analyzeHoroscope } from './services/geminiService';
import { YinYangSymbol } from './components/YinYangSymbol';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('INTRO');
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [result, setResult] = useState<HoroscopeResponse | null>(null);
  
  // Audio State
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle Music Function
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio play failed:", error);
          });
        }
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const handleStart = () => {
    setState('INPUT');
  };

  const handleInputSubmit = async (data: UserInput) => {
    setUserInput(data);
    setState('ANALYZING');
    
    // Simulate delay for effect + API call
    try {
      // Minimum delay for visual effect (3s)
      const minDelay = new Promise(resolve => setTimeout(resolve, 3000));
      const apiCall = analyzeHoroscope(data);
      
      const [_, response] = await Promise.all([minDelay, apiCall]);
      
      setResult(response);
      setState('RESULT');
    } catch (e) {
      console.error(e);
      // Handle error state if needed
    }
  };

  const handleReset = () => {
    setUserInput(null);
    setResult(null);
    setState('INPUT');
  };

  useEffect(() => {
    if (state === 'RESULT' && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  return (
    <div className="min-h-screen w-full font-roboto bg-[#020617] text-white relative overflow-x-hidden selection:bg-purple-500 selection:text-white">
      
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3" type="audio/mpeg" />
      </audio>

      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-purple-300 hover:text-white hover:bg-white/10 transition-all duration-300 group shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
      >
        {isMusicPlaying ? (
          <div className="relative">
             <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
             <span className="absolute -top-1 -right-1 flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
             </span>
          </div>
        ) : (
          <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
        )}
      </button>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-[#0f0720] via-[#1e1b4b] to-[#020617]"></div>
         <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[100px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-10 mt-8 relative z-20">
           <div className="w-20 h-20 mb-10 relative group cursor-pointer" onClick={handleReset}>
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-[25px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative w-full h-full transition-transform duration-700 group-hover:rotate-180">
                 <YinYangSymbol spinning={state === 'ANALYZING'} />
              </div>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-thin tracking-[0.2em] text-center mb-2 py-4 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] select-none">
             CHÂN MỆNH
           </h1>
           
           <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-5 opacity-70"></div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">
          
          {/* INTRO */}
          {state === 'INTRO' && (
            <div className="w-full max-w-2xl animate-fade-in-up">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 blur-[60px] group-hover:bg-purple-500/50 transition-all duration-700"></div>
                <h2 className="text-2xl font-light mb-6 text-white">Luận Giải Trọn Đời</h2>
                <p className="mb-8 leading-relaxed text-slate-300 font-light text-lg">
                  Sử dụng trí tuệ nhân tạo để phân tích vận mệnh dựa trên kiến thức Tử Vi Đẩu Số.
                  Khám phá bản mệnh, công danh, tình duyên và các cột mốc quan trọng trong cuộc đời bạn.
                </p>
                <button 
                  onClick={handleStart}
                  className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border border-purple-500/30 rounded-full shadow-md group hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer z-30"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-600 group-hover:translate-x-0 ease">
                    ➔
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-200 transition-all duration-300 transform group-hover:translate-x-full ease tracking-widest uppercase text-sm font-bold">Bắt Đầu</span>
                  <span className="relative invisible">Bắt Đầu</span>
                </button>
              </div>
            </div>
          )}

          {/* INPUT FORM */}
          {state === 'INPUT' && (
             <InputForm onSubmit={handleInputSubmit} />
          )}

          {/* ANALYZING */}
          {state === 'ANALYZING' && (
            <div className="flex flex-col items-center justify-center animate-pulse gap-8">
               <div className="scale-125 relative">
                 <ZodiacVisual selectedYear={userInput?.birthYear || null} />
              </div>
              <div className="text-center mt-8">
                <h2 className="text-2xl font-light text-white mb-2 tracking-widest">ĐANG LUẬN GIẢI</h2>
                <p className="text-purple-300 text-sm tracking-wide">Đang tính toán sao chiếu mệnh...</p>
              </div>
            </div>
          )}

          {/* RESULT */}
          {state === 'RESULT' && result && (
            <div ref={scrollRef} className="w-full max-w-5xl pb-12">
              
              {/* Header Info */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900"></div>
                
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 relative flex-shrink-0">
                      <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                      <div className="relative w-full h-full bg-black/40 rounded-full border border-purple-400 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                        {userInput?.birthYear}
                      </div>
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-white mb-1">{result.canChi}</h2>
                      <p className="text-purple-300 uppercase tracking-widest text-sm font-light">{userInput?.gender === 'male' ? 'Nam Mạng' : 'Nữ Mạng'} • {result.menh}</p>
                   </div>
                </div>

                <div className="flex gap-4 text-sm text-right">
                  <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                    <span className="block text-slate-400 text-xs uppercase mb-1">Con Số May Mắn</span>
                    <span className="text-white font-medium">{result.luckyNumbers}</span>
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                    <span className="block text-slate-400 text-xs uppercase mb-1">Màu Hợp Mệnh</span>
                    <span className="text-white font-medium">{result.luckyColors}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Lifetime Stages */}
                <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                   <h3 className="text-xl font-light text-white tracking-widest border-b border-white/10 pb-2">VẬN TRÌNH CÁC GIAI ĐOẠN</h3>
                   <div className="space-y-4">
                     {result.lifetimeStages.map((stage, idx) => (
                       <div key={idx} className="bg-white/5 backdrop-blur-sm border-l-2 border-purple-500 p-5 rounded-r-xl hover:bg-white/10 transition-colors animate-fade-in-up" style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}>
                         <h4 className="text-purple-300 font-bold text-sm uppercase mb-2">{stage.stage}</h4>
                         <p className="text-slate-300 text-sm leading-relaxed text-justify">{stage.content}</p>
                       </div>
                     ))}
                   </div>
                   
                   <button 
                      onClick={handleReset}
                      className="w-full py-4 mt-4 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-xl text-sm font-bold tracking-widest text-purple-200 hover:text-white transition-all duration-300 uppercase group"
                    >
                      Tra Cứu Khác
                    </button>
                </div>

                {/* Right Column: Detailed Analysis */}
                <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  
                  {/* General */}
                  <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-xl font-medium text-purple-400 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                      <span className="w-2 h-2 bg-white rounded-full"></span> Tổng Quan Bản Mệnh
                    </h3>
                    <p className="text-slate-100 leading-relaxed text-lg font-light text-justify">
                      {result.generalPersonality}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 mb-6">
                    {/* Career */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-transparent p-6 rounded-xl border border-purple-500/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                         <span className="text-2xl">💼</span>
                         Công Danh & Sự Nghiệp
                      </h3>
                      <p className="text-slate-200 text-base leading-relaxed font-light text-justify">
                        {result.careerFinance}
                      </p>
                    </div>

                    {/* Love */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-transparent p-6 rounded-xl border border-purple-500/10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                      <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                        <span className="text-2xl">❤️</span>
                        Tình Duyên & Gia Đạo
                      </h3>
                      <p className="text-slate-200 text-base leading-relaxed font-light text-justify">
                        {result.loveFamily}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-8 text-slate-500 text-xs font-light tracking-widest uppercase">
          <p>© 2024 Tử Vi Số Mệnh • AI Powered</p>
        </footer>
      </div>
    </div>
  );
};

export default App;