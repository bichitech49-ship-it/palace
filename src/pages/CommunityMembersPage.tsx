import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { CommunityMember, CitizenStory } from '../types';
import {
  Users,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Wrench,
  GraduationCap,
  Heart,
  MessageSquare,
  Plus,
  CheckCircle2,
  X,
  Send,
  Sparkles,
  Quote,
  Clock,
  Phone,
  Lightbulb,
} from 'lucide-react';

export const CommunityMembersPage: React.FC = () => {
  const {
    communityMembers,
    registerCommunityMember,
    citizenStories,
    addCitizenStory,
    currentUser,
    submitContactMessage,
  } = useCommunity();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedVocation, setSelectedVocation] = useState<string>('ALL');
  const [selectedStory, setSelectedStory] = useState<CitizenStory | null>(null);

  // Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [storySuccess, setStorySuccess] = useState(false);
  const [suggestionSuccess, setSuggestionSuccess] = useState(false);

  // Self-Register Form
  const [name, setName] = useState('');
  const [ward, setWard] = useState('Ward A - Shanu');
  const [occupation, setOccupation] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Story Form
  const [storyName, setStoryName] = useState(currentUser?.name || '');
  const [storyTrade, setStoryTrade] = useState('');
  const [storyWard, setStoryWard] = useState('Ward A - Shanu Sector');
  const [storyQuote, setStoryQuote] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [storyYears, setStoryYears] = useState(10);
  const [storySkill, setStorySkill] = useState('');
  const [storyPhoto, setStoryPhoto] = useState('');

  // Suggestion Form
  const [sugName, setSugName] = useState(currentUser?.name || '');
  const [sugWard, setSugWard] = useState('Ward A - Shanu');
  const [sugTopic, setSugTopic] = useState('Drainage & Sanitation');
  const [sugMessage, setSugMessage] = useState('');

  const wards = [
    'ALL',
    'Ward A - Shanu',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Palace Grounds / Royal Quarter',
    'Railway Quarter (Layin Dogo)',
  ];

  const vocationCategories = [
    { label: 'All Community Vocations', value: 'ALL' },
    { label: 'Artisans & Craftsmen', value: 'Artisan' },
    { label: 'Traders & Market Merchants', value: 'Trader' },
    { label: 'Education & Teachers', value: 'Teacher' },
    { label: 'Healthcare & Nursing', value: 'Health' },
    { label: 'Transport & Drivers', value: 'Transport' },
    { label: 'Youth, Students & Tech', value: 'Youth' },
  ];

  const filteredMembers = communityMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.areaWard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesWard = selectedWard === 'ALL' || member.areaWard.toLowerCase().includes(selectedWard.toLowerCase());

    const matchesVocation =
      selectedVocation === 'ALL' ||
      member.occupation.toLowerCase().includes(selectedVocation.toLowerCase()) ||
      member.skills.some((s) => s.toLowerCase().includes(selectedVocation.toLowerCase()));

    return matchesSearch && matchesWard && matchesVocation;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !occupation) return;

    registerCommunityMember({
      name,
      areaWard: ward,
      occupation,
      skills: skillsText.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      contactInfo: contactInfo || 'Available on request',
      photograph:
        photoUrl ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isPublic: true,
    });

    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setShowRegisterModal(false);
      setName('');
      setOccupation('');
      setSkillsText('');
      setContactInfo('');
      setPhotoUrl('');
    }, 2000);
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyName || !storyTrade || !storyBody) return;

    addCitizenStory({
      fullName: storyName,
      tradeOrRole: storyTrade,
      ward: storyWard,
      quote: storyQuote || `Proud to be a resident serving Unguwar Kanawa.`,
      story: storyBody,
      photograph:
        storyPhoto ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      yearsInCommunity: Number(storyYears),
      highlightSkill: storySkill || storyTrade,
    });

    setStorySuccess(true);
    setTimeout(() => {
      setStorySuccess(false);
      setShowStoryModal(false);
      setStoryName('');
      setStoryTrade('');
      setStoryQuote('');
      setStoryBody('');
    }, 2000);
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sugMessage) return;

    submitContactMessage(
      sugName || 'Community Resident',
      '+234 800 000 0000',
      `${(sugName || 'citizen').toLowerCase().replace(/\s+/g, '')}@unguwar-kanawa.example.org`,
      `[Grassroots Voice - ${sugWard}] ${sugTopic}`,
      sugMessage
    );

    setSuggestionSuccess(true);
    setTimeout(() => {
      setSuggestionSuccess(false);
      setShowSuggestionModal(false);
      setSugMessage('');
    }, 2000);
  };

  return (
    <div id="community-members-page" className="min-h-screen bg-[#FDFBF7] text-[#2C241E] pb-16">
      {/* Warm Heritage Header */}
      <div className="bg-gradient-to-r from-[#3D2817] via-[#5C4033] to-[#2E1D11] text-[#FDFBF7] py-14 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D4AF37]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-3">
                <Heart className="w-3.5 h-3.5 text-red-300" />
                Al'ummar Unguwar Kanawa • Community Members
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Members of Our Community
              </h1>
              <p className="mt-2 text-[#EFEBE9] max-w-2xl text-base sm:text-lg leading-relaxed">
                Celebrating the everyday heartbeat of Unguwar Kanawa: our carpenters, seamstresses, market women,
                teachers, mechanics, tricycle riders, youth apprentices, and elders whose honest daily labor builds our town.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
              <button
                id="btn-join-community-roll"
                onClick={() => setShowRegisterModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-[#2C241E] font-semibold shadow-md transition"
              >
                <Plus className="w-5 h-5" />
                Join Community Roll
              </button>

              <button
                onClick={() => setShowStoryModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-white font-medium border border-stone-600 transition"
              >
                <Quote className="w-5 h-5 text-amber-300" />
                Share Your Story
              </button>

              <button
                onClick={() => setShowSuggestionModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#4A3329] hover:bg-[#3B2820] text-amber-100 font-medium border border-[#D4AF37]/30 transition"
              >
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Voice Box
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Section 1: Voices of Community Members */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#5C4033] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Grassroots Resident Spotlights
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#2C241E] mt-1">
                Voices of Everyday Neighbors & Artisans
              </h2>
            </div>
            <button
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C4033] hover:text-[#2C241E] self-start"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" /> Tell Your Community Story
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={story.photograph}
                      alt={story.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shadow-sm shrink-0"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#2C241E]">{story.fullName}</h3>
                      <p className="text-xs font-semibold text-[#5C4033]">{story.tradeOrRole}</p>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#5C4033]" /> {story.ward}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 mb-4 relative">
                    <Quote className="w-4 h-4 text-[#D4AF37] absolute top-2 right-2 opacity-50" />
                    <p className="text-xs italic text-stone-700 font-serif leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {story.story}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#D4AF37]" /> {story.yearsInCommunity} Years in Town
                  </span>
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="text-xs font-semibold text-[#5C4033] hover:underline"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Quick Skills Marketplace Filter */}
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EBE1] rounded-2xl border border-stone-200 p-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2C241E] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#5C4033]" /> Need a Handyman or Local Trade Service?
              </h3>
              <p className="text-xs text-stone-600">
                Support community members and neighbors directly! Hire trusted local craftsmen, tutors, seamstresses, and technicians.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: 'Need a Carpenter / Wood Craftsman', term: 'Carpenter' },
              { label: 'Need a Seamstress / Tailor', term: 'Tailor' },
              { label: 'Need an Electrician / Solar Tech', term: 'Electrician' },
              { label: 'Need a Plumber / Borehole Repair', term: 'Plumb' },
              { label: 'Need a Private Tutor / Teacher', term: 'Teacher' },
              { label: 'Need Metal Fabricator / Welder', term: 'Blacksmith' },
              { label: 'Need Keke Rider / Logistics', term: 'Transport' },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => {
                  setSearchTerm(btn.term);
                }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#5C4033] hover:text-white text-stone-700 text-xs font-medium border border-stone-300 shadow-sm transition"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Grassroots Resident Directory */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-[#5C4033] uppercase tracking-wider">
                Public Community Roll
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#2C241E] mt-1">
                Directory of Community Residents & Members
              </h2>
            </div>
            <span className="text-xs font-medium text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
              Showing {filteredMembers.length} Registered Residents
            </span>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="search-community-members"
                  type="text"
                  placeholder="Search community members by name, occupation, trade, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
                />
              </div>

              {/* Ward */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-stone-200 bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C4033] text-sm"
                >
                  {wards.map((w) => (
                    <option key={w} value={w}>
                      {w === 'ALL' ? 'All Residential Wards' : w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vocation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-stone-100 mt-4 pb-1">
              <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
              <span className="text-xs font-medium text-stone-500 shrink-0">Field of Trade:</span>
              {vocationCategories.map((vc) => (
                <button
                  key={vc.value}
                  onClick={() => setSelectedVocation(vc.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedVocation === vc.value
                      ? 'bg-[#5C4033] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {vc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Members Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <img
                      src={member.photograph}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-sm shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-base text-[#2C241E] truncate">{member.name}</h3>
                      <p className="text-xs font-medium text-[#5C4033] flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3 h-3 text-[#5C4033]" />
                        <span className="truncate">{member.occupation}</span>
                      </p>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span className="truncate">{member.areaWard}</span>
                      </p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="my-3 flex flex-wrap gap-1.5">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-stone-700 border border-stone-200 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 text-[11px]">
                    Joined {member.joinedDate || '2026'}
                  </span>
                  <a
                    href={`mailto:${member.contactInfo}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#5C4033] hover:text-white text-stone-700 font-medium border border-stone-300 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Connect
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
              <Users className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">No Members Found</h3>
              <p className="text-sm text-stone-500 mt-1">
                Try searching for another trade or resetting your ward filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedWard('ALL');
                  setSelectedVocation('ALL');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#5C4033] text-white text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Join Community Roll Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
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
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Enroll in Community Directory</h3>
                <p className="text-xs text-stone-500">Add yourself to the public register of community members</p>
              </div>
            </div>

            {registerSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-stone-800 text-base">Enrolled Successfully!</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Your profile has been added to the Unguwar Kanawa community members directory.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sani Mohammed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Residential Ward</label>
                    <select
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    >
                      <option value="Ward A - Shanu">Ward A - Shanu</option>
                      <option value="Ward B - Masallaci">Ward B - Masallaci</option>
                      <option value="Kasuwa / Market Ward">Kasuwa / Market</option>
                      <option value="Palace Grounds / Royal Quarter">Palace Grounds</option>
                      <option value="Railway Quarter (Layin Dogo)">Railway Quarter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Occupation / Trade</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Carpenter, Tailor, Nurse"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Special Skills (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Roof repair, Furniture, Door frames"
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Phone / Email</label>
                    <input
                      type="text"
                      placeholder="e.g. 0803 000 0000"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Photo URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
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
                    Submit Enrollment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-[#5C4033] text-white">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Share Your Story as a Community Member</h3>
                <p className="text-xs text-stone-500">Inspire fellow neighbors with your daily journey in Unguwar Kanawa</p>
              </div>
            </div>

            {storySuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-stone-800 text-base">Story Shared!</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Thank you for contributing to the living archive of our community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hajiya Maryam"
                      value={storyName}
                      onChange={(e) => setStoryName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Trade / Vocation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grain Trader & Mother"
                      value={storyTrade}
                      onChange={(e) => setStoryTrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Residential Ward</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ward A - Shanu Sector"
                      value={storyWard}
                      onChange={(e) => setStoryWard(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Years Living in Community</label>
                    <input
                      type="number"
                      min="1"
                      value={storyYears}
                      onChange={(e) => setStoryYears(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">A Short Inspiring Quote</label>
                  <input
                    type="text"
                    placeholder="e.g. Hard work with honesty is the best legacy for our children."
                    value={storyQuote}
                    onChange={(e) => setStoryQuote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Life Story / Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how you started your trade, challenges overcome, what you love about Unguwar Kanawa..."
                    value={storyBody}
                    onChange={(e) => setStoryBody(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Photograph URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={storyPhoto}
                    onChange={(e) => setStoryPhoto(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white font-semibold shadow"
                  >
                    Publish Story
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Community Voice & Suggestion Box */}
      {showSuggestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <button
              onClick={() => setShowSuggestionModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">Community Voice Box</h3>
                <p className="text-xs text-stone-500">Directly voice feedback or improvement ideas to the Hakimi and CDC</p>
              </div>
            </div>

            {suggestionSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-stone-800 text-base">Feedback Submitted!</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Your suggestion has been logged in the community administrative register.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Name (or Anonymous)</label>
                    <input
                      type="text"
                      placeholder="e.g. Concerned Resident"
                      value={sugName}
                      onChange={(e) => setSugName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Ward</label>
                    <select
                      value={sugWard}
                      onChange={(e) => setSugWard(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                    >
                      <option value="Ward A - Shanu">Ward A - Shanu</option>
                      <option value="Ward B - Masallaci">Ward B - Masallaci</option>
                      <option value="Kasuwa / Market Ward">Kasuwa / Market</option>
                      <option value="Palace Grounds / Royal Quarter">Palace Grounds</option>
                      <option value="Railway Quarter (Layin Dogo)">Railway Quarter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category of Suggestion</label>
                  <select
                    value={sugTopic}
                    onChange={(e) => setSugTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  >
                    <option value="Drainage & Sanitation">Drainage & Sanitation</option>
                    <option value="Solar Streetlighting">Solar Streetlighting & Roads</option>
                    <option value="Youth Training & Jobs">Youth Apprenticeship & Jobs</option>
                    <option value="Market Cleanliness & Security">Market Cleanliness & Security</option>
                    <option value="Healthcare Center & Drugs">Healthcare Center & Medicines</option>
                    <option value="General Community Idea">General Community Idea</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Suggestion / Concern</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Explain clearly what can be improved in your street or ward..."
                    value={sugMessage}
                    onChange={(e) => setSugMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSuggestionModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#5C4033] hover:bg-[#4A3329] text-white font-semibold shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Voice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedStory.photograph}
                alt={selectedStory.fullName}
                className="w-20 h-20 rounded-full object-cover border-3 border-[#D4AF37] shadow"
              />
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2C241E]">{selectedStory.fullName}</h3>
                <p className="text-xs font-semibold text-[#5C4033]">{selectedStory.tradeOrRole}</p>
                <p className="text-xs text-stone-500 mt-0.5">{selectedStory.ward} • {selectedStory.yearsInCommunity} Years</p>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <p className="text-sm italic font-serif text-stone-800 leading-relaxed">
                "{selectedStory.quote}"
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-serif font-bold text-sm text-[#2C241E] mb-1">Life & Community Service</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{selectedStory.story}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-5 py-2 rounded-lg bg-[#5C4033] text-white text-xs font-medium"
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
