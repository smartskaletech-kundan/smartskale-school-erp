import { Progress } from "@/components/ui/progress";
import { mockStudents } from "@/data/mockStudents";
import React from "react";

const months = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];
const attendanceByMonth = [92, 88, 95, 87, 90, 85, 91, 93, 88, 87, 90, 87];

export function StudentAttendance() {
  const student = mockStudents[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          My Attendance
        </h1>
        <p className="text-muted-foreground text-sm">Academic Year 2024-25</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
          <p className="text-2xl font-bold text-primary">
            {student.attendance}%
          </p>
          <p className="text-xs text-muted-foreground">Overall</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
          <p className="text-2xl font-bold text-success">87</p>
          <p className="text-xs text-muted-foreground">Days Present</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
          <p className="text-2xl font-bold text-destructive">8</p>
          <p className="text-xs text-muted-foreground">Days Absent</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
          <p className="text-2xl font-bold text-warning">5</p>
          <p className="text-xs text-muted-foreground">Late Arrivals</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Month-wise Attendance
        </h3>
        <div className="space-y-3">
          {months.map((month, i) => (
            <div
              data-ocid={`attendance.month.item.${i + 1}`}
              key={month}
              className="flex items-center gap-4"
            >
              <span className="text-sm w-8 text-muted-foreground">{month}</span>
              <div className="flex-1">
                <Progress value={attendanceByMonth[i]} className="h-2" />
              </div>
              <span
                className={`text-sm font-semibold w-10 text-right ${
                  attendanceByMonth[i] >= 90
                    ? "text-success"
                    : attendanceByMonth[i] >= 75
                      ? "text-warning"
                      : "text-destructive"
                }`}
              >
                {attendanceByMonth[i]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
