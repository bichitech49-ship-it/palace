import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  User,
  Plus,
  ArrowRight,
  X,
  Search,
  CheckCircle2,
  Trash2,
  Edit2,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const { news, addNews, updateNews, deleteNews, canEditContent, currentUser } = useCommunity();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsArticle | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Community News' as any,
    date: new Date().toISOString().substring(0, 10),
    author: currentUser.name,
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
  });

  const categories = [
    'Community News',
    'Cultural Feature',
    'Youth Spotlight',
    'Elder Interview',
    'Civic Achievement',
  ];

  const filtered = news.filter((n) => {
    const matchCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const title = n.title || '';
    const summary = n.summary || n.excerpt || '';
    const matchSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const openCreateModal = () => {
    setFormData({
      title: '',
      category: 'Community News',
      date: new Date().toISOString().substring(0, 10),
      author: currentUser.name,
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (n: NewsArticle) => {
    setFormData({
      title: n.title,
      category: n.category,
      date: n.date,
      author: n.author,
      summary: n.summary || n.excerpt || '',
      content: n.content || n.fullArticle || '',
      imageUrl: n.imageUrl || n.featuredImage || '',
    });
    setEditingItem(n);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateNews(editingItem.id, {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        author: formData.author,
        summary: formData.summary,
        excerpt: formData.summary,
        content: formData.content,
        fullArticle: formData.content,
        imageUrl: formData.imageUrl || undefined,
        featuredImage: formData.imageUrl || editingItem.featuredImage,
      });
    } else {
      addNews({
        title: formData.title,
        category: formData.category,
        date: formData.date,
        author: formData.author,
        summary: formData.summary,
        excerpt: formData.summary,
        content: formData.content,
        fullArticle: formData.content,
        imageUrl: formData.imageUrl || undefined,
        featuredImage:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest">
            <Newspaper className="w-4 h-4 text-amber-600" />
            <span>Community Stories & Chronicles</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            UNGUWAR KANAWA NEWS & STORIES
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Reports on cultural heritage, youth academic accomplishments, commercial advancements, and profiles of respected elders.
          </p>
        </div>

        {canEditContent && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Publish Article</span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-700">Category:</span>
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
          Showing {filtered.length} article{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
          >
            {(item.imageUrl || item.featuredImage) && (
              <div className="h-44 bg-stone-100 overflow-hidden relative">
                <img
                  src={item.imageUrl || item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 right-3 bg-stone-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                  {item.category}
                </span>
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {item.date}
                  </span>
                </div>

                <h2
                  onClick={() => setSelectedArticle(item)}
                  className="font-bold text-stone-900 text-base leading-snug cursor-pointer group-hover:text-blue-900 transition"
                >
                  {item.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.summary || item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="font-bold text-blue-900 hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

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
                        if (confirm(`Delete article "${item.title}"?`)) {
                          deleteNews(item.id);
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
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-950 uppercase">
                  {selectedArticle.category}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-2">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  By {selectedArticle.author} • Published on {selectedArticle.date}
                </p>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {(selectedArticle.imageUrl || selectedArticle.featuredImage) && (
              <img
                src={selectedArticle.imageUrl || selectedArticle.featuredImage}
                alt={selectedArticle.title}
                className="w-full h-56 object-cover rounded-2xl"
              />
            )}

            <div className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line space-y-3">
              <p className="font-semibold text-stone-900 italic border-l-4 border-blue-900 pl-3">
                {selectedArticle.summary || selectedArticle.excerpt}
              </p>
              <p>{selectedArticle.content || selectedArticle.fullArticle}</p>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {editingItem ? 'Edit Community Article' : 'Write Community Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Headline / Title</label>
                <input
                  type="text"
                  required
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
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
                  <label className="block font-bold text-stone-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Summary / Lead Paragraph</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Article Body</label>
                <textarea
                  rows={5}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Featured Photo URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                  {editingItem ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
