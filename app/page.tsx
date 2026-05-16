"use client";

import { useEffect, useState } from "react";

import UserSidebar from "@/components/UserSidebar";
import RiskCards from "@/components/RiskCards";
import ProactiveFeed from "@/components/ProactiveFeed";
import AgentOrchestrationPanel from "@/components/AgentOrchestrationPanel";
import TrendChart from "@/components/TrendChart";
import TimelineFeed from "@/components/TimelineFeed";
import HealthTwinPanel from "@/components/HealthTwinPanel";
export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  const [selectedUser, setSelectedUser] =
    useState("user_001");

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  // ----------------------------
  // Load users
  // ----------------------------
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // ----------------------------
  // Load dashboard data
  // ----------------------------
  useEffect(() => {
    fetch(`/api/dashboard/${selectedUser}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, [selectedUser]);

  const sleepTrend = [
    { day: "Mon", value: 82 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 78 },
    { day: "Thu", value: 74 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 70 },
    { day: "Sun", value: 73 },
  ];

  const hrTrend = [
    { day: "Mon", value: 68 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 72 },
    { day: "Thu", value: 75 },
    { day: "Fri", value: 78 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 77 },
  ];


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar
        users={users}
        selectedUser={selectedUser}
        onSelect={setSelectedUser}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">
              {dashboardData?.profile?.name}
            </h1>

            <p className="text-gray-600 mt-1">
              {
                dashboardData?.profile?.condition
              }
            </p>
          </div>

          {/* Risk Cards */}
          <RiskCards
            risks={dashboardData?.risks}
          />

          {/* Health Twin Panel */}
          <HealthTwinPanel
            healthTwin={dashboardData?.healthState}
          />

          <div className="grid grid-cols-2 gap-6">
            <TrendChart
              title="Sleep Efficiency Trend"
              data={sleepTrend}
              dataKey="value"
            />

            <TrendChart
              title="Resting Heart Rate Trend"
              data={hrTrend}
              dataKey="value"
            />
          </div>

          {/* Proactive Feed */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Proactive Insights
            </h2>

            <ProactiveFeed
              triggers={
                dashboardData?.triggers || []
              }
            />

            <AgentOrchestrationPanel
              memory={dashboardData?.memory}
              agentOutputs={
                dashboardData?.agentOutputs || []
              }
              alerts={dashboardData?.alerts || []}
            />

            <TimelineFeed />
          </div>
        </div>
      </main>
    </div>
  );
}