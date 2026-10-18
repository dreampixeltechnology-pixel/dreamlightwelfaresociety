'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { INITIAL_EVENTS, NGO_CONFIG } from '@/lib/mock-data';
import { NGOEvent } from '@/types/ngo';

interface EventsPageProps {
  onEventClick: (event: NGOEvent) => void;
  onVolunteerClick: () => void;
}

export default function EventsPage({ onEventClick, onVolunteerClick }: EventsPageProps) {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Community Camps & Mobilization
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Events & Medical Camps in Khatima
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Join our upcoming free health checkups, river afforestation drives, and children warmth distributions across Khatima and neighbouring blocks. Free admission for all community members.
        </p>
      </div>

      {/* Events Grid */}
      <div className="space-y-6">
        {INITIAL_EVENTS.map((event) => {
          const seatsLeft = event.seatsTotal - event.seatsBooked;
          return (
            <div 
              key={event.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Event Image */}
              <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[260px] bg-stone-100">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-900/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  Free Community Access
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-800 font-semibold">
                    <span className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg text-stone-700">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Venue:</strong> {event.venue}, {event.city}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Target:</strong> {event.targetBeneficiaries} ({seatsLeft} registrations remaining)</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Coordinator:</strong> {event.coordinator.name} ({event.coordinator.phone})</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onEventClick(event)}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Free RSVP / Download Pass</span>
                  </button>

                  <button
                    onClick={onVolunteerClick}
                    className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
                  >
                    Volunteer for Camp
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
