'use client';

import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Heart,
  Share2,
  Building,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { DonationRecord } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';
import DreamlightLogo from '@/components/DreamlightLogo';

interface DonationReceiptModalProps {
  receipt: any;
  onClose: () => void;
}

// Helper to convert number to words (Indian English currency)
function numberToWordsINR(amount: number): string {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (amount === 0) return 'Zero';

  function convertTwoDigits(n: number): string {
    if (n < 20) return units[n];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred > 0) {
      res += units[hundred] + ' Hundred';
      if (rest > 0) res += ' and ';
    }
    if (rest > 0) {
      res += convertTwoDigits(rest);
    }
    return res;
  }

  let crore = Math.floor(amount / 10000000);
  let remainder = amount % 10000000;
  let lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;
  let thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  let words = '';
  if (crore > 0) words += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertTwoDigits(thousand) + ' Thousand ';
  if (remainder > 0) words += convertThreeDigits(remainder);

  return words.trim() + ' Rupees Only';
}

export default function DonationReceiptModal({ receipt, onClose }: DonationReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const amountInWords = numberToWordsINR(receipt.amount || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Action Bar */}
        <div className="bg-stone-100/90 border-b border-stone-200 px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs sm:text-sm font-semibold text-stone-700">
              Verified 80G Tax Exemption Receipt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Document Canvas */}
        <div ref={receiptRef} className="p-6 sm:p-10 bg-white font-sans text-stone-900">
          
          {/* Organisation Official Header */}
          <div className="border-b-2 border-emerald-700 pb-5 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                  OFFICIAL TAX EXEMPTION DONATION RECEIPT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {NGO_CONFIG.fullLegalName}
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Registered under Societies Registration Act 1860 • NITI Aayog Darpan: <strong>{NGO_CONFIG.nitiDarpanId}</strong>
                </p>
                <p className="text-xs text-stone-600">
                  {NGO_CONFIG.address} | Phone: <strong>{NGO_CONFIG.displayPhone}</strong>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <DreamlightLogo size={64} showText={false} className="ml-auto" />
                <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Sec 80G Certified
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Serial & Date Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs mb-6">
            <div>
              <span className="text-stone-400 block font-medium">Receipt No.</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">
                {receipt.receiptNumber}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Date & Time</span>
              <span className="font-semibold text-stone-800">
                {receipt.date || new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Payment Mode</span>
              <span className="font-semibold uppercase text-stone-800">
                {receipt.paymentMethod || 'UPI / Online'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Transaction ID</span>
              <span className="font-mono font-medium text-stone-700 truncate block">
                {receipt.paymentId || 'TXN-ONLINE'}
              </span>
            </div>
          </div>

          {/* Donor & Donation Details */}
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl border border-stone-200/90 bg-stone-50/50">
              <span className="text-xs uppercase text-stone-400 font-bold tracking-wider block mb-2">
                Received with thanks from
              </span>
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{receipt.donorName}</h4>
                  <p className="text-xs text-stone-600">{receipt.donorEmail} • {receipt.donorPhone}</p>
                  {receipt.address && (
                    <p className="text-xs text-stone-500 mt-0.5">{receipt.address}</p>
                  )}
                </div>
                {receipt.panNumber && (
                  <div className="sm:text-right">
                    <span className="text-[11px] text-stone-400 block">Donor PAN</span>
                    <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-300 inline-block">
                      {receipt.panNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Amount Box */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">
                  Donation Amount (INR)
                </span>
                <span className="text-3xl font-extrabold text-emerald-950 font-sans">
                  ₹{Number(receipt.amount).toLocaleString('en-IN')}
                </span>
                <p className="text-xs text-emerald-800 mt-1 italic">
                  ({amountInWords})
                </p>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200/60 text-right">
                <span className="text-[11px] text-stone-500 block">Allocated Purpose</span>
                <span className="text-xs font-bold text-emerald-900">
                  {receipt.causeTitle || 'Humanitarian & Welfare Mission'}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Exemption Note & Signatures */}
          <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 space-y-3">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
              <strong>Statutory Declaration:</strong> Donations made to Dreamlight Welfare Society are eligible for 50% tax deduction under Section 80G(5)(vi) of the Income Tax Act 1961 vide Order No. {NGO_CONFIG.taxExemption80G}. PAN of NGO: <strong>{NGO_CONFIG.panNumber}</strong>.
            </div>

            <div className="flex items-end justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-center p-1">
                  <QrCode className="w-12 h-12 text-stone-800" />
                </div>
                <div className="text-[10px] text-stone-400">
                  <span className="font-semibold text-stone-700 block">Digitally Verified</span>
                  <span>Scan to verify authentic NGO record</span>
                  <span className="block font-mono text-[9px] text-stone-500 mt-0.5 truncate max-w-[140px]">
                    {receipt.digitalSignature || 'SEC-80G-VALID'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="w-32 border-b border-stone-400 mb-1 pb-1">
                  <span className="font-serif italic text-stone-700 text-sm">V. Bhatt</span>
                </div>
                <span className="text-[11px] font-bold text-stone-800 block">Authorized Signatory</span>
                <span className="text-[10px] text-stone-500">Dreamlight Welfare Society (Regd. NGO)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer notification */}
        <div className="bg-emerald-900 text-emerald-100 text-xs px-6 py-3 flex items-center justify-between no-print">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Receipt copy and confirmation email sent to {receipt.donorEmail}
          </span>
          <button
            onClick={onClose}
            className="text-white hover:text-emerald-200 font-semibold cursor-pointer underline"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
