import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { FileSpreadsheet, FileText } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

const initialLeaves = [
  {
    id: "l1",
    empId: "T005",
    name: "Mr. Vivek Singh",
    type: "Sick Leave",
    from: "18/03/2024",
    to: "20/03/2024",
    days: 3,
    reason: "Fever and illness",
    status: "Pending" as LeaveStatus,
  },
  {
    id: "l2",
    empId: "T002",
    name: "Mrs. Sunita Devi",
    type: "Casual Leave",
    from: "25/03/2024",
    to: "25/03/2024",
    days: 1,
    reason: "Personal work",
    status: "Approved" as LeaveStatus,
  },
  {
    id: "l3",
    empId: "T008",
    name: "Mrs. Meena Tiwari",
    type: "Earned Leave",
    from: "01/04/2024",
    to: "05/04/2024",
    days: 5,
    reason: "Family function",
    status: "Pending" as LeaveStatus,
  },
  {
    id: "l4",
    empId: "T001",
    name: "Mr. Anil Kumar",
    type: "Casual Leave",
    from: "10/04/2024",
    to: "10/04/2024",
    days: 1,
    reason: "Medical appointment",
    status: "Approved" as LeaveStatus,
  },
  {
    id: "l5",
    empId: "T003",
    name: "Mr. Rakesh Sharma",
    type: "Sick Leave",
    from: "05/04/2024",
    to: "06/04/2024",
    days: 2,
    reason: "Viral fever",
    status: "Rejected" as LeaveStatus,
  },
];

export function LeavePage() {
  const [leaves, setLeaves] = useState(initialLeaves);

  const updateStatus = (id: string, status: LeaveStatus) => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Leave ${status.toLowerCase()}!`);
  };

  const handleExportExcel = () => {
    const data = leaves.map((l) => ({
      "Staff Name": l.name,
      "Emp ID": l.empId,
      "Leave Type": l.type,
      From: l.from,
      To: l.to,
      Days: l.days,
      Reason: l.reason,
      Status: l.status,
    }));
    exportToExcel(data, "leave_applications", "Leave Applications");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Staff Name",
      "Leave Type",
      "From",
      "To",
      "Days",
      "Status",
    ];
    const rows = leaves.map((l) => [
      l.name,
      l.type,
      l.from,
      l.to,
      l.days,
      l.status,
    ]);
    exportToPDF(
      "Leave Applications Report",
      columns,
      rows,
      "leave_applications",
    );
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Leave Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Staff leave applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="leave.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="leave.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {leaves.map((l, i) => (
          <div
            data-ocid={`leave.item.${i + 1}`}
            key={l.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading font-semibold text-foreground">
                  {l.name} ({l.empId})
                </p>
                <p className="text-sm text-muted-foreground">
                  {l.type} | {l.from} to {l.to} ({l.days} days)
                </p>
                <p className="text-sm text-muted-foreground mt-1">{l.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    l.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : l.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }
                >
                  {l.status}
                </Badge>
                {l.status === "Pending" && (
                  <div className="flex gap-2 ml-2">
                    <Button
                      data-ocid="leave.approve.button"
                      size="sm"
                      className="bg-success hover:bg-success/90"
                      onClick={() => updateStatus(l.id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      data-ocid="leave.reject.button"
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(l.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
