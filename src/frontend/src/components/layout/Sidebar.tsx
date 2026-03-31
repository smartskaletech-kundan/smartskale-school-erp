import { useAuth } from "@/context/AuthContext";
import {
  BarChart2,
  Bell,
  Book,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  DollarSign,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquare,
  Monitor,
  Package,
  PenTool,
  Settings,
  ShoppingCart,
  Truck,
  UserCheck,
  Users,
  Video,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  children?: NavItem[];
}

function getRoleNav(role: string): NavItem[] {
  const shared = [
    { label: "Messages", icon: <MessageSquare size={18} />, path: "/messages" },
    { label: "Notices", icon: <Bell size={18} />, path: "/notices" },
  ];

  const feeChildren = [
    {
      label: "Fee Dashboard",
      icon: <BarChart2 size={16} />,
      path: "/admin/fees/dashboard",
    },
    {
      label: "Fee Structure",
      icon: <FileText size={16} />,
      path: "/admin/fees/structure",
    },
    {
      label: "Collect Fee",
      icon: <DollarSign size={16} />,
      path: "/admin/fees/collect",
    },
    {
      label: "Transactions",
      icon: <ClipboardList size={16} />,
      path: "/admin/fees/transactions",
    },
    {
      label: "Reminders",
      icon: <Bell size={16} />,
      path: "/admin/fees/reminders",
    },
    {
      label: "Reports",
      icon: <BarChart2 size={16} />,
      path: "/admin/fees/reports",
    },
  ];

  const libraryChildren = [
    { label: "Book Catalog", icon: <Book size={16} />, path: "/admin/library" },
    {
      label: "Issue Book",
      icon: <BookOpen size={16} />,
      path: "/admin/library/issue",
    },
    {
      label: "Returns",
      icon: <ClipboardList size={16} />,
      path: "/admin/library/returns",
    },
    {
      label: "Reports",
      icon: <BarChart2 size={16} />,
      path: "/admin/library/reports",
    },
  ];

  const transportChildren = [
    { label: "Overview", icon: <Truck size={16} />, path: "/admin/transport" },
    {
      label: "Routes",
      icon: <Truck size={16} />,
      path: "/admin/transport/routes",
    },
    {
      label: "Assign Students",
      icon: <Users size={16} />,
      path: "/admin/transport/assign",
    },
    {
      label: "GPS Tracking",
      icon: <Monitor size={16} />,
      path: "/admin/transport/tracking",
    },
  ];

  const examChildren = [
    { label: "Schedule", icon: <Calendar size={16} />, path: "/admin/exams" },
    {
      label: "Report Card",
      icon: <FileText size={16} />,
      path: "/admin/exams/reportcard",
    },
    {
      label: "Analytics",
      icon: <BarChart2 size={16} />,
      path: "/admin/exams/analytics",
    },
  ];

  switch (role) {
    case "superadmin":
    case "admin":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path:
            role === "superadmin"
              ? "/superadmin/dashboard"
              : "/admin/dashboard",
        },
        {
          label: "Students",
          icon: <Users size={18} />,
          path: "/admin/students",
        },
        { label: "Staff", icon: <UserCheck size={18} />, path: "/admin/staff" },
        {
          label: "Fees",
          icon: <DollarSign size={18} />,
          path: "/admin/fees/dashboard",
          children: feeChildren,
        },
        {
          label: "Attendance",
          icon: <ClipboardList size={18} />,
          path: "/admin/attendance/reports",
        },
        {
          label: "Exams",
          icon: <PenTool size={18} />,
          path: "/admin/exams",
          children: examChildren,
        },
        {
          label: "Library",
          icon: <Library size={18} />,
          path: "/admin/library",
          children: libraryChildren,
        },
        {
          label: "Transport",
          icon: <Truck size={18} />,
          path: "/admin/transport",
          children: transportChildren,
        },
        {
          label: "Online Classes",
          icon: <Video size={18} />,
          path: "/classes/live",
        },
        ...shared,
        {
          label: "Bulk SMS",
          icon: <MessageSquare size={18} />,
          path: "/admin/sms",
        },
        { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
      ];
    case "teacher":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/teacher/dashboard",
        },
        {
          label: "Attendance",
          icon: <ClipboardList size={18} />,
          path: "/teacher/attendance",
        },
        {
          label: "Homework",
          icon: <BookOpen size={18} />,
          path: "/teacher/homework",
        },
        {
          label: "Timetable",
          icon: <Calendar size={18} />,
          path: "/teacher/timetable",
        },
        {
          label: "Marks Entry",
          icon: <PenTool size={18} />,
          path: "/teacher/exams/marks",
        },
        {
          label: "Study Materials",
          icon: <Book size={18} />,
          path: "/teacher/materials",
        },
        {
          label: "Live Classes",
          icon: <Video size={18} />,
          path: "/classes/live",
        },
        {
          label: "Recorded Classes",
          icon: <Monitor size={18} />,
          path: "/classes/recorded",
        },
        ...shared,
      ];
    case "student":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/student/dashboard",
        },
        {
          label: "My Profile",
          icon: <Users size={18} />,
          path: "/student/profile",
        },
        {
          label: "Fee Payment",
          icon: <DollarSign size={18} />,
          path: "/pay-fee",
        },
        {
          label: "Attendance",
          icon: <ClipboardList size={18} />,
          path: "/student/attendance",
        },
        {
          label: "Homework",
          icon: <BookOpen size={18} />,
          path: "/student/homework",
        },
        {
          label: "Study Materials",
          icon: <Book size={18} />,
          path: "/teacher/materials",
        },
        {
          label: "Exams & Results",
          icon: <PenTool size={18} />,
          path: "/student/results",
        },
        {
          label: "Report Card",
          icon: <FileText size={18} />,
          path: "/admin/exams/reportcard",
        },
        {
          label: "Online Classes",
          icon: <Video size={18} />,
          path: "/classes/live",
        },
        {
          label: "Messages",
          icon: <MessageSquare size={18} />,
          path: "/messages",
        },
      ];
    case "parent":
      return [
        {
          label: "Dashboard",
          icon: <Home size={18} />,
          path: "/parent/dashboard",
        },
        {
          label: "My Children",
          icon: <Users size={18} />,
          path: "/parent/children",
        },
        { label: "Pay Fees", icon: <DollarSign size={18} />, path: "/pay-fee" },
        {
          label: "Attendance Report",
          icon: <ClipboardList size={18} />,
          path: "/student/attendance",
        },
        {
          label: "Exam Results",
          icon: <GraduationCap size={18} />,
          path: "/student/results",
        },
        {
          label: "Message Teacher",
          icon: <MessageSquare size={18} />,
          path: "/messages",
        },
        { label: "PTM Booking", icon: <Calendar size={18} />, path: "/ptm" },
        { label: "Notifications", icon: <Bell size={18} />, path: "/notices" },
      ];
    case "accountant":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/accountant/dashboard",
        },
        {
          label: "Fees",
          icon: <DollarSign size={18} />,
          path: "/admin/fees/dashboard",
          children: feeChildren,
        },
        {
          label: "Salary",
          icon: <FileText size={18} />,
          path: "/admin/salary",
        },
        {
          label: "Leave",
          icon: <ClipboardList size={18} />,
          path: "/admin/leave",
        },
        { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
      ];
    case "librarian":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/librarian/dashboard",
        },
        {
          label: "Library",
          icon: <Library size={18} />,
          path: "/admin/library",
          children: libraryChildren,
        },
        { label: "Notices", icon: <Bell size={18} />, path: "/notices" },
      ];
    case "transport-manager":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/transport-manager/dashboard",
        },
        {
          label: "Transport",
          icon: <Truck size={18} />,
          path: "/admin/transport",
          children: transportChildren,
        },
        { label: "Notices", icon: <Bell size={18} />, path: "/notices" },
      ];
    case "lab-incharge":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/lab-incharge/dashboard",
        },
        {
          label: "Schedule",
          icon: <Calendar size={18} />,
          path: "/teacher/timetable",
        },
        { label: "Notices", icon: <Bell size={18} />, path: "/notices" },
      ];
    case "vendor":
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/vendor/dashboard",
        },
        {
          label: "Purchase Orders",
          icon: <ShoppingCart size={18} />,
          path: "/vendor/dashboard",
        },
        {
          label: "Inventory",
          icon: <Package size={18} />,
          path: "/vendor/dashboard",
        },
        { label: "Notices", icon: <Bell size={18} />, path: "/notices" },
      ];
    default:
      return [];
  }
}

