import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStudents } from "@/data/mockStudents";
import type { Student } from "@/data/mockStudents";
import {
  downloadSampleExcelTemplate,
  exportToExcel,
  exportToPDF,
} from "@/utils/exportUtils";
import {
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Pencil,
  Plus,
  Upload,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface Props {
  navigate: (path: string) => void;
}

type ImportRow = Record<string, unknown>;

export function StudentsPage({ navigate }: Props) {
  const [classFilter, setClassFilter] = useState("all");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [importOpen, setImportOpen] = useState(false);
  const [importPreview, setImportPreview] = useState<ImportRow[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered =
    classFilter && classFilter !== "all"
      ? students.filter((s) => s.class === classFilter)
      : students;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsed = XLSX.utils.sheet_to_json(sheet) as ImportRow[];
      setImportPreview(parsed);
      const errors: string[] = [];
      parsed.forEach((row, idx) => {
        if (!row.Name) errors.push(`Row ${idx + 1}: Name is required`);
        if (!row.Class) errors.push(`Row ${idx + 1}: Class is required`);
        if (!row.Section) errors.push(`Row ${idx + 1}: Section is required`);
        if (!row.Mobile) errors.push(`Row ${idx + 1}: Mobile is required`);
      });
      setImportErrors(errors);
    };
    reader.readAsBinaryString(file);
  };

  const handleImport = () => {
    if (importErrors.length > 0) {
      toast.error("Fix errors before importing");
      return;
    }
    const newStudents: Student[] = importPreview.map((row, idx) => ({
      id: `imported_${Date.now()}_${idx}`,
      admissionNo: String(row["Admission No"] || `IMP/${Date.now()}/${idx}`),
      name: String(row.Name || ""),
      class: String(row.Class || ""),
      section: String(row.Section || "A"),
      rollNo: idx + 1,
      gender: String(row.Gender || "Male"),
      dob: String(row.DOB || ""),
      fatherName: String(row["Father's Name"] || ""),
      motherName: String(row["Mother's Name"] || ""),
      mobile: String(row.Mobile || ""),
      email: String(row.Email || ""),
      address: String(row.Address || ""),
      city: "Patna",
      state: "Bihar",
      pin: "",
      category: String(row.Category || "General"),
      religion: "Hindu",
      bloodGroup: "",
      status: "Active",
      admissionDate: new Date().toLocaleDateString("en-IN"),
      attendance: 0,
      feeDue: 0,
    }));
    setStudents((prev) => [...prev, ...newStudents]);
    toast.success(`${newStudents.length} students imported successfully!`);
    setImportOpen(false);
    setImportPreview([]);
    setImportErrors([]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleExportExcel = () => {
    const data = filtered.map((s) => ({
      "Admission No": s.admissionNo,
      Name: s.name,
      Class: s.class,
      Section: s.section,
      "Father's Name": s.fatherName,
      Mobile: s.mobile,
      "Attendance %": `${s.attendance}%`,
      "Fee Due": `\u20b9${s.feeDue.toLocaleString("en-IN")}`,
      Status: s.status,
    }));
    exportToExcel(data, "students_report", "Students");
    toast.success("Excel file downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Adm No",
      "Name",
      "Class",
      "Father's Name",
      "Mobile",
      "Attendance",
      "Fee Due",
      "Status",
    ];
    const rows = filtered.map((s) => [
      s.admissionNo,
      s.name,
      `${s.class}-${s.section}`,
      s.fatherName,
      s.mobile,
      `${s.attendance}%`,
      `\u20b9${s.feeDue.toLocaleString("en-IN")}`,
      s.status,
    ]);
    exportToPDF("Students Report", columns, rows, "students_report");
    toast.success("PDF downloaded!");
  };

  const columns = [
    {
      key: "name",
      header: "Student",
      render: (_: unknown, row: Student) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.admissionNo}</p>
          </div>
        </div>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (_: unknown, row: Student) => `${row.class}-${row.section}`,
    },
    { key: "fatherName", header: "Father's Name" },
    { key: "mobile", header: "Mobile" },
    {
      key: "attendance",
      header: "Attendance",
      render: (v: number) => (
        <span
          className={`font-semibold ${
            v >= 85
              ? "text-emerald-600"
              : v >= 75
                ? "text-amber-600"
                : "text-rose-600"
          }`}
        >
          {v}%
        </span>
      ),
    },
    {
      key: "feeDue",
      header: "Fee Due",
      render: (v: number) =>
        v > 0 ? (
          <span className="text-rose-600 font-medium">
            \u20b9{v.toLocaleString("en-IN")}
          </span>
        ) : (
          <span className="text-emerald-600">\u20b90</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (v: string) => (
        <Badge
          className={
            v === "Active"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : v === "Inactive"
                ? "bg-red-100 text-red-700 hover:bg-red-100"
                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }
        >
          {v}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filtered.length} of {students.length} students
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            data-ocid="students.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="students.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button
            data-ocid="students.import.button"
            variant="outline"
            size="sm"
            onClick={() => setImportOpen(true)}
          >
            <Upload size={16} className="mr-2" /> Import
          </Button>
          <Button
            data-ocid="students.add.button"
            size="sm"
            onClick={() => navigate("/admin/students/add")}
          >
            <Plus size={16} className="mr-2" /> Add Student
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <DataTable
          data={filtered}
          columns={columns}
          searchKeys={["name", "admissionNo", "fatherName", "mobile"]}
          onRowClick={(row) => navigate(`/admin/students/${row.id}`)}
          actions={(row) => (
            <div className="flex items-center gap-1">
              <button
                type="button"
                data-ocid="students.view.button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/students/${row.id}`);
                }}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Eye size={15} />
              </button>
              <button
                type="button"
                data-ocid="students.edit.button"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Pencil size={15} />
              </button>
            </div>
          )}
          filterElement={
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={String(i + 1)} value={String(i + 1)}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      </div>

      {/* Bulk Import Dialog */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-3xl" data-ocid="students.import.dialog">
          <DialogHeader>
            <DialogTitle className="font-heading">
              Bulk Import Students
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-800 mb-1">
                Step 1 \u2014 Download Template
              </p>
              <p className="text-xs text-blue-600 mb-3">
                Download the sample Excel template, fill in student data, and
                upload below.
              </p>
              <Button
                data-ocid="students.download_template.button"
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={downloadSampleExcelTemplate}
              >
                <Download size={14} className="mr-2" /> Download Sample Template
              </Button>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Step 2 \u2014 Upload Excel File
              </p>
              <label
                htmlFor="bulk-import-file"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors"
                data-ocid="students.dropzone"
              >
                <Upload size={24} className="text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload .xlsx or .xls file
                </span>
                <input
                  id="bulk-import-file"
                  ref={fileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {importErrors.length > 0 && (
              <div
                className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1"
                data-ocid="students.import.error_state"
              >
                <p className="text-xs font-semibold text-red-700">
                  Validation Errors:
                </p>
                {importErrors.map((err) => (
                  <p key={err} className="text-xs text-red-600">
                    {err}
                  </p>
                ))}
              </div>
            )}

            {importPreview.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Preview \u2014 {importPreview.length} rows found (showing
                  first 5)
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs">
                    <thead className="bg-muted">
                      <tr>
                        {Object.keys(importPreview[0]).map((k) => (
                          <th
                            key={k}
                            className="py-2 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap"
                          >
                            {k}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {importPreview.slice(0, 5).map((row) => {
                        const rowKey = String(
                          row.Name || row["Admission No"] || Math.random(),
                        );
                        return (
                          <tr
                            key={rowKey}
                            className="border-t border-border hover:bg-muted/30"
                          >
                            {Object.entries(row).map(([k, val]) => (
                              <td
                                key={k}
                                className="py-2 px-3 whitespace-nowrap"
                              >
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              data-ocid="students.import.cancel_button"
              variant="outline"
              onClick={() => {
                setImportOpen(false);
                setImportPreview([]);
                setImportErrors([]);
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="students.import.confirm_button"
              disabled={importPreview.length === 0 || importErrors.length > 0}
              onClick={handleImport}
            >
              Import{" "}
              {importPreview.length > 0
                ? `${importPreview.length} Students`
                : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
