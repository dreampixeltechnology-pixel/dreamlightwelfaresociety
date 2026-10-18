'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Target, 
  Eye, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  Calendar
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import { motion } from 'motion/react';
import DreamlightLogo from '@/components/DreamlightLogo';

interface AboutPageProps {
  onDonateClick: () => void;
  onVolunteerClick: () => void;
  setActivePage?: (page: string) => void;
}

export default function AboutPage({ onDonateClick, onVolunteerClick, setActivePage }: AboutPageProps) {
  const leadership = [
    {
      name: 'Dr. Vivek Bhatt',
      role: 'Founder & Chief Medical Director',
      bio: 'Senior physician with over 16 years of public health experience in Terai Uttarakhand. Initiator of the Aarogya Seva free rural clinic series.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Pooja Rawat',
      role: 'Director of Education & Women Livelihoods',
      bio: 'Social pedagogue dedicated to child literacy in remote forest villages of Khatima and author of the Vidya Jyoti bridge curriculum.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Ramesh Singh Bisht',
      role: 'Operations & Himalayan Forestry Lead',
      bio: 'Environmental champion leading community afforestation of native Sharda river basin trees with over 52,000 saplings planted to date.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <DreamlightLogo size={22} showText={false} />
          <span className="font-bold text-stone-900">Dreamlight Welfare Society (Regd. NGO)</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Khatima, U.S. Nagar, Uttarakhand</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-emerald-800 font-semibold">80G & 12A Certified</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          About Dreamlight Welfare Society (NGO)
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Founded in Khatima, Uttarakhand with an uncompromising commitment to human dignity, quality child education, free healthcare, and green Himalayan ecology.
        </p>
      </div>

      {/* 2. Full Name & Legal Registration Section */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              Legal Identity & Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              What Does Our NGO Stand For?
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              An <strong>NGO (Non-Governance Organisation / Non-Governmental Organisation)</strong> is an independent non-profit entity created by citizens to serve community welfare without commercial or governmental bias.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              <strong>{NGO_CONFIG.fullLegalName}</strong> was established in Khatima, U.S. Nagar to directly address rural poverty, lack of primary school support, preventative healthcare deserts, and deforestation along the Sharda river corridor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Societies Reg. No.</span>
                <span className="font-bold text-stone-900 font-mono">{NGO_CONFIG.registrationNo}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">NITI Aayog Darpan ID</span>
                <span className="font-bold text-stone-900 font-mono">{NGO_CONFIG.nitiDarpanId}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">Tax Exemption</span>
                <span className="font-bold text-emerald-800">Section 80G & 12A Certified</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block font-medium">PAN of NGO</span>
                <span className="font-bold text-stone-900 font-mono">{NGO_CONFIG.panNumber}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-3xl border border-stone-800 text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <DreamlightLogo size={180} showText={false} className="hover:scale-105 transition-transform duration-300 drop-shadow-2xl" />
            <h3 className="text-white font-serif font-bold text-base mt-4">Dreamlight Welfare Society</h3>
            <span className="text-amber-300 text-xs font-semibold">Non-Governance Organisation</span>
            <span className="text-stone-400 text-[11px] mt-0.5">Khatima, U.S. Nagar, Uttarakhand</span>
          </div>

        </div>
      </motion.div>

      {/* 3. Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 sm:p-8 rounded-3xl bg-emerald-900 text-white shadow-md flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Our Mission</h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              To alleviate rural deprivation in Khatima and Uttarakhand by providing every child free quality educational tools, enabling preventative healthcare access, promoting women financial sovereignty, and planting native trees for future generations.
            </p>
          </div>
          <div className="pt-2 text-xs text-emerald-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>Rooted in Ground Empathy</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Our Vision</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              An empowered, healthy, and self-sufficient Uttarakhand where no child is deprived of schooling due to poverty, no elder suffers preventable blindness, and women hold independent income with confidence and dignity.
            </p>
          </div>
          <div className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>Sustainable Self-Reliance</span>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="p-6 sm:p-8 rounded-3xl bg-stone-100 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Core Values</h3>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Absolute Transparency:</strong> Public audit reports</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Inclusivity:</strong> Service beyond caste or religion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Micro-Impact:</strong> Every ₹100 is valued</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Ecological Care:</strong> Himalayan conservation</span>
              </li>
            </ul>
          </div>
          <div className="pt-2 text-xs text-stone-500">
            Regd. under Section 12A & 80G
          </div>
        </motion.div>

      </div>

      {/* 4. NGO Benefits & Community Impact Showcase */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#134E35] uppercase tracking-widest block">
            Real Transformations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Key Benefits Delivered by Dreamlight Welfare Society
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 text-base">Free Prescription Medicines & Diagnostics</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rural families often skip medical treatment due to transport costs and drug prices. Our mobile clinics bring MBBS doctors, testing kits, and essential drugs directly to rural doorsteps without any consultation charges.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 text-base">Vocational Sewing Machines for Women</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We don’t just give temporary aid; we teach professional stitching, blouse fabrication, embroidery, and handicraft. Graduates receive certified diplomas and machine grants, turning homemakers into proud earners.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 text-base">Children Remedial Centers & School Kits</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Evening coaching centers assist children of daily wage workers with homework, foundational mathematics, and English literacy. Every child receives free school satchels, geometry boxes, and winter pullovers.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 text-base">Harela Green Belts & Tree Survival Care</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unlike mass drives that abandon saplings, Dreamlight Welfare Society employs community caretakers to nurture planted Peepal, Bael, Neem, and Jamun saplings. Our documented survival rate exceeds 87% across project areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Dedicated Stewards
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Leadership & Advisory Board
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs p-6 space-y-4 text-center">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-emerald-100 shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">{member.name}</h4>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">{member.role}</p>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Contact & Physical Presence in Khatima */}
      <div className="p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold">Visit or Call Our Khatima Office</h3>
          <p className="text-xs sm:text-sm text-stone-300">
            {NGO_CONFIG.address} | Phone: <strong className="text-emerald-400">{NGO_CONFIG.displayPhone}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={onDonateClick}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
          >
            Donate (from ₹100)
          </button>
          <button
            onClick={onVolunteerClick}
            className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-all cursor-pointer"
          >
            Volunteer With Us
          </button>
          {setActivePage && (
            <button
              onClick={() => setActivePage('services')}
              className="px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 font-semibold text-xs sm:text-sm border border-emerald-700 transition-all cursor-pointer"
            >
              Explore Services →
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
