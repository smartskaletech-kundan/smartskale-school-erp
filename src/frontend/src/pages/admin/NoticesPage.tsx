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
import { Bell, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const initialNotices = [
  {
    id: "n1",
    title: "Holiday Notice: Holi",
    body: "School will remain closed on 25th March 2025 on account of Holi. Classes will resume from 26th March.",
    date: "20/03/2024",
    target: "All",
    author: "Principal",
  },
  {
    id: "n2",
    title: "Half-Yearly Exam Schedule",
    body: "Half-yearly examinations will commence from 15th September 2024. Time table attached.",
    date: "01/09/2024",
    target: "Classes 6-12",
    author: "Exam Committee",
  },
  {
    id: "n3",
    title: "Annual Sports Day",
    body: "Annual Sports Day will be held on 12th October 2024 at the school ground. Students to report by 7:30 AM.",
    date: "05/10/2024",
    target: "All",
    author: "Sports Dept",
  },
  {
    id: "n4",
    title: "Fee Submission Reminder",
    body: "Last date for fee submission without late fine is 10th of every month. Parents are requested to ensure timely payment.",
    date: "01/03/2024",
    target: "Parents",
    author: "Accounts",
  },
  {
    id: "n5",
    title: "PTM Schedule",
    body: "Parent-Teacher Meeting for Classes 1-5 is scheduled for 20th March 2025, 10 AM - 2 PM.",
    date: "15/03/2024",
    target: "Parents",
    author: "Admin",
  },
];

export function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", target: "All" });

  const handlePost = () => {
    if (!form.title || !form.body) {
      toast.error("Please fill title and body");
      return;
    }
    setNotices((prev) => [
      {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-IN"),
        author: "Admin",
        ...form,
      },
      ...prev,
    ]);
    setOpen(false);
    setForm({ title: "", body: "", target: "All" });
    toast.success("Notice posted!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Notice Board
          </h1>
          <p className="text-muted-foreground text-sm">
            School announcements and circulars
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="notices.add.button" size="sm">
              <Plus size={16} className="mr-2" /> Post Notice
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="notices.dialog">
            <DialogHeader>
              <DialogTitle>Post New Notice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="notice-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="notice-title"
                  data-ocid="notices.title.input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Notice title"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="notice-content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="notice-content"
                  data-ocid="notices.body.textarea"
                  rows={4}
                  value={form.body}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, body: e.target.value }))
                  }
                  placeholder="Notice content..."
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="notice-target" className="text-sm font-medium">
                  Target
                </label>
                <select
                  id="notice-target"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
                  value={form.target}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, target: e.target.value }))
                  }
                >
                  {[
                    "All",
                    "Students",
                    "Parents",
                    "Staff",
                    "Classes 1-5",
                    "Classes 6-10",
                    "Classes 11-12",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Button
                data-ocid="notices.submit.button"
                className="w-full"
                onClick={handlePost}
              >
                Post Notice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {notices.map((n, i) => (
          <div
            data-ocid={`notices.item.${i + 1}`}
            key={n.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {n.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    By {n.author} | {n.date}
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700 whitespace-nowrap">
                {n.target}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
