import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Activity, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Stethoscope,
  MessageSquare,
  ClipboardList,
  Heart,
  Phone,
  CalendarCheck,
  Share2,
  ShieldAlert,
  Inbox
} from 'lucide-react';
import { clsx } from 'clsx';
import { useRole } from '../context/RoleContext';
import { Role } from '../types';

const SidebarItem = ({ icon: Icon, label, to, active }: any) => (
  <Link
    to={to}
    className={clsx(
      'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // If we are on the landing page, render children without the app shell
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  // Define navigation items per role
  const getNavItems = (currentRole: Role) => {
    const common = [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    ];

    if (currentRole === 'PATIENT') {
      return [
        { icon: LayoutDashboard, label: 'Home', to: '/dashboard' },
        { icon: Heart, label: 'My Care Plan', to: '/my-plan' },
        { icon: MessageSquare, label: 'Messages', to: '/messages' },
        { icon: ClipboardList, label: 'Surveys', to: '/surveys' },
      ];
    }

    const providerCommon = [
      ...common,
      { icon: Inbox, label: 'Inbox', to: '/inbox' },
      { icon: Users, label: 'Patient List', to: '/patients' },
    ];

    if (currentRole === 'CARE_MANAGER') {
      return [
        ...providerCommon,
        { icon: Activity, label: 'Care Plans', to: '/care-plans' }, 
      ];
    }

    if (currentRole === 'COORDINATOR') {
      return [
        ...providerCommon,
        { icon: Phone, label: 'Outreach Queue', to: '/outreach' }, 
        { icon: CalendarCheck, label: 'Scheduling', to: '/scheduling' },
        { icon: Share2, label: 'Referrals', to: '/referrals' },
      ];
    }

    if (currentRole === 'PCP') {
      return [
        ...providerCommon,
        { icon: FileText, label: 'Signatures', to: '/signatures' }, 
      ];
    }

    if (currentRole === 'ADMIN') {
      return [
        ...providerCommon,
        { icon: FileText, label: 'Billing & Reports', to: '/billing' },
        { icon: Settings, label: 'Admin Rules', to: '/admin' },
        { icon: ShieldAlert, label: 'Audit Logs', to: '/audit-logs' },
        { icon: Users, label: 'User Management', to: '/settings' },
      ];
    }

    return common;
  };

  const navItems = getNavItems(role);

  const getUserInfo = (currentRole: Role) => {
    switch (currentRole) {
      case 'ADMIN': return { initials: 'AD', name: 'Admin User', title: 'Administrator', color: 'bg-purple-100 text-purple-700' };
      case 'PCP': return { initials: 'DR', name: 'Dr. Chen', title: 'Primary Care Provider', color: 'bg-emerald-100 text-emerald-700' };
      case 'PATIENT': return { initials: 'JD', name: 'John Doe', title: 'Patient', color: 'bg-indigo-100 text-indigo-700' };
      case 'COORDINATOR': return { initials: 'AL', name: 'Alex Lee', title: 'Care Coordinator', color: 'bg-amber-100 text-amber-700' };
      default: return { initials: 'SJ', name: 'Sarah Jenkins', title: 'Care Manager', color: 'bg-blue-100 text-blue-700' };
    }
  };

  const userInfo = getUserInfo(role);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-2 text-blue-600">
            <Stethoscope size={24} strokeWidth={2.5} />
            <span className="text-lg font-bold tracking-tight text-slate-900">MediCare<span className="text-blue-600">Sync</span></span>
          </Link>
        </div>

        <div className="p-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              active={location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to))} 
            />
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
              userInfo.color
            )}>
              {userInfo.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {userInfo.name}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">{userInfo.title}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 relative">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            {role !== 'PATIENT' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search patients, MRN, or providers..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <span className="text-xs font-medium text-slate-500 px-2">Role:</span>
              <select 
                className="text-xs border-0 bg-transparent text-slate-700 font-semibold focus:ring-0 cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="CARE_MANAGER">Care Manager</option>
                <option value="COORDINATOR">Coordinator</option>
                <option value="PCP">PCP</option>
                <option value="ADMIN">Admin</option>
                <option value="PATIENT">Patient</option>
              </select>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { title: "New Lab Result", desc: "CBC Panel for Jane Doe", time: "10m ago", unread: true },
                      { title: "Care Plan Signed", desc: "Dr. Chen signed John Smith's plan", time: "1h ago", unread: true },
                      { title: "Message Received", desc: "From Mary Williams", time: "2h ago", unread: false },
                    ].map((notif, i) => (
                      <div key={i} className={clsx("p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer", notif.unread ? "bg-blue-50/30" : "")}>
                        <div className="flex justify-between items-start">
                          <h4 className={clsx("text-sm", notif.unread ? "font-bold text-slate-900" : "font-medium text-slate-700")}>{notif.title}</h4>
                          <span className="text-xs text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{notif.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-slate-100">
                    <Link to="/inbox" className="text-xs font-medium text-blue-600 hover:underline">View all activity</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/" className="text-xs font-medium text-slate-400 hover:text-slate-600">
              Logout
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
