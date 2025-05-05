"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GoogleGenAI } from '@google/genai';

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
        contents: `Based on these transactions: ${JSON.stringify(transactions)}, give a summary of how I am spending the funds.`,
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
            {insight}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
