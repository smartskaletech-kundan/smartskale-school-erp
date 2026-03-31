import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStudents } from "@/data/mockStudents";
import React, { useState } from "react";
import { toast } from "sonner";

type AttendStatus = "P" | "A" | "L";

export function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendStatus>>(
    {},
  );

  const students = mockStudents.filter(
    (s) => s.class === selectedClass && s.section === selectedSection,
  );

  const setStatus = (id: string, status: AttendStatus) =>
    setAttendance((a) => ({ ...a, [id]: status }));

  const handleSubmit = () => {
    const presentCount = Object.values(attendance).filter(
      (v) => v === "P",
    ).length;
    toast.success(
      `Attendance submitted! Present: ${presentCount}/${students.length}`,
    );
  };

  const btnClass = (id: string, status: AttendStatus) => {
    const active = attendance[id] === status;
    return `px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
      status === "P"
        ? active
          ? "bg-green-500 text-white border-green-500"
          : "border-green-300 text-green-600 hover:bg-green-50"
        : status === "A"
          ? (
              active
                ? "bg-red-500 text-white border-red-500"
                : "border-red-300 text-red-600 hover:bg-red-50"
            )
          : (
              active
                ? "bg-amber-500 text-white border-amber-500"
                : "border-amber-300 text-amber-600 hover:bg-amber-50"
            )
    }`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Mark Attendance
        </h1>
        <p className="text-muted-foreground text-sm">Daily class attendance</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger data-ocid="attendance.class.select" className="w-32">
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
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger
              data-ocid="attendance.section.select"
              className="w-28"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["A", "B", "C", "D"].map((s) => (
                <SelectItem key={s} value={s}>
                  Section {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background"
          />
        </div>

        {/* Legend */}
        <div className="flex gap-3 mb-4">
          <span className="text-xs flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-green-500 inline-block" />{" "}
            Present
          </span>
          <span className="text-xs flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-red-500 inline-block" /> Absent
          </span>
          <span className="text-xs flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-amber-500 inline-block" /> Late
          </span>
        </div>

        <div className="space-y-2">
          {students.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No students in Class {selectedClass}-{selectedSection}
            </p>
          ) : (
            students.map((s, i) => (
              <div
                data-ocid={`attendance.student.item.${i + 1}`}
                key={s.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 border border-border"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Roll: {s.rollNo}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btnClass(s.id, "P")}
                    onClick={() => setStatus(s.id, "P")}
                  >
                    P
                  </button>
                  <button
                    type="button"
                    className={btnClass(s.id, "A")}
                    onClick={() => setStatus(s.id, "A")}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    className={btnClass(s.id, "L")}
                    onClick={() => setStatus(s.id, "L")}
                  >
                    L
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Present:{" "}
            <strong className="text-success">
              {Object.values(attendance).filter((v) => v === "P").length}
            </strong>{" "}
            | Absent:{" "}
            <strong className="text-destructive">
              {Object.values(attendance).filter((v) => v === "A").length}
            </strong>{" "}
            | Late:{" "}
            <strong className="text-warning">
              {Object.values(attendance).filter((v) => v === "L").length}
            </strong>
          </p>
          <Button
            data-ocid="attendance.submit.button"
            onClick={handleSubmit}
            className="bg-success hover:bg-success/90"
          >
            Submit Attendance
          </Button>
        </div>
      </div>
    </div>
  );
}
