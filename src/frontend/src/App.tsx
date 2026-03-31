import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { AccountantDashboard } from "@/pages/accountant/AccountantDashboard";
import { AddStaffPage } from "@/pages/admin/AddStaffPage";
import { AddStudentPage } from "@/pages/admin/AddStudentPage";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AttendanceReports } from "@/pages/admin/AttendanceReports";
import { ExamAnalytics } from "@/pages/admin/ExamAnalytics";
import { ExamsPage } from "@/pages/admin/ExamsPage";
import { FeeCollect } from "@/pages/admin/FeeCollect";
import { FeeDashboard } from "@/pages/admin/FeeDashboard";
import { FeeReminders } from "@/pages/admin/FeeReminders";
import { FeeReports } from "@/pages/admin/FeeReports";
import { FeeStructure } from "@/pages/admin/FeeStructure";
import { FeeTransactions } from "@/pages/admin/FeeTransactions";
import { LeavePage } from "@/pages/admin/LeavePage";
import { LibraryIssue } from "@/pages/admin/LibraryIssue";
import { LibraryPage } from "@/pages/admin/LibraryPage";
import { LibraryReports } from "@/pages/admin/LibraryReports";
import { LibraryReturns } from "@/pages/admin/LibraryReturns";
import { NoticesPage } from "@/pages/admin/NoticesPage";
import { ReportCardPage } from "@/pages/admin/ReportCardPage";
import { SMSPage } from "@/pages/admin/SMSPage";
import { SalaryPage } from "@/pages/admin/SalaryPage";
import { SettingsPage } from "@/pages/admin/SettingsPage";
import { StaffDirectory } from "@/pages/admin/StaffDirectory";
import { StudentIDCard } from "@/pages/admin/StudentIDCard";
import { StudentProfile } from "@/pages/admin/StudentProfile";
import { StudentsPage } from "@/pages/admin/StudentsPage";
import { TransportAssign } from "@/pages/admin/TransportAssign";
import { TransportPage } from "@/pages/admin/TransportPage";
import { TransportRoutes } from "@/pages/admin/TransportRoutes";
import { TransportTracking } from "@/pages/admin/TransportTracking";
import { LabInchargeDashboard } from "@/pages/lab-incharge/LabInchargeDashboard";
import { LibrarianDashboard } from "@/pages/librarian/LibrarianDashboard";
import { ParentDashboard } from "@/pages/parent/ParentDashboard";
import { AdminLogin } from "@/pages/public/AdminLogin";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPortal } from "@/pages/public/LoginPortal";
import { QuickFeePay } from "@/pages/public/QuickFeePay";
import { StudentLogin } from "@/pages/public/StudentLogin";
import { TeacherLogin } from "@/pages/public/TeacherLogin";
import { LiveClasses } from "@/pages/shared/LiveClasses";
import { MessagesPage } from "@/pages/shared/MessagesPage";
import { PTMPage } from "@/pages/shared/PTMPage";
import { RecordedClasses } from "@/pages/shared/RecordedClasses";
import { StudentAttendance } from "@/pages/student/StudentAttendance";
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { StudentResults } from "@/pages/student/StudentResults";
import { SuperAdminDashboard } from "@/pages/superadmin/SuperAdminDashboard";
import { HomeworkPage } from "@/pages/teacher/HomeworkPage";
import { MarkAttendance } from "@/pages/teacher/MarkAttendance";
import { MarksEntry } from "@/pages/teacher/MarksEntry";
import { StudyMaterials } from "@/pages/teacher/StudyMaterials";
import { TeacherDashboard } from "@/pages/teacher/TeacherDashboard";
import { TimetablePage } from "@/pages/teacher/TimetablePage";
import { TransportManagerDashboard } from "@/pages/transport-manager/TransportManagerDashboard";
import { VendorDashboard } from "@/pages/vendor/VendorDashboard";

// Simple router
interface RouterCtx {
  path: string;
  params: Record<string, string>;
  navigate: (p: string) => void;
}

const RouterContext = createContext<RouterCtx>({
  path: "/",
  params: {},
  navigate: () => {},
});
export const useNavigate = () => useContext(RouterContext).navigate;
export const useParams = () => useContext(RouterContext).params;
export const usePath = () => useContext(RouterContext).path;

