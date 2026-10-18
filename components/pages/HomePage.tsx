'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  BookOpen, 
  Stethoscope, 
  Trees, 
  Calendar, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ChevronDown, 
  Quote, 
  TrendingUp, 
  FileCheck,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ExternalLink,
  Camera,
  Filter,
  FileText
} from 'lucide-react';
import { 
  NGO_CONFIG, 
  INITIAL_PROJECTS, 
  INITIAL_EVENTS, 
  TESTIMONIALS, 
  FAQ_ITEMS,
  SPONSOR_NEEDS,
  GROUND_GALLERY
} from '@/lib/mock-data';
import { CauseType, Project, NGOEvent, SponsorNeed, GalleryItem } from '@/types/ngo';
import { motion, AnimatePresence } from 'motion/react';
import DreamlightLogo from '@/components/DreamlightLogo';
import KhatimaImpactMap from '@/components/KhatimaImpactMap';
import ImpactCalculator from '@/components/ImpactCalculator';
import StatutoryDocsModal from '@/components/StatutoryDocsModal';

interface HomePageProps {
  onDonateClick: (cause?: CauseType, amount?: number) => void;
  onVolunteerClick: () => void;
  onEventClick: (event: NGOEvent) => void;
  setActivePage: (page: string) => void;
}

export default function HomePage({
  onDonateClick,
  onVolunteerClick,
  onEventClick,
  setActivePage,
}: HomePageProps) {
  const [quickAmount, setQuickAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [needFilter, setNeedFilter] = useState<string>('all');
  const [isStatutoryModalOpen, setIsStatutoryModalOpen] = useState<boolean>(false);
  const [activeGalleryModal, setActiveGalleryModal] = useState<GalleryItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeAmount = customAmount ? Number(customAmount) : quickAmount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(NGO_CONFIG.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const filteredGallery = galleryFilter === 'all' 
    ? GROUND_GALLERY 
    : GROUND_GALLERY.filter(item => item.category === galleryFilter);

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">

      {/* 1. HERO SECTION: CLEAN, HIGH-TRUST, ACTION-DRIVEN */}
      <section className="relative overflow-hidden pt-2 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Hindi Motto & Instant Giving Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
                <DreamlightLogo size={22} showText={false} />
                <span className="text-stone-900 font-bold">Dreamlight Welfare Society (Regd. NGO)</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Khatima, Uttarakhand</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Section 80G & 12A Certified
                </span>
              </div>

              {/* Headline with Hindi Touch */}
              <div className="space-y-2">
                <p className="text-emerald-800 font-semibold text-sm sm:text-base tracking-wide font-sans">
                  हर बच्चे को शिक्षा, हर बुज़ुर्ग को स्वास्थ्य • Dedicated Grassroots Action
                </p>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
                  Empowering Lives,{' '}
                  <span className="text-emerald-800">
                    Restoring Dignity
                  </span>{' '}
                  in Khatima.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                We work directly on the ground across Khatima and Terai border villages—running free medical & eye camps, daily remedial schooling for slum children, women vocational sewing hubs, and Himalayan river afforestation.
              </p>

              {/* Direct Quick Giving Box */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    Quick Contribution (Starting from ₹100)
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    Instant 80G Tax Exemption
                  </span>
                </div>

                {/* Preset Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[100, 250, 500, 1000, 2500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setQuickAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        !customAmount && quickAmount === amt
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                  
                  <div className="relative flex-1 min-w-[120px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">₹</span>
                    <input 
                      type="number"
                      min={100}
                      placeholder="Other Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-6 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-stone-200 focus:outline-emerald-600 bg-stone-50"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onDonateClick('general', activeAmount || 500)}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donate ₹{(activeAmount || 500).toLocaleString('en-IN')} Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={onVolunteerClick}
                    className="py-3.5 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-stone-600" />
                    <span>Join as Volunteer</span>
                  </button>
                </div>

                {/* Verified Trust Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 border-t border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-stone-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      NGO Darpan ID: {NGO_CONFIG.nitiDarpanId}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="font-mono text-stone-600">UPI: {NGO_CONFIG.bankDetails.upiId}</span>
                  </div>

                  <a
                    href="#khatima-programs-map"
                    className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Khatima Camps Map ↓</span>
                  </a>
                </div>
              </div>

            </motion.div>

            {/* Right Column: High Impact Photo & Key Stat Cards */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-4/3 sm:aspect-1/1">
                <Image
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
                  alt="Rural children learning in Khatima"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-900/10" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-sm border border-stone-200/80 flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-stone-900 block leading-tight">Direct Ground Presence</span>
                    <span className="text-[10px] text-stone-500">Khatima Tehsil, U.S. Nagar</span>
                  </div>
                </div>

                {/* Bottom Impact Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Direct Beneficiaries Reached
                    </span>
                    <span className="text-2xl font-extrabold text-stone-900 font-serif">
                      {NGO_CONFIG.stats.livesImpacted.toLocaleString('en-IN')}+
                    </span>
                    <span className="text-xs text-stone-600 block">
                      Rural children, elderly patients & women
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. VERIFIED CREDIBILITY & STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-emerald-900 text-white shadow-xl relative overflow-hidden">
          <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-emerald-800/80 pb-4 sm:pb-0 sm:pr-4 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-300">4,200+</span>
            <h4 className="text-sm font-bold text-white">Children Educated</h4>
            <p className="text-xs text-emerald-200/80">12 rural coaching & digital hubs</p>
          </div>

          <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-emerald-800/80 pb-4 sm:pb-0 sm:pr-4 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-300">148+</span>
            <h4 className="text-sm font-bold text-white">Free Health Camps</h4>
            <p className="text-xs text-emerald-200/80">MBBS doctor checkups & medicines</p>
          </div>

          <div className="space-y-1 border-r-0 lg:border-r border-emerald-800/80 pb-4 sm:pb-0 lg:pr-4 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-300">52,000+</span>
            <h4 className="text-sm font-bold text-white">Trees Planted</h4>
            <p className="text-xs text-emerald-200/80">Sharda river green buffer belt</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-300">1,850+</span>
            <h4 className="text-sm font-bold text-white">Women Self-Reliant</h4>
            <p className="text-xs text-emerald-200/80">Trained in sewing & livelihood</p>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURE FROM JEEVAN CHETNA: "SPONSOR A NEED" (DIRECT CAUSE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
              Direct Tangible Giving
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
              Sponsor a Specific Need
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Choose where your support goes. 100% of sponsored amounts fund field supplies and free medicines in Khatima.
            </p>
          </div>

          {/* Category Filter for Needs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl text-xs">
            {[
              { id: 'all', label: 'All Needs' },
              { id: 'education', label: 'Child Education' },
              { id: 'health', label: 'Free Healthcare' },
              { id: 'general', label: 'Ration Kits' },
              { id: 'women', label: 'Women Skills' },
              { id: 'environment', label: 'Trees' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setNeedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  needFilter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(needFilter === 'all' 
            ? SPONSOR_NEEDS 
            : SPONSOR_NEEDS.filter(item => item.category === needFilter)
          ).map((item) => (
            <div 
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {/* Amount Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-stone-200 text-stone-900 flex items-center gap-1.5">
                    <span className="font-extrabold text-base text-emerald-800 font-sans">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                    {item.period && (
                      <span className="text-[11px] text-stone-500 font-medium">/{item.period}</span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-emerald-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    {item.beneficiariesCount}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-medium text-emerald-800 block">
                      {item.hindiTitle}
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.impactDescription}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-700 block">Kit Breakdown:</span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-stone-600">
                      {item.itemsIncluded.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onDonateClick(item.category, item.amount)}
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Sponsor for ₹{item.amount.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE IMPACT & 80G SAVINGS CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImpactCalculator onDonateClick={onDonateClick} />
      </section>

      {/* 4. INSTANT UPI QUICK PAY BAR (DREAMLIGHTWELFARESOCIETY@YBL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-700/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left QR Code Container */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                Official NGO UPI QR Code
              </span>

              <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-white">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(
                    `upi://pay?pa=${NGO_CONFIG.bankDetails.upiId}&pn=Dreamlight%20Welfare%20Society&am=500&cu=INR&tn=Donation%20to%20Dreamlight%20Welfare%20Society`
                  )}`}
                  alt={`Scan to donate via UPI: ${NGO_CONFIG.bankDetails.upiId}`}
                  width={150}
                  height={150}
                  className="rounded-lg"
                  referrerPolicy="no-referrer"
                  unoptimized
                />
                <span className="block text-[10px] font-mono text-stone-700 font-bold mt-1">
                  Scan via any UPI App
                </span>
              </div>

              {/* UPI ID Pill & Copy Button */}
              <div className="w-full flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-900/80 border border-stone-700 text-xs">
                <span className="font-mono text-emerald-300 font-bold truncate text-[11px]">
                  {NGO_CONFIG.bankDetails.upiId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Information & Instant App Triggers */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  Zero Commission Direct Transfer
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Direct UPI Donation (Google Pay • PhonePe • Paytm)
                </h3>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                When you pay directly to our registered UPI ID <strong className="text-white">{NGO_CONFIG.bankDetails.upiId}</strong>, 100% of your funds arrive immediately with zero gateway deductions. After payment, take a screenshot and enter details online to claim your official 80G tax rebate receipt.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-bold text-white block">80G Tax Exemption</span>
                  <span className="text-[10px] text-stone-400">50% Income Tax saving</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-bold text-white block">Instant Verification</span>
                  <span className="text-[10px] text-stone-400">Server verified receipt</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-bold text-white block">Khatima Office</span>
                  <span className="text-[10px] text-stone-400">Physical address & team</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <Phone className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-bold text-white block">Helpline Available</span>
                  <span className="text-[10px] text-stone-400">{NGO_CONFIG.displayPhone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onDonateClick('general', 500)}
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Heart className="w-4 h-4 fill-stone-950" />
                  <span>Open Online Donation Portal</span>
                </button>

                <a
                  href={`upi://pay?pa=${NGO_CONFIG.bankDetails.upiId}&pn=Dreamlight%20Welfare%20Society&am=500&cu=INR&tn=Donation%20Dreamlight`}
                  className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Launch Mobile UPI App</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ONGOING COMMUNITY CAMPAIGNS (URGENT APPEALS WITH PROGRESS BARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
              Active Ground Appeals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
              Ongoing Campaigns in Khatima
            </h2>
          </div>
          <button
            onClick={() => setActivePage('projects')}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Programs ({INITIAL_PROJECTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_PROJECTS.slice(0, 2).map((project) => {
            const percentage = Math.min(Math.round((project.raisedAmount / project.targetAmount) * 100), 100);
            return (
              <div 
                key={project.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-900/90 text-white text-xs font-bold px-3 py-1 rounded-xl backdrop-blur-xs">
                      {project.beneficiariesCount}+ Beneficiaries
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
                      <span className="font-medium text-stone-700 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {project.location}
                      </span>
                      <span className="font-bold text-emerald-800">{percentage}% Funded</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs text-stone-600">
                        <span>Raised: <strong className="text-stone-900">₹{project.raisedAmount.toLocaleString('en-IN')}</strong></span>
                        <span>Goal: ₹{project.targetAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={() => onDonateClick(project.category, 500)}
                    className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Support This Project</span>
                  </button>
                  <button
                    onClick={() => setActivePage('projects')}
                    className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. INTERACTIVE KHATIMA AREAS MAP (BUILT WITH REACT-SIMPLE-MAPS) */}
      <section id="khatima-programs-map" className="scroll-mt-20">
        <KhatimaImpactMap 
          onDonateClick={onDonateClick}
          onVolunteerClick={onVolunteerClick}
        />
      </section>

      {/* 7. REAL GROUND ACTION PHOTO GALLERY (MEDIA WALL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
              Field Documentation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
              Real Photos from the Ground
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Documenting our medical camps, school distributions, and women empowerment sessions in Khatima.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl text-xs">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'health', label: 'Health Camps' },
              { id: 'education', label: 'Education' },
              { id: 'women', label: 'Women Skills' },
              { id: 'environment', label: 'Plantation' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  galleryFilter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveGalleryModal(item)}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Image Lightbox Modal */}
        <AnimatePresence>
          {activeGalleryModal && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setActiveGalleryModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
              >
                <div className="relative h-72 sm:h-96 w-full bg-stone-900">
                  <Image
                    src={activeGalleryModal.image}
                    alt={activeGalleryModal.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {activeGalleryModal.location}
                    </span>
                    <span className="text-xs text-stone-400">{activeGalleryModal.date}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {activeGalleryModal.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {activeGalleryModal.caption}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveGalleryModal(null)}
                      className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. UPCOMING MEDICAL CAMPS & EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  Ground Camps & Activities
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                  Upcoming Community Events in Khatima
                </h2>
              </div>
              <button
                onClick={onVolunteerClick}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Volunteer at Next Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_EVENTS.map((event) => (
                <div 
                  key={event.id}
                  className="bg-stone-800/80 rounded-2xl border border-stone-700/80 p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-emerald-400">
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="bg-stone-700 px-2 py-0.5 rounded text-[11px] text-stone-300">
                        Free Entry
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-white text-base leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-stone-300 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="text-[11px] text-stone-400 space-y-1 pt-1 border-t border-stone-700/60">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{event.venue}, {event.city}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Seats: {event.seatsBooked} / {event.seatsTotal} Registered</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onEventClick(event)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Free Event RSVP / Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 9. TRANSPARENCY & FUND ALLOCATION BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/90 rounded-3xl p-8 sm:p-12 border border-stone-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                100% Financial Accountability
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Where Does Your Donation Go?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                As a registered NGO in Khatima, Dreamlight Welfare Society maintains zero leakage, audited accounts, and direct field distribution for all medicines, school supplies, and food kits.
              </p>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>Direct Field Programs, Medicines & Supplies</span>
                    <span className="text-emerald-700">88%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full w-[88%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>Village Outreach, Doctor Travel & Mobile Clinics</span>
                    <span className="text-emerald-700">7%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full w-[7%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>Statutory Audit, Legal Compliance & Receipts</span>
                    <span className="text-emerald-700">5%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-400 rounded-full w-[5%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
                <FileCheck className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-stone-900">Section 80G Certified</h4>
                <p className="text-xs text-stone-500">
                  Instant receipt with PAN number for 50% Income Tax rebate.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
                <TrendingUp className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-stone-900">Starting from ₹100</h4>
                <p className="text-xs text-stone-500">
                  Even ₹100 provides notebooks, pencils, and healthy breakfast.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-stone-900">NITI Aayog Registered</h4>
                <p className="text-xs text-stone-500">
                  Darpan ID: <strong>{NGO_CONFIG.nitiDarpanId}</strong>. Verified NGO.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
                <MapPin className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-stone-900">Physical Khatima Office</h4>
                <p className="text-xs text-stone-500">
                  Near Subhash Chowk, Tanakpur Road, Khatima, Uttarakhand.
                </p>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStatutoryModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Official 80G, 12A & NITI Aayog Darpan Papers</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. REAL BENEFICIARY VOICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
            Impact Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Voices from Khatima Villages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <Quote className="w-8 h-8 text-emerald-200 fill-emerald-100" />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-bold text-stone-900 text-sm">{t.name}</h4>
                <p className="text-xs text-emerald-800 font-medium">{t.role}</p>
                <p className="text-[11px] text-stone-400">{t.village}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Transparent Answers
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180 text-emerald-800' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. EMERGENCY MEDICAL & BLOOD HELP DESK (KHATIMA COMMUNITY SUPPORT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50/90 border border-red-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest block">
              Emergency Grassroots Helpline • Khatima Tehsil
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Need Urgent Blood Donors or Ambulance / Medicine Support?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Our volunteer network coordinates emergency blood donors across Khatima, Melghat, and Chakarpur for government civil hospital patients and accident victims.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0 justify-center">
            <a
              href={`https://wa.me/${NGO_CONFIG.whatsappNumber}?text=Urgent%20Medical%20/%20Blood%20Help%20Needed%20in%20Khatima`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>SOS Helpline (+91 9528049722)</span>
            </a>
            <button
              type="button"
              onClick={onVolunteerClick}
              className="px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Register as Blood Donor
            </button>
          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
              Start Making a Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              Every ₹100 Plants a Hope, Heals a Pain & Educates a Dream.
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Donate safely through UPI, Card, NetBanking, or Bank Transfer. Receive instant 80G tax benefit receipt.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onDonateClick('general', 500)}
              className="px-8 py-4 rounded-2xl bg-white text-emerald-900 hover:bg-stone-100 font-extrabold text-sm sm:text-base shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-emerald-700 text-emerald-700" />
              <span>Donate Now (Starting ₹100)</span>
            </button>
            <button
              onClick={onVolunteerClick}
              className="px-7 py-4 rounded-2xl bg-emerald-900/80 hover:bg-emerald-900 text-white font-semibold text-sm sm:text-base border border-emerald-500/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Join as Volunteer</span>
            </button>
          </div>

          <p className="text-xs text-emerald-200/90">
            Helpline: <strong className="text-white">{NGO_CONFIG.displayPhone}</strong> • Khatima, Udham Singh Nagar, Uttarakhand
          </p>
        </div>
      </section>

      {/* Statutory Certifications Modal */}
      <StatutoryDocsModal
        isOpen={isStatutoryModalOpen}
        onClose={() => setIsStatutoryModalOpen(false)}
      />

    </div>
  );
}
