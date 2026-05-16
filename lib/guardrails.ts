/**
 * Healthcare AI Guardrails
 * 
 * 1. PHI Anonymization (Protects sensitive data)
 * 2. Emergency Escalation (Intercepts critical situations)
 * 3. Anti-Diagnosis Enforcement (Prevents medical liability)
 */

export function runHealthcareGuardrails(message: string): { 
  isBlocked: boolean; 
  reason?: string; 
  sanitizedMessage: string;
  emergencyOverride?: string;
} {
  let sanitized = message;

  // 1. PHI/PII Anonymization Guardrail
  // Strip out potential SSNs or strict patterns (simplified for demo)
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  sanitized = sanitized.replace(ssnRegex, "[REDACTED_SSN]");

  const lowerMsg = sanitized.toLowerCase();

  // 2. Emergency Escalation Guardrail
  // Hard block for immediate danger
  const emergencyKeywords = ["suicide", "kill myself", "heart attack", "can't breathe", "stroke", "overdose"];
  for (const keyword of emergencyKeywords) {
    if (lowerMsg.includes(keyword)) {
      return {
        isBlocked: true,
        reason: "EMERGENCY_ESCALATION",
        sanitizedMessage: sanitized,
        emergencyOverride: "CRITICAL: I am an AI, not a doctor. Your message indicates a medical emergency. Please call 911 or go to the nearest emergency room immediately."
      };
    }
  }

  // 3. Anti-Diagnosis Guardrail (Client-Side Check)
  // Prevent users from forcing the AI to diagnose them
  const diagnosisKeywords = ["diagnose me", "do i have cancer", "prescribe me", "what disease do i have"];
  for (const keyword of diagnosisKeywords) {
    if (lowerMsg.includes(keyword)) {
      return {
        isBlocked: true,
        reason: "ANTI_DIAGNOSIS",
        sanitizedMessage: sanitized,
        emergencyOverride: "I am a proactive health copilot, not a licensed medical professional. I cannot diagnose diseases or prescribe treatments. Please consult a doctor for a medical diagnosis."
      };
    }
  }

  return { isBlocked: false, sanitizedMessage: sanitized };
}
