import { AttendancePieChart } from "@/components/charts/AttendancePieChart";
import { ClassBarChart } from "@/components/charts/ClassBarChart";
import { FeeLineChart } from "@/components/charts/FeeLineChart";
import { PaymentDonutChart } from "@/components/charts/PaymentDonutChart";
import { StatCard } from "@/components/shared/StatCard";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  AlertCircle,
  DollarSign,
  GraduationCap,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import React from "react";

const recentActivity = [
  {
    icon: "🟢",
    text: "Rahul Kumar paid ₹4,550",
    time: "2 min ago",
    color: "text-success",
  },
  {
    icon: "📋",
    text: "Class 9-A attendance marked",
    time: "10 min ago",
    color: "text-primary",
  },
  {
    icon: "📝",
    text: "Homework posted: Maths Ch.5 by Mr. Anil",
    time: "25 min ago",
    color: "text-primary",
  },
  {
    icon: "🔴",
    text: "Fee overdue: 23 students",
    time: "Today",
    color: "text-destructive",
  },
  {
    icon: "➕",
    text: "New admission: Ananya Tiwari, Class 3-A",
    time: "1 hr ago",
    color: "text-success",
  },
  {
    icon: "📤",
    text: "Salary slips generated for March 2024",
    time: "2 hr ago",
    color: "text-warning",
  },
  {
    icon: "📊",
    text: "Monthly report exported by Admin",
    time: "3 hr ago",
    color: "text-muted-foreground",
  },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Super Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Saraswati Public School — Academic Year 2024-25
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Students"
          value="6,247"
          subtitle="+127 this month"
          icon={<Users size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
          trend={2.1}
        />
        <StatCard
          title="Staff Members"
          value="312"
          subtitle="Teaching + Non-teaching"
          icon={<UserCheck size={22} className="text-emerald-600" />}
          iconBg="bg-emerald-500/10"
          trend={0.5}
        />
        <StatCard
          title="Fee This Month"
          value="₹8,45,200"
          subtitle="Target: ₹10,00,000"
          icon={<DollarSign size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
          trend={5.2}
        />
        <StatCard
          title="Pending Fees"
          value="₹2,12,500"
          subtitle="From 89 students"
          icon={<AlertCircle size={22} className="text-red-600" />}
          iconBg="bg-red-500/10"
          trend={-8.3}
        />
        <StatCard
          title="Attendance Today"
          value="94.2%"
          subtitle="5,891 present"
          icon={<GraduationCap size={22} className="text-violet-600" />}
          iconBg="bg-violet-500/10"
          badge="Live"
          badgeColor="bg-green-100 text-green-700"
        />
        <StatCard
          title="Active Classes"
          value="3"
          subtitle="Live right now"
          icon={<Video size={22} className="text-amber-600" />}
          iconBg="bg-amber-500/10"
          badge="Live"
          badgeColor="bg-red-100 text-red-700"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeeLineChart />
        </div>
        <AttendancePieChart />
      </div>

      {/* Charts Row 2 + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClassBarChart />
        <PaymentDonutChart />

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Recent Activity
            </h3>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a) => (
              <div key={a.text} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground font-medium leading-snug">
                    {a.text}
                  </p>
                  <p className={`text-xs mt-0.5 ${a.color}`}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
