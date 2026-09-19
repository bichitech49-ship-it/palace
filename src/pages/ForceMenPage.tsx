import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { ForceMenOfficer, ForceBranch } from '../types';
import {
  Shield,
  Phone,
  AlertTriangle,
  Search,
  Filter,
  Users,
  Award,
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  X,
  Send,
  EyeOff,
  Building,
  HeartHandshake,
} from 'lucide-react';

export const ForceMenPage: React.FC = () => {
  const { forceMen, addForceOfficer, securityReports, addSecurityReport, currentUser, canManagePalace } = useCommunity();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedOfficer, setSelectedOfficer] = useState<ForceMenOfficer | null>(null);

  // Modal States
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Security Tip Form
  const [incidentType, setIncidentType] = useState('Suspicious Movement / Gathering');
  const [ward, setWard] = useState('Ward A - Shanu Sector');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reportingName, setReportingName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Officer Registration Form
  const [newOfficerName, setNewOfficerName] = useState('');
  const [newOfficerRank, setNewOfficerRank] = useState('');
  const [newOfficerBranch, setNewOfficerBranch] = useState<ForceBranch>(
    'Community Vigilance Service (Yan Sintiri / KADVS)'
  );
  const [newOfficerWard, setNewOfficerWard] = useState('Ward A - Shanu Sector');
  const [newOfficerPhone, setNewOfficerPhone] = useState('');
  const [newOfficerStation, setNewOfficerStation] = useState('');
  const [newOfficerBadge, setNewOfficerBadge] = useState('');
  const [newOfficerPhoto, setNewOfficerPhoto] = useState('');
  const [newOfficerSpec, setNewOfficerSpec] = useState('');
  const [newOfficerYears, setNewOfficerYears] = useState(3);

  const branches: { label: string; value: string }[] = [
    { label: 'All Forces & Patrols', value: 'ALL' },
    { label: 'Vigilance Service (Yan Sintiri / KADVS)', value: 'Community Vigilance Service (Yan Sintiri / KADVS)' },
    { label: 'Nigeria Police Force Outpost', value: 'Nigeria Police Force Outpost' },
    { label: 'Neighborhood Night Patrol', value: 'Neighborhood Night Patrol' },
    { label: 'Veterans Advisory Council', value: 'Armed Forces Veterans Advisory' },
    { label: 'Traffic & Peace Volunteers', value: 'Traffic & Peace Volunteers' },
  ];

  const wards = [
    'ALL',
    'Ward A - Shanu Sector',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Palace Grounds / Royal Quarter',
    'Railway Quarter (Layin Dogo)',
  ];

  const filteredOfficers = forceMen.filter((officer) => {
    const matchesSearch =
      officer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.rankTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (officer.badgeNumber && officer.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      officer.assignedWard.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = selectedBranch === 'ALL' || officer.branch === selectedBranch;
    const matchesWard =
      selectedWard === 'ALL' ||
      officer.assignedWard.toLowerCase().includes(selectedWard.toLowerCase()) ||
      officer.assignedWard.includes('All Sectors');

    return matchesSearch && matchesBranch && matchesWard;
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !location) return;

    addSecurityReport({
      reportingName: isAnonymous ? 'Anonymous Citizen' : reportingName || 'Resident',
      phone: isAnonymous ? 'Confidential' : phone || 'Not Provided',
      ward,
      incidentType,
      description,
      location,
      isAnonymous,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setDescription('');
      setLocation('');
    }, 2000);
  };

  const handleRegisterOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfficerName || !newOfficerRank || !newOfficerPhone) return;

    addForceOfficer({
      fullName: newOfficerName,
      rankTitle: newOfficerRank,
      branch: newOfficerBranch,
      assignedWard: newOfficerWard,
      phone: newOfficerPhone,
      stationBase: newOfficerStation || 'Unguwar Kanawa Command Station',
      badgeNumber: newOfficerBadge || `UK-SEC-${Math.floor(100 + Math.random() * 900)}`,
      photograph:
        newOfficerPhoto ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      specialization: newOfficerSpec || 'General Community Patrol & Safety Sentry',
      status: 'ON_DUTY',
      commendations: ['Community Service Enlistment'],
      yearsOfService: Number(newOfficerYears),
    });

    setShowRegisterModal(false);
    setNewOfficerName('');
    setNewOfficerRank('');
    setNewOfficerPhone('');
    setNewOfficerStation('');
    setNewOfficerBadge('');
    setNewOfficerPhoto('');
    setNewOfficerSpec('');
  };

  return (
    <div id="forcemen-page" className="min-h-screen bg-[#FDFBF7] text-[#2C241E] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#2C241E] via-[#3D322A] to-[#1E1813] text-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5" />
                Unguwar Kanawa Community Security Command
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Our Force Men & Community Protectors
              </h1>
              <p className="mt-2 text-[#D7CCC8] max-w-2xl text-base sm:text-lg leading-relaxed">
                Saluting the gallant men and women of the Nigeria Police Force Outpost, Kaduna State Vigilance Service
                (KADVS / Yan Sintiri), Neighborhood Night Patrol squads, and Armed Forces Veterans defending peace day and night.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
              <button
                id="btn-report-incident"
                onClick={() => setShowReportModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white font-medium shadow-md transition-all duration-200"
              >
                <AlertTriangle className="w-5 h-5 text-amber-200 animate-pulse" />
                Report Incident / Tip-Off
              </button>

              {canManagePalace && (
                <button
                  id="btn-register-officer"
                  onClick={() => setShowRegisterModal(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white font-medium border border-[#D4AF37]/40 shadow-md transition-all duration-200"
                >
                  <Plus className="w-5 h-5 text-[#D4AF37]" />
                  Enlist Force Officer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Hotline Ticker / Contact Hub */}
      <div className="bg-[#4A3329] border-b border-[#5C4033] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 rounded-full bg-red-600/30 text-red-300">
              <Radio className="w-4 h-4 animate-ping" />
            </div>
            <div>
              <span className="font-semibold text-amber-200">24/7 Rapid Emergency Response Desk:</span>
              <span className="ml-2 text-stone-300">Call immediately for urgent distress or night intrusion</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <a
              href="tel:+2348032194001"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-800/80 hover:bg-stone-700 text-amber-100 border border-stone-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-medium">Vigilante C-in-C: +234 803 219 4001</span>
            </a>
            <a
              href="tel:+2348025559012"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-800/80 hover:bg-stone-700 text-amber-100 border border-stone-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono font-medium">Police Outpost: +234 802 555 9012</span>
            </a>
            <a
              href="tel:+2348037773341"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-800/80 hover:bg-stone-700 text-amber-100 border border-stone-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono font-medium">Palace Security: +234 803 777 3341</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Force Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Force Officers</p>
                <p className="text-2xl font-bold font-serif text-[#2C241E] mt-1">{forceMen.length} Officers</p>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg text-[#5C4033]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-emerald-700 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Ward Coverage
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Patrol Sectors</p>
                <p className="text-2xl font-bold font-serif text-[#2C241E] mt-1">5 Wards</p>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg text-[#5C4033]">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-stone-600 mt-2">Continuous night coverage</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Avg. Response Time</p>
                <p className="text-2xl font-bold font-serif text-emerald-700 mt-1">4 - 7 mins</p>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-stone-600 mt-2">Stationed quick response</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Citizen Tips Addressed</p>
                <p className="text-2xl font-bold font-serif text-[#5C4033] mt-1">{securityReports.length + 12}</p>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg text-[#5C4033]">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-stone-600 mt-2">Zero tolerance for crime</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="search-officers-input"
                type="text"
                placeholder="Search officers by name, rank, badge, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
              />
            </div>

            {/* Ward Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                id="filter-ward-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
              >
                {wards.map((w) => (
                  <option key={w} value={w}>
                    {w === 'ALL' ? 'All Assigned Wards' : w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Branch Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-stone-100 mt-4 pb-1">
            <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
            <span className="text-xs font-medium text-stone-500 shrink-0">Command Branch:</span>
            {branches.map((b) => (
              <button
                key={b.value}
                onClick={() => setSelectedBranch(b.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedBranch === b.value
                    ? 'bg-[#5C4033] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map((officer) => (
            <div
              key={officer.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Officer Card Header */}
                <div className="relative p-5 pb-4 flex items-start gap-4">
                  <img
                    src={officer.photograph}
                    alt={officer.fullName}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-[#D4AF37]/40 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                        {officer.badgeNumber || 'UK-SEC'}
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          officer.status === 'COMMAND'
                            ? 'bg-amber-100 text-amber-800'
                            : officer.status === 'ON_DUTY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {officer.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#2C241E] mt-1.5 leading-tight truncate">
                      {officer.fullName}
                    </h3>
                    <p className="text-xs font-medium text-[#5C4033] mt-0.5">{officer.rankTitle}</p>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{officer.branch}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-5 py-3 bg-[#FAF7F2] border-t border-b border-stone-100 space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5C4033] shrink-0" />
                    <span className="font-medium text-stone-500">Ward Sector:</span>
                    <span className="font-semibold text-stone-800 truncate">{officer.assignedWard}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#5C4033] shrink-0" />
                    <span className="font-medium text-stone-500">Base Post:</span>
                    <span className="truncate">{officer.stationBase}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#5C4033] shrink-0" />
                    <span className="font-medium text-stone-500">Specialization:</span>
                    <span className="truncate">{officer.specialization}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="font-medium text-stone-500">Service Record:</span>
                    <span>{officer.yearsOfService} Years Dedicated Service</span>
                  </div>
                </div>

                {/* Commendations */}
                {officer.commendations && officer.commendations.length > 0 && (
                  <div className="px-5 py-2.5 bg-white">
                    <p className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#D4AF37]" /> Honors & Commendations:
                    </p>
                    <ul className="mt-1 space-y-1">
                      {officer.commendations.map((c, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="text-[#D4AF37] leading-none mt-1">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-3 bg-white border-t border-stone-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${officer.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF7F2] hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5C4033]" />
                  Call: {officer.phone}
                </a>

                <button
                  onClick={() => setSelectedOfficer(officer)}
                  className="px-3 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-medium transition"
                >
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOfficers.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
            <Shield className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">No Force Officers Found</h3>
            <p className="text-sm text-stone-500 mt-1">
              Try adjusting your search keywords or switching branch filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBranch('ALL');
                setSelectedWard('ALL');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#5C4033] text-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Community Security Directives & Night Protocol */}
        <div className="mt-12 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#5C4033] text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#2C241E]">
                Community Security Directives & Night Watch Protocol
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Jointly issued by the Hakimi Palace Traditional Council and Kaduna North Police Command
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-stone-200">
              <h4 className="font-bold text-sm text-[#5C4033] flex items-center gap-1.5 mb-2">
                <Clock className="w-4 h-4 text-amber-700" /> 1. Night Gate Curfew & Whistle Protocol
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                All arterial street security iron gates across Shanu, Masallaci, and Kasuwa wards lock at 11:00 PM.
                Late-returning residents must identify themselves to duty vigilantes with neighborhood residence cards.
                In emergency, blow 3 consecutive whistle blasts to alert sector patrolmen.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-stone-200">
              <h4 className="font-bold text-sm text-[#5C4033] flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" /> 2. Stranger & Tenant Registration
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Compound landlords and caretaking agents are mandated to submit profiles of new incoming tenants to the
                respective Mai Unguwa (Ward Head) and sector Yan Sintiri within 7 days of arrival to prevent harboring
                fugitives or criminal elements.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-stone-200">
              <h4 className="font-bold text-sm text-[#5C4033] flex items-center gap-1.5 mb-2">
                <HeartHandshake className="w-4 h-4 text-amber-700" /> 3. Joint Civilian-Police Partnership
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Citizens are strictly forbidden from taking the law into their own hands or engaging in jungle justice.
                Any intercepted suspect must be handed over unhurt to Inspector Gambo’s desk at the Police Outpost or
                Commander Murtala Lawal’s vigilante office.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Incident / Tip-off Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-red-100 text-red-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Confidential Security Tip-Off</h3>
                <p className="text-xs text-stone-500">Report directly to the Palace & Vigilante Operations Desk</p>
              </div>
            </div>

            {reportSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-stone-800 text-base">Tip Dispatched Securely</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Your tip has been forwarded to the sector patrol teams. Thank you for protecting our community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Incident Category</label>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2] text-xs focus:ring-2 focus:ring-[#5C4033]"
                  >
                    <option value="Suspicious Movement / Gathering">Suspicious Movement / Unknown Gathering</option>
                    <option value="Burglary / Attempted Theft">Burglary / Attempted Theft</option>
                    <option value="Night Noise / Vandalism">Night Noise / Vandalism / Disturbance</option>
                    <option value="Traffic Obstruction / Road Blockage">Traffic Obstruction / Road Blockage</option>
                    <option value="Boundary Dispute / Street Brawl">Boundary Dispute / Street Brawl</option>
                    <option value="Other Safety Threat">Other Community Safety Concern</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Ward</label>
                    <select
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2] text-xs"
                    >
                      <option value="Ward A - Shanu Sector">Ward A - Shanu</option>
                      <option value="Ward B - Masallaci">Ward B - Masallaci</option>
                      <option value="Kasuwa / Market Ward">Kasuwa / Market</option>
                      <option value="Palace Grounds / Royal Quarter">Palace Grounds</option>
                      <option value="Railway Quarter (Layin Dogo)">Railway Quarter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Exact Location / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Old Well, Market Road"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Incident Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you observed, suspect appearance, vehicle, time..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2] text-xs"
                  />
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-[#5C4033] focus:ring-[#5C4033]"
                      />
                      <span>Keep my identity completely anonymous</span>
                    </label>
                    <EyeOff className="w-4 h-4 text-stone-400" />
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200">
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={reportingName}
                        onChange={(e) => setReportingName(e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="Your Phone (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-semibold shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Tip Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Register Force Officer Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-[#5C4033] text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Enlist Force Man / Volunteer</h3>
                <p className="text-xs text-stone-500">Authorized official registration into community security roster</p>
              </div>
            </div>

            <form onSubmit={handleRegisterOfficer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Officer Ibrahim Bello"
                  required
                  value={newOfficerName}
                  onChange={(e) => setNewOfficerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Rank / Operational Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Sector Deputy Lead"
                    required
                    value={newOfficerRank}
                    onChange={(e) => setNewOfficerRank(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Badge / Enlistment ID</label>
                  <input
                    type="text"
                    placeholder="e.g. KADVS/UK-044"
                    value={newOfficerBadge}
                    onChange={(e) => setNewOfficerBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Command Branch</label>
                <select
                  value={newOfficerBranch}
                  onChange={(e) => setNewOfficerBranch(e.target.value as ForceBranch)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                >
                  <option value="Community Vigilance Service (Yan Sintiri / KADVS)">
                    Community Vigilance Service (Yan Sintiri / KADVS)
                  </option>
                  <option value="Nigeria Police Force Outpost">Nigeria Police Force Outpost</option>
                  <option value="Neighborhood Night Patrol">Neighborhood Night Patrol</option>
                  <option value="Armed Forces Veterans Advisory">Armed Forces Veterans Advisory</option>
                  <option value="Traffic & Peace Volunteers">Traffic & Peace Volunteers</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Assigned Ward Sector</label>
                  <input
                    type="text"
                    placeholder="e.g. Ward A - Shanu Sector"
                    required
                    value={newOfficerWard}
                    onChange={(e) => setNewOfficerWard(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Direct Phone Contact</label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 803 000 0000"
                    required
                    value={newOfficerPhone}
                    onChange={(e) => setNewOfficerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Base Station / Outpost</label>
                  <input
                    type="text"
                    placeholder="e.g. Central Palace Security Desk"
                    value={newOfficerStation}
                    onChange={(e) => setNewOfficerStation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Years in Service</label>
                  <input
                    type="number"
                    min="1"
                    value={newOfficerYears}
                    onChange={(e) => setNewOfficerYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Specialization / Core Skill</label>
                <input
                  type="text"
                  placeholder="e.g. Night Alleyway Patrol, Crowd Mediation, First Aid"
                  value={newOfficerSpec}
                  onChange={(e) => setNewOfficerSpec(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Photograph URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newOfficerPhoto}
                  onChange={(e) => setNewOfficerPhoto(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white font-semibold shadow"
                >
                  Enlist Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Officer Detail Modal */}
      {selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-300 relative">
            <button
              onClick={() => setSelectedOfficer(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <img
                src={selectedOfficer.photograph}
                alt={selectedOfficer.fullName}
                className="w-24 h-24 rounded-xl object-cover mx-auto border-2 border-[#D4AF37] shadow-md"
              />
              <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FAF7F2] text-stone-700 border border-stone-200">
                {selectedOfficer.badgeNumber}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#2C241E] mt-1">{selectedOfficer.fullName}</h3>
              <p className="text-sm font-semibold text-[#5C4033]">{selectedOfficer.rankTitle}</p>
              <p className="text-xs text-stone-500 mt-0.5">{selectedOfficer.branch}</p>
            </div>

            <div className="mt-5 space-y-2.5 text-xs bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Assigned Ward:</span>
                <span className="font-semibold text-stone-800 text-right">{selectedOfficer.assignedWard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Base Station:</span>
                <span className="font-semibold text-stone-800 text-right">{selectedOfficer.stationBase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Specialization:</span>
                <span className="font-semibold text-stone-800 text-right">{selectedOfficer.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Duty Status:</span>
                <span className="font-bold text-emerald-700 uppercase">{selectedOfficer.status.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Years of Service:</span>
                <span className="font-semibold text-stone-800">{selectedOfficer.yearsOfService} Years</span>
              </div>
            </div>

            {selectedOfficer.commendations && (
              <div className="mt-4">
                <p className="text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Service Commendations
                </p>
                <div className="space-y-1">
                  {selectedOfficer.commendations.map((c, i) => (
                    <div key={i} className="text-xs p-2 rounded bg-amber-50 border border-amber-200 text-amber-900">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${selectedOfficer.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-semibold shadow"
              >
                <Phone className="w-4 h-4" /> Call {selectedOfficer.phone}
              </a>
              <button
                onClick={() => setSelectedOfficer(null)}
                className="px-4 py-2.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium hover:bg-stone-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
