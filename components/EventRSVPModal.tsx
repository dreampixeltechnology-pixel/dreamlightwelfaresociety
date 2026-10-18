'use client';

import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Download, 
  Ticket,
  Phone,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NGOEvent, EventRSVP } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';

interface EventRSVPModalProps {
  event: NGOEvent | null;
  onClose: () => void;
  onRSVPConfirmed: (rsvp: EventRSVP) => void;
}

export default function EventRSVPModal({
  event,
  onClose,
  onRSVPConfirmed,
}: EventRSVPModalProps) {
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [confirmedRSVP, setConfirmedRSVP] = useState<EventRSVP | null>(null);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !attendeePhone) return;

    const rsvp: EventRSVP = {
      id: `rsvp-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      attendeeName: attendeeName.trim(),
      attendeeEmail: attendeeEmail.trim(),
      attendeePhone: attendeePhone.trim(),
      numberOfGuests,
      ticketCode: `EVT-KTM-${Math.floor(1000 + Math.random() * 9000)}`,
      bookedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setConfirmedRSVP(rsvp);
    onRSVPConfirmed(rsvp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Event Registration / Free RSVP</h3>
              <p className="text-xs text-emerald-200">Open to public • Zero registration fee</p>
            </div>
          </div>

          <button
            onClick={() => {
              setConfirmedRSVP(null);
              onClose();
            }}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedRSVP ? (
          /* Confirmed E-Pass */
          <div className="p-6 text-center space-y-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                RSVP Confirmed
              </span>
              <h4 className="text-xl font-bold text-stone-900 mt-1">
                Your Free Event Pass is Ready!
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                We have registered {confirmedRSVP.numberOfGuests} attendee(s). Show this pass or ticket code at the entrance.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-5 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 text-left relative space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-emerald-700 uppercase font-bold tracking-wider">
                    Dreamlight NGO Event Pass
                  </span>
                  <h5 className="font-bold text-stone-900 text-sm">{event.title}</h5>
                </div>
                <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  {confirmedRSVP.ticketCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">Attendee Name</span>
                  <strong className="text-stone-800">{confirmedRSVP.attendeeName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Date & Time</span>
                  <strong className="text-stone-800">{event.date}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Venue</span>
                  <strong className="text-stone-800">{event.venue}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Passes</span>
                  <strong className="text-stone-800">{confirmedRSVP.numberOfGuests} Person(s)</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  Venue Help: {NGO_CONFIG.displayPhone}
                </span>
                <span className="text-emerald-700 font-semibold">Entry: Free</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Download Ticket</span>
              </button>
              <button
                onClick={() => {
                  setConfirmedRSVP(null);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-stone-700">
              <h4 className="font-bold text-emerald-950 text-sm mb-1">{event.title}</h4>
              <p className="flex items-center gap-1.5 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{event.date} • {event.time}</span>
              </p>
              <p className="flex items-center gap-1.5 text-stone-600 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{event.venue}, {event.city}</span>
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="e.g. Ramesh Joshi"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={attendeePhone}
                    onChange={(e) => setAttendeePhone(e.target.value)}
                    placeholder="9528049722"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Number of Attendees
                </label>
                <select
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                >
                  <option value={1}>1 Person (Just Me)</option>
                  <option value={2}>2 Persons (Family / Friend)</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4+ Group / Family</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-700/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Confirm Free RSVP & Generate Pass</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
