import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Shield,
  GraduationCap,
  Users,
  Award,
  Landmark,
  FileCheck,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
  Layers,
  FileText,
  Copy,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { DistinguishedCategory } from '../types';

interface DirectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'Military' | 'Paramilitary' | 'Police' | 'Academicians' | 'Community Member' | 'Palace Official';
  onSuccessNavigate?: (tab: string) => void;
}

interface GroupEntry {
  id: string;
  fullName: string;
  category: 'Military' | 'Paramilitary' | 'Police' | 'Academicians' | 'Community Member' | 'Palace Official';
  rankOrTitle: string;
  branchOrField: string;
  institutionOrCommand: string;
  ward: string;
  specialization: string;
  phone: string;
  email: string;
  imagePreview: string;
  imageFileName: string;
}

export const DirectUploadModal: React.FC<DirectUploadModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'Military',
  onSuccessNavigate,
}) => {
  const {
    addDistinguishedPersonnel,
    addDistinguishedPersonnelBatch,
    registerCommunityMember,
    addPalaceMember,
  } = useCommunity();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const rowImageInputRef = useRef<HTMLInputElement>(null);
  const [activeRowImageIndex, setActiveRowImageIndex] = useState<number | null>(null);

  // Upload Mode: 'single' | 'group'
  const [uploadMode, setUploadMode] = useState<'single' | 'group'>('single');

  // Single Form State
  const [selectedCategory, setSelectedCategory] = useState<
    'Military' | 'Paramilitary' | 'Police' | 'Academicians' | 'Community Member' | 'Palace Official'
  >(defaultCategory);

  const [fullName, setFullName] = useState('');
  const [rankOrTitle, setRankOrTitle] = useState('');
  const [branchOrField, setBranchOrField] = useState('');
  const [institutionOrCommand, setInstitutionOrCommand] = useState('');
  const [ward, setWard] = useState('Ward A - Shanu Sector');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [yearsOfService, setYearsOfService] = useState<number | ''>(10);
  const [biography, setBiography] = useState('');
  const [badgeOrReg, setBadgeOrReg] = useState('');
  const [status, setStatus] = useState<'ACTIVE_SERVICE' | 'RETIRED' | 'FACULTY' | 'COMMAND' | 'OFFICER'>('ACTIVE_SERVICE');

  // Single Image State
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(1);

  // Group / Bulk Upload State
  const [groupEntries, setGroupEntries] = useState<GroupEntry[]>([
    {
      id: `g-${Date.now()}-1`,
      fullName: '',
      category: defaultCategory,
      rankOrTitle: '',
      branchOrField: '',
      institutionOrCommand: '',
      ward: 'Ward A - Shanu Sector',
      specialization: '',
      phone: '',
      email: '',
      imagePreview: '',
      imageFileName: '',
    },
  ]);

  const [bulkCategory, setBulkCategory] = useState<
    'Military' | 'Paramilitary' | 'Police' | 'Academicians' | 'Community Member' | 'Palace Official'
  >(defaultCategory);
  const [bulkWard, setBulkWard] = useState('Ward A - Shanu Sector');
  const [bulkCommand, setBulkCommand] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);

  if (!isOpen) return null;

  const wards = [
    'Ward A - Shanu Sector',
    'Ward B - Masallaci',
    'Kasuwa / Market Ward',
    'Palace Grounds / Royal Quarter',
    'Railway Quarter (Layin Dogo)',
    'Unguwar Kanawa Central',
  ];

  // Helper to extract a friendly name from an image filename
  const cleanNameFromFileName = (fileName: string): string => {
    const withoutExt = fileName.replace(/\.[^/.]+$/, '');
    return withoutExt
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  };

  // Process single image file
  const processImageFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, WebP, etc.)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image file is too large (Maximum size is 8MB)');
      return;
    }

    setErrorMessage('');
    setImageFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another picture.');
    };
    reader.readAsDataURL(file);
  };

  // Process multiple image files for Group Upload
  const processMultipleImageFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setErrorMessage('No valid image files found in selection.');
      return;
    }

    setErrorMessage('');
    const newEntries: GroupEntry[] = [];
    let processed = 0;

    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = (e.target?.result as string) || '';
        const suggestedName = cleanNameFromFileName(file.name);

        newEntries.push({
          id: `g-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 5)}`,
          fullName: suggestedName,
          category: bulkCategory,
          rankOrTitle:
            bulkCategory === 'Military'
              ? 'Officer'
              : bulkCategory === 'Police'
              ? 'Officer'
              : bulkCategory === 'Academicians'
              ? 'Scholar / Lecturer'
              : 'Senior Member',
          branchOrField:
            bulkCategory === 'Military'
              ? 'Armed Forces'
              : bulkCategory === 'Police'
              ? 'Police Command'
              : bulkCategory === 'Academicians'
              ? 'Academic Faculty'
              : 'Public Service',
          institutionOrCommand: bulkCommand || 'Kaduna North Command / Institute',
          ward: bulkWard,
          specialization: '',
          phone: '',
          email: '',
          imagePreview: previewUrl,
          imageFileName: file.name,
        });

        processed += 1;
        if (processed === validFiles.length) {
          setGroupEntries((prev) => {
            // If the only item is blank, replace it; otherwise prepend/append
            if (prev.length === 1 && !prev[0].fullName && !prev[0].imagePreview) {
              return newEntries;
            }
            return [...prev, ...newEntries];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Change image for a specific row in the group table
  const handleRowImageChange = (index: number, file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = (e.target?.result as string) || '';
      setGroupEntries((prev) =>
        prev.map((entry, idx) =>
          idx === index
            ? { ...entry, imagePreview: previewUrl, imageFileName: file.name }
            : entry
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAddGroupRow = () => {
    setGroupEntries((prev) => [
      ...prev,
      {
        id: `g-${Date.now()}-${prev.length + 1}`,
        fullName: '',
        category: bulkCategory,
        rankOrTitle: '',
        branchOrField: '',
        institutionOrCommand: bulkCommand || '',
        ward: bulkWard,
        specialization: '',
        phone: '',
        email: '',
        imagePreview: '',
        imageFileName: '',
      },
    ]);
  };

  const handleRemoveGroupRow = (index: number) => {
    if (groupEntries.length <= 1) {
      // Reset the single remaining row
      setGroupEntries([
        {
          id: `g-${Date.now()}`,
          fullName: '',
          category: bulkCategory,
          rankOrTitle: '',
          branchOrField: '',
          institutionOrCommand: '',
          ward: bulkWard,
          specialization: '',
          phone: '',
          email: '',
          imagePreview: '',
          imageFileName: '',
        },
      ]);
      return;
    }
    setGroupEntries((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleApplyBulkCategory = () => {
    setGroupEntries((prev) =>
      prev.map((entry) => ({
        ...entry,
        category: bulkCategory,
      }))
    );
  };

  const handleApplyBulkWard = () => {
    setGroupEntries((prev) =>
      prev.map((entry) => ({
        ...entry,
        ward: bulkWard,
      }))
    );
  };

  const handleApplyBulkCommand = () => {
    if (!bulkCommand.trim()) return;
    setGroupEntries((prev) =>
      prev.map((entry) => ({
        ...entry,
        institutionOrCommand: bulkCommand.trim(),
      }))
    );
  };

  // Parse pasted CSV/text
  const handleParsePasteText = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsed: GroupEntry[] = lines.map((line, idx) => {
      // Delimiters: comma, pipe, tab
      const parts = line.split(/[,|\t]+/).map((p) => p.trim());
      const pName = parts[0] || `Member ${idx + 1}`;
      const pRank = parts[1] || '';
      const pCategoryRaw = parts[2] || bulkCategory;
      const pWard = parts[3] || bulkWard;
      const pSpec = parts[4] || '';

      let cat: any = bulkCategory;
      if (['Military', 'Paramilitary', 'Police', 'Academicians', 'Community Member', 'Palace Official'].includes(pCategoryRaw)) {
        cat = pCategoryRaw;
      }

      return {
        id: `g-paste-${Date.now()}-${idx}`,
        fullName: pName,
        category: cat,
        rankOrTitle: pRank || 'Distinguished Member',
        branchOrField: 'State Command / Department',
        institutionOrCommand: bulkCommand || 'Kaduna North Command',
        ward: pWard || bulkWard,
        specialization: pSpec,
        phone: '',
        email: '',
        imagePreview: '',
        imageFileName: '',
      };
    });

    setGroupEntries((prev) => {
      if (prev.length === 1 && !prev[0].fullName && !prev[0].imagePreview) {
        return parsed;
      }
      return [...prev, ...parsed];
    });

    setPasteText('');
    setShowPasteBox(false);
  };

  // Single submit handler
  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter the full name');
      return;
    }

    const finalPhoto =
      imagePreview ||
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

    if (
      selectedCategory === 'Military' ||
      selectedCategory === 'Paramilitary' ||
      selectedCategory === 'Police' ||
      selectedCategory === 'Academicians'
    ) {
      addDistinguishedPersonnel({
        fullName: fullName.trim(),
        category: selectedCategory as DistinguishedCategory,
        branchOrField:
          branchOrField.trim() ||
          (selectedCategory === 'Military'
            ? 'Armed Forces of Nigeria'
            : selectedCategory === 'Paramilitary'
            ? 'Paramilitary Service'
            : selectedCategory === 'Police'
            ? 'Nigeria Police Force'
            : 'Academic Department'),
        rankOrTitle:
          rankOrTitle.trim() ||
          (selectedCategory === 'Academicians' ? 'Scholar / Lecturer' : 'Senior Officer'),
        institutionOrCommand:
          institutionOrCommand.trim() || 'Kaduna North Command / Institution',
        assignedWardOrOrigin: ward,
        phone: phone.trim(),
        email: email.trim(),
        photograph: finalPhoto,
        qualificationsOrSpecialization:
          specialization.trim() ||
          (selectedCategory === 'Academicians'
            ? 'Academic Research & Instruction'
            : 'Command & Law Enforcement Operations'),
        achievements: specialization ? [specialization] : ['Distinguished Community Service Record'],
        status: status,
        biography:
          biography.trim() ||
          `Distinguished member registered in the Unguwar Kanawa ${selectedCategory} roll.`,
        yearsOfService: typeof yearsOfService === 'number' ? yearsOfService : 10,
        badgeOrRegNumber: badgeOrReg.trim(),
      });
    } else if (selectedCategory === 'Community Member') {
      registerCommunityMember({
        name: fullName.trim(),
        fullName: fullName.trim(),
        photograph: finalPhoto,
        areaWard: ward,
        ward: ward,
        occupation: rankOrTitle.trim() || branchOrField.trim() || 'Community Resident',
        profession: rankOrTitle.trim() || branchOrField.trim() || 'Community Resident',
        skills: specialization ? [specialization] : ['Craftsmanship', 'Community Service'],
        contactInfo: phone.trim() || email.trim() || '',
        phone: phone.trim(),
        email: email.trim(),
        isPublic: true,
        yearsInCommunity: typeof yearsOfService === 'number' ? yearsOfService : 5,
        address: ward,
        isVerified: true,
      });
    } else if (selectedCategory === 'Palace Official') {
      addPalaceMember({
        fullName: fullName.trim(),
        traditionalTitle: rankOrTitle.trim() || 'Council Member',
        position: 'Other Palace Officer',
        areaWard: ward,
        responsibilities: [specialization || 'Palace Liaison & Council Affairs'],
        shortBiography:
          biography.trim() || 'Devoted official in the Traditional Council of Unguwar Kanawa.',
        photograph: finalPhoto,
        phone: phone.trim(),
        email: email.trim(),
        isActive: true,
        order: 10,
      });
    }

    setSuccessCount(1);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSuccessNavigate) {
        if (
          selectedCategory === 'Military' ||
          selectedCategory === 'Paramilitary' ||
          selectedCategory === 'Police' ||
          selectedCategory === 'Academicians'
        ) {
          onSuccessNavigate(selectedCategory.toLowerCase());
        } else if (selectedCategory === 'Community Member') {
          onSuccessNavigate('ordinary-members');
        } else {
          onSuccessNavigate('palace');
        }
      }
    }, 1800);
  };

  // Group submit handler
  const handleGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validRows = groupEntries.filter((r) => r.fullName.trim().length > 0);

    if (validRows.length === 0) {
      setErrorMessage('Please provide at least one person with a full name.');
      return;
    }

    const distinguishedItems: any[] = [];

    validRows.forEach((row) => {
      const finalPhoto =
        row.imagePreview ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

      if (
        row.category === 'Military' ||
        row.category === 'Paramilitary' ||
        row.category === 'Police' ||
        row.category === 'Academicians'
      ) {
        distinguishedItems.push({
          fullName: row.fullName.trim(),
          category: row.category as DistinguishedCategory,
          branchOrField:
            row.branchOrField.trim() ||
            (row.category === 'Military'
              ? 'Armed Forces of Nigeria'
              : row.category === 'Paramilitary'
              ? 'Paramilitary Service'
              : row.category === 'Police'
              ? 'Nigeria Police Force'
              : 'Academic Department'),
          rankOrTitle:
            row.rankOrTitle.trim() ||
            (row.category === 'Academicians' ? 'Scholar / Lecturer' : 'Senior Officer'),
          institutionOrCommand:
            row.institutionOrCommand.trim() || 'Kaduna North Command / Institute',
          assignedWardOrOrigin: row.ward || bulkWard,
          phone: row.phone.trim(),
          email: row.email.trim(),
          photograph: finalPhoto,
          qualificationsOrSpecialization:
            row.specialization.trim() ||
            (row.category === 'Academicians'
              ? 'Academic Research & Instruction'
              : 'Command & Law Enforcement Operations'),
          achievements: row.specialization ? [row.specialization] : ['Registered Distinguished Personnel'],
          status: 'ACTIVE_SERVICE',
          biography: `Registered member of the Unguwar Kanawa ${row.category} roll.`,
          yearsOfService: 10,
          badgeOrRegNumber: '',
        });
      } else if (row.category === 'Community Member') {
        registerCommunityMember({
          name: row.fullName.trim(),
          fullName: row.fullName.trim(),
          photograph: finalPhoto,
          areaWard: row.ward || bulkWard,
          ward: row.ward || bulkWard,
          occupation: row.rankOrTitle.trim() || 'Community Resident',
          profession: row.rankOrTitle.trim() || 'Community Resident',
          skills: row.specialization ? [row.specialization] : ['Community Service'],
          contactInfo: row.phone.trim() || row.email.trim() || '',
          phone: row.phone.trim(),
          email: row.email.trim(),
          isPublic: true,
          yearsInCommunity: 5,
          address: row.ward || bulkWard,
          isVerified: true,
        });
      } else if (row.category === 'Palace Official') {
        addPalaceMember({
          fullName: row.fullName.trim(),
          traditionalTitle: row.rankOrTitle.trim() || 'Council Member',
          position: 'Other Palace Officer',
          areaWard: row.ward || bulkWard,
          responsibilities: [row.specialization || 'Palace Liaison'],
          shortBiography: 'Devoted official in the Traditional Council of Unguwar Kanawa.',
          photograph: finalPhoto,
          phone: row.phone.trim(),
          email: row.email.trim(),
          isActive: true,
          order: 10,
        });
      }
    });

    if (distinguishedItems.length > 0) {
      addDistinguishedPersonnelBatch(distinguishedItems);
    }

    setSuccessCount(validRows.length);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSuccessNavigate) {
        onSuccessNavigate(bulkCategory.toLowerCase());
      }
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-stone-300 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) processImageFile(f);
          }}
        />

        <input
          ref={multiFileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processMultipleImageFiles(e.target.files);
            }
          }}
        />

        <input
          ref={rowImageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && activeRowImageIndex !== null) {
              handleRowImageChange(activeRowImageIndex, f);
              setActiveRowImageIndex(null);
            }
          }}
        />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-slate-950 to-neutral-900 text-white p-6 sm:p-7 relative border-b-2 border-amber-500/80">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black hover:bg-neutral-900 text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-amber-400/60 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Direct Registry & Photo Upload
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            Upload Names & Pictures Directly
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Register personnel or bulk upload complete groups with pictures without converting to HTML.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setUploadMode('single')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                uploadMode === 'single'
                  ? 'bg-black text-amber-300 border-2 border-amber-400 ring-1 ring-amber-400/50 shadow-md'
                  : 'bg-black/60 hover:bg-black text-stone-300 border-stone-700 hover:border-stone-500'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Single Profile Upload</span>
            </button>

            <button
              type="button"
              onClick={() => setUploadMode('group')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                uploadMode === 'group'
                  ? 'bg-black text-amber-300 border-2 border-amber-400 ring-1 ring-amber-400/50 shadow-md'
                  : 'bg-black/60 hover:bg-black text-stone-300 border-stone-700 hover:border-stone-500'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload in Group (Batch {groupEntries.length})</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-cinzel">
              {uploadMode === 'group'
                ? `Successfully Uploaded ${successCount} Profiles & Pictures in Group!`
                : 'Profile & Picture Uploaded Successfully!'}
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              All entries and photographs have been directly processed and stored in the official registry database.
            </p>
            <p className="text-xs text-amber-700 font-bold">
              Redirecting to directory view...
            </p>
          </div>
        ) : uploadMode === 'single' ? (
          /* =========================================================
             SINGLE PROFILE UPLOAD MODE
             ========================================================= */
          <form onSubmit={handleSingleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Select Registry Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'Military', label: 'Military', icon: Shield },
                  { key: 'Paramilitary', label: 'Paramilitary', icon: Award },
                  { key: 'Police', label: 'Police', icon: Shield },
                  { key: 'Academicians', label: 'Academicians', icon: GraduationCap },
                  { key: 'Community Member', label: 'Community Member', icon: Users },
                  { key: 'Palace Official', label: 'Palace Official', icon: Landmark },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key as any)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                        isSelected
                          ? 'bg-black text-amber-300 border-2 border-amber-400 ring-1 ring-amber-400/40 shadow-md'
                          : 'bg-black/60 hover:bg-black text-stone-300 border-stone-700 hover:border-stone-500'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                      <span className="text-xs font-bold truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Photograph Upload */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Personnel Photograph / Portrait *
              </label>

              {imagePreview ? (
                <div className="p-4 rounded-2xl bg-stone-50 border-2 border-emerald-400 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-28 object-cover rounded-xl border-2 border-stone-300 shadow-md shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Picture Ready
                    </div>
                    <p className="text-xs font-medium text-stone-700 truncate max-w-xs">
                      {imageFileName || 'Selected Picture File'}
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 text-xs font-bold border border-stone-600 hover:border-amber-400 transition inline-block mt-1"
                    >
                      Choose Different Photo &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) processImageFile(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? 'border-amber-500 bg-amber-50/60'
                      : 'border-stone-300 hover:border-amber-500 hover:bg-stone-50/80 bg-stone-50/40'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-black border border-stone-700 text-amber-400 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-stone-800">
                    Click to browse or drag & drop photograph here
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Supports PNG, JPG, JPEG, WebP • Max 8MB • Automatic direct conversion
                  </p>
                </div>
              )}
            </div>

            {/* Personal & Professional Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name & Honorific *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Col. Ibrahim Adamu, Prof. Amina Dahiru"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {selectedCategory === 'Academicians'
                    ? 'Academic Title & Rank'
                    : selectedCategory === 'Community Member'
                    ? 'Trade / Profession / Occupation'
                    : 'Rank / Official Title'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Brigadier General, Professor, CSP, Master Builder"
                  value={rankOrTitle}
                  onChange={(e) => setRankOrTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {selectedCategory === 'Academicians'
                    ? 'Faculty / Academic Discipline'
                    : selectedCategory === 'Community Member'
                    ? 'Primary Skill / Craft'
                    : 'Branch / Corps / Department'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Nigerian Army Infantry, Faculty of Engineering"
                  value={branchOrField}
                  onChange={(e) => setBranchOrField(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {selectedCategory === 'Academicians'
                    ? 'University / Research Institute'
                    : 'Command Station / Institution / Base'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ahmadu Bello University Zaria, 1 Div HQ"
                  value={institutionOrCommand}
                  onChange={(e) => setInstitutionOrCommand(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Community Ward / Origin *
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                >
                  {wards.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone / Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g., +234 803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
                />
              </div>
            </div>

            {/* Specialization & Biography */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {selectedCategory === 'Academicians'
                  ? 'Research Field & Specialization'
                  : 'Specialization, Commendations & Service Highlights'}
              </label>
              <input
                type="text"
                placeholder="e.g., Tactical Reconnaissance, Solar Systems, Counter-Crime Operations"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Short Biography / Service Profile
              </label>
              <textarea
                rows={3}
                placeholder="Provide a brief summary of career background, community impact, or educational achievements..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-black bg-white text-stone-900"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-stone-300 hover:text-white text-xs font-semibold transition border border-stone-700 hover:border-stone-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 border-2 border-stone-500 hover:border-amber-400"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Save & Upload Directly</span>
              </button>
            </div>
          </form>
        ) : (
          /* =========================================================
             GROUP / BULK UPLOAD MODE
             ========================================================= */
          <form onSubmit={handleGroupSubmit} className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Bulk Action Tools */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-700 text-white space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Group Upload Tools & Multi-Photo Importer
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasteBox(!showPasteBox)}
                    className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 text-xs font-bold border border-stone-600 hover:border-amber-400 transition flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{showPasteBox ? 'Hide Paste Tool' : 'Paste Names List'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => multiFileInputRef.current?.click()}
                    className="px-4 py-1.5 rounded-lg bg-black hover:bg-neutral-900 text-white text-xs font-bold border-2 border-stone-500 hover:border-amber-400 transition flex items-center gap-1.5 shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Multiple Pictures</span>
                  </button>
                </div>
              </div>

              {/* Paste List Sub-box */}
              {showPasteBox && (
                <div className="p-3.5 rounded-xl bg-black border border-stone-700 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      Paste List of Names (One per line: Name, Rank, Category, Ward)
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Auto-separates names and assigns categories
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder={`Brigadier General Ibrahim Sani, Military, Nigerian Army, Ward A - Shanu Sector\nProf. Amina Dahiru, Academicians, ABU Zaria, Layin Dogo\nCSP Usman Bello, Police, State Command, Central Ward`}
                    className="w-full p-2.5 rounded-lg bg-neutral-900 border border-stone-700 text-white text-xs font-mono outline-none focus:border-amber-400"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPasteBox(false)}
                      className="px-3 py-1 rounded-lg bg-black hover:bg-neutral-900 text-stone-400 text-xs border border-stone-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleParsePasteText}
                      className="px-4 py-1 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 text-xs font-bold border border-amber-400"
                    >
                      Parse & Add to Group
                    </button>
                  </div>
                </div>
              )}

              {/* Bulk Apply Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value as any)}
                    className="flex-1 p-2 rounded-lg bg-black border border-stone-700 text-white text-xs outline-none"
                  >
                    <option value="Military">Military</option>
                    <option value="Paramilitary">Paramilitary</option>
                    <option value="Police">Police</option>
                    <option value="Academicians">Academicians</option>
                    <option value="Community Member">Community Member</option>
                    <option value="Palace Official">Palace Official</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleApplyBulkCategory}
                    className="px-2.5 py-2 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 border border-stone-600 text-[11px] font-bold whitespace-nowrap"
                  >
                    Apply All
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <select
                    value={bulkWard}
                    onChange={(e) => setBulkWard(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-black border border-stone-700 text-white text-xs outline-none"
                  >
                    {wards.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleApplyBulkWard}
                    className="px-2.5 py-2 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 border border-stone-600 text-[11px] font-bold whitespace-nowrap"
                  >
                    Apply Ward
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Command / Unit..."
                    value={bulkCommand}
                    onChange={(e) => setBulkCommand(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-black border border-stone-700 text-white text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyBulkCommand}
                    className="px-2.5 py-2 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 border border-stone-600 text-[11px] font-bold whitespace-nowrap"
                  >
                    Apply Unit
                  </button>
                </div>
              </div>
            </div>

            {/* Drag & Drop Zone for Multiple Pictures */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  processMultipleImageFiles(e.dataTransfer.files);
                }
              }}
              onClick={() => multiFileInputRef.current?.click()}
              className={`p-5 rounded-2xl border-2 border-dashed text-center cursor-pointer transition flex items-center justify-center gap-3 ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/70'
                  : 'border-stone-300 hover:border-amber-500 bg-stone-50/50 hover:bg-stone-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-black border border-stone-700 text-amber-400 flex items-center justify-center shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-stone-900">
                  Drop multiple pictures here or click to bulk select from folder
                </p>
                <p className="text-[11px] text-stone-500">
                  Select 5, 10, 20+ photos at once — each picture automatically creates an editable profile row!
                </p>
              </div>
            </div>

            {/* Group Entries List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Group Profile Roll ({groupEntries.length} Persons)
                </h3>
                <button
                  type="button"
                  onClick={handleAddGroupRow}
                  className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 text-white text-xs font-bold border border-stone-600 hover:border-amber-400 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add Person to Group</span>
                </button>
              </div>

              <div className="space-y-3">
                {groupEntries.map((row, index) => (
                  <div
                    key={row.id}
                    className="p-4 rounded-2xl bg-white border border-stone-300 shadow-sm space-y-3 hover:border-stone-400 transition"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-black text-amber-400 border border-stone-700 text-[11px] font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-stone-800 truncate">
                          {row.fullName || 'Untitled Entry'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGroupRow(index)}
                        className="p-1.5 rounded-lg bg-black hover:bg-red-950 text-stone-400 hover:text-red-400 border border-stone-700 hover:border-red-500 transition"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      {/* Photo Preview & Change Button */}
                      <div className="sm:col-span-3 flex items-center gap-3">
                        <div className="w-16 h-20 rounded-xl bg-stone-100 border border-stone-300 overflow-hidden relative group shrink-0">
                          {row.imagePreview ? (
                            <img
                              src={row.imagePreview}
                              alt={row.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-1 text-center">
                              <ImageIcon className="w-5 h-5 mb-0.5" />
                              <span className="text-[9px] leading-tight">No Photo</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveRowImageIndex(index);
                              rowImageInputRef.current?.click();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-black hover:bg-neutral-900 text-amber-300 text-[11px] font-bold border border-stone-600 hover:border-amber-400 transition block text-left"
                          >
                            {row.imagePreview ? 'Change Photo' : '+ Attach Photo'}
                          </button>
                          {row.imageFileName && (
                            <p className="text-[10px] text-stone-500 truncate max-w-[120px]">
                              {row.imageFileName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Name & Title */}
                      <div className="sm:col-span-4 space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Full Name & Honorific *"
                          value={row.fullName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setGroupEntries((prev) =>
                              prev.map((item, i) => (i === index ? { ...item, fullName: val } : item))
                            );
                          }}
                          className="w-full p-2 rounded-xl border border-stone-300 text-xs font-semibold outline-none focus:border-black text-stone-900 bg-white"
                        />

                        <input
                          type="text"
                          placeholder="Rank / Title (e.g. Major, Prof, CSP)"
                          value={row.rankOrTitle}
                          onChange={(e) => {
                            const val = e.target.value;
                            setGroupEntries((prev) =>
                              prev.map((item, i) => (i === index ? { ...item, rankOrTitle: val } : item))
                            );
                          }}
                          className="w-full p-2 rounded-xl border border-stone-300 text-xs outline-none focus:border-black text-stone-900 bg-white"
                        />
                      </div>

                      {/* Category & Ward */}
                      <div className="sm:col-span-5 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={row.category}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              setGroupEntries((prev) =>
                                prev.map((item, i) => (i === index ? { ...item, category: val } : item))
                              );
                            }}
                            className="w-full p-2 rounded-xl border border-stone-300 text-xs font-semibold outline-none focus:border-black text-stone-900 bg-white"
                          >
                            <option value="Military">Military</option>
                            <option value="Paramilitary">Paramilitary</option>
                            <option value="Police">Police</option>
                            <option value="Academicians">Academicians</option>
                            <option value="Community Member">Community Member</option>
                            <option value="Palace Official">Palace Official</option>
                          </select>

                          <select
                            value={row.ward}
                            onChange={(e) => {
                              const val = e.target.value;
                              setGroupEntries((prev) =>
                                prev.map((item, i) => (i === index ? { ...item, ward: val } : item))
                              );
                            }}
                            className="w-full p-2 rounded-xl border border-stone-300 text-xs outline-none focus:border-black text-stone-900 bg-white"
                          >
                            {wards.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          type="text"
                          placeholder="Specialization / Command / Highlights..."
                          value={row.specialization}
                          onChange={(e) => {
                            const val = e.target.value;
                            setGroupEntries((prev) =>
                              prev.map((item, i) => (i === index ? { ...item, specialization: val } : item))
                            );
                          }}
                          className="w-full p-2 rounded-xl border border-stone-300 text-xs outline-none focus:border-black text-stone-900 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAddGroupRow}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold transition flex items-center justify-center gap-2 border border-stone-600 hover:border-amber-400"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Another Person (+)</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-stone-300 hover:text-white text-xs font-semibold transition border border-stone-700 hover:border-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 border-2 border-stone-500 hover:border-amber-400"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Save & Publish All ({groupEntries.filter((r) => r.fullName.trim()).length}) in Group</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
