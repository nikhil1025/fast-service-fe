"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // NEW: sidebar collapsed state
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        setIsCheckingAuth(false);
        return;
      }
      if (loading) return;
      if (!user || user.role !== "admin") {
        router.push("/admin/login");
        return;
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [user, loading, router, pathname]);

  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
