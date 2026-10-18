import { Project, NGOEvent, DonationRecord, VolunteerApplication, KhatimaLocation, SponsorNeed, GalleryItem } from '@/types/ngo';

export const NGO_CONFIG = {
  name: 'Dreamlight Welfare Society',
  tagline: 'Empowering Communities with Education, Healthcare & Dignity in Khatima & Terai Foothills',
  shortName: 'Dreamlight Welfare Society (NGO)',
  fullLegalName: 'Dreamlight Welfare Society (Regd. NGO Khatima)',
  registrationNo: 'UK/USN/SOC/2019/1892',
  nitiDarpanId: 'UA/2021/0289412',
  panNumber: 'AAATD8934E',
  taxExemption80G: 'AAATD8934E22LD01 (Section 80G of Income Tax Act 1961)',
  phone: '9528049722',
  displayPhone: '+91 9528049722',
  whatsappNumber: '919528049722',
  email: 'dreampixeltechnology@gmail.com',
  address: 'Near Subhash Chowk, Tanakpur Road, Khatima, U.S. Nagar, Uttarakhand - 262308, India',
  city: 'Khatima',
  state: 'Uttarakhand',
  minDonationAmount: 100,
  bankDetails: {
    accountName: 'Dreamlight Welfare Society',
    accountNumber: '50200084729103',
    ifscCode: 'HDFC0001892',
    bankName: 'HDFC Bank, Khatima Branch',
    upiId: 'dreamlightwelfaresociety@ybl',
  },
  stats: {
    livesImpacted: 28450,
    childrenEducated: 4200,
    medicalCampsHeld: 148,
    treesPlanted: 52000,
    womenTrained: 1850,
    activeVolunteers: 340,
    totalFundsRaised: 3842500,
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Vidya Jyoti - Rural Child Education & Digital Classrooms',
    category: 'education',
    tagline: 'Bridging education gaps for under-resourced children in Khatima rural blocks',
    description: 'Providing free textbooks, uniforms, smart audio-visual learning tablets, and evening remedial coaching centers across 12 villages around Khatima. We also sponsor school admissions for destitute children and girl students.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    location: 'Khatima & Chakarpur Villages, Uttarakhand',
    raisedAmount: 485000,
    targetAmount: 650000,
    beneficiariesCount: 850,
    startDate: 'January 2024',
    status: 'active',
    highlights: [
      'Daily after-school bridge classes for Class 1st to 10th',
      'Free distribution of winter uniforms, school bags & notebooks',
      'STEM & Computer science basic lab on wheels'
    ]
  },
  {
    id: 'proj-2',
    title: 'Aarogya Seva - Free Mega Health & Eye Care Camps',
    category: 'health',
    tagline: 'Comprehensive medical diagnoses, eye cataract screenings, and free medicines for rural poor',
    description: 'Organizing bi-weekly mobile healthcare clinics with visiting doctors, pediatricians, and optometrists. Patients receive complete blood pressure, hemoglobin, sugar checks, free spectacles, and vital prescription drugs without any charge.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    location: 'Community Centers across Khatima Tehsil',
    raisedAmount: 720000,
    targetAmount: 900000,
    beneficiariesCount: 4600,
    startDate: 'March 2023',
    status: 'active',
    highlights: [
      'Free diagnostic blood & sugar tests',
      'Prescription medicines given at zero cost to senior citizens',
      'Partnership with district civil hospital for specialized surgical referrals'
    ]
  },
  {
    id: 'proj-3',
    title: 'Harela Harit - Himalayan Foothill Afforestation & Clean Water',
    category: 'environment',
    tagline: 'Protecting fragile Sharda river basin biodiversity through mass native tree plantation',
    description: 'In honor of Uttarakhand\'s sacred Harela festival, we plant native fruit and timber saplings (Peepal, Neem, Jamun, Bael, Sheesham) across degraded forest lands, school campuses, and community ponds to preserve groundwater and combat climate change.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    location: 'Sharda River Corridor & Khatima Forest Range',
    raisedAmount: 310000,
    targetAmount: 400000,
    beneficiariesCount: 15000,
    startDate: 'July 2023',
    status: 'active',
    highlights: [
      '52,000+ native saplings planted with 87% survival rate',
      'Clean water pond desilting & rejuvenation initiatives',
      'Eco-clubs active in 24 government schools'
    ]
  },
  {
    id: 'proj-4',
    title: 'Shakti Swavlamban - Women Vocational Sewing & Digital Skills',
    category: 'women',
    tagline: 'Fostering financial self-reliance through sewing, handicraft, and micro-entrepreneurship',
    description: 'Equipping rural homemakers, single mothers, and young women with 6-month certified tailoring, embroidery, bakery, and digital literacy skills. Successful graduates are granted sewing machines on easy subsidized terms and connected to regional market collectives.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    location: 'Khatima Town Training Hub, Uttarakhand',
    raisedAmount: 540000,
    targetAmount: 600000,
    beneficiariesCount: 620,
    startDate: 'May 2023',
    status: 'active',
    highlights: [
      'Over 400 women have launched independent home tailoring ventures',
      'Self-Help Group (SHG) micro-finance mentorship',
      'Sanitary napkin awareness & free distribution drives'
    ]
  }
];

