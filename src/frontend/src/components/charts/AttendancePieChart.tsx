import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Present", value: 5624, color: "#10B981" },
  { name: "Absent", value: 342, color: "#EF4444" },
  { name: "Late", value: 281, color: "#F59E0B" },
];

export function AttendancePieChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          Today's Attendance
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          6,247 total students
        </p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => [v.toLocaleString("en-IN"), "Students"]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center">
        <p className="text-2xl font-heading font-bold text-success">94.2%</p>
        <p className="text-xs text-muted-foreground">Attendance Rate</p>
      </div>
    </div>
  );
}
