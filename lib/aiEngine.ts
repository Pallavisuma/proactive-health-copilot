
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

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 500,
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

    return textBlock?.text || "";
  } catch (error: any) {
    console.warn("aiEngine API failed, using fallback:", error.message);
    return `**Health Summary:** Based on your recent data, your sleep efficiency is ${context.recentTrends.avgSleepEfficiency}% and resting HR is ${context.recentTrends.avgRestingHR} bpm. Please continue to monitor these trends.\n\n**Coaching:** Consider maintaining a regular sleep schedule to improve recovery.\n\n**Recommendation:** Aim for 80%+ sleep efficiency.`;
  }
}