export const INITIAL_EVENTS: NGOEvent[] = [
  {
    id: 'event-1',
    title: 'Free Mega Eye Checkup & Cataract Screening Camp',
    category: 'health',
    date: 'Saturday, November 28, 2026',
    time: '09:30 AM - 04:30 PM',
    venue: 'Town Hall Community Complex, Tanakpur Road',
    city: 'Khatima, Uttarakhand',
    description: 'In collaboration with senior ophthalmologists. Free vision examinations, computerized refraction, distribution of 300+ reading glasses, and registration for free cataract surgery for elderly citizens.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    targetBeneficiaries: 'Senior citizens & underprivileged families',
    seatsTotal: 400,
    seatsBooked: 285,
    coordinator: {
      name: 'Dr. Vivek Bhatt & Team Dreamlight',
      phone: '9528049722'
    },
    highlights: [
      'Free high-index spectacles distribution',
      'Free medicines for glaucoma & eye infections',
      'Dedicated transport van for remote village elders'
    ]
  },
  {
    id: 'event-2',
    title: 'Khatima Green Belt: 2,500 Native Tree Plantation Drive',
    category: 'environment',
    date: 'Sunday, December 6, 2026',
    time: '07:30 AM - 12:00 PM',
    venue: 'Near Sharda Barrage Green Belt Area',
    city: 'Khatima, Uttarakhand',
    description: 'Join local youth, school students, and environmentalists to plant 2,500 shade-giving and soil-binding trees along the river buffer zone to check soil erosion and boost biodiversity.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    targetBeneficiaries: 'Community and local ecosystem',
    seatsTotal: 250,
    seatsBooked: 198,
    coordinator: {
      name: 'Pooja Rawat (Eco-Lead)',
      phone: '9528049722'
    },
    highlights: [
      'Saplings, gardening tools & refreshments provided free',
      'Tree Adoption Certificate for every volunteer',
      'Tree tagging and GPS tracking for caretaking'
    ]
  },
  {
    id: 'event-3',
    title: 'Winter Blanket & Nutritional Warmth Distribution Drive',
    category: 'general',
    date: 'Sunday, December 20, 2026',
    time: '11:00 AM - 03:00 PM',
    venue: 'Govt. Primary School Grounds, Chakarpur Block',
    city: 'Khatima, Uttarakhand',
    description: 'Distributing warm woollen blankets, thermal caps, socks, and fortified nutrition packets to 500 vulnerable families, daily-wage laborers, and street vendors before the peak Himalayan frost.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    targetBeneficiaries: '500 economically weaker households',
    seatsTotal: 150,
    seatsBooked: 112,
    coordinator: {
      name: 'Ramesh Singh Bisht',
      phone: '9528049722'
    },
    highlights: [
      'High-grade heavy woollen blankets',
      'Warm milk & high-protein laddu distribution for kids',
      'Door-to-door delivery for differently-abled elders'
    ]
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'don-1001',
    receiptNumber: 'SSS-80G-2026-0842',
    donorName: 'Rajesh Chandra Joshi',
    donorEmail: 'rajesh.joshi@gmail.com',
    donorPhone: '+91 9837123450',
    panNumber: 'ABCPJ8472K',
    address: 'Khatima, Uttarakhand',
    amount: 5100,
    cause: 'education',
    causeTitle: 'Vidya Jyoti Rural Child Education',
    paymentMethod: 'upi',
    paymentId: 'PAY-UPI-984218731',
    status: 'verified',
    date: '2026-10-14 14:32',
    is80GClaimed: true,
    notes: 'Support for books and uniform'
  },
  {
    id: 'don-1002',
    receiptNumber: 'SSS-80G-2026-0841',
    donorName: 'Sunita Sharma',
    donorEmail: 'sunita.sharma@yahoo.co.in',
    donorPhone: '+91 9412098765',
    panNumber: 'AYFPS1120M',
    address: 'Haldwani, Uttarakhand',
    amount: 2500,
    cause: 'health',
    causeTitle: 'Aarogya Seva Free Medical Camps',
    paymentMethod: 'card',
    paymentId: 'PAY-CRD-773192804',
    status: 'verified',
    date: '2026-10-13 11:15',
    is80GClaimed: true,
    notes: 'In loving memory of parents'
  },
  {
    id: 'don-1003',
    receiptNumber: 'SSS-80G-2026-0840',
    donorName: 'Amit Verma',
    donorEmail: 'amit.verma88@outlook.com',
    donorPhone: '+91 9719045612',
    panNumber: 'BTPPV9021R',
    address: 'Rudrapur, Uttarakhand',
    amount: 1100,
    cause: 'environment',
    causeTitle: 'Harela Harit Tree Plantation',
    paymentMethod: 'upi',
    paymentId: 'PAY-UPI-449102831',
    status: 'verified',
    date: '2026-10-12 18:40',
    is80GClaimed: true,
    notes: 'Plant 10 native trees'
  },
  {
    id: 'don-1004',
    receiptNumber: 'SSS-80G-2026-0839',
    donorName: 'Meenakshi Pandey',
    donorEmail: 'meenakshipandey@gmail.com',
    donorPhone: '+91 9897003411',
    panNumber: 'CDEPP5567Q',
    address: 'Khatima, Uttarakhand',
    amount: 1000,
    cause: 'women',
    causeTitle: 'Shakti Swavlamban Skill Centers',
    paymentMethod: 'netbanking',
    paymentId: 'PAY-NET-221948301',
    status: 'verified',
    date: '2026-10-11 16:22',
    is80GClaimed: true,
    notes: 'Towards women sewing training material'
  },
  {
    id: 'don-1005',
    receiptNumber: 'SSS-80G-2026-0838',
    donorName: 'Kunal Singh Negi',
    donorEmail: 'kunal.negi@gmail.com',
    donorPhone: '+91 9528049722',
    amount: 100,
    cause: 'general',
    causeTitle: 'Where Needed Most (General Fund)',
    paymentMethod: 'upi',
    paymentId: 'PAY-UPI-109283741',
    status: 'verified',
    date: '2026-10-10 09:05',
    is80GClaimed: false,
    notes: 'Starting small with ₹100'
  }
];

