import React, { useState } from 'react';
import {
  FileText,
  Download,
  Lock,
  Search,
  Plus,
  Filter,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Calendar,
  X,
  Trash2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { DocumentCategory, PalaceDocument } from '../types';

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument, deleteDocument, canEditContent, canManagePalace, currentUser } =
    useCommunity();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Palace Declaration' as DocumentCategory,
    description: '',
    publicationDate: new Date().toISOString().substring(0, 10),
    fileSize: '1.2 MB',
    fileType: 'PDF' as 'PDF' | 'DOCX' | 'XLSX',
    isPublic: true,
    fileUrl: '#',
  });

  const categories: DocumentCategory[] = [
    'Palace Declaration',
    'Community Constitution/Bye-Laws',
    'Meeting Minutes',
    'Development Plan',
    'Financial Report',
    'Security Guidelines',
  ];

  // Restrict confidential docs
  const visibleDocs = documents.filter((doc) => {
    if (doc.isPublic) return true;
    return canManagePalace;
  });

  const filtered = visibleDocs.filter((doc) => {
    const matchCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (doc: PalaceDocument) => {
    setDownloadNotice(`Downloading "${doc.title}" (${doc.fileSize} ${doc.fileType}). Verified Palace Document.`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      publicationDate: formData.publicationDate,
      uploadDate: formData.publicationDate,
      fileSize: formData.fileSize,
      fileType: formData.fileType,
      isPublic: formData.isPublic,
      isConfidential: !formData.isPublic,
      downloadUrl: formData.fileUrl,
      fileUrl: formData.fileUrl,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Official Repository & Public Gazettes</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            PALACE & COMMUNITY DOCUMENTS REPOSITORY
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Download authorized council resolutions, community constitution, sanitation bye-laws, financial development disclosures, and security protocols.
          </p>
        </div>

        {canManagePalace && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Upload Official Document</span>
          </button>
        )}
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none font-medium"
            >
              <option value="ALL">All Document Types</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-stone-500 font-medium">
          Showing {filtered.length} document{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-950 border border-blue-200">
                  {doc.category}
                </span>

                <div className="flex items-center gap-2">
                  {!doc.isPublic ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Confidential Palace Doc
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      Public Document
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-stone-900 text-sm leading-snug">
                {doc.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {doc.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {doc.publicationDate || doc.uploadDate}
                </span>
                <span>•</span>
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span className="font-semibold text-blue-900">{doc.fileType}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleDownload(doc)}
                className="px-4 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download Official File</span>
              </button>

              {canManagePalace && (
                <button
                  onClick={() => {
                    if (confirm(`Remove document "${doc.title}"?`)) {
                      deleteDocument(doc.id);
                    }
                  }}
                  className="p-1 text-stone-400 hover:text-red-600"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                Upload Document to Palace Repository
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unguwar Kanawa Drainage Maintenance Bye-Laws 2026"
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as DocumentCategory })}
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
                  <label className="block font-bold text-stone-700 mb-1">File Format</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fileType: e.target.value as 'PDF' | 'DOCX' | 'XLSX',
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="PDF">PDF Gazette</option>
                    <option value="DOCX">Word Document</option>
                    <option value="XLSX">Spreadsheet / Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Summary / Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Official council summary and applicability..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">File Size Estimate</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    required
                    value={formData.publicationDate}
                    onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPublicCheck"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="rounded border-stone-300 text-blue-900"
                />
                <label htmlFor="isPublicCheck" className="text-stone-700 font-semibold">
                  Make Publicly Available to all Community Residents
                </label>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl shadow"
                >
                  Upload & Stamp Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
