import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock } from "lucide-react";
import React from "react";

const homework = [
  {
    id: "h1",
    title: "Quadratic Equations - Ex 5.3",
    subject: "Mathematics",
    teacher: "Mr. Anil Kumar",
    due: "28/03/2024",
    status: "Pending",
  },
  {
    id: "h2",
    title: "Chemical Reactions Worksheet",
    subject: "Science",
    teacher: "Mr. Rakesh Sharma",
    due: "30/03/2024",
    status: "Submitted",
  },
  {
    id: "h3",
    title: "Essay - My India",
    subject: "English",
    teacher: "Mrs. Priya Verma",
    due: "25/03/2024",
    status: "Pending",
  },
  {
    id: "h4",
    title: "Chapter 7 - Exercises",
    subject: "Social Science",
    teacher: "Mr. Vivek Singh",
    due: "01/04/2024",
    status: "Pending",
  },
];

export function StudentHomework() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          My Homework
        </h1>
        <p className="text-muted-foreground text-sm">
          Pending and submitted assignments
        </p>
      </div>
      <div className="space-y-3">
        {homework.map((hw, i) => (
          <div
            data-ocid={`homework.item.${i + 1}`}
            key={hw.id}
            className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <BookOpen size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{hw.title}</p>
              <p className="text-xs text-muted-foreground">
                {hw.subject} | {hw.teacher}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Clock size={10} /> Due: {hw.due}
              </p>
            </div>
            <Badge
              className={
                hw.status === "Submitted"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }
            >
              {hw.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
