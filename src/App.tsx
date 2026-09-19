/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CommunityProvider, useCommunity } from './context/CommunityContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationModal } from './components/NotificationModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PalaceAdminPage } from './pages/PalaceAdminPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { EventsPage } from './pages/EventsPage';
import { DevelopmentPage } from './pages/DevelopmentPage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CommunityMembersPage } from './pages/CommunityMembersPage';
import { DistinguishedDirectoryPage } from './pages/DistinguishedDirectoryPage';

const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab } = useCommunity();
  const [currentTabId, setCurrentTabId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigate = (tab: string, itemId?: string) => {
    setCurrentTab(tab);
    setCurrentTabId(itemId);
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'palace':
      case 'traditional-rulers':
      case 'ruler':
        return <PalaceAdminPage />;
      case 'military':
        return <DistinguishedDirectoryPage initialCategory="Military" />;
      case 'paramilitary':
        return <DistinguishedDirectoryPage initialCategory="Paramilitary" />;
      case 'police':
        return <DistinguishedDirectoryPage initialCategory="Police" />;
      case 'academicians':
        return <DistinguishedDirectoryPage initialCategory="Academicians" />;
      case 'distinguished-all':
      case 'distinguished':
      case 'forcemen':
        return <DistinguishedDirectoryPage initialCategory="All" />;
      case 'ordinary-members':
      case 'community-members':
      case 'members':
        return <CommunityMembersPage />;
      case 'announcements':
        return <AnnouncementsPage initialSelectedId={currentTabId} />;
      case 'events':
        return <EventsPage initialSelectedId={currentTabId} />;
      case 'development':
        return <DevelopmentPage initialSelectedId={currentTabId} />;
      case 'news':
        return <NewsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-blue-900 selection:text-amber-300 font-sans antialiased">
      {/* Primary Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1 w-full animate-fadeIn">
        {renderCurrentView()}
      </main>

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Official Palace & Community Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <CommunityProvider>
      <AppContent />
    </CommunityProvider>
  );
}

