import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  CheckCircle,
  X,
  Filter,
  Download,
  AlertCircle,
  Share2,
  Trash2,
  Edit2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { CommunityEvent, EventCategory } from '../types';

export const EventsPage: React.FC<{ initialSelectedId?: string }> = ({ initialSelectedId }) => {
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    canEditContent,
    currentUser,
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(() => {
    if (initialSelectedId) {
      return events.find((e) => e.id === initialSelectedId) || null;
    }
    return null;
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);
  const [rsvpSuccessMsg, setRsvpSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().substring(0, 10),
    time: '10:00 AM',
    venue: 'Unguwar Kanawa Palace Grounds',
    category: 'Community Meeting' as EventCategory,
    organizer: 'Palace Secretariat & Traditional Council',
    targetAudience: 'All Residents of Unguwar Kanawa',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    isPast: false,
  });

  const categories: EventCategory[] = [
    'Traditional Celebration',
    'Community Meeting',
    'Youth Program',
    'Women Program',
    'Religious Program',
    'Sanitation Exercise',
    'Sports/Recreation',
  ];

  const filteredEvents = events.filter((e) => {
    const matchTab = activeTab === 'UPCOMING' ? !e.isPast : e.isPast;
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    return matchTab && matchCat;
  });

  const openCreateModal = () => {
    setFormData({
      name: '',
      date: new Date().toISOString().substring(0, 10),
      time: '10:00 AM',
      venue: 'Unguwar Kanawa Palace Grounds',
      category: 'Community Meeting',
      organizer: 'Palace Secretariat & Traditional Council',
      targetAudience: 'All Residents of Unguwar Kanawa',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      isPast: false,
    });
    setEditingEvent(null);
    setIsCreating(true);
  };

  const openEditModal = (evt: CommunityEvent) => {
    setFormData({
      name: evt.name,
      date: evt.date,
      time: evt.time,
      venue: evt.venue,
      category: evt.category,
      organizer: evt.organizer,
      targetAudience: evt.targetAudience || 'All Community Members',
      description: evt.description,
      imageUrl: evt.imageUrl || evt.posterUrl || '',
      isPast: evt.isPast ?? false,
    });
    setEditingEvent(evt);
    setIsCreating(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        category: formData.category,
        organizer: formData.organizer,
        targetAudience: formData.targetAudience,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        posterUrl: formData.imageUrl || editingEvent.posterUrl,
        isPast: formData.isPast,
      });
    } else {
      addEvent({
        name: formData.name,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        category: formData.category,
        organizer: formData.organizer,
        targetAudience: formData.targetAudience,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        posterUrl:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        contactInfo: 'Palace Secretariat desk',
        isPast: formData.isPast,
      });
    }
    setIsCreating(false);
  };

  const handleRsvp = (eventTitle: string) => {
    setRsvpSuccessMsg(`RSVP Confirmed for "${eventTitle}". Your seat has been reserved in the Palace guest register.`);
    setTimeout(() => setRsvpSuccessMsg(null), 5000);
  };

  const downloadCalendarFile = (evt: CommunityEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Unguwar Kanawa Community Palace//Events//EN
BEGIN:VEVENT
SUMMARY:${evt.name}
DESCRIPTION:${evt.description}
LOCATION:${evt.venue}
ORGANIZER;CN=${evt.organizer}:mailto:palace@unguwar-kanawa.kaduna.gov.ng
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.name.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
            <CalendarIcon className="w-4 h-4 text-blue-900" />
            <span>Community Calendar & Programs</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA COMMUNITY EVENTS
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Official palace hearings, civic meetings, youth empowerment workshops, women symposiums, and sanitation drives.
          </p>
        </div>

        {canEditContent && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Schedule New Event</span>
          </button>
        )}
      </div>

      {rsvpSuccessMsg && (
        <div className="p-4 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-blue-700" />
          <span>{rsvpSuccessMsg}</span>
        </div>
      )}

      {/* View Switcher & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        {/* Upcoming vs Past Toggle */}
        <div className="flex items-center p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'UPCOMING'
                ? 'bg-blue-900 text-white shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('PAST')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'PAST'
                ? 'bg-blue-900 text-white shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Past Events Archive
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium text-stone-700 outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-500 space-y-2">
            <CalendarIcon className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-bold text-stone-700 text-sm">No events found in this category</p>
            <p className="text-xs">Check back soon for new community schedule additions.</p>
          </div>
        ) : (
          filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
            >
              {item.imageUrl && (
                <div className="h-44 bg-stone-100 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/80 text-white px-2.5 py-1 rounded-md text-[11px] font-bold backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-blue-900 flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedEvent(item)}
                    className="font-bold text-stone-900 text-base leading-snug group-hover:text-blue-900 transition cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 space-y-1 text-xs text-stone-500 border-t border-stone-100">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="line-clamp-1">Audience: {item.targetAudience}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {!item.isPast && (
                      <button
                        onClick={() => handleRsvp(item.name)}
                        className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg text-[11px] transition shadow"
                      >
                        Attend / RSVP
                      </button>
                    )}
                    <button
                      onClick={() => downloadCalendarFile(item)}
                      className="p-1.5 text-stone-600 hover:text-blue-900 rounded-lg hover:bg-stone-100"
                      title="Download Calendar Reminder (.ics)"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {canEditContent && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-stone-500 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete event "${item.name}"?`)) {
                            deleteEvent(item.id);
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-950">
                  {selectedEvent.category}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-2">
                  {selectedEvent.name}
                </h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedEvent.imageUrl && (
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.name}
                className="w-full h-48 object-cover rounded-2xl"
              />
            )}

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-stone-700">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-900" />
                <span><strong>Date:</strong> {selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-900" />
                <span><strong>Time:</strong> {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span><strong>Venue:</strong> {selectedEvent.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-900" />
                <span><strong>Target Audience:</strong> {selectedEvent.targetAudience}</span>
              </div>
              <div>
                <span><strong>Organizer:</strong> {selectedEvent.organizer}</span>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
              {selectedEvent.description}
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <button
                onClick={() => downloadCalendarFile(selectedEvent)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export to Calendar (.ics)</span>
              </button>
              <button
                onClick={() => {
                  handleRsvp(selectedEvent.name);
                  setSelectedEvent(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold shadow"
              >
                Confirm Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {editingEvent ? 'Edit Community Event' : 'Schedule Community Event'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Event Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unguwar Kanawa Peace Football Tournament Final"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label className="block font-bold text-stone-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 09:30 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
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
                  <label className="block font-bold text-stone-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Venue / Location</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Organizer</label>
                <input
                  type="text"
                  required
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Event Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPastCheck"
                  checked={formData.isPast}
                  onChange={(e) => setFormData({ ...formData, isPast: e.target.checked })}
                  className="rounded border-stone-300 text-blue-900"
                />
                <label htmlFor="isPastCheck" className="text-stone-700 font-semibold">
                  Mark as Past Event Archive
                </label>
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
                  {editingEvent ? 'Save Event' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
