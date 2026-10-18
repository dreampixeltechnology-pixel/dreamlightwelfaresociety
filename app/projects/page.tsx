'use client';

import React from 'react';
import ProjectsPage from '@/components/pages/ProjectsPage';
import { useNGO } from '@/context/NGOContext';

export default function ProjectsRoute() {
  const { openDonateModal, openVolunteerModal } = useNGO();

  return (
    <div className="py-6">
      <ProjectsPage
        onDonateClick={openDonateModal}
        onVolunteerClick={openVolunteerModal}
      />
    </div>
  );
}
