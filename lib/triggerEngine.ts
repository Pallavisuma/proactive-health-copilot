
export function generateTriggers(
  context: any,
  risks: any
) {
  const profile = context.profile;

  const triggers = [];

  // --------------------------------
  // Migraine Trigger
  // --------------------------------
  if (risks.migraineRisk >= 60) {
    triggers.push({
      severity: "high",

      title: "High migraine risk detected",

      reason:
        "Sleep quality has declined and current physiological patterns resemble previous migraine episodes.",

      recommendation:
        "Prioritize recovery tonight, hydrate consistently, and reduce prolonged screen exposure.",

      whyNow: [
        "Sleep efficiency dropped significantly",
        "Historical migraine correlation detected",
        "Elevated stress indicators observed",
      ],
    });
  }

  // --------------------------------
  // Glucose Trigger
  // --------------------------------
  if (risks.glucoseRisk >= 60) {
    triggers.push({
      severity: "medium",

      title: "Glucose stability may be worsening",

      reason:
        "Recent activity levels and behavioral trends suggest elevated glucose instability risk.",

      recommendation:
        "Consider increasing movement after meals and maintaining consistent sleep patterns.",

      whyNow: [
        "Low recent activity",
        "Diabetes condition context",
        "Sleep inconsistency detected",
      ],
    });
  }

  // --------------------------------
  // Anxiety Trigger
  // --------------------------------
  if (risks.anxietyRisk >= 60) {
    triggers.push({
      severity: "medium",

      title: "Stress recovery appears reduced",

      reason:
        "Elevated resting heart rate and poor sleep patterns may indicate increased stress load.",

      recommendation:
        "Reduce cognitive overload where possible and prioritize recovery-focused routines today.",

      whyNow: [
        "Elevated resting HR",
        "Reduced sleep efficiency",
        "Anxiety condition context",
      ],
    });
  }

  // --------------------------------
  // Sleep Trigger
  // --------------------------------
  if (risks.sleepRisk >= 40) {
    triggers.push({
      severity: "low",

      title: "Sleep recovery needs attention",

      reason:
        "Recent sleep efficiency trends suggest insufficient overnight recovery.",

      recommendation:
        "Aim for earlier sleep timing and reduce evening stimulation.",

      whyNow: [
        "Sleep efficiency trend declining",
      ],
    });
  }

  // --------------------------------
  // Positive Reinforcement
  // --------------------------------
  if (
    risks.sleepRisk < 30 &&
    risks.glucoseRisk < 30
  ) {
    triggers.push({
      severity: "positive",

      title: "Recovery trends are improving",

      reason:
        "Recent behavioral and physiological patterns suggest improving health stability.",

      recommendation:
        "Maintain your current routines and consistency.",

      whyNow: [
        "Stable activity levels",
        "Healthy recovery patterns",
      ],
    });
  }

  return triggers;
}