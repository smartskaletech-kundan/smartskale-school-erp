import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStudents } from "@/data/mockStudents";
import { formatCurrency } from "@/utils/formatCurrency";
import { generateReceiptNo } from "@/utils/formatDate";
import { printReceipt } from "@/utils/printReceipt";
import { CheckCircle, Loader2, Printer, Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const FEE_ITEMS = [
  { id: "f1", head: "Tuition Fee", amount: 2500 },
  { id: "f2", head: "Annual Development", amount: 1000 },
  { id: "f3", head: "Computer Fee", amount: 500 },
  { id: "f4", head: "Library Fee", amount: 200 },
  { id: "f5", head: "Transport Fee", amount: 800 },
];

export function FeeCollect() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [student, setStudent] = useState<(typeof mockStudents)[0] | null>(null);
  const [method, setMethod] = useState("Cash");
  const [remarks, setRemarks] = useState("");
  const [collecting, setCollecting] = useState(false);
  const [collected, setCollected] = useState(false);
  const [receiptNo] = useState(generateReceiptNo);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setCollected(false);
    await new Promise((r) => setTimeout(r, 500));
    const found = mockStudents.find(
      (s) =>
        s.admissionNo === query ||
        s.name.toLowerCase().includes(query.toLowerCase()),
    );
    setStudent(found || mockStudents[0]);
    setSearching(false);
  };

  const handleCollect = async () => {
    setCollecting(true);
    await new Promise((r) => setTimeout(r, 800));
    setCollecting(false);
    setCollected(true);
    toast.success("Fee collected! Receipt ready — click Print or Download.");
  };

  const handlePrint = () => {
    if (!student) return;
    printReceipt({
      receiptNo,
      studentName: student.name,
      studentClass: `${student.class}-${student.section}`,
      admissionNo: student.admissionNo,
      fatherName: student.fatherName,
      feeItems: FEE_ITEMS,
      totalAmount:
        student.feeDue > 0
          ? student.feeDue
          : FEE_ITEMS.reduce((s, f) => s + f.amount, 0),
      paymentMethod: method,
      dateTime: new Date().toLocaleString("en-IN"),
      collectedBy: "Office Staff",
      ...(remarks ? { remarks } : {}),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Collect Fee
        </h1>
        <p className="text-muted-foreground text-sm">
          Manual cash/cheque fee collection at counter
        </p>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="flex gap-3">
          <Input
            data-ocid="fee_collect.search.input"
            placeholder="Enter admission no. or student name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button
            data-ocid="fee_collect.search.button"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}
          </Button>
        </div>
      </div>

      {/* Student card */}
      {student && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground">
                {student.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Class {student.class}-{student.section} | {student.admissionNo}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  student.feeDue > 0 ? "text-destructive" : "text-emerald-600"
                }`}
              >
                {student.feeDue > 0
                  ? `Due: ${formatCurrency(student.feeDue)}`
                  : "No dues ✅"}
              </p>
            </div>
            {collected && (
              <div className="ml-auto flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle size={20} />
                Collected
              </div>
            )}
          </div>

          {/* Fee breakdown */}
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Fee Head
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEE_ITEMS.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="px-4 py-2.5">{item.head}</td>
                    <td className="px-4 py-2.5 text-right font-medium">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-primary/30 bg-primary/5">
                  <td className="px-4 py-3 font-bold">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-primary text-base">
                    {formatCurrency(
                      student.feeDue > 0
                        ? student.feeDue
                        : FEE_ITEMS.reduce((s, f) => s + f.amount, 0),
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {student.feeDue > 0 && !collected && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Payment Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger data-ocid="fee_collect.method.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Cash", "Cheque", "UPI", "Card"].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Remarks (Optional)</Label>
                  <Input
                    placeholder="e.g. April 2025 fees"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
              <Button
                data-ocid="fee_collect.collect.button"
                onClick={handleCollect}
                disabled={collecting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {collecting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  "Collect & Generate Receipt"
                )}
              </Button>
            </>
          )}

          {/* Receipt actions — shown after collection */}
          {collected && (
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 space-y-3">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                ✅ Receipt Ready — No. {receiptNo}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  data-ocid="fee_collect.print.button"
                  onClick={handlePrint}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Printer size={16} className="mr-2" /> Print Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Reset to collect another
                    setStudent(null);
                    setQuery("");
                    setCollected(false);
                  }}
                >
                  Collect Another
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
