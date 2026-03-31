import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { mockStaff } from "@/data/mockStaff";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import { FileSpreadsheet, FileText } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function SalaryPage() {
  const handleExportExcel = () => {
    const data = mockStaff.map((s) => ({
      "Staff Name": s.name,
      Designation: s.role,
      "Basic Pay": s.salary,
      HRA: Math.round(s.salary * 0.3),
      DA: Math.round(s.salary * 0.17),
      Deductions: Math.round(s.salary * 0.12),
      "Net Salary": Math.round(s.salary * 0.88),
      Month: "March 2025",
      Status: s.status === "Active" ? "Processed" : "On Hold",
    }));
    exportToExcel(data, "salary_report_march_2025", "Salary");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Name",
      "Designation",
      "Gross",
      "Deductions",
      "Net Salary",
      "Status",
    ];
    const rows = mockStaff.map((s) => [
      s.name,
      s.role,
      `₹${s.salary.toLocaleString("en-IN")}`,
      `₹${Math.round(s.salary * 0.12).toLocaleString("en-IN")}`,
      `₹${Math.round(s.salary * 0.88).toLocaleString("en-IN")}`,
      s.status === "Active" ? "Processed" : "On Hold",
    ]);
    exportToPDF("Salary Report — March 2025", columns, rows, "salary_report");
    toast.success("PDF downloaded!");
  };

  const columns = [
    { key: "empId", header: "Emp ID" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    {
      key: "salary",
      header: "Gross Salary",
      render: (v: number) => formatCurrency(v),
    },
    {
      key: "salary",
      header: "Deductions",
      render: (v: number) => (
        <span className="text-destructive">
          {formatCurrency(Math.round(v * 0.12))}
        </span>
      ),
    },
    {
      key: "salary",
      header: "Net Salary",
      render: (v: number) => (
        <span className="font-bold text-success">
          {formatCurrency(Math.round(v * 0.88))}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Salary Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Monthly payroll — March 2025
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="salary.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="salary.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button
            data-ocid="salary.generate.button"
            onClick={() => toast.success("Salary slips generated!")}
          >
            <FileText size={16} className="mr-2" /> Generate Slips
          </Button>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <DataTable
          data={mockStaff}
          columns={columns}
          searchKeys={["name", "empId"]}
          actions={(_row) => (
            <Button
              data-ocid="salary.view.button"
              size="sm"
              variant="outline"
              onClick={() => toast.info("Opening salary slip...")}
            >
              <FileText size={14} className="mr-1" />
              Slip
            </Button>
          )}
        />
      </div>
    </div>
  );
}
