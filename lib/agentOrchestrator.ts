export function runHealthAgents(
    memory: any
) {
    const outputs = [];

    // --------------------------------
    // Sleep Agent
    // --------------------------------
    if (memory.recentBehavior.avgSleep < 75) {
        outputs.push({
            agent: "Sleep Recovery Agent",

            finding:
                "Sleep recovery deterioration detected",

            action:
                "Recommend earlier recovery window and reduced evening stimulation",
        });
    }

    // --------------------------------
    // Risk Agent
    // --------------------------------
    if (
        memory.activeRisks.migraineRisk > 60
    ) {
        outputs.push({
            agent: "Migraine Risk Agent",

            finding:
                "Historical migraine escalation pattern detected",

            action:
                "Initiate preventive recovery recommendations",
        });
    }

    // --------------------------------
    // Activity Agent
    // --------------------------------
    if (
        memory.recentBehavior.avgSteps < 5000
    ) {
        outputs.push({
            agent: "Activity Optimization Agent",

            finding:
                "Reduced movement trends detected",

            action:
                "Recommend post-meal walks and mobility recovery",
        });
    }

    return outputs;
}