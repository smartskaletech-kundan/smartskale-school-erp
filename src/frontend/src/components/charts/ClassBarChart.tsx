import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { class: "1", students: 180 },
  { class: "2", students: 165 },
  { class: "3", students: 172 },
  { class: "4", students: 158 },
  { class: "5", students: 175 },
  { class: "6", students: 190 },
  { class: "7", students: 185 },
  { class: "8", students: 178 },
  { class: "9", students: 220 },
  { class: "10", students: 245 },
  { class: "11", students: 210 },
  { class: "12", students: 169 },
];

export function ClassBarChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          Class-wise Strength
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Total: 6,247 students
        </p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: -15, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="class"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v: number) => [v, "Students"]}
            labelFormatter={(l) => `Class ${l}`}
          />
          <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
