'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Receipt, 
  Smartphone, 
  BarChart3, 
  UserCheck, 
  Calendar, 
  Phone, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  ArrowRight,
  Download,
  QrCode,
  FileSpreadsheet,
  Zap,
  Globe2
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import { motion } from 'motion/react';

interface FeaturesPageProps {
  onDonateClick: () => void;
  onVolunteerClick: () => void;
  openAdmin: () => void;
}

export default function FeaturesPage({
  onDonateClick,
  onVolunteerClick,
  openAdmin,
}: FeaturesPageProps) {
  const features = [
    {
      icon: Receipt,
      title: 'Instant 80G Tax Exemption Receipt',
      tagline: '50% Income Tax Exemption under Section 80G',
      description: 'The moment your donation is verified by our server, an official government-compliant 80G receipt is automatically generated with a unique serial number, digital signature, and QR stamp. You can immediately print or download it as a PDF.',
      badge: 'Statutory 80G & 12A Certified',
      highlight: 'Order No: ' + NGO_CONFIG.taxExemption80G.split(' ')[0]
    },
    {
      icon: Heart,
      title: 'Micro-Donations Starting from ₹100',
      tagline: 'Giving made accessible for every compassionate citizen',
      description: 'You don\'t need millions to make an impact. We built our platform around micro-contributions starting at ₹100. Even ₹100 directly sponsors notebooks and pencils for a rural schoolchild or tree sapling care in Khatima.',
      badge: 'Democratic Philanthropy',
      highlight: 'Presets for ₹100, ₹250, ₹500, ₹1100, ₹2500+'
    },
    {
      icon: Smartphone,
      title: 'Integrated Multi-Method Payment Gateway',
      tagline: 'UPI, QR Codes, Cards, NetBanking & Bank Transfer',
      description: 'Pay instantly via Google Pay, PhonePe, Paytm, BHIM UPI, debit/credit cards, or direct bank transfer (NEFT/RTGS to HDFC Bank Khatima). All transactions are encrypted with 256-bit TLS security and verified on the server.',
      badge: '100% Encrypted & Safe',
      highlight: 'UPI ID: ' + NGO_CONFIG.bankDetails.upiId
    },
    {
      icon: Lock,
      title: 'Server-Side Verification & Email Dispatches',
      tagline: 'Zero falsified records with cryptographic transaction receipts',
      description: 'Every donation undergoes server-side payload validation at `/api/donations/verify`. An automated email confirmation and duplicate receipt log is transmitted directly to the donor and administrative officers.',
      badge: 'Zero-Fraud System',
      highlight: 'Live SHA256 Signature Verification'
    },
    {
      icon: BarChart3,
      title: 'Live Admin Dashboard & Data Export',
      tagline: 'Complete visibility into donations, volunteers & event RSVPs',
      description: 'Authorized NGO administrators can view real-time fundraising analytics, search through historical receipts, toggle volunteer approval statuses, and download complete formatted CSV spreadsheets for financial auditing.',
      badge: 'Public Accountability',
      highlight: 'Instant 1-Click CSV Ledger Export'
    },
    {
      icon: UserCheck,
      title: 'Volunteer Management & Digital ID Pass',
      tagline: 'Instant credentials for community heroes',
      description: 'Volunteers applying for teaching, medical camp support, or afforestation receive an instant, downloadable Dreamlight Welfare Society Volunteer ID Badge with a unique registration code, validity period, and emergency contact details.',
      badge: 'Verified Volunteer Network',
      highlight: 'Official Digital Pass with VOL-ID'
    },
    {
      icon: Calendar,
      title: 'Free Event RSVP & Pass Generator',
      tagline: 'Hassle-free community attendance for medical camps',
      description: 'Villagers and supporters can reserve seats for upcoming eye screening camps, tree plantation drives, and winter blanket distributions. The system instantly generates a ticket code and e-pass for smooth gate verification.',
      badge: 'Zero-Cost Community Access',
      highlight: 'Live Seat Availability Tracking'
    },
    {
      icon: Phone,
      title: 'Dedicated Khatima Ground Helpline & WhatsApp',
      tagline: 'Human connectivity with physical office presence',
      description: 'Unlike anonymous online platforms, Dreamlight Welfare Society (NGO) operates a physical office near Subhash Chowk, Tanakpur Road, Khatima with a direct helpline (+91 9528049722) and active WhatsApp coordination for real-time donor queries.',
      badge: 'Direct WhatsApp & Helpline',
      highlight: 'Helpline: +91 9528049722'
    }
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#134E35] uppercase tracking-widest block">
          Platform Capabilities & Transparency Standards
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Features of Dreamlight Welfare Society Platform
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Engineered for 100% transparency, instant statutory 80G tax receipts, accessible micro-donations starting at ₹100, and verified volunteer coordination across all communities.
        </p>
      </div>

      {/* 2. Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {feat.badge}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug mt-0.5">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <span className="text-[11px] font-mono text-stone-500 font-medium block truncate">
                  {feat.highlight}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Interactive Quick Action Ribbon */}
      <div className="bg-stone-100/90 rounded-3xl p-8 sm:p-10 border border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/80 px-3 py-1 rounded-full">
              Try It in Real-Time
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Experience the 80G Receipt & Admin Analytics Flow
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Donate ₹100 or ₹500 to test our instant server-side payment verification, printable 80G receipt, and see your contribution reflected live inside the Admin Dashboard.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={onDonateClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Test Donation (Starting ₹100)</span>
            </button>

            <button
              onClick={openAdmin}
              className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Open Admin Dashboard</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
