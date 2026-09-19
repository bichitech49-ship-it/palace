import React, { useState } from 'react';
import { Search, X, Calendar, Bell, Users, Hammer, FileText, Newspaper, Image as ImageIcon, ChevronRight, Shield, Crown, Heart } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { announcements, events, news, palaceMembers, projects, documents, gallery, distinguishedPersonnel, citizenStories } = useCommunity();

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredDistinguished = cleanQuery
    ? distinguishedPersonnel.filter(
        (dp) =>
          dp.fullName.toLowerCase().includes(cleanQuery) ||
          dp.rankOrTitle.toLowerCase().includes(cleanQuery) ||
          dp.category.toLowerCase().includes(cleanQuery) ||
          dp.branchOrField.toLowerCase().includes(cleanQuery) ||
          dp.assignedWardOrOrigin.toLowerCase().includes(cleanQuery) ||
          (dp.biography || '').toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredAnnouncements = cleanQuery
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.fullAnnouncement.toLowerCase().includes(cleanQuery) ||
          a.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredEvents = cleanQuery
    ? events.filter(
        (e) =>
          e.name.toLowerCase().includes(cleanQuery) ||
          e.venue.toLowerCase().includes(cleanQuery) ||
          e.description.toLowerCase().includes(cleanQuery) ||
          e.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredNews = cleanQuery
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(cleanQuery) ||
          (n.excerpt || n.summary || '').toLowerCase().includes(cleanQuery) ||
          n.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredPalace = cleanQuery
    ? palaceMembers.filter(
        (p) =>
          p.fullName.toLowerCase().includes(cleanQuery) ||
          p.traditionalTitle.toLowerCase().includes(cleanQuery) ||
          p.position.toLowerCase().includes(cleanQuery) ||
          p.areaWard.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredProjects = cleanQuery
    ? projects.filter(
        (pr) =>
          pr.name.toLowerCase().includes(cleanQuery) ||
          pr.location.toLowerCase().includes(cleanQuery) ||
          pr.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredDocuments = cleanQuery
    ? documents.filter(
        (d) =>
          d.title.toLowerCase().includes(cleanQuery) ||
          d.description.toLowerCase().includes(cleanQuery) ||
          d.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredGallery = cleanQuery
    ? gallery.filter(
        (g) =>
          g.title.toLowerCase().includes(cleanQuery) ||
          g.caption.toLowerCase().includes(cleanQuery) ||
          g.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredStories = cleanQuery
    ? citizenStories.filter(
        (s) =>
          s.fullName.toLowerCase().includes(cleanQuery) ||
          s.tradeOrRole.toLowerCase().includes(cleanQuery) ||
          s.ward.toLowerCase().includes(cleanQuery) ||
          s.highlightSkill.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults =
    filteredAnnouncements.length +
    filteredEvents.length +
    filteredNews.length +
    filteredPalace.length +
    filteredProjects.length +
    filteredDocuments.length +
    filteredGallery.length +
    filteredDistinguished.length +
    filteredStories.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-blue-900 shrink-0" />
          <input
            type="text"
            placeholder="Search announcements, events, news, palace members, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-400 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center text-stone-500 text-sm">
              <p className="font-medium text-stone-700">Search the Unguwar Kanawa Digital Repository</p>
              <p className="mt-1 text-xs text-stone-500">
                Type keywords like "sanitation", "water", "durbar", "ward", "traditional ruler", or "solar"
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Sanitation', 'Borehole', 'Security', 'Traditional Council', 'Durbar', 'Clinic'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-blue-50 hover:text-blue-900 text-stone-600 rounded-full border border-stone-200 transition"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center text-stone-500">
              <p className="text-sm font-semibold text-stone-800">No matches found for "{query}"</p>
              <p className="text-xs text-stone-500 mt-1">Try another keyword or category term.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Found {totalResults} result{totalResults > 1 ? 's' : ''} in Unguwar Kanawa records
              </div>

              {/* Announcements Results */}
              {filteredAnnouncements.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 uppercase">
                    <Bell className="w-3.5 h-3.5" /> Official Announcements ({filteredAnnouncements.length})
                  </div>
                  {filteredAnnouncements.slice(0, 3).map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        onClose();
                        onNavigate('announcements', a.id);
                      }}
                      className="p-3 bg-blue-50/50 hover:bg-blue-100/60 rounded-xl border border-blue-200/60 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900 text-white">
                            {a.category}
                          </span>
                          <span className="text-xs text-stone-500">{a.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-stone-900 mt-1 group-hover:text-blue-950">
                          {a.title}
                        </h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-700 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Events Results */}
              {filteredEvents.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase">
                    <Calendar className="w-3.5 h-3.5" /> Events & Calendar ({filteredEvents.length})
                  </div>
                  {filteredEvents.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        onClose();
                        onNavigate('events', e.id);
                      }}
                      className="p-3 bg-amber-50/50 hover:bg-amber-100/60 rounded-xl border border-amber-200/60 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div>
                        <span className="text-xs text-amber-800 font-semibold">{e.date} • {e.time}</span>
                        <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                          {e.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">{e.venue}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-600 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Palace Members Results */}
              {filteredPalace.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase">
                    <Users className="w-3.5 h-3.5" /> Palace Administration ({filteredPalace.length})
                  </div>
                  {filteredPalace.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onNavigate('palace', p.id);
                      }}
                      className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.photograph} alt={p.fullName} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">{p.fullName}</h4>
                          <p className="text-xs text-stone-500">{p.traditionalTitle} • {p.position}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Development Projects */}
              {filteredProjects.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800 uppercase">
                    <Hammer className="w-3.5 h-3.5" /> Community Development ({filteredProjects.length})
                  </div>
                  {filteredProjects.slice(0, 3).map((pr) => (
                    <div
                      key={pr.id}
                      onClick={() => {
                        onClose();
                        onNavigate('development', pr.id);
                      }}
                      className="p-3 bg-cyan-50/50 hover:bg-cyan-100/60 rounded-xl border border-cyan-200/60 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-700 text-white">
                            {pr.status} ({pr.progressPercentage}%)
                          </span>
                          <span className="text-xs text-stone-500">{pr.category}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-stone-900 mt-1">{pr.name}</h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-cyan-600 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* News Results */}
              {filteredNews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase">
                    <Newspaper className="w-3.5 h-3.5" /> Community News ({filteredNews.length})
                  </div>
                  {filteredNews.slice(0, 2).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onClose();
                        onNavigate('news', n.id);
                      }}
                      className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <span className="text-xs text-stone-500">{n.date} • {n.category}</span>
                        <h4 className="text-sm font-semibold text-stone-900">{n.title}</h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Documents Results */}
              {filteredDocuments.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase">
                    <FileText className="w-3.5 h-3.5" /> Documents & Resources ({filteredDocuments.length})
                  </div>
                  {filteredDocuments.slice(0, 2).map((d) => (
                    <div
                      key={d.id}
                      onClick={() => {
                        onClose();
                        onNavigate('documents', d.id);
                      }}
                      className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <span className="text-xs font-semibold text-blue-900">{d.fileType} • {d.category}</span>
                        <h4 className="text-sm font-semibold text-stone-900">{d.title}</h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery Results */}
              {filteredGallery.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase">
                    <ImageIcon className="w-3.5 h-3.5" /> Gallery ({filteredGallery.length})
                  </div>
                  {filteredGallery.slice(0, 2).map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        onClose();
                        onNavigate('gallery', g.id);
                      }}
                      className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <span className="text-xs text-stone-500">{g.category}</span>
                        <h4 className="text-sm font-semibold text-stone-900">{g.title}</h4>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Distinguished Personnel Results */}
              {filteredDistinguished.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase">
                    <Shield className="w-3.5 h-3.5 text-amber-600" /> Distinguished Pillars ({filteredDistinguished.length})
                  </div>
                  {filteredDistinguished.slice(0, 4).map((dp) => {
                    const navTarget =
                      dp.category === 'Military'
                        ? 'military'
                        : dp.category === 'Paramilitary'
                        ? 'paramilitary'
                        : dp.category === 'Police'
                        ? 'police'
                        : 'academicians';

                    return (
                      <div
                        key={dp.id}
                        onClick={() => {
                          onClose();
                          onNavigate(navTarget);
                        }}
                        className="p-3 bg-amber-50/60 hover:bg-amber-100/70 rounded-xl border border-amber-200/80 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={dp.photograph}
                            alt={dp.fullName}
                            className="w-10 h-10 rounded-xl object-cover border border-amber-300"
                          />
                          <div>
                            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                              {dp.category} • {dp.rankOrTitle}
                            </span>
                            <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                              {dp.fullName}
                            </h4>
                            <p className="text-xs text-stone-500">
                              {dp.branchOrField} • {dp.assignedWardOrOrigin}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-amber-600 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Community Members Stories Results */}
              {filteredStories.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase">
                    <Heart className="w-3.5 h-3.5 text-rose-600" /> Community Members & Artisans ({filteredStories.length})
                  </div>
                  {filteredStories.slice(0, 3).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onClose();
                        onNavigate('ordinary-members');
                      }}
                      className="p-3 bg-rose-50/50 hover:bg-rose-100/60 rounded-xl border border-rose-200/60 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={s.photograph} alt={s.fullName} className="w-9 h-9 rounded-full object-cover border border-rose-300" />
                        <div>
                          <span className="text-[11px] font-bold text-rose-900">{s.tradeOrRole}</span>
                          <h4 className="text-sm font-semibold text-stone-900">{s.fullName}</h4>
                          <p className="text-xs text-stone-500">{s.ward} • {s.yearsInCommunity} Years in Town</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-rose-500 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-stone-200 bg-stone-100 text-xs text-stone-500 flex items-center justify-between">
          <span>Official Unguwar Kanawa, Kaduna search index</span>
          <button onClick={onClose} className="text-blue-900 hover:underline font-medium">
            Close Search
          </button>
        </div>
      </div>
    </div>
  );
};
