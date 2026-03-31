import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyRevenue = [
  { month: "Oct", revenue: 756000 },
  { month: "Nov", revenue: 823000 },
  { month: "Dec", revenue: 701000 },
  { month: "Jan", revenue: 798000 },
  { month: "Feb", revenue: 834000 },
  { month: "Mar", revenue: 845200 },
];

const recentTransactions = [
  {
    id: "t1",
    student: "Rahul Kumar",
    class: "10-A",
    amount: 4550,
    date: "18/03/2024",
    mode: "UPI",
    status: "Paid",
  },
  {
    id: "t2",
    student: "Priya Singh",
    class: "9-B",
    amount: 2500,
    date: "18/03/2024",
    mode: "Cash",
    status: "Paid",
  },
  {
    id: "t3",
    student: "Aman Verma",
    class: "12-A",
    amount: 3000,
    date: "17/03/2024",
    mode: "Card",
    status: "Paid",
  },
  {
    id: "t4",
    student: "Anjali Sharma",
    class: "8-A",
    amount: 1500,
    date: "17/03/2024",
    mode: "UPI",
    status: "Partial",
  },
  {
    id: "t5",
    student: "Rohan Gupta",
    class: "11-B",
    amount: 3500,
    date: "16/03/2024",
    mode: "Net Banking",
    status: "Paid",
  },
  {
    id: "t6",
    student: "Kavya Yadav",
    class: "7-A",
    amount: 1500,
    date: "14/03/2024",
    mode: "Cash",
    status: "Overdue",
  },
  {
    id: "t7",
    student: "Mohit Tiwari",
    class: "6-B",
    amount: 800,
    date: "14/03/2024",
    mode: "UPI",
    status: "Paid",
  },
  {
    id: "t8",
    student: "Sneha Pandey",
    class: "5-A",
    amount: 2200,
    date: "13/03/2024",
    mode: "Cash",
    status: "Paid",
  },
];

const fmt = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

interface Props {
  navigate: (path: string) => void;
}

export function AccountantDashboard({ navigate }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Accountant Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fee collection, salary, and financial overview
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Collected (Mar)</p>
            <p className="text-2xl font-heading font-bold text-emerald-600 mt-1">
              {fmt(845200)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ↑ 1.3% from Feb
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Dues</p>
            <p className="text-2xl font-heading font-bold text-rose-600 mt-1">
              {fmt(43800)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">28 defaulters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Salaries Disbursed</p>
            <p className="text-2xl font-heading font-bold text-blue-600 mt-1">
              {fmt(1248000)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              85 staff members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Outstanding Bills</p>
            <p className="text-2xl font-heading font-bold text-amber-600 mt-1">
              {fmt(128500)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">12 vendors</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          data-ocid="accountant.collect_fee.button"
          onClick={() => navigate("/admin/fees/collect")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Collect Fee
        </button>
        <button
          type="button"
          data-ocid="accountant.report.button"
          onClick={() => navigate("/admin/fees/reports")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Generate Report
        </button>
        <button
          type="button"
          data-ocid="accountant.salary.button"
          onClick={() => navigate("/admin/salary")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Salary Slip
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Monthly Revenue (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Fee Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Student
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Class
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Mode
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`accountant.item.${i + 1}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5 font-medium">{row.student}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.class}
                    </td>
                    <td className="py-2.5 text-right font-medium">
                      {fmt(row.amount)}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{row.mode}</td>
                    <td className="py-2.5 text-muted-foreground">{row.date}</td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          row.status === "Paid"
                            ? "default"
                            : row.status === "Partial"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
