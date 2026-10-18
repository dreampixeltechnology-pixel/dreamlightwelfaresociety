'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Heart, 
  BookOpen, 
  Stethoscope, 
  Trees, 
  Utensils, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { CauseType } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';

interface ImpactCalculatorProps {
  onDonateClick: (cause?: CauseType, amount?: number) => void;
}

export default function ImpactCalculator({ onDonateClick }: ImpactCalculatorProps) {
  const [amount, setAmount] = useState<number>(1000);
  const [taxBracket, setTaxBracket] = useState<number>(30); // 30% slab

  const PRESETS = [250, 500, 1000, 2500, 5000, 10000];

  // Dynamic grassroots impact calculation based on amount
  const childrenSupported = Math.floor(amount / 1000);
  const patientsTreated = Math.floor(amount / 250);
  const mealsProvided = Math.floor(amount / 50);
  const treesPlanted = Math.floor(amount / 50);

  // 80G Tax calculations: 50% deduction of donation amount from taxable income
  const deductionAllowed = Math.round(amount * 0.5);
  const estimatedTaxSaved = Math.round(deductionAllowed * (taxBracket / 100));
  const effectiveCost = amount - estimatedTaxSaved;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
          Transparent Math
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Calculate Your Grassroots Impact & 80G Savings
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          See exactly how many lives your donation transforms in Khatima and calculate your income tax deduction under Section 80G.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Choose or Enter Contribution Amount (₹)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    amount === p
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  ₹{p.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Min ₹100</span>
              <span className="font-extrabold text-lg text-emerald-800 font-serif">₹{amount.toLocaleString('en-IN')}</span>
              <span className="text-stone-500">Max ₹25,000</span>
            </div>
            <input 
              type="range"
              min="100"
              max="25000"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Income Tax Bracket Selector */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Select Your Income Tax Bracket:
              </span>
              <span className="font-semibold text-emerald-800">{taxBracket}% Slab</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 39].map((slab) => (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setTaxBracket(slab)}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    taxBracket === slab
                      ? 'bg-white text-stone-900 border-stone-400 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 border-stone-200 bg-white/60'
                  }`}
                >
                  {slab}% Slab
                </button>
              ))}
            </div>

            <p className="text-[11px] text-stone-500 flex items-center gap-1">
              <Info className="w-3 h-3 shrink-0" />
              Under 80G, 50% of ₹{amount.toLocaleString('en-IN')} (₹{deductionAllowed.toLocaleString('en-IN')}) is deducted from your taxable income.
            </p>
          </div>
        </div>

        {/* Right: Calculated Impact & Tax Deduction Card */}
        <div className="lg:col-span-6 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
              Grassroots Value of ₹{amount.toLocaleString('en-IN')}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              What Your Donation Delivers in Khatima:
            </h4>
          </div>

          {/* Tangible Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <BookOpen className="w-4 h-4" />
                <span>Child Education</span>
              </div>
              <p className="text-xl font-extrabold text-white font-serif">
                {childrenSupported > 0 ? `${childrenSupported} Children` : 'School Supplies'}
              </p>
              <p className="text-[10px] text-emerald-200/80">
                {childrenSupported > 0 
                  ? 'Full monthly books, bag & evening tuition' 
                  : 'Notebooks, pens & learning aids funded'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Stethoscope className="w-4 h-4" />
                <span>Elderly Health</span>
              </div>
              <p className="text-xl font-extrabold text-white font-serif">
                {Math.max(patientsTreated, 1)} Patients
              </p>
              <p className="text-[10px] text-emerald-200/80">
                Free doctor checkup, BP/sugar test & medicines
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Utensils className="w-4 h-4" />
                <span>Nutrition & Meals</span>
              </div>
              <p className="text-xl font-extrabold text-white font-serif">
                {mealsProvided} Hot Meals
              </p>
              <p className="text-[10px] text-emerald-200/80">
                Nutritious food for impoverished kids & elders
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Trees className="w-4 h-4" />
                <span>Native Trees</span>
              </div>
              <p className="text-xl font-extrabold text-white font-serif">
                {treesPlanted} Trees
              </p>
              <p className="text-[10px] text-emerald-200/80">
                Planted & cared along Sharda river basin
              </p>
            </div>
          </div>

          {/* Tax Savings Summary */}
          <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-300 font-bold block">80G Tax Saved: ~₹{estimatedTaxSaved.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-emerald-200/80">
                Effective cost to you: <strong>₹{effectiveCost.toLocaleString('en-IN')}</strong>
              </span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg font-mono font-bold text-[11px]">
              Save {Math.round((estimatedTaxSaved / amount) * 100)}% in Tax
            </span>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={() => onDonateClick('general', amount)}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-stone-950" />
            <span>Donate ₹{amount.toLocaleString('en-IN')} with 80G Receipt</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
