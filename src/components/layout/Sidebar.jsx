import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus,
  FileSearch,
  Users,
  FileText,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'New Application', icon: FilePlus, to: '/new-application' },
  { label: 'Underwriting Workspace', icon: FileSearch, to: '/underwriting' },
  { label: 'Applicant Directory', icon: Users, to: '/applicant-directory' },
  { label: 'CAM Reports', icon: FileText, to: '/cam-reports' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-60 flex flex-col z-30" style={{ backgroundColor: '#0B1320' }}>
      {/* Logo */}
      <div className="flex items-center h-20 px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-white font-semibold text-[22px] tracking-tight" style={{ fontFamily: 'Inter' }}>
            EmbedX
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px shrink-0" style={{ backgroundColor: '#1F2937' }} />

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ label, icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            {React.createElement(icon, { size: 18, strokeWidth: 1.8 })}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 shrink-0">
        <div className="rounded-lg p-3" style={{ backgroundColor: '#1F2937' }}>
          <p className="text-xs text-slate-400">EmbedX Platform</p>
          <p className="text-xs text-slate-500 mt-0.5">v2.4.1 · Enterprise</p>
        </div>
      </div>
    </aside>
  );
}
