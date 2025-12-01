import { GoogleGenAI, Type } from "@google/genai";
import { UserInput } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeHoroscope = async (input: UserInput): Promise<any> => {
  const { birthYear, gender } = input;
  const genderText = gender === 'male' ? "Nam mạng" : "Nữ mạng";

  const prompt = `
    Hãy đóng vai một chuyên gia Tử Vi Đẩu Số và Phong Thủy học uyên bác, giọng văn cổ kính, trang trọng nhưng sâu sắc, dễ hiểu.
    
    Hãy lập và bình giải lá số tử vi trọn đời cho người sinh năm: ${birthYear} (${genderText}).

    Hãy tính toán chính xác Can Chi (Thiên Can, Địa Chi) và Ngũ Hành Nạp Âm (Mệnh) của năm sinh này.

    Trả về kết quả dưới dạng JSON theo cấu trúc sau (không dùng markdown block, chỉ JSON thuần):
    {
      "canChi": "Ví dụ: Giáp Thìn",
      "menh": "Ví dụ: Phú Đăng Hỏa (Lửa đèn dầu)",
      "zodiacAnimal": "Tên con giáp (Tý, Sửu...)",
      "generalPersonality": "Luận giải tổng quan về tính cách, cốt cách con người này.",
      "careerFinance": "Luận giải chi tiết về công danh, sự nghiệp, tiền tài cả đời.",
      "loveFamily": "Luận giải về tình duyên, gia đạo, con cái.",
      "lifetimeStages": [
        { "stage": "Tiền vận (20 - 30 tuổi)", "content": "Luận giải ngắn gọn giai đoạn này" },
        { "stage": "Trung vận (31 - 50 tuổi)", "content": "Luận giải ngắn gọn giai đoạn này" },
        { "stage": "Hậu vận (Sau 50 tuổi)", "content": "Luận giải ngắn gọn giai đoạn này" }
      ],
      "luckyNumbers": "Các con số may mắn",
      "luckyColors": "Các màu sắc hợp mệnh"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            canChi: { type: Type.STRING },
            menh: { type: Type.STRING },
            zodiacAnimal: { type: Type.STRING },
            generalPersonality: { type: Type.STRING },
            careerFinance: { type: Type.STRING },
            loveFamily: { type: Type.STRING },
            lifetimeStages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stage: { type: Type.STRING },
                  content: { type: Type.STRING }
                }
              }
            },
            luckyNumbers: { type: Type.STRING },
            luckyColors: { type: Type.STRING }
          },
          required: ["canChi", "menh", "generalPersonality", "careerFinance", "lifetimeStages"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Error analyzing horoscope:", error);
    // Fallback
    return {
      canChi: "Không xác định",
      menh: "Bí ẩn",
      zodiacAnimal: "Thần Thú",
      generalPersonality: "Hiện tại thiên cơ chưa thể tiết lộ. Vui lòng thử lại sau.",
      careerFinance: "Kiên nhẫn chờ đợi thời cơ.",
      loveFamily: "Vạn sự tùy duyên.",
      lifetimeStages: [],
      luckyNumbers: "0, 1",
      luckyColors: "Trắng, Tím"
    };
  }
};
