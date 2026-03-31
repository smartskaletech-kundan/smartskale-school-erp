import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

export function AdminLogin({ navigate }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    const ok =
      (await login({ email, password, role: "admin" })) ||
      (await login({ email, password, role: "superadmin" }));
    setLoading(false);
    if (ok) {
      const user = JSON.parse(localStorage.getItem("erp_user") || "{}");
      navigate(
        user.role === "superadmin"
          ? "/superadmin/dashboard"
          : "/admin/dashboard",
      );
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid credentials. Try admin@school.com / admin123");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.35 0.14 264) 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl p-8 shadow-2xl">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portal
          </button>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl font-bold">
                S
              </span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Admin Portal
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Saraswati Public School ERP
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                data-ocid="admin_login.email.input"
                id="email"
                type="email"
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  data-ocid="admin_login.password.input"
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 text-xs">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                Demo Credentials:
              </p>
              <p className="text-blue-600 dark:text-blue-400">
                Admin: admin@school.com / admin123
              </p>
              <p className="text-blue-600 dark:text-blue-400">
                Super Admin: super@school.com / super123
              </p>
            </div>

            <Button
              data-ocid="admin_login.submit.button"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In to Admin Portal"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
