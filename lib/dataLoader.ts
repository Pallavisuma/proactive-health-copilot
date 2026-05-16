import fs from "fs";
import path from "path";
import Papa from "papaparse";

export function loadProfiles() {
  const filePath = path.join(process.cwd(), "data", "profiles.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data).users;
}

export function loadMedicalRecords() {
  const filePath = path.join(process.cwd(), "data", "medical_records.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data).medical_records;
}

export function loadLabResults() {
  const filePath = path.join(process.cwd(), "data", "lab_results.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data).lab_results;
}

export function loadWearableData() {
  const filePath = path.join(process.cwd(), "data", "wearable_data.csv");

  const csvData = fs.readFileSync(filePath, "utf-8");

  const parsed = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}