import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTransactions } from "@/data/mockFees";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import { FileSpreadsheet, FileText } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function FeeTransactions() {
  const handleExportExcel = () => {
    const data = mockTransactions.map((t) => ({
      "Receipt No": t.receiptNo,
      "Student Name": t.studentName,
      Class: t.class,
      Amount: t.amount,
      Date: t.date,
      Mode: t.method,
      Status: t.status,
    }));
    exportToExcel(data, "fee_transactions", "Transactions");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Receipt No",
      "Student",
      "Class",
      "Amount",
      "Date",
      "Mode",
      "Status",
    ];
    const rows = mockTransactions.map((t) => [
      t.receiptNo,
      t.studentName,
      t.class,
      `₹${t.amount.toLocaleString("en-IN")}`,
      t.date,
      t.method,
      t.status,
    ]);
    exportToPDF("Fee Transactions Report", columns, rows, "fee_transactions");
    toast.success("PDF downloaded!");
  };

  const columns = [
    { key: "date", header: "Date" },
    {
      key: "studentName",
      header: "Student",
      render: (v: string, row: any) => (
        <div>
          <p className="font-medium text-foreground text-sm">{v}</p>
          <p className="text-xs text-muted-foreground">{row.class}</p>
        </div>
      ),
    },
    {
      key: "receiptNo",
      header: "Receipt No",
      render: (v: string) => (
        <span className="font-mono text-xs text-muted-foreground">{v}</span>
      ),
    },
    { key: "feeHead", header: "Fee Head" },
    {
      key: "amount",
      header: "Amount",
      render: (v: number) => (
        <span className="font-bold">{formatCurrency(v)}</span>
      ),
    },
    {
      key: "method",
      header: "Method",
      render: (v: string) => (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          {v}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v: string) => (
        <Badge
          className={
            v === "Paid"
              ? "bg-green-100 text-green-700"
              : v === "Overdue"
                ? "bg-red-100 text-red-700"
                : v === "Partial"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700"
          }
        >
          {v}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Fee Transactions
          </h1>
          <p className="text-muted-foreground text-sm">
            Complete transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="transactions.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="transactions.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <DataTable
          data={mockTransactions}
          columns={columns}
          searchKeys={["studentName", "receiptNo", "feeHead"]}
          actions={(_row) => (
            <button
              type="button"
              data-ocid="transactions.refund.button"
              className="text-xs text-destructive hover:underline"
              onClick={() => toast.info("Refund initiated")}
            >
              Refund
            </button>
          )}
        />
      </div>
    </div>
  );
}
