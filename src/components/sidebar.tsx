"use client"

import React from "react"
import Link from "next/link"

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  isMobile?: boolean
}

const MenuIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DashboardIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor" />
  </svg>
)

const UsersIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM6 11c1.66 0 3-1.34 3-3S7.66 5 6 5 3 6.34 3 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C13 14.17 8.33 13 6 13zm10 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-6-3.5z" fill="currentColor" />
  </svg>
)

const TransactionsIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ReportsIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SettingsIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.5A3.5 3.5 0 1012 8.5a3.5 3.5 0 000 7zM19.4 15a1 1 0 00.8.6l1.2.2a1 1 0 01.6 1.6l-.9 1.1a1 1 0 00-.2.9 10 10 0 01-1.8 1.8 1 1 0 00-.2.9l.2 1.2a1 1 0 01-.6.8l-1.1.5a1 1 0 01-1-.2l-1-.8a1 1 0 00-.9-.2 10 10 0 01-2.6 0 1 1 0 00-.9.2l-1 .8a1 1 0 01-1 .2l-1.1-.5a1 1 0 01-.6-.8l-.2-1.2a1 1 0 00-.2-.9 10 10 0 01-1.8-1.8 1 1 0 00-.2-.9l-.9-1.1a1 1 0 01.6-1.6l1.2-.2a1 1 0 00.8-.6 10 10 0 010-3l-.8-1.2a1 1 0 00-.8-.6L3 6.7A1 1 0 012.6 5l.5-1.1A1 1 0 014.1 3l1-.5a1 1 0 011 .2l1 .8a1 1 0 00.9.2 10 10 0 012.6 0 1 1 0 00.9-.2l1-.8a1 1 0 011-.2l1 .5a1 1 0 01.6.6L19 4.8a1 1 0 01.5 1.9l-1.1.5a1 1 0 00-.6.6 10 10 0 010 3z" fill="currentColor" />
  </svg>
)

const menu = [
  { label: "Dashboard", href: "/", Icon: DashboardIcon },
  { label: "Users", href: "/users", Icon: UsersIcon },
  { label: "Transactions", href: "/transactions", Icon: TransactionsIcon },
  { label: "Reports", href: "/reports", Icon: ReportsIcon },
  { label: "Settings", href: "/settings", Icon: SettingsIcon },
]

export function Sidebar({ isCollapsed = false, onToggle, isMobile = false }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 z-40 h-full w-64 transition-all duration-300 ease-in-out`}>
      <div className="h-full flex flex-col">
        {/* Sidebar container with dark-teal gradient (Option A) */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-[#0A2D2E] to-[#1C4E4F] text-[#EFD7CF] border-r border-[#436F6F]/20 shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-[#436F6F]/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#436F6F] flex items-center justify-center text-[#EFD7CF] font-semibold">AP</div>
              <div className="text-lg font-semibold">Admin Panel</div>
            </div>
            <button onClick={onToggle} aria-label="Toggle sidebar" className="p-2 rounded-md hover:bg-[#436F6F]/20">
              <MenuIcon className="h-5 w-5 text-[#EFD7CF]" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menu.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="flex items-center gap-3 p-3 rounded-lg text-[#A49E97] hover:bg-[#436F6F] hover:text-[#EFD7CF] transition-colors duration-150">
                    <m.Icon className="h-5 w-5 text-current" />
                    <span className="font-medium">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
