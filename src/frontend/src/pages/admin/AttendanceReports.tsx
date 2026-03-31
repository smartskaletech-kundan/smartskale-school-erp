import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStudents } from "@/data/mockStudents";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { FileSpreadsheet, FileText } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const monthData = [
  { month: "Oct", attendance: 92 },
  { month: "Nov", attendance: 88 },
  { month: "Dec", attendance: 85 },
  { month: "Jan", attendance: 91 },
  { month: "Feb", attendance: 94 },
  { month: "Mar", attendance: 87 },
];

export function AttendanceReports() {
  const [classFilter, setClassFilter] = useState("all");

  const handleExportExcel = () => {
    const data = mockStudents.map((s) => ({
      "Student Name": s.name,
      Class: `${s.class}-${s.section}`,
      "Present Days": Math.round((s.attendance / 100) * 220),
      "Absent Days": Math.round(((100 - s.attendance) / 100) * 220),
      "Late Days": Math.round(Math.random() * 5),
      "Attendance %": `${s.attendance}%`,
    }));
    exportToExcel(data, "attendance_report", "Attendance");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Student Name",
      "Class",
      "Present",
      "Absent",
      "Attendance %",
    ];
    const rows = mockStudents.map((s) => [
      s.name,
      `${s.class}-${s.section}`,
      String(Math.round((s.attendance / 100) * 220)),
      String(Math.round(((100 - s.attendance) / 100) * 220)),
      `${s.attendance}%`,
    ]);
    exportToPDF("Attendance Report", columns, rows, "attendance_report");
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Attendance Reports
          </h1>
          <p className="text-muted-foreground text-sm">
            Monthly attendance analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="attendance.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="attendance.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Monthly Trend
            </h3>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={String(i + 1)} value={String(i + 1)}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[70, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip formatter={(v: number) => [`${v}%`, "Attendance"]} />
              <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Student Attendance Summary
          </h3>
          <div className="space-y-2">
            {mockStudents.slice(0, 7).map((s, i) => (
              <div
                data-ocid={`attendance.student.item.${i + 1}`}
                key={s.id}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">
                      {s.name} — {s.class}-{s.section}
                    </span>
                    <span
                      className={`text-xs font-bold ${s.attendance >= 85 ? "text-success" : s.attendance >= 75 ? "text-warning" : "text-destructive"}`}
                    >
                      {s.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${s.attendance >= 85 ? "bg-success" : s.attendance >= 75 ? "bg-warning" : "bg-destructive"}`}
                      style={{ width: `${s.attendance}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
