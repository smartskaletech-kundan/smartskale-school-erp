import { TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: number;
  trendLabel?: string;
  badge?: string;
  badgeColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  trend,
  trendLabel,
  badge,
  badgeColor,
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        {badge && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor || "bg-primary/10 text-primary"}`}
          >
            {badge}
          </span>
        )}
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trend >= 0
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground leading-tight">
          {value}
        </p>
        <p className="text-sm font-semibold text-foreground/80 mt-0.5">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
        {trendLabel && (
          <p className="text-xs text-muted-foreground mt-1">{trendLabel}</p>
        )}
      </div>
    </div>
  );
}
