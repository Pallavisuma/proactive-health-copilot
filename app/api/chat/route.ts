import { NextResponse } from "next/server";
import { classifyIntent } from "@/lib/intentClassifier";
import Anthropic from "@anthropic-ai/sdk";
import { getUnifiedUserContext } from "@/lib/contextEngine";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const intent = await classifyIntent(message);

    // Provide context if it's a data query or symptom logging
    let contextStr = "";
    if (intent === "DATA_QUERY" || intent === "SYMPTOM_LOGGING") {
      // Default to user_001 if not provided, for demo purposes
      const activeUser = userId || "user_001";
      const userContext = getUnifiedUserContext(activeUser);
      contextStr = `
USER DATA CONTEXT:
Condition: ${userContext?.profile?.condition || "None"}
Recent Sleep: ${userContext?.recentTrends?.avgSleepEfficiency || "Unknown"}%
Recent HR: ${userContext?.recentTrends?.avgRestingHR || "Unknown"} bpm
Activity: ${userContext?.recentTrends?.avgSteps || "Unknown"} steps
`;
    }

    let systemPrompt = `You are a proactive, professional health copilot agent. You have classified the user's intent as: ${intent}.`;

    if (intent === "EMERGENCY") {
      systemPrompt += ` The user is experiencing a medical emergency. Urge them to call emergency services (e.g. 911) or go to the nearest hospital immediately. Keep it brief, calm, and urgent. DO NOT provide medical advice.`;
    } else if (intent === "SYMPTOM_LOGGING") {
      systemPrompt += ` The user is logging a symptom. Acknowledge it empathetically, and advise if it correlates with their known conditions or recent data trends.${contextStr}`;
    } else if (intent === "DATA_QUERY") {
      systemPrompt += ` The user is asking about their health data. Provide a precise, analytical answer based on their context. Be professional and encouraging.${contextStr}`;
    } else {
      systemPrompt += ` Provide helpful, safe, general advice. Remind them you are an AI and not a doctor.`;
    }

    let aiResponseText = "";
    
    try {
      const response = await anthropic.messages.create({
        model: "claude-2.1",
        max_tokens: 400,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );
      
      aiResponseText = textBlock?.text || "I'm sorry, I couldn't process that.";
    } catch (apiError: any) {
      console.warn("Anthropic API failed in chat route, using fallback:", apiError.message);
      
      // Fallback responses
      if (intent === "EMERGENCY") {
        aiResponseText = "URGENT: Please contact emergency services (e.g., 911) or go to the nearest hospital immediately. I am an AI and cannot provide medical assistance.";
      } else if (intent === "DATA_QUERY") {
        aiResponseText = `Based on your recent data: You have a Sleep Efficiency of ${userContext?.recentTrends?.avgSleepEfficiency}% and an average Resting HR of ${userContext?.recentTrends?.avgRestingHR} bpm.`;
      } else if (intent === "SYMPTOM_LOGGING") {
        aiResponseText = "I have logged your symptom. Given your context, please continue monitoring this. If it worsens, consult a healthcare professional.";
      } else {
        aiResponseText = "Thank you for sharing. Remember to maintain healthy habits. (Note: AI response generated via fallback due to API configuration).";
      }
    }

    return NextResponse.json({
      response: aiResponseText,
      intent,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
