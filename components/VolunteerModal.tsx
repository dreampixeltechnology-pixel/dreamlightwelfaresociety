'use client';

import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Award, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CauseType, VolunteerApplication } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';
import DreamlightLogo from '@/components/DreamlightLogo';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVolunteerRegistered: (volunteer: VolunteerApplication) => void;
}

const CAUSE_OPTIONS: { id: CauseType; label: string }[] = [
  { id: 'education', label: 'Child Education & Evening Coaching' },
  { id: 'health', label: 'Doctor / Medical & Health Camps Support' },
  { id: 'environment', label: 'Harela Tree Plantation & Clean Drives' },
  { id: 'women', label: 'Women Skill Training & Handicrafts' },
  { id: 'general', label: 'Disaster Relief & Event Management' },
];

const SKILL_OPTIONS = [
  'Teaching / Tutoring',
  'Medical / Nursing / First Aid',
  'Photography / Videography',
  'Social Media & Content',
  'Event Coordination',
  'Counselling & Mentorship',
  'Driving / Logistics',
  'IT & Web Support',
];

export default function VolunteerModal({
  isOpen,
  onClose,
  onVolunteerRegistered,
}: VolunteerModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(23);
  const [city, setCity] = useState('Khatima, Uttarakhand');
  const [occupation, setOccupation] = useState('');
  const [interestArea, setInterestArea] = useState<CauseType>('education');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Teaching / Tutoring']);
  const [availability, setAvailability] = useState<'weekends' | 'weekdays' | 'flexible' | 'full_time'>('weekends');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(5);
  const [motivation, setMotivation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdVolunteer, setCreatedVolunteer] = useState<VolunteerApplication | null>(null);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          age,
          city,
          occupation,
          skills: selectedSkills,
          interestArea,
          availability,
          hoursPerWeek,
          motivation,
        }),
      });

      const data = await res.json();
      if (data.success && data.volunteer) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
        });
        setCreatedVolunteer(data.volunteer);
        onVolunteerRegistered(data.volunteer);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Join Dreamlight Volunteer Network</h3>
              <p className="text-xs text-emerald-200">
                Be the change in education, healthcare & community welfare
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCreatedVolunteer(null);
              onClose();
            }}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If volunteer pass created */}
        {createdVolunteer ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Welcome to the Dreamlight Welfare Society Family!
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Volunteer Card Issued
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Our volunteer lead will contact you on <strong>{createdVolunteer.phone}</strong>.
              </p>
            </div>

            {/* Visual Volunteer Badge Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-xl text-left relative overflow-hidden border border-emerald-600/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <DreamlightLogo size={36} showText={false} />
                  <div>
                    <span className="font-serif font-bold text-sm block">Dreamlight Welfare Society</span>
                    <span className="text-[10px] text-amber-300">Registered Non-Profit Welfare Society</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/40">
                  {createdVolunteer.volunteerId}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-stone-700 border-2 border-emerald-400 flex items-center justify-center text-emerald-200 font-bold text-xl uppercase">
                  {createdVolunteer.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{createdVolunteer.fullName}</h4>
                  <p className="text-xs text-emerald-300 font-medium capitalize">
                    Role: {createdVolunteer.interestArea} Lead Volunteer
                  </p>
                  <p className="text-[11px] text-stone-300 mt-0.5">
                    Location: {createdVolunteer.city}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
                <span>Validity: 2026 - 2027</span>
                <span className="text-emerald-300 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Volunteer
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handlePrintCard}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print Volunteer Pass</span>
              </button>
              <button
                onClick={() => {
                  setCreatedVolunteer(null);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Rawat"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9528049722"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  City / Village *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Khatima, Uttarakhand"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Occupation / Study
                </label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Student, Teacher, Doctor, IT, etc."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Weekly Commitment
                </label>
                <select
                  value={availability}
                  onChange={(e: any) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                >
                  <option value="weekends">Weekends Only (3-6 hrs)</option>
                  <option value="weekdays">Weekdays Evenings</option>
                  <option value="flexible">Flexible / Remote Support</option>
                  <option value="full_time">Full-time Volunteer / Intern</option>
                </select>
              </div>
            </div>

            {/* Cause Interest */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Which Cause Excites You Most?
              </label>
              <select
                value={interestArea}
                onChange={(e: any) => setInterestArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
              >
                {CAUSE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Your Skills & Strengths (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivation statement */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Why do you want to volunteer with Dreamlight Welfare Society?
              </label>
              <textarea
                rows={2}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Share a short note about your inspiration..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-700/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Registering Application...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Submit Volunteer Registration & Get Pass</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-stone-500 mt-2">
                Questions? Call our volunteer coordinator at {NGO_CONFIG.displayPhone}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
