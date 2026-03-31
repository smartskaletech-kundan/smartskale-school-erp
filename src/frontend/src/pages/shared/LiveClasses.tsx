import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLiveClasses } from "@/data/mockClasses";
import { Clock, ExternalLink, Users, Video } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

export function LiveClasses({ navigate }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Live Classes
          </h1>
          <p className="text-muted-foreground text-sm">Today's schedule</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/classes/recorded")}
          className="text-sm text-primary hover:underline"
        >
          View Recorded Classes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockLiveClasses.map((cls, i) => (
          <div
            data-ocid={`live_classes.item.${i + 1}`}
            key={cls.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    cls.status === "Live"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Video size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {cls.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    by {cls.teacher}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  cls.status === "Live"
                    ? "bg-red-100 text-red-700 animate-pulse"
                    : "bg-blue-100 text-blue-700"
                }
              >
                {cls.status === "Live" ? "🔴 LIVE" : cls.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {cls.time} ({cls.duration})
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                Class {cls.class}
              </div>
            </div>
            <Button
              data-ocid="live_classes.join.button"
              size="sm"
              className="w-full"
              onClick={() => window.open(cls.link, "_blank")}
              disabled={cls.status !== "Live"}
              variant={cls.status === "Live" ? "default" : "outline"}
            >
              <ExternalLink size={14} className="mr-2" />
              {cls.status === "Live"
                ? "Join Class Now"
                : `Starts at ${cls.time}`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
