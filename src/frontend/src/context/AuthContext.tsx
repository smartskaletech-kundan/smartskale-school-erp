import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type UserRole =
  | "superadmin"
  | "admin"
  | "teacher"
  | "student"
  | "parent"
  | "accountant"
  | "librarian"
  | "transport"
  | "transport-manager"
  | "lab-incharge"
  | "vendor";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string;
  admissionNo?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: {
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  "super@school.com": {
    id: "sa1",
    name: "Dr. Rajesh Kumar Sharma",
    email: "super@school.com",
    role: "superadmin",
    password: "super123",
  },
  "admin@school.com": {
    id: "a1",
    name: "Mrs. Sunita Devi",
    email: "admin@school.com",
    role: "admin",
    password: "admin123",
  },
  T001: {
    id: "t1",
    name: "Mr. Anil Kumar",
    email: "T001",
    role: "teacher",
    password: "teacher123",
  },
  "2024-1045": {
    id: "s1",
    name: "Rahul Kumar",
    email: "2024-1045",
    role: "student",
    password: "student123",
    class: "10-A",
    admissionNo: "2024-1045",
  },
  parent001: {
    id: "p1",
    name: "Suresh Kumar",
    email: "parent001",
    role: "parent",
    password: "parent123",
  },
  "accountant@school.com": {
    id: "acc1",
    name: "Mr. Vijay Prasad",
    email: "accountant@school.com",
    role: "accountant",
    password: "demo123",
  },
  "librarian@school.com": {
    id: "lib1",
    name: "Ms. Geeta Sharma",
    email: "librarian@school.com",
    role: "librarian",
    password: "demo123",
  },
  "transport@school.com": {
    id: "tr1",
    name: "Mr. Rakesh Singh",
    email: "transport@school.com",
    role: "transport-manager",
    password: "demo123",
  },
  "lab@school.com": {
    id: "lab1",
    name: "Mr. Sunil Verma",
    email: "lab@school.com",
    role: "lab-incharge",
    password: "demo123",
  },
  "vendor@school.com": {
    id: "ven1",
    name: "Mr. Pramod Kumar",
    email: "vendor@school.com",
    role: "vendor",
    password: "demo123",
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("erp_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("erp_user");
      }
    }
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
    role: UserRole;
  }): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    const found = DEMO_USERS[credentials.email];
    if (
      found &&
      found.password === credentials.password &&
      found.role === credentials.role
    ) {
      const { password: _, ...userObj } = found;
      setUser(userObj);
      localStorage.setItem("erp_user", JSON.stringify(userObj));
      return true;
    }
    // Also allow matching just by email+password regardless of role for new roles
    if (found && found.password === credentials.password) {
      const { password: _, ...userObj } = found;
      setUser(userObj);
      localStorage.setItem("erp_user", JSON.stringify(userObj));
      return true;
    }
    // Student login - accept any student admission number
    if (credentials.role === "student" || credentials.role === "parent") {
      const studentUser: AuthUser = {
        id: "s_demo",
        name: "Rahul Kumar",
        email: credentials.email,
        role: credentials.role,
        class: "10-A",
        admissionNo: credentials.email,
      };
      setUser(studentUser);
      localStorage.setItem("erp_user", JSON.stringify(studentUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("erp_user");
    window.location.hash = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
