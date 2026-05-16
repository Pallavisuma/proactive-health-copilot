"use client";

import { useEffect, useState } from "react";

import UserSidebar from "@/components/UserSidebar";
import RiskCards from "@/components/RiskCards";
import ProactiveFeed from "@/components/ProactiveFeed";
import AgentOrchestrationPanel from "@/components/AgentOrchestrationPanel";
import TrendChart from "@/components/TrendChart";
import TimelineFeed from "@/components/TimelineFeed";
import HealthTwinPanel from "@/components/HealthTwinPanel";
import CopilotChat from "@/components/CopilotChat";
import ProactiveAlerts from "@/components/ProactiveAlerts";
import CustomAlertSettings from "@/components/CustomAlertSettings";
export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  const [selectedUser, setSelectedUser] =
    useState("user_001");

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  const [customAlerts, setCustomAlerts] = useState<any[]>([]);

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
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
      {/* Sidebar */}
      <UserSidebar
        users={users}
        selectedUser={selectedUser}
        onSelect={setSelectedUser}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-sm font-semibold text-indigo-600 tracking-wider uppercase mb-1">Patient Profile</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                {dashboardData?.profile?.name}
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                {dashboardData?.profile?.condition}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600">Live Telemetry Active</span>
            </div>
          </div>

          {/* Risk Cards */}
          <RiskCards
            risks={dashboardData?.risks}
          />

          {/* Health Twin Panel */}
          <HealthTwinPanel
            healthTwin={dashboardData?.healthState}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Proactive Feed */}
            <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Proactive Insights
                </h2>
              </div>
              
              <CustomAlertSettings 
                onSimulateAlert={(msg) => {
                  const newAlert = {
                    id: `custom-${Date.now()}`,
                    type: "WARNING",
                    message: msg,
                    timestamp: new Date().toISOString()
                  };
                  setCustomAlerts(prev => [...prev, newAlert]);
                }} 
              />

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
            </div>
            
            {/* Timeline */}
            <div className="xl:col-span-1">
              <TimelineFeed />
            </div>
          </div>
        </div>
      </main>

      {/* Copilot Chatbot */}
      <CopilotChat key={selectedUser} userId={selectedUser} userName={dashboardData?.profile?.name} />

      {/* Proactive Push Notifications */}
      <ProactiveAlerts alerts={[...customAlerts, ...(dashboardData?.alerts || [])]} />
    </div>
  );
}