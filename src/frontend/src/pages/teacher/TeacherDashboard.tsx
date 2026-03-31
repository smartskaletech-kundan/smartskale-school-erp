import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { mockStudents } from "@/data/mockStudents";
import { BookOpen, Calendar, ClipboardList, PenTool } from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
}

const recentHomework = [
  {
    subject: "Mathematics",
    class: "10-A",
    title: "Ch.5 Quadratic Equations",
    due: "28/03/2024",
    submitted: 28,
    total: 35,
  },
  {
    subject: "Mathematics",
    class: "11-B",
    title: "Ch.3 Trigonometry",
    due: "30/03/2024",
    submitted: 22,
    total: 40,
  },
  {
    subject: "Mathematics",
    class: "9-A",
    title: "Ch.7 Coordinate Geometry",
    due: "25/03/2024",
    submitted: 30,
    total: 38,
  },
];

export function TeacherDashboard({ navigate }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Teacher Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Mathematics Department | Classes: 9, 10, 11
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Classes"
          value="6"
          subtitle="Today's schedule"
          icon={<Calendar size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Homework Due"
          value="3"
          subtitle="Pending review"
          icon={<BookOpen size={22} className="text-amber-600" />}
          iconBg="bg-amber-500/10"
        />
        <StatCard
          title="Attendance"
          value="87%"
          subtitle="Class 10-A today"
          icon={<ClipboardList size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
        />
        <StatCard
          title="Marks Pending"
          value="2"
          subtitle="Exams to grade"
          icon={<PenTool size={22} className="text-red-600" />}
          iconBg="bg-red-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Today's Attendance
            </h3>
            <button
              type="button"
              onClick={() => navigate("/teacher/attendance")}
              className="text-xs text-primary hover:underline"
            >
              Mark Attendance
            </button>
          </div>
          <div className="space-y-2">
            {[
              { class: "10-A", present: 34, total: 36 },
              { class: "11-B", present: 38, total: 42 },
              { class: "9-A", present: 32, total: 38 },
            ].map((c, i) => (
              <div
                data-ocid={`teacher_dashboard.class.item.${i + 1}`}
                key={c.class}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium text-foreground w-12">
                  Class {c.class}
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{ width: `${(c.present / c.total) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {c.present}/{c.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Recent Homework
            </h3>
            <button
              type="button"
              onClick={() => navigate("/teacher/homework")}
              className="text-xs text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentHomework.map((hw, i) => (
              <div
                data-ocid={`teacher_dashboard.homework.item.${i + 1}`}
                key={hw.title}
                className="p-3 rounded-xl bg-muted/50"
              >
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {hw.title}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                    Class {hw.class}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Due: {hw.due} | Submitted: {hw.submitted}/{hw.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
