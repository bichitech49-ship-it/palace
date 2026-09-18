import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Plus,
  Filter,
  X,
  Calendar,
  Tag,
  Maximize2,
  Trash2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { GalleryCategory, GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem, canEditContent } = useCommunity();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Palace Ceremonies' as GalleryCategory,
    date: new Date().toISOString().substring(0, 10),
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    type: 'IMAGE' as 'IMAGE' | 'VIDEO',
    caption: '',
    album: 'Unguwar Kanawa Archives',
  });

  const categories: GalleryCategory[] = [
    'Palace Ceremonies',
    'Traditional Festivals',
    'Development Projects',
    'Youth & Sports',
    'Historic Landmarks',
    'Community Leaders',
  ];

  const filtered = gallery.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const itemType = item.type || (item.mediaType === 'video' ? 'VIDEO' : 'IMAGE');
    const matchType = mediaTypeFilter === 'ALL' || itemType === mediaTypeFilter;
    return matchCat && matchType;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem({
      title: formData.title,
      category: formData.category,
      date: formData.date,
      url: formData.url,
      type: formData.type,
      caption: formData.caption,
      album: formData.album,
      mediaType: formData.type === 'VIDEO' ? 'video' : 'photo',
      mediaUrl: formData.url,
      albumName: formData.album,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Visual Heritage & Media Archives</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA PHOTO & VIDEO GALLERY
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Historic landmarks, palace ceremonies, annual Durbar equestrian processions, sports tournaments, and community projects.
          </p>
        </div>

        {canEditContent && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add Media to Gallery</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Media Type Filter */}
          <div className="flex items-center p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setMediaTypeFilter('ALL')}
              className={`px-3 py-1 rounded font-semibold ${
                mediaTypeFilter === 'ALL' ? 'bg-white shadow text-blue-950' : 'text-stone-600'
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setMediaTypeFilter('IMAGE')}
              className={`px-3 py-1 rounded font-semibold flex items-center gap-1 ${
                mediaTypeFilter === 'IMAGE' ? 'bg-white shadow text-blue-950' : 'text-stone-600'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Photos
            </button>
            <button
              onClick={() => setMediaTypeFilter('VIDEO')}
              className={`px-3 py-1 rounded font-semibold flex items-center gap-1 ${
                mediaTypeFilter === 'VIDEO' ? 'bg-white shadow text-blue-950' : 'text-stone-600'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Videos
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none font-medium"
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

        <span className="text-stone-500 font-medium">
          Showing {filtered.length} media item{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden group flex flex-col justify-between"
          >
            <div
              onClick={() => setActiveMedia(item)}
              className="aspect-[4/3] bg-stone-100 overflow-hidden relative cursor-pointer"
            >
              <img
                src={item.url || item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>

              {/* Type pill */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-950/80 text-white backdrop-blur-sm uppercase flex items-center gap-1">
                  {(item.type === 'VIDEO' || item.mediaType === 'video') ? (
                    <Video className="w-3 h-3 text-amber-400" />
                  ) : (
                    <ImageIcon className="w-3 h-3 text-blue-400" />
                  )}
                  {item.type || (item.mediaType === 'video' ? 'VIDEO' : 'PHOTO')}
                </span>
              </div>

              {/* Category pill */}
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-stone-950 shadow">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 font-medium text-blue-900">
                  <Tag className="w-3 h-3" />
                  {item.album || item.albumName || 'Unguwar Kanawa Archives'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3
                onClick={() => setActiveMedia(item)}
                className="font-bold text-stone-900 text-sm leading-snug cursor-pointer group-hover:text-blue-900 transition"
              >
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-2">
                {item.caption}
              </p>

              {canEditContent && (
                <div className="pt-2 border-t flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${item.title}" from gallery?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1 text-stone-400 hover:text-red-600"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-3 right-3 z-10 text-stone-400 hover:text-white p-2 rounded-full bg-stone-950/60"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[65vh] bg-black flex items-center justify-center">
              <img
                src={activeMedia.url || activeMedia.mediaUrl}
                alt={activeMedia.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="p-6 text-white space-y-2 bg-stone-900">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>{activeMedia.category} • {activeMedia.album || activeMedia.albumName || 'Archives'}</span>
                <span>{activeMedia.date}</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold">{activeMedia.title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{activeMedia.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                Add Photo or Video to Archive
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Council Meeting on Sallah Preparations"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Media Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="IMAGE">Photo / Photograph</option>
                    <option value="VIDEO">Video Record</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <label className="block font-bold text-stone-700 mb-1">Album / Series</label>
                  <input
                    type="text"
                    required
                    value={formData.album}
                    onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Media URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Caption / Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details regarding context, dignitaries present, or historical significance..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
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
                  Upload Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
