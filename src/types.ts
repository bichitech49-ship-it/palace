export type UserRole = 'SUPER_ADMIN' | 'PALACE_ADMIN' | 'EDITOR' | 'COMMUNITY_MEMBER' | 'VISITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  ward?: string;
  phone?: string;
  avatarUrl?: string;
}

export type AnnouncementCategory =
  | 'Palace Announcement'
  | 'Community Meeting'
  | 'Security Notice'
  | 'Funeral Announcement'
  | 'Wedding Announcement'
  | 'Religious Event'
  | 'Development Announcement'
  | 'Emergency Notice'
  | 'General Information';

export type PriorityLevel = 'Urgent' | 'High' | 'Normal';

export type ApprovalStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED';

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: AnnouncementCategory;
  issuingAuthority: string;
  fullAnnouncement: string;
  documentUrl?: string;
  imageUrl?: string;
  publicationDate: string;
  expiryDate?: string;
  priority: PriorityLevel;
  status: ApprovalStatus;
  isVerified: boolean;
  creator: string;
  approver?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TraditionalRulerInfo {
  fullName: string;
  traditionalTitle: string;
  reignStartYear: string;
  officialPhotograph: string;
  welcomeMessage: string;
  biography: string;
  leadershipHistory: string[];
  installationInformation: string;
  leadershipActivities: string[];
  developmentInitiatives: string[];
  speeches: {
    title: string;
    date: string;
    occasion: string;
    summary: string;
  }[];
  officialPhotographs: {
    url: string;
    caption: string;
  }[];
  isPlaceholder: boolean;
}

export type PalacePosition =
  | 'Traditional Ruler'
  | 'Palace Secretary'
  | 'Traditional Council Member'
  | 'Ward Leader'
  | 'Village/Community Head'
  | 'Palace Adviser'
  | 'Youth Representative'
  | 'Women Representative'
  | 'Community Development Committee'
  | 'Other Palace Officer';

export interface PalaceMember {
  id: string;
  fullName: string;
  traditionalTitle: string;
  position: PalacePosition;
  areaWard: string;
  responsibilities: string[];
  shortBiography: string;
  photograph: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  order: number;
}

export type EventCategory =
  | 'Palace Meetings'
  | 'Community Meetings'
  | 'Cultural Events'
  | 'Youth Programs'
  | 'Women\'s Programs'
  | 'Religious Programs'
  | 'Sports Activities'
  | 'Community Development Meetings'
  | 'Educational Programs'
  | 'Public Lectures'
  | 'Traditional Celebration'
  | 'Community Meeting'
  | 'Youth Program'
  | 'Women Program'
  | 'Religious Program'
  | 'Sanitation Exercise'
  | 'Sports/Recreation';

export interface CommunityEvent {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  organizer: string;
  description: string;
  posterUrl: string;
  category: EventCategory;
  contactInfo: string;
  isPast?: boolean;
  targetAudience?: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export type NewsCategory =
  | 'Palace Activities'
  | 'Community Development'
  | 'Traditional Events'
  | 'Community Meetings'
  | 'Youth Activities'
  | 'Women\'s Activities'
  | 'Educational Achievements'
  | 'Infrastructure'
  | 'Cultural Activities'
  | 'Visits by Important Guests'
  | 'Community Celebrations'
  | 'Community News'
  | 'Cultural Feature'
  | 'Youth Spotlight'
  | 'Elder Interview'
  | 'Civic Achievement';

export interface NewsArticle {
  id: string;
  title: string;
  featuredImage?: string;
  author: string;
  authorRole?: string;
  date: string;
  category: NewsCategory;
  excerpt?: string;
  fullArticle?: string;
  imageGallery?: string[];
  relatedArticleIds?: string[];
  readTimeMinutes?: number;
  summary?: string;
  content?: string;
  imageUrl?: string;
}

export type ProjectStatus = 'PROPOSED' | 'APPROVED' | 'ONGOING' | 'COMPLETED';

export type ProjectCategory =
  | 'Roads'
  | 'Drainage'
  | 'Water Projects'
  | 'Schools'
  | 'Healthcare'
  | 'Electricity'
  | 'ICT Projects'
  | 'Youth Development'
  | 'Environmental Projects'
  | 'Community Facilities'
  | 'Youth/Women Empowerment'
  | 'Water Supply'
  | 'Health'
  | 'Education'
  | 'Security'
  | 'Sanitation';

export interface ProjectUpdate {
  date: string;
  note: string;
  percentage: number;
  author: string;
}

export interface CommunityProject {
  id: string;
  name: string;
  category: ProjectCategory;
  location: string;
  description: string;
  startDate: string;
  completionDate: string;
  status: ProjectStatus;
  progressPercentage: number;
  sponsor: string;
  budgetEstimate?: string;
  photographs: string[];
  updates: ProjectUpdate[];
  photos?: string[];
  expectedCompletionDate?: string;
  beneficiaryArea?: string;
  projectManager?: string;
}

export type GalleryCategory =
  | 'Palace'
  | 'Traditional Ruler'
  | 'Community Events'
  | 'Cultural Activities'
  | 'Community Meetings'
  | 'Development Projects'
  | 'Youth Activities'
  | 'Women\'s Activities'
  | 'Historical Photographs'
  | 'Palace Ceremonies'
  | 'Traditional Festivals'
  | 'Youth & Sports'
  | 'Historic Landmarks'
  | 'Community Leaders';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  mediaType: 'photo' | 'video';
  mediaUrl: string;
  caption: string;
  date: string;
  albumName?: string;
  type?: 'photo' | 'video' | 'IMAGE' | 'VIDEO';
  url?: string;
  album?: string;
}

