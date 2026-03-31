import { StepperProgress } from "@/components/shared/StepperProgress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { generateReceiptNo, generateTxnId } from "@/utils/formatDate";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  Home,
  Loader2,
  Lock,
  Search,
  Share2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const STEPS = ["Find Student", "Verify", "Fee Details", "Payment", "Success"];
const FEE_ITEMS = [
  { id: "f1", head: "Tuition Fee", amount: 2500, status: "Pending" as const },
  {
    id: "f2",
    head: "Annual Development",
    amount: 1000,
    status: "Pending" as const,
  },
  { id: "f3", head: "Computer Fee", amount: 500, status: "Paid" as const },
  { id: "f4", head: "Library Fee", amount: 200, status: "Pending" as const },
  {
    id: "f5",
    head: "Transport (Patna Sahib)",
    amount: 800,
    status: "Pending" as const,
  },
];

interface Props {
  navigate: (path: string) => void;
}

export function QuickFeePay({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [searchData, setSearchData] = useState({
    selectedClass: "",
    admissionNo: "",
    name: "",
    fatherName: "",
    dob: "",
  });
  const [student, setStudent] = useState<(typeof mockStudents)[0] | null>(null);
  const [searching, setSearching] = useState(false);
  const [selectedFees, setSelectedFees] = useState<string[]>(
    FEE_ITEMS.filter((f) => f.status === "Pending").map((f) => f.id),
  );
  const [payMethod, setPayMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [txnId] = useState(generateTxnId());
  const [receiptNo] = useState(generateReceiptNo());

  const _pendingFees = FEE_ITEMS.filter((f) => f.status === "Pending");
  const lateFine = 50;
  const selectedAmount = FEE_ITEMS.filter((f) =>
    selectedFees.includes(f.id),
  ).reduce((s, f) => s + f.amount, 0);
  const totalPayable = selectedAmount + lateFine;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    await new Promise((r) => setTimeout(r, 600));
    const found =
      mockStudents.find(
        (s) =>
          (searchData.admissionNo &&
            s.admissionNo === searchData.admissionNo) ||
          (searchData.name &&
            s.name.toLowerCase().includes(searchData.name.toLowerCase())),
      ) || mockStudents[0];
    setStudent(found);
    setStep(1);
    setSearching(false);
  };

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setStep(4);
    toast.success("Payment successful!");
  };

  const toggleFee = (id: string) => {
    setSelectedFees((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border z-40 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="p-1.5 rounded-lg hover:bg-muted"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="font-heading font-bold text-foreground text-sm">
                Online Fee Payment
              </h1>
              <p className="text-xs text-muted-foreground">
                Saraswati Public School, Patna
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock size={12} /> Secured by Razorpay
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Stepper */}
        {step < 4 && (
          <div className="mb-8">
            <StepperProgress steps={STEPS} currentStep={step} />
          </div>
        )}

        {/* Step 1: Find Student */}
        {step === 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">
              🔍 Find Student
            </h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Select Class</Label>
                <Select
                  onValueChange={(v) =>
                    setSearchData((d) => ({ ...d, selectedClass: v }))
                  }
                >
                  <SelectTrigger data-ocid="fee_pay.class.select">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={String(i + 1)} value={String(i + 1)}>
                        Class {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Admission Number</Label>
                <Input
                  data-ocid="fee_pay.admission.input"
                  placeholder="e.g. 2024-1045"
                  value={searchData.admissionNo}
                  onChange={(e) =>
                    setSearchData((d) => ({
                      ...d,
                      admissionNo: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Student Name</Label>
                <Input
                  data-ocid="fee_pay.name.input"
                  placeholder="Enter student name"
                  value={searchData.name}
                  onChange={(e) =>
                    setSearchData((d) => ({ ...d, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Father's Name</Label>
                  <Input
                    placeholder="Father's name"
                    value={searchData.fatherName}
                    onChange={(e) =>
                      setSearchData((d) => ({
                        ...d,
                        fatherName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Date of Birth</Label>
                  <Input
                    placeholder="DD/MM/YYYY"
                    value={searchData.dob}
                    onChange={(e) =>
                      setSearchData((d) => ({ ...d, dob: e.target.value }))
                    }
                  />
                </div>
              </div>
              <Button
                data-ocid="fee_pay.search.button"
                type="submit"
                className="w-full"
                disabled={searching}
              >
                {searching ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={16} className="mr-2" /> Search Student
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Verify */}
        {step === 1 && student && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">
              ✅ Verify Student
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {student.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Class {student.class}-{student.section} | Roll:{" "}
                  {student.rollNo}
                </p>
                <p className="text-muted-foreground text-sm">
                  Father: {student.fatherName}
                </p>
                <p className="text-muted-foreground text-sm">
                  Mother: {student.motherName}
                </p>
                <p className="text-muted-foreground text-sm">
                  Adm No: {student.admissionNo}
                </p>
                <p className="text-muted-foreground text-sm">
                  Mobile: {student.mobile.replace(/\d(?=\d{4})/g, "X")}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                data-ocid="fee_pay.confirm.button"
                onClick={() => setStep(2)}
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              >
                <CheckCircle size={16} className="mr-2" /> This is my ward
              </Button>
              <Button
                data-ocid="fee_pay.deny.button"
                variant="outline"
                onClick={() => setStep(0)}
                className="flex-1 text-destructive border-destructive/30"
              >
                Not my ward
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Fee Details */}
        {step === 2 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">
              💰 Fee Details
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fee details for: <strong>{student?.name}</strong> | Class{" "}
              {student?.class}-{student?.section}
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Fee Head
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                      Pay
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEE_ITEMS.map((fee) => (
                    <tr key={fee.id} className="border-t border-border">
                      <td className="px-4 py-3">{fee.head}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatCurrency(fee.amount)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            fee.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fee.status === "Paid" ? "✅ Paid" : "🔴 Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {fee.status === "Pending" ? (
                          <Checkbox
                            data-ocid={"fee_pay.fee.checkbox"}
                            checked={selectedFees.includes(fee.id)}
                            onCheckedChange={() => toggleFee(fee.id)}
                          />
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-border bg-muted/30">
                    <td
                      className="px-4 py-2 text-sm text-muted-foreground"
                      colSpan={2}
                    >
                      Late Fine
                    </td>
                    <td />
                    <td className="px-4 py-2 text-right font-medium text-destructive">
                      {formatCurrency(lateFine)}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-primary/30 bg-primary/5">
                    <td className="px-4 py-3 font-bold" colSpan={2}>
                      Total Payable
                    </td>
                    <td />
                    <td className="px-4 py-3 text-right font-bold text-primary text-lg">
                      {formatCurrency(totalPayable)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                data-ocid="fee_pay.proceed_payment.button"
                onClick={() => setStep(3)}
                className="flex-1"
                disabled={selectedFees.length === 0}
              >
                Pay Selected: {formatCurrency(totalPayable)}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method */}
        {step === 3 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">
              💳 Choose Payment Method
            </h2>
            <div className="space-y-3 mb-6">
              {[
                {
                  id: "upi",
                  label: "📱 UPI (Google Pay / PhonePe)",
                  desc: "Pay instantly using any UPI app",
                },
                {
                  id: "card",
                  label: "💳 Credit / Debit Card",
                  desc: "Visa, Mastercard, RuPay",
                },
                {
                  id: "netbanking",
                  label: "🏦 Net Banking",
                  desc: "All major Indian banks",
                },
                {
                  id: "cash",
                  label: "💵 Cash (Generate Challan)",
                  desc: "Pay at school counter",
                },
              ].map((m) => (
                <label
                  key={m.id}
                  data-ocid={`fee_pay.method.${m.id}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payMethod === m.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.id}
                    checked={payMethod === m.id}
                    onChange={() => setPayMethod(m.id)}
                    className="accent-primary"
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {m.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {payMethod === "upi" && (
              <div className="space-y-3 mb-6 bg-muted/50 rounded-xl p-4">
                <div className="space-y-1.5">
                  <Label>UPI ID</Label>
                  <Input
                    data-ocid="fee_pay.upi.input"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white border border-border rounded-xl mx-auto flex items-center justify-center">
                    <div className="text-xs text-muted-foreground text-center">
                      QR Code
                      <br />
                      Placeholder
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Scan to pay using any UPI app
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                data-ocid="fee_pay.pay.button"
                onClick={handlePayment}
                className="flex-1 bg-success hover:bg-success/90"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" />
                    Pay {formatCurrency(totalPayable)} Securely
                  </>
                )}
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Powered by Razorpay 🔒 256-bit SSL encrypted
            </p>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 4 && (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Payment Successful!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your fee payment has been processed successfully.
            </p>
            <div className="bg-muted/50 rounded-2xl p-5 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono font-semibold text-foreground">
                  {txnId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Receipt No.</span>
                <span className="font-semibold text-foreground">
                  {receiptNo}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-success text-lg">
                  {formatCurrency(totalPayable)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Student</span>
                <span className="font-semibold text-foreground">
                  {student?.name} | Class {student?.class}-{student?.section}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground">
                  {new Date().toLocaleDateString("en-IN")}{" "}
                  {new Date().toLocaleTimeString("en-IN")}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                data-ocid="fee_pay.download.button"
                variant="outline"
                className="flex-1"
                onClick={() => toast.success("Receipt downloaded!")}
              >
                <Download size={16} className="mr-2" /> Download Receipt
              </Button>
              <Button
                data-ocid="fee_pay.whatsapp.button"
                variant="outline"
                className="flex-1 text-green-600 border-green-200"
                onClick={() => toast.success("Sent on WhatsApp!")}
              >
                <Share2 size={16} className="mr-2" /> Send on WhatsApp
              </Button>
              <Button
                data-ocid="fee_pay.home.button"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                <Home size={16} className="mr-2" /> Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
