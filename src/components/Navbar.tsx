import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Bell,
  UserCheck,
  ShieldCheck,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { UserRole } from '../types';
import { Emblem } from './Emblem';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenNotifications,
}) => {
  const { currentUser, switchRole, unreadNotifsCount } = useCommunity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'ruler', label: 'TRADITIONAL RULER' },
    { id: 'palace', label: 'PALACE' },
    { id: 'announcements', label: 'ANNOUNCEMENTS' },
    { id: 'events', label: 'EVENTS' },
    { id: 'news', label: 'NEWS' },
    { id: 'development', label: 'DEVELOPMENT' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'documents', label: 'DOCUMENTS' },
    { id: 'members', label: 'MEMBERS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full palace & system authority' },
    { role: 'PALACE_ADMIN', label: 'Palace Admin', desc: 'Manage announcements, events & news' },
    { role: 'EDITOR', label: 'Content Editor', desc: 'Draft submissions requiring approval' },
    { role: 'COMMUNITY_MEMBER', label: 'Community Member', desc: 'Resident profile & submissions' },
    { role: 'VISITOR', label: 'Public Visitor', desc: 'Read-only public view' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      {/* Top Banner with Royal Navy, Coffee & Gold Traditional Accent */}
      <div className="bg-gradient-to-r from-[#1C0E07] via-slate-900 to-[#1C0E07] text-[#F3EBE3] text-xs py-1.5 px-4 sm:px-6 border-b border-[#8C5935]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Official Digital Portal • Traditional Council of Unguwar Kanawa, Kaduna
            </span>
          </div>

          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 hover:bg-black text-amber-300 border border-amber-400/40 text-[11px] font-semibold transition"
              title="Click to switch simulated demo roles"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Role: {currentUser.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3 text-amber-300" />
            </button>

            {/* Role Dropdown */}
            {roleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setRoleDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 text-stone-800 animate-fadeIn">
                  <div className="px-2 py-1.5 border-b border-stone-100 mb-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Switch Role Mode (Demo)
                    </p>
                    <p className="text-xs font-semibold text-stone-800">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex flex-col transition ${
                          currentUser.role === r.role
                            ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200'
                            : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{r.label}</span>
                          {currentUser.role === r.role && (
                            <UserCheck className="w-3.5 h-3.5 text-blue-700" />
                          )}
                        </span>
                        <span className="text-[10px] font-normal text-stone-500">
                          {r.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Logo / Emblem */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition hover:opacity-95"
        >
          <Emblem size="md" />
        </div>

        {/* Action Controls & Navigation CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200 transition"
            title="Global Search"
          >
            <Search className="w-4 h-4 text-blue-900" />
            <span className="hidden md:inline">Search records...</span>
            <kbd className="hidden lg:inline text-[10px] bg-white px-1.5 py-0.5 rounded border text-stone-500">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition"
            title="Community Notifications"
          >
            <Bell className="w-4 h-4 text-blue-900" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard / Login Button */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition ${
              currentTab === 'dashboard'
                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                : 'bg-blue-900 hover:bg-blue-950 text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentUser.role === 'VISITOR' ? 'LOGIN' : 'DASHBOARD'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 border border-stone-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden xl:block bg-stone-50/90 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-between text-xs font-bold tracking-wide text-stone-700 py-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-2.5 rounded-md transition-colors relative ${
                    currentTab === item.id
                      ? 'text-blue-950 font-extrabold bg-blue-100/70'
                      : 'hover:text-blue-900 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                  {currentTab === item.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-800 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 shadow-xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase px-3 py-1">
              Menu Navigation
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                  currentTab === item.id
                    ? 'bg-blue-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-stone-200 mt-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold bg-amber-600 text-white flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>
                  {currentUser.role === 'VISITOR' ? 'PALACE LOGIN' : 'ADMINISTRATION DASHBOARD'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
