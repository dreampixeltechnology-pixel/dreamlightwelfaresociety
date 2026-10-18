'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  ShieldCheck, 
  Plus, 
  X, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { DonationRecord, VolunteerApplication, NGOEvent, EventRSVP } from '@/types/ngo';
import { NGO_CONFIG } from '@/lib/mock-data';

interface AdminDashboardProps {
  donations: DonationRecord[];
  volunteers: VolunteerApplication[];
  events: NGOEvent[];
  rsvps: EventRSVP[];
  onViewReceipt: (donation: DonationRecord) => void;
  onClose: () => void;
  onAddMockDonation: (donation: DonationRecord) => void;
}

export default function AdminDashboard({
  donations,
  volunteers,
  events,
  rsvps,
  onViewReceipt,
  onClose,
  onAddMockDonation,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'donations' | 'volunteers' | 'events'>('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState<string>('all');

  // Compute analytics
  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDonors = donations.length;
  const avgDonation = totalDonors > 0 ? Math.round(totalAmount / totalDonors) : 0;
  const taxExemptCount = donations.filter(d => d.is80GClaimed).length;

  // Filtered donations
  const filteredDonations = donations.filter(d => {
    const matchesSearch = 
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorPhone.includes(searchTerm);
    const matchesCause = causeFilter === 'all' || d.cause === causeFilter;
    return matchesSearch && matchesCause;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Receipt No', 'Date', 'Donor Name', 'Email', 'Phone', 'PAN', 'Amount (INR)', 'Cause', 'Payment Mode', 'Status'];
    const rows = donations.map(d => [
      d.receiptNumber,
      d.date,
      `"${d.donorName}"`,
      d.donorEmail,
      d.donorPhone,
      d.panNumber || 'N/A',
      d.amount,
      `"${d.causeTitle}"`,
      d.paymentMethod,
      d.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dreamlight_Welfare_Society_Donations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a test donation to verify live update
  const handleCreateTestDonation = () => {
    const randomAmount = [100, 500, 1100, 2500, 5000][Math.floor(Math.random() * 5)];
    const mockDonor: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNumber: `DWS-80G-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      donorName: 'Test Contributor (Live Admin)',
      donorEmail: 'donor@example.com',
      donorPhone: '+91 9528049722',
      panNumber: 'TESTP1234K',
      amount: randomAmount,
      cause: 'education',
      causeTitle: 'Child Education & Vidya Jyoti',
      paymentMethod: 'upi',
      paymentId: `PAY-UPI-${Date.now().toString().slice(-6)}`,
      status: 'verified',
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      is80GClaimed: true,
      notes: 'Admin live simulated test entry'
    };
    onAddMockDonation(mockDonor);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex flex-col p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-7xl w-full mx-auto flex-1 flex flex-col overflow-hidden my-auto">
        
        {/* Admin Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold">Dreamlight Welfare Society Admin & Operations</h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Registered Non-Governmental Organisation Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateTestDonation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Add a test ₹500 or ₹1100 donation to verify live update"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Donation</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics KPI Ribbon */}
        <div className="bg-stone-50 border-b border-stone-200 p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs text-stone-500 font-medium block">Total Recorded Donations</span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-900 font-serif">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
              Across all programs
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs text-stone-500 font-medium block">Verified Donors</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
              {totalDonors}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              Avg: ₹{avgDonation.toLocaleString('en-IN')} / donor
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs text-stone-500 font-medium block">80G Receipts Issued</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
              {taxExemptCount}
            </span>
            <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
              100% Tax Compliant
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs text-stone-500 font-medium block">Active Volunteers</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
              {volunteers.length}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              In Khatima & Terai
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs col-span-2 lg:col-span-1">
            <span className="text-xs text-stone-500 font-medium block">Event Attendees (RSVPs)</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
              {rsvps.reduce((acc, r) => acc + r.numberOfGuests, 0) + 595}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              Across 3 upcoming camps
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('donations')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'donations'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Donations & 80G Receipts ({donations.length})
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'volunteers'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Volunteer Registrations ({volunteers.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Events & RSVPs ({events.length})
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: DONATIONS */}
          {activeTab === 'donations' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by donor, receipt, phone..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-stone-500 font-medium">Filter Cause:</span>
                  <select
                    value={causeFilter}
                    onChange={(e) => setCauseFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-800"
                  >
                    <option value="all">All Causes</option>
                    <option value="education">Child Education</option>
                    <option value="health">Medical Camps</option>
                    <option value="environment">Harela Tree Plantation</option>
                    <option value="women">Women Empowerment</option>
                    <option value="general">General Fund</option>
                  </select>
                </div>
              </div>

              {/* Donations Table */}
              <div className="rounded-2xl border border-stone-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Receipt No</th>
                      <th className="py-3 px-4">Donor Name & Contact</th>
                      <th className="py-3 px-4">Cause / Purpose</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">PAN / 80G</th>
                      <th className="py-3 px-4">Mode & Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-stone-400 text-xs">
                          No matching donation records found.
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((d) => (
                        <tr key={d.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                            {d.receiptNumber}
                            <span className="block text-[10px] font-sans text-stone-400 font-normal">
                              {d.date}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-stone-900 block">{d.donorName}</span>
                            <span className="text-[11px] text-stone-500">{d.donorEmail} • {d.donorPhone}</span>
                          </td>

                          <td className="py-3 px-4 font-medium text-stone-800">
                            {d.causeTitle}
                          </td>

                          <td className="py-3 px-4 font-bold text-stone-900 text-sm">
                            ₹{d.amount.toLocaleString('en-IN')}
                          </td>

                          <td className="py-3 px-4">
                            {d.panNumber ? (
                              <span className="font-mono bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded border border-stone-200 text-[11px]">
                                {d.panNumber}
                              </span>
                            ) : (
                              <span className="text-stone-400 text-[11px]">Not provided</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {d.paymentMethod.toUpperCase()} • Verified
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => onViewReceipt(d)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-semibold text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Printer className="w-3 h-3" />
                              <span>View Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VOLUNTEERS */}
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Volunteer ID</th>
                      <th className="py-3 px-4">Name & Contact</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Interest & Skills</th>
                      <th className="py-3 px-4">Commitment</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {volunteers.map((v) => (
                      <tr key={v.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                          {v.volunteerId}
                          <span className="block text-[10px] text-stone-400 font-sans font-normal">
                            Joined {v.appliedDate}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-stone-900 block">{v.fullName}</strong>
                          <span className="text-[11px] text-stone-500">{v.email} • {v.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-800">
                          {v.city}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-emerald-800 capitalize block">
                            {v.interestArea}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {v.skills.join(', ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 capitalize">
                          {v.availability} ({v.hoursPerWeek} hrs/wk)
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS & RSVPs */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((e) => (
                  <div key={e.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {e.category}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm leading-snug">{e.title}</h4>
                    <p className="text-xs text-stone-500">{e.date} • {e.venue}</p>
                    <div className="pt-2 text-xs text-stone-700 flex justify-between border-t border-stone-200">
                      <span>Booked: <strong>{e.seatsBooked}</strong></span>
                      <span>Total: {e.seatsTotal}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent RSVPs */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-3">Recent Online Attendee RSVPs</h4>
                <div className="rounded-2xl border border-stone-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs text-stone-700">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-4">Ticket Code</th>
                        <th className="py-2.5 px-4">Event</th>
                        <th className="py-2.5 px-4">Attendee</th>
                        <th className="py-2.5 px-4">Contact</th>
                        <th className="py-2.5 px-4">Pass Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {rsvps.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-stone-400 text-xs">
                            No online RSVPs yet. Click &quot;RSVP / Pass&quot; on the Events page to test!
                          </td>
                        </tr>
                      ) : (
                        rsvps.map((r) => (
                          <tr key={r.id} className="hover:bg-stone-50">
                            <td className="py-2.5 px-4 font-mono font-bold text-emerald-800">
                              {r.ticketCode}
                            </td>
                            <td className="py-2.5 px-4 font-medium text-stone-800">
                              {r.eventTitle}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-stone-900">
                              {r.attendeeName}
                            </td>
                            <td className="py-2.5 px-4 text-stone-500">
                              {r.attendeeEmail} • {r.attendeePhone}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-stone-900">
                              {r.numberOfGuests} Pass(es)
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Dreamlight Welfare Society Administrative Console</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Exit Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
