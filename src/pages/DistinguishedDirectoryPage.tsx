import React, { useState, useMemo } from 'react';
import {
  Shield,
  Award,
  GraduationCap,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Building,
  UserPlus,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Printer,
  BookOpen,
  Compass,
  Star,
  Users,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { DistinguishedCategory, DistinguishedPersonnel } from '../types';
import { DirectUploadModal } from '../components/DirectUploadModal';

interface DistinguishedDirectoryPageProps {
  initialCategory?: DistinguishedCategory | 'All';
  onNavigate?: (tab: string) => void;
}

export const DistinguishedDirectoryPage: React.FC<DistinguishedDirectoryPageProps> = ({
  initialCategory = 'All',
  onNavigate,
}) => {
  const { distinguishedPersonnel, currentUser, deleteDistinguishedPersonnel } = useCommunity();

  const [activeCategory, setActiveCategory] = useState<DistinguishedCategory | 'All'>(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPersonForModal, setSelectedPersonForModal] = useState<DistinguishedPersonnel | null>(null);

  // Sync if prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: {
    key: DistinguishedCategory | 'All';
    label: string;
    icon: React.ElementType;
    description: string;
    gradient: string;
    border: string;
    badgeBg: string;
  }[] = [
    {
      key: 'All',
      label: 'All Pillars',
      icon: Users,
      description: 'Directory of Military, Paramilitary, Police, and Academicians of Unguwar Kanawa',
      gradient: 'from-slate-900 to-blue-950',
      border: 'border-amber-500/50',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      key: 'Military',
      label: 'Military',
      icon: Shield,
      description: 'Officers, commanders, and veterans of the Nigerian Army, Air Force, and Navy',
      gradient: 'from-emerald-950 via-slate-900 to-emerald-900',
      border: 'border-emerald-500/50',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      key: 'Paramilitary',
      label: 'Paramilitary',
      icon: Award,
      description: 'Personnel of Customs, NSCDC, FRSC, Immigration, and Correctional Services',
      gradient: 'from-amber-950 via-slate-900 to-amber-900',
      border: 'border-amber-500/50',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      key: 'Police',
      label: 'Police',
      icon: Shield,
      description: 'Officers and commanders of the Nigeria Police Force serving the nation and community',
      gradient: 'from-blue-950 via-slate-900 to-indigo-950',
      border: 'border-blue-500/50',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      key: 'Academicians',
      label: 'Academicians',
      icon: GraduationCap,
      description: 'Professors, researchers, faculty deans, scholars, and educational leaders',
      gradient: 'from-purple-950 via-slate-900 to-slate-900',
      border: 'border-purple-500/50',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    },
  ];

  const currentCategoryMeta =
    categories.find((c) => c.key === activeCategory) || categories[0];

  const filteredPersonnel = useMemo(() => {
    return distinguishedPersonnel.filter((person) => {
      const matchCategory =
        activeCategory === 'All' || person.category === activeCategory;

      const matchWard =
        selectedWard === 'ALL' || person.assignedWardOrOrigin.includes(selectedWard);

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        person.fullName.toLowerCase().includes(q) ||
        person.rankOrTitle.toLowerCase().includes(q) ||
        person.branchOrField.toLowerCase().includes(q) ||
        person.institutionOrCommand.toLowerCase().includes(q) ||
        person.qualificationsOrSpecialization.toLowerCase().includes(q) ||
        person.assignedWardOrOrigin.toLowerCase().includes(q);

      return matchCategory && matchWard && matchSearch;
    });
  }, [distinguishedPersonnel, activeCategory, selectedWard, searchQuery]);

  const counts = useMemo(() => {
    return {
      All: distinguishedPersonnel.length,
      Military: distinguishedPersonnel.filter((p) => p.category === 'Military').length,
      Paramilitary: distinguishedPersonnel.filter((p) => p.category === 'Paramilitary').length,
      Police: distinguishedPersonnel.filter((p) => p.category === 'Police').length,
      Academicians: distinguishedPersonnel.filter((p) => p.category === 'Academicians').length,
    };
  }, [distinguishedPersonnel]);

  const getStatusBadge = (status: DistinguishedPersonnel['status']) => {
    switch (status) {
      case 'COMMAND':
        return { text: 'Command Formation', bg: 'bg-red-50 text-red-700 border-red-200' };
      case 'ACTIVE_SERVICE':
        return { text: 'Active Service', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'FACULTY':
        return { text: 'Faculty / Academic Chair', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'RETIRED':
        return { text: 'Distinguished Veteran', bg: 'bg-stone-100 text-stone-700 border-stone-300' };
      default:
        return { text: 'Senior Officer', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${currentCategoryMeta.gradient} text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 ${currentCategoryMeta.border} shadow-xl relative overflow-hidden`}>
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <currentCategoryMeta.icon className="w-3.5 h-3.5" />
                <span>Distinguished Roll of Honor</span>
              </div>
              <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {activeCategory === 'All'
                  ? 'Military, Paramilitary, Police & Academicians'
                  : `${activeCategory} Roll of Honor`}
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {currentCategoryMeta.description}
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-bold text-xs tracking-wide shadow-lg border-2 border-stone-500 hover:border-amber-400 flex items-center gap-2 transition transform active:scale-95"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>Upload Name & Picture Directly</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-semibold border border-stone-600 hover:border-stone-400 flex items-center gap-2 transition"
                title="Print Directory"
              >
                <Printer className="w-4 h-4 text-stone-300" />
                <span className="hidden sm:inline">Print Directory</span>
              </button>
            </div>
          </div>

          {/* Category Navigation Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              const count = counts[cat.key as keyof typeof counts];

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-black text-amber-300 shadow-md border-2 border-amber-400 font-extrabold ring-1 ring-amber-400/40'
                      : 'bg-black/60 hover:bg-black text-stone-300 border border-stone-700 hover:border-stone-500'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-300'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-stone-950 text-amber-400' : 'bg-white/20 text-stone-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search by name, rank, institution, specialization, or branch...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white text-stone-900"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-xs font-semibold text-stone-700">Ward:</span>
            </div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 text-stone-800 outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="ALL">All Community Wards</option>
              <option value="Shanu">Ward A - Shanu Sector</option>
              <option value="Masallaci">Ward B - Masallaci</option>
              <option value="Kasuwa">Kasuwa / Market Ward</option>
              <option value="Palace">Palace Grounds</option>
              <option value="Railway">Railway Quarter (Layin Dogo)</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Fast Upload Trigger */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs font-bold text-stone-600">
            Showing <span className="text-stone-900">{filteredPersonnel.length}</span> distinguished profile{filteredPersonnel.length === 1 ? '' : 's'} in{' '}
            <span className="text-amber-800 font-bold">{activeCategory === 'All' ? 'all categories' : activeCategory}</span>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="text-xs text-blue-900 font-bold hover:underline flex items-center gap-1"
          >
            <span>+ Add new {activeCategory === 'All' ? 'profile' : activeCategory} profile</span>
          </button>
        </div>

        {/* Personnel Grid */}
        {filteredPersonnel.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonnel.map((person) => {
              const statusBadge = getStatusBadge(person.status);

              return (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Card Header Top Accent */}
                  <div
                    className={`h-2 w-full ${
                      person.category === 'Military'
                        ? 'bg-emerald-600'
                        : person.category === 'Paramilitary'
                        ? 'bg-amber-600'
                        : person.category === 'Police'
                        ? 'bg-blue-700'
                        : 'bg-purple-700'
                    }`}
                  />

                  {/* Profile Picture Section */}
                  <div className="p-5 pb-3">
                    <div className="flex gap-4 items-start">
                      <div className="relative shrink-0">
                        <img
                          src={person.photograph}
                          alt={person.fullName}
                          className="w-24 h-28 object-cover rounded-xl border-2 border-stone-300 shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute -bottom-2 -right-2 p-1 rounded-full text-white shadow ${
                            person.category === 'Military'
                              ? 'bg-emerald-700'
                              : person.category === 'Paramilitary'
                              ? 'bg-amber-700'
                              : person.category === 'Police'
                              ? 'bg-blue-800'
                              : 'bg-purple-800'
                          }`}
                          title={person.category}
                        >
                          {person.category === 'Military' && <Shield className="w-3.5 h-3.5" />}
                          {person.category === 'Paramilitary' && <Award className="w-3.5 h-3.5" />}
                          {person.category === 'Police' && <Shield className="w-3.5 h-3.5" />}
                          {person.category === 'Academicians' && <GraduationCap className="w-3.5 h-3.5" />}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusBadge.bg}`}>
                            {statusBadge.text}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                            {person.category}
                          </span>
                        </div>

                        <h3 className="font-cinzel text-sm font-bold text-stone-900 leading-snug group-hover:text-blue-900 transition line-clamp-2">
                          {person.fullName}
                        </h3>

                        <p className="text-xs font-semibold text-amber-800 mt-1 truncate">
                          {person.rankOrTitle}
                        </p>

                        <p className="text-[11px] text-stone-600 truncate mt-0.5">
                          {person.branchOrField}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="px-5 py-3 space-y-2.5 flex-1 border-t border-stone-100 bg-stone-50/40 text-xs text-stone-700">
                    <div className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] font-medium leading-tight">
                        {person.institutionOrCommand}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] font-medium leading-tight text-stone-600">
                        {person.assignedWardOrOrigin}
                      </span>
                    </div>

                    {person.qualificationsOrSpecialization && (
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 text-[11px]">
                        <span className="font-bold text-stone-900 block mb-0.5">
                          {person.category === 'Academicians' ? 'Specialization & Research:' : 'Operational Specialization:'}
                        </span>
                        <span className="text-stone-600 line-clamp-2">
                          {person.qualificationsOrSpecialization}
                        </span>
                      </div>
                    )}

                    {person.achievements && person.achievements.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                          Honors & Commendations
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {person.achievements.slice(0, 2).map((ach, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-medium truncate max-w-full"
                            >
                              ★ {ach}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {person.biography && (
                      <p className="text-[11px] text-stone-500 italic line-clamp-2 pt-1 border-t border-stone-200/60">
                        "{person.biography}"
                      </p>
                    )}
                  </div>

                  {/* Footer with Contact Details & Actions */}
                  <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {person.phone && (
                        <a
                          href={`tel:${person.phone}`}
                          className="p-2 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition"
                          title={`Call: ${person.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="p-2 rounded-lg bg-stone-100 hover:bg-blue-50 text-stone-700 hover:text-blue-700 transition"
                          title={`Email: ${person.email}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {person.badgeOrRegNumber && (
                        <span className="text-[10px] font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded">
                          {person.badgeOrRegNumber}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedPersonForModal(person)}
                      className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 text-white text-[11px] font-bold transition flex items-center gap-1 border border-stone-600 hover:border-amber-400 shadow-sm"
                    >
                      <span>View Profile</span>
                      <ChevronRight className="w-3 h-3 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 bg-white rounded-3xl border border-dashed border-stone-300 p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-700 text-amber-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-stone-900">
              No Distinguished Personnel Found
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No profiles match your current search terms or ward filter for{' '}
              <strong>{activeCategory === 'All' ? 'any category' : activeCategory}</strong>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedWard('ALL');
                  setActiveCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-semibold transition border border-stone-600 hover:border-stone-400"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold transition flex items-center gap-2 border-2 border-stone-500 hover:border-amber-400 shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Profile Directly</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Person Modal */}
      {selectedPersonForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPersonForModal(null)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-stone-900 text-white p-6 relative border-b-2 border-amber-500">
              <button
                onClick={() => setSelectedPersonForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200"
              >
                ✕
              </button>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                {selectedPersonForModal.category} Roll of Honor
              </span>
              <h2 className="font-cinzel text-xl font-bold text-white mt-1">
                {selectedPersonForModal.fullName}
              </h2>
              <p className="text-xs text-amber-300 font-medium">
                {selectedPersonForModal.rankOrTitle}
              </p>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <img
                  src={selectedPersonForModal.photograph}
                  alt={selectedPersonForModal.fullName}
                  className="w-32 h-40 object-cover rounded-2xl border-2 border-stone-300 shadow-lg shrink-0"
                />
                <div className="space-y-2 text-xs text-stone-700 flex-1 w-full">
                  <div>
                    <span className="font-bold text-stone-900 block text-[11px]">Formation / Department:</span>
                    <span>{selectedPersonForModal.branchOrField}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block text-[11px]">Command Base / Institution:</span>
                    <span>{selectedPersonForModal.institutionOrCommand}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block text-[11px]">Assigned Ward / Community:</span>
                    <span>{selectedPersonForModal.assignedWardOrOrigin}</span>
                  </div>
                  {selectedPersonForModal.yearsOfService && (
                    <div>
                      <span className="font-bold text-stone-900 block text-[11px]">Years of Service / Experience:</span>
                      <span>{selectedPersonForModal.yearsOfService} Years</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedPersonForModal.qualificationsOrSpecialization && (
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <strong className="text-stone-900 block mb-1">
                    Specialization & Professional Expertise:
                  </strong>
                  <p className="text-stone-700">{selectedPersonForModal.qualificationsOrSpecialization}</p>
                </div>
              )}

              {selectedPersonForModal.achievements && (
                <div>
                  <strong className="text-xs text-stone-900 block mb-1.5">
                    Recognitions, Honors & Commendations:
                  </strong>
                  <ul className="space-y-1">
                    {selectedPersonForModal.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-stone-700 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPersonForModal.biography && (
                <div>
                  <strong className="text-xs text-stone-900 block mb-1">Biography & Service Profile:</strong>
                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                    {selectedPersonForModal.biography}
                  </p>
                </div>
              )}

              {/* Direct Contacts */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex gap-2">
                  {selectedPersonForModal.phone && (
                    <a
                      href={`tel:${selectedPersonForModal.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedPersonForModal.phone}</span>
                    </a>
                  )}
                  {selectedPersonForModal.email && (
                    <a
                      href={`mailto:${selectedPersonForModal.email}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1.5 border border-blue-200"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedPersonForModal.email}</span>
                    </a>
                  )}
                </div>

                {currentUser.role === 'SUPER_ADMIN' && (
                  <button
                    onClick={() => {
                      if (confirm(`Remove profile of ${selectedPersonForModal.fullName}?`)) {
                        deleteDistinguishedPersonnel(selectedPersonForModal.id);
                        setSelectedPersonForModal(null);
                      }
                    }}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Delete Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Upload Modal */}
      <DirectUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        defaultCategory={
          activeCategory === 'All'
            ? 'Military'
            : (activeCategory as any)
        }
        onSuccessNavigate={(tab) => {
          if (onNavigate) onNavigate(tab);
        }}
      />
    </div>
  );
};
