import { Workshop } from '../models/Workshop';
import { Competition } from '../models/Competition';
import { Accommodation } from '../models/Accommodation';

const defaultWorkshops = [
  {
    title: "Ophthalmology Workshop",
    description: "Comprehensive training in eye examination, fundoscopy, and basic surgical techniques.",
    speaker: "Dr. Prasad & Team",
    venue: "Govt. Regional Eye Hospital, RAMA TALKIES",
    date: "July 10, 2026",
    time: "9:00 AM - 1:00 PM",
    price: 599,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg",
    topics: [
      "Know your glasses",
      "Anterior segment examination",
      "Cataract surgery on goat eye",
      "Posterior segment examination",
      "Glaucoma evaluation (Non Contact Tonometer)",
      "Computer Vision Syndrome / Dry eye evaluation",
      "Colour vision",
      "Diabetic retinopathy evaluation"
    ],
    contacts: [
      {"name": "Surya", "phone": "8639630928"},
      {"name": "Rahul", "phone": "9398362706"}
    ],
    slots: ["9:00 AM - 1:00 PM | July 10, 2026 | https://rzp.io/rzp/LTz3fhU"]
  },
  {
    title: "Orthopaedics Workshop",
    description: "Learn essential splinting, bandaging, casting techniques, and fracture management.",
    speaker: "Dr. Kumar & Team",
    venue: "AMCOSA",
    date: "July 12, 2026",
    time: "AM & PM Sessions",
    price: 499,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/8376160/pexels-photo-8376160.jpeg",
    topics: [
      "Bandage Techniques",
      "Plaster of Paris Techniques"
    ],
    contacts: [
      {"name": "Prashanth", "phone": "7989543522"},
      {"name": "Thushar Manikanta", "phone": "6309561947"}
    ],
    slots: [
      "9:00 AM - 1:00 PM | July 12, 2026 | https://rzp.io/rzp/R7GlpMlh",
      "2:00 PM - 6:00 PM | July 12, 2026 | https://rzp.io/rzp/soI2zROp"
    ]
  },
  {
    title: "Anaesthesia Workshop",
    description: "Comprehensive training in anaesthesia administration, intubation, and basic life support.",
    speaker: "Dr. Rao & Team",
    venue: "NELS Skill Lab, AMC",
    date: "July 13-14, 2026",
    time: "AM & PM Sessions",
    price: 449,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Clinical",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg",
    topics: [
      "Basic Life Support",
      "Types of Anaesthesia",
      "Oxygen Therapy",
      "Airway Management",
      "Trauma Care",
      "IV Cannulation"
    ],
    contacts: [
      {"name": "Mahin", "phone": "6303772349"}
    ],
    slots: [
      "9:00 AM - 1:00 PM | July 13, 2026 | https://rzp.io/rzp/e8l5u6e0",
      "2:00 PM - 6:00 PM | July 13, 2026 | https://rzp.io/rzp/SwOrByk8",
      "9:00 AM - 1:00 PM | July 14, 2026 | https://rzp.io/rzp/kAgAw9Ie",
      "2:00 PM - 6:00 PM | July 14, 2026 | https://rzp.io/rzp/wBshqqmL"
    ]
  },
  {
    title: "Surgery Workshop",
    description: "Hands-on training in basic surgical knotting, suturing techniques, and wound management.",
    speaker: "Dr. Satish & Team",
    venue: "AMCOSA",
    date: "July 10-13, 2026",
    time: "AM & PM Sessions",
    price: 499,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Clinical",
    image: "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg",
    topics: [
      "Suturing Techniques",
      "Incision & Drainage",
      "Wound Management & First Aid"
    ],
    contacts: [
      {"name": "Sreenu", "phone": "7995538332"},
      {"name": "Sai Ganesh", "phone": "9390438455"}
    ],
    slots: [
      "9:00 AM - 1:00 PM | July 10, 2026 | https://rzp.io/rzp/KTy9kPfm",
      "2:00 PM - 6:00 PM | July 10, 2026 | https://rzp.io/rzp/4dqnAS6",
      "9:00 AM - 1:00 PM | July 11, 2026 | https://rzp.io/rzp/cT7bQQi",
      "2:00 PM - 6:00 PM | July 11, 2026 | https://rzp.io/rzp/3iEtSBG",
      "9:00 AM - 1:00 PM | July 13, 2026 | https://rzp.io/rzp/xaH8TQhR",
      "2:00 PM - 6:00 PM | July 13, 2026 | https://rzp.io/rzp/2NukZMy"
    ]
  },
  {
    title: "ObGyn Workshop - 1",
    description: "Essential obstetric and gynecological procedures training, including deliveries.",
    speaker: "Dr. Lakshmi & Team",
    venue: "AMCOSA",
    date: "July 11-12, 2026",
    time: "2:00 PM - 6:00 PM",
    price: 299,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg",
    topics: [
      "Instrumental Delivery",
      "Intrauterine Device Insertion",
      "Shoulder Dystocia",
      "Pap Smear",
      "Episiotomy"
    ],
    contacts: [
      {"name": "Abhishek", "phone": "9390774710"},
      {"name": "Siva Sankar", "phone": "7032797278"}
    ],
    slots: [
      "2:00 PM - 6:00 PM | July 11, 2026 | https://rzp.io/rzp/fSIWRms",
      "2:00 PM - 6:00 PM | July 12, 2026 | https://rzp.io/rzp/b6rygR2"
    ]
  },
  {
    title: "ObGyn Workshop - 2",
    description: "Advanced obstetric and gynecological procedures training and emergency management.",
    speaker: "Dr. Lakshmi & Team",
    venue: "AMCOSA",
    date: "July 13-14, 2026",
    time: "2:00 PM - 6:00 PM",
    price: 299,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg",
    topics: [
      "Postpartum Hemorrhage Drill",
      "Eclampsia Drill",
      "Pelvic Assessment",
      "Cardiotocography",
      "Partogram"
    ],
    contacts: [
      {"name": "Abhishek", "phone": "9390774710"},
      {"name": "Siva Sankar", "phone": "7032797278"}
    ],
    slots: [
      "2:00 PM - 6:00 PM | July 13, 2026 | https://rzp.io/rzp/Fo026as",
      "2:00 PM - 6:00 PM | July 14, 2026 | https://rzp.io/rzp/pYaUKds"
    ]
  },
  {
    title: "ENT Workshop",
    description: "Comprehensive training in otorhinolaryngology diagnostics and clinical procedures.",
    speaker: "Dr. Sekhar & Team",
    venue: "Govt. ENT Hospital, Pedda Waltair",
    date: "July 12, 2026",
    time: "9:00 AM - 1:00 PM",
    price: 349,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg",
    topics: [
      "Audiometry - Hearing Assessment",
      "Anterior Nasal Packing for Epistaxis",
      "Diagnosis with Nasal Endoscopy",
      "Tracheostomy on Goat Trachea"
    ],
    contacts: [
      {"name": "Vamshi", "phone": "9381581180"},
      {"name": "Satya Vardhan", "phone": "9573173899"}
    ],
    slots: ["9:00 AM - 1:00 PM | July 12, 2026 | https://rzp.io/rzp/D0mEaAjz"]
  },
  {
    title: "Pediatrics Workshop",
    description: "Essential pediatric resuscitation, clinical care, and developmental assessment training.",
    speaker: "Dr. Devi & Team",
    venue: "Dept. of Pediatrics, AMC",
    date: "July 11, 2026",
    time: "AM & PM Sessions",
    price: 499,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
    topics: [
      "Neonatal Resuscitation",
      "Nutritional Assessment",
      "Immunisation Schedule",
      "Feeding Tube Insertion",
      "IV Cannulation",
      "Foley's Catheterisation",
      "Lumbar Puncture",
      "ET Tube Insertion"
    ],
    contacts: [
      {"name": "Midhilesh", "phone": "8712299819"},
      {"name": "Sri Ganesh", "phone": "7013245938"}
    ],
    slots: [
      "9:00 AM - 1:00 PM | July 11, 2026 | https://pages.razorpay.com/pl_QTbuJkZBsIO7uc/view",
      "2:00 PM - 6:00 PM | July 11, 2026 | https://pages.razorpay.com/pl_QTbwUgtbUZLXCH/view"
    ]
  },
  {
    title: "Community Medicine Workshop",
    description: "Training in community health assessment, epidemiology, and preventive medicine.",
    speaker: "Dr. Harika & Team",
    venue: "AMCOSA",
    date: "July 11-12, 2026",
    time: "9:00 AM - 1:00 PM",
    price: 349,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    topics: [
      "Community health assessment",
      "Epidemiology",
      "Preventive medicine"
    ],
    contacts: [],
    slots: [
      "9:00 AM - 1:00 PM | July 11, 2026 | https://rzp.io/rzp/bQzDEzrD",
      "9:00 AM - 1:00 PM | July 12, 2026 | https://rzp.io/rzp/l9lFWDo"
    ]
  },
  {
    title: "Forensic Medicine Workshop",
    description: "Hands-on forensic medicine, clinical toxicology, and basic autopsy observation.",
    speaker: "Dr. Raju & Team",
    venue: "Mortuary, Dept. of FMT, AMC KGH",
    date: "July 10-13, 2026",
    time: "2:00 PM - 6:00 PM",
    price: 649,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Specialties",
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
    topics: [
      "Live Autopsy",
      "Foetal Autopsy",
      "5 Persons per Demonstration",
      "Organ Dissection"
    ],
    contacts: [
      {"name": "Durga Prasad", "phone": "9966639392"},
      {"name": "Vivek", "phone": "9492702886"}
    ],
    slots: [
      "2:00 PM - 6:00 PM | July 10, 2026 | https://rzp.io/rzp/X9j99EsV",
      "2:00 PM - 6:00 PM | July 11, 2026 | https://rzp.io/rzp/FvbCf0gd",
      "2:00 PM - 6:00 PM | July 12, 2026 | https://rzp.io/rzp/k24gwOO0",
      "2:00 PM - 6:00 PM | July 13, 2026 | https://rzp.io/rzp/rYPb6G0"
    ]
  },
  {
    title: "Medicine Workshop",
    description: "Comprehensive general medical skills, ECG analysis, and patient assessment training.",
    speaker: "Dr. Murthy & Team",
    venue: "AMCOSA",
    date: "July 10, 2026",
    time: "AM & PM Sessions",
    price: 399,
    slotsTotal: 100,
    slotsFilled: 0,
    category: "Clinical",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    topics: [
      "ABG",
      "Symptoms to Diagnosis",
      "ECG",
      "Skill Training",
      "Blood Pressure Measurement",
      "Capillary Glucose Testing",
      "Urine Ketone Testing",
      "ECG Recording",
      "IM, SC, IV Injection Techniques"
    ],
    contacts: [
      {"name": "Vinil", "phone": "6304568005"},
      {"name": "Naveen M", "phone": "8688705517"}
    ],
    slots: [
      "9:00 AM - 1:00 PM | July 10, 2026 | https://rzp.io/rzp/m6RavCJ",
      "2:00 PM - 6:00 PM | July 10, 2026 | https://rzp.io/rzp/dDHgBZRX"
    ]
  }
];

