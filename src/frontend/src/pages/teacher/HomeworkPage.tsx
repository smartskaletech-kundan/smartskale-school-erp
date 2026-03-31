import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const initialHW = [
  {
    id: "h1",
    title: "Quadratic Equations - Exercise 5.3",
    subject: "Mathematics",
    class: "10-A",
    due: "28/03/2024",
    submitted: 28,
    total: 35,
    status: "Active",
  },
  {
    id: "h2",
    title: "Trigonometry Practice Problems",
    subject: "Mathematics",
    class: "11-B",
    due: "30/03/2024",
    submitted: 22,
    total: 40,
    status: "Active",
  },
  {
    id: "h3",
    title: "Coordinate Geometry Assignment",
    subject: "Mathematics",
    class: "9-A",
    due: "25/03/2024",
    submitted: 30,
    total: 38,
    status: "Completed",
  },
  {
    id: "h4",
    title: "Integration - Module 3",
    subject: "Mathematics",
    class: "12-A",
    due: "01/04/2024",
    submitted: 5,
    total: 42,
    status: "Active",
  },
];

export function HomeworkPage() {
  const [homework, setHomework] = useState(initialHW);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    class: "",
    due: "",
    description: "",
  });

  const handleAdd = () => {
    if (!form.title || !form.class) {
      toast.error("Please fill required fields");
      return;
    }
    setHomework((prev) => [
      {
        id: Date.now().toString(),
        submitted: 0,
        total: 35,
        status: "Active",
        ...form,
      },
      ...prev,
    ]);
    setOpen(false);
    toast.success("Homework posted!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Homework
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage and post assignments
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="homework.add.button">
              <Plus size={16} className="mr-2" /> Add Homework
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="homework.dialog">
            <DialogHeader>
              <DialogTitle>Post New Homework</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="hw-title" className="text-sm font-medium">
                  Title *
                </label>
                <Input
                  id="hw-title"
                  data-ocid="homework.title.input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Homework title"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="hw-class" className="text-sm font-medium">
                  Class *
                </label>
                <Input
                  id="hw-class"
                  data-ocid="homework.class.input"
                  value={form.class}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, class: e.target.value }))
                  }
                  placeholder="e.g. 10-A"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="hw-due" className="text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="hw-due"
                  data-ocid="homework.due.input"
                  type="date"
                  value={form.due}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, due: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="hw-desc" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="hw-desc"
                  data-ocid="homework.description.textarea"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  placeholder="Instructions..."
                />
              </div>
              <Button
                data-ocid="homework.submit.button"
                className="w-full"
                onClick={handleAdd}
              >
                Post Homework
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {homework.map((hw, i) => (
          <div
            data-ocid={`homework.item.${i + 1}`}
            key={hw.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {hw.subject} | Class {hw.class} | Due: {hw.due}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  hw.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }
              >
                {hw.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {hw.submitted}/{hw.total} submitted
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
