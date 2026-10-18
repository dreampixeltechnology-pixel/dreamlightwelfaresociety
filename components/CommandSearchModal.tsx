'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Stethoscope, 
  Heart, 
  MapPin, 
  Calendar, 
  FileText, 
  ArrowRight,
  Sparkles,
  Command,
  HelpCircle,
  Phone
} from 'lucide-react';
import { CauseType } from '@/types/ngo';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: string) => void;
  onDonateClick: (cause?: CauseType, amount?: number) => void;
  onSelectCamp?: (campId: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  { type: 'quick', title: 'Sponsor a Child Education', subtitle: '₹1,000 / month • Books & tuition', action: 'donate', cause: 'education', amount: 1000 },
  { type: 'quick', title: 'Free Medical Camps Map', subtitle: 'View 8 active camp locations in Khatima', action: 'map' },
  { type: 'quick', title: 'Section 80G Tax Exemption Papers', subtitle: 'Official 80G, 12A & Darpan Papers', action: 'docs' },
  { type: 'quick', title: 'Emergency Blood & Medical Help', subtitle: 'SOS Hotline: +91 9528049722', action: 'sos' },
];

export default function CommandSearchModal({
  isOpen,
  onClose,
  onNavigatePage,
  onDonateClick,
  onSelectCamp,
}: CommandSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>(DEFAULT_SUGGESTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchResults = async (q: string) => {
    if (!q.trim()) {
      setResults(DEFAULT_SUGGESTIONS);
      setSelectedIndex(0);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setSelectedIndex(0);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    fetchResults(val);
  };

  const handleSelectResult = (item: any) => {
    onClose();
    if (item.action === 'donate') {
      onDonateClick(item.cause, item.amount);
    } else if (item.action === 'page') {
      onNavigatePage(item.page);
    } else if (item.action === 'map') {
      onNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById('khatima-programs-map');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (item.action === 'docs') {
      onNavigatePage('features');
    } else if (item.action === 'sos') {
      onNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById('sos-hotline');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (item.action === 'faq') {
      onNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById('faqs-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50/70">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search programs, camps, Khatima locations, 80G tax rules, sponsor needs..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                fetchResults('');
              }}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-stone-500 rounded border border-stone-300 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 space-y-1">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span>Searching across Khatima portal...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs sm:text-sm">
              No matching programs or locations found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id || index}
                  type="button"
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/80 text-emerald-950' : 'hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      item.type === 'need' ? 'bg-amber-100 text-amber-800' :
                      item.type === 'camp' ? 'bg-emerald-100 text-emerald-800' :
                      item.type === 'program' ? 'bg-teal-100 text-teal-800' :
                      'bg-stone-100 text-stone-700'
                    }`}>
                      {item.type === 'need' && <Heart className="w-4 h-4" />}
                      {item.type === 'camp' && <MapPin className="w-4 h-4" />}
                      {item.type === 'program' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'event' && <Calendar className="w-4 h-4" />}
                      {item.type === 'faq' && <HelpCircle className="w-4 h-4" />}
                      {item.type === 'quick' && <Sparkles className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm truncate">
                          {item.title}
                        </span>
                        {item.type && (
                          <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold shrink-0">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 text-emerald-700' : 'text-stone-300'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">Enter</kbd> to select</span>
          </div>
          <span className="font-semibold text-emerald-800">Khatima Live Search</span>
        </div>
      </div>
    </div>
  );
}
