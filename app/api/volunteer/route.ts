import { NextRequest, NextResponse } from 'next/server';
import { NGO_CONFIG } from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      age,
      city,
      occupation,
      skills,
      interestArea,
      availability,
      hoursPerWeek,
      motivation,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const volunteerId = `VOL-SSS-${new Date().getFullYear()}-${randomSuffix}`;
    const appliedDate = new Date().toISOString().split('T')[0];

    const volunteerApplication = {
      id: `vol-${timestamp}`,
      volunteerId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age: Number(age) || 24,
      city: city ? city.trim() : 'Khatima, Uttarakhand',
      occupation: occupation ? occupation.trim() : 'Professional / Student',
      skills: Array.isArray(skills) && skills.length > 0 ? skills : ['Community Outreach'],
      interestArea: interestArea || 'general',
      availability: availability || 'weekends',
      hoursPerWeek: Number(hoursPerWeek) || 5,
      motivation: motivation ? motivation.trim() : 'Passionate to serve Uttarakhand communities',
      appliedDate,
      status: 'approved',
      assignedBranch: 'Khatima Main Branch, Uttarakhand',
      mentorContact: `${NGO_CONFIG.displayPhone} (${NGO_CONFIG.email})`
    };

    return NextResponse.json({
      success: true,
      message: 'Volunteer application registered successfully!',
      volunteer: volunteerApplication,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing application' },
      { status: 500 }
    );
  }
}
