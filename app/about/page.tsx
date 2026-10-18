'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AboutPage from '@/components/pages/AboutPage';
import { useNGO } from '@/context/NGOContext';

export default function AboutRoute() {
  const router = useRouter();
  const { openDonateModal, openVolunteerModal } = useNGO();

  return (
    <div className="py-6">
      <AboutPage
        onDonateClick={openDonateModal}
        onVolunteerClick={openVolunteerModal}
        setActivePage={(page) => router.push(page === 'home' ? '/' : `/${page}`)}
      />
    </div>
  );
}
