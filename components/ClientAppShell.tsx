'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationModal from '@/components/DonationModal';
import DonationReceiptModal from '@/components/DonationReceiptModal';
import VolunteerModal from '@/components/VolunteerModal';
import EventRSVPModal from '@/components/EventRSVPModal';
import AdminDashboard from '@/components/AdminDashboard';
import MobileActionDock from '@/components/MobileActionDock';
import CommandSearchModal from '@/components/CommandSearchModal';
import { NGOProvider, useNGO } from '@/context/NGOContext';

function AppShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const {
    donations,
    volunteers,
    events,
    rsvps,
    isDonateModalOpen,
    donateModalCause,
    donateModalAmount,
    openDonateModal,
    closeDonateModal,
    isVolunteerModalOpen,
    openVolunteerModal,
    closeVolunteerModal,
    selectedEventForRSVP,
    closeRSVPModal,
    activeReceipt,
    closeReceiptModal,
    isAdmin,
    setIsAdmin,
    isSearchOpen,
    setIsSearchOpen,
    handleDonationSuccess,
    handleVolunteerRegistered,
    handleRSVPConfirmed,
    handleAddMockDonation,
  } = useNGO();

  // Map pathname to activePage identifier
  const activePage = pathname === '/' 
    ? 'home' 
    : pathname.replace('/', '').split('/')[0] || 'home';

  const handlePageChange = (pageId: string) => {
    if (pageId === 'home') {
      router.push('/');
    } else {
      router.push(`/${pageId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Header with Scroll Progress, Mega Dropdowns & Search */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        openDonateModal={openDonateModal}
        openVolunteerModal={openVolunteerModal}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* 3. Footer */}
      <Footer
        setActivePage={handlePageChange}
        openDonateModal={openDonateModal}
        openVolunteerModal={openVolunteerModal}
        setIsAdmin={setIsAdmin}
      />

      {/* 4. Global Modals */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={closeDonateModal}
        preselectedCause={donateModalCause}
        preselectedAmount={donateModalAmount}
        onDonationSuccess={handleDonationSuccess}
      />

      <DonationReceiptModal
        receipt={activeReceipt}
        onClose={closeReceiptModal}
      />

      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={closeVolunteerModal}
        onVolunteerRegistered={handleVolunteerRegistered}
      />

      <EventRSVPModal
        event={selectedEventForRSVP}
        onClose={closeRSVPModal}
        onRSVPConfirmed={handleRSVPConfirmed}
      />

      {isAdmin && (
        <AdminDashboard
          donations={donations}
          volunteers={volunteers}
          events={events}
          rsvps={rsvps}
          onViewReceipt={(donation) => closeReceiptModal()}
          onClose={() => setIsAdmin(false)}
          onAddMockDonation={handleAddMockDonation}
        />
      )}

      {/* 5. Mobile Action Dock */}
      <MobileActionDock 
        onDonateClick={() => openDonateModal()} 
      />

      {/* 6. Universal Command Palette Search Modal (⌘K) */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigatePage={handlePageChange}
        onDonateClick={openDonateModal}
      />

    </div>
  );
}

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  return (
    <NGOProvider>
      <AppShellInner>
        {children}
      </AppShellInner>
    </NGOProvider>
  );
}
