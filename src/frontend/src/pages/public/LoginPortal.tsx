import {
  Building2,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Users,
} from "lucide-react";
import React from "react";

interface Props {
  navigate: (path: string) => void;
}

const portals = [
  {
    id: "admin",
    icon: <Building2 size={40} />,
    title: "Admin Portal",
    description: "For school administration, office staff, and management.",
    demo: "admin@school.com / admin123",
    path: "/login/admin",
    gradient: "from-blue-600 to-indigo-700",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "teacher",
    icon: <Users size={40} />,
    title: "Teacher Portal",
    description: "For teaching and non-teaching staff members.",
    demo: "Employee ID: T001 / teacher123",
    path: "/login/teacher",
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "student",
    icon: <GraduationCap size={40} />,
    title: "Student / Parent Portal",
    description: "For students and parents to access results, fees & more.",
    demo: "Admission No. + Date of Birth",
    path: "/login/student",
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
];

const staffRoles = [
  {
    title: "Accountant",
    email: "accountant@school.com",
    color: "text-emerald-400",
  },
  { title: "Librarian", email: "librarian@school.com", color: "text-blue-400" },
  {
    title: "Transport Manager",
    email: "transport@school.com",
    color: "text-amber-400",
  },
  {
    title: "Computer Lab Incharge",
    email: "lab@school.com",
    color: "text-violet-400",
  },
  {
    title: "Vendor Manager",
    email: "vendor@school.com",
    color: "text-rose-400",
  },
];

export function LoginPortal({ navigate }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.35 0.14 264) 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center pt-12 pb-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Saraswati Public School
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Bailey Road, Patna - 800001, Bihar
          </p>
          <p className="text-blue-300 text-xs mt-1">
            CBSE | Estd. 1998 | SmartSkale ERP
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <p className="text-white/70 text-sm mb-8">
          Choose your portal to login
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {portals.map((portal) => (
            <button
              type="button"
              key={portal.id}
              data-ocid={`login.${portal.id}.card`}
              onClick={() => navigate(portal.path)}
              className="bg-card rounded-2xl p-6 text-left hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 group"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${portal.iconBg}`}
              >
                {portal.icon}
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                {portal.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {portal.description}
              </p>
              <div className="bg-muted rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-muted-foreground font-medium">
                  Demo credentials:
                </p>
                <p className="text-xs text-foreground font-mono mt-0.5">
                  {portal.demo}
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                Login <ChevronRight size={16} />
              </div>
            </button>
          ))}
        </div>

        {/* Staff Role Demo Credentials */}
        <div className="mt-8 w-full max-w-4xl bg-white/5 rounded-2xl p-5">
          <p className="text-white/80 text-sm font-semibold mb-3">
            Staff Role Demo Credentials (all use Admin Portal / password:
            demo123)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {staffRoles.map((role) => (
              <div key={role.email} className="bg-white/5 rounded-lg px-3 py-2">
                <p className={`text-xs font-semibold ${role.color}`}>
                  {role.title}
                </p>
                <p className="text-white/60 text-xs font-mono mt-0.5">
                  {role.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
          <DollarSign size={16} />
          <span>Want to pay fees without login?</span>
          <button
            type="button"
            data-ocid="login.pay_fee.link"
            onClick={() => navigate("/pay-fee")}
            className="text-blue-300 underline font-medium"
          >
            Quick Fee Payment
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 text-white/40 hover:text-white/60 text-xs"
        >
          ← Back to School Website
        </button>
      </div>
    </div>
  );
}