export const INITIAL_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: 'vol-1',
    volunteerId: 'VOL-SSS-2026-014',
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@gmail.com',
    phone: '+91 9876543210',
    age: 22,
    city: 'Khatima, Uttarakhand',
    occupation: 'College Student (B.Ed)',
    skills: ['Primary Teaching', 'Hindi & English Storytelling', 'Art & Craft'],
    interestArea: 'education',
    availability: 'weekends',
    hoursPerWeek: 6,
    motivation: 'I want to teach underprivileged kids in Chakarpur village so they never drop out of school.',
    appliedDate: '2026-10-12',
    status: 'approved'
  },
  {
    id: 'vol-2',
    volunteerId: 'VOL-SSS-2026-015',
    fullName: 'Dr. Gaurav Kandpal',
    email: 'dr.gaurav.k@gmail.com',
    phone: '+91 9411223344',
    age: 31,
    city: 'Khatima, Uttarakhand',
    occupation: 'General Physician',
    skills: ['Clinical Consultations', 'First Aid Training', 'Health Awareness'],
    interestArea: 'health',
    availability: 'weekends',
    hoursPerWeek: 4,
    motivation: 'Happy to dedicate two Sundays each month to free medical camps in our rural Khatima belt.',
    appliedDate: '2026-10-08',
    status: 'approved'
  },
  {
    id: 'vol-3',
    volunteerId: 'VOL-SSS-2026-016',
    fullName: 'Deepak Singh Rana',
    email: 'deepak.rana99@gmail.com',
    phone: '+91 9528049722',
    age: 26,
    city: 'Khatima, Uttarakhand',
    occupation: 'Social Media Marketer',
    skills: ['Videography', 'Drone Photography', 'Social Media Management'],
    interestArea: 'environment',
    availability: 'flexible',
    hoursPerWeek: 8,
    motivation: 'Documenting tree plantation drives and community stories to inspire younger generations.',
    appliedDate: '2026-10-14',
    status: 'under_review'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote: 'When my husband passed away, Dreamlight Welfare Society\'s sewing workshop in Khatima gave me a livelihood. Today I stitch uniforms for local schools and feed my three children with pride.',
    name: 'Kamla Devi',
    role: 'Beneficiary & Tailoring Entrepreneur',
    village: 'Chakarpur Village, Khatima'
  },
  {
    id: 'test-2',
    quote: 'In our village, the medical camp organized by Dreamlight Welfare Society identified my grandmother\'s cataract in time. They arranged free transportation and surgery. We are endlessly grateful.',
    name: 'Mohit Rawat',
    role: 'Village Resident',
    village: 'Nanakmatta Border Area, Khatima'
  },
  {
    id: 'test-3',
    quote: 'I have been donating monthly to Dreamlight Welfare Society since 2024. The transparency, instant tax receipt, and regular photo updates of the children studying prove their pure dedication.',
    name: 'Sanjeev Agarwal',
    role: 'Regular Donor & Business Owner',
    village: 'Udham Singh Nagar, Uttarakhand'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Are donations to Dreamlight Welfare Society eligible for tax exemption?',
    answer: 'Yes! Dreamlight Welfare Society is officially registered under Section 80G and 12A of the Indian Income Tax Act 1961. You can claim up to 50% tax deduction on your donation. An official digital receipt with your PAN details and unique serial number is generated immediately upon payment.'
  },
  {
    question: 'What is the minimum donation amount accepted?',
    answer: 'You can begin donating with just ₹100! Every single rupee counts directly toward child school supplies, doctor prescriptions, tree saplings, or sewing threads. We also provide presets for ₹250, ₹500, ₹1,100, ₹2,500, and customizable sums.'
  },
  {
    question: 'How do I know my donation is used transparently?',
    answer: 'We maintain 100% financial and operational transparency. Donors receive automatic email confirmations, can inspect project balance sheets in our public reporting section, and can visit our physical office or centers near Subhash Chowk, Tanakpur Road, Khatima at any time.'
  },
  {
    question: 'How can I volunteer if I live in or outside Khatima?',
    answer: 'Both local in-person volunteering (teaching, medical camps, tree planting in Khatima) and remote volunteering (curriculum design, grant writing, web development, digital campaigns) are welcomed. Fill out our volunteer registration form to receive your verified Volunteer Pass.'
  },
  {
    question: 'Where is the registered office located and how can I contact the team directly?',
    answer: 'Our main office is located at Tanakpur Road, Near Subhash Chowk, Khatima, Udham Singh Nagar, Uttarakhand - 262308. You can call or WhatsApp our helpline directly at +91 9528049722, or email dreampixeltechnology@gmail.com.'
  }
];

