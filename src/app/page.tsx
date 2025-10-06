"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Shared Layout Component
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setSidebarCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { label: "Dashboard", href: "/", icon: "📊" },
    { label: "Users", href: "/users", icon: "👥" },
    { label: "Transactions", href: "/transactions", icon: "💳" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-lg ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-between p-6 border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg"
              >
                A
              </motion.div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    Admin Panel
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {!isMobile && (
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">☰</button>
            )}
          </motion.div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.li 
                    key={item.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={item.href} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}>
                      <motion.span 
                        className="text-lg"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.span>
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          
          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100 space-y-3">
            <button
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title="Logout"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
            </button>
            
            <div className="text-xs text-gray-500 text-center">
              {!sidebarCollapsed ? 'Admin Dashboard v1.0' : 'v1.0'}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
                🔔
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

// Stats Cards Component
function StatsCards() {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: '👥' },
    { label: 'Total Revenue', value: '$125,750', change: '+8%', icon: '💰' },
    { label: 'Pending Transactions', value: '23', change: '-5%', icon: '⏳' },
    { label: 'Active Users', value: '892', change: '+15%', icon: '🟢' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-sm font-medium text-gray-600"
              >
                {stat.label}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="text-2xl font-bold text-gray-900 mt-1"
              >
                {stat.value}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-sm text-green-600 mt-1"
              >
                {stat.change} from last month
              </motion.p>
            </div>
            <motion.div 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              {stat.icon}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Revenue Chart Component (Simple Bar Chart)
function RevenueChart() {
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 18750 },
    { month: 'Mar', revenue: 15200 },
    { month: 'Apr', revenue: 22100 },
    { month: 'May', revenue: 19800 },
    { month: 'Jun', revenue: 25300 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
      <div className="space-y-4">
        {revenueData.map((item) => (
          <div key={item.month} className="flex items-center gap-4">
            <div className="w-12 text-sm text-gray-600">{item.month}</div>
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(item.revenue / 25300) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">${item.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recent Transactions Component
function RecentTransactions() {
  const mockTransactions = [
    { id: 'txn_001', amount: 1250.50, type: 'Credit', status: 'Completed', description: 'Payment received', date: '2024-03-15' },
    { id: 'txn_002', amount: 750.00, type: 'Debit', status: 'Pending', description: 'Subscription renewal', date: '2024-03-14' },
    { id: 'txn_003', amount: 2100.25, type: 'Credit', status: 'Completed', description: 'Refund processed', date: '2024-03-13' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
              <p className="text-xs text-gray-600">{transaction.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'Credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <p className={`text-xs ${
                transaction.status === 'Completed' ? 'text-green-600' : 
                transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Page
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
