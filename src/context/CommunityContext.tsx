import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COMMUNITY_MEMBERS,
  INITIAL_DOCUMENTS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_MESSAGES,
  INITIAL_NEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PALACE_MEMBERS,
  INITIAL_PROJECTS,
  INITIAL_RULER_INFO,
  INITIAL_USERS,
} from '../data/initialData';
import {
  Announcement,
  ApprovalStatus,
  AuditLog,
  CommunityDocument,
  CommunityEvent,
  CommunityMember,
  CommunityNotification,
  CommunityProject,
  ContactMessage,
  GalleryItem,
  NewsArticle,
  PalaceMember,
  TraditionalRulerInfo,
  User,
  UserRole,
} from '../types';

interface CommunityContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  allUsers: User[];
  
  // Traditional Ruler
  rulerInfo: TraditionalRulerInfo;
  updateRulerInfo: (info: Partial<TraditionalRulerInfo>) => void;
  
  // Palace Members
  palaceMembers: PalaceMember[];
  addPalaceMember: (member: Omit<PalaceMember, 'id'>) => void;
  updatePalaceMember: (id: string, member: Partial<PalaceMember>) => void;
  togglePalaceMemberStatus: (id: string) => void;
  deletePalaceMember: (id: string) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  updateAnnouncementStatus: (id: string, status: ApprovalStatus) => void;
  deleteAnnouncement: (id: string) => void;

  // Events
  events: CommunityEvent[];
  addEvent: (event: Omit<CommunityEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CommunityEvent>) => void;
  deleteEvent: (id: string) => void;

  // News
  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, article: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  // Projects
  projects: CommunityProject[];
  addProject: (project: Omit<CommunityProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<CommunityProject>) => void;
  addProjectUpdate: (projectId: string, note: string, percentage: number) => void;
  deleteProject: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Documents
  documents: CommunityDocument[];
  addDocument: (doc: Omit<CommunityDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Community Members
  communityMembers: CommunityMember[];
  registerCommunityMember: (member: Omit<CommunityMember, 'id' | 'joinedDate'>) => void;

  // Contact Messages
  messages: ContactMessage[];
  submitContactMessage: (name: string, phone: string, email: string, subject: string, message: string) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Notifications
  notifications: CommunityNotification[];
  unreadNotifsCount: number;
  markNotificationRead: (id: string) => void;
  broadcastNotification: (title: string, message: string, category: 'Palace' | 'Security' | 'Event' | 'Development' | 'General', channels: { inApp: boolean; sms: boolean; whatsapp: boolean }) => void;

  // Audit Logs
  auditLogs: AuditLog[];

  // Navigation
  currentTab: string;
  setCurrentTab: (tab: string) => void;

  // Convenience Aliases for Pages
  members: CommunityMember[];
  registerMember: (member: any) => void;
  contactMessages: ContactMessage[];
  addContactMessage: (msg: any) => void;
  updateMessageStatus: (id: string, status: any) => void;
  switchUserRole: (role: UserRole) => void;

  // Permissions helpers
  canManageAll: boolean;
  canManagePalace: boolean;
  canEditContent: boolean;
  isMemberOrHigher: boolean;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('uk_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [rulerInfo, setRulerInfo] = useState<TraditionalRulerInfo>(() => {
    const saved = localStorage.getItem('uk_ruler_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          !parsed.fullName ||
          parsed.fullName.includes('[Official') ||
          parsed.isPlaceholder ||
          !parsed.fullName.includes('Usman')
        ) {
          return INITIAL_RULER_INFO;
        }
        return parsed;
      } catch (e) {
        return INITIAL_RULER_INFO;
      }
    }
    return INITIAL_RULER_INFO;
  });

  const [palaceMembers, setPalaceMembers] = useState<PalaceMember[]>(() => {
    const saved = localStorage.getItem('uk_palace_members');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          !Array.isArray(parsed) ||
          parsed.length === 0 ||
          parsed[0]?.fullName?.includes('[Official') ||
          !parsed[0]?.fullName?.includes('Usman')
        ) {
          return INITIAL_PALACE_MEMBERS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_PALACE_MEMBERS;
      }
    }
    return INITIAL_PALACE_MEMBERS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('uk_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('uk_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('uk_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [projects, setProjects] = useState<CommunityProject[]>(() => {
    const saved = localStorage.getItem('uk_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('uk_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((g: GalleryItem) => g.id === 'gal-falakin-zazzau-usman')) {
          return parsed;
        }
        return INITIAL_GALLERY;
      } catch (e) {
        return INITIAL_GALLERY;
      }
    }
    return INITIAL_GALLERY;
  });

  const [documents, setDocuments] = useState<CommunityDocument[]>(() => {
    const saved = localStorage.getItem('uk_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>(() => {
    const saved = localStorage.getItem('uk_community_members');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_MEMBERS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('uk_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [notifications, setNotifications] = useState<CommunityNotification[]>(() => {
    const saved = localStorage.getItem('uk_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('uk_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('uk_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('uk_ruler_info', JSON.stringify(rulerInfo));
  }, [rulerInfo]);

  useEffect(() => {
    localStorage.setItem('uk_palace_members', JSON.stringify(palaceMembers));
  }, [palaceMembers]);

  useEffect(() => {
    localStorage.setItem('uk_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('uk_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('uk_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('uk_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('uk_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('uk_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('uk_community_members', JSON.stringify(communityMembers));
  }, [communityMembers]);

  useEffect(() => {
    localStorage.setItem('uk_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('uk_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('uk_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Log an audit action
  const logAudit = (action: string, entityType: string, entityTitle: string, details?: string) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      action,
      entityType,
      entityTitle,
      user: currentUser.name,
      role: currentUser.role,
      timestamp,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    const matchingUser = INITIAL_USERS.find((u) => u.role === role) || {
      id: `usr-${Date.now()}`,
      name: `${role.replace('_', ' ')} User`,
      email: `${role.toLowerCase()}@unguwar-kanawa.example.org`,
      role,
    };
    setCurrentUser(matchingUser);
  };

  // Traditional Ruler updates
  const updateRulerInfo = (info: Partial<TraditionalRulerInfo>) => {
    setRulerInfo((prev) => ({ ...prev, ...info }));
    logAudit('UPDATE_RULER_PROFILE', 'TraditionalRuler', info.fullName || rulerInfo.fullName, 'Updated traditional ruler profile');
  };

  // Palace Member methods
  const addPalaceMember = (member: Omit<PalaceMember, 'id'>) => {
    const newMember: PalaceMember = {
      ...member,
      id: `pm-${Date.now()}`,
    };
    setPalaceMembers((prev) => [...prev, newMember]);
    logAudit('ADD_PALACE_MEMBER', 'PalaceMember', member.fullName, `Position: ${member.position}`);
  };

  const updatePalaceMember = (id: string, member: Partial<PalaceMember>) => {
    setPalaceMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...member } : m))
    );
    logAudit('UPDATE_PALACE_MEMBER', 'PalaceMember', member.fullName || id, 'Modified profile card');
  };

  const togglePalaceMemberStatus = (id: string) => {
    setPalaceMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updated = { ...m, isActive: !m.isActive };
          logAudit(
            updated.isActive ? 'ACTIVATE_MEMBER' : 'DEACTIVATE_MEMBER',
            'PalaceMember',
            m.fullName,
            `Status changed to ${updated.isActive ? 'Active' : 'Inactive'}`
          );
          return updated;
        }
        return m;
      })
    );
  };

  const deletePalaceMember = (id: string) => {
    const target = palaceMembers.find((m) => m.id === id);
    setPalaceMembers((prev) => prev.filter((m) => m.id !== id));
    if (target) {
      logAudit('DELETE_PALACE_MEMBER', 'PalaceMember', target.fullName, 'Removed member profile');
    }
  };

  // Announcements methods
  const addAnnouncement = (
    announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>
  ) => {
    const now = new Date().toISOString();
    const isAutoVerified = announcement.status === 'PUBLISHED';
    const newAnn: Announcement = {
      ...announcement,
      id: `ann-${Date.now()}`,
      isVerified: isAutoVerified,
      createdAt: now,
      updatedAt: now,
      approver: isAutoVerified ? currentUser.name : undefined,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logAudit('CREATE_ANNOUNCEMENT', 'Announcement', announcement.title, `Initial status: ${announcement.status}`);

    // Create notification for community
    if (isAutoVerified) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `Announcement: ${announcement.title}`,
          message: announcement.fullAnnouncement.substring(0, 100) + '...',
          date: new Date().toISOString().substring(0, 10),
          category: announcement.category === 'Security Notice' ? 'Security' : 'Palace',
          isRead: false,
          linkToTab: 'announcements',
        },
        ...prev,
      ]);
    }
  };

  const updateAnnouncement = (id: string, update: Partial<Announcement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const isVerified = update.status === 'PUBLISHED' ? true : a.isVerified;
          const updated = {
            ...a,
            ...update,
            isVerified,
            updatedAt: new Date().toISOString(),
            approver: update.status === 'PUBLISHED' ? currentUser.name : a.approver,
          };
          logAudit('UPDATE_ANNOUNCEMENT', 'Announcement', updated.title, `Status: ${updated.status}`);
          return updated;
        }
        return a;
      })
    );
  };

  const updateAnnouncementStatus = (id: string, status: ApprovalStatus) => {
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const isVerified = status === 'PUBLISHED';
          const updated = {
            ...a,
            status,
            isVerified,
            approver: isVerified ? currentUser.name : a.approver,
            updatedAt: new Date().toISOString(),
          };
          logAudit('CHANGE_ANNOUNCEMENT_STATUS', 'Announcement', a.title, `Workflow changed to ${status}`);
          return updated;
        }
        return a;
      })
    );
  };

  const deleteAnnouncement = (id: string) => {
    const target = announcements.find((a) => a.id === id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      logAudit('DELETE_ANNOUNCEMENT', 'Announcement', target.title);
    }
  };

  // Events
  const addEvent = (event: Omit<CommunityEvent, 'id'>) => {
    const newEvt: CommunityEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [newEvt, ...prev]);
    logAudit('CREATE_EVENT', 'CommunityEvent', event.name, `Date: ${event.date}`);
  };

  const updateEvent = (id: string, event: Partial<CommunityEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...event } : e)));
    logAudit('UPDATE_EVENT', 'CommunityEvent', event.name || id);
  };

  const deleteEvent = (id: string) => {
    const target = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (target) {
      logAudit('DELETE_EVENT', 'CommunityEvent', target.name);
    }
  };

  // News
  const addNews = (article: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = {
      ...article,
      id: `news-${Date.now()}`,
    };
    setNews((prev) => [newArt, ...prev]);
    logAudit('CREATE_NEWS', 'NewsArticle', article.title, `Category: ${article.category}`);
  };

  const updateNews = (id: string, article: Partial<NewsArticle>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...article } : n)));
    logAudit('UPDATE_NEWS', 'NewsArticle', article.title || id);
  };

  const deleteNews = (id: string) => {
    const target = news.find((n) => n.id === id);
    setNews((prev) => prev.filter((n) => n.id !== id));
    if (target) {
      logAudit('DELETE_NEWS', 'NewsArticle', target.title);
    }
  };

  // Projects
  const addProject = (project: Omit<CommunityProject, 'id'>) => {
    const newProj: CommunityProject = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProj, ...prev]);
    logAudit('CREATE_PROJECT', 'CommunityProject', project.name, `Status: ${project.status}`);
  };

  const updateProject = (id: string, project: Partial<CommunityProject>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)));
    logAudit('UPDATE_PROJECT', 'CommunityProject', project.name || id);
  };

  const addProjectUpdate = (projectId: string, note: string, percentage: number) => {
    const today = new Date().toISOString().substring(0, 10);
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updated = {
            ...p,
            progressPercentage: percentage,
            updates: [
              {
                date: today,
                note,
                percentage,
                author: currentUser.name,
              },
              ...p.updates,
            ],
          };
          logAudit('ADD_PROJECT_UPDATE', 'CommunityProject', p.name, `Progress at ${percentage}%: ${note}`);
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      logAudit('DELETE_PROJECT', 'CommunityProject', target.name);
    }
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newGal: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newGal, ...prev]);
    logAudit('ADD_GALLERY_MEDIA', 'GalleryItem', item.title, `Category: ${item.category}`);
  };

  const deleteGalleryItem = (id: string) => {
    const target = gallery.find((g) => g.id === id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
    if (target) {
      logAudit('DELETE_GALLERY_MEDIA', 'GalleryItem', target.title);
    }
  };

  // Documents
  const addDocument = (doc: Omit<CommunityDocument, 'id'>) => {
    const newDoc: CommunityDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logAudit('ADD_DOCUMENT', 'CommunityDocument', doc.title, `Confidential: ${doc.isConfidential}`);
  };

  const deleteDocument = (id: string) => {
    const target = documents.find((d) => d.id === id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (target) {
      logAudit('DELETE_DOCUMENT', 'CommunityDocument', target.title);
    }
  };

  // Community Members
  const registerCommunityMember = (member: Omit<CommunityMember, 'id' | 'joinedDate'>) => {
    const today = new Date().toISOString().substring(0, 10);
    const newMem: CommunityMember = {
      ...member,
      id: `cm-${Date.now()}`,
      joinedDate: today,
    };
    setCommunityMembers((prev) => [...prev, newMem]);
    logAudit('REGISTER_MEMBER', 'CommunityMember', member.name, `Ward: ${member.areaWard}`);
  };

  // Contact Messages
  const submitContactMessage = (
    name: string,
    phone: string,
    email: string,
    subject: string,
    message: string
  ) => {
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      phone,
      email,
      subject,
      message,
      date: dateStr,
      isRead: false,
      status: 'NEW',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const broadcastNotification = (
    title: string,
    message: string,
    category: 'Palace' | 'Security' | 'Event' | 'Development' | 'General',
    channels: { inApp: boolean; sms: boolean; whatsapp: boolean }
  ) => {
    const today = new Date().toISOString().substring(0, 10);
    const newNotif: CommunityNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      date: today,
      category,
      isRead: false,
      linkToTab: 'announcements',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    const channelTags: string[] = [];
    if (channels.inApp) channelTags.push('In-App');
    if (channels.sms) channelTags.push('SMS Alert Broadcast');
    if (channels.whatsapp) channelTags.push('WhatsApp Broadcast Channel');

    logAudit('BROADCAST_ALERT', 'Notification', title, `Dispatched via ${channelTags.join(', ')}`);
  };

  const [currentTab, setCurrentTab] = useState<string>('home');

  const registerMember = (member: any) => {
    registerCommunityMember({
      name: member.fullName || member.name || 'Community Resident',
      photograph:
        member.photograph ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      areaWard: member.ward || member.areaWard || 'Ward A - Shanu Sector',
      occupation: member.profession || member.occupation || 'Resident',
      skills: member.skills || [],
      contactInfo: member.phone || member.contactInfo || '',
      isPublic: true,
      fullName: member.fullName,
      phone: member.phone,
      email: member.email,
      ward: member.ward,
      profession: member.profession,
      yearsInCommunity: member.yearsInCommunity,
      address: member.address,
      isVerified: member.isVerified ?? false,
      registeredDate: member.registeredDate || new Date().toISOString().substring(0, 10),
    });
  };

  const addContactMessage = (msg: any) => {
    submitContactMessage(
      msg.fullName || msg.name,
      msg.phone,
      msg.email || '',
      msg.subject,
      msg.message
    );
  };

  const updateMessageStatus = (id: string, status: any) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status, isRead: true } : m))
    );
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  // Permissions
  const canManageAll = currentUser.role === 'SUPER_ADMIN';
  const canManagePalace = currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'PALACE_ADMIN';
  const canEditContent =
    currentUser.role === 'SUPER_ADMIN' ||
    currentUser.role === 'PALACE_ADMIN' ||
    currentUser.role === 'EDITOR';
  const isMemberOrHigher = currentUser.role !== 'VISITOR';

  return (
    <CommunityContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        switchUserRole: switchRole,
        allUsers: INITIAL_USERS,
        rulerInfo,
        updateRulerInfo,
        palaceMembers,
        addPalaceMember,
        updatePalaceMember,
        togglePalaceMemberStatus,
        deletePalaceMember,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        updateAnnouncementStatus,
        deleteAnnouncement,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        news,
        addNews,
        updateNews,
        deleteNews,
        projects,
        addProject,
        updateProject,
        addProjectUpdate,
        deleteProject,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        documents,
        addDocument,
        deleteDocument,
        communityMembers,
        members: communityMembers,
        registerCommunityMember,
        registerMember,
        messages,
        contactMessages: messages,
        submitContactMessage,
        addContactMessage,
        updateMessageStatus,
        markMessageRead,
        deleteMessage,
        notifications,
        unreadNotifsCount,
        markNotificationRead,
        broadcastNotification,
        auditLogs,
        currentTab,
        setCurrentTab,
        canManageAll,
        canManagePalace,
        canEditContent,
        isMemberOrHigher,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
