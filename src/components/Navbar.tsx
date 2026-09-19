import React, { useState, useRef, useEffect } from 'react';
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
  PhoneCall,
  Check,
  Layers,
  Award,
  GraduationCap,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { UserRole } from '../types';
import { Emblem } from './Emblem';
import { DirectUploadModal } from './DirectUploadModal';

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isDirectUploadOpen, setIsDirectUploadOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown accordions state for phone view
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    palace: true,
    distinguished: true,
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
      label: 'Royal Palace',
      icon: Crown,
      description: 'Stool of Hakimin Unguwar Kanawa & Council',
      items: [
        {
          id: 'palace',
          label: 'Palace Administration',
          icon: Landmark,
          badge: 'Traditional Council',
          desc: 'Ruling council, ward heads & palace officials',
        },
        {
          id: 'about',
          label: 'About Unguwar Kanawa',
          icon: Info,
          badge: 'History & Wards',
          desc: 'Community heritage, geography & demographics',
        },
      ],
    },
    {
      key: 'distinguished',
      label: 'Roll of Honor',
      icon: ShieldCheck,
      description: 'Military, Paramilitary, Police & Academicians',
      items: [
        {
          id: 'military',
          label: 'Military Personnel',
          icon: Shield,
          badge: 'Armed Forces',
          desc: 'Army, Navy & Air Force officers from the community',
        },
        {
          id: 'paramilitary',
          label: 'Paramilitary Service',
          icon: Award,
          badge: 'Customs & NSCDC',
          desc: 'Customs, Immigration, NSCDC & Correction officers',
        },
        {
          id: 'police',
          label: 'Police Command',
          icon: ShieldCheck,
          badge: 'NPF Force',
          desc: 'Nigeria Police Force officers & leadership',
        },
        {
          id: 'academicians',
          label: 'Academicians & Scholars',
          icon: GraduationCap,
          badge: 'Scholars & Deans',
          desc: 'Professors, lecturers, researchers & fellows',
        },
      ],
    },
    {
      key: 'community',
      label: 'Community & Projects',
      icon: Megaphone,
      description: 'Grassroots, announcements, townhalls & public works',
      items: [
        {
          id: 'ordinary-members',
          label: 'Community Directory',
          icon: Heart,
          badge: 'Residents & Artisans',
          desc: 'Directory of residents, artisans & craftsmen',
        },
        {
          id: 'announcements',
          label: 'Announcements',
          icon: Megaphone,
          badge: 'Verified Notices',
          desc: 'Official communiqués and public safety alerts',
        },
        {
          id: 'events',
          label: 'Community Events',
          icon: Calendar,
          badge: 'Programs',
          desc: 'Town halls, traditional ceremonies & sports',
        },
        {
          id: 'news',
          label: 'News & Media',
          icon: Newspaper,
          badge: 'Updates',
          desc: 'Press releases & developmental updates',
        },
        {
          id: 'development',
          label: 'Development Projects',
          icon: Hammer,
          badge: 'Public Works',
          desc: 'Infrastructure projects & community initiatives',
        },
      ],
    },
    {
      key: 'resources',
      label: 'Archives & Contact',
      icon: Layers,
      description: 'Public records, gallery, bylaws & council liaison',
      items: [
        {
          id: 'gallery',
          label: 'Photo Gallery',
          icon: ImageIcon,
          badge: 'Archives',
          desc: 'Historical and ceremonial photo collections',
        },
        {
          id: 'documents',
          label: 'Official Documents',
          icon: FileText,
          badge: 'Bylaws & Forms',
          desc: 'Public notices, community resolutions & forms',
        },
        {
          id: 'contact',
          label: 'Contact & Grievance',
          icon: PhoneCall,
          badge: 'Council Liaison',
          desc: 'Inquiries, dispute resolution & feedback',
        },
      ],
    },
  ];

  // Quick Direct Honor Roll Tabs for Fast Access
  const quickAccessTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'military', label: 'Military', icon: Shield },
    { id: 'paramilitary', label: 'Paramilitary', icon: Award },
    { id: 'police', label: 'Police', icon: ShieldCheck },
    { id: 'academicians', label: 'Academicians', icon: GraduationCap },
    { id: 'ordinary-members', label: 'Community', icon: Heart },
    { id: 'palace', label: 'Palace', icon: Landmark },
    { id: 'development', label: 'Projects', icon: Hammer },
  ];

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
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeItem = flatNavItems.find((item) => item.id === currentTab) || {
    id: 'home',
    label: 'Home Portal',
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
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm transition-all">
      {/* Top Banner with Authority Bar */}
      <div className="bg-[#111827] text-stone-200 text-xs py-1.5 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium tracking-wide text-[11px] sm:text-xs">
              Official Digital Portal • Traditional Council of Unguwar Kanawa, Kaduna
            </span>
          </div>

          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 hover:border-amber-400 text-[11px] font-semibold transition shadow-xs"
              title="Click to switch simulated demo roles"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role: {currentUser.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {/* Role Dropdown */}
            {roleDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-64 bg-stone-950 rounded-xl shadow-2xl border border-stone-700 p-2 z-50 text-stone-200 animate-fadeIn">
                  <div className="px-2 py-1.5 border-b border-stone-800 mb-1">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Switch Role Mode (Demo)
                    </p>
                    <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex flex-col transition border ${
                          currentUser.role === r.role
                            ? 'bg-stone-900 text-amber-300 font-bold border-amber-400 ring-1 ring-amber-400/40'
                            : 'bg-stone-950 hover:bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{r.label}</span>
                          {currentUser.role === r.role && (
                            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </span>
                        <span className="text-[10px] font-normal text-stone-400">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand Identity & Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition hover:opacity-95 shrink-0"
        >
          <Emblem size="md" />
        </div>

        {/* Center: Desktop Categorized Navigation with Hover/Click Dropdowns */}
        <div ref={dropdownRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home Link */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`h-9 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'home'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {/* Categorized Dropdown Triggers */}
          {navCategories.map((cat) => {
            const isDropdownOpen = activeDropdown === cat.key;
            const hasActiveChild = cat.items.some((item) => item.id === currentTab);
            const CatIcon = cat.icon;

            return (
              <div key={cat.key} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isDropdownOpen ? null : cat.key)}
                  onMouseEnter={() => setActiveDropdown(cat.key)}
                  className={`h-9 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                    hasActiveChild
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-extrabold shadow-xs'
                      : isDropdownOpen
                      ? 'bg-stone-100 text-stone-900 border-stone-300'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 border-transparent'
                  }`}
                  aria-expanded={isDropdownOpen}
                >
                  <CatIcon
                    className={`w-3.5 h-3.5 ${
                      hasActiveChild ? 'text-emerald-700' : 'text-stone-500'
                    }`}
                  />
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-emerald-700' : 'text-stone-400'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Flyout */}
                {isDropdownOpen && (
                  <div
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-2.5 z-50 animate-fadeIn"
                  >
                    <div className="px-3 py-2 border-b border-stone-100 mb-1.5 bg-stone-50/80 rounded-xl">
                      <div className="flex items-center gap-2 text-stone-900">
                        <CatIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="text-xs font-bold">{cat.label}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{cat.description}</p>
                    </div>

                    <div className="space-y-1">
                      {cat.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isCurrent = currentTab === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-start justify-between gap-2.5 ${
                              isCurrent
                                ? 'bg-emerald-900 text-white font-bold shadow-xs'
                                : 'text-stone-800 hover:bg-stone-100'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                                  isCurrent
                                    ? 'bg-emerald-800 text-amber-300'
                                    : 'bg-stone-100 text-emerald-800 border border-stone-200'
                                }`}
                              >
                                <ItemIcon className="w-3.5 h-3.5" />
                              </span>
                              <div>
                                <span className="font-bold block leading-tight">{item.label}</span>
                                <span
                                  className={`text-[11px] block mt-0.5 leading-snug ${
                                    isCurrent ? 'text-emerald-100' : 'text-stone-500 font-normal'
                                  }`}
                                >
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                                  isCurrent
                                    ? 'bg-amber-400 text-stone-950'
                                    : 'bg-stone-100 text-stone-600 border border-stone-200'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Action Controls & Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="h-9 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 text-xs font-semibold border border-stone-300 transition shadow-2xs flex items-center gap-2"
            title="Search records, personnel & announcements (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden xl:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-300 text-stone-500 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="h-9 w-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-300 transition shadow-2xs relative flex items-center justify-center"
            title="Community Notifications"
          >
            <Bell className="w-4 h-4 text-stone-600" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Direct Photo & Profile Upload CTA */}
          <button
            type="button"
            onClick={() => setIsDirectUploadOpen(true)}
            className="h-9 px-3 sm:px-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 border border-emerald-800 whitespace-nowrap"
            title="Upload Profile & Pictures Directly in Single or Group format"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Upload Profile</span>
          </button>

          {/* Admin Dashboard / Login Button */}
          <button
            type="button"
            onClick={() => handleNavClick('dashboard')}
            className={`h-9 px-3.5 sm:px-4 rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-stone-900 text-amber-300 border border-amber-400 ring-1 ring-amber-400/40'
                : 'bg-stone-900 hover:bg-black text-white border border-stone-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentUser.role === 'VISITOR' ? 'LOGIN' : 'DASHBOARD'}</span>
          </button>

          {/* Mobile Menu Toggle Button (Phone / Tablet View) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-9 px-2.5 sm:px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-stone-800" />
            ) : (
              <Menu className="w-4 h-4 text-stone-800" />
            )}
            <span className="text-xs font-bold hidden xs:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Desktop Quick-Access Sub-Navigation Strip */}
      <nav className="hidden lg:block bg-stone-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5">
          <ul className="flex items-center justify-between gap-1 text-xs font-semibold">
            {quickAccessTabs.map((item) => {
              const Icon = item.icon;
              const isSelected = currentTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`h-7 px-3 rounded-md transition flex items-center gap-1.5 text-xs ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Active Section Bar (Phone View) */}
      <div className="lg:hidden bg-stone-900 border-t border-b border-stone-800 px-3 sm:px-4 py-2">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 shadow-xs hover:border-emerald-500 transition group text-white"
          aria-expanded={mobileMenuOpen}
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 text-emerald-400 flex items-center justify-center shrink-0">
              <ActiveIcon className="w-4 h-4" />
            </span>
            <div className="text-left truncate">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block leading-none mb-0.5">
                Current Section
              </span>
              <span className="text-xs font-extrabold text-stone-100 truncate block leading-tight">
                {activeItem.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 pl-2 shrink-0">
            <span className="text-[11px] bg-stone-900 border border-stone-700 text-emerald-300 px-2 py-0.5 rounded-md">
              {mobileMenuOpen ? 'Close Menu' : 'Browse All ▾'}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-180 text-emerald-400' : 'text-stone-400'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu (Phone / Tablet View) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-emerald-600 shadow-2xl animate-fadeIn max-h-[82vh] overflow-y-auto">
          {/* Dropdown Header & Quick Filter Input */}
          <div className="p-4 bg-stone-50 border-b border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                <Crown className="w-4 h-4 text-emerald-700" />
                <span>Unguwar Kanawa Directory Navigation</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-600 bg-white px-2 py-0.5 rounded-full border border-stone-200">
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
                placeholder="Search pages (e.g. Military, Projects, Palace)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-800 placeholder-stone-400"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
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
                  className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs"
                >
                  {/* Category Dropdown Toggle Header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(cat.key)}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition ${
                      hasActiveItem
                        ? 'bg-emerald-50/80 border-b border-emerald-100 text-emerald-950 font-bold'
                        : 'bg-stone-50/80 hover:bg-stone-100 text-stone-800 font-semibold border-b border-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-900 text-emerald-300">
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
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
                        {cat.items.length}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-emerald-900' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Sub-items Grid / List */}
                  {isExpanded && (
                    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {cat.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isCurrent = currentTab === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between gap-2 ${
                              isCurrent
                                ? 'bg-emerald-900 text-white font-bold shadow-2xs'
                                : 'text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <ItemIcon
                                className={`w-4 h-4 shrink-0 ${
                                  isCurrent ? 'text-amber-300' : 'text-emerald-800'
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
              <button
                type="button"
                onClick={() => handleNavClick('dashboard')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs transition ${
                  currentTab === 'dashboard'
                    ? 'bg-emerald-700 text-white ring-2 ring-emerald-500'
                    : 'bg-stone-900 hover:bg-black text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  <span>
                    {currentUser.role === 'VISITOR'
                      ? 'PALACE OFFICIAL LOGIN'
                      : 'ADMINISTRATION DASHBOARD'}
                  </span>
                </div>
                <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-amber-300 font-bold">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-xl text-center text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                Close Navigation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Upload Modal */}
      <DirectUploadModal
        isOpen={isDirectUploadOpen}
        onClose={() => setIsDirectUploadOpen(false)}
        defaultCategory="Military"
        onSuccessNavigate={(tab) => {
          handleNavClick(tab);
        }}
      />
    </header>
  );
};


