import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const monthlyData = [
  { month: "Oct", collected: 756000, pending: 89000 },
  { month: "Nov", collected: 823000, pending: 72000 },
  { month: "Dec", collected: 701000, pending: 98000 },
  { month: "Jan", collected: 798000, pending: 65000 },
  { month: "Feb", collected: 834000, pending: 58000 },
  { month: "Mar", collected: 845200, pending: 43800 },
];

const feeTypeData = [
  { name: "Tuition", value: 524000, color: "#3B82F6" },
  { name: "Transport", value: 185600, color: "#10B981" },
  { name: "Computer Lab", value: 78000, color: "#F59E0B" },
  { name: "Library", value: 32400, color: "#8B5CF6" },
  { name: "Activity", value: 25200, color: "#F43F5E" },
];

const recentCollections = [
  {
    id: "rc1",
    student: "Rahul Kumar",
    class: "10-A",
    amount: 4550,
    type: "Tuition + Transport",
    date: "18/03/2024",
    mode: "UPI",
    status: "Paid",
  },
  {
    id: "rc2",
    student: "Priya Singh",
    class: "9-B",
    amount: 2500,
    type: "Tuition Fee",
    date: "18/03/2024",
    mode: "Cash",
    status: "Paid",
  },
  {
    id: "rc3",
    student: "Aman Verma",
    class: "12-A",
    amount: 3000,
    type: "Tuition + Computer",
    date: "17/03/2024",
    mode: "Card",
    status: "Paid",
  },
  {
    id: "rc4",
    student: "Anjali Sharma",
    class: "8-A",
    amount: 1500,
    type: "Partial Payment",
    date: "17/03/2024",
    mode: "UPI",
    status: "Partial",
  },
  {
    id: "rc5",
    student: "Mohit Tiwari",
    class: "6-B",
    amount: 800,
    type: "Transport",
    date: "16/03/2024",
    mode: "UPI",
    status: "Paid",
  },
  {
    id: "rc6",
    student: "Sneha Pandey",
    class: "5-A",
    amount: 2200,
    type: "Tuition Fee",
    date: "16/03/2024",
    mode: "Cash",
    status: "Paid",
  },
  {
    id: "rc7",
    student: "Rohan Gupta",
    class: "11-B",
    amount: 3500,
    type: "Tuition + Computer",
    date: "15/03/2024",
    mode: "Net Banking",
    status: "Paid",
  },
  {
    id: "rc8",
    student: "Kavya Yadav",
    class: "7-A",
    amount: 1500,
    type: "Tuition Fee",
    date: "14/03/2024",
    mode: "Cash",
    status: "Overdue",
  },
];

const fmt = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

export function FeeReports() {
  const [month, setMonth] = useState("march");
  const [year, setYear] = useState("2024");

  const handleExportExcel = () => {
    const data = monthlyData.map((m) => ({
      Month: m.month,
      "Collected (₹)": m.collected,
      "Pending (₹)": m.pending,
      "Collection %": Math.round(
        (m.collected / (m.collected + m.pending)) * 100,
      ),
    }));
    exportToExcel(
      data,
      `fee_collection_report_${month}_${year}`,
      "Fee Collection",
    );
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = ["Month", "Collected", "Pending", "Collection %"];
    const rows = monthlyData.map((m) => [
      m.month,
      fmt(m.collected),
      fmt(m.pending),
      `${Math.round((m.collected / (m.collected + m.pending)) * 100)}%`,
    ]);
    exportToPDF(
      "Fee Collection Report",
      columns,
      rows,
      `fee_collection_${month}_${year}`,
    );
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Fee Reports
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monthly fee collection summary and analytics
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger
              className="w-32"
              data-ocid="fee_reports.month.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24" data-ocid="fee_reports.year.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023-24</SelectItem>
              <SelectItem value="2024">2024-25</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            data-ocid="fee_reports.export_excel.button"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            data-ocid="fee_reports.export_pdf.button"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Collected (Mar)
            </p>
            <p className="text-3xl font-heading font-bold text-foreground mt-1">
              {fmt(845200)}
            </p>
            <p className="text-xs text-emerald-600 mt-1">↑ 1.3% from Feb</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Pending</p>
            <p className="text-3xl font-heading font-bold text-foreground mt-1">
              {fmt(43800)}
            </p>
            <p className="text-xs text-rose-600 mt-1">From 28 defaulters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Collection %</p>
            <p className="text-3xl font-heading font-bold text-foreground mt-1">
              95.1%
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              ↑ 2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              Monthly Collection (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `\u20B9${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Legend />
                <Bar
                  dataKey="collected"
                  name="Collected"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#F43F5E"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Fee Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={feeTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {feeTypeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {feeTypeData.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span>{d.name}</span>
                  </div>
                  <span className="font-medium">{fmt(d.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Collections</CardTitle>
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
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Fee Type
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
                {recentCollections.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`fee_reports.item.${i + 1}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5 font-medium">{row.student}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.class}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{row.type}</td>
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
