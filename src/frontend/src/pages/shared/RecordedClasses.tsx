import { Button } from "@/components/ui/button";
import { mockRecordedClasses } from "@/data/mockClasses";
import { Clock, Eye, Play } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function RecordedClasses() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Recorded Classes
        </h1>
        <p className="text-muted-foreground text-sm">
          Access recorded lectures anytime
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRecordedClasses.map((cls, i) => (
          <div
            data-ocid={`recorded.item.${i + 1}`}
            key={cls.id}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 h-32 flex items-center justify-center relative">
              <div
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                onClick={() => toast.success("Starting video player...")}
                onKeyDown={() => toast.success("Starting video player...")}
                role="presentation"
              >
                <Play size={20} className="text-white ml-1" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                <Clock size={10} /> {cls.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold text-foreground text-sm leading-snug mb-1">
                {cls.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {cls.subject} | Class {cls.class}
              </p>
              <p className="text-xs text-muted-foreground">
                by {cls.teacher} | {cls.uploadDate}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye size={12} /> {cls.views} views
                </div>
                <Button
                  data-ocid="recorded.play.button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => toast.success("Opening video...")}
                >
                  <Play size={12} className="mr-1" /> Play
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
