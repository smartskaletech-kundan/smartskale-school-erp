import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ptmEvent = {
  title: "Parent-Teacher Meeting — Classes 1-5",
  date: "20/03/2025",
  time: "10:00 AM - 2:00 PM",
  venue: "School Hall",
};

const timeSlots = [
  {
    id: "s1",
    teacher: "Mr. Anil Kumar",
    subject: "Mathematics",
    slots: [
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
    ],
  },
  {
    id: "s2",
    teacher: "Mrs. Priya Verma",
    subject: "English",
    slots: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15"],
  },
  {
    id: "s3",
    teacher: "Mr. Rakesh Sharma",
    subject: "Science",
    slots: ["10:00", "10:15", "10:30", "10:45"],
  },
];

const bookedSlots = ["10:00-s1", "10:30-s2"];

export function PTMPage() {
  const [myBookings, setMyBookings] = useState<string[]>([]);

  const bookSlot = (teacherId: string, time: string) => {
    const key = `${time}-${teacherId}`;
    if (bookedSlots.includes(key)) {
      toast.error("This slot is already booked");
      return;
    }
    if (myBookings.includes(key)) {
      toast.info("Already booked this slot");
      return;
    }
    setMyBookings((prev) => [...prev, key]);
    toast.success(`PTM booked with teacher at ${time}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Parent-Teacher Meeting
        </h1>
        <p className="text-muted-foreground text-sm">
          Book your appointment slot
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground">
              {ptmEvent.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {ptmEvent.date} | {ptmEvent.time}
            </p>
            <p className="text-sm text-muted-foreground">{ptmEvent.venue}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {timeSlots.map((teacher, _ti) => (
          <div
            key={teacher.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {teacher.teacher.charAt(0)}
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">
                  {teacher.teacher}
                </p>
                <p className="text-xs text-muted-foreground">
                  {teacher.subject}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {teacher.slots.map((time) => {
                const key = `${time}-${teacher.id}`;
                const isBooked = bookedSlots.includes(key);
                const isMyBooking = myBookings.includes(key);
                return (
                  <button
                    type="button"
                    key={time}
                    data-ocid={"ptm.slot.button"}
                    onClick={() => bookSlot(teacher.id, time)}
                    disabled={isBooked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${
                      isMyBooking
                        ? "bg-success text-success-foreground border-success"
                        : isBooked
                          ? "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-60"
                          : "border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {isMyBooking ? (
                      <CheckCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {myBookings.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-2xl p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            Your Bookings
          </h4>
          {myBookings.map((b, i) => (
            <p
              key={b}
              data-ocid={`ptm.booking.item.${i + 1}`}
              className="text-sm text-green-600 dark:text-green-400"
            >
              ✅ {b.split("-").slice(0, -1).join(":")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
