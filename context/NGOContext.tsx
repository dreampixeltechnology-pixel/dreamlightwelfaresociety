'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  INITIAL_DONATIONS, 
  INITIAL_VOLUNTEERS, 
  INITIAL_EVENTS 
} from '@/lib/mock-data';
import { CauseType, DonationRecord, VolunteerApplication, NGOEvent, EventRSVP } from '@/types/ngo';

interface NGOContextType {
  donations: DonationRecord[];
  volunteers: VolunteerApplication[];
  events: NGOEvent[];
  rsvps: EventRSVP[];
  
  // Modals
  isDonateModalOpen: boolean;
  donateModalCause: CauseType;
  donateModalAmount: number;
  openDonateModal: (cause?: CauseType, amount?: number) => void;
  closeDonateModal: () => void;

  isVolunteerModalOpen: boolean;
  openVolunteerModal: () => void;
  closeVolunteerModal: () => void;

  selectedEventForRSVP: NGOEvent | null;
  openRSVPModal: (event: NGOEvent) => void;
  closeRSVPModal: () => void;

  activeReceipt: any | null;
  openReceiptModal: (receipt: any) => void;
  closeReceiptModal: () => void;

  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;

  // Actions
  handleDonationSuccess: (receipt: any) => void;
  handleVolunteerRegistered: (volunteer: VolunteerApplication) => void;
  handleRSVPConfirmed: (rsvp: EventRSVP) => void;
  handleAddMockDonation: (donation: DonationRecord) => void;
}

const NGOContext = createContext<NGOContextType | undefined>(undefined);

export function NGOProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<DonationRecord[]>(INITIAL_DONATIONS);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(INITIAL_VOLUNTEERS);
  const [events, setEvents] = useState<NGOEvent[]>(INITIAL_EVENTS);
  const [rsvps, setRsvps] = useState<EventRSVP[]>([]);

  // Modals state
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [donateModalCause, setDonateModalCause] = useState<CauseType>('education');
  const [donateModalAmount, setDonateModalAmount] = useState<number>(500);

  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [selectedEventForRSVP, setSelectedEventForRSVP] = useState<NGOEvent | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openDonateModal = (cause?: CauseType, amount?: number) => {
    if (cause) setDonateModalCause(cause);
    if (amount) setDonateModalAmount(amount);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => setIsDonateModalOpen(false);
  const openVolunteerModal = () => setIsVolunteerModalOpen(true);
  const closeVolunteerModal = () => setIsVolunteerModalOpen(false);

  const openRSVPModal = (event: NGOEvent) => setSelectedEventForRSVP(event);
  const closeRSVPModal = () => setSelectedEventForRSVP(null);

  const openReceiptModal = (receipt: any) => setActiveReceipt(receipt);
  const closeReceiptModal = () => setActiveReceipt(null);

  const handleDonationSuccess = (receipt: any) => {
    const newRecord: DonationRecord = {
      id: receipt.id || `don-${Date.now()}`,
      receiptNumber: receipt.receiptNumber,
      donorName: receipt.donorName,
      donorEmail: receipt.donorEmail,
      donorPhone: receipt.donorPhone,
      panNumber: receipt.panNumber,
      amount: receipt.amount,
      cause: receipt.cause,
      causeTitle: receipt.causeTitle,
      paymentMethod: receipt.paymentMethod,
      paymentId: receipt.paymentId,
      status: 'verified',
      date: receipt.date || new Date().toISOString(),
      is80GClaimed: receipt.is80GClaimed,
      notes: receipt.notes,
    };
    setDonations(prev => [newRecord, ...prev]);
    setIsDonateModalOpen(false);
    setActiveReceipt(receipt);
  };

  const handleVolunteerRegistered = (newVol: VolunteerApplication) => {
    setVolunteers(prev => [newVol, ...prev]);
  };

  const handleRSVPConfirmed = (newRsvp: EventRSVP) => {
    setRsvps(prev => [newRsvp, ...prev]);
    setEvents(prev => prev.map(evt => {
      if (evt.id === newRsvp.eventId) {
        return {
          ...evt,
          seatsBooked: evt.seatsBooked + newRsvp.numberOfGuests,
        };
      }
      return evt;
    }));
  };

  const handleAddMockDonation = (mockDonation: DonationRecord) => {
    setDonations(prev => [mockDonation, ...prev]);
  };

  return (
    <NGOContext.Provider value={{
      donations,
      volunteers,
      events,
      rsvps,
      isDonateModalOpen,
      donateModalCause,
      donateModalAmount,
      openDonateModal,
      closeDonateModal,
      isVolunteerModalOpen,
      openVolunteerModal,
      closeVolunteerModal,
      selectedEventForRSVP,
      openRSVPModal,
      closeRSVPModal,
      activeReceipt,
      openReceiptModal,
      closeReceiptModal,
      isAdmin,
      setIsAdmin,
      isSearchOpen,
      setIsSearchOpen,
      handleDonationSuccess,
      handleVolunteerRegistered,
      handleRSVPConfirmed,
      handleAddMockDonation,
    }}>
      {children}
    </NGOContext.Provider>
  );
}

export function useNGO() {
  const context = useContext(NGOContext);
  if (!context) {
    throw new Error('useNGO must be used within an NGOProvider');
  }
  return context;
}
