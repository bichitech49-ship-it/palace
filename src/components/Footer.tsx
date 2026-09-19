import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  ExternalLink,
  ChevronRight,
  FileCheck,
  Building2,
  X,
} from 'lucide-react';
import { Emblem } from './Emblem';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalPolicy, setModalPolicy] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-gradient-to-b from-[#1C0E07] to-stone-900 text-stone-300 border-t-4 border-[#8C5935] relative overflow-hidden">
      {/* Subtle Arewa background geometry */}
      <div className="absolute inset-0 opacity-5 pointer-events-none arewa-pattern"></div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Identity & Crest */}
          <div className="space-y-4">
            <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60 inline-block">
              <Emblem size="md" lightMode={false} />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Official digital information, governance, and communication platform of Unguwar Kanawa, Kaduna. Dedicated to grassroots unity, peace, rapid socio-economic development, and traditional institution transparency.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Kaduna North LGA
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                Kaduna State, Nigeria
              </span>
            </div>
          </div>

          {/* Column 2: Palace Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" /> Palace Secretariat
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Unguwar Kanawa Palace Grounds, Off Sarki Road, Unguwar Kanawa, Kaduna North LGA, Kaduna State.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+234 803 000 1101 / +234 802 334 5502</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>palace@unguwar-kanawa.kaduna.gov.ng</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-stone-400">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-300">Audience Hours:</span>
                  <p>Mon - Thu: 09:00 AM – 04:00 PM</p>
                  <p>Friday: 10:00 AM – 12:30 PM (Post-Juma'at on request)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800 pb-2">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> About Community
              </button>
              <button
                onClick={() => onNavigate('palace')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Palace Council
              </button>
              <button
                onClick={() => onNavigate('military')}
                className="text-left text-amber-300 hover:text-amber-200 transition flex items-center gap-1 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" /> Military
              </button>
              <button
                onClick={() => onNavigate('paramilitary')}
                className="text-left text-amber-300 hover:text-amber-200 transition flex items-center gap-1 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" /> Paramilitary
              </button>
              <button
                onClick={() => onNavigate('police')}
                className="text-left text-amber-300 hover:text-amber-200 transition flex items-center gap-1 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" /> Police Command
              </button>
              <button
                onClick={() => onNavigate('academicians')}
                className="text-left text-amber-300 hover:text-amber-200 transition flex items-center gap-1 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" /> Academicians
              </button>
              <button
                onClick={() => onNavigate('ordinary-members')}
                className="text-left text-amber-300 hover:text-amber-200 transition flex items-center gap-1 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" /> Community Members
              </button>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Announcements
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Community Events
              </button>
              <button
                onClick={() => onNavigate('development')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Projects Tracker
              </button>
              <button
                onClick={() => onNavigate('news')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> News & Media
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Photo & Video
              </button>
              <button
                onClick={() => onNavigate('documents')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Documents & Forms
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-stone-500" /> Contact Palace
              </button>
            </div>
          </div>

          {/* Column 4: Official Verification & Security */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800 pb-2">
              Official Verification
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              All declarations and notices on this digital portal are vetted through the Unguwar Kanawa Palace Secretariat to guarantee anti-disinformation standards.
            </p>
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>Verified Public Repository</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Audit records stamped by the Palace Council. Demo placeholders provided until official installation documents are loaded.
              </p>
            </div>
            <div className="pt-1 flex items-center gap-3 text-xs text-stone-400">
              <button
                onClick={() => setModalPolicy('privacy')}
                className="hover:text-amber-400 underline transition"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setModalPolicy('terms')}
                className="hover:text-amber-400 underline transition"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            <p className="font-semibold text-stone-300">
              UNGUWAR KANAWA, KADUNA
            </p>
            <p className="text-[11px] text-stone-400">
              Official Digital Platform of the Traditional Council & Community
            </p>
          </div>

          <p className="text-[11px] text-center sm:text-right">
            © 2026 Unguwar Kanawa, Kaduna. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-stone-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-cinzel text-lg font-bold text-stone-900">
                {modalPolicy === 'privacy' ? 'Privacy Policy & Data Protection' : 'Terms of Use & Community Guidelines'}
              </h3>
              <button onClick={() => setModalPolicy(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
              {modalPolicy === 'privacy' ? (
                <>
                  <p className="font-semibold text-stone-800">
                    Protection of Residents' Data in Unguwar Kanawa:
                  </p>
                  <p>
                    The Traditional Council and Administration of Unguwar Kanawa, Kaduna prioritize individual privacy. Personal telephone numbers, residential locations, and private contact messages submitted to the palace are protected under strict administrative confidentiality and will never be sold, rented, or distributed to unauthorized third parties.
                  </p>
                  <p>
                    Registered community members have total control over whether their skills directory profiles are displayed publicly or retained in the confidential community records.
                  </p>
                  <p>
                    Confidential palace documents, internal security vigilante rosters, and arbitration files are protected by access-control protocols and restricted to verified palace administrators.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-stone-800">
                    Official Guidelines for Digital Participation:
                  </p>
                  <p>
                    1. Respect for Traditional Heritage: Users of the Unguwar Kanawa digital portal must maintain respect for traditional customs, community elders, and all ward leadership.
                  </p>
                  <p>
                    2. Anti-Defamation & Peace Preservation: Posting unverified allegations, hate speech, sectarian incitement, or false security alarms is strictly prohibited and subject to traditional council arbitration and state authorities.
                  </p>
                  <p>
                    3. Official Verification Stamping: Only announcements cleared through the Palace Secretary and Traditional Council carry the official "✓ VERIFIED OFFICIAL COMMUNITY ANNOUNCEMENT" seal.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 pt-3 border-t flex justify-end">
              <button
                onClick={() => setModalPolicy(null)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
