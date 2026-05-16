
export function calculateRisks(context: any) {
  const profile = context.profile;
  const trends = context.recentTrends;

  let migraineRisk = 10;
  let glucoseRisk = 10;
  let anxietyRisk = 10;
  let sleepRisk = 10;

  const reasons: string[] = [];

  // -----------------------------
  // Sleep deterioration
  // -----------------------------
  if (trends.avgSleepEfficiency < 75) {
    sleepRisk += 35;

    reasons.push(
      "Sleep efficiency has significantly declined."
    );
  }

  // -----------------------------
  // Elevated resting HR
  // -----------------------------
  if (trends.avgRestingHR > 80) {
    anxietyRisk += 20;

    reasons.push(
      "Elevated resting heart rate suggests increased physiological stress."
    );
  }

  // -----------------------------
  // Low activity
  // -----------------------------
  if (trends.avgSteps < 5000) {
    glucoseRisk += 25;

    reasons.push(
      "Recent activity levels are lower than recommended."
    );
  }

  // -----------------------------
  // Migraine logic
  // -----------------------------
  if (
    profile?.condition?.toLowerCase().includes("migraine")
  ) {
    migraineRisk += 30;

    if (trends.avgSleepEfficiency < 75) {
      migraineRisk += 25;

      reasons.push(
        "Poor sleep patterns previously correlated with migraine episodes."
      );
    }
  }

  // -----------------------------
  // Diabetes logic
  // -----------------------------
  if (
    profile?.condition?.toLowerCase().includes("diabetes")
  ) {
    glucoseRisk += 30;

    if (trends.avgSteps < 6000) {
      glucoseRisk += 20;

      reasons.push(
        "Sedentary behavior may worsen glucose stability."
      );
    }
  }

  // -----------------------------
  // Anxiety logic
  // -----------------------------
  if (
    profile?.condition?.toLowerCase().includes("anxiety")
  ) {
    anxietyRisk += 30;

    if (trends.avgSleepEfficiency < 78) {
      anxietyRisk += 20;

      reasons.push(
        "Sleep disruption may contribute to elevated anxiety symptoms."
      );
    }
  }

  return {
    migraineRisk: Math.min(migraineRisk, 100),
    glucoseRisk: Math.min(glucoseRisk, 100),
    anxietyRisk: Math.min(anxietyRisk, 100),
    sleepRisk: Math.min(sleepRisk, 100),

    reasons,
  };
}