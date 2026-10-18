'use client';

import React from 'react';
import FeaturesPage from '@/components/pages/FeaturesPage';
import { useNGO } from '@/context/NGOContext';

export default function FeaturesRoute() {
  const { openDonateModal, openVolunteerModal, setIsAdmin } = useNGO();

  return (
    <div className="py-6">
      <FeaturesPage
        onDonateClick={openDonateModal}
        onVolunteerClick={openVolunteerModal}
        openAdmin={() => setIsAdmin(true)}
      />
    </div>
  );
}
