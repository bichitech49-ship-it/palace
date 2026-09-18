import React, { useState } from 'react';
import { Bell, X, Check, Send, Smartphone, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { notifications, markNotificationRead, broadcastNotification, canEditContent } = useCommunity();
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);
  const [bTitle, setBTitle] = useState('');
  const [bMessage, setBMessage] = useState('');
  const [bCategory, setBCategory] = useState<'Palace' | 'Security' | 'Event' | 'Development' | 'General'>('Palace');
  const [channels, setChannels] = useState({
    inApp: true,
    sms: true,
    whatsapp: true,
  });
  const [broadcastFeedback, setBroadcastFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle.trim() || !bMessage.trim()) return;

    broadcastNotification(bTitle, bMessage, bCategory, channels);
    setBroadcastFeedback(
      `Dispatched successfully! Simulated delivery to Unguwar Kanawa registered residents via ${
        channels.sms ? 'SMS Gateway, ' : ''
      }${channels.whatsapp ? 'WhatsApp Broadcast Channel, ' : ''}and In-App feed.`
    );
    setBTitle('');
    setBMessage('');
    setTimeout(() => {
      setBroadcastFeedback(null);
      setShowBroadcastForm(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-900 text-amber-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base tracking-wide">Unguwar Kanawa Alerts</h3>
              <p className="text-xs text-blue-200">Community notifications & official bulletins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 flex-1 space-y-4">
          {canEditContent && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-900 uppercase">Palace Dispatch Console</p>
                <p className="text-xs text-amber-700">Broadcast notice to residents via App, SMS & WhatsApp</p>
              </div>
              <button
                onClick={() => setShowBroadcastForm(!showBroadcastForm)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white transition flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                {showBroadcastForm ? 'Hide Form' : 'Broadcast Alert'}
              </button>
            </div>
          )}

          {/* Broadcast Form for Admins */}
          {showBroadcastForm && canEditContent && (
            <form onSubmit={handleBroadcast} className="p-4 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> New Community Broadcast
              </h4>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Headline / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urgent Security Update on Night Curfew"
                  value={bTitle}
                  onChange={(e) => setBTitle(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-blue-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={bCategory}
                    onChange={(e) => setBCategory(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="Palace">Palace Notice</option>
                    <option value="Security">Security Emergency</option>
                    <option value="Development">Development Project</option>
                    <option value="Event">Community Event</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Target</label>
                  <div className="text-xs text-stone-600 p-2 bg-stone-100 rounded-lg border">
                    All Unguwar Kanawa Wards
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message Body</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide concise details for residents..."
                  value={bMessage}
                  onChange={(e) => setBMessage(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-blue-700 outline-none"
                />
              </div>

              {/* Channels checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Distribution Channels:</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.inApp}
                      onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
                      className="accent-blue-800 rounded"
                    />
                    In-App Feed
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                      className="accent-blue-800 rounded"
                    />
                    <Smartphone className="w-3.5 h-3.5 text-blue-800 inline" /> SMS Gateways
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.whatsapp}
                      onChange={(e) => setChannels({ ...channels, whatsapp: e.target.checked })}
                      className="accent-blue-800 rounded"
                    />
                    <MessageSquare className="w-3.5 h-3.5 text-blue-700 inline" /> WhatsApp Channels
                  </label>
                </div>
              </div>

              {broadcastFeedback && (
                <div className="p-2.5 bg-blue-100 border border-blue-300 text-blue-950 text-xs rounded-lg font-medium">
                  {broadcastFeedback}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Alert
                </button>
              </div>
            </form>
          )}

          {/* Notifications List */}
          <div className="space-y-2.5">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-sm">
                No new notifications at this time.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-xl border transition flex items-start gap-3 ${
                    n.isRead
                      ? 'bg-stone-50 border-stone-200 text-stone-700'
                      : 'bg-blue-50/70 border-blue-200 text-stone-900 font-medium'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      n.category === 'Security'
                        ? 'bg-red-100 text-red-700'
                        : n.category === 'Development'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {n.category === 'Security' ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                        {n.category}
                      </span>
                      <span className="text-[11px] text-stone-400">{n.date}</span>
                    </div>
                    <h5 className="text-xs font-bold mt-0.5">{n.title}</h5>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{n.message}</p>
                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-stone-200/50">
                      {n.linkToTab && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate(n.linkToTab!);
                          }}
                          className="text-[11px] font-semibold text-blue-900 hover:underline"
                        >
                          View Details &rarr;
                        </button>
                      )}
                      {!n.isRead && (
                        <button
                          onClick={() => markNotificationRead(n.id)}
                          className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-blue-700" /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 text-xs text-stone-500 flex items-center justify-between">
          <span>Official Unguwar Kanawa Alert Service</span>
          <button onClick={onClose} className="text-blue-900 font-medium hover:underline">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
