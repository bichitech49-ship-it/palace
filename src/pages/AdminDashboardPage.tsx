import React, { useState } from 'react';
import {
  Shield,
  Bell,
  Users,
  Hammer,
  FileText,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  Eye,
  Check,
  RefreshCw,
  Edit2,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { ApprovalStatus, UserRole } from '../types';

interface AdminDashboardPageProps {
  onNavigate: (tab: string, id?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    switchUserRole,
    announcements,
    updateAnnouncementStatus,
    projects,
    palaceMembers,
    togglePalaceMemberStatus,
    members,
    contactMessages,
    updateMessageStatus,
    auditLogs,
    rulerInfo,
    canManagePalace,
    canEditContent,
  } = useCommunity();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'PIPELINE' | 'MESSAGES' | 'ROSTER' | 'AUDIT'
  >('PIPELINE');

  const [auditSearch, setAuditSearch] = useState('');

  // Stats calculation
  const totalAnnouncements = announcements.length;
  const publishedCount = announcements.filter((a) => a.status === 'PUBLISHED').length;
  const pendingReviewCount = announcements.filter((a) => a.status === 'REVIEW').length;
  const draftCount = announcements.filter((a) => a.status === 'DRAFT').length;

  const totalProjects = projects.length;
  const ongoingProjects = projects.filter((p) => p.status === 'ONGOING').length;
  const completedProjects = projects.filter((p) => p.status === 'COMPLETED').length;

  const pendingMessages = contactMessages.filter((m) => m.status === 'PENDING').length;

  const filteredLogs = auditLogs.filter((log) => {
    const details = log.details || '';
    const user = log.userName || log.user || '';
    return (
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      user.toLowerCase().includes(auditSearch.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner & Role Indicator */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-500/60 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Palace Secretariat Executive Control Panel
              </span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              UNGUWAR KANAWA PALACE MANAGEMENT DASHBOARD
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Authenticated Operator: <strong>{currentUser.name}</strong> • Role: <strong>{currentUser.role}</strong>
            </p>
          </div>

          {/* Quick Role Switcher for Testing RBAC */}
          <div className="bg-stone-800/90 p-3 rounded-2xl border border-stone-700 space-y-1.5 shrink-0">
            <label className="block text-[11px] font-bold text-amber-300 uppercase">
              Demonstration Role Switcher:
            </label>
            <select
              value={currentUser.role}
              onChange={(e) => switchUserRole(e.target.value as UserRole)}
              className="w-full text-xs p-2 rounded-lg bg-stone-900 border border-stone-600 text-white outline-none"
            >
              <option value="SUPER_ADMIN">SUPER_ADMIN (Palace Secretary)</option>
              <option value="PALACE_ADMIN">PALACE_ADMIN (Traditional Council Lead)</option>
              <option value="EDITOR">EDITOR (CDC Media Officer)</option>
              <option value="COMMUNITY_MEMBER">COMMUNITY_MEMBER (Unguwar Kanawa Resident)</option>
              <option value="VISITOR">VISITOR (Public / Non-Admin)</option>
            </select>
          </div>
        </div>

        {/* Permission Guard Notice */}
        {!canEditContent && (
          <div className="p-3 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              You are currently previewing as <strong>{currentUser.role}</strong>. Switch to <strong>SUPER_ADMIN</strong> or <strong>PALACE_ADMIN</strong> above to test full verification, publishing, and roster modification capabilities.
            </span>
          </div>
        )}
      </div>

      {/* 1. KEY KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Bulletins</span>
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {totalAnnouncements}
          </p>
          <p className="text-[11px] text-blue-900 font-medium">
            {publishedCount} Published • {pendingReviewCount} In Review
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Development</span>
            <Hammer className="w-4 h-4 text-blue-900" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {totalProjects}
          </p>
          <p className="text-[11px] text-stone-600 font-medium">
            {ongoingProjects} Ongoing • {completedProjects} Done
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Palace Officers</span>
            <Shield className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {palaceMembers.length}
          </p>
          <p className="text-[11px] text-stone-600 font-medium">
            {palaceMembers.filter((m) => m.isActive).length} Active in Council
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Residents</span>
            <Users className="w-4 h-4 text-blue-900" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {members.length}
          </p>
          <p className="text-[11px] text-stone-600 font-medium">
            Across all 5 autonomous sectors
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Secretariat Inquiries</span>
            <Mail className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {pendingMessages}
          </p>
          <p className="text-[11px] text-red-700 font-medium">
            {pendingMessages} Pending Council Review
          </p>
        </div>
      </div>

      {/* 2. ADMIN NAVIGATION TABS */}
      <div className="flex items-center p-1.5 bg-stone-200/80 rounded-2xl overflow-x-auto text-xs font-bold gap-1">
        <button
          onClick={() => setActiveAdminTab('PIPELINE')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'PIPELINE'
              ? 'bg-blue-900 text-white shadow'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Announcement Verification Pipeline ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('MESSAGES')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'MESSAGES'
              ? 'bg-blue-900 text-white shadow'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Correspondence Desk ({contactMessages.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('ROSTER')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'ROSTER'
              ? 'bg-blue-900 text-white shadow'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Palace Roster Quick-Manager ({palaceMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('AUDIT')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'AUDIT'
              ? 'bg-blue-900 text-white shadow'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Official Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* 3. TAB 1: ANNOUNCEMENT VERIFICATION PIPELINE */}
      {activeAdminTab === 'PIPELINE' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-stone-900">
                Official Announcement Vetting Pipeline
              </h2>
              <p className="text-xs text-stone-500">
                Workflow mandated: DRAFT &rarr; REVIEW &rarr; APPROVED &rarr; PUBLISHED
              </p>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-bold text-blue-900 hover:underline"
            >
              Go to Full Announcements Gazette &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold text-stone-600 uppercase border-y border-stone-200">
                <tr>
                  <th className="py-3 px-4">Title & Category</th>
                  <th className="py-3 px-4">Issuing Authority</th>
                  <th className="py-3 px-4">Creator / Approver</th>
                  <th className="py-3 px-4">Current Workflow Status</th>
                  <th className="py-3 px-4 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {announcements.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-stone-900">{item.title}</p>
                      <span className="text-[10px] text-blue-900 font-semibold">{item.category}</span>
                    </td>
                    <td className="py-3 px-4">{item.issuingAuthority}</td>
                    <td className="py-3 px-4">
                      <p>Created: {item.creator}</p>
                      {item.approver && <p className="text-stone-500 text-[11px]">Approved: {item.approver}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          item.status === 'PUBLISHED'
                            ? 'bg-blue-100 text-blue-950 border border-blue-300'
                            : item.status === 'APPROVED'
                            ? 'bg-sky-100 text-sky-900 border border-sky-300'
                            : item.status === 'REVIEW'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {canManagePalace ? (
                        <div className="flex items-center justify-end gap-1.5">
                          {item.status !== 'PUBLISHED' ? (
                            <button
                              onClick={() => updateAnnouncementStatus(item.id, 'PUBLISHED')}
                              className="px-3 py-1 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg text-[11px] shadow"
                            >
                              Publish & Verify
                            </button>
                          ) : (
                            <button
                              onClick={() => updateAnnouncementStatus(item.id, 'REVIEW')}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-[11px]"
                            >
                              Revoke to Review
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">Requires Palace Admin</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: CORRESPONDENCE DESK */}
      {activeAdminTab === 'MESSAGES' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              Palace Secretariat Correspondence & Audience Requests
            </h2>
            <p className="text-xs text-stone-500">
              Direct petitions and dispute arbitration requests submitted by residents and visitors
            </p>
          </div>

          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-2xl border border-stone-200 space-y-3 bg-stone-50/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-950">
                        {msg.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          msg.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-900'
                            : msg.status === 'REVIEWED'
                            ? 'bg-sky-100 text-sky-900'
                            : 'bg-blue-100 text-blue-950'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm mt-1">{msg.subject}</h3>
                    <p className="text-xs text-stone-500">
                      From: <strong>{msg.fullName}</strong> • Phone: {msg.phone} {msg.email && `• ${msg.email}`}
                    </p>
                  </div>
                  <span className="text-xs text-stone-400">{msg.date}</span>
                </div>

                <p className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                  "{msg.message}"
                </p>

                {canManagePalace && (
                  <div className="flex items-center justify-end gap-2 pt-1 text-xs">
                    <span className="text-stone-500">Status Action:</span>
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'REVIEWED')}
                      className="px-2.5 py-1 bg-sky-50 text-sky-800 font-semibold rounded-lg hover:bg-sky-100"
                    >
                      Mark Reviewed
                    </button>
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'ADDRESSED')}
                      className="px-2.5 py-1 bg-blue-50 text-blue-900 font-bold rounded-lg hover:bg-blue-100"
                    >
                      Mark Addressed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: PALACE ROSTER QUICK-MANAGER */}
      {activeAdminTab === 'ROSTER' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-stone-900">
                Palace Council Active Status Roster
              </h2>
              <p className="text-xs text-stone-500">
                Activate or suspend public visibility of traditional council leaders
              </p>
            </div>
            <button
              onClick={() => onNavigate('palace')}
              className="text-xs font-bold text-blue-900 hover:underline"
            >
              Open Full Palace Directory Page &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {palaceMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3 bg-stone-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.photograph}
                    alt={member.fullName}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">{member.fullName}</h4>
                    <p className="text-[11px] text-amber-800 font-semibold">{member.traditionalTitle}</p>
                    <p className="text-[10px] text-stone-500">{member.areaWard}</p>
                  </div>
                </div>

                {canManagePalace && (
                  <button
                    onClick={() => togglePalaceMemberStatus(member.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      member.isActive
                        ? 'bg-blue-100 text-blue-950 border border-blue-300'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 4: OFFICIAL AUDIT LOG INSPECTOR */}
      {activeAdminTab === 'AUDIT' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-stone-900">
                Palace Council Official Audit Trail
              </h2>
              <p className="text-xs text-stone-500">
                Immutable chronological log of all administrative creations, status approvals, and modifications
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 text-xs outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold text-stone-600 uppercase border-y border-stone-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Administrator / Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Record Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50 transition">
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-500">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-stone-900">{log.userName}</p>
                      <span className="text-[10px] text-blue-900 font-semibold">{log.userRole}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-800">{log.action}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-600">{log.entity}</td>
                    <td className="py-3 px-4 text-stone-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
