export function buildContextMemory(
    context: any,
    risks: any
) {
    return {
        userId: context?.profile?.id || "unknown",

        condition: context?.profile?.condition || "unknown",

        historicalPatterns: [
            "Poor sleep previously correlated with symptom escalation",
            "Stress spikes often precede episodes",
        ],

        activeRisks: risks,

        recentBehavior: {
            avgSleep:
                context?.recentTrends?.avgSleepEfficiency || 0,

            avgSteps:
                context?.recentTrends?.avgSteps || 0,

            avgRestingHR:
                context?.recentTrends?.avgRestingHR || 0,
        },

        knownTriggers:
            context?.profile?.known_triggers || [],
    };
}