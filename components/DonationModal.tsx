'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CauseType, DonationRecord } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';
import DreamlightLogo from '@/components/DreamlightLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCause?: CauseType;
  preselectedAmount?: number;
  onDonationSuccess: (receipt: any) => void;
}

const PRESET_AMOUNTS = [100, 250, 500, 1100, 2500, 5000];

const CAUSES: { id: CauseType; title: string; subtitle: string; icon: string }[] = [
  { id: 'education', title: 'Child Education (Vidya Jyoti)', subtitle: 'Books, school supplies & digital learning', icon: '📚' },
  { id: 'health', title: 'Medical & Eye Camps (Aarogya)', subtitle: 'Free doctor checkups, specs & medicines', icon: '🩺' },
  { id: 'environment', title: 'Harela Tree Plantation', subtitle: 'Himalayan foothills afforestation & river care', icon: '🌱' },
  { id: 'women', title: 'Women Empowerment (Shakti)', subtitle: 'Sewing machines & vocational training', icon: '🧵' },
  { id: 'general', title: 'Where Most Needed (General)', subtitle: 'Rapid emergency relief and core mission', icon: '🤝' },
];

export default function DonationModal({
  isOpen,
  onClose,
  preselectedCause = 'education',
  preselectedAmount = 500,
  onDonationSuccess,
}: DonationModalProps) {
  const [selectedCause, setSelectedCause] = useState<CauseType>(preselectedCause);
  const [amount, setAmount] = useState<number>(preselectedAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  
  // Donor details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('Khatima, Uttarakhand');
  const [notes, setNotes] = useState<string>('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'bank_transfer'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Card details
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8910');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('892');

  // Loading & error
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

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

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (currentAmount < 100) {
      setErrorMessage('Minimum donation amount is ₹100.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for your 80G receipt.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    try {
      const selectedCauseObj = CAUSES.find(c => c.id === selectedCause);
      
      const payload = {
        donorName: fullName,
        donorEmail: email,
        donorPhone: phone,
        panNumber: panNumber ? panNumber.toUpperCase() : undefined,
        address,
        amount: currentAmount,
        cause: selectedCause,
        causeTitle: selectedCauseObj?.title || 'Humanitarian Mission',
        paymentMethod,
        paymentId: `PAY-${paymentMethod.toUpperCase()}-${Date.now().toString().slice(-8)}`,
        notes,
      };

      const res = await fetch('/api/donations/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }

      // Celebrate!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b', '#3b82f6'],
      });

      setIsProcessing(false);
      onClose();
      onDonationSuccess(data.receipt);
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Something went wrong while processing your donation.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DreamlightLogo size={46} showText={false} />
            <div>
              <h3 className="text-lg font-bold">Donate to Dreamlight Welfare Society</h3>
              <p className="text-xs text-amber-200">
                Non-Governance Organisation • Khatima • 80G Tax Exemption • Min ₹100
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleDonateSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Cause Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              1. Select Cause / Pillar
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CAUSES.map((c) => {
                const isSelected = selectedCause === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setSelectedCause(c.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-2xs' 
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
                    <div>
                      <span className={`text-xs font-bold block ${isSelected ? 'text-emerald-900' : 'text-stone-800'}`}>
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

          {/* Amount Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                2. Choose Donation Amount (INR ₹)
              </label>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Min ₹100</span>
              </div>
            </div>

            {/* Preset chips */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {PRESET_AMOUNTS.map((val) => {
                const isSelected = !customAmount && amount === val;
                return (
                  <button
                    type="button"
                    key={val}
                    onClick={() => handleSelectPreset(val)}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-102'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    ₹{val}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Field */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-sm">
                ₹
              </span>
              <input
                type="number"
                min="100"
                step="50"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="Or enter custom amount (e.g. 1500, 10000)"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-stone-900 bg-white"
              />
            </div>

            {/* Impact feedback text */}
            <div className="mt-2 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {currentAmount >= 5000 
                  ? `₹${currentAmount} sponsors an entire month of medical camp supplies and child education kit!`
                  : currentAmount >= 2500 
                  ? `₹${currentAmount} plants 25 native trees or provides 5 elderly vision glasses!`
                  : currentAmount >= 1100 
                  ? `₹${currentAmount} provides winter uniform, school bag, and stationery set!`
                  : currentAmount >= 500 
                  ? `₹${currentAmount} covers doctor checkup & diagnostic blood test for 2 villagers.`
                  : `₹${currentAmount} feeds warm nutritional meal & school notebooks for a child.`}
              </span>
            </div>
          </div>

          {/* Donor Details */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              3. Donor Details for 80G Receipt
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name (as per ID)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm bg-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for instant receipt"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm bg-white"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit Mobile (+91)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="PAN Card No. (for 80G Tax Claim)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-mono uppercase bg-white"
                />
              </div>
            </div>
            <p className="text-[10px] text-stone-500 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              PAN is required by the Income Tax Dept if you wish to claim 50% 80G tax rebate.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              4. Payment Gateway & Options
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">Debit/Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'netbanking'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">NEFT/RTGS</span>
              </button>
            </div>

            {/* Dynamic payment sub-view */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-3">
                <span className="text-xs font-semibold text-stone-700 block">
                  Scan Official NGO UPI QR Code or Click to Pay:
                </span>
                
                {/* Real Dynamic QR Code with fallback */}
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

                {/* Official UPI ID with 1-Click Copy */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-stone-700">
                  <span>UPI ID:</span>
                  <strong className="font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold text-[11px] sm:text-xs">
                    {NGO_CONFIG.bankDetails.upiId}
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(NGO_CONFIG.bankDetails.upiId);
                      setCopiedUpi(true);
                      setTimeout(() => setCopiedUpi(false), 2000);
                    }}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-medium cursor-pointer transition-colors shadow-2xs"
                  >
                    {copiedUpi ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Direct App Launch Button for Mobile Donors */}
                <a
                  href={`upi://pay?pa=${NGO_CONFIG.bankDetails.upiId}&pn=Dreamlight%20Welfare%20Society&am=${currentAmount}&cu=INR&tn=Donation%20to%20Dreamlight%20Welfare%20Society`}
                  className="inline-flex sm:hidden items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200/80 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Open in Google Pay / PhonePe / Paytm</span>
                </a>

                {/* Supported Apps */}
                <div className="flex justify-center gap-1.5 pt-0.5 text-[11px] text-stone-600">
                  <span className="px-2 py-0.5 bg-white rounded border border-stone-200 font-medium">Google Pay</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-stone-200 font-medium">PhonePe</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-stone-200 font-medium">Paytm</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-stone-200 font-medium">BHIM</span>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                <span className="text-xs font-semibold text-stone-700 block">
                  Simulated 256-Bit SSL Encrypted Card Gateway
                </span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                  />
                  <input
                    type="password"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-700 space-y-1.5">
                <span className="font-bold text-emerald-900 block mb-1">Direct Bank Account:</span>
                <p>Account Name: <strong>{NGO_CONFIG.bankDetails.accountName}</strong></p>
                <div className="flex items-center gap-2">
                  <p>A/c Number: <strong className="font-mono">{NGO_CONFIG.bankDetails.accountNumber}</strong></p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(NGO_CONFIG.bankDetails.accountNumber)}
                    className="text-[10px] px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p>IFSC Code: <strong className="font-mono">{NGO_CONFIG.bankDetails.ifscCode}</strong> ({NGO_CONFIG.bankDetails.bankName})</p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(NGO_CONFIG.bankDetails.ifscCode)}
                    className="text-[10px] px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-[10px] text-stone-500 pt-1">
                  After transfer, your donation will be marked verified with transaction reference.
                </p>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Payment with Server...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Complete Secure Donation of ₹{currentAmount}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-stone-500 mt-2">
              🔒 256-bit TLS Encryption • Instant 80G Tax Exemption Receipt & Email Confirmation
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
