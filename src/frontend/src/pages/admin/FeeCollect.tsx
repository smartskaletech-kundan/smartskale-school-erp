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
import { Loader2, Printer, Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function FeeCollect() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [student, setStudent] = useState<(typeof mockStudents)[0] | null>(null);
  const [method, setMethod] = useState("Cash");
  const [collecting, setCollecting] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
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
    toast.success("Fee collected! Receipt generated.");
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
                className={`text-sm font-semibold mt-1 ${student.feeDue > 0 ? "text-destructive" : "text-success"}`}
              >
                {student.feeDue > 0
                  ? `Due: ${formatCurrency(student.feeDue)}`
                  : "No dues ✅"}
              </p>
            </div>
          </div>

          {student.feeDue > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Amount</Label>
                  <Input
                    data-ocid="fee_collect.amount.input"
                    defaultValue={student.feeDue}
                  />
                </div>
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
                  <Label>Remarks</Label>
                  <Input placeholder="Optional remarks" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  data-ocid="fee_collect.collect.button"
                  onClick={handleCollect}
                  disabled={collecting}
                  className="bg-success hover:bg-success/90"
                >
                  {collecting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Collect Fee"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Printing receipt...")}
                >
                  <Printer size={16} className="mr-2" /> Print Receipt
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
