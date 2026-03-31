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
import { useAuth } from "@/context/AuthContext";
import { mockStudents } from "@/data/mockStudents";
import { ArrowLeft, CheckCircle, DollarSign, Search, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
  role?: "student" | "parent";
}

export function StudentLogin({ navigate, role = "student" }: Props) {
  const { login } = useAuth();
  const [step, setStep] = useState<"search" | "found">("search");
  const [formData, setFormData] = useState({
    selectedClass: "",
    admissionNo: "",
    name: "",
    dob: "",
    mobile: "",
  });
  const [foundStudent, setFoundStudent] = useState<
    (typeof mockStudents)[0] | null
  >(null);
  const [searching, setSearching] = useState(false);

  const classes = [
    "Nursery",
    "KG",
    ...Array.from({ length: 12 }, (_, i) => String(i + 1)),
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    await new Promise((r) => setTimeout(r, 600));
    const student =
      mockStudents.find(
        (s) =>
          (formData.admissionNo && s.admissionNo === formData.admissionNo) ||
          (formData.name &&
            s.name.toLowerCase().includes(formData.name.toLowerCase())),
      ) || mockStudents[0];
    setFoundStudent(student);
    setStep("found");
    setSearching(false);
  };

  const handleProceed = async () => {
    if (!foundStudent) return;
    const ok = await login({
      email: foundStudent.admissionNo,
      password: "student123",
      role,
    });
    if (ok) {
      navigate(role === "parent" ? "/parent/dashboard" : "/student/dashboard");
      toast.success(`Welcome, ${foundStudent.name}!`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.35 0.14 264) 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl p-8 shadow-2xl">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6"
          >
            <ArrowLeft size={16} /> Back to Portal
          </button>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">
                {role === "parent" ? "P" : "S"}
              </span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {role === "parent" ? "Parent" : "Student"} Portal
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Saraswati Public School, Patna
            </p>
          </div>

          {step === "search" ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Select Class</Label>
                <Select
                  onValueChange={(v) =>
                    setFormData((f) => ({ ...f, selectedClass: v }))
                  }
                >
                  <SelectTrigger data-ocid="student_login.class.select">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Admission Number</Label>
                <Input
                  data-ocid="student_login.admission.input"
                  placeholder="e.g. 2024-1045"
                  value={formData.admissionNo}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, admissionNo: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Student Name (Optional)</Label>
                <Input
                  data-ocid="student_login.name.input"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Date of Birth</Label>
                <Input
                  data-ocid="student_login.dob.input"
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, dob: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Parent Mobile</Label>
                <Input
                  data-ocid="student_login.mobile.input"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, mobile: e.target.value }))
                  }
                />
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl px-4 py-3 text-xs">
                <p className="text-violet-600 dark:text-violet-400">
                  Demo: Enter Admission No. <strong>2024-1045</strong> or any
                  name to search
                </p>
              </div>
              <Button
                data-ocid="student_login.search.button"
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700"
                disabled={searching}
              >
                <Search size={16} className="mr-2" />
                {searching ? "Searching..." : "Search Student"}
              </Button>
              <button
                type="button"
                data-ocid="student_login.pay_fee.link"
                onClick={() => navigate("/pay-fee")}
                className="w-full text-center text-sm text-primary hover:underline"
              >
                <DollarSign size={14} className="inline mr-1" />
                Pay Fee without Login
              </button>
            </form>
          ) : (
            foundStudent && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-muted rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-2xl font-bold">
                      {foundStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">
                        {foundStudent.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Class {foundStudent.class}-{foundStudent.section}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Father: {foundStudent.fatherName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Adm: {foundStudent.admissionNo}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg px-3 py-2">
                    <CheckCircle size={14} /> Registered Mobile:{" "}
                    {foundStudent.mobile.replace(/\d(?=\d{4})/g, "X")}
                  </div>
                </div>
                <Button
                  data-ocid="student_login.proceed.button"
                  onClick={handleProceed}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  <User size={16} className="mr-2" /> Proceed to Dashboard
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("search")}
                  className="w-full text-center text-sm text-destructive hover:underline"
                >
                  Not my ward — Search again
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
