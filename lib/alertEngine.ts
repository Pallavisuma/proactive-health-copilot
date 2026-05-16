export function generateAlerts(
    agentOutputs: any[]
) {
    return agentOutputs.map((agent) => ({
        priority: "high",

        title: `${agent.agent} Intervention`,

        description: agent.finding,

        recommendation: agent.action,

        timestamp: new Date().toISOString(),
    }));
}