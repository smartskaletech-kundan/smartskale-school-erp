import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockExams } from "@/data/mockExams";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { FileSpreadsheet, FileText, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

export function ExamsPage({ navigate }: Props) {
  const handleExportExcel = () => {
    const data = mockExams.map((e) => ({
      "Exam Name": e.name,
      Classes: e.classes.join(", "),
      "Start Date": e.startDate,
      "End Date": e.endDate,
      Type: e.type,
      Status: e.status,
    }));
    exportToExcel(data, "exam_schedule", "Exams");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Exam Name",
      "Classes",
      "Start Date",
      "End Date",
      "Type",
      "Status",
    ];
    const rows = mockExams.map((e) => [
      e.name,
      e.classes.join(", "),
      e.startDate,
      e.endDate,
      e.type,
      e.status,
    ]);
    exportToPDF("Exam Schedule", columns, rows, "exam_schedule");
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Exams Schedule
          </h1>
          <p className="text-muted-foreground text-sm">Academic Year 2024-25</p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="exams.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="exams.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button
            data-ocid="exams.report_card.button"
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/exams/reportcard")}
          >
            <FileText size={16} className="mr-2" /> Report Cards
          </Button>
          <Button
            data-ocid="exams.create.button"
            size="sm"
            onClick={() => toast.info("Create exam modal")}
          >
            <Plus size={16} className="mr-2" /> Create Exam
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockExams.map((exam, i) => (
          <div
            data-ocid={`exams.item.${i + 1}`}
            key={exam.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {exam.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {exam.startDate} — {exam.endDate}
                </p>
              </div>
              <Badge
                className={
                  exam.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : exam.status === "Ongoing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                }
              >
                {exam.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {exam.type}
              </span>
              <span className="text-xs text-muted-foreground">
                Classes: {exam.classes.join(", ")}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => navigate("/teacher/exams/marks")}
                className="text-xs text-primary hover:underline"
              >
                Enter Marks
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                type="button"
                onClick={() => navigate("/admin/exams/reportcard")}
                className="text-xs text-primary hover:underline"
              >
                Report Cards
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
