import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Shield,
  Crown,
  Heart,
  ChevronRight,
  Sparkles,
  Edit3,
  MapPin,
  Clock,
  ArrowUpRight,
  Hammer,
  Users,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { Emblem } from '../components/Emblem';

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const {
    rulerInfo,
    updateRulerInfo,
    announcements,
    events,
    projects,
    palaceMembers,
    canManagePalace,
  } = useCommunity();

  const [isEditingRulerMessage, setIsEditingRulerMessage] = useState(false);
  const [editedMessage, setEditedMessage] = useState(rulerInfo.welcomeMessage);
  const [editedTitle, setEditedTitle] = useState(rulerInfo.traditionalTitle);

  // Filter urgent or prominent published announcements
  const publishedAnnouncements = announcements
    .filter((a) => a.status === 'PUBLISHED')
    .slice(0, 3);

  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const activePalaceOfficers = palaceMembers.filter((m) => m.isActive).slice(0, 4);

  const handleSaveRulerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    updateRulerInfo({
      welcomeMessage: editedMessage,
      traditionalTitle: editedTitle,
    });
    setIsEditingRulerMessage(false);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-stone-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#8C5935]">
        {/* Subtle royal Arewa geometric backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none arewa-pattern"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left: Text & 5 CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Official Seal Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/80 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>KADUNA NORTH LOCAL GOVERNMENT AREA • KADUNA STATE</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  WELCOME TO <br />
                  <span className="text-amber-400">UNGUWAR KANAWA</span>, KADUNA
                </h1>
                <p className="text-sm sm:text-base text-blue-100 font-medium tracking-wide">
                  Official Digital Platform of the Traditional Council & Community
                </p>
              </div>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
                Serving as the official bridge uniting traditional rulers, the palace administration, community leaders, elders, youth, women, and residents of Unguwar Kanawa. Access verified notices, historical archives, and grassroots development milestones.
              </p>

              {/* 5 Prominent Action Buttons required by prompt */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/40 transition hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <span>ABOUT OUR COMMUNITY</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('palace')}
                  className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider border border-blue-700/60 transition hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <span>PALACE ADMINISTRATION</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('announcements')}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30 transition hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>ANNOUNCEMENTS</span>
                </button>

                <button
                  onClick={() => onNavigate('events')}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-xs uppercase tracking-wider border border-stone-600 transition hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>UPCOMING EVENTS</span>
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-blue-200 font-bold text-xs uppercase tracking-wider border border-blue-800 transition hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <span>CONTACT THE PALACE</span>
                </button>
              </div>

              {/* Verified Community Notice Ticker */}
              <div className="pt-4 flex items-center gap-3 text-xs text-blue-200 border-t border-blue-900/60">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  ✓ Verified official council platform • Transparency, Cultural Heritage & Sustainable Grassroots Progress
                </span>
              </div>
            </div>

            {/* Hero Right: Traditional Ruler & Palace Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-stone-900/90 rounded-3xl p-4 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md">
                {/* Traditional Royal Gold Crest Banner */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Traditional Institution
                </div>

                {/* Ruler Portrait Box */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-800 border border-stone-700 mt-2">
                  <img
                    src={rulerInfo.officialPhotograph}
                    alt={rulerInfo.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>

                  {/* Demo Placeholder Notice */}
                  {rulerInfo.isPlaceholder && (
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Editable Demo Placeholder
                    </div>
                  )}

                  {/* Royal Identification Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {rulerInfo.traditionalTitle}
                    </p>
                    <h3 className="font-cinzel text-lg font-bold leading-tight">
                      {rulerInfo.fullName}
                    </h3>
                    <p className="text-[11px] text-stone-300">
                      Unguwar Kanawa Palace, Kaduna North LGA
                    </p>
                  </div>
                </div>

                {/* Quick Link underneath portrait */}
                <div className="mt-3 flex items-center justify-between text-xs px-2 pt-1 text-stone-300">
                  <span className="text-blue-300 font-medium">Reign: Traditional Heritage</span>
                  <button
                    onClick={() => onNavigate('ruler')}
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    View Biography &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT SECTION: MESSAGE FROM THE TRADITIONAL RULER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#24140D] via-[#321B11] to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#8C5935]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            {/* Ruler Photograph */}
            <div className="shrink-0 relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-[#2A170E]">
                <img
                  src={rulerInfo.officialPhotograph}
                  alt={rulerInfo.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-stone-950 p-1.5 rounded-full shadow">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            {/* Ruler Message Text & Title */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-2">
                <div>
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 uppercase tracking-wide">
                    MESSAGE FROM THE TRADITIONAL RULER
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E6D4C6] font-medium">
                    {rulerInfo.fullName} • {rulerInfo.traditionalTitle}
                  </p>
                </div>

                {canManagePalace && (
                  <button
                    onClick={() => {
                      setEditedMessage(rulerInfo.welcomeMessage);
                      setEditedTitle(rulerInfo.traditionalTitle);
                      setIsEditingRulerMessage(!isEditingRulerMessage);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingRulerMessage ? 'Cancel Editing' : 'Edit Royal Message'}
                  </button>
                )}
              </div>

              {/* Inline Editor for Authorized Administrators */}
              {isEditingRulerMessage ? (
                <form onSubmit={handleSaveRulerMessage} className="mt-4 p-4 bg-[#2A180F]/95 rounded-2xl border border-amber-400/60 space-y-3 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">Traditional Title</label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#3D2317] border border-[#6D4229] text-white outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">Official Welcome Message</label>
                    <textarea
                      rows={4}
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#3D2317] border border-[#6D4229] text-white outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingRulerMessage(false)}
                      className="px-3 py-1.5 bg-[#3D2317] hover:bg-[#4E2D1E] text-[#E0D1C6] text-xs rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg"
                    >
                      Save & Publish Updates
                    </button>
                  </div>
                </form>
              ) : (
                <blockquote className="text-xs sm:text-sm text-[#F0E5DC] italic leading-relaxed pt-2 border-t border-[#643D26]/70">
                  "{rulerInfo.welcomeMessage}"
                </blockquote>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#CBB6A6]">
                <span className="flex items-center gap-1 text-amber-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Authorized Palace Declaration
                </span>
                <span>•</span>
                <button
                  onClick={() => onNavigate('ruler')}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Read Full Leadership History & Speeches &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IN-BETWEEN SECTION: KEY COMMUNITY CIVIC INDEX IN COFFEE & BRONZE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#25150D] via-[#3A2215] to-[#1F1008] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#8C5935]/50 shadow-2xl relative overflow-hidden">
          {/* Subtle Arewa coffee texture overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none arewa-pattern-coffee"></div>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#6D4229]/60 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs font-extrabold tracking-widest text-[#EADBCE] uppercase">
                  UNGUWAR KANAWA CIVIC INDEX & SOVEREIGN STATISTICS
                </span>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 bg-[#422618] px-3 py-1 rounded-full border border-[#8C5935]/60 shadow-sm self-start sm:self-auto">
                Official Palace Registry & Ward Summary
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-[#2E1A11]/85 hover:bg-[#3D2318] rounded-2xl border border-[#6D4229]/60 transition text-center space-y-1 group shadow-inner">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-cinzel group-hover:scale-105 inline-block transition">
                  5+
                </span>
                <h4 className="text-xs font-bold text-[#F3E8DF] uppercase tracking-wide">
                  Autonomous Wards
                </h4>
                <p className="text-[11px] text-[#CBB5A5]">
                  Shanu, Masallaci, Kasuwa, Palace & Railway
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/85 hover:bg-[#3D2318] rounded-2xl border border-[#6D4229]/60 transition text-center space-y-1 group shadow-inner">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-cinzel group-hover:scale-105 inline-block transition">
                  15
                </span>
                <h4 className="text-xs font-bold text-[#F3E8DF] uppercase tracking-wide">
                  Solar Boreholes
                </h4>
                <p className="text-[11px] text-[#CBB5A5]">
                  Commissioned potable water stations
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/85 hover:bg-[#3D2318] rounded-2xl border border-[#6D4229]/60 transition text-center space-y-1 group shadow-inner">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-cinzel group-hover:scale-105 inline-block transition">
                  80
                </span>
                <h4 className="text-xs font-bold text-[#F3E8DF] uppercase tracking-wide">
                  Solar Streetlights
                </h4>
                <p className="text-[11px] text-[#CBB5A5]">
                  Active arterial corridor lighting
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/85 hover:bg-[#3D2318] rounded-2xl border border-[#6D4229]/60 transition text-center space-y-1 group shadow-inner">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F5EDE6] font-cinzel group-hover:scale-105 inline-block transition">
                  100%
                </span>
                <h4 className="text-xs font-bold text-[#F3E8DF] uppercase tracking-wide">
                  Verified Notices
                </h4>
                <p className="text-[11px] text-[#CBB5A5]">
                  Official Palace Council vetting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. DEDICATED COMMUNITY PILLARS: FORCE MEN, TRADITIONAL RULERS & COMMUNITY MEMBERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5C4033] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Community Pillars & Representation</span>
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-stone-900 mt-1">
              THE PILLARS OF UNGUWAR KANAWA
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Dedicated portals for our gallant security personnel, royal traditional rulers, and grassroots community members
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Our Force Men */}
          <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white rounded-2xl p-6 border-2 border-amber-500/40 shadow-xl flex flex-col justify-between group hover:border-amber-400 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                  <Shield className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Patrols 24/7
                </span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-amber-400 transition">
                OUR FORCE MEN
              </h3>
              <p className="text-xs text-amber-200/80 font-medium mt-1">
                Security Command & Yan Sintiri Vigilantes
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Meet our dedicated joint patrol team: Nigeria Police DPO officers, accredited Yan Sintiri community vigilantes, and street night watchmen keeping all five wards secure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Hotlines • Incidents • Officers</span>
              <button
                onClick={() => onNavigate('forcemen')}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>Enter Force Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Traditional Rulers */}
          <div className="bg-gradient-to-br from-[#2C241E] via-[#3E2723] to-[#1A120B] text-white rounded-2xl p-6 border-2 border-[#D4AF37]/50 shadow-xl flex flex-col justify-between group hover:border-[#D4AF37] transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C158]">
                  <Crown className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#E5C158] border border-[#D4AF37]/30">
                  Zazzau Emirate
                </span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#E5C158] transition">
                TRADITIONAL RULERS
              </h3>
              <p className="text-xs text-[#D7CCC8] font-medium mt-1">
                Council of Rulers & Autonomous Ward Heads
              </p>
              <p className="text-xs text-[#EFEBE9] mt-3 leading-relaxed">
                Under the supreme leadership of Hakimi Falakin Zazzau Alhaji Usman Abba Ibrahim. Explore the sovereign roster of ward heads (Masu Unguwa), palace titleholders, and book custom arbitration audiences.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">Hakimi • Ward Heads • Council</span>
              <button
                onClick={() => onNavigate('traditional-rulers')}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-[#2C241E] text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>Rulers Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Community Members */}
          <div className="bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EBE1] text-[#2C241E] rounded-2xl p-6 border-2 border-stone-300 shadow-xl flex flex-col justify-between group hover:border-[#5C4033] transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-xl bg-[#5C4033]/10 border border-[#5C4033]/20 text-[#5C4033]">
                  <Heart className="w-6 h-6 text-red-700" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Community Residents
                </span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#2C241E] group-hover:text-[#5C4033] transition">
                COMMUNITY MEMBERS
              </h3>
              <p className="text-xs text-[#5C4033] font-medium mt-1">
                Al'ummar Unguwar Kanawa • Artisans & Neighbors
              </p>
              <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                The hardworking backbone of our town: carpenters, seamstresses, teachers, market traders, tricycle operators, and youths. Read their inspiring life stories, hire local services, or enroll in the community register.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">Stories • Trade Roll • Voice</span>
              <button
                onClick={() => onNavigate('ordinary-members')}
                className="px-4 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>Meet Members</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFICIAL COMMUNITY ANNOUNCEMENTS (FEATURED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Official Bulletins</span>
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-stone-900 mt-1">
              COMMUNITY ANNOUNCEMENTS
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Verified notices issued by the Traditional Council and Ward Heads
            </p>
          </div>

          <button
            onClick={() => onNavigate('announcements')}
            className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 shrink-0"
          >
            <span>VIEW ALL ANNOUNCEMENTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedAnnouncements.map((ann) => (
            <div
              key={ann.id}
              onClick={() => onNavigate('announcements', ann.id)}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col group"
            >
              {ann.imageUrl && (
                <div className="h-40 overflow-hidden bg-stone-100 relative">
                  <img
                    src={ann.imageUrl}
                    alt={ann.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        ann.priority === 'Urgent'
                          ? 'bg-red-600 text-white'
                          : ann.priority === 'High'
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-blue-900 text-white'
                      }`}
                    >
                      {ann.priority}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-blue-900">{ann.category}</span>
                    <span>{ann.date}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-blue-950 transition">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                    {ann.fullAnnouncement}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                    Verified by Palace
                  </span>
                  <span className="font-semibold text-blue-900 group-hover:underline">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING EVENTS & COMMUNITY CALENDAR HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-blue-900" />
              <span>Palace & Ward Schedule</span>
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-stone-900 mt-1">
              UPCOMING COMMUNITY EVENTS
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Meetings, cultural festivals, youth programs, and sanitation drives
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 shrink-0"
          >
            <span>EXPLORE FULL CALENDAR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onNavigate('events', evt.id)}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    {evt.category}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">{evt.date}</span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition">
                  {evt.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {evt.description}
                </p>

                <div className="space-y-1 text-xs text-stone-500 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{evt.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 flex items-center justify-between text-xs border-t border-stone-100">
                <span className="text-[11px] text-stone-500">Org: {evt.organizer}</span>
                <span className="font-bold text-blue-900 group-hover:underline">
                  Event Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IN-BETWEEN SECTION: WORLD-STANDARD CULTURAL HERITAGE & CIVIC PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#23140C] via-[#382116] to-[#1C0E08] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#8C5935]/50 shadow-2xl relative overflow-hidden">
          {/* Subtle Arewa coffee texture overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none arewa-pattern-coffee"></div>
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#6B4027]/70 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Foundational Royal Ethos & Civic Standards</span>
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                  PILLARS OF OUR COMMUNITY
                </h2>
                <p className="text-xs sm:text-sm text-[#D7C3B3]">
                  Timeless traditional values driving modern urban progress across Unguwar Kanawa
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#E5D2C2] bg-[#422516] px-3.5 py-1.5 rounded-xl border border-[#7C4A2C] shadow-sm">
                  ★ Standard of Excellence • Kaduna North
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-[#2E1A11]/90 rounded-2xl border border-[#643B23] hover:border-amber-400/60 transition space-y-2.5 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#442718] border border-[#8C5935] flex items-center justify-center text-amber-300 font-bold group-hover:scale-105 transition">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7EDE4] font-cinzel">
                  Cultural Sovereignty
                </h3>
                <p className="text-xs text-[#C5B09F] leading-relaxed">
                  Honoring the enduring legacy of Hausa royal traditions, customary arbitration, and respectful community elders.
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/90 rounded-2xl border border-[#643B23] hover:border-amber-400/60 transition space-y-2.5 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#442718] border border-[#8C5935] flex items-center justify-center text-amber-300 font-bold group-hover:scale-105 transition">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7EDE4] font-cinzel">
                  Communal Peace & Unity
                </h3>
                <p className="text-xs text-[#C5B09F] leading-relaxed">
                  Inter-faith harmony, resident solidarity, and proactive dispute resolution chaired by the Palace Secretariat.
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/90 rounded-2xl border border-[#643B23] hover:border-amber-400/60 transition space-y-2.5 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#442718] border border-[#8C5935] flex items-center justify-center text-amber-300 font-bold group-hover:scale-105 transition">
                  <Hammer className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7EDE4] font-cinzel">
                  Infrastructure Stewardship
                </h3>
                <p className="text-xs text-[#C5B09F] leading-relaxed">
                  Grassroots maintenance of solar streetlights, clean water boreholes, and seasonal drainage desilting.
                </p>
              </div>

              <div className="p-5 bg-[#2E1A11]/90 rounded-2xl border border-[#643B23] hover:border-amber-400/60 transition space-y-2.5 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#442718] border border-[#8C5935] flex items-center justify-center text-amber-300 font-bold group-hover:scale-105 transition">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7EDE4] font-cinzel">
                  Youth & Economic Growth
                </h3>
                <p className="text-xs text-[#C5B09F] leading-relaxed">
                  Vocational apprenticeships, digital skills, women cooperative societies, and local commerce expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY DEVELOPMENT PROGRESS TRACKER IN WARM CAFÉ-AU-LAIT AMBIENCE */}
      <section className="bg-gradient-to-b from-[#FAF6F1] via-[#F4EDE5] to-[#EAE0D6] py-14 px-4 sm:px-6 lg:px-8 border-y border-[#D6C4B4] relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#6D4229] uppercase tracking-widest">
                <Hammer className="w-4 h-4 text-[#8C5935]" />
                <span>Civic Infrastructure & Modernization</span>
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-[#2A170E] mt-1">
                COMMUNITY DEVELOPMENT INITIATIVES
              </h2>
              <p className="text-xs sm:text-sm text-[#6F523E]">
                Drainage, clean water boreholes, streetlights, healthcare, and education
              </p>
            </div>

            <button
              onClick={() => onNavigate('development')}
              className="text-xs font-bold text-[#4A2917] hover:text-[#25140B] flex items-center gap-1 shrink-0 bg-[#E8DDD2] hover:bg-[#DBCABA] px-3.5 py-1.5 rounded-xl border border-[#C8B6A4] transition"
            >
              <span>TRACK ALL PROJECTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate('development', proj.id)}
                className="bg-white rounded-2xl border border-[#D8C7B8] hover:border-[#8C5935] p-5 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F2EAE2] text-[#5C3720] border border-[#DFCFC2]">
                      {proj.category}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        proj.status === 'COMPLETED'
                          ? 'bg-blue-100 text-blue-950 border border-blue-300'
                          : proj.status === 'ONGOING'
                          ? 'bg-[#FBEEDC] text-[#6B3F1D] border border-[#E8C29E]'
                          : 'bg-stone-100 text-stone-800 border border-stone-300'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#4A2917] transition">
                    {proj.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Progress Bar with Coffee to Amber Gradient */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-600">Progress</span>
                      <span className="text-[#6D4229]">{proj.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#EAE1D7] rounded-full overflow-hidden border border-[#D5C2B2]">
                      <div
                        className="h-full bg-gradient-to-r from-[#4E2B18] via-[#8C5935] to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${proj.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 flex items-center justify-between text-xs border-t border-[#EFE7DE] text-stone-500">
                  <span className="line-clamp-1 text-[11px]">{proj.sponsor}</span>
                  <span className="font-bold text-[#5C3720] group-hover:text-[#321B0E] shrink-0">
                    Details &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PALACE ADMINISTRATION DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Leadership Council</span>
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-stone-900 mt-1">
              PALACE ADMINISTRATION
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              The Traditional Ruler, Palace Secretary, Council Members, Ward Leaders & Representatives
            </p>
          </div>

          <button
            onClick={() => onNavigate('palace')}
            className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 shrink-0"
          >
            <span>FULL DIRECTORY</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePalaceOfficers.map((member) => (
            <div
              key={member.id}
              onClick={() => onNavigate('palace', member.id)}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition cursor-pointer text-center space-y-3 group"
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md bg-stone-100">
                <img
                  src={member.photograph}
                  alt={member.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                  {member.position}
                </span>
                <h3 className="font-bold text-stone-900 text-sm mt-2 leading-snug">
                  {member.fullName}
                </h3>
                <p className="text-xs text-amber-800 font-semibold">{member.traditionalTitle}</p>
                <p className="text-[11px] text-stone-500 mt-1">{member.areaWard}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] text-blue-900 font-semibold flex items-center justify-center gap-1">
                <span>View Profile Card</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION: CONNECT WITH THE PALACE IN COFFEE & BURNISHED GOLD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E1108] via-[#321B10] to-[#160B05] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border-2 border-[#8C5935]/60 shadow-2xl">
          <div className="absolute inset-0 opacity-15 pointer-events-none arewa-pattern-coffee"></div>
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#422515] border border-[#8C5935]/50 text-amber-300 text-[11px] font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Citizen Engagement • Unguwar Kanawa Secretariat</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-300 uppercase">
              ENGAGE WITH UNGUWAR KANAWA PALACE
            </h2>
            <p className="text-xs sm:text-sm text-[#E0D2C7] leading-relaxed">
              Have an official inquiry, suggestion, or request for audience with the Traditional Council or the Community Development Committee? Submit your correspondence directly through the official digital registry.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/40 transition flex items-center gap-2"
              >
                <span>Send Message to Secretariat</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('members')}
                className="px-5 py-2.5 rounded-xl bg-[#452718] hover:bg-[#57321F] text-[#F8EFE8] font-semibold text-xs uppercase tracking-wider border border-[#7F4E2F] transition"
              >
                Register as Community Resident
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
