'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HomePage from '@/components/pages/HomePage';
import HeroPhotoSlider from '@/components/HeroPhotoSlider';
import { useNGO } from '@/context/NGOContext';

export default function Home() {
  const router = useRouter();
  const { openDonateModal, openVolunteerModal, openRSVPModal } = useNGO();

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/${page}`);
    }
  };

  const handleExploreMap = () => {
    const el = document.getElementById('khatima-programs-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 pt-4 pb-12">
      {/* 1. TOP HERO PHOTO GALLERY SLIDER */}
      <HeroPhotoSlider 
        onDonateClick={openDonateModal}
        onExploreMapClick={handleExploreMap}
      />

      {/* 2. MAIN HOME CONTENT */}
      <HomePage
        onDonateClick={openDonateModal}
        onVolunteerClick={openVolunteerModal}
        onEventClick={openRSVPModal}
        setActivePage={handleNavigate}
      />
    </div>
  );
}
