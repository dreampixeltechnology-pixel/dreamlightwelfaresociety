'use client';

import React from 'react';
import { Heart, Phone, MessageCircle, QrCode } from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';

interface MobileActionDockProps {
  onDonateClick: () => void;
}

export default function MobileActionDock({ onDonateClick }: MobileActionDockProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-2.5 px-4 sm:hidden shadow-lg flex items-center justify-between gap-2">
      <a
        href={`tel:${NGO_CONFIG.phone}`}
        className="flex-1 py-2 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-stone-600" />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${NGO_CONFIG.whatsappNumber}?text=Namaste%20Dreamlight%20Welfare%20Society`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={onDonateClick}
        className="flex-2 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
      >
        <Heart className="w-3.5 h-3.5 fill-white" />
        <span>Donate (₹100+)</span>
      </button>
    </div>
  );
}
