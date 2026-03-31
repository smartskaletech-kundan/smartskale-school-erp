import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTransactions } from "@/data/mockFees";
import { mockStudents } from "@/data/mockStudents";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowLeft, CreditCard, MapPin, Phone, User } from "lucide-react";
import React, { useState } from "react";

interface Props {
  navigate: (path: string) => void;
  studentId?: string;
}

export function StudentProfile({ navigate, studentId }: Props) {
  const student =
    mockStudents.find((s) => s.id === studentId) || mockStudents[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/students")}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Student Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Admission No: {student.admissionNo}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold flex-shrink-0">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {student.name}
                </h2>
                <p className="text-muted-foreground">
                  Class {student.class}-{student.section} | Roll No:{" "}
                  {student.rollNo}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge
                  className={
                    student.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {student.status}
                </Badge>
                <Button
                  data-ocid="student_profile.idcard.button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/admin/students/${student.id}/idcard`)
                  }
                >
                  <CreditCard size={14} className="mr-1" /> ID Card
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p
                  className={`text-xl font-bold ${student.attendance >= 85 ? "text-success" : "text-warning"}`}
                >
                  {student.attendance}%
                </p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p
                  className={`text-xl font-bold ${student.feeDue > 0 ? "text-destructive" : "text-success"}`}
                >
                  {formatCurrency(student.feeDue)}
                </p>
                <p className="text-xs text-muted-foreground">Fee Due</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-foreground">
                  {student.bloodGroup}
                </p>
                <p className="text-xs text-muted-foreground">Blood Group</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-foreground">
                  {student.category}
                </p>
                <p className="text-xs text-muted-foreground">Category</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="bg-muted">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fee History</TabsTrigger>
        </TabsList>

        <TabsContent
          value="personal"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground">
                Personal Details
              </h3>
              {[
                {
                  icon: <User size={16} />,
                  label: "Full Name",
                  value: student.name,
                },
                {
                  icon: <User size={16} />,
                  label: "Date of Birth",
                  value: student.dob,
                },
                {
                  icon: <User size={16} />,
                  label: "Gender",
                  value: student.gender,
                },
                {
                  icon: <User size={16} />,
                  label: "Religion",
                  value: student.religion,
                },
                {
                  icon: <User size={16} />,
                  label: "Category",
                  value: student.category,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground">
                Family Details
              </h3>
              {[
                { label: "Father's Name", value: student.fatherName },
                { label: "Mother's Name", value: student.motherName },
                { label: "Contact", value: student.mobile },
                { label: "Email", value: student.email },
                {
                  label: "Address",
                  value: `${student.address}, ${student.city}, ${student.state} - ${student.pin}`,
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="academic"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Class", value: `${student.class}-${student.section}` },
              { label: "Roll No", value: String(student.rollNo) },
              { label: "Admission No", value: student.admissionNo },
              { label: "Admission Date", value: student.admissionDate },
              { label: "Board", value: "CBSE" },
              {
                label: "Previous School",
                value: student.previousSchool || "N/A",
              },
            ].map((item) => (
              <div key={item.label} className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="attendance"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="text-center py-8">
            <p className="text-4xl font-heading font-bold text-primary">
              {student.attendance}%
            </p>
            <p className="text-muted-foreground mt-2">Overall Attendance</p>
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-sm mx-auto">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="font-bold text-success">87</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-center">
                <p className="font-bold text-destructive">8</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <p className="font-bold text-warning">5</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="fees"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="space-y-3">
            {mockTransactions
              .filter((t) => t.studentId === student.id)
              .map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {t.feeHead}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.date} · {t.receiptNo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {formatCurrency(t.amount)}
                    </p>
                    <Badge
                      className={
                        t.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }
                    >
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            {mockTransactions.filter((t) => t.studentId === student.id)
              .length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No transactions found
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
