import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockStaff } from "@/data/mockStaff";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import {
  FileSpreadsheet,
  FileText,
  Mail,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

export function StaffDirectory({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const filtered = mockStaff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subject?.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()),
  );

  const handleExportExcel = () => {
    const data = filtered.map((s) => ({
      "Staff ID": s.empId,
      Name: s.name,
      Subject: s.subject || "",
      Designation: s.role,
      Mobile: s.mobile,
      Email: s.email,
      "Joining Date": s.joinDate,
      Status: s.status,
    }));
    exportToExcel(data, "staff_directory", "Staff");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Staff ID",
      "Name",
      "Subject",
      "Designation",
      "Mobile",
      "Joining Date",
      "Status",
    ];
    const rows = filtered.map((s) => [
      s.empId,
      s.name,
      s.subject || "",
      s.role,
      s.mobile,
      s.joinDate,
      s.status,
    ]);
    exportToPDF("Staff Directory Report", columns, rows, "staff_directory");
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Staff Directory
          </h1>
          <p className="text-muted-foreground text-sm">
            {mockStaff.length} staff members
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="staff.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="staff.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button
            data-ocid="staff.add.button"
            size="sm"
            onClick={() => navigate("/admin/staff/add")}
          >
            <Plus size={16} className="mr-2" /> Add Staff
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          data-ocid="staff.search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff..."
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <div
            data-ocid={`staff.item.${i + 1}`}
            key={s.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                {s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-foreground truncate">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground">{s.role}</p>
                {s.subject && (
                  <p className="text-xs text-primary mt-0.5">{s.subject}</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone size={12} /> {s.mobile}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={12} /> {s.email}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.empId}</span>
              <Badge
                className={
                  s.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : s.status === "On Leave"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }
              >
                {s.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
