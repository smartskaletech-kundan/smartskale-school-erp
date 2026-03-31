import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/mockStudents";
import { formatCurrency } from "@/utils/formatCurrency";
import { Award, Calendar, ClipboardList, DollarSign } from "lucide-react";
import React, { useState } from "react";

interface Props {
  navigate: (path: string) => void;
}

const MONTHS = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];
const PAYMENT_STATUS = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
];

export function ParentDashboard({ navigate }: Props) {
  const children = mockStudents.slice(0, 2);
  const [activeChild, setActiveChild] = useState(0);
  const child = children[activeChild];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Parent Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Welcome, {child.fatherName}
          </p>
        </div>
        {children.length > 1 && (
          <div className="flex gap-2">
            {children.map((c, i) => (
              <button
                type="button"
                key={c.id}
                data-ocid={`parent_dashboard.child.tab.${i + 1}`}
                onClick={() => setActiveChild(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeChild === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Child Info */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xl font-bold">
          {child.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            {child.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Class {child.class}-{child.section} | Roll: {child.rollNo}
          </p>
          <p className="text-xs text-muted-foreground">
            Admission: {child.admissionNo}
          </p>
        </div>
        <div className="ml-auto">
          <Button
            data-ocid="parent_dashboard.pay_fee.button"
            size="sm"
            onClick={() => navigate("/pay-fee")}
            className="bg-success hover:bg-success/90"
          >
            <DollarSign size={14} className="mr-1" /> Pay Fees
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value={`${child.attendance}%`}
          subtitle="This term"
          icon={<ClipboardList size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
        />
        <StatCard
          title="Fee Due"
          value={formatCurrency(child.feeDue)}
          subtitle="Current dues"
          icon={<DollarSign size={22} className="text-red-600" />}
          iconBg="bg-red-500/10"
        />
        <StatCard
          title="Last Result"
          value="83%"
          subtitle="Half Yearly"
          icon={<Award size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Next PTM"
          value="20 Mar"
          subtitle="10 AM - 2 PM"
          icon={<Calendar size={22} className="text-violet-600" />}
          iconBg="bg-violet-500/10"
        />
      </div>

      {/* Fee Calendar */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            Fee Payment Status 2024-25
          </h3>
          <button
            type="button"
            onClick={() => navigate("/pay-fee")}
            className="text-xs text-primary hover:underline"
          >
            Pay dues
          </button>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {MONTHS.map((month, i) => (
            <div
              key={month}
              data-ocid={`parent_dashboard.fee_month.item.${i + 1}`}
              className={`rounded-xl p-2 text-center ${
                PAYMENT_STATUS[i]
                  ? "bg-green-100 dark:bg-green-900/20"
                  : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              <p
                className={`text-xs font-bold ${PAYMENT_STATUS[i] ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-400"}`}
              >
                {month}
              </p>
              <p className="text-xs mt-0.5">
                {PAYMENT_STATUS[i] ? "✅" : "🔴"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
