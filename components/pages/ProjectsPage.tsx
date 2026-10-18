'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Stethoscope,
  Trees,
  Filter
} from 'lucide-react';
import { INITIAL_PROJECTS, NGO_CONFIG } from '@/lib/mock-data';
import { CauseType, Project } from '@/types/ngo';

interface ProjectsPageProps {
  onDonateClick: (cause?: CauseType, amount?: number) => void;
  onVolunteerClick: (cause?: CauseType) => void;
}

export default function ProjectsPage({ onDonateClick, onVolunteerClick }: ProjectsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | CauseType>('all');

  const filteredProjects = selectedFilter === 'all'
    ? INITIAL_PROJECTS
    : INITIAL_PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Transformative Initiatives
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Our Ground Projects in Khatima
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Explore our targeted humanitarian programs addressing education, medical camps, forest biodiversity, and women empowerment. Every project is monitored with 100% financial and operational transparency.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          All Programs ({INITIAL_PROJECTS.length})
        </button>
        <button
          onClick={() => setSelectedFilter('education')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedFilter === 'education'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          Child Education
        </button>
        <button
          onClick={() => setSelectedFilter('health')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedFilter === 'health'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          Medical & Eye Camps
        </button>
        <button
          onClick={() => setSelectedFilter('environment')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedFilter === 'environment'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          Harela Tree Plantation
        </button>
        <button
          onClick={() => setSelectedFilter('women')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedFilter === 'women'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          Women Empowerment
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const percent = Math.min(Math.round((project.raisedAmount / project.targetAmount) * 100), 100);
          return (
            <div 
              key={project.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-emerald-900/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {project.beneficiariesCount}+ Beneficiaries
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs capitalize">
                    {project.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {project.location}
                    </span>
                    <span className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg">
                      {percent}% Funded
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700">
                    <span className="font-bold text-stone-900 text-[11px] uppercase tracking-wider block mb-1">
                      Ground Impact Highlights:
                    </span>
                    {project.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Raised: <strong className="text-stone-900 font-bold">₹{project.raisedAmount.toLocaleString('en-IN')}</strong></span>
                      <span>Target: ₹{project.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onDonateClick(project.category, 500)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Project</span>
                </button>
                <button
                  onClick={() => onVolunteerClick(project.category)}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
                >
                  Volunteer Here
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