export const KHATIMA_LOCATIONS: KhatimaLocation[] = [
  {
    id: 'khatima-central',
    name: 'Khatima Town Central & Subhash Chowk',
    hindiName: 'खटीमा मुख्य नगर (सुभाष चौक)',
    sector: 'Central Urban Hub',
    type: 'medical',
    coordinates: [79.972, 28.921],
    mapPosition: { x: 50, y: 48 },
    programTitle: 'Main Aarogya Polyclinic & Vidya Jyoti Central Hub',
    tagline: 'Permanent diagnostic dispensary, doctor consultation suite & central remedial study hall',
    description: 'Our primary urban outreach facility providing daily general physician consultations, free laboratory blood sugar/pressure screenings, and an evening remedial education classroom for over 320 destitute children from nearby slums.',
    schedule: 'Mon - Sat (Regular OPD & Evening School)',
    timing: 'OPD: 10:00 AM - 02:00 PM | Classes: 04:30 PM - 07:00 PM',
    leadCoordinator: 'Er. Rakesh Joshi (Secretary)',
    doctorInCharge: 'Dr. Vivek Bhatt (MBBS, DNB - Senior Medical Consultant)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 1420,
    servicesProvided: [
      'Free general physician diagnostics & checkups',
      'Essential prescription medicines dispensed at zero charge',
      'Daily remedial bridge classes for Class 1 to 10',
      'Digital computer literacy station & library corner'
    ],
    status: 'Ongoing Daily',
    landmark: 'Near Subhash Chowk, Tanakpur Road, Khatima',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chakarpur-camp',
    name: 'Chakarpur Sector (NH-125 Corridor)',
    hindiName: 'चकरपुर सेक्टर (राष्ट्रीय राजमार्ग 125)',
    sector: 'North-East Rural Belt',
    type: 'medical',
    coordinates: [80.035, 28.958],
    mapPosition: { x: 74, y: 28 },
    programTitle: 'Mega Eye Care & Free Cataract Screening Camp',
    tagline: 'Comprehensive computerized eye refraction, prescription spectacles & cataract surgeries',
    description: 'Bi-weekly high-capacity medical camp organized at the Chakarpur community grounds. Specialized ophthalmologists screen elderly rural villagers for cataracts, pterygium, and vision defects, providing free custom-powered glasses and hospital surgical admissions.',
    schedule: 'Alternate Saturdays (Bi-Weekly Mega Camp)',
    timing: '09:30 AM - 04:30 PM',
    leadCoordinator: 'Smt. Kavita Sharma (Field Lead)',
    doctorInCharge: 'Dr. S. K. Upadhyay (MS Ophthalmology)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 1850,
    servicesProvided: [
      'Computerized vision & retinal examination',
      'Free high-grade reading and distance spectacles',
      'Free surgical referrals & transportation to District Civil Hospital',
      'Distribution of antibiotic eye drops and anti-inflammatory medicines'
    ],
    status: 'Bi-Weekly Mega Camp',
    landmark: 'Opposite Government Inter College Ground, Chakarpur',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'melaghat-sharda',
    name: 'Melaghat & Sharda River Basin',
    hindiName: 'मेलाघाट व शारदा नदी तटीय क्षेत्र',
    sector: 'Eastern Riverine Border',
    type: 'medical',
    coordinates: [80.082, 28.935],
    mapPosition: { x: 90, y: 44 },
    programTitle: 'Border Mobile Health Dispensary & Tribal Outreach',
    tagline: 'Doorstep mobile healthcare van and primary health screenings for isolated riverbank villages',
    description: 'Operating right alongside the Sharda river floodplain and Nepal border settlements, Dreamlight\'s mobile ambulance van visits remote hamlets where no primary health center exists, treating waterborne ailments, malnutrition, and maternal vulnerabilities.',
    schedule: 'Every Tuesday & Friday',
    timing: '10:30 AM - 03:30 PM',
    leadCoordinator: 'Mukesh Singh Rana (Local Community Volunteer)',
    doctorInCharge: 'Dr. Reena Mehta (Community Medicine Specialist)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 980,
    servicesProvided: [
      'Mobile ambulance diagnostics & vital signs monitoring',
      'Waterborne illness treatment (ORS, purifying chlorine tablets)',
      'Pediatric deworming & vitamin A supplementation',
      'Prenatal health advisory for expectant mothers'
    ],
    status: 'Scheduled This Week',
    landmark: 'Melaghat Panchayat Bhavan & Sharda Barrage Link',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jhau-parsa-school',
    name: 'Jhau Parsa Rural Block',
    hindiName: 'झाऊ परसा ग्रामीण ब्लॉक',
    sector: 'North-West Agricultural Sector',
    type: 'education',
    coordinates: [79.928, 28.940],
    mapPosition: { x: 28, y: 36 },
    programTitle: 'Vidya Jyoti Free Bridge School & STEM Pod',
    tagline: 'Evening remedial learning center for children of daily-wage agricultural workers',
    description: 'A vibrant non-formal school center established in Jhau Parsa ensuring out-of-school and underprivileged children gain foundational literacy and numeracy. Children receive interactive lessons on digital tablets, stationery packages, and evening wholesome nutrition.',
    schedule: 'Monday to Friday (Daily)',
    timing: '03:45 PM - 06:15 PM',
    leadCoordinator: 'Priya Bisht (Head Educator)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 640,
    servicesProvided: [
      'NCERT-aligned remedial tutoring in Hindi, Math & English',
      'Free school bags, notebooks, geometry boxes & uniform sets',
      'Digital audio-visual tablet sessions for interactive science',
      'Daily evening nutritious snack (boiled pulses, fruits & milk)'
    ],
    status: 'Ongoing Daily',
    landmark: 'Near Jhau Parsa Primary Health Sub-Center',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'amau-tanakpur-link',
    name: 'Amau & Tanakpur Highway Zone',
    hindiName: 'अमऊ व टनकपुर रोड क्षेत्र',
    sector: 'Northern Highway Corridor',
    type: 'education',
    coordinates: [79.992, 28.964],
    mapPosition: { x: 56, y: 22 },
    programTitle: 'Digital Education Pod & School Admission Bridge',
    tagline: 'Formal school enrolment drives, scholarship assistance & computer literacy',
    description: 'Located in Amau village, this center helps enroll dropped-out students back into government schools while running afternoon supplementary digital education and foundational computer learning for secondary grade students.',
    schedule: 'Monday to Saturday',
    timing: '04:00 PM - 06:30 PM',
    leadCoordinator: 'Suresh Kumar Verma',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 720,
    servicesProvided: [
      'Computer basics, typing, and Internet educational tools',
      'Sponsorship for government school re-admissions & examination fees',
      'Quarterly book fair and science experiment workshops',
      'Career counselling sessions for high-school rural students'
    ],
    status: 'Active Today',
    landmark: 'Tanakpur Highway, Amau Panchayat Building',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nanakmatta-corridor',
    name: 'Nanakmatta Border Link (Khatima West)',
    hindiName: 'नानकमत्ता सीमांत क्षेत्र (खटीमा पश्चिम)',
    sector: 'Western Rural Border',
    type: 'medical',
    coordinates: [79.885, 28.905],
    mapPosition: { x: 12, y: 55 },
    programTitle: 'Maternal-Child Wellness & General Health Diagnostic Camp',
    tagline: 'Maternal health, anemia detection, pediatric checks & free vitamins',
    description: 'A dedicated healthcare camp serving border villages between Khatima and Nanakmatta. Special attention is directed toward combating high maternal anemia and childhood malnutrition through hemoglobin testing, iron supplements, and nutritional guidance.',
    schedule: 'Every 1st & 3rd Thursday of the Month',
    timing: '10:00 AM - 03:00 PM',
    leadCoordinator: 'Sunita Chand (Health Outreach Coordinator)',
    doctorInCharge: 'Dr. Aruna Joshi (Gynecologist & Child Specialist)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 890,
    servicesProvided: [
      'Spot digital hemoglobin testing & blood group typing',
      'Free iron-folic acid, calcium & multivitamin distribution',
      'Pediatric growth tracking and nutritional counseling',
      'Clean hygiene & sanitary napkin kits for adolescent girls'
    ],
    status: 'Scheduled This Week',
    landmark: 'Near Nanakmatta Road Junction, Khatima Border',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lohiahead-colony',
    name: 'Lohiahead & Sharda Hydro Forest Sector',
    hindiName: 'लोहियाहेड व वन क्षेत्र कॉलोनी',
    sector: 'South-East Forest Buffer',
    type: 'mobile_relief',
    coordinates: [80.065, 28.882],
    mapPosition: { x: 82, y: 72 },
    programTitle: 'Forest Settlement Health Clinic & Winter Blanket Drive',
    tagline: 'Seasonal immunization, emergency relief, warm clothing & hygiene drives',
    description: 'Serving forest settlement dwellers, migrant workers, and hydro-project daily laborers who face harsh winter conditions and dense jungle terrain. The camp provides respiratory care medicines, warm blankets, and preventive immunization checks.',
    schedule: 'Monthly Mega Drive & Urgent Response',
    timing: '10:00 AM - 04:00 PM',
    leadCoordinator: 'Harish Chandra Pant',
    doctorInCharge: 'Dr. Deepak Bhatt (General Physician)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 530,
    servicesProvided: [
      'Cold, cough, bronchitis & asthma diagnostics and free inhalers',
      'High-grade thermal winter blanket & woolen sweater distribution',
      'First-aid, burn dressing & snake-bite prevention awareness',
      'Safe potable water purification filter kits'
    ],
    status: 'Scheduled This Week',
    landmark: 'Lohiahead Power House Colony Community Center',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bigra-bagh-women',
    name: 'Bigra Bagh & Majhola Road Sector',
    hindiName: 'बिगरा बाग व मझोला रोड क्षेत्र',
    sector: 'South Urban-Rural Transition',
    type: 'women',
    coordinates: [79.955, 28.878],
    mapPosition: { x: 42, y: 76 },
    programTitle: 'Shakti Women Sewing Center & Girl Child Education',
    tagline: 'Vocational sewing machines, certified tailoring coaching & girls evening study support',
    description: 'Equipped with 22 modern sewing machines, this empowerment hub trains underprivileged young women and single mothers in garment manufacturing, embroidery, and entrepreneurship while running a dedicated girls study library upstairs.',
    schedule: 'Monday to Saturday',
    timing: 'Batch 1: 10:00 AM - 01:00 PM | Batch 2: 02:00 PM - 05:00 PM',
    leadCoordinator: 'Rekha Devi & Pooja Arya (Master Tailoring Trainers)',
    contactPhone: '+91 9528049722',
    beneficiariesCount: 460,
    servicesProvided: [
      'Certified 6-month tailoring, cutting & design curriculum',
      'Subsidized sewing machine handover upon course completion',
      'Girls evening study room with curated books & solar study lamps',
      'Financial literacy, bank account setup & SHG loan linkage'
    ],
    status: 'Ongoing Daily',
    landmark: 'Bigra Bagh Main Market, Majhola Road, Khatima',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  }
];

