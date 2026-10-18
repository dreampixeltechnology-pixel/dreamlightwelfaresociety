'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Heart, 
  Users, 
  Pause, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CauseType } from '@/types/ngo';

export interface GallerySlide {
  id: string;
  title: string;
  hindiTitle: string;
  tagline: string;
  location: string;
  date: string;
  beneficiaries: string;
  category: CauseType;
  image: string;
  ctaText: string;
  ctaAmount: number;
}

export const SLIDES: GallerySlide[] = [
  {
    id: 'slide-1',
    title: 'Free Mega Eye Care & Cataract Camp',
    hindiTitle: 'निशुल्क नेत्र चिकित्सा एवं मोतियाबिंद जांच शिविर',
    tagline: 'Diagnosed 420+ rural seniors; distributed 180 free prescription spectacles & eye drops at zero cost.',
    location: 'Community Hall, Subhash Chowk, Khatima',
    date: 'March 2024 • Active Grassroots Camp',
    beneficiaries: '420+ Seniors Treated',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Sponsor Medicine Kit (₹500)',
    ctaAmount: 500,
  },
  {
    id: 'slide-2',
    title: 'Vidya Jyoti: Rural Child Literacy & School Bags',
    hindiTitle: 'विद्या ज्योति: ग्रामीण बाल शिक्षा एवं बस्ता वितरण',
    tagline: 'Bridging education gaps with after-school remedial coaching, free school bags, and stationery sets.',
    location: 'Primary School, Chakarpur Border Village, Khatima',
    date: 'April 2024 • 12 Active Rural Centers',
    beneficiaries: '4,200+ Children Educated',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Sponsor Child Education (₹1,000)',
    ctaAmount: 1000,
  },
  {
    id: 'slide-3',
    title: 'Shakti Women Sewing Center & Livelihood Hub',
    hindiTitle: 'शक्ति महिला सिलाई केंद्र व स्वावलंबन अभियान',
    tagline: 'Certified 6-month vocational tailoring courses and subsidized sewing machines empowering rural women.',
    location: 'Bigra Bagh Training Center, Khatima',
    date: 'Ongoing Daily Batches • 22 Machines',
    beneficiaries: '1,850+ Women Empowered',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Sponsor Sewing Kit (₹2,500)',
    ctaAmount: 2500,
  },
  {
    id: 'slide-4',
    title: 'Harela Mass Native Tree Plantation Drive',
    hindiTitle: 'हरेला महापर्व: 52,000 देशी वृक्षारोपण अभियान',
    tagline: 'Restoring Sharda river basin groundwater and Himalayan foothills with native Peepal, Neem & Jamun trees.',
    location: 'Sharda River Canal Corridor, Khatima Tehsil',
    date: 'Seasonal Afforestation • 87% Survival',
    beneficiaries: '52,000+ Native Trees',
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Plant 10 Trees (₹500)',
    ctaAmount: 500,
  },
  {
    id: 'slide-5',
    title: 'Mobile Doctor Van & Winter Warm Clothes Drive',
    hindiTitle: 'मोबाइल स्वास्थ्य सेवा व शीतकालीन राहत वितरण',
    tagline: 'Doorstep consultations, pediatric screenings, and heavy thermal blankets for forest settlement families.',
    location: 'Lohiahead Forest Settlement & Melghat Belt',
    date: 'Weekly Mobile Clinic Outreach',
    beneficiaries: '530+ Families Supported',
    category: 'general',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Sponsor Ration & Blanket (₹1,500)',
    ctaAmount: 1500,
  },
  {
    id: 'slide-6',
    title: 'Doorstep Health Diagnostics & Free Medicine Kits',
    hindiTitle: 'निशुल्क रक्त जांच, बीपी व दवा वितरण केंद्र',
    tagline: 'MBBS doctor consultations, blood sugar & pressure diagnostics for remote farm laborers and daily wagers.',
    location: 'Community Health Kendra, Tanakpur Road, Khatima',
    date: 'Bi-Weekly Mega Health Clinic',
    beneficiaries: '148+ Mega Camps Held',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Support Medical Camp (₹500)',
    ctaAmount: 500,
  }
];

interface HeroPhotoSliderProps {
  onDonateClick: (cause?: CauseType, amount?: number) => void;
  onExploreMapClick?: () => void;
}

export default function HeroPhotoSlider({ onDonateClick, onExploreMapClick }: HeroPhotoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const slide = SLIDES[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slider Frame */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[580px] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 bg-stone-900 group">
        
        {/* Animated Slide Image & Backdrop */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={currentIndex === 0}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges & Controls */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20">
          
          {/* Official Location Tag */}
          <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-semibold shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{slide.location}</span>
          </div>

          {/* Slide Counter & Play/Pause */}
          <div className="flex items-center gap-2">
            <span className="bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white text-xs font-mono font-bold">
              0{currentIndex + 1} / 0{SLIDES.length}
            </span>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Auto-play' : 'Play Auto-play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>

        </div>

        {/* Bottom Hero Content Overlay */}
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20 space-y-4 max-w-3xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              {/* Hindi & Category Tag */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-emerald-300 font-semibold tracking-wide">
                  {slide.hindiTitle}
                </span>
                <span className="text-stone-400">•</span>
                <span className="bg-emerald-500/20 text-emerald-200 px-2.5 py-0.5 rounded-md border border-emerald-500/30 text-[11px] font-bold">
                  {slide.beneficiaries}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl drop-shadow-sm">
                {slide.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Island */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onDonateClick(slide.category, slide.ctaAmount)}
              className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{slide.ctaText}</span>
            </button>

            {onExploreMapClick && (
              <button
                type="button"
                onClick={onExploreMapClick}
                className="py-3 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>View On Khatima Map</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-300 ml-auto bg-stone-900/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{slide.date}</span>
            </div>
          </div>

        </div>

        {/* Prev / Next Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnail Dots Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 bg-stone-900/70 backdrop-blur-md rounded-full border border-white/15">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? 'w-7 h-2 bg-emerald-400' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Quick Photo Strip Preview */}
      <div className="hidden md:grid grid-cols-6 gap-3 mt-3">
        {SLIDES.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(idx)}
            className={`relative h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer text-left group ${
              currentIndex === idx
                ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-[1.02]'
                : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="200px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors" />
            <div className="absolute bottom-1 left-2 right-2 text-[10px] text-white font-bold truncate drop-shadow">
              {item.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
