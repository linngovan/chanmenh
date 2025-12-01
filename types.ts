export type Gender = 'male' | 'female';

export enum LineType {
  Yin = 0,
  Yang = 1
}

export interface UserInput {
  birthYear: number;
  gender: Gender;
}

export type AppState = 'INTRO' | 'INPUT' | 'ANALYZING' | 'RESULT';

export interface HoroscopeResponse {
  canChi: string;      // Ví dụ: Giáp Thìn
  menh: string;        // Ví dụ: Phú Đăng Hỏa
  zodiacAnimal: string; // Tên con giáp
  generalPersonality: string;
  careerFinance: string;
  loveFamily: string;
  lifetimeStages: {
    stage: string;     // Ví dụ: Tiền vận (20-30 tuổi)
    content: string;
  }[];
  luckyNumbers: string;
  luckyColors: string;
}