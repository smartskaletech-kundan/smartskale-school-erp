import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockStudents } from "@/data/mockStudents";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import { FileSpreadsheet, FileText, MessageSquare, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const templates = [
  {
    id: "t1",
    label: "Standard Reminder",
    text: "Dear Parent, this is a reminder that fee of {amount} for {name} (Class {class}) is due. Please pay by 10th. Contact school: 0612-2345678",
  },
  {
    id: "t2",
    label: "Overdue Notice",
    text: "IMPORTANT: Fee overdue for {name}. Amount: {amount}. Late fine being applied. Please clear immediately.",
  },
  {
    id: "t3",
    label: "Final Warning",
    text: "Final Notice: Fee for {name} is {days} days overdue. TC may be withheld if not cleared within 7 days.",
  },
];

export function FeeReminders() {
  const defaulters = mockStudents.filter((s) => s.feeDue > 0);
  const [selected, setSelected] = useState<string[]>([]);
  const [_template, setTemplate] = useState("");
  const [message, setMessage] = useState("");

  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
    );
  const selectAll = () => setSelected(defaulters.map((s) => s.id));

  const handleSend = (method: string) => {
    if (selected.length === 0) {
      toast.error("Please select students");
      return;
    }
    toast.success(`${method} sent to ${selected.length} students!`);
  };

  const handleExportExcel = () => {
    const data = defaulters.map((s) => ({
      "Student Name": s.name,
      Class: `${s.class}-${s.section}`,
      "Due Amount": s.feeDue,
      "Days Overdue": Math.floor(Math.random() * 60) + 1,
      Mobile: s.mobile,
      "Last Paid": "10/02/2024",
    }));
    exportToExcel(data, "fee_defaulters", "Defaulters");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Student Name",
      "Class",
      "Due Amount",
      "Days Overdue",
      "Mobile",
    ];
    const rows = defaulters.map((s) => [
      s.name,
      `${s.class}-${s.section}`,
      `₹${s.feeDue.toLocaleString("en-IN")}`,
      String(Math.floor(Math.random() * 60) + 1),
      s.mobile,
    ]);
    exportToPDF("Fee Defaulters Report", columns, rows, "fee_defaulters");
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Fee Reminders
          </h1>
          <p className="text-muted-foreground text-sm">
            {defaulters.length} students with pending fees
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="reminders.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="reminders.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              Defaulters List
            </h3>
            <button
              type="button"
              onClick={selectAll}
              className="text-xs text-primary hover:underline"
            >
              Select All
            </button>
          </div>
          <div className="space-y-2">
            {defaulters.map((s, i) => (
              <div
                data-ocid={`reminders.student.item.${i + 1}`}
                key={s.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer"
              >
                <Checkbox
                  data-ocid="reminders.student.checkbox"
                  checked={selected.includes(s.id)}
                  onCheckedChange={() => toggle(s.id)}
                />
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Class {s.class}-{s.section} | {s.mobile}
                  </p>
                </div>
                <span className="text-sm font-bold text-destructive">
                  {formatCurrency(s.feeDue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Compose Message
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Template</p>
              <Select
                onValueChange={(v) => {
                  setTemplate(v);
                  setMessage(templates.find((t) => t.id === v)?.text || "");
                }}
              >
                <SelectTrigger data-ocid="reminders.template.select">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="reminder-message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="reminder-message"
                data-ocid="reminders.message.textarea"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </div>
            <div className="space-y-2">
              <Button
                data-ocid="reminders.send_sms.button"
                className="w-full"
                onClick={() => handleSend("SMS")}
              >
                <Send size={16} className="mr-2" /> Send SMS ({selected.length}{" "}
                selected)
              </Button>
              <Button
                data-ocid="reminders.send_whatsapp.button"
                variant="outline"
                className="w-full text-green-600 border-green-200"
                onClick={() => handleSend("WhatsApp")}
              >
                <MessageSquare size={16} className="mr-2" /> Send WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
