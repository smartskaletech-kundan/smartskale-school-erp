import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Science",
];

export function MarksEntry() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [marks, setMarks] = useState<Record<string, string>>({});

  const students = mockStudents.filter((s) => s.class === selectedClass);
  const setMark = (id: string, val: string) =>
    setMarks((m) => ({ ...m, [id]: val }));

  const getGrade = (m: number) =>
    m >= 90
      ? "A+"
      : m >= 80
        ? "A"
        : m >= 70
          ? "B+"
          : m >= 60
            ? "B"
            : m >= 50
              ? "C"
              : "F";

  const handleExportExcel = () => {
    const data = students.map((s) => {
      const m = Number(marks[s.id] || 0);
      return {
        "Roll No": s.rollNo,
        "Student Name": s.name,
        Subject: selectedSubject,
        "Marks (out of 100)": marks[s.id] || "Not entered",
        Grade: marks[s.id] ? getGrade(m) : "-",
        Percentage: marks[s.id] ? `${m}%` : "-",
      };
    });
    exportToExcel(
      data,
      `marks_${selectedSubject}_class${selectedClass}`,
      "Marks",
    );
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = ["Roll No", "Student Name", "Marks", "Grade"];
    const rows = students.map((s) => {
      const m = Number(marks[s.id] || 0);
      return [
        s.rollNo,
        s.name,
        marks[s.id] || "N/A",
        marks[s.id] ? getGrade(m) : "-",
      ];
    });
    exportToPDF(
      `Marks Report — ${selectedSubject} — Class ${selectedClass}`,
      columns,
      rows,
      `marks_report_${selectedSubject}_class${selectedClass}`,
    );
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Marks Entry
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter exam marks for students
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="marks.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="marks.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger data-ocid="marks.class.select" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={String(i + 1)} value={String(i + 1)}>
                  Class {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger data-ocid="marks.subject.select" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="half">Half Yearly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Roll
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Student Name
                </th>
                <th className="py-2 text-center text-xs font-semibold text-muted-foreground">
                  {selectedSubject} (Max: 100)
                </th>
                <th className="py-2 text-center text-xs font-semibold text-muted-foreground">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const m = Number(marks[s.id] || 0);
                const grade = getGrade(m);
                return (
                  <tr
                    data-ocid={`marks.student.item.${i + 1}`}
                    key={s.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-2 text-muted-foreground">{s.rollNo}</td>
                    <td className="py-2 font-medium text-foreground">
                      {s.name}
                    </td>
                    <td className="py-2 text-center">
                      <Input
                        data-ocid="marks.score.input"
                        type="number"
                        min={0}
                        max={100}
                        value={marks[s.id] || ""}
                        onChange={(e) => setMark(s.id, e.target.value)}
                        className="w-20 mx-auto text-center h-8"
                      />
                    </td>
                    <td className="py-2 text-center">
                      {marks[s.id] && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            grade === "A+"
                              ? "bg-green-100 text-green-700"
                              : grade === "A"
                                ? "bg-blue-100 text-blue-700"
                                : grade === "F"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {grade}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            data-ocid="marks.save.button"
            onClick={() => toast.success("Marks saved successfully!")}
            className="bg-success hover:bg-success/90"
          >
            Save Marks
          </Button>
        </div>
      </div>
    </div>
  );
}
