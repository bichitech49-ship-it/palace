import React, { useState } from 'react';
import {
  Shield,
  Edit3,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Info,
  X,
  Plus,
  Trash2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';

export const TraditionalRulerPage: React.FC = () => {
  const { rulerInfo, updateRulerInfo, canManagePalace } = useCommunity();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState(rulerInfo.fullName);
  const [traditionalTitle, setTraditionalTitle] = useState(rulerInfo.traditionalTitle);
  const [reignStartYear, setReignStartYear] = useState(rulerInfo.reignStartYear);
  const [officialPhotograph, setOfficialPhotograph] = useState(rulerInfo.officialPhotograph);
  const [welcomeMessage, setWelcomeMessage] = useState(rulerInfo.welcomeMessage);
  const [biography, setBiography] = useState(rulerInfo.biography);
  const [installationInfo, setInstallationInfo] = useState(rulerInfo.installationInformation);
  const [historyLines, setHistoryLines] = useState<string[]>(rulerInfo.leadershipHistory);
  const [activities, setActivities] = useState<string[]>(rulerInfo.leadershipActivities);
  const [initiatives, setInitiatives] = useState<string[]>(rulerInfo.developmentInitiatives);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRulerInfo({
      fullName,
      traditionalTitle,
      reignStartYear,
      officialPhotograph,
      welcomeMessage,
      biography,
      installationInformation: installationInfo,
      leadershipHistory: historyLines.filter((h) => h.trim().length > 0),
      leadershipActivities: activities.filter((a) => a.trim().length > 0),
      developmentInitiatives: initiatives.filter((i) => i.trim().length > 0),
      isPlaceholder: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Notice Banner (Required by prompt) */}
      {rulerInfo.isPlaceholder && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-amber-900">
            <p className="font-bold">
              Official Palace Data Notice: Editable Placeholder Profile
            </p>
            <p className="text-amber-800 leading-relaxed">
              In accordance with traditional institutional protocols, the actual name, identity, biography, and photographs of the Traditional Ruler of Unguwar Kanawa are provided as editable placeholders until officially supplied by the Palace Administration. Authorized palace administrators can update this profile at any time using the "Edit Ruler Profile" button.
            </p>
          </div>
        </div>
      )}

      {/* Main Profile Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-stone-900 text-white rounded-3xl p-6 sm:p-12 border-2 border-amber-500 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none arewa-pattern"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Portrait Container */}
          <div className="shrink-0 relative">
            <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-stone-800">
              <img
                src={rulerInfo.officialPhotograph}
                alt="Traditional Ruler of Unguwar Kanawa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-amber-500 text-stone-950 p-2 rounded-full shadow-lg border-2 border-stone-900">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          {/* Title & Key Bio Details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-900/90 border border-amber-500/40">
                <Shield className="w-3.5 h-3.5" />
                <span>The Traditional Institution of Unguwar Kanawa</span>
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2">
                THE TRADITIONAL RULER OF UNGUWAR KANAWA
              </h1>
              <p className="font-cinzel text-lg sm:text-xl font-bold text-amber-300">
                {rulerInfo.fullName}
              </p>
              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                {rulerInfo.traditionalTitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl">
              {rulerInfo.biography}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-xs px-3 py-1 rounded-lg bg-blue-900 text-amber-300 font-semibold border border-blue-800">
                Kaduna North LGA
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-stone-800 text-stone-300 font-semibold border border-stone-700">
                Unguwar Kanawa Palace
              </span>

              {canManagePalace && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Ruler Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership History & Installation Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leadership History */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-950">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="font-cinzel text-lg font-bold">Leadership History & Lineage</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            {rulerInfo.leadershipHistory.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Installation Information */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-950">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="font-cinzel text-lg font-bold">Installation & Traditional Office</h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {rulerInfo.installationInformation}
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">Custodian Role:</p>
            <p>Presiding over community traditional festivals, religious observances, and harmonious relations between Unguwar Kanawa and neighboring communities in Kaduna Metropolis.</p>
          </div>
        </section>
      </div>

      {/* Community Leadership Activities & Development Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leadership Activities */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-cinzel text-lg font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Community Leadership Activities
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {rulerInfo.leadershipActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-2 shrink-0"></span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Development Initiatives */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-cinzel text-lg font-bold text-stone-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-800" />
            Royal Development Initiatives
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {rulerInfo.developmentInitiatives.map((init, i) => (
              <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
                <span className="font-medium text-stone-800">{init}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Speeches & Official Addresses */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <h2 className="font-cinzel text-lg font-bold text-stone-900">
          Royal Speeches & Addresses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rulerInfo.speeches.map((sp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-blue-900">{sp.occasion}</span>
                <span>{sp.date}</span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{sp.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "{sp.summary}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Photographs Gallery */}
      <section className="space-y-4">
        <h2 className="font-cinzel text-xl font-bold text-stone-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-900" />
          Official Palace Photographs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {rulerInfo.officialPhotographs.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo.url)}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 text-xs text-stone-600 font-medium">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox for photographs */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedPhoto} alt="Enlarged view" className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto" />
          </div>
        </div>
      )}

      {/* Full Edit Modal for Authorized Administrators */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-stone-900">Edit Traditional Ruler Profile</h3>
                <p className="text-xs text-stone-500">Palace Administrative Control</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Traditional Title</label>
                  <input
                    type="text"
                    required
                    value={traditionalTitle}
                    onChange={(e) => setTraditionalTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Reign Commencement</label>
                  <input
                    type="text"
                    value={reignStartYear}
                    onChange={(e) => setReignStartYear(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Official Photograph URL</label>
                <input
                  type="url"
                  required
                  value={officialPhotograph}
                  onChange={(e) => setOfficialPhotograph(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Official Welcome Message</label>
                <textarea
                  rows={3}
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Biography</label>
                <textarea
                  rows={4}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Installation Information</label>
                <textarea
                  rows={2}
                  value={installationInfo}
                  onChange={(e) => setInstallationInfo(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow"
                >
                  Save Profile Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
