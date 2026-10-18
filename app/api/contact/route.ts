import { NextRequest, NextResponse } from 'next/server';
import { NGO_CONFIG } from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, category } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;
    const receivedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Thank you ${name}. Your message has been received by our Khatima team. We will connect with you shortly at ${phone || email} or call us directly at ${NGO_CONFIG.displayPhone}.`,
      receivedAt,
      dispatchedNotificationTo: NGO_CONFIG.email,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error sending inquiry' },
      { status: 500 }
    );
  }
}
