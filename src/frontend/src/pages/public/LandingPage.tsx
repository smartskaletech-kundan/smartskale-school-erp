import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  ClipboardList,
  DollarSign,
  GraduationCap,
  Library,
  Mail,
  MapPin,
  Phone,
  Truck,
  Users,
  Video,
} from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
}

const features = [
  {
    icon: <Users size={24} />,
    title: "Student Management",
    desc: "Complete student lifecycle from admission to alumni",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Fee Portal",
    desc: "Online fee payment with Razorpay, receipts & reports",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: <Video size={24} />,
    title: "Online Classes",
    desc: "Live + recorded classes via Zoom & Google Meet",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Attendance",
    desc: "Daily attendance marking with analytics & reports",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: <Award size={24} />,
    title: "Exams & Results",
    desc: "Exam scheduling, marks entry, report cards",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: <Library size={24} />,
    title: "Library",
    desc: "Book catalog, issue/return, fine management",
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

const stats = [
  { value: "6,000+", label: "Students" },
  { value: "300+", label: "Staff Members" },
  { value: "25+", label: "Years of Excellence" },
  { value: "98%", label: "Parent Satisfaction" },
];

export function LandingPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 bg-card/90 backdrop-blur border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <div>
              <p className="font-heading font-bold text-foreground leading-tight text-sm">
                Saraswati Public School
              </p>
              <p className="text-xs text-muted-foreground">
                Bailey Road, Patna
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              data-ocid="landing.login.button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login to Portal
            </Button>
            <Button
              data-ocid="landing.pay_fee.button"
              size="sm"
              onClick={() => navigate("/pay-fee")}
            >
              Pay Fee Online
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.35 0.14 264) 60%, oklch(0.546 0.242 264) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              CBSE Affiliated | Estd. 1998 | Affiliation No: 330045
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
              Powering India's Schools,
              <br />
              <span className="text-blue-300">One Dashboard at a Time</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              SmartSkale is a complete School ERP + LMS platform for Saraswati
              Public School, Patna. Manage 6,000+ students, fees, classes, and
              everything in between.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-ocid="hero.login.button"
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8"
              >
                <GraduationCap size={18} className="mr-2" /> Login to Portal
              </Button>
              <Button
                data-ocid="hero.pay_fee.button"
                size="lg"
                variant="outline"
                onClick={() => navigate("/pay-fee")}
                className="border-white/50 text-white hover:bg-white/10 px-8"
              >
                <DollarSign size={18} className="mr-2" /> Pay Fee Online
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-heading font-extrabold text-white">
                  {s.value}
                </p>
                <p className="text-blue-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground">
            Everything Your School Needs
          </h2>
          <p className="text-muted-foreground mt-3">
            A comprehensive platform for modern Indian schools
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">
                  Bailey Road, Patna - 800001, Bihar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-primary mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">
                  +91 612 234 5678
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  info@saraswatipublic.edu.in
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