function matchRoute(
  pattern: string,
  path: string,
): Record<string, string> | null {
  const pp = pattern.split("/");
  const rp = path.split("/");
  if (pp.length !== rp.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(":")) params[pp[i].slice(1)] = rp[i];
    else if (pp[i] !== rp[i]) return null;
  }
  return params;
}

const BREADCRUMBS: Record<string, { label: string; path?: string }[]> = {
  "/admin/students": [{ label: "Admin" }, { label: "Students" }],
  "/admin/students/add": [
    { label: "Admin" },
    { label: "Students", path: "/admin/students" },
    { label: "Add Student" },
  ],
  "/admin/fees/dashboard": [{ label: "Admin" }, { label: "Fee Management" }],
  "/admin/fees/structure": [
    { label: "Admin" },
    { label: "Fee Management", path: "/admin/fees/dashboard" },
    { label: "Structure" },
  ],
  "/admin/fees/collect": [
    { label: "Admin" },
    { label: "Fee Management", path: "/admin/fees/dashboard" },
    { label: "Collect" },
  ],
  "/admin/fees/transactions": [
    { label: "Admin" },
    { label: "Fee Management", path: "/admin/fees/dashboard" },
    { label: "Transactions" },
  ],
  "/admin/fees/reminders": [
    { label: "Admin" },
    { label: "Fee Management", path: "/admin/fees/dashboard" },
    { label: "Reminders" },
  ],
  "/admin/fees/reports": [
    { label: "Admin" },
    { label: "Fee Management", path: "/admin/fees/dashboard" },
    { label: "Reports" },
  ],
  "/admin/staff": [{ label: "Admin" }, { label: "Staff" }],
  "/admin/staff/add": [
    { label: "Admin" },
    { label: "Staff", path: "/admin/staff" },
    { label: "Add Staff" },
  ],
  "/admin/salary": [
    { label: "Admin" },
    { label: "Staff", path: "/admin/staff" },
    { label: "Salary" },
  ],
  "/admin/leave": [
    { label: "Admin" },
    { label: "Staff", path: "/admin/staff" },
    { label: "Leave" },
  ],
  "/admin/exams": [{ label: "Admin" }, { label: "Exams" }],
  "/admin/exams/reportcard": [
    { label: "Admin" },
    { label: "Exams", path: "/admin/exams" },
    { label: "Report Card" },
  ],
  "/admin/exams/analytics": [
    { label: "Admin" },
    { label: "Exams", path: "/admin/exams" },
    { label: "Analytics" },
  ],
  "/admin/library": [{ label: "Admin" }, { label: "Library" }],
  "/admin/library/issue": [
    { label: "Admin" },
    { label: "Library", path: "/admin/library" },
    { label: "Issue Book" },
  ],
  "/admin/library/returns": [
    { label: "Admin" },
    { label: "Library", path: "/admin/library" },
    { label: "Returns" },
  ],
  "/admin/library/reports": [
    { label: "Admin" },
    { label: "Library", path: "/admin/library" },
    { label: "Reports" },
  ],
  "/admin/transport": [{ label: "Admin" }, { label: "Transport" }],
  "/admin/transport/routes": [
    { label: "Admin" },
    { label: "Transport", path: "/admin/transport" },
    { label: "Routes" },
  ],
  "/admin/transport/assign": [
    { label: "Admin" },
    { label: "Transport", path: "/admin/transport" },
    { label: "Assign Students" },
  ],
  "/admin/transport/tracking": [
    { label: "Admin" },
    { label: "Transport", path: "/admin/transport" },
    { label: "GPS Tracking" },
  ],
  "/accountant/dashboard": [{ label: "Accountant" }, { label: "Dashboard" }],
  "/librarian/dashboard": [{ label: "Librarian" }, { label: "Dashboard" }],
  "/transport-manager/dashboard": [
    { label: "Transport Manager" },
    { label: "Dashboard" },
  ],
  "/lab-incharge/dashboard": [
    { label: "Lab Incharge" },
    { label: "Dashboard" },
  ],
  "/vendor/dashboard": [{ label: "Vendor" }, { label: "Dashboard" }],
  "/teacher/attendance": [{ label: "Teacher" }, { label: "Attendance" }],
  "/teacher/homework": [{ label: "Teacher" }, { label: "Homework" }],
  "/teacher/timetable": [{ label: "Teacher" }, { label: "Timetable" }],
  "/teacher/exams/marks": [{ label: "Teacher" }, { label: "Marks Entry" }],
  "/teacher/materials": [{ label: "Teacher" }, { label: "Study Materials" }],
};

