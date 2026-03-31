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

export function AddStaffPage({ navigate }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/staff")}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Add Staff Member
        </h1>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name *</Label>
            <Input
              data-ocid="add_staff.name.input"
              placeholder="Staff full name"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Employee ID</Label>
            <Input
              data-ocid="add_staff.empid.input"
              placeholder="Auto-generated"
              disabled
            />
          </div>
          <div className="space-y-1.5">
            <Label>Mobile *</Label>
            <Input
              data-ocid="add_staff.mobile.input"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              data-ocid="add_staff.email.input"
              type="email"
              placeholder="staff@school.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Role *</Label>
            <Select>
              <SelectTrigger data-ocid="add_staff.role.select">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Teacher",
                  "Senior Teacher",
                  "Lab Assistant",
                  "Office Staff",
                  "Librarian",
                  "Driver",
                ].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Input placeholder="Subject (if teacher)" />
          </div>
          <div className="space-y-1.5">
            <Label>Qualification</Label>
            <Input placeholder="e.g. M.Sc, B.Ed" />
          </div>
          <div className="space-y-1.5">
            <Label>Salary</Label>
            <Input type="number" placeholder="Monthly salary" />
          </div>
        </div>
        <Button
          data-ocid="add_staff.submit.button"
          className="mt-6"
          onClick={() => {
            toast.success("Staff added!");
            navigate("/admin/staff");
          }}
        >
          Add Staff Member
        </Button>
      </div>
    </div>
  );
}
