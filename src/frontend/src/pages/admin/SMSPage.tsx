import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, Users } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const templates = [
  {
    id: "t1",
    label: "Fee Reminder",
    text: "Dear Parent, fee of {amount} for {name} is due. Pay by 10th. -Saraswati Public School",
  },
  {
    id: "t2",
    label: "Holiday Notice",
    text: "School will remain closed on {date}. Classes resume from {nextDate}. -Saraswati Public School",
  },
  {
    id: "t3",
    label: "Exam Reminder",
    text: "Exams start from {date}. Ensure your ward is prepared. Timetable on portal. -Saraswati School",
  },
  {
    id: "t4",
    label: "PTM Reminder",
    text: "PTM scheduled on {date} at 10 AM. Your presence is requested. -Saraswati School",
  },
];

const recipientGroups = [
  { id: "all_parents", label: "All Parents", count: 6247 },
  { id: "all_students", label: "All Students", count: 6247 },
  { id: "all_staff", label: "All Staff", count: 312 },
  { id: "class10", label: "Class 10 Parents", count: 245 },
  { id: "defaulters", label: "Fee Defaulters", count: 89 },
];

export function SMSPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
    );
  const totalRecipients = recipientGroups
    .filter((g) => selected.includes(g.id))
    .reduce((s, g) => s + g.count, 0);

  const handleSend = async () => {
    if (selected.length === 0 || !message) {
      toast.error("Select recipients and write message");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success(
      `SMS sent to ${totalRecipients.toLocaleString("en-IN")} recipients!`,
    );
    setSelected([]);
    setMessage("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Bulk SMS
        </h1>
        <p className="text-muted-foreground text-sm">
          Send bulk SMS / WhatsApp messages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            <Users size={16} className="inline mr-2" />
            Select Recipients
          </h3>
          <div className="space-y-3">
            {recipientGroups.map((g, i) => (
              <div
                data-ocid={`sms.recipient.item.${i + 1}`}
                key={g.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer"
              >
                <Checkbox
                  data-ocid="sms.recipient.checkbox"
                  checked={selected.includes(g.id)}
                  onCheckedChange={() => toggle(g.id)}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {g.label}
                  </p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {g.count.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
          {totalRecipients > 0 && (
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-3">
              <p className="text-sm font-medium text-primary">
                {totalRecipients.toLocaleString("en-IN")} total recipients
                selected
              </p>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Compose Message
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Template</p>
              <Select
                onValueChange={(v) =>
                  setMessage(templates.find((t) => t.id === v)?.text || "")
                }
              >
                <SelectTrigger data-ocid="sms.template.select">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sms-message" className="text-sm font-medium">
                Message ({message.length}/160)
              </label>
              <Textarea
                id="sms-message"
                data-ocid="sms.message.textarea"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                maxLength={160}
              />
            </div>
            <Button
              data-ocid="sms.send.button"
              className="w-full"
              onClick={handleSend}
              disabled={sending || selected.length === 0 || !message}
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Send SMS to {totalRecipients.toLocaleString("en-IN")}{" "}
                  recipients
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
