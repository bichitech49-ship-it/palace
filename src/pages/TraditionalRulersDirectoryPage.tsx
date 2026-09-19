import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { TraditionalRulerLeader } from '../types';
import {
  Crown,
  Search,
  Filter,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Mail,
  X,
  BookOpen,
  Send,
  Sparkles,
  Award,
  Users,
  Scroll,
} from 'lucide-react';

export const TraditionalRulersDirectoryPage: React.FC = () => {
  const { traditionalRulers, setCurrentTab, currentUser } = useCommunity();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedLeader, setSelectedLeader] = useState<TraditionalRulerLeader | null>(null);

  // Audience Booking Modal
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [audienceTarget, setAudienceTarget] = useState<string>('Hakimi Falakin Zazzau Alhaji Usman Abba Ibrahim');
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantPhone, setApplicantPhone] = useState(currentUser?.phone || '');
  const [purpose, setPurpose] = useState('Communal / Boundary Arbitration');
  const [preferredDate, setPreferredDate] = useState('');
  const [briefSummary, setBriefSummary] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const roleCategories = [
    { label: 'All Traditional Rulers', value: 'ALL' },
    { label: 'District Head & Dynasty', value: 'DYNASTY' },
    { label: 'Autonomous Ward Heads (Masu Unguwa)', value: 'WARD_HEAD' },
    { label: 'Palace Council Titleholders (Masu Sarauta)', value: 'COUNCIL_TITLEHOLDER' },
  ];

  const wards = [
    'ALL',
    'Unguwar Kanawa District, Kaduna North (All 5 Wards)',
    'Ward A - Shanu Sector',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Unguwar Kanawa Palace Grounds & Royal Quarter',
    'Railway Quarter (Layin Dogo)',
  ];

  const filteredRulers = traditionalRulers.filter((ruler) => {
    const matchesSearch =
      ruler.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruler.traditionalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruler.jurisdictionWard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruler.shortBiography.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === 'ALL' ||
      (selectedRole === 'DYNASTY' && (ruler.roleLevel === 'DISTRICT_HEAD' || ruler.roleLevel === 'PREDECESSOR')) ||
      ruler.roleLevel === selectedRole;

    const matchesWard = selectedWard === 'ALL' || ruler.jurisdictionWard.includes(selectedWard);

    return matchesSearch && matchesRole && matchesWard;
  });

  const handleAudienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !briefSummary) return;

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowAudienceModal(false);
      setBriefSummary('');
    }, 2500);
  };

  const openAudienceForLeader = (leaderName: string) => {
    setAudienceTarget(leaderName);
    setShowAudienceModal(true);
  };

  return (
    <div id="traditional-rulers-page" className="min-h-screen bg-[#FDFBF7] text-[#2C241E] pb-16">
      {/* Royal Banner Header */}
      <div className="bg-gradient-to-r from-[#2C241E] via-[#3E2723] to-[#1A120B] text-[#FDFBF7] py-14 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-3">
                <Crown className="w-3.5 h-3.5" />
                Sarakunan Gargajiya & Masu Unguwanni
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Council of Traditional Rulers & Royal Ward Heads
              </h1>
              <p className="mt-2 text-[#D7CCC8] max-w-2xl text-base sm:text-lg leading-relaxed">
                The custodians of customary law, ancestral heritage, and grassroots peace in Unguwar Kanawa under the
                revered Zazzau Emirate. From the Hakimi to the autonomous Ward Heads and Palace Titleholders.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
              <button
                id="btn-book-royal-audience"
                onClick={() => setShowAudienceModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-[#2C241E] font-semibold shadow-md transition"
              >
                <Crown className="w-5 h-5" />
                Book Royal Audience
              </button>

              <button
                onClick={() => setCurrentTab('ruler')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-white font-medium border border-stone-600 transition"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                Hakimi Royal Biography
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Paramount Ruler Spotlight Banner */}
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EBE1] rounded-2xl border-2 border-[#D4AF37]/40 p-6 sm:p-8 shadow-md mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <img
                src="https://i.ibb.co/mCp0C7S4/186d5e7d-fd42-4191-a76d-d15c203e6de2.jpg"
                alt="Hakimi Falakin Zazzau Alhaji Usman Abba Ibrahim"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-4 border-[#D4AF37] shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 p-2 bg-[#D4AF37] text-[#2C241E] rounded-full shadow">
                <Crown className="w-5 h-5" />
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#5C4033] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" /> Substantive District Head (Hakimi)
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2C241E]">
                Hakimi Falakin Zazzau Alhaji Usman Abba Ibrahim
              </h2>
              <p className="text-sm font-semibold text-[#5C4033] mt-1">
                District Head of Unguwar Kanawa & Falakin Zazzau (Zazzau Emirate)
              </p>
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                Son and dynastic successor to Late Hakimi Abba Ibrahim Kura. Upholding justice, peaceful arbitration,
                educational endowments, and community unity across all five wards of Unguwar Kanawa.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => openAudienceForLeader('Hakimi Falakin Zazzau Alhaji Usman Abba Ibrahim')}
                  className="px-4 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Request Audience with the Hakimi
                </button>
                <button
                  onClick={() => setCurrentTab('ruler')}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-stone-100 text-stone-800 text-xs font-medium border border-stone-300 transition"
                >
                  View Sovereign Address & Gallery
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="search-rulers-input"
                type="text"
                placeholder="Search by title, ruler name, ward, or palace chamber..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
              />
            </div>

            {/* Ward Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
              >
                {wards.map((w) => (
                  <option key={w} value={w}>
                    {w === 'ALL' ? 'All Traditional Wards' : w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Role Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-stone-100 mt-4 pb-1">
            <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
            <span className="text-xs font-medium text-stone-500 shrink-0">Traditional Rank:</span>
            {roleCategories.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRole(r.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedRole === r.value
                    ? 'bg-[#5C4033] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Traditional Rulers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRulers.map((ruler) => (
            <div
              key={ruler.id}
              className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                ruler.roleLevel === 'DISTRICT_HEAD'
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30'
                  : ruler.roleLevel === 'PREDECESSOR'
                  ? 'border-amber-300/80 bg-amber-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div>
                {/* Card Header & Photo */}
                <div className="p-5 pb-4 flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={ruler.photograph}
                      alt={ruler.fullName}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-[#D4AF37]/50 shadow-sm"
                    />
                    {ruler.roleLevel === 'DISTRICT_HEAD' && (
                      <span className="absolute -top-2 -left-2 p-1 bg-[#D4AF37] rounded-full text-[#2C241E] shadow">
                        <Crown className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        ruler.roleLevel === 'DISTRICT_HEAD'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : ruler.roleLevel === 'PREDECESSOR'
                          ? 'bg-stone-100 text-stone-700 border border-stone-300'
                          : ruler.roleLevel === 'WARD_HEAD'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}
                    >
                      {ruler.roleLevel.replace('_', ' ')}
                    </span>

                    <h3 className="font-serif font-bold text-base text-[#2C241E] mt-1.5 leading-snug">
                      {ruler.fullName}
                    </h3>
                    <p className="text-xs font-semibold text-[#5C4033] mt-0.5">{ruler.traditionalTitle}</p>
                    <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" /> {ruler.appointmentYear}
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-5 py-3 bg-[#FAF7F2] border-t border-b border-stone-100 space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5C4033] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-stone-500">Jurisdiction: </span>
                      <span className="font-semibold text-stone-800">{ruler.jurisdictionWard}</span>
                    </div>
                  </div>

                  {ruler.palaceChamber && (
                    <div className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-[#5C4033] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-stone-500">Chamber: </span>
                        <span>{ruler.palaceChamber}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-stone-600 line-clamp-2 pt-1 border-t border-stone-200">
                    {ruler.shortBiography}
                  </p>
                </div>

                {/* Responsibilities list */}
                {ruler.responsibilities && ruler.responsibilities.length > 0 && (
                  <div className="px-5 py-3 bg-white">
                    <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Scroll className="w-3 h-3 text-[#D4AF37]" /> Key Royal Duties:
                    </p>
                    <ul className="space-y-1">
                      {ruler.responsibilities.slice(0, 2).map((duty, idx) => (
                        <li key={idx} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="text-[#D4AF37] mt-0.5">•</span>
                          <span className="line-clamp-1">{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-3 bg-white border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedLeader(ruler)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#FAF7F2] hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 transition"
                >
                  View Stool Details
                </button>

                {ruler.isActive && (
                  <button
                    onClick={() => openAudienceForLeader(ruler.fullName)}
                    className="px-3 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-medium transition flex items-center gap-1"
                  >
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Audience
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Traditional Governance Structure Explainer */}
        <div className="mt-14 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[#5C4033] text-[#D4AF37]">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C241E]">
                Traditional Governance Architecture & Arbitration Protocol
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                How customary leadership preserves harmony, land security, and cultural heritage in Unguwar Kanawa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="flex items-center gap-2 text-[#5C4033] font-bold text-sm mb-2">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                1. The Stool of the Hakimi (District Head)
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                The Hakimi represents Unguwar Kanawa at the ancient Zazzau Emirate Council in Zaria. He presides over
                the Traditional Council, confers customary honorific titles, and acts as the supreme civil arbitrator.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="flex items-center gap-2 text-[#5C4033] font-bold text-sm mb-2">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                2. Autonomous Ward Heads (Masu Unguwa)
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Each of the five wards (Shanu, Masallaci, Kasuwa, Sarki, Railway) is headed by a substantive Mai Unguwa.
                They maintain household registers, mediate domestic boundary disputes, and supervise local street vigilantes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="flex items-center gap-2 text-[#5C4033] font-bold text-sm mb-2">
                <Scroll className="w-4 h-4 text-[#D4AF37]" />
                3. Palace Traditional Council (Majalisar Fada)
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Comprising the Waziri (Prime Scribe), Sarkin Yaki (Defense & Security), Madaki (Elder Counselor), and
                Turaki (Youth Patron). They meet bi-weekly at the Royal Diwan to review community welfare and decrees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Book Audience Modal */}
      {showAudienceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <button
              onClick={() => setShowAudienceModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-[#5C4033] text-[#D4AF37]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Request Traditional Audience</h3>
                <p className="text-xs text-stone-500">Official protocol for customary arbitration or palace consultation</p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-stone-800 text-base">Audience Request Submitted</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  The Palace Protocol Officer will review your request and contact you via phone with an audience docket.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAudienceSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Traditional Leader</label>
                  <select
                    value={audienceTarget}
                    onChange={(e) => setAudienceTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2] font-medium"
                  >
                    {traditionalRulers
                      .filter((r) => r.isActive)
                      .map((r) => (
                        <option key={r.id} value={r.fullName}>
                          {r.fullName} ({r.traditionalTitle})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alhaji Mustapha Sani"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Phone Contact</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 000 0000"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Purpose of Audience</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    >
                      <option value="Communal / Boundary Arbitration">Communal / Boundary Arbitration</option>
                      <option value="Family / Civil Dispute Settlement">Family / Civil Dispute Settlement</option>
                      <option value="Community Development Delegation">Community Development Delegation</option>
                      <option value="Customary Courtesy / Royal Greeting">Customary Courtesy / Royal Greeting</option>
                      <option value="Youth or Women Welfare Matter">Youth or Women Welfare Matter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Brief Summary of Matter</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly state the background of your inquiry or grievance..."
                    value={briefSummary}
                    onChange={(e) => setBriefSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  <strong>Palace Protocol Note:</strong> Official arbitration sessions are conducted every Tuesday and
                  Thursday at 10:00 AM at the Palace Central Chambers. Urgent security concerns are addressed 24/7.
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAudienceModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white font-semibold shadow"
                  >
                    <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Leader Detail Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <img
                src={selectedLeader.photograph}
                alt={selectedLeader.fullName}
                className="w-28 h-28 rounded-2xl object-cover mx-auto border-3 border-[#D4AF37] shadow-lg"
              />
              <span className="inline-block mt-3 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                {selectedLeader.roleLevel.replace('_', ' ')}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#2C241E] mt-1.5">{selectedLeader.fullName}</h3>
              <p className="text-sm font-semibold text-[#5C4033]">{selectedLeader.traditionalTitle}</p>
            </div>

            <div className="mt-5 space-y-2.5 text-xs bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Jurisdiction:</span>
                <span className="font-semibold text-stone-800 text-right">{selectedLeader.jurisdictionWard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Reign / Appointment:</span>
                <span className="font-semibold text-stone-800">{selectedLeader.appointmentYear}</span>
              </div>
              {selectedLeader.palaceChamber && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Chamber:</span>
                  <span className="font-semibold text-stone-800 text-right">{selectedLeader.palaceChamber}</span>
                </div>
              )}
              {selectedLeader.contactOffice && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Contact Office:</span>
                  <span className="font-mono text-stone-800">{selectedLeader.contactOffice}</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-serif font-bold text-sm text-[#2C241E] mb-1">Biography & Traditional Stool</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{selectedLeader.shortBiography}</p>
            </div>

            {selectedLeader.responsibilities && (
              <div className="mt-4">
                <h4 className="font-serif font-bold text-sm text-[#2C241E] mb-2 flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-[#D4AF37]" /> Key Responsibilities & Powers
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {selectedLeader.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {selectedLeader.isActive && (
                <button
                  onClick={() => {
                    const name = selectedLeader.fullName;
                    setSelectedLeader(null);
                    openAudienceForLeader(name);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white text-xs font-semibold shadow flex items-center justify-center gap-1.5"
                >
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  Request Audience
                </button>
              )}
              <button
                onClick={() => setSelectedLeader(null)}
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
