import type React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (path: string) => void;
  breadcrumb?: { label: string; path?: string }[];
}

export function Layout({
  children,
  currentPath,
  navigate,
  breadcrumb,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentPath={currentPath}
        navigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        navigate={navigate}
        breadcrumb={breadcrumb}
      />
      <main className="lg:ml-64 mt-16 min-h-[calc(100vh-64px)] p-6">
        {children}
      </main>
    </div>
  );
}
