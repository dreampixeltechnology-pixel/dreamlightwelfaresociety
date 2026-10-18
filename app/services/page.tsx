'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ServicesPage from '@/components/pages/ServicesPage';
import { useNGO } from '@/context/NGOContext';

export default function ServicesRoute() {
  const router = useRouter();
  const { openDonateModal, openVolunteerModal } = useNGO();

  return (
    <div className="py-6">
      <ServicesPage
        onDonateClick={openDonateModal}
        onVolunteerClick={openVolunteerModal}
        onContactClick={() => router.push('/contact')}
      />
    </div>
  );
}
