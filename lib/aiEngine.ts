
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateAIInsights(
  context: any,
  risks: any,
  triggers: any[]
) {
  const profile = context.profile;

  const prompt = `
You are an empathetic proactive AI health companion.

Your role:
- Explain health risks clearly
- Be supportive and actionable
- Avoid diagnosis language
- Focus on prevention and healthy behavior

User Profile:
Name: ${profile.name}
Condition: ${profile.condition}
Known Triggers: ${profile.known_triggers?.join(", ")}

Recent Trends:
- Avg Sleep Efficiency: ${context.recentTrends.avgSleepEfficiency}
- Avg Resting HR: ${context.recentTrends.avgRestingHR}
- Avg Steps: ${context.recentTrends.avgSteps}

Detected Risks:
${JSON.stringify(risks, null, 2)}

Proactive Triggers:
${JSON.stringify(triggers, null, 2)}

Generate:
1. A concise personalized health summary
2. Preventive coaching
3. One motivational recommendation

Keep response human, proactive, and concise.
`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",

    max_tokens: 500,

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Use a type guard to safely access the text property
  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text"
  );

  return textBlock?.text || "";
}