interface SidebarProps {
  currentPath: string;
  navigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  currentPath,
  navigate,
  isOpen,
  onClose,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const navItems = getRoleNav(user?.role || "admin");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(`${path}/`);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          onKeyDown={onClose}
          role="presentation"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 sidebar-gradient z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-heading font-bold text-sm leading-tight">
              Saraswati Public
            </p>
            <p className="text-blue-300 text-xs">School, Patna</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-4 py-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 uppercase tracking-wider">
            {user?.role || "Admin"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all duration-150 ${
                      item.children.some((c) => isActive(c.path))
                        ? "bg-blue-500/20 text-white"
                        : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <div className="ml-4 border-l border-white/10 pl-2 mb-1">
                      {item.children.map((child) => (
                        <button
                          type="button"
                          key={child.path}
                          data-ocid={`nav.${child.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                          onClick={() => {
                            navigate(child.path);
                            onClose();
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-xs transition-all duration-150 ${
                            isActive(child.path)
                              ? "bg-blue-500 text-white font-semibold"
                              : "text-blue-100/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {child.icon}
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all duration-150 ${
                    isActive(item.path)
                      ? "bg-blue-500 text-white font-semibold shadow-sm"
                      : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {user?.name}
              </p>
              <p className="text-blue-300 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="nav.logout.button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-200 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
