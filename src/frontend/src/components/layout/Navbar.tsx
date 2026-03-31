import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import React, { useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
  navigate: (path: string) => void;
  breadcrumb?: { label: string; path?: string }[];
}

export function Navbar({ onMenuClick, navigate, breadcrumb }: NavbarProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const notifIcons: Record<string, string> = {
    fee: "💰",
    homework: "📚",
    exam: "📝",
    ptm: "📅",
    message: "💬",
    alert: "🔴",
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-card border-b border-border z-30 flex items-center px-4 gap-4">
      <button
        type="button"
        data-ocid="nav.menu.button"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-muted"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm font-medium text-foreground hidden sm:block">
          {greeting()},{" "}
          <span className="text-primary font-semibold">
            {user?.name?.split(" ")[0]}
          </span>{" "}
          👋
        </p>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <span>/</span>}
                {b.path ? (
                  <button
                    type="button"
                    onClick={() => navigate(b.path!)}
                    className="hover:text-primary transition-colors"
                  >
                    {b.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 w-64">
        <Search size={16} className="text-muted-foreground" />
        <input
          data-ocid="nav.search_input"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search students, fees..."
          className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Theme Toggle */}
      <button
        type="button"
        data-ocid="nav.theme.toggle"
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          type="button"
          data-ocid="nav.notifications.button"
          onClick={() => {
            setNotifOpen(!notifOpen);
            if (!notifOpen) markAllRead();
          }}
          className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
        {notifOpen && (
          <div
            data-ocid="nav.notifications.popover"
            className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-card-hover z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-semibold text-sm text-foreground">
                Notifications
              </h3>
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-primary hover:underline"
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                    !n.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{notifIcons[n.type]}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {n.message}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {n.time}
                      </p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
          {user?.name?.charAt(0) || "A"}
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-foreground leading-none">
            {user?.name?.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {user?.role}
          </p>
        </div>
        <ChevronDown
          size={14}
          className="text-muted-foreground hidden sm:block"
        />
      </div>
    </header>
  );
}
