"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: any[];
  dataKey: string;
};

export default function TrendChart({
  title,
  data,
  dataKey,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <div className="text-sm text-gray-500">
          Longitudinal Trend
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#000"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}