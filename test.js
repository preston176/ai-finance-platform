import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Summarize this: I spent $120 on groceries.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("AI Insight:", response.text());
    } catch (err) {
        console.error("ERROR:", err.message || err);
    }
};

run();
