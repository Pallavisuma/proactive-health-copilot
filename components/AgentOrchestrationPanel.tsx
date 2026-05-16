"use client";

type Props = {
    memory: any;
    agentOutputs: any[];
    alerts: any[];
};

export default function AgentOrchestrationPanel({
    memory,
    agentOutputs,
    alerts,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Context Memory */}
            <div className="bg-white rounded-2xl border p-5">
                <h2 className="text-xl font-bold mb-4">
                    Context Memory
                </h2>

                <div className="space-y-3">
                    <div>
                        <div className="text-sm text-gray-500">
                            Condition
                        </div>

                        <div className="font-semibold">
                            {memory?.condition}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500 mb-2">
                            Known Triggers
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {memory?.knownTriggers?.map(
                                (
                                    trigger: string,
                                    index: number
                                ) => (
                                    <div
                                        key={index}
                                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                                    >
                                        {trigger}
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500 mb-2">
                            Historical Patterns
                        </div>

                        <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                            {memory?.historicalPatterns?.map(
                                (
                                    pattern: string,
                                    index: number
                                ) => (
                                    <li key={index}>
                                        {pattern}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Multi-Agent Orchestration */}
            <div className="bg-white rounded-2xl border p-5">
                <h2 className="text-xl font-bold mb-4">
                    Multi-Agent Orchestration
                </h2>

                <div className="space-y-4">
                    {agentOutputs?.map(
                        (agent: any, index: number) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4"
                            >
                                <div className="font-semibold">
                                    {agent.agent}
                                </div>

                                <div className="text-gray-600 mt-2">
                                    {agent.finding}
                                </div>

                                <div className="mt-3 text-sm">
                                    <span className="font-semibold">
                                        Recommended Action:
                                    </span>{" "}
                                    {agent.action}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Alert Layer */}
            <div className="bg-white rounded-2xl border p-5">
                <h2 className="text-xl font-bold mb-4">
                    Proactive Alert Layer
                </h2>

                <div className="space-y-4">
                    {alerts?.map(
                        (alert: any, index: number) => (
                            <div
                                key={index}
                                className="bg-black text-white rounded-xl p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold">
                                        {alert.title}
                                    </div>

                                    <div className="text-xs uppercase">
                                        {alert.priority}
                                    </div>
                                </div>

                                <div className="mt-3 text-sm opacity-90">
                                    {alert.description}
                                </div>

                                <div className="mt-3 text-sm">
                                    <span className="font-semibold">
                                        Recommendation:
                                    </span>{" "}
                                    {alert.recommendation}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}