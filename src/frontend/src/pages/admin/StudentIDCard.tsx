import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/mockStudents";
import { ArrowLeft, Printer } from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
  studentId?: string;
}

export function StudentIDCard({ navigate, studentId }: Props) {
  const student =
    mockStudents.find((s) => s.id === studentId) || mockStudents[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Student ID Card
          </h1>
        </div>
        <Button data-ocid="id_card.print.button" onClick={() => window.print()}>
          <Printer size={16} className="mr-2" /> Print ID Card
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="print-card w-80 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-4 py-3 text-center">
            <p className="text-white font-bold text-sm">
              SARASWATI PUBLIC SCHOOL
            </p>
            <p className="text-blue-200 text-xs">
              Bailey Road, Patna - 800001, Bihar
            </p>
            <p className="text-blue-200 text-xs">CBSE Affiliation No: 330045</p>
          </div>

          {/* Student Info */}
          <div className="p-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-3xl font-bold flex-shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-base leading-tight">
                  {student.name}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Class: {student.class}-{student.section}
                </p>
                <p className="text-gray-600 text-xs">
                  Roll No: {student.rollNo}
                </p>
                <p className="text-gray-600 text-xs">
                  Adm No: {student.admissionNo}
                </p>
                <p className="text-gray-600 text-xs">DOB: {student.dob}</p>
                <p className="text-gray-600 text-xs">
                  Blood: {student.bloodGroup}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-1">
              <p className="text-gray-600 text-xs">
                <span className="font-semibold">Father:</span>{" "}
                {student.fatherName}
              </p>
              <p className="text-gray-600 text-xs">
                <span className="font-semibold">Contact:</span> {student.mobile}
              </p>
              <p className="text-gray-600 text-xs text-wrap">
                <span className="font-semibold">Address:</span>{" "}
                {student.address}, {student.city}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-3 gap-0.5">
                {["tl", "tm", "tr", "ml", "mm", "mr", "bl", "bm", "br"].map(
                  (pos) => (
                    <div
                      key={pos}
                      className={`w-3 h-3 ${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"} rounded-sm`}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Academic Year</p>
              <p className="text-xs font-bold text-gray-900">2024-25</p>
              <p className="text-xs text-gray-400 mt-1">
                Valid till: March 2025
              </p>
            </div>
          </div>
          <div className="bg-blue-700 py-1 text-center">
            <p className="text-white text-xs">
              If found, please return to school: +91 612 234 5678
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