export type DocumentCategory =
  | 'Official Announcement'
  | 'Meeting Notice'
  | 'Community Constitution'
  | 'Event Program'
  | 'Development Plan'
  | 'Report'
  | 'Public Form'
  | 'Community Guidelines'
  | 'Palace Declaration'
  | 'Community Constitution/Bye-Laws'
  | 'Meeting Minutes'
  | 'Financial Report'
  | 'Security Guidelines';

export interface CommunityDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  uploadDate: string;
  isConfidential: boolean;
  downloadUrl: string;
  isPublic?: boolean;
  publicationDate?: string;
  fileUrl?: string;
}

export type PalaceDocument = CommunityDocument;

export interface CommunityMember {
  id: string;
  name: string;
  photograph: string;
  areaWard: string;
  occupation: string;
  skills: string[];
  contactInfo: string;
  isPublic: boolean;
  joinedDate: string;
  fullName?: string;
  phone?: string;
  email?: string;
  ward?: string;
  profession?: string;
  yearsInCommunity?: number;
  address?: string;
  isVerified?: boolean;
  registeredDate?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'PENDING' | 'REVIEWED' | 'ADDRESSED';
  fullName?: string;
  category?: string;
}

export interface CommunityNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  category: 'Palace' | 'Security' | 'Event' | 'Development' | 'General';
  isRead: boolean;
  linkToTab?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityTitle: string;
  user: string;
  role: string;
  timestamp: string;
  details?: string;
  userName?: string;
  userRole?: string;
  entity?: string;
}

export type ForceBranch =
  | 'Community Vigilance Service (Yan Sintiri / KADVS)'
  | 'Nigeria Police Force Outpost'
  | 'Neighborhood Night Patrol'
  | 'Armed Forces Veterans Advisory'
  | 'Traffic & Peace Volunteers';

export interface ForceMenOfficer {
  id: string;
  fullName: string;
  rankTitle: string;
  branch: ForceBranch;
  assignedWard: string;
  phone: string;
  stationBase: string;
  badgeNumber?: string;
  photograph: string;
  specialization: string;
  status: 'ON_DUTY' | 'PATROL' | 'RESERVE' | 'COMMAND';
  commendations?: string[];
  yearsOfService: number;
}

export interface SecurityIncidentReport {
  id: string;
  reportingName: string;
  phone: string;
  ward: string;
  incidentType: string;
  description: string;
  location: string;
  date: string;
  status: 'PENDING' | 'DISPATCHED' | 'RESOLVED';
  isAnonymous: boolean;
}

export interface TraditionalRulerLeader {
  id: string;
  fullName: string;
  traditionalTitle: string;
  roleLevel: 'DISTRICT_HEAD' | 'PREDECESSOR' | 'WARD_HEAD' | 'COUNCIL_TITLEHOLDER';
  jurisdictionWard: string;
  appointmentYear: string;
  responsibilities: string[];
  shortBiography: string;
  photograph: string;
  lineageNotes?: string;
  palaceChamber?: string;
  contactOffice?: string;
  isActive: boolean;
}

export interface CitizenStory {
  id: string;
  fullName: string;
  tradeOrRole: string;
  ward: string;
  quote: string;
  story: string;
  photograph: string;
  yearsInCommunity: number;
  highlightSkill: string;
}