export const SPONSOR_NEEDS: SponsorNeed[] = [
  {
    id: 'sponsor-child-education',
    title: "Sponsor a Child's Full Education",
    hindiTitle: 'एक बच्चे की शिक्षा प्रायोजित करें',
    category: 'education',
    amount: 1000,
    period: 'per month',
    impactDescription: 'Directly pays for school tuition, uniforms, sturdy school bag, notebooks, and daily after-school remedial coaching in Khatima villages.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['School bag & uniforms', 'Annual stationery & books', 'Evening coaching classes', 'Monthly nutrition snack'],
    beneficiariesCount: '1 Child / Month'
  },
  {
    id: 'sponsor-medical-care',
    title: 'Free Medicines & Health Checkup for Elders',
    hindiTitle: 'बुजुर्गों हेतु निशुल्क जांच व दवाएं',
    category: 'health',
    amount: 500,
    period: 'per elder',
    impactDescription: 'Provides full doctor diagnosis, blood pressure/sugar screening, and a 1-month supply of vital medicines for underprivileged seniors.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['Doctor consultation', 'BP & Blood sugar test', '30-day generic medicine kit', 'Reading spectacles'],
    beneficiariesCount: '2 Elderly Patients'
  },
  {
    id: 'sponsor-ration-kit',
    title: 'Monthly Nutrition & Ration Kit for Poor Family',
    hindiTitle: 'गरीब परिवार हेतु राशन किट',
    category: 'general',
    amount: 1500,
    period: 'per family',
    impactDescription: 'Supplies 15kg wheat flour, 10kg rice, 2kg lentils (dal), 1L mustard oil, iodized salt, sugar, tea, and spices to prevent hunger.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['15kg Flour & 10kg Rice', '2kg Pulses & 1L Cooking Oil', 'Spices, tea & salt pack', 'Detergent & soap bars'],
    beneficiariesCount: 'Family of 5 (1 Month)'
  },
  {
    id: 'sponsor-women-sewing',
    title: 'Women Sewing Machine & Livelihood Kit',
    hindiTitle: 'महिला सिलाई मशीन व स्वरोजगार किट',
    category: 'women',
    amount: 2500,
    period: 'one-time kit',
    impactDescription: 'Provides a sturdy heavy-duty sewing machine, thread kits, shears, and cutting materials to enable a rural woman to earn an independent income.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['Certified sewing machine', 'Master cutting guide', '6-month thread & accessory kit', 'Market order linkage'],
    beneficiariesCount: '1 Woman Entrepreneur'
  },
  {
    id: 'sponsor-green-khatima',
    title: 'Plant 10 Native Trees (Sharda River Green Belt)',
    hindiTitle: '10 फलदार व छायादार पौधे रोपण',
    category: 'environment',
    amount: 500,
    period: '10 saplings',
    impactDescription: 'Plants and nurtures 10 indigenous saplings (Neem, Peepal, Jamun, Bael) along the Sharda river basin with tree guards and 2-year care.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['10 native hardy saplings', 'Bamboo tree guards', 'Organic compost & watering', '2-year survival tracking'],
    beneficiariesCount: '10 Trees Nurtured'
  },
  {
    id: 'sponsor-emergency-patient',
    title: 'Emergency Medical & Diagnostic Relief Fund',
    hindiTitle: 'आपातकालीन चिकित्सा सहायता',
    category: 'health',
    amount: 2000,
    period: 'emergency care',
    impactDescription: 'Urgent diagnostic scans, hospital admission ambulance support, and critical life-saving medications for accident or acute illness patients.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    itemsIncluded: ['Emergency hospital referral', 'Ambulance travel fuel subsidy', 'Critical prescription drugs', 'Attendant meal allowance'],
    beneficiariesCount: '1 Emergency Patient'
  }
];

