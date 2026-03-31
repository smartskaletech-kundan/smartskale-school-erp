import { timetableData } from "@/data/mockClasses";
import React from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const PERIODS = [
  "Period 1",
  "Period 2",
  "Period 3",
  "Period 4",
  "Period 5",
  "Period 6",
  "Period 7",
  "Period 8",
];

export function TimetablePage() {
  const subjectColors: Record<string, string> = {
    Mathematics: "bg-blue-100 text-blue-800",
    Science: "bg-green-100 text-green-800",
    English: "bg-violet-100 text-violet-800",
    Hindi: "bg-orange-100 text-orange-800",
    "Social Science": "bg-amber-100 text-amber-800",
    Computer: "bg-cyan-100 text-cyan-800",
    Sanskrit: "bg-pink-100 text-pink-800",
    Art: "bg-rose-100 text-rose-800",
    Sports: "bg-lime-100 text-lime-800",
    Library: "bg-gray-100 text-gray-800",
    Assembly: "bg-purple-100 text-purple-800",
    Games: "bg-teal-100 text-teal-800",
  };

  const getColor = (cell: string) => {
    const subject = Object.keys(subjectColors).find((s) => cell.startsWith(s));
    return subject ? subjectColors[subject] : "bg-muted text-foreground";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Timetable
        </h1>
        <p className="text-muted-foreground text-sm">
          Class 10-A | Academic Year 2024-25
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card overflow-x-auto">
        <table className="w-full text-sm min-w-max">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">
                Period
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground min-w-32"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period, pi) => (
              <tr key={period} className="border-b border-border last:border-0">
                <td className="px-3 py-2">
                  <div className="text-xs font-semibold text-foreground">
                    {period}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {
                      [
                        "8:00",
                        "8:45",
                        "9:30",
                        "10:15",
                        "11:15",
                        "12:00",
                        "12:45",
                        "1:30",
                      ][pi]
                    }
                    -
                    {
                      [
                        "8:45",
                        "9:30",
                        "10:15",
                        "11:00",
                        "12:00",
                        "12:45",
                        "1:30",
                        "2:15",
                      ][pi]
                    }
                  </div>
                </td>
                {DAYS.map((day) => {
                  const cell = timetableData[day]?.[period] || "";
                  return (
                    <td key={day} className="px-3 py-2 text-center">
                      {cell ? (
                        <div
                          className={`text-xs px-2 py-1.5 rounded-lg font-medium ${getColor(cell)}`}
                        >
                          {cell.split(" (")[0]}
                          {cell.includes("(") && (
                            <div className="text-xs opacity-70 mt-0.5">
                              {cell.match(/\(([^)]+)\)/)?.[1]}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
