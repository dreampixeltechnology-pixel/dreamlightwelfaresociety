import { NextRequest, NextResponse } from 'next/server';
import { 
  INITIAL_PROJECTS, 
  INITIAL_EVENTS, 
  KHATIMA_LOCATIONS, 
  SPONSOR_NEEDS, 
  FAQ_ITEMS,
  NGO_CONFIG 
} from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';

  if (!q) {
    return NextResponse.json({
      results: [
        { type: 'quick', title: 'Sponsor a Child Education', subtitle: '₹1,000 / month • Books & tuition', action: 'donate', cause: 'education', amount: 1000 },
        { type: 'quick', title: 'Free Medical Camps Map', subtitle: 'View 8 active camp locations in Khatima', action: 'map' },
        { type: 'quick', title: 'Section 80G Tax Exemption Papers', subtitle: 'Order No: ' + NGO_CONFIG.taxExemption80G.split(' ')[0], action: 'docs' },
        { type: 'quick', title: 'Emergency Blood & Medical Help', subtitle: 'Helpline: ' + NGO_CONFIG.displayPhone, action: 'sos' },
      ]
    });
  }

  const results: any[] = [];

  // 1. Search in Programs / Projects
  INITIAL_PROJECTS.forEach(p => {
    if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)) {
      results.push({
        id: p.id,
        type: 'program',
        title: p.title,
        subtitle: `${p.location} • ₹${p.raisedAmount.toLocaleString('en-IN')} raised`,
        category: p.category,
        action: 'page',
        page: 'projects'
      });
    }
  });

  // 2. Search in Khatima Camps / Locations
  KHATIMA_LOCATIONS.forEach(loc => {
    if (loc.name.toLowerCase().includes(q) || loc.programTitle.toLowerCase().includes(q) || loc.servicesProvided.some(s => s.toLowerCase().includes(q)) || loc.landmark.toLowerCase().includes(q)) {
      results.push({
        id: loc.id,
        type: 'camp',
        title: `${loc.name} (${loc.hindiName})`,
        subtitle: `${loc.programTitle} • ${loc.schedule}`,
        action: 'map',
        locationId: loc.id
      });
    }
  });

  // 3. Search in Sponsor Needs
  SPONSOR_NEEDS.forEach(need => {
    if (need.title.toLowerCase().includes(q) || need.hindiTitle.toLowerCase().includes(q) || need.impactDescription.toLowerCase().includes(q)) {
      results.push({
        id: need.id,
        type: 'need',
        title: need.title,
        subtitle: `₹${need.amount.toLocaleString('en-IN')} • ${need.impactDescription.substring(0, 70)}...`,
        action: 'donate',
        cause: need.category,
        amount: need.amount
      });
    }
  });

  // 4. Search in Events
  INITIAL_EVENTS.forEach(evt => {
    if (evt.title.toLowerCase().includes(q) || evt.venue.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q)) {
      results.push({
        id: evt.id,
        type: 'event',
        title: evt.title,
        subtitle: `${evt.date} • ${evt.venue}, ${evt.city}`,
        action: 'page',
        page: 'events'
      });
    }
  });

  // 5. Search in FAQs
  FAQ_ITEMS.forEach((faq, idx) => {
    if (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)) {
      results.push({
        id: `faq-${idx}`,
        type: 'faq',
        title: faq.question,
        subtitle: faq.answer.substring(0, 80) + '...',
        action: 'faq'
      });
    }
  });

  return NextResponse.json({
    query: q,
    count: results.length,
    results: results.slice(0, 8)
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
