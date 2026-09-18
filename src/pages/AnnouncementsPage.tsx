import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  FileText,
  Calendar,
  Shield,
  ShieldCheck,
  Clock,
  Send,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { Announcement, AnnouncementCategory, ApprovalStatus, PriorityLevel } from '../types';

export const AnnouncementsPage: React.FC<{ initialSelectedId?: string }> = ({ initialSelectedId }) => {
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    updateAnnouncementStatus,
    deleteAnnouncement,
    canEditContent,
    canManagePalace,
    currentUser,
  } = useCommunity();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(() => {
    if (initialSelectedId) {
      return announcements.find((a) => a.id === initialSelectedId) || null;
    }
    return null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().substring(0, 10),
    category: 'Palace Announcement' as AnnouncementCategory,
    issuingAuthority: 'Office of the Traditional Ruler & Palace Secretariat',
    fullAnnouncement: '',
    imageUrl: '',
    priority: 'Normal' as PriorityLevel,
    expiryDate: '',
    status: (canManagePalace ? 'PUBLISHED' : 'DRAFT') as ApprovalStatus,
  });

  const categories: AnnouncementCategory[] = [
    'Palace Announcement',
    'Community Meeting',
    'Security Notice',
    'Funeral Announcement',
    'Wedding Announcement',
    'Religious Event',
    'Development Announcement',
    'Emergency Notice',
    'General Information',
  ];

  // Filtering: Regular visitors only see PUBLISHED; editors/admins see draft/review
  const visibleAnnouncements = announcements.filter((a) => {
    if (canEditContent) return true;
    return a.status === 'PUBLISHED';
  });

  const filtered = visibleAnnouncements.filter((a) => {
    const matchCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchPri = selectedPriority === 'ALL' || a.priority === selectedPriority;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.fullAnnouncement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPri && matchSearch;
  });

  const openCreateModal = () => {
    setFormData({
      title: '',
      date: new Date().toISOString().substring(0, 10),
      category: 'Palace Announcement',
      issuingAuthority: 'Office of the Traditional Ruler & Traditional Council',
      fullAnnouncement: '',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      priority: 'Normal',
      expiryDate: '',
      status: canManagePalace ? 'PUBLISHED' : 'DRAFT',
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (a: Announcement) => {
    setFormData({
      title: a.title,
      date: a.date,
      category: a.category,
      issuingAuthority: a.issuingAuthority,
      fullAnnouncement: a.fullAnnouncement,
      imageUrl: a.imageUrl || '',
      priority: a.priority,
      expiryDate: a.expiryDate || '',
      status: a.status,
    });
    setEditingItem(a);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateAnnouncement(editingItem.id, {
        title: formData.title,
        date: formData.date,
        category: formData.category,
        issuingAuthority: formData.issuingAuthority,
        fullAnnouncement: formData.fullAnnouncement,
        imageUrl: formData.imageUrl || undefined,
        priority: formData.priority,
        expiryDate: formData.expiryDate || undefined,
        status: formData.status,
      });
    } else {
      addAnnouncement({
        title: formData.title,
        date: formData.date,
        category: formData.category,
        issuingAuthority: formData.issuingAuthority,
        fullAnnouncement: formData.fullAnnouncement,
        imageUrl: formData.imageUrl || undefined,
        publicationDate: formData.date,
        expiryDate: formData.expiryDate || undefined,
        priority: formData.priority,
        status: formData.status,
        creator: currentUser.name,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Official Gazette & Bulletins</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA COMMUNITY ANNOUNCEMENTS
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Verified official communiques, security alerts, funeral notices, religious programs, and palace meetings.
          </p>
        </div>

        {canEditContent && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>+ New Announcement</span>
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH ANNOUNCEMENTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-stone-50 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="ALL">FILTER BY CATEGORY (All Categories)</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full py-2 px-3 bg-stone-50 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="Urgent">Urgent Priority</option>
              <option value="High">High Priority</option>
              <option value="Normal">Normal Priority</option>
            </select>
          </div>
        </div>

        {/* Workflow Approval Legend for Admins */}
        {canEditContent && (
          <div className="flex flex-wrap items-center justify-between text-[11px] pt-2 border-t border-stone-100 text-stone-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-700">Workflow Stages:</span>
              <span className="px-2 py-0.5 rounded bg-stone-100 border text-stone-600">Draft</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">Under Review</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">Approved</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-950 border border-blue-300 font-bold">Published & Verified</span>
            </div>
            <span>Showing {filtered.length} announcement records</span>
          </div>
        )}
      </div>

      {/* Announcements List Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-500 space-y-2">
            <Bell className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-bold text-stone-700 text-sm">No announcements matching criteria</p>
            <p className="text-xs">Adjust search keywords or category filters.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm hover:shadow-md transition space-y-4 ${
                item.priority === 'Urgent'
                  ? 'border-red-300 bg-red-50/10'
                  : 'border-stone-200'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-900 text-white">
                      {item.category}
                    </span>

                    {/* Priority badge */}
                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        item.priority === 'Urgent'
                          ? 'bg-red-600 text-white animate-pulse'
                          : item.priority === 'High'
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {item.priority} Priority
                    </span>

                    {/* Verified Official Badge */}
                    {item.isVerified ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-950 border border-blue-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        ✓ VERIFIED OFFICIAL COMMUNITY ANNOUNCEMENT
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {item.status} (Pending Verification)
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => setSelectedAnnouncement(item)}
                    className="font-bold text-stone-900 text-base sm:text-lg leading-snug pt-1 cursor-pointer hover:text-blue-900 transition"
                  >
                    {item.title}
                  </h2>
                </div>

                <div className="text-right text-xs text-stone-500">
                  <p className="font-semibold text-stone-700">{item.date}</p>
                  {item.expiryDate && <p className="text-[11px]">Valid until {item.expiryDate}</p>}
                </div>
              </div>

              {/* Body snippet */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {item.fullAnnouncement}
              </p>

              {/* Issuing Authority & Audit Record */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-800">Issuing Authority:</span>
                  <span className="text-blue-950 font-medium">{item.issuingAuthority}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedAnnouncement(item)}
                    className="font-bold text-blue-900 hover:underline"
                  >
                    Open Gazette Document &rarr;
                  </button>

                  {/* Administrative workflow controls */}
                  {canManagePalace && (
                    <div className="flex items-center gap-2 border-l pl-3">
                      {item.status !== 'PUBLISHED' && (
                        <button
                          onClick={() => updateAnnouncementStatus(item.id, 'PUBLISHED')}
                          className="px-2.5 py-1 bg-blue-800 hover:bg-blue-900 text-white font-bold text-[11px] rounded-lg shadow"
                          title="Approve and publish officially"
                        >
                          Verify & Publish
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-stone-500 hover:text-blue-900 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete announcement "${item.title}"?`)) {
                            deleteAnnouncement(item.id);
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Audit trail metadata */}
              <div className="text-[10px] text-stone-400 bg-stone-50 p-2 rounded-lg flex flex-wrap gap-4">
                <span>Created by: <strong>{item.creator}</strong></span>
                {item.approver && <span>Approved by: <strong>{item.approver}</strong></span>}
                <span>Stamping: Verified Record</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reader Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-900 text-white">
                  {selectedAnnouncement.category}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-2">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button onClick={() => setSelectedAnnouncement(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAnnouncement.imageUrl && (
              <div className="rounded-2xl overflow-hidden max-h-60 bg-stone-100">
                <img
                  src={selectedAnnouncement.imageUrl}
                  alt={selectedAnnouncement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0" />
              <div className="text-xs text-blue-950">
                <p className="font-bold uppercase tracking-wider">
                  ✓ VERIFIED OFFICIAL COMMUNITY ANNOUNCEMENT
                </p>
                <p>Authenticated by the Traditional Council of Unguwar Kanawa, Kaduna.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
              {selectedAnnouncement.fullAnnouncement}
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5 text-stone-600">
              <p><strong>Issuing Authority:</strong> {selectedAnnouncement.issuingAuthority}</p>
              <p><strong>Date of Communique:</strong> {selectedAnnouncement.date}</p>
              {selectedAnnouncement.expiryDate && (
                <p><strong>Expiration Date:</strong> {selectedAnnouncement.expiryDate}</p>
              )}
              <p><strong>Official Approver:</strong> {selectedAnnouncement.approver || 'Traditional Council Secretariat'}</p>
            </div>

            <div className="pt-2 border-t flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {editingItem ? 'Edit Announcement' : 'Draft Official Community Announcement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Monthly Environmental Sanitation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as AnnouncementCategory })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Priority Level</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  required
                  value={formData.issuingAuthority}
                  onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Announcement Text</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Full text of the official declaration..."
                  value={formData.fullAnnouncement}
                  onChange={(e) => setFormData({ ...formData, fullAnnouncement: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Image / Poster URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              {canManagePalace && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Publication Workflow</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ApprovalStatus })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="DRAFT">DRAFT (Under construction)</option>
                    <option value="REVIEW">REVIEW (Pending verification)</option>
                    <option value="APPROVED">APPROVED (Palace Council approval)</option>
                    <option value="PUBLISHED">PUBLISHED (Live with Verified badge)</option>
                  </select>
                </div>
              )}

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow"
                >
                  {editingItem ? 'Save Updates' : canManagePalace ? 'Publish Official Notice' : 'Submit for Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
