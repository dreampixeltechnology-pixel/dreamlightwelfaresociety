'use client';

import React from 'react';
import DonatePage from '@/components/pages/DonatePage';
import { useNGO } from '@/context/NGOContext';

export default function DonateRoute() {
  const { handleDonationSuccess } = useNGO();

  return (
    <div className="py-6">
      <DonatePage onDonationSuccess={handleDonationSuccess} />
    </div>
  );
}
