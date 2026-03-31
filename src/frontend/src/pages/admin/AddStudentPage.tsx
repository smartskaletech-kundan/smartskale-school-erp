import { StepperProgress } from "@/components/shared/StepperProgress";
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
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

const STEPS = ["Personal", "Contact", "Academic", "Documents", "Review"];

export function AddStudentPage({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    religion: "",
    category: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    className: "",
    section: "",
    previousSchool: "",
    tcNumber: "",
    board: "",
    photo: "",
    aadhaar: "",
    tc: "",
    birthCert: "",
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    toast.success(
      `Student admitted successfully! Admission No: 2024-${Math.floor(Math.random() * 9000) + 1000}`,
    );
    navigate("/admin/students");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/students")}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Add New Student
          </h1>
          <p className="text-muted-foreground text-sm">5-step admission form</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="mb-8">
          <StepperProgress steps={STEPS} currentStep={step} />
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name *</Label>
                <Input
                  data-ocid="add_student.name.input"
                  placeholder="Student full name"
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Date of Birth *</Label>
                <Input
                  data-ocid="add_student.dob.input"
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Gender *</Label>
                <Select onValueChange={(v) => update("gender", v)}>
                  <SelectTrigger data-ocid="add_student.gender.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Religion</Label>
                <Input
                  placeholder="Religion"
                  value={formData.religion}
                  onChange={(e) => update("religion", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select onValueChange={(v) => update("category", v)}>
                  <SelectTrigger data-ocid="add_student.category.select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["General", "OBC", "SC", "ST", "EWS"].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
              Contact & Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Father's Name *</Label>
                <Input
                  data-ocid="add_student.father_name.input"
                  placeholder="Father's full name"
                  value={formData.fatherName}
                  onChange={(e) => update("fatherName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Mother's Name</Label>
                <Input
                  placeholder="Mother's full name"
                  value={formData.motherName}
                  onChange={(e) => update("motherName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Parent Mobile *</Label>
                <Input
                  data-ocid="add_student.phone.input"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.guardianPhone}
                  onChange={(e) => update("guardianPhone", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Address *</Label>
                <Input
                  data-ocid="add_student.address.input"
                  placeholder="House/Flat no., Street, Colony"
                  value={formData.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>State</Label>
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => update("state", e.target.value)}
                  defaultValue="Bihar"
                />
              </div>
              <div className="space-y-1.5">
                <Label>PIN Code</Label>
                <Input
                  placeholder="6-digit PIN"
                  value={formData.pin}
                  onChange={(e) => update("pin", e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
              Academic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Class *</Label>
                <Select onValueChange={(v) => update("className", v)}>
                  <SelectTrigger data-ocid="add_student.class.select">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Nursery",
                      "KG",
                      ...Array.from({ length: 12 }, (_, i) => String(i + 1)),
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Section *</Label>
                <Select onValueChange={(v) => update("section", v)}>
                  <SelectTrigger data-ocid="add_student.section.select">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C", "D"].map((s) => (
                      <SelectItem key={s} value={s}>
                        Section {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Board</Label>
                <Select onValueChange={(v) => update("board", v)}>
                  <SelectTrigger data-ocid="add_student.board.select">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "CBSE",
                      "ICSE",
                      "UP Board",
                      "Bihar Board",
                      "State Board",
                    ].map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Previous School</Label>
                <Input
                  data-ocid="add_student.prev_school.input"
                  placeholder="Previous school name"
                  value={formData.previousSchool}
                  onChange={(e) => update("previousSchool", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>TC Number</Label>
                <Input
                  placeholder="Transfer certificate number"
                  value={formData.tcNumber}
                  onChange={(e) => update("tcNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
              Upload Documents
            </h2>
            {[
              { key: "photo", label: "Student Photo *", accept: "image/*" },
              { key: "aadhaar", label: "Aadhaar Card", accept: "image/*,.pdf" },
              {
                key: "tc",
                label: "Transfer Certificate (TC)",
                accept: ".pdf,image/*",
              },
              {
                key: "birthCert",
                label: "Birth Certificate",
                accept: ".pdf,image/*",
              },
            ].map((doc) => (
              <div key={doc.key} className="space-y-1.5">
                <Label>{doc.label}</Label>
                <div
                  data-ocid="add_student.document.dropzone"
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={() => toast.info(`Select ${doc.label}`)}
                  onKeyDown={() => toast.info(`Select ${doc.label}`)}
                  role="presentation"
                >
                  {formData[doc.key as keyof typeof formData] ? (
                    <p className="text-sm text-success font-medium">
                      ✅ {formData[doc.key as keyof typeof formData]}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Accepts: {doc.accept}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 5 — Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
              Review & Submit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Name", value: formData.name || "(not filled)" },
                {
                  label: "Date of Birth",
                  value: formData.dob || "(not filled)",
                },
                { label: "Gender", value: formData.gender || "(not filled)" },
                {
                  label: "Category",
                  value: formData.category || "(not filled)",
                },
                {
                  label: "Father's Name",
                  value: formData.fatherName || "(not filled)",
                },
                {
                  label: "Mobile",
                  value: formData.guardianPhone || "(not filled)",
                },
                {
                  label: "Class",
                  value: formData.className
                    ? `Class ${formData.className}-${formData.section}`
                    : "(not filled)",
                },
                { label: "Board", value: formData.board || "CBSE" },
                {
                  label: "Address",
                  value: formData.address
                    ? `${formData.address}, ${formData.city}`
                    : "(not filled)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted/50 rounded-xl px-4 py-3"
                >
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() =>
              step > 0 ? setStep((s) => s - 1) : navigate("/admin/students")
            }
            disabled={step === 0}
          >
            Back
          </Button>
          {step < 4 ? (
            <Button
              data-ocid="add_student.next.button"
              onClick={() => setStep((s) => s + 1)}
            >
              Next Step
            </Button>
          ) : (
            <Button
              data-ocid="add_student.submit.button"
              onClick={handleSubmit}
              className="bg-success hover:bg-success/90"
            >
              Submit Admission
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
