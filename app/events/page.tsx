'use client';

import React from 'react';
import EventsPage from '@/components/pages/EventsPage';
import { useNGO } from '@/context/NGOContext';

export default function EventsRoute() {
  const { openRSVPModal, openVolunteerModal } = useNGO();

  return (
    <div className="py-6">
      <EventsPage
        onEventClick={openRSVPModal}
        onVolunteerClick={openVolunteerModal}
      />
    </div>
  );
}
