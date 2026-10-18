'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Heart,
  Navigation
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import { motion } from 'motion/react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'general' | 'donation' | 'partnership' | 'volunteer' | 'csr'>('general');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessResponse(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          category,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessResponse(data.message);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please call 9528049722.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#134E35] uppercase tracking-widest block">
          Get in Touch With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Contact Dreamlight Welfare Society
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Whether you want to coordinate a medical camp, discuss CSR partnerships, or inquire about 80G donation receipts, our team is here to assist.
        </p>
      </div>

      {/* 2. Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Address Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">Registered Office</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {NGO_CONFIG.address}
          </p>
          <div className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Khatima, Udham Singh Nagar (UK)</span>
          </div>
        </motion.div>

        {/* Direct Phone / Helpline */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">Direct Helpline & Call</h3>
          <p className="text-xs sm:text-sm text-stone-600">
            For urgent donation queries, volunteering, or ambulance medical camps:
          </p>
          <a
            href={`tel:${NGO_CONFIG.phone}`}
            className="inline-block text-lg font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
          >
            {NGO_CONFIG.displayPhone}
          </a>
          <div>
            <a
              href={`https://wa.me/${NGO_CONFIG.whatsappNumber}?text=Namaste%20Dreamlight%20Welfare%20Society,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp ({NGO_CONFIG.phone})</span>
            </a>
          </div>
        </motion.div>

        {/* Email & Support */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">Email Correspondence</h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Official communications, CSR grant applications & tax receipts:
          </p>
          <a
            href={`mailto:${NGO_CONFIG.email}`}
            className="inline-block text-sm font-bold text-stone-900 hover:text-emerald-700 transition-colors break-all"
          >
            {NGO_CONFIG.email}
          </a>
          <p className="text-xs text-stone-400">
            Office Hours: Mon - Sat 9:00 AM - 6:00 PM
          </p>
        </motion.div>

      </div>

      {/* 3. Interactive Form & Location Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Send an Inquiry or Feedback</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Fill in your details below and our Khatima office will respond within 24 hours.
            </p>
          </div>

          {successResponse && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successResponse}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Joshi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
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
                  placeholder="e.g. name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="donation">Donation & 80G Receipt Query</option>
                  <option value="volunteer">Volunteering Opportunities</option>
                  <option value="partnership">School / Hospital Medical Camp Tie-up</option>
                  <option value="csr">Corporate CSR Grant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief subject..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you or collaborate in Khatima?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-700/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Location & Visiting Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-md space-y-4">
            <h4 className="font-serif text-xl font-bold">Directions to Khatima Office</h4>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Our registered office is conveniently located along <strong>Tanakpur Road</strong> near <strong>Subhash Chowk</strong> in Khatima town.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-800">
              <p>📍 <strong>From Khatima Railway Station:</strong> ~1.8 km (5 minutes by e-rickshaw or taxi)</p>
              <p>📍 <strong>From Khatima Bus Stand:</strong> ~800 meters walking distance</p>
              <p>📍 <strong>From Sharda Barrage:</strong> ~12 km along Tanakpur Highway</p>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${NGO_CONFIG.phone}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>Call {NGO_CONFIG.displayPhone} for Live Navigation</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-xs text-stone-700 space-y-3">
            <h5 className="font-bold text-emerald-950 text-sm">Transparency Guarantee:</h5>
            <p className="leading-relaxed">
              Donors and supporters are warmly invited to visit our training centers, inspect child literacy sessions, or observe our weekend free medical camps in person.
            </p>
            <div className="pt-1 text-[11px] text-emerald-800 font-semibold">
              Prior appointment recommended for school visits: {NGO_CONFIG.email}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
