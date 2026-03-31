import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockResults } from "@/data/mockExams";
import { mockStudents } from "@/data/mockStudents";
import { Printer } from "lucide-react";
import React, { useState } from "react";

export function ReportCardPage() {
  const [selectedStudent, setSelectedStudent] = useState("s1");
  const student =
    mockStudents.find((s) => s.id === selectedStudent) || mockStudents[0];
  const result =
    mockResults.find((r) => r.studentId === selectedStudent) || mockResults[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Report Card
          </h1>
          <p className="text-muted-foreground text-sm">
            Auto-generated student report card
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger
              data-ocid="report_card.student.select"
              className="w-48"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockStudents.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            data-ocid="report_card.print.button"
            onClick={() => window.print()}
          >
            <Printer size={16} className="mr-2" /> Print
          </Button>
        </div>
      </div>

      {result && (
        <div className="print-card bg-white border border-gray-200 rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-blue-700 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-blue-800">
              SARASWATI PUBLIC SCHOOL
            </h1>
            <p className="text-gray-600 text-sm">
              Bailey Road, Patna - 800001, Bihar | CBSE Affiliation No: 330045
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              PROGRESS REPORT — Half Yearly 2024
            </p>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-bold">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Admission No</p>
              <p className="font-bold">{student.admissionNo}</p>
            </div>
            <div>
              <p className="text-gray-500">Class</p>
              <p className="font-bold">
                {student.class}-{student.section}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Roll No</p>
              <p className="font-bold">{student.rollNo}</p>
            </div>
            <div>
              <p className="text-gray-500">Father's Name</p>
              <p className="font-bold">{student.fatherName}</p>
            </div>
            <div>
              <p className="text-gray-500">Attendance</p>
              <p className="font-bold">{student.attendance}%</p>
            </div>
          </div>

          {/* Marks Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Subject
                </th>
                <th className="px-3 py-2 text-center font-semibold text-blue-800">
                  Max Marks
                </th>
                <th className="px-3 py-2 text-center font-semibold text-blue-800">
                  Obtained
                </th>
                <th className="px-3 py-2 text-center font-semibold text-blue-800">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub) => (
                <tr key={sub.name} className="border-b border-gray-100">
                  <td className="px-3 py-2">{sub.name}</td>
                  <td className="px-3 py-2 text-center">{sub.maxMarks}</td>
                  <td className="px-3 py-2 text-center font-semibold">
                    {sub.obtained}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        sub.grade === "A+"
                          ? "bg-green-100 text-green-700"
                          : sub.grade === "A"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sub.grade}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td className="px-3 py-2">TOTAL</td>
                <td className="px-3 py-2 text-center">{result.maxTotal}</td>
                <td className="px-3 py-2 text-center">{result.total}</td>
                <td className="px-3 py-2 text-center">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                    {result.grade}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {result.percentage}%
              </p>
              <p className="text-gray-500 text-xs">Percentage</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-700">
                {result.grade}
              </p>
              <p className="text-gray-500 text-xs">Grade</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-purple-700">
                #{result.rank}
              </p>
              <p className="text-gray-500 text-xs">Class Rank</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-500">Teacher's Remarks</p>
            <p className="text-sm font-medium text-gray-800 mt-1">
              {result.remarks}
            </p>
          </div>

          <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
            <div className="text-center">
              <div className="w-24 border-b border-gray-400 mb-1" />
              <p>Class Teacher</p>
            </div>
            <div className="text-center">
              <div className="w-24 border-b border-gray-400 mb-1" />
              <p>Parent/Guardian</p>
            </div>
            <div className="text-center">
              <div className="w-24 border-b border-gray-400 mb-1" />
              <p>Principal</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            This is a computer-generated report card. Contact school for
            queries.
          </p>
        </div>
      )}
    </div>
  );
}
