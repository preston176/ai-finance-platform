"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export function AIInsightBox({ transactions }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateInsight = async () => {
    setLoading(true);
    setInsight(""); // Reset previous insight

    try {
      // Generate content using GoogleGenAI
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: `Based on these transactions: ${JSON.stringify(transactions)}, give a summary of how I am spending the funds. Also predict my spending for the next month based on these transactions. Also give recommendations on what I need to reduce.
        
      Use this structure:
      1. Summary of spending
      2. Prediction for next month
      3. Recommendations for reducing spending  

      If it is hard to predict, say so. If there are no transactions, say so.
      If there are no recommendations, say so. If there are no predictions, say so. If there is no summary, say so. If there is no spending, say so. If there is no spending pattern, say so. If there is no spending trend, say so. If there is no spending history, say so. If there is no spending data, say so. If there is no spending information, say so. If there is no spending analysis, say so. If there is no spending report, say so.
        `,
      });

      // Set the insight result
      setInsight(response.text || "No insight generated.");
    } catch (err) {
      console.error(err);
      setInsight("Something went wrong while generating insight.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-secondary/50 border-2 border-dashed">
      <CardHeader>
        <h2 className="text-lg font-semibold">AI Financial Insights</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Click below to get personalized insights based on your transactions.
        </p>

        <Button onClick={handleGenerateInsight} disabled={loading}>
          {loading ? "Analyzing..." : "Generate Insights"}
        </Button>

        {insight && (
          <div className="mt-4 bg-background p-4 border rounded-lg text-sm">
          <Markdown remarkPlugins={[remarkGfm]}>{String(insight)}</Markdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
