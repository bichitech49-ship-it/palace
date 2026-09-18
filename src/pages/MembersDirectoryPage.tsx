import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  X,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { CommunityMember } from '../types';

export const MembersDirectoryPage: React.FC = () => {
  const { members, registerMember, canEditContent } = useCommunity();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<string>('ALL');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Registration Form
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    ward: 'Ward A - Shanu Sector',
    profession: 'Trade & Commerce',
    skills: 'Small Business, Inventory Management',
    yearsInCommunity: 10,
    address: 'Unguwar Kanawa',
    isVerified: true,
  });

  const wards = [
    'Ward A - Shanu Sector',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Unguwar Kanawa Palace Grounds',
    'Railway Quarter',
  ];

  const professions = [
    'Trade & Commerce',
    'Civil Service',
    'Healthcare & Nursing',
    'Teaching & Education',
    'Electrical & Solar Engineering',
    'Carpentry & Construction',
    'Tailoring & Textiles',
    'Agriculture & Produce',
  ];

  const filtered = members.filter((m) => {
    const memberWard = m.ward || m.areaWard || '';
    const memberProfession = m.profession || m.occupation || '';
    const memberName = m.fullName || m.name || '';

    const matchWard = selectedWard === 'ALL' || memberWard === selectedWard;
    const matchSkill =
      selectedSkill === 'ALL' ||
      memberProfession.toLowerCase().includes(selectedSkill.toLowerCase()) ||
      (m.skills || []).some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));
    const matchSearch =
      memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memberProfession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchWard && matchSkill && matchSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    registerMember({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || undefined,
      ward: formData.ward,
      profession: formData.profession,
      skills: skillsList,
      yearsInCommunity: Number(formData.yearsInCommunity),
      address: formData.address,
      isVerified: false, // New self-registrations default to pending verification
      registeredDate: new Date().toISOString().substring(0, 10),
    });

    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setIsRegisterModalOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <Users className="w-4 h-4 text-amber-600" />
            <span>Community Solidarity & Skills Registry</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA RESIDENTS DIRECTORY
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Fostering grassroots commerce, mutual aid, and civic representation across all wards in Unguwar Kanawa.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
        >
          <UserPlus className="w-4 h-4 text-amber-300" />
          <span>Register as Resident</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, skill, trade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="p-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none font-medium"
            >
              <option value="ALL">All Residential Wards</option>
              {wards.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-stone-500 font-medium">
          Showing {filtered.length} registered member{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {member.fullName || member.name}
                  </h3>
                  <p className="text-xs text-blue-900 font-semibold flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    {member.profession || member.occupation}
                  </p>
                </div>

                {member.isVerified ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-950 border border-blue-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-700" /> Verified Resident
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    Pending Verification
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{member.ward || member.areaWard}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{member.phone || member.contactInfo}</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{member.email}</span>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              <div className="pt-2 border-t border-stone-100 space-y-1">
                <p className="text-[10px] font-bold text-stone-500 uppercase">Skills & Services:</p>
                <div className="flex flex-wrap gap-1.5">
                  {(member.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
              <span>Resident for: {member.yearsInCommunity ?? '5+'} years</span>
              <a
                href={`tel:${member.phone || member.contactInfo}`}
                className="text-blue-900 font-bold hover:underline"
              >
                Contact &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-cinzel text-base font-bold text-stone-900">
                  Register as Unguwar Kanawa Resident
                </h3>
                <p className="text-stone-500">Official Community Database Roll</p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {regSuccess ? (
              <div className="p-6 text-center space-y-2 bg-blue-50 rounded-2xl border border-blue-200">
                <CheckCircle2 className="w-10 h-10 text-blue-700 mx-auto" />
                <h4 className="font-bold text-blue-950 text-sm">Registration Submitted!</h4>
                <p className="text-blue-900">
                  Your record has been logged in the Unguwar Kanawa community registry. The Ward Head (Wakilin Unguwa) will authenticate your details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Legal / Known Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sani Abubakar Kanawa"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Residential Ward</label>
                    <select
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                    >
                      {wards.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Years in Community</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.yearsInCommunity}
                      onChange={(e) => setFormData({ ...formData, yearsInCommunity: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="Optional"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Primary Profession / Trade</label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    {professions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Skills & Specializations (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solar inverter repair, Wiring, Roofing"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Physical Residential Address in Unguwar Kanawa</label>
                  <input
                    type="text"
                    required
                    placeholder="House number, street name or landmark..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl shadow"
                  >
                    Register Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
