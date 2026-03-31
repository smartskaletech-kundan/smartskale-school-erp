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

export function TeacherLogin({ navigate }: Props) {
  const { login } = useAuth();
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login({ email: empId, password, role: "teacher" });
    setLoading(false);
    if (ok) {
      navigate("/teacher/dashboard");
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid credentials. Try T001 / teacher123");
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
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6"
          >
            <ArrowLeft size={16} /> Back to Portal
          </button>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">T</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Teacher Portal
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Saraswati Public School ERP
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Employee ID</Label>
              <Input
                data-ocid="teacher_login.empid.input"
                placeholder="e.g. T001"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  data-ocid="teacher_login.password.input"
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
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4 py-3 text-xs">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                Demo Credentials:
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                Employee ID: T001 / Password: teacher123
              </p>
            </div>
            <Button
              data-ocid="teacher_login.submit.button"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In to Teacher Portal"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
