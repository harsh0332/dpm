export interface Category {
  id: string;
  name: string;
  ageRange: string;
  subtitle?: string;
  isPopular?: boolean;
  image: string;
}

export interface CelebrityPatron {
  name: string;
  title: string;
  credentials: string[];
  image: string;
  aboutImage: string;
}

export interface JuryMember {
  name: string;
  role: string;
  instagram?: string;
  followers?: string;
  bio?: string;
  image: string;
}

export interface Prize {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  date?: string;
}

export interface PastEvent {
  id: string;
  title: string;
  year: number;
  description: string;
}

export interface GalleryImage {
  src: string;
  category: "ramp" | "glamour";
}

export interface SiteConfig {
  maxSlotsPerState: number;
  slotsRemaining: number;
  grandFinaleDeadline: string;
  countdownTarget: string;
  careersLaunched: string;
  prizesPool: string;
  categoriesCount: string;
  groomingSupport: string;
  showLiveActivityTicker: boolean;
  showLeadPopup: boolean;
  showRecentApplicationsToast: boolean;
  razorpayMode: "production" | "sandbox";
}

export interface SiteData {
  brandName: string;
  eventName: string;
  founder: string;
  organization: string;
  contactEmail: string;
  logo: string;
  opportunityImage: string;
  registrationFee: {
    current: number;
    original: number;
    gstIncluded: boolean;
  };
  grandFinaleDate: string;
  celebrityPatron: CelebrityPatron;
  categories: Category[];
  jury: JuryMember[];
  prizes: Prize[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  pastEvents: PastEvent[];
  galleryImages: GalleryImage[];
  founderCelebsImages: string[];
  config: SiteConfig;
}

export const siteData: SiteData = {
  brandName: "DPM Entertainment",
  eventName: "DPM Mr / Miss / Mrs / Miss Teen India 2026",
  founder: "Shivanshu Mishra",
  organization: "DPM Entertainment, Allahabad, Uttar Pradesh",
  contactEmail: "dpmentertainment@gmail.com",
  logo: "/new-images/dpm-logo.png",
  opportunityImage: "/new-images/about-dpm.png",
  registrationFee: {
    current: 999,
    original: 4999,
    gstIncluded: true,
  },
  grandFinaleDate: "27th September",
  celebrityPatron: {
    name: "Urvashi Rautela",
    title: "Celebrity Patron & Chief Guest",
    credentials: [
      "Miss Diva Universe 2015",
      "Femina Miss India 2015"
    ],
    image: "/new-images/urvashi-rautela.png",
    aboutImage: "/new-images/urvashi-about.png"
  },
  categories: [
    {
      id: "mr-india",
      name: "Mr. India",
      ageRange: "16–32", // TODO: DPM to confirm final age
      subtitle: "For aspiring male models and actors",
      image: "/new-images/category-mr-india.jpg"
    },
    {
      id: "miss-india",
      name: "Miss India",
      ageRange: "16–28", // TODO: DPM to confirm final age
      subtitle: "For aspiring female models and actors",
      isPopular: true,
      image: "/new-images/category-miss.png"
    },
    {
      id: "miss-teen-india",
      name: "Miss Teen India",
      ageRange: "12–18", // TODO: DPM to confirm final age
      subtitle: "For teen aspirants (parent consent required)",
      image: "/new-images/category-miss-teen.jpg"
    },
    {
      id: "mrs-india",
      name: "Mrs. India",
      ageRange: "23–60", // TODO: DPM to confirm final age
      subtitle: "For married, widowed, or divorced women",
      image: "/new-images/category-mrs-india.png"
    }
  ],
  jury: [
    {
      name: "Dinesh Sudarshan Soi",
      role: "Director & Producer",
      instagram: "@dineshsudarshansoi",
      image: "/new-images/judge-1.png",
      followers: "1.2M+",
      bio: "National Award winner, directed 50+ music videos and launched top-tier modeling careers."
    },
    {
      name: "Dishi Bhatnagar",
      role: "Director, Miss Mrs & Mr Asia Intl",
      instagram: "@dishibhatnagar",
      image: "/new-images/card-dishi-bhatnagar.png",
      followers: "250k+",
      bio: "International pageant director with 15+ years experience sculpting global runway candidates."
    },
    {
      name: "Ishmeet Kaur",
      role: "Mrs India World 2024",
      instagram: "@ishmeetkaur",
      image: "/new-images/aud-thumbnail.png",
      followers: "100k+",
      bio: "Crowned Mrs India World 2024, mentor to rising models and promoter of regional talent."
    },
    {
      name: "Dr. Akanksha Massey",
      role: "Gynecologist & Mentor",
      instagram: "@dr.akankshamassey",
      image: "/new-images/card-akansha-massey.png",
      followers: "45k+",
      bio: "Medical professional, wellness mentor, and pageant judge specializing in mental strength & posture."
    },
    {
      name: "Ankit Nagpal",
      role: "Mentor & Personality Coach",
      instagram: "@ankitnagpal",
      image: "/new-images/card-ankit-nagpal.png",
      followers: "80k+",
      bio: "Celebrity personality coach and communication mentor with deep ties to Bollywood casting directors."
    },
    {
      name: "Allie Sharma",
      role: "Show Director & Pageant Groomer",
      instagram: "@alliesharma",
      image: "/new-images/card-allie-sharma.png",
      followers: "120k+",
      bio: "Show director, runway choreographer and pageant groomer with over 200 staged fashion shows."
    },
    {
      name: "Sapna Chauhan",
      role: "Entrepreneur & Filmmaker",
      instagram: "@sapnachauhan",
      image: "/new-images/card-sapna-chauhan.png",
      followers: "95k+",
      bio: "Entrepreneur, film producer and pageant organizer creating direct lanes for actors & models."
    },
    {
      name: "Kanchan Vishwakarma",
      role: "Scientist & Pageant Title-holder",
      instagram: "@kanchanvishwakarma",
      image: "/new-images/card-kanchan-vishwakarma.png",
      followers: "30k+",
      bio: "Scientist, pageant winner and regional talent mentor focused on intelligence & presentation."
    },
    {
      name: "Shalini Kashyap",
      role: "Miss Universe Earth Intl 2022, Communication Coach",
      instagram: "@shalinikashyap",
      image: "/new-images/card-shalini-kashyap.png",
      followers: "150k+",
      bio: "Crowned Miss Universe Earth Intl 2022, communication coach, and runway presentation expert."
    }
  ],
  prizes: [
    {
      title: "Cash Prizes",
      description: "Cash worth ₹11,00,000 (T&C apply)"
    },
    {
      title: "1-Year In-House Contract",
      description: "Opportunities in web series, films, music videos, and fashion shows"
    },
    {
      title: "International Platform",
      description: "Representation on global platforms and pageants"
    },
    {
      title: "Brand Ambassadorship",
      description: "National & International Brand Ambassador roles"
    },
    {
      title: "Bollywood Access",
      description: "Direct entry and introductions to leading casting directors"
    }
  ],
  processSteps: [
    {
      step: 1,
      title: "Paid Registration",
      description: "Register online and secure your slot for ₹999."
    },
    {
      step: 2,
      title: "Online Audition (Zoom)",
      description: "Participate in virtual rounds evaluated by our panel."
    },
    {
      step: 3,
      title: "Photoshoot",
      description: "Professional portfolio and profile building shoots."
    },
    {
      step: 4,
      title: "Interview",
      description: "Personal and communication assessment round."
    },
    {
      step: 5,
      title: "Grand Finale",
      description: "Walk the ramp at the grand national finale on 27th September."
    }
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Placeholder Testimonial 1 - To be replaced with real, named, dated proof.",
      author: "Testimonial Author 1",
      role: "Previous Winner / Finalist",
      date: "2025"
    },
    {
      id: "t2",
      quote: "Placeholder Testimonial 2 - To be replaced with real, named, dated proof.",
      author: "Testimonial Author 2",
      role: "Previous Contestant",
      date: "2025"
    }
  ],
  pastEvents: [
    {
      id: "pe1",
      title: "DPM Pageant Season 1",
      year: 2024,
      description: "Placeholder event detail - To be replaced with real, named, dated proof."
    },
    {
      id: "pe2",
      title: "DPM Pageant Season 2",
      year: 2025,
      description: "Placeholder event detail - To be replaced with real, named, dated proof."
    }
  ],
  galleryImages: [
    { src: "/new-images/gallery-1.jpg", category: "ramp" },
    { src: "/new-images/gallery-2.jpg", category: "glamour" },
    { src: "/new-images/gallery-3.jpg", category: "ramp" },
    { src: "/new-images/gallery-4.jpg", category: "glamour" },
    { src: "/new-images/gallery-5.jpg", category: "ramp" },
    { src: "/new-images/gallery-6.jpg", category: "glamour" },
    { src: "/new-images/gallery-7.jpg", category: "ramp" },
    { src: "/new-images/gallery-8.jpg", category: "glamour" }
  ],
  founderCelebsImages: [
    "/new-images/founder-celebs-1.jpg",
    "/new-images/founder-celebs-2.webp",
    "/new-images/founder-celebs-3.webp",
    "/new-images/founder-celebs-4.webp",
    "/new-images/founder-celebs-5.webp",
    "/new-images/founder-celebs-6.webp",
    "/new-images/founder-celebs-7.webp"
  ],
  config: {
    maxSlotsPerState: 150,
    slotsRemaining: 27,
    grandFinaleDeadline: "2026-09-27",
    countdownTarget: "2026-09-27T23:59:59",
    careersLaunched: "500+",
    prizesPool: "₹11L+",
    categoriesCount: "4",
    groomingSupport: "100%",
    showLiveActivityTicker: true,
    showLeadPopup: true,
    showRecentApplicationsToast: true,
    razorpayMode: "production"
  }
};
