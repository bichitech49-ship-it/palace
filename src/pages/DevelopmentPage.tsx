import React, { useState } from 'react';
import {
  Hammer,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Building,
  Filter,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  X,
  Edit2,
  Trash2,
  DollarSign,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { CommunityProject, ProjectCategory, ProjectStatus } from '../types';

export const DevelopmentPage: React.FC<{ initialSelectedId?: string }> = ({ initialSelectedId }) => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    canEditContent,
  } = useCommunity();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(() => {
    if (initialSelectedId) {
      return projects.find((p) => p.id === initialSelectedId) || null;
    }
    return null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CommunityProject | null>(null);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Water Projects' as ProjectCategory,
    location: 'Unguwar Kanawa',
    description: '',
    status: 'ONGOING' as ProjectStatus,
    startDate: new Date().toISOString().substring(0, 10),
    expectedCompletionDate: '',
    sponsor: 'Community Self-Help (Aikin Gayya)',
    progressPercentage: 50,
    beneficiaryArea: 'Entire Ward Quarters',
    projectManager: 'CDC Works Directorate',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
    ],
  });

  const categories: ProjectCategory[] = [
    'Roads',
    'Drainage',
    'Water Projects',
    'Schools',
    'Healthcare',
    'Electricity',
    'ICT Projects',
    'Youth Development',
    'Environmental Projects',
    'Community Facilities',
  ];

  const filtered = projects.filter((p) => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    return matchCat && matchStatus;
  });

  const openCreateModal = () => {
    setFormData({
      name: '',
      category: 'Water Projects',
      location: 'Unguwar Kanawa',
      description: '',
      status: 'ONGOING',
      startDate: new Date().toISOString().substring(0, 10),
      expectedCompletionDate: '2026-12-31',
      sponsor: 'Community Self-Help (Aikin Gayya)',
      progressPercentage: 50,
      beneficiaryArea: 'Entire Ward Quarters',
      projectManager: 'CDC Works Directorate',
      photos: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
      ],
    });
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: CommunityProject) => {
    setFormData({
      name: p.name,
      category: p.category,
      location: p.location,
      description: p.description,
      status: p.status,
      startDate: p.startDate,
      expectedCompletionDate: p.expectedCompletionDate || p.completionDate || '',
      sponsor: p.sponsor,
      progressPercentage: p.progressPercentage,
      beneficiaryArea: p.beneficiaryArea || '',
      projectManager: p.projectManager || '',
      photos: p.photos || p.photographs || [],
    });
    setEditingProject(p);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, {
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        status: formData.status,
        startDate: formData.startDate,
        completionDate: formData.expectedCompletionDate || editingProject.completionDate,
        expectedCompletionDate: formData.expectedCompletionDate || undefined,
        sponsor: formData.sponsor,
        progressPercentage: Number(formData.progressPercentage),
        beneficiaryArea: formData.beneficiaryArea,
        projectManager: formData.projectManager,
        photographs: formData.photos,
        photos: formData.photos,
      });
    } else {
      addProject({
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        status: formData.status,
        startDate: formData.startDate,
        completionDate: formData.expectedCompletionDate || formData.startDate,
        expectedCompletionDate: formData.expectedCompletionDate || undefined,
        sponsor: formData.sponsor,
        progressPercentage: Number(formData.progressPercentage),
        beneficiaryArea: formData.beneficiaryArea,
        projectManager: formData.projectManager,
        photographs: formData.photos,
        photos: formData.photos,
        updates: [],
      });
    }
    setIsModalOpen(false);
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setIsSuggestModalOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <Hammer className="w-4 h-4 text-amber-600" />
            <span>Grassroots Public Works & CDC</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            COMMUNITY DEVELOPMENT PROJECTS
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Real-time tracking of drainage canals, solar boreholes, health clinics, and educational infrastructure in Unguwar Kanawa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSuggestModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Suggest Community Project</span>
          </button>

          {canEditContent && (
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Register Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-700">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PLANNED">Planned</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="text-stone-500 font-medium">
          Showing {filtered.length} project initiative{filtered.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
          >
            {/* Project Image */}
            {proj.photos && proj.photos.length > 0 && (
              <div className="h-44 bg-stone-100 overflow-hidden relative">
                <img
                  src={proj.photos[0]}
                  alt={proj.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      proj.status === 'COMPLETED'
                        ? 'bg-blue-800 text-white'
                        : proj.status === 'ONGOING'
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-blue-900">{proj.category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {proj.location}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedProject(proj)}
                  className="font-bold text-stone-900 text-base leading-snug cursor-pointer hover:text-blue-900 transition"
                >
                  {proj.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress Bar & Milestone */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-600">Progress Completion</span>
                    <span className="text-blue-900">{proj.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        proj.status === 'COMPLETED'
                          ? 'bg-blue-800'
                          : 'bg-gradient-to-r from-blue-700 to-amber-500'
                      }`}
                      style={{ width: `${proj.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-500 space-y-1">
                  <p><strong>Funding Source:</strong> {proj.sponsor}</p>
                  <p><strong>Beneficiary Area:</strong> {proj.beneficiaryArea}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="font-bold text-blue-900 hover:underline"
                >
                  Project Details &rarr;
                </button>

                {canEditContent && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1 text-stone-500 hover:text-blue-900"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove project "${proj.name}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-red-600"
                      title="Delete Project"
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-950">
                  {selectedProject.category} • {selectedProject.status}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-2">
                  {selectedProject.name}
                </h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProject.photos && selectedProject.photos[0] && (
              <img
                src={selectedProject.photos[0]}
                alt={selectedProject.name}
                className="w-full h-52 object-cover rounded-2xl"
              />
            )}

            <div className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>{selectedProject.description}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2 text-stone-700">
              <p><strong>Physical Location:</strong> {selectedProject.location}</p>
              <p><strong>Sponsor / Funding Source:</strong> {selectedProject.sponsor}</p>
              <p><strong>Beneficiary Sector:</strong> {selectedProject.beneficiaryArea}</p>
              <p><strong>Supervising Committee / Lead:</strong> {selectedProject.projectManager}</p>
              <p><strong>Commencement Date:</strong> {selectedProject.startDate}</p>
              {selectedProject.expectedCompletionDate && (
                <p><strong>Target Completion Date:</strong> {selectedProject.expectedCompletionDate}</p>
              )}
              <div className="pt-2">
                <div className="flex justify-between font-bold mb-1">
                  <span>Physical Completion:</span>
                  <span>{selectedProject.progressPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-800"
                    style={{ width: `${selectedProject.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggest Community Project Modal */}
      {isSuggestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-cinzel text-base font-bold text-stone-900">
                  Suggest Community Project
                </h3>
                <p className="text-stone-500">Unguwar Kanawa CDC Civic Proposal</p>
              </div>
              <button onClick={() => setIsSuggestModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {suggestSuccess ? (
              <div className="p-6 text-center space-y-2 bg-blue-50 rounded-2xl border border-blue-200">
                <CheckCircle2 className="w-10 h-10 text-blue-700 mx-auto" />
                <h4 className="font-bold text-blue-950 text-sm">Proposal Received!</h4>
                <p className="text-blue-900">
                  Your project suggestion has been logged with the Unguwar Kanawa Community Development Committee (CDC) for review at the next ward townhall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina Mohammed"
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Ward / Location in Unguwar Kanawa</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward B - Masallaci Quarter"
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Proposed Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deep Solar Well for Kasuwa Residential Area"
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Project Category</label>
                  <select className="w-full p-2.5 rounded-xl border border-stone-300 bg-white">
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Why is this urgently needed?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how this project will improve lives, security, or health in your sector..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSuggestModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl shadow"
                  >
                    Submit Proposal to CDC
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {editingProject ? 'Edit Development Project' : 'Register Development Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
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
                  <label className="block font-bold text-stone-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="PLANNED">Planned</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Progress Percentage (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formData.progressPercentage}
                    onChange={(e) => setFormData({ ...formData, progressPercentage: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Project Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Sponsor / Funding Source</label>
                  <input
                    type="text"
                    required
                    value={formData.sponsor}
                    onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Project Manager / Committee</label>
                  <input
                    type="text"
                    required
                    value={formData.projectManager}
                    onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Beneficiary Area</label>
                <input
                  type="text"
                  required
                  value={formData.beneficiaryArea}
                  onChange={(e) => setFormData({ ...formData, beneficiaryArea: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

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
                  {editingProject ? 'Save Changes' : 'Register Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
