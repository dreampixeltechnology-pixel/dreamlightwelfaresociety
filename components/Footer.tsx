'use client';

import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import DreamlightLogo from '@/components/DreamlightLogo';

interface FooterProps {
  setActivePage: (page: string) => void;
  openDonateModal: (cause?: any) => void;
  openVolunteerModal: () => void;
  setIsAdmin: (val: boolean) => void;
}

export default function Footer({
  setActivePage,
  openDonateModal,
  openVolunteerModal,
  setIsAdmin,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Card: 80G Tax Exemption & Direct Khatima Contact */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-stone-800 to-emerald-950/70 rounded-3xl p-6 sm:p-8 border border-emerald-800/40 mb-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Tax Deductible Under Section 80G of Income Tax Act</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Empowering the Terai & Himalayan Foothills of Khatima
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Your humble contribution of just <strong className="text-emerald-300 font-semibold">₹100</strong> sponsors clean drinking water, school notebooks, or free doctor consultations for a family in need. All donations receive an instant verifiable digital receipt.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap gap-3 items-center justify-start lg:justify-end">
              <button
                onClick={() => openDonateModal()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate Now (Min ₹100)</span>
              </button>

              <a
                href={`https://wa.me/${NGO_CONFIG.whatsappNumber}?text=Namaste%20Dreamlight%20Welfare%20Society,%20I%20would%20like%20to%20know%20more%20about%20your%20activities%20in%20Khatima.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-emerald-400 hover:text-emerald-300 border border-stone-700 font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Khatima</span>
              </a>
            </div>

          </div>
        </div>

        {/* 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: About Organisation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <DreamlightLogo size={46} showText={false} />
              <div>
                <span className="font-serif text-xl font-bold text-white block">
                  {NGO_CONFIG.name}
                </span>
                <span className="text-xs text-amber-300 font-semibold block">
                  Registered Welfare Society & NGO
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Registered Welfare Society & NGO dedicated to holistic child education, free medical & eye care camps, afforestation of the Sharda basin, and women vocational self-reliance across Khatima and adjoining Terai rural blocks of Uttarakhand.
            </p>

            {/* Legal Tags */}
            <div className="space-y-1.5 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Reg. No: <strong>{NGO_CONFIG.registrationNo}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>NITI Aayog Darpan: <strong>{NGO_CONFIG.nitiDarpanId}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>PAN: <strong>{NGO_CONFIG.panNumber}</strong> (80G & 12A Certified)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors">
                  1. Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-emerald-400 transition-colors">
                  2. About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-emerald-400 transition-colors">
                  3. Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('features')} className="hover:text-emerald-400 transition-colors">
                  4. Features
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-emerald-400 transition-colors">
                  5. Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-emerald-400 transition-colors text-xs text-stone-500">
                  Projects & Ground Work
                </button>
              </li>
              <li>
                <button onClick={() => openDonateModal()} className="hover:text-emerald-400 transition-colors font-medium text-emerald-300">
                  Donate (Starting ₹100)
                </button>
              </li>
              <li>
                <button onClick={openVolunteerModal} className="hover:text-emerald-400 transition-colors text-xs text-stone-300">
                  Join as Volunteer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: NGO Causes */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Core Pillars
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Child Education & Vidya Jyoti</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Free Health & Medical Camps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Environmental & Harela Drive</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Women Empowerment & Sewing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Winter Warmth & Disaster Relief</span>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 text-xs text-stone-300">
              <span className="text-amber-400 font-semibold block mb-1">Direct Bank Details (NEFT/RTGS):</span>
              <span>A/c: {NGO_CONFIG.bankDetails.accountNumber}</span><br />
              <span>IFSC: {NGO_CONFIG.bankDetails.ifscCode}</span><br />
              <span>UPI: <strong className="text-white">{NGO_CONFIG.bankDetails.upiId}</strong></span>
            </div>
          </div>

          {/* Col 4: Official Khatima Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Khatima Office
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Near Subhash Chowk, Tanakpur Road, Khatima, Udham Singh Nagar, Uttarakhand - 262308
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`tel:${NGO_CONFIG.phone}`} 
                  className="font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  {NGO_CONFIG.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`mailto:${NGO_CONFIG.email}`} 
                  className="text-stone-300 hover:text-emerald-400 transition-colors break-all"
                >
                  {NGO_CONFIG.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-stone-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-800">
              <button
                onClick={() => setIsAdmin(true)}
                className="text-xs text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Staff & Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {currentYear} {NGO_CONFIG.name}. All Rights Reserved. Non-Profit Organisation (Regd. Uttarakhand).
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Section 80G Compliant</span>
            <span>•</span>
            <span>Khatima, Uttarakhand</span>
            <span>•</span>
            <span>Helpline: {NGO_CONFIG.displayPhone}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
