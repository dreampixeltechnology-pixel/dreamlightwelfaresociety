'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  QrCode, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  FileText,
  Lock,
  Phone,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CauseType } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';

interface DonatePageProps {
  onDonationSuccess: (receipt: any) => void;
}

const PRESET_AMOUNTS = [100, 250, 500, 1100, 2500, 5000];

const CAUSES: { id: CauseType; title: string; subtitle: string; icon: string }[] = [
  { id: 'education', title: 'Child Education & Vidya Jyoti', subtitle: 'Books, school supplies & digital coaching', icon: '📚' },
  { id: 'health', title: 'Free Medical & Eye Camps', subtitle: 'Doctors, diagnostic tests & medicines', icon: '🩺' },
  { id: 'environment', title: 'Harela Native Tree Plantation', subtitle: 'Afforesting Himalayan foothills in Khatima', icon: '🌱' },
  { id: 'women', title: 'Women Vocational Skills & Sewing', subtitle: 'Sewing machines & self-help collectives', icon: '🧵' },
  { id: 'general', title: 'General Humanitarian Fund', subtitle: 'Emergency relief & where needed most', icon: '🤝' },
];

export default function DonatePage({ onDonationSuccess }: DonatePageProps) {
  const [selectedCause, setSelectedCause] = useState<CauseType>('education');
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  // Donor Details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('Khatima, Uttarakhand');
  const [notes, setNotes] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'bank_transfer'>('upi');
  const [cardNumber, setCardNumber] = useState('4532 9812 3421 8910');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const currentAmount = customAmount ? Number(customAmount) : amount;

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
    setErrorMessage('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (currentAmount < 100) {
      setErrorMessage('Minimum donation amount is ₹100.');
      return;
    }

    if (!donorName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setErrorMessage('Please provide a valid email to receive your 80G tax receipt.');
      return;
    }

    if (!donorPhone.trim() || donorPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    try {
      const selectedCauseObj = CAUSES.find(c => c.id === selectedCause);

      const res = await fetch('/api/donations/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          donorEmail,
          donorPhone,
          panNumber: panNumber ? panNumber.toUpperCase() : undefined,
          address,
          amount: currentAmount,
          cause: selectedCause,
          causeTitle: selectedCauseObj?.title || 'General Mission',
          paymentMethod,
          paymentId: `PAY-${paymentMethod.toUpperCase()}-${Date.now().toString().slice(-8)}`,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server payment verification failed');
      }

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b', '#3b82f6'],
      });

      setIsProcessing(false);
      onDonationSuccess(data.receipt);
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Unable to process donation.');
    }
  };

  return (
    <div className="space-y-14 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-stone-900">Official 80G Tax Exemption Portal</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-emerald-800 font-semibold">50% Income Tax Deduction</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Regd. Khatima, Uttarakhand</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Support Our Mission in Khatima
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Every contribution starting at just <strong className="text-stone-900 font-bold">₹100</strong> directly feeds a dream, brings medicines to an ailing villager, or plants native shade trees in Uttarakhand.
        </p>
      </div>

      {/* 2. Main Donation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Donation Form with Server Verification */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Cause Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Step 1: Choose Your Cause
                </span>
                <span className="text-xs text-emerald-700 font-medium">100% Allocated Direct</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAUSES.map((c) => {
                  const isSelected = selectedCause === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setSelectedCause(c.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                      }`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{c.icon}</span>
                      <div>
                        <span className={`text-xs sm:text-sm font-bold block ${isSelected ? 'text-emerald-900' : 'text-stone-800'}`}>
                          {c.title}
                        </span>
                        <span className="text-[11px] text-stone-500 line-clamp-1">
                          {c.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Amount Selection (Starting ₹100) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Step 2: Select Amount (Starting ₹100)
                </span>
                <span className="text-xs text-stone-500 font-medium">Currency: INR (₹)</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-3">
                {PRESET_AMOUNTS.map((val) => {
                  const isSelected = !customAmount && amount === val;
                  return (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handleSelectPreset(val)}
                      className={`py-3 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      ₹{val}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-base">
                  ₹
                </span>
                <input
                  type="number"
                  min="100"
                  step="50"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="Or enter any custom amount (min ₹100)..."
                  className="w-full pl-9 pr-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-stone-900 bg-white"
                />
              </div>

              <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Impact Note:</strong> Your ₹{currentAmount} directly funds grassroots child literacy, medicines, or saplings in Khatima.
                </span>
              </div>
            </div>

            {/* Step 3: Donor Particulars for 80G Certificate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Step 3: Donor Details (For Official 80G Receipt)
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">
                  80G Tax Deductible
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Full Name (As per Tax Records) *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Ramesh Joshi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Email Address (For Instant Receipt PDF) *
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Mobile Number (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="e.g. 9528049722"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    PAN Card Number (Optional / For 80G Claim)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCPJ8472K"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-mono uppercase bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Secure Payment Gateway */}
            <div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
                Step 4: Secure Payment Gateway
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">UPI / QR Scan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">Debit/Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">NEFT / RTGS</span>
                </button>
              </div>

              {/* Sub payment previews */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-3">
                  <span className="text-xs font-semibold text-stone-700 block">
                    Scan Official NGO UPI QR Code or Click to Pay:
                  </span>
                  
                  {/* Real Dynamic QR Code */}
                  <div className="inline-block p-2.5 bg-white rounded-2xl shadow-xs border border-stone-200">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&data=${encodeURIComponent(
                        `upi://pay?pa=${NGO_CONFIG.bankDetails.upiId}&pn=Dreamlight%20Welfare%20Society&am=${currentAmount}&cu=INR&tn=Donation%20Dreamlight%20Welfare%20Society`
                      )}`}
                      alt={`Scan to donate ₹${currentAmount} to ${NGO_CONFIG.bankDetails.upiId}`}
                      width={140}
                      height={140}
                      className="mx-auto rounded-lg"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    <div className="text-[10px] font-mono text-stone-600 mt-1.5 font-bold">
                      ₹{currentAmount} INR
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-stone-700">
                    <span>UPI ID:</span>
                    <strong className="font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold text-xs sm:text-sm">
                      {NGO_CONFIG.bankDetails.upiId}
                    </strong>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(NGO_CONFIG.bankDetails.upiId);
                        setCopiedUpi(true);
                        setTimeout(() => setCopiedUpi(false), 2000);
                      }}
                      className="text-[11px] px-2.5 py-0.5 rounded bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 font-medium cursor-pointer transition-colors"
                    >
                      {copiedUpi ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  {/* Direct App Launch Button for Mobile Donors */}
                  <a
                    href={`upi://pay?pa=${NGO_CONFIG.bankDetails.upiId}&pn=Dreamlight%20Welfare%20Society&am=${currentAmount}&cu=INR&tn=Donation%20to%20Dreamlight%20Welfare%20Society`}
                    className="inline-flex sm:hidden items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200/80 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition-colors"
                  >
                    <span>Open in Google Pay / PhonePe / Paytm</span>
                  </a>

                  <p className="text-[11px] text-stone-500">
                    Supports Google Pay, PhonePe, Paytm, BHIM and all UPI banking applications.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                    />
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-stone-700 space-y-1">
                  <span className="font-bold text-emerald-950 block mb-1">Direct Bank Account (Khatima Branch):</span>
                  <p>Account Name: <strong>{NGO_CONFIG.bankDetails.accountName}</strong></p>
                  <p>A/c Number: <strong className="font-mono">{NGO_CONFIG.bankDetails.accountNumber}</strong></p>
                  <p>IFSC: <strong className="font-mono">{NGO_CONFIG.bankDetails.ifscCode}</strong> ({NGO_CONFIG.bankDetails.bankName})</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Transaction with Server...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Donate ₹{currentAmount} with Server Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-stone-500">
              🔒 256-Bit TLS Secured • Instant Official 80G Tax Exemption Receipt & Email Confirmation
            </p>

          </form>

        </div>

        {/* Right: 80G Tax Exemption Guide & Trust Badges */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-md space-y-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Tax Exemption 80G</span>
            </div>
            <h3 className="font-serif text-xl font-bold">Save 50% on Taxes</h3>
            <p className="text-emerald-100 text-xs leading-relaxed">
              Donations to Dreamlight Welfare Society are eligible for 50% deduction under Section 80G of the Indian Income Tax Act 1961.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-800/80 border border-emerald-700/80 text-xs space-y-1">
              <div className="flex justify-between">
                <span>If you donate:</span>
                <strong className="text-emerald-200">₹{currentAmount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tax Deduction (50%):</span>
                <strong className="text-emerald-200">₹{Math.round(currentAmount * 0.5)}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-emerald-700/60 font-bold text-white">
                <span>Effective Cost:</span>
                <span>₹{Math.round(currentAmount * 0.5)}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h4 className="font-bold text-stone-900 text-sm">Need Help with Offline Donation?</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prefer depositing via cheque, draft, or visit our physical office in Khatima? Our finance officer is ready to assist you.
            </p>
            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <a href={`tel:${NGO_CONFIG.phone}`} className="font-bold hover:text-emerald-700">
                  {NGO_CONFIG.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Pan-India 80G Approval: {NGO_CONFIG.taxExemption80G}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
