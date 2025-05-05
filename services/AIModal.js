import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function GenerativeAI(transactions) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: `based on this transactions ${transactions} Give a summary of how i am spending the funds.`,
    });

    return response

}