function AppRouter() {
  const { user, isAuthenticated } = useAuth();
  const [path, setPath] = useState(() => window.location.hash.slice(1) || "/");

  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
    setPath(to);
    window.scrollTo(0, 0);
  };

  // Extract params from dynamic routes
  const dynamicRoutes = [
    { pattern: "/admin/students/:id/idcard" },
    { pattern: "/admin/students/:id" },
    { pattern: "/admin/staff/:id" },
  ];

  let routeParams: Record<string, string> = {};
  for (const route of dynamicRoutes) {
    const matched = matchRoute(route.pattern, path);
    if (matched) {
      routeParams = matched;
      break;
    }
  }

  // Public paths
  const PUBLIC_PATHS = [
    "/",
    "/login",
    "/login/admin",
    "/login/teacher",
    "/login/student",
    "/pay-fee",
  ];
  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || path.startsWith("/pay-fee"),
  );

  // Redirect to login if not authenticated and not on public page
  if (!isAuthenticated && !isPublic) {
    navigate("/login");
    return null;
  }

  // Redirect authenticated users away from login
  if (isAuthenticated && (path === "/login" || path.startsWith("/login/"))) {
    const roleHome: Record<string, string> = {
      superadmin: "/superadmin/dashboard",
      admin: "/admin/dashboard",
      teacher: "/teacher/dashboard",
      student: "/student/dashboard",
      parent: "/parent/dashboard",
      accountant: "/accountant/dashboard",
      librarian: "/librarian/dashboard",
      "transport-manager": "/transport-manager/dashboard",
      "lab-incharge": "/lab-incharge/dashboard",
      vendor: "/vendor/dashboard",
    };
    navigate(roleHome[user?.role || "admin"] || "/admin/dashboard");
    return null;
  }

  const breadcrumb = BREADCRUMBS[path];

  const renderPage = () => {
    // Public pages
    if (path === "/") return <LandingPage navigate={navigate} />;
    if (path === "/login") return <LoginPortal navigate={navigate} />;
    if (path === "/login/admin") return <AdminLogin navigate={navigate} />;
    if (path === "/login/teacher") return <TeacherLogin navigate={navigate} />;
    if (path === "/login/student") return <StudentLogin navigate={navigate} />;
    if (path.startsWith("/pay-fee")) return <QuickFeePay navigate={navigate} />;

    // Protected pages wrapped in Layout
    const withLayout = (content: React.ReactNode) => (
      <Layout currentPath={path} navigate={navigate} breadcrumb={breadcrumb}>
        {content}
      </Layout>
    );

    if (path === "/superadmin/dashboard")
      return withLayout(<SuperAdminDashboard />);
    if (path === "/admin/dashboard")
      return withLayout(<AdminDashboard navigate={navigate} />);
    if (path === "/admin/students")
      return withLayout(<StudentsPage navigate={navigate} />);
    if (path === "/admin/students/add")
      return withLayout(<AddStudentPage navigate={navigate} />);
    if (matchRoute("/admin/students/:id/idcard", path))
      return withLayout(
        <StudentIDCard navigate={navigate} studentId={routeParams.id} />,
      );
    if (matchRoute("/admin/students/:id", path))
      return withLayout(
        <StudentProfile navigate={navigate} studentId={routeParams.id} />,
      );
    if (path === "/admin/fees/dashboard")
      return withLayout(<FeeDashboard navigate={navigate} />);
    if (path === "/admin/fees/structure") return withLayout(<FeeStructure />);
    if (path === "/admin/fees/collect") return withLayout(<FeeCollect />);
    if (path === "/admin/fees/transactions")
      return withLayout(<FeeTransactions />);
    if (path === "/admin/fees/reminders") return withLayout(<FeeReminders />);
    if (path === "/admin/fees/reports") return withLayout(<FeeReports />);
    if (path === "/admin/attendance/reports")
      return withLayout(<AttendanceReports />);
    if (path === "/admin/staff")
      return withLayout(<StaffDirectory navigate={navigate} />);
    if (path === "/admin/staff/add")
      return withLayout(<AddStaffPage navigate={navigate} />);
    if (path === "/admin/salary") return withLayout(<SalaryPage />);
    if (path === "/admin/leave") return withLayout(<LeavePage />);
    if (path === "/admin/exams")
      return withLayout(<ExamsPage navigate={navigate} />);
    if (path === "/admin/exams/reportcard")
      return withLayout(<ReportCardPage />);
    if (path === "/admin/exams/analytics") return withLayout(<ExamAnalytics />);
    if (path === "/admin/library") return withLayout(<LibraryPage />);
    if (path === "/admin/library/issue") return withLayout(<LibraryIssue />);
    if (path === "/admin/library/returns")
      return withLayout(<LibraryReturns />);
    if (path === "/admin/library/reports")
      return withLayout(<LibraryReports />);
    if (path === "/admin/transport") return withLayout(<TransportPage />);
    if (path === "/admin/transport/routes")
      return withLayout(<TransportRoutes />);
    if (path === "/admin/transport/assign")
      return withLayout(<TransportAssign />);
    if (path === "/admin/transport/tracking")
      return withLayout(<TransportTracking />);
    if (path === "/notices") return withLayout(<NoticesPage />);
    if (path === "/admin/sms") return withLayout(<SMSPage />);
    if (path === "/settings") return withLayout(<SettingsPage />);
    if (path === "/teacher/dashboard")
      return withLayout(<TeacherDashboard navigate={navigate} />);
    if (path === "/teacher/attendance") return withLayout(<MarkAttendance />);
    if (path === "/teacher/homework") return withLayout(<HomeworkPage />);
    if (path === "/teacher/timetable") return withLayout(<TimetablePage />);
    if (path === "/teacher/exams/marks") return withLayout(<MarksEntry />);
    if (path === "/teacher/materials") return withLayout(<StudyMaterials />);
    if (path === "/student/dashboard")
      return withLayout(<StudentDashboard navigate={navigate} />);
    if (path === "/student/results") return withLayout(<StudentResults />);
    if (path === "/student/attendance")
      return withLayout(<StudentAttendance />);
    if (path === "/student/homework") return withLayout(<HomeworkPage />);
    if (path === "/parent/dashboard")
      return withLayout(<ParentDashboard navigate={navigate} />);
    if (path === "/parent/fees")
      return withLayout(<QuickFeePay navigate={navigate} />);
    if (path === "/parent/ptm" || path === "/ptm")
      return withLayout(<PTMPage />);
    if (path === "/messages" || path === "/parent/messages")
      return withLayout(<MessagesPage />);
    if (path === "/classes/live")
      return withLayout(<LiveClasses navigate={navigate} />);
    if (path === "/classes/recorded") return withLayout(<RecordedClasses />);
    // New role dashboards
    if (path === "/accountant/dashboard")
      return withLayout(<AccountantDashboard navigate={navigate} />);
    if (path === "/librarian/dashboard")
      return withLayout(<LibrarianDashboard navigate={navigate} />);
    if (path === "/transport-manager/dashboard")
      return withLayout(<TransportManagerDashboard navigate={navigate} />);
    if (path === "/lab-incharge/dashboard")
      return withLayout(<LabInchargeDashboard />);
    if (path === "/vendor/dashboard") return withLayout(<VendorDashboard />);

    // 404
    return withLayout(
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl font-heading font-black text-primary">404</p>
        <p className="text-xl font-heading font-semibold text-foreground mt-4">
          Page Not Found
        </p>
        <p className="text-muted-foreground mt-2">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90"
        >
          Go Home
        </button>
      </div>,
    );
  };

  return (
    <RouterContext.Provider value={{ path, params: routeParams, navigate }}>
      {renderPage()}
    </RouterContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppRouter />
          <Toaster position="top-right" richColors />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
