'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Building, 
  Award,
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react';
import { NGO_CONFIG } from '@/lib/mock-data';
import DreamlightLogo from '@/components/DreamlightLogo';

interface StatutoryDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DocId = '80g' | '12a' | 'darpan' | 'society' | 'audit';

export default function StatutoryDocsModal({ isOpen, onClose }: StatutoryDocsModalProps) {
  const [activeDoc, setActiveDoc] = useState<DocId>('80g');

  if (!isOpen) return null;

  const docs = [
    { id: '80g' as DocId, title: '80G Tax Exemption', authority: 'Income Tax Department, Govt of India', valid: 'Active & Valid' },
    { id: '12a' as DocId, title: 'Section 12A Registration', authority: 'Income Tax Department', valid: 'Permanent' },
    { id: 'darpan' as DocId, title: 'NITI Aayog NGO Darpan', authority: 'NITI Aayog, Govt of India', valid: 'Active' },
    { id: 'society' as DocId, title: 'Society Registration', authority: 'Registrar of Societies, Uttarakhand', valid: 'Regd. 2019' },
    { id: 'audit' as DocId, title: 'Audited Financial Summary', authority: 'Chartered Accountant Firm', valid: 'FY 2023-24' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                Official Statutory Registrations & Certifications
              </h3>
              <p className="text-xs text-stone-500">
                Dreamlight Welfare Society • Khatima, U.S. Nagar, Uttarakhand
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex overflow-x-auto p-2 bg-stone-100 border-b border-stone-200 gap-1.5 scrollbar-none text-xs">
          {docs.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDoc(d.id)}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeDoc === d.id
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Document Preview Body */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto bg-stone-50/50 space-y-6">
          
          {/* Certificate View Container (Printable Paper Look) */}
          <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <DreamlightLogo size={320} showText={false} />
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-stone-900 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <DreamlightLogo size={48} showText={false} />
                <div>
                  <h4 className="font-serif font-extrabold text-stone-900 text-lg leading-tight">
                    {NGO_CONFIG.fullLegalName}
                  </h4>
                  <p className="text-xs text-stone-500">
                    Regd. Office: {NGO_CONFIG.address}
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 block sm:inline-block">
                  Verified Statutory Document
                </span>
              </div>
            </div>

            {/* Dynamic Content based on activeDoc */}
            {activeDoc === '80g' && (
              <div className="space-y-4">
                <div className="text-center py-2 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                    Government of India • Ministry of Finance • Income Tax Department
                  </span>
                  <h5 className="font-serif font-bold text-stone-900 text-xl">
                    Order for Registration under Section 80G(5)(vi)
                  </h5>
                  <p className="text-xs text-stone-600">
                    Approval Order No: <strong className="font-mono text-stone-900">{NGO_CONFIG.taxExemption80G}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
                  <p>
                    This is to certify that <strong>{NGO_CONFIG.name}</strong> has been granted approval under Section 80G(5)(vi) of the Income Tax Act, 1961.
                  </p>
                  <p>
                    <strong>Benefit to Donors:</strong> Any donation made to this Society is eligible for a <strong>50% deduction</strong> from the donor&apos;s taxable total income under Section 80G.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                    <div>
                      <span className="text-stone-500 block">Permanent Account Number (PAN):</span>
                      <strong className="font-mono text-stone-900">{NGO_CONFIG.panNumber}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Jurisdiction:</span>
                      <strong className="text-stone-900">CIT (Exemptions), Dehradun / Haldwani</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDoc === '12a' && (
              <div className="space-y-4">
                <div className="text-center py-2 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                    Office of the Commissioner of Income Tax (Exemption)
                  </span>
                  <h5 className="font-serif font-bold text-stone-900 text-xl">
                    Certificate of Registration under Section 12A / 12AB
                  </h5>
                  <p className="text-xs text-stone-600">
                    Unique Registration Number (URN): <strong className="font-mono text-stone-900">AAATD8934E21ER02</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
                  <p>
                    Registration under Section 12A certifies that Dreamlight Welfare Society operates purely as a public charitable institution with zero commercial profit distribution.
                  </p>
                  <p>
                    All surplus funds are strictly applied towards educational centers, free medical care, women livelihoods, and environmental afforestation in Uttarakhand.
                  </p>
                </div>
              </div>
            )}

            {activeDoc === 'darpan' && (
              <div className="space-y-4">
                <div className="text-center py-2 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                    NITI Aayog • Government of India
                  </span>
                  <h5 className="font-serif font-bold text-stone-900 text-xl">
                    NGO Darpan Portal Registration Certificate
                  </h5>
                  <p className="text-xs text-stone-600">
                    Darpan Unique Identification: <strong className="font-mono text-emerald-800">{NGO_CONFIG.nitiDarpanId}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
                  <p>
                    Verified with the Central NITI Aayog NGO Portal, enabling participation in government social welfare missions, CSR collaborations, and district-level health camps.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                    <div>
                      <span className="text-stone-500 block">State of Operation:</span>
                      <strong className="text-stone-900">Uttarakhand (Khatima Tehsil)</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Key Sectors:</span>
                      <strong className="text-stone-900">Education, Healthcare, Women, Forest</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDoc === 'society' && (
              <div className="space-y-4">
                <div className="text-center py-2 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                    Registrar of Societies, Firms & Chits • Uttarakhand
                  </span>
                  <h5 className="font-serif font-bold text-stone-900 text-xl">
                    Certificate of Society Registration
                  </h5>
                  <p className="text-xs text-stone-600">
                    Registration Number: <strong className="font-mono text-stone-900">{NGO_CONFIG.registrationNo}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
                  <p>
                    Registered under the Societies Registration Act, 1860 (as applicable in the State of Uttarakhand) to undertake public welfare, community health, and educational development across Udham Singh Nagar district.
                  </p>
                </div>
              </div>
            )}

            {activeDoc === 'audit' && (
              <div className="space-y-4">
                <div className="text-center py-2 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                    Statutory Independent Auditor&apos;s Financial Summary
                  </span>
                  <h5 className="font-serif font-bold text-stone-900 text-xl">
                    Financial Statement for Fiscal Year 2023-24
                  </h5>
                  <p className="text-xs text-stone-600">
                    Audited by Independent Chartered Accountants
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-stone-500 block text-[11px]">Program Delivery</span>
                    <strong className="text-emerald-900 text-base font-bold">88.4%</strong>
                    <span className="text-[10px] text-stone-500 block">Direct field relief</span>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                    <span className="text-stone-500 block text-[11px]">Camp Logistics</span>
                    <strong className="text-teal-900 text-base font-bold">7.2%</strong>
                    <span className="text-[10px] text-stone-500 block">Transport & mobile vans</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-100 border border-stone-200">
                    <span className="text-stone-500 block text-[11px]">Administration</span>
                    <strong className="text-stone-900 text-base font-bold">4.4%</strong>
                    <span className="text-[10px] text-stone-500 block">Statutory compliances</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Verification Seal */}
            <div className="border-t border-stone-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Digitally Authenticated by Dreamlight Welfare Society Secretariat</span>
              </div>
              <div className="text-[11px] font-mono text-stone-400">
                Khatima, U.S. Nagar • Pin 262308
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            For CSR partnership or physical certificate copy, email <strong className="text-stone-800">{NGO_CONFIG.email}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
