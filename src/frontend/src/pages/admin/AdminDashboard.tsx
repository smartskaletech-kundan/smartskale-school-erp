import { AttendancePieChart } from "@/components/charts/AttendancePieChart";
import { FeeLineChart } from "@/components/charts/FeeLineChart";
import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/mockStudents";
import {
  AlertCircle,
  DollarSign,
  FileText,
  GraduationCap,
  Plus,
  Send,
  Users,
} from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
}

const recentAdmissions = mockStudents.slice(0, 5);

export function AdminDashboard({ navigate }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Academic Year 2024-25
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            data-ocid="admin_dashboard.add_student.button"
            size="sm"
            onClick={() => navigate("/admin/students/add")}
          >
            <Plus size={16} className="mr-2" /> Add Student
          </Button>
          <Button
            data-ocid="admin_dashboard.notice.button"
            size="sm"
            variant="outline"
            onClick={() => navigate("/notices")}
          >
            <Send size={16} className="mr-2" /> Send Notice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="6,247"
          subtitle="Active enrollments"
          icon={<Users size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
          trend={2.1}
        />
        <StatCard
          title="Fee Collected"
          value="₹8,45,200"
          subtitle="This month"
          icon={<DollarSign size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
          trend={5.2}
        />
        <StatCard
          title="Pending Fees"
          value="₹2,12,500"
          subtitle="89 students"
          icon={<AlertCircle size={22} className="text-red-600" />}
          iconBg="bg-red-500/10"
          trend={-3.1}
        />
        <StatCard
          title="Attendance"
          value="94.2%"
          subtitle="Today"
          icon={<GraduationCap size={22} className="text-violet-600" />}
          iconBg="bg-violet-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeeLineChart />
        <AttendancePieChart />
      </div>

      {/* Recent Admissions */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            Recent Admissions
          </h3>
          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="text-xs text-primary hover:underline"
          >
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Student
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Class
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Adm. Date
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentAdmissions.map((s, i) => (
                <tr
                  data-ocid={`admin_dashboard.admission.item.${i + 1}`}
                  key={s.id}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate(`/admin/students/${s.id}`)
                  }
                  tabIndex={0}
                  className="border-b border-border last:border-0 hover:bg-muted/40 cursor-pointer"
                  onClick={() => navigate(`/admin/students/${s.id}`)}
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.fatherName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-foreground">
                      {s.class}-{s.section}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {s.admissionDate}
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={s.status === "Active" ? "default" : "secondary"}
                      className={
                        s.status === "Active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : ""
                      }
                    >
                      {s.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
