import React, { useState } from 'react';
import { UserInput, Gender } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [year, setYear] = useState<string>('');
  const [gender, setGender] = useState<Gender>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(year);
    if (!yearNum || yearNum < 1900 || yearNum > 2100) {
      alert("Vui lòng nhập năm sinh hợp lệ (1900 - 2100)");
      return;
    }
    onSubmit({ birthYear: yearNum, gender });
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-[fadeIn_0.5s_ease-out]">
      <h2 className="text-2xl font-light text-center text-white mb-8 tracking-wide">Thông Tin Bản Mệnh</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Year Input */}
        <div className="flex flex-col gap-2">
          <label className="text-purple-200 text-sm uppercase tracking-widest font-light">Năm Sinh (Dương Lịch)</label>
          <input 
            type="number" 
            placeholder="VD: 1995"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-black/20 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-center text-xl tracking-widest"
            autoFocus
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-purple-200 text-sm uppercase tracking-widest font-light">Giới Tính</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 rounded-xl border transition-all duration-300 font-medium ${gender === 'male' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-transparent border-white/10 text-slate-400 hover:bg-white/5'}`}
            >
              NAM MẠNG
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`py-3 rounded-xl border transition-all duration-300 font-medium ${gender === 'female' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-transparent border-white/10 text-slate-400 hover:bg-white/5'}`}
            >
              NỮ MẠNG
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="mt-4 relative w-full inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full group hover:bg-white/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-600 rounded-full group-hover:w-full group-hover:h-56 opacity-30"></span>
          <span className="relative tracking-[0.2em] uppercase">Luận Giải</span>
        </button>

      </form>
    </div>
  );
};

export default InputForm;
