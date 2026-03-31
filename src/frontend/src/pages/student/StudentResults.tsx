import { Progress } from "@/components/ui/progress";
import { mockResults } from "@/data/mockExams";
import React from "react";

export function StudentResults() {
  const result = mockResults[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Exam Results
        </h1>
        <p className="text-muted-foreground text-sm">Half Yearly Exam 2024</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 text-center shadow-card">
          <p className="text-3xl font-heading font-bold text-primary">
            {result.percentage}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">Percentage</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 text-center shadow-card">
          <p className="text-3xl font-heading font-bold text-success">
            {result.grade}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Grade</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 text-center shadow-card">
          <p className="text-3xl font-heading font-bold text-violet-600">
            #{result.rank}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Class Rank</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Subject-wise Performance
        </h3>
        <div className="space-y-4">
          {result.subjects.map((sub, i) => (
            <div data-ocid={`results.subject.item.${i + 1}`} key={sub.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  {sub.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {sub.obtained}/{sub.maxMarks}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      sub.grade === "A+"
                        ? "bg-green-100 text-green-700"
                        : sub.grade === "A"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {sub.grade}
                  </span>
                </div>
              </div>
              <Progress
                value={(sub.obtained / sub.maxMarks) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
