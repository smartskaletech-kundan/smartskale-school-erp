import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Link, Upload, Video } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const materials = [
  {
    id: "m1",
    title: "Quadratic Equations Notes.pdf",
    type: "PDF",
    class: "10",
    subject: "Mathematics",
    chapter: "Ch. 5",
    uploadDate: "15/03/2024",
  },
  {
    id: "m2",
    title: "Trigonometry Formulas.pdf",
    type: "PDF",
    class: "11",
    subject: "Mathematics",
    chapter: "Ch. 3",
    uploadDate: "10/03/2024",
  },
  {
    id: "m3",
    title: "Coordinate Geometry Video",
    type: "Video",
    class: "9",
    subject: "Mathematics",
    chapter: "Ch. 7",
    uploadDate: "08/03/2024",
  },
  {
    id: "m4",
    title: "Integration Practice Sheet.pdf",
    type: "PDF",
    class: "12",
    subject: "Mathematics",
    chapter: "Ch. 2",
    uploadDate: "05/03/2024",
  },
  {
    id: "m5",
    title: "NCERT Solutions Class 10 Maths",
    type: "Link",
    class: "10",
    subject: "Mathematics",
    chapter: "All",
    uploadDate: "01/03/2024",
  },
];

const icons: Record<string, React.ReactNode> = {
  PDF: <FileText size={18} className="text-red-500" />,
  Video: <Video size={18} className="text-blue-500" />,
  Link: <Link size={18} className="text-green-500" />,
};

export function StudyMaterials() {
  const [classFilter, setClassFilter] = useState("");

  const filtered = classFilter
    ? materials.filter((m) => m.class === classFilter)
    : materials;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Study Materials
          </h1>
          <p className="text-muted-foreground text-sm">
            Upload PDFs, videos and links
          </p>
        </div>
        <Button
          data-ocid="materials.upload_button"
          onClick={() => toast.info("Upload form coming")}
        >
          <Upload size={16} className="mr-2" /> Upload Material
        </Button>
      </div>

      <div className="flex gap-3">
        <Select
          defaultValue="all"
          onValueChange={(val) => setClassFilter(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={String(i + 1)} value={String(i + 1)}>
                Class {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((m, i) => (
          <div
            data-ocid={`materials.item.${i + 1}`}
            key={m.id}
            className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center gap-4 hover:shadow-card-hover transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              {icons[m.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {m.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Class {m.class} | {m.subject} | {m.chapter} | {m.uploadDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  m.type === "PDF"
                    ? "bg-red-100 text-red-700"
                    : m.type === "Video"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {m.type}
              </span>
              <Button
                data-ocid="materials.secondary_button"
                size="sm"
                variant="outline"
                onClick={() => toast.success("Opening material...")}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
