"use client";

import { useState } from "react";
import { BellPlus } from "lucide-react";

export default function CustomAlertSettings({ 
  onSimulateAlert 
}: { 
  onSimulateAlert: (message: string) => void 
}) {
  const [metric, setMetric] = useState("Heart Rate");
  const [threshold, setThreshold] = useState("80");

  const handleSetAlert = () => {
    // In a real app, this saves to the database.
    // For demo, we immediately simulate the threshold breach.
    onSimulateAlert(`CUSTOM ALERT: ${metric} has exceeded your threshold of ${threshold}!`);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border mt-6 mb-6">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <BellPlus size={18} className="text-indigo-600" />
        Set Custom Threshold Alerts
      </h3>
      <div className="flex items-center gap-4">
        <select 
          className="border p-2 rounded-md bg-gray-50 text-sm"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <option>Heart Rate</option>
          <option>Sleep Efficiency</option>
          <option>Activity Score</option>
        </select>
        
        <span className="text-sm font-medium">&gt;</span>
        
        <input 
          type="number" 
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="border p-2 rounded-md bg-gray-50 text-sm w-24"
        />
        
        <button 
          onClick={handleSetAlert}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          Set & Test Alert
        </button>
      </div>
    </div>
  );
}
