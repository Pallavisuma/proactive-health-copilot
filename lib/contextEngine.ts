
import {
  loadProfiles,
  loadMedicalRecords,
  loadLabResults,
  loadWearableData,
} from "./dataLoader";

export function getUnifiedUserContext(userId: string) {
  const profiles = loadProfiles();
  const medicalRecords = loadMedicalRecords();
  const labResults = loadLabResults();
  const wearableData: any[] = loadWearableData();

  // Find user profile
  const profile = profiles.find((u: any) => u.id === userId);

  // Filter medical history
  const userMedicalRecords = medicalRecords.filter(
    (r: any) => r.user_id === userId
  );

  // Filter labs
  const userLabs = labResults.find(
    (l: any) => l.user_id === userId
  );

  // Filter wearable data
  const userWearables = wearableData.filter(
    (w: any) => w.user_id === userId
  );

  // Recent wearable trends
  const recentWearables = userWearables.slice(-14);

  // Compute averages
  const avgSleep =
    recentWearables.reduce(
      (sum, w) => sum + (w.sleep_efficiency_pct || 0),
      0
    ) / (recentWearables.length || 1);

  const avgRestingHR =
    recentWearables.reduce(
      (sum, w) => sum + (w.resting_hr_bpm || 0),
      0
    ) / (recentWearables.length || 1);

  const avgSteps =
    recentWearables.reduce(
      (sum, w) => sum + (w.steps || 0),
      0
    ) / (recentWearables.length || 1);

  return {
    profile,

    medicalHistory: userMedicalRecords,

    labs: userLabs,

    wearables: userWearables,

    recentTrends: {
      avgSleepEfficiency: Number(avgSleep.toFixed(1)),
      avgRestingHR: Number(avgRestingHR.toFixed(1)),
      avgSteps: Number(avgSteps.toFixed(0)),
    },
  };
}