import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type Intent = 
  | "DATA_QUERY" 
  | "SYMPTOM_LOGGING" 
  | "GENERAL_ADVICE" 
  | "EMERGENCY" 
  | "UNKNOWN";

export async function classifyIntent(message: string): Promise<Intent> {
  const prompt = `
You are an intent classification engine for a health dashboard copilot.
Categorize the following user message into exactly ONE of the following intents:

- DATA_QUERY: Asking about their own health data, sleep, heart rate, trends, or dashboard stats.
- SYMPTOM_LOGGING: Reporting a new feeling, symptom, or physiological event (e.g. "I feel dizzy", "I have a headache").
- GENERAL_ADVICE: Asking for general health, diet, or workout advice not specifically tied to their data.
- EMERGENCY: Expressing severe distress, chest pain, suicidal thoughts, or needing immediate medical help.
- UNKNOWN: Any other query.

Respond with ONLY the exact string of the intent. Nothing else.

User message: "${message}"
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );

    const intentString = textBlock?.text?.trim() || "UNKNOWN";
    
    if (["DATA_QUERY", "SYMPTOM_LOGGING", "GENERAL_ADVICE", "EMERGENCY"].includes(intentString)) {
      return intentString as Intent;
    }
    
    return "UNKNOWN";
  } catch (error) {
    console.error("Intent classification failed:", error);
    return "UNKNOWN";
  }
}
