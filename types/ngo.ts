export type CauseType = 
  | 'education' 
  | 'health' 
  | 'environment' 
  | 'women' 
  | 'general';

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber?: string;
  address?: string;
  amount: number;
  cause: CauseType;
  causeTitle: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'bank_transfer';
  paymentId: string;
  status: 'verified' | 'pending' | 'failed';
  date: string;
  is80GClaimed: boolean;
  notes?: string;
}

export interface Project {
  id: string;
  title: string;
  category: CauseType;
  tagline: string;
  description: string;
  image: string;
  location: string;
  raisedAmount: number;
  targetAmount: number;
  beneficiariesCount: number;
  startDate: string;
  status: 'active' | 'completed' | 'upcoming';
  highlights: string[];
}

export interface VolunteerApplication {
  id: string;
  volunteerId: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  occupation: string;
  skills: string[];
  interestArea: CauseType;
  availability: 'weekends' | 'weekdays' | 'flexible' | 'full_time';
  hoursPerWeek: number;
  motivation: string;
  appliedDate: string;
  status: 'approved' | 'under_review' | 'contacted';
}

export interface NGOEvent {
  id: string;
  title: string;
  category: CauseType;
  date: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  image: string;
  targetBeneficiaries: string;
  seatsTotal: number;
  seatsBooked: number;
  coordinator: {
    name: string;
    phone: string;
  };
  highlights: string[];
}

export interface EventRSVP {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  numberOfGuests: number;
  ticketCode: string;
  bookedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: 'general' | 'donation' | 'partnership' | 'volunteer' | 'csr';
  createdAt: string;
  status: 'unread' | 'responded';
}

export interface KhatimaLocation {
  id: string;
  name: string;
  hindiName: string;
  sector: string;
  type: 'medical' | 'education' | 'women' | 'mobile_relief';
  coordinates: [number, number]; // [longitude, latitude] e.g. [79.972, 28.921]
  mapPosition: { x: number; y: number }; // percentage position for SVG canvas (0-100)
  programTitle: string;
  tagline: string;
  description: string;
  schedule: string;
  timing: string;
  leadCoordinator: string;
  doctorInCharge?: string;
  contactPhone: string;
  beneficiariesCount: number;
  servicesProvided: string[];
  status: 'Active Today' | 'Scheduled This Week' | 'Ongoing Daily' | 'Bi-Weekly Mega Camp';
  landmark: string;
  image: string;
}

export interface SponsorNeed {
  id: string;
  title: string;
  hindiTitle: string;
  category: CauseType;
  amount: number;
  period?: string; // e.g. 'per month' or 'one-time kit'
  impactDescription: string;
  image: string;
  itemsIncluded: string[];
  beneficiariesCount: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: CauseType;
  image: string;
  date: string;
  caption: string;
}