const defaultCompetitions = [
  {
    title: "Build the Diagnosis",
    description: "A case-based diagnostic puzzle combining patient history, clinical signs, lab results, and logical reasoning.",
    category: "Scientific",
    rules: [
      "All UG students can participate (including interns)",
      "A team must consist of exactly four members",
      "Case-based diagnostic rounds and rapid-fire challenges",
      "Tests quick clinical decision-making, history matching, and diagnostic reasoning"
    ],
    prizePool: "TBA",
    price: 100,
    image: "/competitions/Diagnosis.png",
    teamSize: {"min": 4, "max": 4},
    guidelines: [],
    topics: [],
    judgingCriteria: [],
    contacts: [
      {"name": "Harikrishna", "phone": "+91 91825 45949"}
    ]
  },
  {
    title: "Medical Debate",
    description: "Engage in thought-provoking formal discussions and rebuttals on critical bioethical and medical topics.",
    category: "Creative",
    rules: [
      "Three-round structured debate formats",
      "Opening statements: 3 minutes per team",
      "Cross-questioning and direct rebuttals: 4 minutes",
      "Closing remarks and audience interaction summary",
      "Respectful dialogue; personal attacks result in direct disqualification"
    ],
    prizePool: "TBA",
    price: 100,
    image: "/competitions/Medical_debate.png",
    teamSize: {"min": 1, "max": 2},
    guidelines: [
      "Judged on argumentation relevance, citation of studies, delivery, and structure"
    ],
    topics: ["Euthanasia: Compassionate Choice or Moral Misstep"],
    judgingCriteria: [],
    contacts: [
      {"name": "Jaideep", "phone": "+91 90102 38700"}
    ]
  },
  {
    title: "Essay Writing",
    description: "Express your insights on contemporary medical challenges through academically rigorous and compelling essays.",
    category: "Scientific",
    rules: [
      "Essay must be written between 1000 - 1500 words",
      "Formatting should align with standardized MLA guidelines for citations",
      "Plagiarism of any form leads to instant disqualification"
    ],
    prizePool: "TBA",
    price: 100,
    image: "/competitions/essaywriting.png",
    teamSize: {"min": 1, "max": 1},
    guidelines: [],
    topics: ["De-Stigmatising the Demon: Reframing HIV Beyond Fear and Prejudice"],
    judgingCriteria: [],
    contacts: [
      {"name": "Renuka Priya", "phone": "+91 95738 70164"}
    ]
  },
  {
    title: "Medical Reels",
    description: "Create engaging, informative, and visually stunning short-form social video content explaining medical phenomena.",
    category: "Creative",
    rules: [
      "Pure vector animations are not accepted; must involve live presentation/acting",
      "Abusive language, copyrighted music, and censored material strictly prohibited",
      "Top 3 selected films will be screened live during Movie Night (14th July)",
      "All final reel file submissions must be completed by 11th July"
    ],
    prizePool: "TBA",
    price: 100,
    image: "/competitions/Medical_Reels.png",
    teamSize: {"min": 1, "max": 3},
    guidelines: [
      "Judged on conceptual accuracy, acting/expression, sound clarity, and cinematography"
    ],
    contacts: [
      {"name": "Atchuth Ram", "phone": "+91 85238 63076"}
    ],
    topics: [],
    judgingCriteria: []
  },
  {
    title: "Integrated Seminar",
    description: "Present clinical cases and explain complex medical topics from pathophysiological mechanism to clinical management.",
    category: "Scientific",
    rules: [
      "Presentations must follow the recommended structured formatting",
      "A maximum of 10 slides is permitted (excluding title and reference slide)",
      "Utilisation of visual models, flowcharts, and diagrams is highly encouraged",
      "Registration fee: ₹100"
    ],
    prizePool: "Trophy & Cash Awards",
    price: 100,
    image: "/competitions/Seminar.png",
    teamSize: {"min": 1, "max": 4},
    guidelines: [
      "Slide 1: Title and clinical vignette overview",
      "Slide 2-3: Pathophysiology (molecular/cellular models)",
      "Slide 4: Clinical Presentation (symptomatology, examination)",
      "Slide 5: Diagnostic investigations with clinical rationale",
      "Slide 6-7: Therapeutic management (evidence-based updates)",
      "Slide 8: Crucial clinical takeaways",
      "Slide 9: References"
    ],
    judgingCriteria: [
      "Scientific accuracy & literature citation depth - 10 marks",
      "Integration of pathophysiology with management outcomes - 10 marks",
      "Clarity, visual appeal, & slide layout - 10 marks",
      "Time adherence & public speaking delivery - 10 marks",
      "Handling Q&A jury questions - 10 marks"
    ],
    topics: [
      "Chronic Kidney Disease (CKD)",
      "Ischemic Stroke Pathophysiology",
      "Diabetes Mellitus & Microvascular Complications",
      "Hypo- and Hyperthyroidism Emergency Care",
      "Acute Kidney Injury (AKI) in Critically Ill Patients",
      "Gastrointestinal Bleed Management",
      "Rheumatoid Arthritis Immunotherapy",
      "Hypertensive Urgency and Emergency care",
      "ACS Timeline Guidelines",
      "SLE Pathophysiology"
    ],
    contacts: [
      {"name": "Shubham", "phone": "+91 88856 60398"}
    ]
  },
  {
    title: "Photography Competition",
    description: "Capture the essence of college life, medical heritage, and campus beauty through your photography lens.",
    category: "Creative",
    rules: [
      "Submissions must include a 2-line conceptual description",
      "All photographs must be captured on-campus during the fest week",
      "Images must remain unedited (no heavy manipulation/compositing)",
      "Final submissions must be uploaded by 11th July"
    ],
    prizePool: "TBA",
    price: 100,
    image: "/competitions/Photography.png",
    teamSize: {"min": 1, "max": 1},
    guidelines: [],
    topics: [],
    judgingCriteria: [],
    contacts: [
      {"name": "Farooq", "phone": "+91 93928 03340"}
    ]
  }
];