export const GROUND_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Free Eye Cataract & Glasses Camp',
    location: 'Community Hall, Subhash Chowk, Khatima',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    date: 'March 2024',
    caption: 'Over 420 elderly citizens screened; 180 free reading glasses and prescription eyedrops distributed.'
  },
  {
    id: 'gal-2',
    title: 'School Bag & Stationery Distribution',
    location: 'Primary School, Chakarpur Border Village',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    date: 'April 2024',
    caption: 'Providing new school bags, notebooks, and math geometry kits to 280 underprivileged children.'
  },
  {
    id: 'gal-3',
    title: 'Women Sewing & Tailoring Convocation',
    location: 'Bigra Bagh Training Center, Khatima',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: 'February 2024',
    caption: '35 rural women graduated with government-recognized tailoring certificates and subsidized sewing kits.'
  },
  {
    id: 'gal-4',
    title: 'Harela Mass Tree Plantation Drive',
    location: 'Sharda River Canal Embankment, Khatima',
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    date: 'July 2024',
    caption: 'Volunteers and local school students planted 1,200 native Neem, Peepal, and Jamun saplings.'
  },
  {
    id: 'gal-5',
    title: 'Winter Warm Clothes & Blanket Relief',
    location: 'Lohiahead Forest Settlement, Khatima',
    category: 'general',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    date: 'December 2023',
    caption: 'Distributing warm woolens, heavy blankets, and hot meals to forest dwellers during cold waves.'
  },
  {
    id: 'gal-6',
    title: 'Mobile Doctor Clinic on Wheels',
    location: 'Melghat & Jhauparsia Agricultural Belt',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    date: 'May 2024',
    caption: 'Weekly mobile health van providing doorstep consultations and pediatrics checkups.'
  }
];
