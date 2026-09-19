import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Bell,
  UserCheck,
  ShieldCheck,
  Shield,
  Heart,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Home,
  Info,
  Crown,
  Landmark,
  Megaphone,
  Calendar,
  Newspaper,
  Hammer,
  Image as ImageIcon,
  FileText,
  Users,
  PhoneCall,
  Check,
  Layers,
  Sparkles,
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
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  // Dropdown accordions state for phone view
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    palace: true,
    security: true,
    community: true,
    resources: true,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const navCategories = [
    {
      key: 'palace',
      label: 'Royal Palace & Traditional Rulers',
      icon: Crown,
      description: 'Stool of Hakimin Unguwar Kanawa, Ward Heads & Royal Institution',
      items: [
        { id: 'home', label: 'Home Portal', icon: Home, badge: 'Main' },
        {
          id: 'traditional-rulers',
          label: 'Traditional Rulers',
          icon: Crown,
          badge: 'Council & Ward Heads',
        },
        {
          id: 'ruler',
          label: 'The Traditional Ruler',
          icon: Sparkles,
          badge: 'Hakimi Falakin Zazzau',
        },
        {
          id: 'palace',
          label: 'Palace Administration',
          icon: Landmark,
          badge: 'Traditional Council',
        },
        { id: 'about', label: 'About Unguwar Kanawa', icon: Info, badge: 'History & Wards' },
      ],
    },
    {
      key: 'security',
      label: 'Security & Law Enforcement',
      icon: ShieldCheck,
      description: 'Police, Vigilante (Yan Sintiri), Neighborhood Patrols & Incident Hotlines',
      items: [
        {
          id: 'forcemen',
          label: 'Our Force Men',
          icon: Shield,
          badge: 'Security Command',
        },
      ],
    },
    {
      key: 'community',
      label: 'Community Affairs & Grassroots',
      icon: Megaphone,
      description: 'Community Members, Notices, Townhalls & Ongoing Infrastructure',
      items: [
        {
          id: 'ordinary-members',
          label: 'Community Members',
          icon: Heart,
          badge: 'Residents & Artisans',
        },
        {
          id: 'announcements',
          label: 'Announcements',
          icon: Megaphone,
          badge: 'Verified Notices',
        },
        { id: 'events', label: 'Community Events', icon: Calendar, badge: 'Programs' },
        { id: 'news', label: 'News & Media', icon: Newspaper, badge: 'Updates' },
        { id: 'development', label: 'Development Projects', icon: Hammer, badge: 'Public Works' },
      ],
    },
    {
      key: 'resources',
      label: 'Public Records & Directory',
      icon: Layers,
      description: 'Palace Archives, Bye-laws, Resident Roster & Inquiries',
      items: [
        { id: 'gallery', label: 'Palace Gallery', icon: ImageIcon, badge: 'Photo Archives' },
        { id: 'documents', label: 'Official Documents', icon: FileText, badge: 'Bye-Laws & Forms' },
        { id: 'members', label: 'Members Directory', icon: Users, badge: 'Verified Residents' },
        { id: 'contact', label: 'Contact & Grievance', icon: PhoneCall, badge: 'Palace Liaison' },
      ],
    },
  ];

  // Flat list for desktop navbar
  const flatNavItems = navCategories.flatMap((cat) => cat.items);

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

  const activeItem = flatNavItems.find((item) => item.id === currentTab) || {
    id: 'home',
    label: 'HOME',
    icon: Home,
    badge: 'Main',
  };
  const ActiveIcon = activeItem.icon;

  // Filtered categories for mobile search
  const filteredCategories = navCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          item.badge?.toLowerCase().includes(mobileSearchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

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
                <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
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
                        <span className="text-[10px] font-normal text-stone-500">{r.desc}</span>
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

          {/* Mobile Menu Toggle Button (Phone View) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-xs ${
              mobileMenuOpen
                ? 'bg-blue-950 text-white border-blue-900 ring-2 ring-amber-400/70'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-amber-400" />
            ) : (
              <Menu className="w-4 h-4 text-blue-900" />
            )}
            <span className="text-xs font-bold hidden xs:inline">Menu</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-180 text-amber-400' : 'text-stone-500'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dedicated Quick-Jump Toggle Dropdown Bar (Phone View) */}
      <div className="xl:hidden bg-gradient-to-r from-stone-100 via-amber-50/50 to-stone-100 border-t border-b border-stone-200 px-3 sm:px-4 py-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-stone-300/80 shadow-xs hover:border-amber-500 transition group"
          aria-expanded={mobileMenuOpen}
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-7 h-7 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <ActiveIcon className="w-4 h-4" />
            </span>
            <div className="text-left truncate">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block leading-none mb-0.5">
                Current Section
              </span>
              <span className="text-xs font-extrabold text-stone-900 truncate block leading-tight">
                {activeItem.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 group-hover:text-amber-700 pl-2 shrink-0">
            <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
              {mobileMenuOpen ? 'Close Menu' : 'Toggle Dropdown ▾'}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-180 text-amber-600' : 'text-stone-500'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden xl:block bg-stone-50/90 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-between text-xs font-bold tracking-wide text-stone-700 py-1">
            {flatNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-2 rounded-md transition-colors relative flex items-center gap-1 ${
                    currentTab === item.id
                      ? 'text-blue-950 font-extrabold bg-blue-100/70'
                      : 'hover:text-blue-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentTab === item.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-800 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Toggle Dropdown Menu (Phone View) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-amber-500 shadow-2xl animate-fadeIn max-h-[82vh] overflow-y-auto">
          {/* Dropdown Header & Quick Filter Input */}
          <div className="p-4 bg-stone-50 border-b border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>Unguwar Kanawa Community Navigation</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                {flatNavItems.length} Sections
              </span>
            </div>

            {/* Quick Filter Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Filter pages (e.g. Ruler, News, Projects)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 text-stone-800 placeholder-stone-400"
              />
              {mobileSearchQuery && (
                <button
                  onClick={() => setMobileSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categorized Dropdown Accordion Sections */}
          <div className="p-3 sm:p-4 space-y-3">
            {filteredCategories.map((cat) => {
              const isExpanded = expandedSections[cat.key] ?? true;
              const CatIcon = cat.icon;
              const hasActiveItem = cat.items.some((item) => item.id === currentTab);

              return (
                <div
                  key={cat.key}
                  className="rounded-2xl border border-stone-200/90 overflow-hidden bg-white shadow-xs transition"
                >
                  {/* Category Dropdown Toggle Header */}
                  <button
                    onClick={() => toggleSection(cat.key)}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition ${
                      hasActiveItem
                        ? 'bg-blue-50/70 border-b border-blue-100 text-blue-950 font-bold'
                        : 'bg-stone-50/80 hover:bg-stone-100 text-stone-800 font-semibold border-b border-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-blue-900 text-amber-300 shadow-2xs">
                        <CatIcon className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold block leading-tight">{cat.label}</span>
                        <span className="text-[10px] text-stone-500 font-normal block leading-tight">
                          {cat.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                        {cat.items.length}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-blue-900' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Sub-items Grid / List */}
                  {isExpanded && (
                    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 animate-fadeIn">
                      {cat.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isCurrent = currentTab === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between gap-2 ${
                              isCurrent
                                ? 'bg-blue-900 text-white font-bold shadow-xs'
                                : 'text-stone-700 hover:bg-stone-100/90'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <ItemIcon
                                className={`w-4 h-4 shrink-0 ${
                                  isCurrent ? 'text-amber-300' : 'text-blue-900'
                                }`}
                              />
                              <span className="truncate">{item.label}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {item.badge && (
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    isCurrent
                                      ? 'bg-amber-400 text-stone-950'
                                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              {isCurrent && <Check className="w-3.5 h-3.5 text-amber-300" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Links Footer inside Dropdown */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              {/* Palace Administration Dashboard Button */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm transition ${
                  currentTab === 'dashboard'
                    ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-amber-200" />
                  <span>
                    {currentUser.role === 'VISITOR'
                      ? 'PALACE OFFICIAL LOGIN'
                      : 'ADMINISTRATION DASHBOARD'}
                  </span>
                </div>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded text-white font-bold">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </button>

              {/* Close Dropdown Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-xl text-center text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

