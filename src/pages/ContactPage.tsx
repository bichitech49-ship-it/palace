import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';

export const ContactPage: React.FC = () => {
  const { addContactMessage } = useCommunity();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    category: 'General Inquiry' as any,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContactMessage({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      category: formData.category,
      message: formData.message,
    });
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      category: 'General Inquiry',
      message: '',
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const emergencyContacts = [
    { name: 'Unguwar Kanawa Palace Security Desk', number: '+234 803 000 1101', role: 'Palace Watch' },
    { name: 'Kaduna North Police Divisional HQ', number: '+234 807 999 1234', role: 'State Police' },
    { name: 'Unguwar Kanawa Vigilante Group (Yan Sintiri)', number: '+234 802 555 4321', role: 'Community Patrol' },
    { name: 'Kaduna State Emergency Services (SEMA)', number: '112 / 0803 123 4567', role: 'Disaster / Emergency' },
    { name: 'Kaduna State Fire Service Command', number: '+234 803 700 8000', role: 'Fire Emergency' },
    { name: 'Unguwar Kanawa Primary Health Emergency', number: '+234 805 222 3344', role: 'Medical Ambulance' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Palace Secretariat & Traditional Council</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-900">
          CONTACT UNGUWAR KANAWA PALACE
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Submit formal correspondence, request traditional council audience, initiate dispute arbitration (sulhu), or access local emergency services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-900" />
              Send Official Correspondence
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Your message is routed directly to the Palace Secretary and registered in the administrative log.
            </p>
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />
              <span>
                Your correspondence has been received by the Unguwar Kanawa Palace Secretariat. A confirmation reference has been recorded.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Aliyu"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Telephone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Optional for receiving digital reply"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Correspondence Nature *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Audience Request">Request Palace Audience with Ruler/Council</option>
                  <option value="Dispute Mediation (Sulhu)">Dispute Mediation / Family Sulhu</option>
                  <option value="Development Suggestion">Community Development Suggestion</option>
                  <option value="Security Alert">Security Notice / Vigilante Matter</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Subject of Correspondence *</label>
              <input
                type="text"
                required
                placeholder="e.g. Request for audience regarding Ward A borehole maintenance"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Detailed Message / Petition *</label>
              <textarea
                rows={5}
                required
                placeholder="Please state your request, inquiry, or arbitration petition clearly..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Message to Secretariat</span>
            </button>
          </form>
        </div>

        {/* Right: Palace Secretariat Details & Emergency Directory */}
        <div className="lg:col-span-5 space-y-6">
          {/* Palace Secretariat Information Box */}
          <div className="bg-gradient-to-br from-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-xl space-y-6">
            <div className="border-b border-blue-900/60 pb-3">
              <h3 className="font-cinzel text-lg font-bold text-amber-400">
                Palace Secretariat
              </h3>
              <p className="text-xs text-stone-300">
                Administrative Seat of the Traditional Council
              </p>
            </div>

            <ul className="space-y-4 text-xs text-stone-200">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">Official Address:</span>
                  <span>
                    Unguwar Kanawa Palace Grounds, Off Sarki Road, Unguwar Kanawa, Kaduna North LGA, Kaduna State, Nigeria.
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Secretariat Hotlines:</span>
                  <span>+234 803 000 1101 / +234 802 334 5502</span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Email Dispatch:</span>
                  <span>palace@unguwar-kanawa.kaduna.gov.ng</span>
                </div>
              </li>

              <li className="flex items-start gap-3 border-t border-blue-900/60 pt-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">Official Audience Hours:</span>
                  <p>Monday - Thursday: 09:00 AM – 04:00 PM</p>
                  <p>Friday: 10:00 AM – 12:30 PM</p>
                  <p className="text-stone-400 text-[11px] mt-0.5">Special audience on appointment with Palace Secretary.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts Box */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="font-cinzel text-sm font-bold text-stone-900">
                Kaduna North Emergency Hotlines
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              {emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <div>
                    <p className="font-semibold text-stone-800">{contact.name}</p>
                    <span className="text-[10px] text-stone-500">{contact.role}</span>
                  </div>
                  <a
                    href={`tel:${contact.number.split('/')[0].trim()}`}
                    className="font-bold text-blue-900 hover:text-blue-950 px-2 py-1 bg-blue-50 rounded text-[11px]"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
