import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateInsight(transactions) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `Analyze the following transactions: ${JSON.stringify(transactions)}`,
    });

    // Ensure response.text is available
    if (!response.text) {
      throw new Error('AI response text is empty');
    }

    return {
      status: 'success',
      insight: response.text, // Return the text response properly
    };
  } catch (err) {
    console.error("AI Error:", err.message || err);
    return {
      status: 'error',
      message: err.message || 'Failed to generate insight',
    };
  }
}
