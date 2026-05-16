export function inferHealthState(
    context: any,
    risks: any
) {
    const trends = context.recentTrends;

    // --------------------------------
    // Derived Scores
    // --------------------------------

    const sleepScore = Math.max(
        0,
        trends.avgSleepEfficiency
    );

    const activityScore = Math.min(
        100,
        (trends.avgSteps / 10000) * 100
    );

    const recoveryScore = Math.max(
        0,
        100 - trends.avgRestingHR
    );

    const metabolicScore =
        100 - (risks.glucoseRisk || 0);

    // --------------------------------
    // Overall Human State Score
    // --------------------------------

    const healthScore = Math.round(
        sleepScore * 0.3 +
        activityScore * 0.2 +
        recoveryScore * 0.3 +
        metabolicScore * 0.2
    );

    let healthState = "Stable";

    let severity = "LOW";

    let confidence = 0.72;

    let explanation =
        "Current behavioral and physiological trends appear relatively stable.";

    let whyThisMatters =
        "No major deterioration patterns detected.";

    let topDrivers: string[] = [];

    // --------------------------------
    // Recovery Debt
    // --------------------------------

    if (
        sleepScore < 75 &&
        recoveryScore < 72
    ) {
        healthState = "Recovery Debt";

        severity = "MODERATE";

        confidence = 0.84;

        topDrivers = [
            `Reduced sleep efficiency (${Math.round(
                sleepScore
            )})`,

            `Reduced recovery score (${Math.round(
                recoveryScore
            )})`,

            "Elevated physiological stress patterns",
        ];

        explanation =
            "Recent sleep and recovery trends may indicate insufficient physiological recovery.";

        whyThisMatters =
            "Persistent recovery deterioration may increase fatigue and symptom escalation risk.";
    }

    // --------------------------------
    // Metabolic Drift
    // --------------------------------

    if (
        metabolicScore < 60 &&
        activityScore < 65
    ) {
        healthState = "Metabolic Drift";

        severity = "HIGH";

        confidence = 0.88;

        topDrivers = [
            `Metabolic score reduced (${Math.round(
                metabolicScore
            )})`,

            `Low activity score (${Math.round(
                activityScore
            )})`,

            "Behavioral recovery inconsistency",
        ];

        explanation =
            "Behavioral and metabolic indicators may suggest declining metabolic stability worth monitoring.";

        whyThisMatters =
            "Persistent metabolic instability may increase long-term chronic condition risk.";
    }

    // --------------------------------
    // Cardio Stress Pattern
    // --------------------------------

    if (
        trends.avgRestingHR > 82 &&
        risks.anxietyRisk > 60
    ) {
        healthState =
            "Cardio Stress Pattern";

        severity = "HIGH";

        confidence = 0.81;

        topDrivers = [
            `Elevated resting HR (${Math.round(
                trends.avgRestingHR
            )})`,

            "Stress-related physiological load",

            "Reduced overnight recovery",
        ];

        explanation =
            "Cardiovascular stress indicators may suggest elevated physiological strain patterns.";

        whyThisMatters =
            "Sustained physiological stress patterns may negatively impact long-term recovery.";
    }

    // --------------------------------
    // Stable State
    // --------------------------------

    if (healthState === "Stable") {
        topDrivers = [
            `Sleep score ${Math.round(
                sleepScore
            )}`,

            `Recovery score ${Math.round(
                recoveryScore
            )}`,

            `Activity score ${Math.round(
                activityScore
            )}`,
        ];
    }

    return {
        healthScore,

        healthState,

        confidence,

        severity,

        topDrivers,

        explanation,

        whyThisMatters,

        derivedScores: {
            sleepScore:
                Math.round(sleepScore),

            activityScore:
                Math.round(activityScore),

            recoveryScore:
                Math.round(recoveryScore),

            metabolicScore:
                Math.round(metabolicScore),
        },

        generatedAt:
            new Date().toISOString(),
    };
}