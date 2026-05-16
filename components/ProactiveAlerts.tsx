"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X, BellRing } from "lucide-react";

interface Alert {
  id: string;
  type: "CRITICAL" | "WARNING" | "INFO";
  message: string;
  timestamp: string;
}

export default function ProactiveAlerts({ alerts }: { alerts: Alert[] }) {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Only show critical or warning alerts as proactive popups
    const newImportantAlerts = alerts.filter(
      (a) => a.type === "CRITICAL" || a.type === "WARNING"
    );
    setActiveAlerts(newImportantAlerts);
  }, [alerts]);

  const dismissAlert = (id: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  if (activeAlerts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`w-80 p-4 rounded-xl shadow-xl flex items-start gap-3 border animate-in slide-in-from-top-5 ${
            alert.type === "CRITICAL"
              ? "bg-red-50 border-red-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div
            className={`p-2 rounded-full mt-0.5 ${
              alert.type === "CRITICAL"
                ? "bg-red-100 text-red-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {alert.type === "CRITICAL" ? (
              <AlertCircle size={20} />
            ) : (
              <BellRing size={20} />
            )}
          </div>
          
          <div className="flex-1">
            <h4
              className={`font-semibold text-sm ${
                alert.type === "CRITICAL" ? "text-red-900" : "text-amber-900"
              }`}
            >
              {alert.type === "CRITICAL" ? "Critical Health Alert" : "Proactive Warning"}
            </h4>
            <p
              className={`text-sm mt-1 leading-relaxed ${
                alert.type === "CRITICAL" ? "text-red-800" : "text-amber-800"
              }`}
            >
              {alert.message}
            </p>
          </div>

          <button
            onClick={() => dismissAlert(alert.id)}
            className={`p-1 rounded-md transition-colors ${
              alert.type === "CRITICAL"
                ? "text-red-400 hover:bg-red-100"
                : "text-amber-400 hover:bg-amber-100"
            }`}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
