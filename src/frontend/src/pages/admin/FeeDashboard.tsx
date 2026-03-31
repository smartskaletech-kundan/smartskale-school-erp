import { FeeLineChart } from "@/components/charts/FeeLineChart";
import { PaymentDonutChart } from "@/components/charts/PaymentDonutChart";
import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockTransactions } from "@/data/mockFees";
import { formatCurrency } from "@/utils/formatCurrency";
import { AlertCircle, DollarSign, RefreshCw, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  navigate: (path: string) => void;
}

export function FeeDashboard({ navigate }: Props) {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setLastRefresh(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const collected = 845200;
  const target = 1000000;
  const progress = Math.round((collected / target) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Fee Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Live fee collection overview
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw size={12} />
          Auto-refresh: {lastRefresh.toLocaleTimeString("en-IN")}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Collection"
          value="₹45,230"
          subtitle="12 transactions"
          icon={<DollarSign size={22} className="text-green-600" />}
          iconBg="bg-green-500/10"
          trend={8.2}
        />
        <StatCard
          title="This Month"
          value="₹8,45,200"
          subtitle="Target: ₹10,00,000"
          icon={<TrendingUp size={22} className="text-blue-600" />}
          iconBg="bg-blue-500/10"
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
          title="Online Payments"
          value="68%"
          subtitle="vs 32% cash"
          icon={<DollarSign size={22} className="text-violet-600" />}
          iconBg="bg-violet-500/10"
        />
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Monthly Collection Progress
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatCurrency(collected)} collected of {formatCurrency(target)}{" "}
              target
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeeLineChart />
        <PaymentDonutChart />
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            Recent Transactions
          </h3>
          <button
            type="button"
            onClick={() => navigate("/admin/fees/transactions")}
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
                  Receipt
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Amount
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Method
                </th>
                <th className="py-2 text-left text-xs font-semibold text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.slice(0, 6).map((t, i) => (
                <tr
                  data-ocid={`fee_dashboard.transaction.item.${i + 1}`}
                  key={t.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3">
                    <p className="font-medium text-foreground">
                      {t.studentName}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.class}</p>
                  </td>
                  <td className="py-3 text-xs font-mono text-muted-foreground">
                    {t.receiptNo}
                  </td>
                  <td className="py-3 font-bold text-foreground">
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">
                    {t.method}
                  </td>
                  <td className="py-3">
                    <Badge
                      className={
                        t.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : t.status === "Partial"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                      }
                    >
                      {t.status}
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
