'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Stethoscope, 
  BookOpen, 
  Users, 
  Trees, 
  HeartHandshake, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Phone, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import { CauseType } from '@/types/ngo';
import { motion } from 'motion/react';

interface ServicesPageProps {
  onDonateClick: (cause?: CauseType, amount?: number) => void;
  onVolunteerClick: () => void;
  onContactClick: () => void;
}

export default function ServicesPage({
  onDonateClick,
  onVolunteerClick,
  onContactClick,
}: ServicesPageProps) {
  const services = [
    {
      id: 'medical-camps',
      title: 'Free Rural Healthcare & Mega Eye Camps',
      category: 'health' as CauseType,
      tagline: 'Comprehensive medical checkups, free spectacles & life-saving medicines',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      icon: Stethoscope,
      stats: '148+ Camps Conducted • 16,500+ Patients Treated',
      description: 'Bringing qualified MBBS doctors, pediatricians, and ophthalmologists to the doorstep of remote villages across Khatima and Terai border blocks. We provide free sugar/BP testing, eye refraction tests, free reading glasses, and sponsor cataract surgeries for elderly villagers.',
      offerings: [
        'Free blood glucose, hemoglobin, and blood pressure screening',
        'Distribution of free generic prescription medicines',
        'Computerized eye tests and distribution of 300+ spectacles per camp',
        'Specialized referrals to district civil hospitals with transport support'
      ],
      donationPreset: 500,
      donationPrompt: 'Sponsor medical kit for 2 elderly patients'
    },
    {
      id: 'child-education',
      title: 'Vidya Jyoti Child Education & Digital Classrooms',
      category: 'education' as CauseType,
      tagline: 'Bridging learning gaps for underprivileged children of daily-wage laborers',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      icon: BookOpen,
      stats: '4,200+ Students • 12 Active Rural Coaching Centers',
      description: 'Running evening after-school learning centers in rural Khatima villages where children receive free homework assistance, foundational math, science, and English coaching. We also provide complete school kits including sturdy school bags, notebooks, geometry boxes, and winter pullovers.',
      offerings: [
        'Free after-school remedial classes for Classes 1st to 10th',
        'Smart audio-visual tablets & STEM learning modules',
        'Free distribution of annual school satchels and stationery sets',
        'School enrollment sponsorship for destitute children & girl students'
      ],
      donationPreset: 1100,
      donationPrompt: 'Provide 1 child complete school kit & stationery'
    },
    {
      id: 'women-empowerment',
      title: 'Shakti Swavlamban: Women Vocational & Sewing Centers',
      category: 'women' as CauseType,
      tagline: 'Fostering financial independence through sewing, tailoring & digital literacy',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      stats: '1,850+ Women Trained • 420+ Micro-Businesses Started',
      description: 'Empowering rural women, single mothers, and young girls in Khatima with professional 6-month tailoring, garment stitching, and embroidery training. Outstanding graduates receive subsidized sewing machines and mentorship to establish home boutique businesses.',
      offerings: [
        'Certified 6-month tailoring and fashion design training',
        'Sewing machine grants and toolkits for graduate women',
        'Financial literacy and Self-Help Group (SHG) micro-finance coaching',
        'Menstrual health awareness & free sanitary pad distribution'
      ],
      donationPreset: 2500,
      donationPrompt: 'Fund sewing materials for 3 training batches'
    },
    {
      id: 'environmental-conservation',
      title: 'Harela Harit Himalayan Afforestation & River Care',
      category: 'environment' as CauseType,
      tagline: 'Protecting the fragile Sharda river basin through native tree plantation',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      icon: Trees,
      stats: '52,000+ Native Saplings Planted • 87% Verified Survival Rate',
      description: 'In honor of Uttarakhand\'s cherished Harela festival, we organize mass afforestation along degraded riparian corridors, school grounds, and roadside tracts with climate-resilient native species (Peepal, Neem, Bael, Sheesham, Jamun) to preserve soil and replenish groundwater.',
      offerings: [
        'Mass plantation of native Himalayan and Terai shade & fruit trees',
        'Dedicated community tree guardians ensuring watering & fencing',
        'Restoration of rural ponds and natural rainwater catchment basins',
        'Environmental eco-clubs active across 24 regional schools'
      ],
      donationPreset: 250,
      donationPrompt: 'Plant and nurture 5 native shade saplings'
    },
    {
      id: 'disaster-winter-relief',
      title: 'Winter Warmth & Emergency Humanitarian Relief',
      category: 'general' as CauseType,
      tagline: 'Immediate sustenance, heavy blankets & rations for vulnerable families',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      icon: HeartHandshake,
      stats: '7,500+ Blankets Distributed • 24/7 Rapid Response',
      description: 'During severe Himalayan winter cold waves and monsoon flood emergencies in Udham Singh Nagar, our emergency response volunteers distribute heavy woollen blankets, thermal caps, socks, dry ration nutrition packs, and provide urgent ambulance transport.',
      offerings: [
        'Annual distribution of high-grade woollen blankets to street dwellers & elders',
        'Fortified nutrition and dry ration kits for poverty-stricken households',
        'Emergency response team for localized seasonal flooding',
        'Temporary shelter support and essential home repair assistance'
      ],
      donationPreset: 500,
      donationPrompt: 'Provide 2 heavy woollen blankets & warm socks'
    },
    {
      id: 'community-guidance',
      title: 'Social Welfare & Public Scheme Facilitation',
      category: 'general' as CauseType,
      tagline: 'Connecting illiterate villagers to government pensions and welfare schemes',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      icon: Scale,
      stats: '3,200+ Citizens Assisted • Zero Consultation Fee',
      description: 'Helping poor villagers navigate documentation for Ayushman Bharat health cards, widow pensions, senior citizen welfare allowances, and Jan Dhan banking. Our Khatima office provides free document printing, application filling, and follow-ups.',
      offerings: [
        'Ayushman Bharat golden card registration guidance',
        'Elderly, disability, and widow pension application assistance',
        'Aadhaar and bank account linkage troubleshooting',
        'Domestic dispute and rights counseling for women in distress'
      ],
      donationPreset: 100,
      donationPrompt: 'Support legal documentation help for 1 rural family'
    }
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1.5 rounded-full font-semibold border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Compassionate Community Programs • Khatima, Uttarakhand</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Our Ground Services & Programs
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From free medical camps and children evening coaching to women tailoring workshops and tree plantation drives, Dreamlight Welfare Society (NGO) delivers tangible grassroots services directly where they are needed most.
        </p>
      </div>

      {/* 2. Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{service.stats.split('•')[0]}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      {service.stats.split('•')[1] || 'Khatima & Terai'}
                    </span>
                    <span className="bg-emerald-600 font-bold px-2.5 py-1 rounded-lg">
                      Free Service
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Offerings Checklist */}
                  <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700">
                    <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] block mb-1">
                      Service Scope & Key Activities:
                    </span>
                    {service.offerings.map((item, idxx) => (
                      <div key={idxx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onDonateClick(service.category, service.donationPreset)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support (₹{service.donationPreset}+)</span>
                </motion.button>
                <button
                  onClick={onContactClick}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
                >
                  Request in Your Village
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* 3. Community Request Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700">
            Village Head & School Partnerships
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Want to Host a Free Medical Camp or Literacy Center in Your Village?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Gram Pradhans, teachers, and community elders in Khatima and surrounding blocks of Udham Singh Nagar can invite our mobile team to conduct health camps, eye checks, or tree plantation drives at zero cost.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`tel:${NGO_CONFIG.phone}`}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call {NGO_CONFIG.displayPhone}</span>
          </a>
          <button
            onClick={onContactClick}
            className="px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-sm border border-stone-700 transition-all cursor-pointer"
          >
            Send Written Request
          </button>
        </div>
      </div>

    </div>
  );
}
