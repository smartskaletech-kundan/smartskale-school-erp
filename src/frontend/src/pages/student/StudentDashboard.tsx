import { StatCard } from "@/components/shared/StatCard";
import { mockStudents } from "@/data/mockStudents";
import { formatCurrency } from "@/utils/formatCurrency";
import { Award, BookOpen, ClipboardList, DollarSign } from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
}

export function StudentDashboard({ navigate }: Props) {
  const student = mockStudents[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-2xl font-bold">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Welcome, {student.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Class {student.class}-{student.section} | Roll No:{" "}
              {student.rollNo}
            </p>
            <p className="text-muted-foreground text-sm">
              Saraswati Public School, Patna
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value={`${student.attendance}%`}
          subtitle="This term"
          icon={<ClipboardList size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
        />
        <StatCard
          title="Fee Due"
          value={formatCurrency(student.feeDue)}
          subtitle="Pay now"
          icon={<DollarSign size={22} className="text-red-600" />}
          iconBg="bg-red-500/10"
        />
        <StatCard
          title="Homework"
          value="3 Pending"
          subtitle="Due this week"
          icon={<BookOpen size={22} className="text-amber-600" />}
          iconBg="bg-amber-500/10"
        />
        <StatCard
          title="Next Exam"
          value="15 Mar"
          subtitle="Half Yearly"
          icon={<Award size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Recent Homework
            </h3>
            <button
              type="button"
              onClick={() => navigate("/student/homework")}
              className="text-xs text-primary hover:underline"
            >
              View all
            </button>
          </div>
          {[
            "Quadratic Equations - Ex 5.3",
            "Chemical Reactions - Worksheet",
            "Essay Writing - Topic: My India",
          ].map((hw, i) => (
            <div
              data-ocid={`student_dashboard.homework.item.${i + 1}`}
              key={hw}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-sm text-foreground">{hw}</p>
              <span className="ml-auto text-xs text-muted-foreground">
                Due soon
              </span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Upcoming Exams
            </h3>
            <button
              type="button"
              onClick={() => navigate("/student/results")}
              className="text-xs text-primary hover:underline"
            >
              View all
            </button>
          </div>
          {[
            { name: "Mathematics", date: "15/03/2025", time: "10:00 AM" },
            { name: "Science", date: "17/03/2025", time: "10:00 AM" },
            { name: "English", date: "19/03/2025", time: "10:00 AM" },
          ].map((exam, i) => (
            <div
              data-ocid={`student_dashboard.exam.item.${i + 1}`}
              key={exam.date}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                {exam.date.split("/")[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {exam.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {exam.date} at {exam.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {student.feeDue > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">
              🚨 Fee Due: {formatCurrency(student.feeDue)}
            </p>
            <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
              Last date: 10th of month. Late fine: ₹10/day
            </p>
          </div>
          <button
            type="button"
            data-ocid="student_dashboard.pay_fee.button"
            onClick={() => navigate("/pay-fee")}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
