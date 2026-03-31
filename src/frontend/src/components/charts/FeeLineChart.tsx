import { monthlyCollectionData } from "@/data/mockFees";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs">
        <p className="font-semibold">{label}</p>
        <p>₹{(payload[0].value / 100000).toFixed(2)}L</p>
      </div>
    );
  }
  return null;
};

export function FeeLineChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Monthly Fee Collection
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Apr 2024 – Mar 2025
          </p>
        </div>
        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
          ₹8.45L this month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={monthlyCollectionData}
          margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="feeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={2.5}
            fill="url(#feeGrad)"
            dot={{ fill: "#2563EB", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
