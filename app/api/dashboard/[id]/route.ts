import { NextResponse } from "next/server";

import { getUnifiedUserContext } from "@/lib/contextEngine";
import { calculateRisks } from "@/lib/riskEngine";
import { generateTriggers } from "@/lib/triggerEngine";

import { buildContextMemory } from "@/lib/contextMemory";
import { runHealthAgents } from "@/lib/agentOrchestrator";
import { generateAlerts } from "@/lib/alertEngine";
import { inferHealthState } from "@/lib/healthTwinAgent";

export async function GET(
    request: Request,
    context: any
) {
    try {
        // IMPORTANT FIX
        const { id } = await context.params;

        // --------------------------------
        // Unified Context
        // --------------------------------
        const userContext =
            getUnifiedUserContext(id);

        // --------------------------------
        // Risk Engine
        // --------------------------------
        const risks =
            calculateRisks(userContext);

        const healthState =
            inferHealthState(userContext, risks);

        // --------------------------------
        // Trigger Engine
        // --------------------------------
        const triggers =
            generateTriggers(
                userContext,
                risks
            );

        // --------------------------------
        // Context Memory
        // --------------------------------
        const memory =
            buildContextMemory(
                userContext,
                risks
            );

        // --------------------------------
        // Multi-Agent Orchestration
        // --------------------------------
        const agentOutputs =
            runHealthAgents(memory);

        // --------------------------------
        // Alert Layer
        // --------------------------------
        const alerts =
            generateAlerts(agentOutputs);

        return NextResponse.json({
            profile: userContext.profile,

            trends:
                userContext.recentTrends,

            risks,

            triggers,

            memory,

            agentOutputs,

            alerts,

            healthState,
        });
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    error?.message ||
                    "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}