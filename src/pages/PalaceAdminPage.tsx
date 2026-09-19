import React, { useState } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Shield,
  Filter,
  X,
  UserCheck,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { PalaceMember, PalacePosition } from '../types';

export const PalaceAdminPage: React.FC = () => {
  const {
    palaceMembers,
    addPalaceMember,
    updatePalaceMember,
    togglePalaceMemberStatus,
    deletePalaceMember,
    canManagePalace,
  } = useCommunity();

  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [activeMemberModal, setActiveMemberModal] = useState<PalaceMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingMember, setEditingMember] = useState<PalaceMember | null>(null);

  // Form states for creating / editing
  const [formData, setFormData] = useState({
    fullName: '',
    traditionalTitle: '',
    position: 'Traditional Council Member' as PalacePosition,
    areaWard: 'Unguwar Kanawa Central',
    responsibilities: '',
    shortBiography: '',
    photograph: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    phone: '',
    email: '',
    isActive: true,
  });

  const positions: PalacePosition[] = [
    'Traditional Ruler',
    'Palace Secretary',
    'Traditional Council Member',
    'Ward Leader',
    'Village/Community Head',
    'Palace Adviser',
    'Youth Representative',
    'Women Representative',
    'Community Development Committee',
    'Other Palace Officer',
  ];

  const wards = [
    'ALL',
    'Unguwar Kanawa Palace Grounds',
    'Central Palace Zone',
    'Ward A - Shanu Sector',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Unguwar Kanawa Central',
  ];

  const filteredMembers = palaceMembers.filter((m) => {
    const matchPos = selectedPosition === 'ALL' || m.position === selectedPosition;
    const matchWard = selectedWard === 'ALL' || m.areaWard.toLowerCase().includes(selectedWard.toLowerCase());
    return matchPos && matchWard;
  });

  const openCreateModal = () => {
    setFormData({
      fullName: '',
      traditionalTitle: '',
      position: 'Traditional Council Member',
      areaWard: 'Unguwar Kanawa Central',
      responsibilities: 'Grassroots community administration and council representation.',
      shortBiography: 'Dedicated community leader serving the people of Unguwar Kanawa.',
      photograph: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      phone: '+234 800 000 0000',
      email: 'officer@unguwar-kanawa.kaduna.gov.ng',
      isActive: true,
    });
    setEditingMember(null);
    setIsCreating(true);
  };

  const openEditModal = (member: PalaceMember) => {
    setFormData({
      fullName: member.fullName,
      traditionalTitle: member.traditionalTitle,
      position: member.position,
      areaWard: member.areaWard,
      responsibilities: member.responsibilities.join('\n'),
      shortBiography: member.shortBiography,
      photograph: member.photograph,
      phone: member.phone || '',
      email: member.email || '',
      isActive: member.isActive,
    });
    setEditingMember(member);
    setIsCreating(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilitiesArray = formData.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    if (editingMember) {
      updatePalaceMember(editingMember.id, {
        fullName: formData.fullName,
        traditionalTitle: formData.traditionalTitle,
        position: formData.position,
        areaWard: formData.areaWard,
        responsibilities: responsibilitiesArray,
        shortBiography: formData.shortBiography,
        photograph: formData.photograph,
        phone: formData.phone,
        email: formData.email,
        isActive: formData.isActive,
      });
    } else {
      addPalaceMember({
        fullName: formData.fullName,
        traditionalTitle: formData.traditionalTitle,
        position: formData.position,
        areaWard: formData.areaWard,
        responsibilities: responsibilitiesArray,
        shortBiography: formData.shortBiography,
        photograph: formData.photograph,
        phone: formData.phone,
        email: formData.email,
        isActive: formData.isActive,
        order: palaceMembers.length + 1,
      });
    }
    setIsCreating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <Shield className="w-4 h-4 text-amber-600" />
            <span>Governance & Traditional Council</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA PALACE ADMINISTRATION
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            Official seat of traditional authority and royal leadership representing the reigning Hakimi and revered late Hakimi of Unguwar Kanawa.
          </p>
        </div>

        {canManagePalace && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add Palace Member</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          <span className="font-bold text-stone-700">Filter Position:</span>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium text-stone-700 outline-none"
          >
            <option value="ALL">All Positions ({palaceMembers.length})</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing {filteredMembers.length} member{filteredMembers.length > 1 ? 's' : ''} in Unguwar Kanawa
        </div>
      </div>

      {/* Palace Member Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between ${
              member.isActive ? 'border-stone-200' : 'border-stone-300 opacity-75 bg-stone-50/70'
            }`}
          >
            {/* Card Header & Photo */}
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-stone-100 shrink-0">
                  <img
                    src={member.photograph}
                    alt={member.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                    {member.position}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm leading-snug">
                    {member.fullName}
                  </h3>
                  <p className="text-xs text-amber-800 font-semibold">{member.traditionalTitle}</p>
                </div>
              </div>

              {/* Area & Bio */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                  <span>{member.areaWard}</span>
                </div>
                <p className="text-stone-600 line-clamp-3 leading-relaxed">
                  {member.shortBiography}
                </p>
              </div>

              {/* Responsibilities list snippet */}
              <div className="space-y-1 pt-2">
                <p className="text-[11px] font-bold text-stone-700 uppercase">Core Responsibilities:</p>
                <ul className="text-xs text-stone-600 space-y-1">
                  {member.responsibilities.slice(0, 2).map((res, i) => (
                    <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="w-1 h-1 rounded-full bg-blue-800 mt-2 shrink-0"></span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Status & Admin Controls */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {member.id === 'pm-predecessor' || member.traditionalTitle.includes('Predecessor') ? (
                  <span className="flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    ★ Royal Archival Lineage
                  </span>
                ) : member.isActive ? (
                  <span className="flex items-center gap-1 text-blue-800 font-semibold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" /> Active Profile
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-stone-500 font-semibold text-[11px]">
                    <XCircle className="w-3.5 h-3.5" /> Inactive
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMemberModal(member)}
                  className="text-blue-900 hover:underline font-bold text-xs"
                >
                  Full Bio &rarr;
                </button>

                {canManagePalace && (
                  <div className="flex items-center gap-1 border-l pl-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1 text-stone-600 hover:text-blue-900 rounded"
                      title="Edit Member"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => togglePalaceMemberStatus(member.id)}
                      className="p-1 text-stone-600 hover:text-amber-600 rounded"
                      title={member.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${member.fullName} from directory?`)) {
                          deletePalaceMember(member.id);
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
          </div>
        ))}
      </div>

      {/* Member Details Modal */}
      {activeMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeMemberModal.photograph}
                  alt={activeMemberModal.fullName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow"
                />
                <div>
                  <h3 className="font-cinzel text-base font-bold text-stone-900">
                    {activeMemberModal.fullName}
                  </h3>
                  <p className="text-xs text-amber-800 font-semibold">
                    {activeMemberModal.traditionalTitle}
                  </p>
                  <p className="text-[11px] text-blue-900 font-medium">
                    {activeMemberModal.position} • {activeMemberModal.areaWard}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveMemberModal(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 uppercase text-[11px]">Biography</h4>
                <p className="mt-1">{activeMemberModal.shortBiography}</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase text-[11px]">Official Responsibilities</h4>
                <ul className="mt-1 space-y-1.5 list-disc list-inside">
                  {activeMemberModal.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {(activeMemberModal.phone || activeMemberModal.email) && (
                <div className="pt-2 border-t space-y-1 text-stone-600">
                  <h4 className="font-bold text-stone-900 uppercase text-[11px]">Palace Contact</h4>
                  {activeMemberModal.phone && (
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-800" /> {activeMemberModal.phone}
                    </p>
                  )}
                  {activeMemberModal.email && (
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-800" /> {activeMemberModal.email}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setActiveMemberModal(null)}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Member Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {editingMember ? 'Edit Palace Member Profile' : 'Add New Palace Member'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Malam Haruna Sani"
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Traditional Title</label>
                  <input
                    type="text"
                    required
                    value={formData.traditionalTitle}
                    onChange={(e) => setFormData({ ...formData, traditionalTitle: e.target.value })}
                    placeholder="e.g. Wakilin Kasuwa"
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as PalacePosition })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none bg-white"
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Area / Ward</label>
                  <input
                    type="text"
                    required
                    value={formData.areaWard}
                    onChange={(e) => setFormData({ ...formData, areaWard: e.target.value })}
                    placeholder="e.g. Ward A - Shanu"
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Photo URL</label>
                  <input
                    type="url"
                    required
                    value={formData.photograph}
                    onChange={(e) => setFormData({ ...formData, photograph: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortBiography}
                  onChange={(e) => setFormData({ ...formData, shortBiography: e.target.value })}
                  placeholder="Experience and leadership summary..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Supervise ward sanitation&#10;Resolve family boundary disputes"
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow"
                >
                  {editingMember ? 'Save Changes' : 'Add Palace Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
