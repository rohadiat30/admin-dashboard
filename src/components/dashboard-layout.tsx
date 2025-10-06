"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7EBE7] via-white to-[#EFD7CF]">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={isMobile}
      />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <header
          className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
          style={{ marginLeft: isMobile ? 0 : sidebarCollapsed ? 80 : 256 }}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md bg-transparent text-[#1C4E4F]">
                <BellIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#436F6F] text-[#EFD7CF] flex items-center justify-center">
                  A
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <UserCircleIcon className="h-8 w-8 text-gray-600" />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;