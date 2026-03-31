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
  { name: "Online (UPI/Card)", value: 68, color: "#2563EB" },
  { name: "Cash", value: 32, color: "#10B981" },
];

export function PaymentDonutChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          Payment Method Split
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          This month's transactions
        </p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-1">
        <p className="text-xl font-heading font-bold text-primary">
          68% Online
        </p>
        <p className="text-xs text-muted-foreground">
          Digital payments preferred
        </p>
      </div>
    </div>
  );
}
