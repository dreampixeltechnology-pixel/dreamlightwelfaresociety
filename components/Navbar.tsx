'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  UserCheck, 
  Calendar, 
  Lock, 
  ExternalLink,
  Sparkles,
  Search,
  ChevronDown,
  BookOpen,
  Stethoscope,
  Trees,
  Copy,
  Check,
  FileText,
  MessageCircle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'motion/react';
import DreamlightLogo from '@/components/DreamlightLogo';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openDonateModal: (cause?: any, amount?: number) => void;
  openVolunteerModal: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onOpenSearch: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  openDonateModal,
  openVolunteerModal,
  isAdmin,
  setIsAdmin,
  onOpenSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [transparencyDropdownOpen, setTransparencyDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const programsRef = useRef<HTMLDivElement>(null);
  const transparencyRef = useRef<HTMLDivElement>(null);

  // Scroll listener for reading progress & navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min((currentScroll / totalScroll) * 100, 100));
      }
      setIsScrolled(currentScroll > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K listener for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsDropdownOpen(false);
      }
      if (transparencyRef.current && !transparencyRef.current.contains(e.target as Node)) {
        setTransparencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    setTransparencyDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(NGO_CONFIG.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-xs'
    }`}>
      
      {/* Scroll-Progress Indicator Line at top */}
      <div className="w-full h-[2.5px] bg-stone-100 overflow-hidden">
        <div 
          className="h-full bg-emerald-700 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Micro-Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Section 80G (50% Tax Deduction) & 12A Certified
            </span>
            <span className="hidden md:inline-block text-stone-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-stone-300">
              <MapPin className="w-3 h-3 text-stone-400" />
              Khatima, U.S. Nagar, Uttarakhand
            </span>
            <span className="hidden lg:inline-block text-stone-500">•</span>
            <button
              onClick={() => {
                setActivePage('home');
                setTimeout(() => {
                  const el = document.getElementById('khatima-programs-map');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden lg:flex items-center gap-1 text-emerald-300 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Interactive Camps Map ↓</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs ml-auto">
            <a 
              href={`tel:${NGO_CONFIG.phone}`} 
              className="flex items-center gap-1 text-stone-200 hover:text-emerald-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Helpline: {NGO_CONFIG.displayPhone}</span>
            </a>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                isAdmin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
              }`}
              title="Admin Mode"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Legal Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer group select-none py-1 shrink-0"
          >
            <DreamlightLogo size={52} showText={true} />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold transition-colors cursor-pointer relative ${
                activePage === 'home' ? 'text-emerald-900' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Home</span>
              {activePage === 'home' && (
                <motion.span
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-700 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                />
              )}
            </button>

            {/* Programs & Camps Dropdown */}
            <div className="relative" ref={programsRef}>
              <button
                type="button"
                onClick={() => {
                  setProgramsDropdownOpen(!programsDropdownOpen);
                  setTransparencyDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  ['services', 'projects'].includes(activePage) || programsDropdownOpen
                    ? 'text-emerald-900' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Programs & Camps</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${programsDropdownOpen ? 'rotate-180 text-emerald-800' : 'text-stone-400'}`} />
              </button>

              <AnimatePresence>
                {programsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 space-y-1 mt-1 z-50"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick('services')}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-stone-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Free Healthcare & Eye Camps</span>
                        <span className="text-[10px] text-stone-500">Doctor checkups & free spectacles</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('projects')}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-stone-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Vidya Jyoti Child Education</span>
                        <span className="text-[10px] text-stone-500">12 rural learning centers</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick('home');
                        setTimeout(() => {
                          const el = document.getElementById('khatima-programs-map');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-emerald-50 flex items-center gap-3 transition-colors cursor-pointer border-t border-stone-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">Interactive Khatima Map</span>
                        <span className="text-[10px] text-emerald-800">8 active camp locations visualized</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Transparency & 80G Dropdown */}
            <div className="relative" ref={transparencyRef}>
              <button
                type="button"
                onClick={() => {
                  setTransparencyDropdownOpen(!transparencyDropdownOpen);
                  setProgramsDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  ['features', 'about'].includes(activePage) || transparencyDropdownOpen
                    ? 'text-emerald-900' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Transparency & 80G</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${transparencyDropdownOpen ? 'rotate-180 text-emerald-800' : 'text-stone-400'}`} />
              </button>

              <AnimatePresence>
                {transparencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 space-y-1 mt-1 z-50"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick('features')}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-stone-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">80G Tax Exemption (50%)</span>
                        <span className="text-[10px] text-stone-500">Instant government compliant receipt</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('about')}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-stone-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">About & Governance</span>
                        <span className="text-[10px] text-stone-500">Registered NGO Khatima, U.S. Nagar</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Events */}
            <button
              onClick={() => handleNavClick('events')}
              className={`px-3 py-2 text-sm font-semibold transition-colors cursor-pointer relative ${
                activePage === 'events' ? 'text-emerald-900' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Events & Camps</span>
              {activePage === 'events' && (
                <motion.span
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-700 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                />
              )}
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-sm font-semibold transition-colors cursor-pointer relative ${
                activePage === 'contact' ? 'text-emerald-900' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Contact Us</span>
              {activePage === 'contact' && (
                <motion.span
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-700 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                />
              )}
            </button>

          </nav>

          {/* Right Action Island: Search Trigger + Volunteer + Highlighted Donate */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Advanced Universal Search Bar Trigger (⌘K) */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-600 text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
              title="Search programs, camps, FAQs (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden xl:inline text-stone-500">Search portal...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-stone-500 rounded border border-stone-300">
                ⌘K
              </kbd>
            </button>

            {/* Volunteer CTA */}
            <button
              onClick={openVolunteerModal}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-stone-600" />
              <span>Volunteer</span>
            </button>

            {/* Donate CTA Button */}
            <button
              onClick={() => openDonateModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span>Donate</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-stone-200 px-4 py-6 space-y-4 overflow-hidden shadow-xl"
          >
            {/* Search Button in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 text-xs flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-700" />
                <span>Search programs, camps, FAQs...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-stone-300">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-stone-800">
              <button
                onClick={() => handleNavClick('home')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                Free Health Camps
              </button>
              <button
                onClick={() => handleNavClick('projects')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                Child Education
              </button>
              <button
                onClick={() => handleNavClick('events')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                Events & Camps
              </button>
              <button
                onClick={() => handleNavClick('features')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                80G Tax Exemption
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                About NGO
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left transition-colors"
              >
                Contact Khatima
              </button>
              <button
                onClick={() => {
                  handleNavClick('home');
                  setTimeout(() => {
                    const el = document.getElementById('khatima-programs-map');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-left font-bold"
              >
                📍 Camps Map
              </button>
            </div>

            {/* UPI Quick Copy in Drawer */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-stone-500 block">Official NGO UPI ID</span>
                <span className="font-mono font-bold text-emerald-950 text-[11px]">{NGO_CONFIG.bankDetails.upiId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                {copiedUpi ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Mobile Contact & Actions */}
            <div className="flex gap-2 pt-2 border-t border-stone-100">
              <a
                href={`tel:${NGO_CONFIG.phone}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Helpline</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDonateModal();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Donate Now</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