const defaultAccommodation = [
  {
    type: 'Girls Hostel (Triple Sharing)',
    description: 'Comfortable, secure, and affordable triple-sharing hostel rooms situated within convenient reach of major AMC function halls.',
    pricePerDay: 500,
    availableRooms: 50
  }
];

// Parse legacy slot string "label | url" into a slot object
const parseSlot = (slotStr: string, defaultTotal = 50) => {
  const lastPipe = slotStr.lastIndexOf(' | ');
  if (lastPipe !== -1) {
    return {
      label: slotStr.substring(0, lastPipe).trim(),
      url:   slotStr.substring(lastPipe + 3).trim(),
      slotsTotal: defaultTotal,
      slotsFilled: 0
    };
  }
  return { label: slotStr.trim(), url: '', slotsTotal: defaultTotal, slotsFilled: 0 };
};

export const seedDatabase = async () => {
  try {
    console.log('Running safe database seed (upsert mode)...');

    // Upsert Workshops — update fields but NEVER delete existing documents.
    // Per-slot slotsFilled counts are preserved when merging.
    for (const w of defaultWorkshops) {
      const idSlug = w.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { slotsFilled, slots: rawSlots, ...coreFields } = w;
      const newSlotObjects = (rawSlots || []).map(s => parseSlot(s));

      const existing = await Workshop.findOne({ id: idSlug });
      if (existing) {
        // Merge: update labels/urls/totals but keep live slotsFilled per slot
        const mergedSlots = newSlotObjects.map((ns, i) => {
          const old = (existing.slots as any[])[i];
          return { label: ns.label, url: ns.url, slotsTotal: ns.slotsTotal, slotsFilled: old ? old.slotsFilled : 0 };
        });
        await Workshop.findOneAndUpdate(
          { id: idSlug },
          { $set: { ...coreFields, id: idSlug, slots: mergedSlots } },
          { new: true }
        );
      } else {
        await Workshop.create({ ...coreFields, id: idSlug, slotsFilled: slotsFilled ?? 0, slots: newSlotObjects });
      }
      console.log(`Upserted Workshop: ${w.title}`);
    }

    // Upsert Competitions — safe upsert, no slot tracking needed
    for (const c of defaultCompetitions) {
      const idSlug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await Competition.findOneAndUpdate(
        { id: idSlug },
        { $set: { ...c, id: idSlug } },
        { upsert: true, new: true }
      );
      console.log(`Upserted Competition: ${c.title}`);
    }

    // Upsert Accommodations — only insert if not already present
    for (const a of defaultAccommodation) {
      const exists = await Accommodation.findOne({ type: a.type });
      if (!exists) {
        await Accommodation.create(a);
        console.log(`Seeded Accommodation: ${a.type}`);
      }
    }

    console.log('Database seed completed safely — no existing data was deleted.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
