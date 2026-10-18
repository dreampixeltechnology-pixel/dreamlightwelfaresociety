'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  ComposableMap, 
  ZoomableGroup, 
  Marker, 
  Line 
} from 'react-simple-maps';
import { 
  Stethoscope, 
  BookOpen, 
  HeartHandshake, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  UserCheck, 
  Users, 
  Phone, 
  Heart, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Filter, 
  Search, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { KHATIMA_LOCATIONS, NGO_CONFIG } from '@/lib/mock-data';
import { KhatimaLocation, CauseType } from '@/types/ngo';
import { motion, AnimatePresence } from 'motion/react';

interface KhatimaImpactMapProps {
  onDonateClick?: (cause?: CauseType, amount?: number) => void;
  onVolunteerClick?: () => void;
}

export default function KhatimaImpactMap({
  onDonateClick,
  onVolunteerClick
}: KhatimaImpactMapProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<KhatimaLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<KhatimaLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');
  const [showRoutes, setShowRoutes] = useState<boolean>(true);

  // Default Khatima center coordinates [longitude, latitude]
  const KHATIMA_CENTER: [number, number] = [79.972, 28.921];

  // Filter locations
  const filteredLocations = useMemo(() => {
    return KHATIMA_LOCATIONS.filter((loc) => {
      const matchesType = 
        selectedType === 'all' ? true :
        selectedType === 'medical' ? loc.type === 'medical' :
        selectedType === 'education' ? loc.type === 'education' :
        selectedType === 'women' ? loc.type === 'women' :
        selectedType === 'mobile_relief' ? loc.type === 'mobile_relief' : true;

      const matchesSearch = 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.servicesProvided.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (loc.doctorInCharge && loc.doctorInCharge.toLowerCase().includes(searchQuery.toLowerCase())) ||
        loc.leadCoordinator.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  const stats = useMemo(() => {
    const totalBeneficiaries = KHATIMA_LOCATIONS.reduce((acc, curr) => acc + curr.beneficiariesCount, 0);
    const medicalLocations = KHATIMA_LOCATIONS.filter(l => l.type === 'medical').length;
    const educationLocations = KHATIMA_LOCATIONS.filter(l => l.type === 'education').length;
    return {
      totalLocations: KHATIMA_LOCATIONS.length,
      totalBeneficiaries,
      medicalLocations,
      educationLocations
    };
  }, []);

  const getTypeColor = (type: KhatimaLocation['type']) => {
    switch (type) {
      case 'medical':
        return {
          bg: 'bg-emerald-600',
          text: 'text-emerald-700',
          lightBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          ring: 'ring-emerald-400',
          hex: '#059669',
          darkHex: '#047857'
        };
      case 'education':
        return {
          bg: 'bg-amber-600',
          text: 'text-amber-800',
          lightBg: 'bg-amber-50',
          border: 'border-amber-200',
          ring: 'ring-amber-400',
          hex: '#d97706',
          darkHex: '#b45309'
        };
      case 'women':
        return {
          bg: 'bg-purple-600',
          text: 'text-purple-700',
          lightBg: 'bg-purple-50',
          border: 'border-purple-200',
          ring: 'ring-purple-400',
          hex: '#9333ea',
          darkHex: '#7e22ce'
        };
      case 'mobile_relief':
        return {
          bg: 'bg-teal-600',
          text: 'text-teal-700',
          lightBg: 'bg-teal-50',
          border: 'border-teal-200',
          ring: 'ring-teal-400',
          hex: '#0d9488',
          darkHex: '#0f766e'
        };
      default:
        return {
          bg: 'bg-stone-700',
          text: 'text-stone-700',
          lightBg: 'bg-stone-50',
          border: 'border-stone-200',
          ring: 'ring-stone-400',
          hex: '#44403c',
          darkHex: '#292524'
        };
    }
  };

  const getTypeIcon = (type: KhatimaLocation['type'], className = "w-4 h-4") => {
    switch (type) {
      case 'medical':
        return <Stethoscope className={className} />;
      case 'education':
        return <BookOpen className={className} />;
      case 'women':
        return <HeartHandshake className={className} />;
      case 'mobile_relief':
        return <Truck className={className} />;
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.3, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.3, 0.85));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedLocation(null);
  };

  return (
    <section id="khatima-programs-map" className="relative py-12 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200/80 overflow-hidden">
      
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tehsil Khatima Field Visualization</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Interactive Map of Medical Camps &amp; Education Programs
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore the grassroots locations across Khatima tehsil and surrounding rural villages where Dreamlight Welfare Society conducts regular health diagnostics, eye camps, and remedial evening classes.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-center px-2 py-1 border-r border-stone-100">
              <span className="block text-xl font-extrabold text-emerald-700">8 Hubs</span>
              <span className="text-[11px] text-stone-500 font-medium">Mapped Centers</span>
            </div>
            <div className="text-center px-2 py-1 border-r border-stone-100">
              <span className="block text-xl font-extrabold text-stone-900">148+</span>
              <span className="text-[11px] text-stone-500 font-medium">Mega Camps</span>
            </div>
            <div className="text-center px-2 py-1 border-r border-stone-100">
              <span className="block text-xl font-extrabold text-amber-700">4,200+</span>
              <span className="text-[11px] text-stone-500 font-medium">Students Taught</span>
            </div>
            <div className="text-center px-2 py-1">
              <span className="block text-xl font-extrabold text-emerald-800">100%</span>
              <span className="text-[11px] text-stone-500 font-medium">Free Access</span>
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'all'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Programs ({KHATIMA_LOCATIONS.length})</span>
              </button>

              <button
                onClick={() => setSelectedType('medical')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'medical'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Medical &amp; Eye Camps ({stats.medicalLocations})</span>
              </button>

              <button
                onClick={() => setSelectedType('education')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'education'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Education Pods ({stats.educationLocations})</span>
              </button>

              <button
                onClick={() => setSelectedType('women')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'women'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Women Centers</span>
              </button>

              <button
                onClick={() => setSelectedType('mobile_relief')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'mobile_relief'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/60'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Mobile &amp; Relief</span>
              </button>
            </div>

            {/* Search and View Mode Switch */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search village, doctor, camp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'map' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Interactive Map</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'cards' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Directory List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Village Chips for Fast Navigation */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-stone-100 text-xs">
            <span className="text-stone-400 font-medium flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Quick Select Area:
            </span>
            {KHATIMA_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc);
                  setViewMode('map');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  selectedLocation?.id === loc.id
                    ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                }`}
              >
                {loc.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DISPLAY: INTERACTIVE MAP OR DIRECTORY CARDS */}
        {viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MAP CANVAS CONTAINER */}
            <div className="lg:col-span-8 bg-stone-900 rounded-3xl p-4 sm:p-6 border border-stone-800 shadow-2xl relative overflow-hidden">
              
              {/* Map Floating Controls Header */}
              <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-stone-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700/80 text-white shadow-lg pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wide">Tehsil Khatima Geospatial Grid</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block">Udham Singh Nagar, Uttarakhand (India)</span>
                </div>

                {/* Map Action Buttons */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={() => setShowRoutes(!showRoutes)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all cursor-pointer ${
                      showRoutes
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                        : 'bg-stone-900/80 text-stone-400 border-stone-700'
                    }`}
                    title="Toggle Outreach Routes from Khatima Hub"
                  >
                    Routes: {showRoutes ? 'On' : 'Off'}
                  </button>

                  <div className="flex items-center bg-stone-900/90 backdrop-blur-md rounded-xl border border-stone-700 p-1 text-stone-200 shadow-lg">
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                      title="Reset View"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* REACT-SIMPLE-MAPS IMPLEMENTATION */}
              <div className="w-full h-[460px] sm:h-[540px] relative mt-10 sm:mt-12 select-none">
                
                {/* SVG Visual Landscape Background (Sharda River, Foothill Topography, Roads) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.75" />
                    </linearGradient>
                    <linearGradient id="forestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
                    </linearGradient>
                    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" strokeWidth="0.75" opacity="0.6" />
                    </pattern>
                  </defs>

                  {/* Grid Lines */}
                  <rect width="800" height="600" fill="url(#gridPattern)" />

                  {/* Northern Himalayan Foothills Contour & Terai forest zone */}
                  <path
                    d="M 0,0 L 800,0 L 800,90 Q 600,120 400,80 Q 200,60 0,110 Z"
                    fill="url(#forestGradient)"
                  />
                  <text x="30" y="45" fill="#059669" fontSize="11" fontWeight="bold" letterSpacing="1.5" opacity="0.7">
                    ▲ HIMALAYAN FOOTHILLS &amp; SAL FOREST BUFFER
                  </text>

                  {/* Sharda River East Course (bordering Nepal) */}
                  <path
                    d="M 760,20 Q 720,160 745,280 T 730,420 T 750,600"
                    fill="none"
                    stroke="url(#riverGradient)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 760,20 Q 720,160 745,280 T 730,420 T 750,600"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="8 6"
                    opacity="0.8"
                  />
                  <text x="735" y="320" fill="#38bdf8" fontSize="10" fontWeight="bold" letterSpacing="1" transform="rotate(85 735 320)" opacity="0.8">
                    SHARDA RIVER CORRIDOR
                  </text>

                  {/* Major Highway Artery: NH-125 (Tanakpur - Khatima - Sitarganj) */}
                  <path
                    d="M 460,30 L 400,290 L 120,380"
                    fill="none"
                    stroke="#525252"
                    strokeWidth="4"
                    opacity="0.6"
                  />
                  <path
                    d="M 460,30 L 400,290 L 120,380"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    opacity="0.7"
                  />

                  {/* Pilibhit & Majhola Border Road */}
                  <path
                    d="M 400,290 L 360,590"
                    fill="none"
                    stroke="#525252"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />

                  {/* Road Markers */}
                  <text x="445" y="120" fill="#a3a3a3" fontSize="9" fontWeight="medium">NH-125 (To Tanakpur)</text>
                  <text x="140" y="365" fill="#a3a3a3" fontSize="9" fontWeight="medium">To Sitarganj / Nanakmatta</text>
                  <text x="365" y="520" fill="#a3a3a3" fontSize="9" fontWeight="medium">To Majhola / Pilibhit</text>

                  {/* Khatima Urban Center Core Perimeter Circle */}
                  <circle cx="400" cy="290" r="48" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* ComposableMap from react-simple-maps */}
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: [79.98, 28.92],
                    scale: 170000
                  }}
                  width={800}
                  height={600}
                  className="w-full h-full"
                >
                  <ZoomableGroup
                    zoom={zoomLevel}
                    center={[79.98, 28.92]}
                    minZoom={0.8}
                    maxZoom={3.5}
                  >
                    {/* Route Lines connecting Khatima Headquarter to Camps */}
                    {showRoutes && filteredLocations.map((loc) => {
                      if (loc.id === 'khatima-central') return null;
                      return (
                        <Line
                          key={`route-${loc.id}`}
                          from={KHATIMA_CENTER}
                          to={loc.coordinates}
                          stroke="#10b981"
                          strokeWidth={selectedLocation?.id === loc.id ? 2.5 : 1.2}
                          strokeDasharray="4 4"
                          strokeOpacity={selectedLocation?.id === loc.id ? 0.9 : 0.4}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Location Markers */}
                    {filteredLocations.map((loc) => {
                      const isSelected = selectedLocation?.id === loc.id;
                      const isHovered = hoveredLocation?.id === loc.id;
                      const colorInfo = getTypeColor(loc.type);

                      return (
                        <Marker
                          key={loc.id}
                          coordinates={loc.coordinates}
                          onClick={() => setSelectedLocation(loc)}
                          onMouseEnter={() => setHoveredLocation(loc)}
                          onMouseLeave={() => setHoveredLocation(null)}
                          className="cursor-pointer transition-transform duration-300"
                        >
                          <g className="filter drop-shadow-md">
                            {/* Pulsing outer ring */}
                            <circle
                              cx={0}
                              cy={0}
                              r={isSelected ? 20 : isHovered ? 16 : 12}
                              fill={colorInfo.hex}
                              fillOpacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.15}
                              className="animate-ping origin-center"
                              style={{ animationDuration: isSelected ? '1.5s' : '3s' }}
                            />

                            {/* Solid outer ring */}
                            <circle
                              cx={0}
                              cy={0}
                              r={isSelected ? 14 : isHovered ? 12 : 9}
                              fill={colorInfo.darkHex}
                              stroke="#ffffff"
                              strokeWidth={isSelected ? 2.5 : 1.5}
                            />

                            {/* Inner glyph / dot */}
                            <circle
                              cx={0}
                              cy={0}
                              r={isSelected ? 5 : 3.5}
                              fill="#ffffff"
                            />

                            {/* Text Label on Map */}
                            <g transform="translate(0, 16)">
                              <rect
                                x={-loc.name.split(' (')[0].length * 3.5 - 6}
                                y={-2}
                                width={loc.name.split(' (')[0].length * 7 + 12}
                                height={16}
                                rx={4}
                                fill="#18181b"
                                fillOpacity={0.88}
                                stroke={isSelected ? colorInfo.hex : '#3f3f46'}
                                strokeWidth={isSelected ? 1.5 : 0.5}
                              />
                              <text
                                textAnchor="middle"
                                y={10}
                                fill="#ffffff"
                                fontSize={9}
                                fontWeight={isSelected ? 'bold' : 'normal'}
                                fontFamily="sans-serif"
                              >
                                {loc.name.split(' (')[0]}
                              </text>
                            </g>

                            {/* Top Beneficiary Badge on Hover/Selected */}
                            {(isSelected || isHovered) && (
                              <g transform="translate(0, -18)">
                                <rect
                                  x={-34}
                                  y={-12}
                                  width={68}
                                  height={14}
                                  rx={7}
                                  fill={colorInfo.hex}
                                />
                                <text
                                  textAnchor="middle"
                                  y={-2}
                                  fill="#ffffff"
                                  fontSize={8.5}
                                  fontWeight="bold"
                                  fontFamily="sans-serif"
                                >
                                  {loc.beneficiariesCount}+ Served
                                </text>
                              </g>
                            )}
                          </g>
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>

                {/* Bottom Map Legend */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-800 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                      Key:
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-stone-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Free Medical Camps
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-stone-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Education &amp; STEM Pods
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-stone-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      Women Vocational Hub
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-stone-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      Forest &amp; Mobile Relief
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-400 italic hidden sm:inline">
                    Click any pin to inspect camp timings &amp; doctor details
                  </span>
                </div>
              </div>
            </div>

            {/* LOCATION DETAILS DRAWER / DOSSIER */}
            <div className="lg:col-span-4 space-y-4">
              {selectedLocation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={selectedLocation.id}
                  className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xl space-y-5"
                >
                  {/* Card Header & Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        getTypeColor(selectedLocation.type).lightBg
                      } ${getTypeColor(selectedLocation.type).text} border ${
                        getTypeColor(selectedLocation.type).border
                      }`}>
                        {selectedLocation.sector}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {selectedLocation.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700">
                      {selectedLocation.hindiName}
                    </p>
                  </div>

                  {/* Image Preview with Beneficiary Count overlay */}
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-200">
                    <Image
                      src={selectedLocation.image}
                      alt={selectedLocation.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-stone-300 block uppercase font-bold">Field Impact</span>
                        <strong className="text-sm font-extrabold text-white">{selectedLocation.beneficiariesCount}+ Beneficiaries</strong>
                      </div>
                      <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white">
                        {getTypeIcon(selectedLocation.type, "w-4 h-4")}
                      </span>
                    </div>
                  </div>

                  {/* Program Description */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      {selectedLocation.programTitle}
                    </h4>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      {selectedLocation.description}
                    </p>
                  </div>

                  {/* Schedule & Timing Info */}
                  <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span><strong>Schedule:</strong> {selectedLocation.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span><strong>Timing:</strong> {selectedLocation.timing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span className="text-[11px] text-stone-600 truncate"><strong>Landmark:</strong> {selectedLocation.landmark}</span>
                    </div>
                  </div>

                  {/* Doctor or Coordinator In-Charge */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                    {selectedLocation.doctorInCharge ? (
                      <div className="flex items-center gap-2 text-emerald-950">
                        <Stethoscope className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span><strong>Consultant Doctor:</strong> {selectedLocation.doctorInCharge}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2 text-stone-700">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span><strong>Coordinator:</strong> {selectedLocation.leadCoordinator}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span><strong>Direct Helpline:</strong> {selectedLocation.contactPhone}</span>
                    </div>
                  </div>

                  {/* Services Provided Bullet List */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                      Services &amp; Supplies Provided:
                    </span>
                    <ul className="space-y-1">
                      {selectedLocation.servicesProvided.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                    <button
                      onClick={() => onDonateClick?.(selectedLocation.type === 'education' ? 'education' : 'health', 500)}
                      className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Sponsor Medicines / Supplies (₹500)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={onVolunteerClick}
                        className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5 text-stone-600" />
                        <span>Volunteer Here</span>
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedLocation.name}, ${selectedLocation.landmark}, Khatima, Uttarakhand`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors flex items-center justify-center gap-1.5 text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Empty state instructing user to select an area */
                <div className="bg-white rounded-3xl border border-stone-200 p-6 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Select Any Khatima Location
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      Click on any pulsing marker on the map or choose a sector chip below to view complete camp schedules, visiting doctors, free medicine supplies, and impact numbers.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      Active Community Locations:
                    </span>
                    <div className="space-y-1.5">
                      {KHATIMA_LOCATIONS.slice(0, 4).map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc)}
                          className="w-full text-left p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 hover:border-emerald-300 transition-all flex items-center justify-between text-xs group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-white border border-stone-200 group-hover:border-emerald-400 text-emerald-700">
                              {getTypeIcon(loc.type, "w-3.5 h-3.5")}
                            </span>
                            <div>
                              <span className="font-bold text-stone-800 block group-hover:text-emerald-900">
                                {loc.name.split(' (')[0]}
                              </span>
                              <span className="text-[10px] text-stone-500">
                                {loc.sector}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Field Helpline Box */}
              <div className="bg-stone-900 text-white rounded-2xl p-4 border border-stone-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    Camp Helpline / Inquiry
                  </span>
                  <span className="font-mono font-bold text-sm text-stone-100">
                    {NGO_CONFIG.displayPhone}
                  </span>
                </div>
                <a
                  href={`tel:${NGO_CONFIG.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          /* DIRECTORY CARDS GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => {
              const colorInfo = getTypeColor(loc.type);
              return (
                <div
                  key={loc.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44">
                      <Image
                        src={loc.image}
                        alt={loc.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md ${colorInfo.text} shadow-xs`}>
                          {loc.sector}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                          {loc.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] text-stone-300 uppercase font-semibold">Total Beneficiaries</span>
                        <h4 className="text-base font-extrabold text-white">{loc.beneficiariesCount}+ Citizens</h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-stone-900">
                          {loc.name}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-700">
                          {loc.hindiName}
                        </p>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2">
                        {loc.tagline}
                      </p>

                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-stone-700">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span className="truncate"><strong>Schedule:</strong> {loc.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-700">
                          <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate"><strong>Timing:</strong> {loc.timing}</span>
                        </div>
                      </div>

                      {loc.doctorInCharge && (
                        <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                          <Stethoscope className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{loc.doctorInCharge}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-100 grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => {
                        setSelectedLocation(loc);
                        setViewMode('map');
                      }}
                      className="py-2 px-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View on Map</span>
                    </button>

                    <button
                      onClick={() => onDonateClick?.(loc.type === 'education' ? 'education' : 'health', 500)}
                      className="py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Sponsor Camp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
