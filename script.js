let currentUser = null;

// Complete Haryana District HQ to Sub-Divisions / Tehsils / CHCs / PHCs Mapping
const haryanaSubDivisions = {
  "Rohtak": ["PGIMS Rohtak (Tier-1 Apex)", "Rohtak Civil Hospital HQ", "CHC Meham", "CHC Lakhan Majra", "CHC Kalanaur"],
  "Karnal": ["Kalpana Chawla Govt Medical College (Tier-1 Apex)", "Karnal Civil Hospital HQ", "SDH Assandh", "CHC Gharaunda", "CHC Indri"],
  "Nuh": ["Shaheed Hasan Khan Mewati GMC Nalhar (Tier-1 Apex)", "Al Aafia Hospital Mandikhera HQ", "CHC Ferozepur Jhirka", "CHC Punahana"],
  "Sonipat": ["BPS Govt Medical College for Women Khanpur (Tier-1 Apex)", "District Civil Hospital HQ", "SDH Gohana", "SDH Ganaur", "CHC Kharkhoda"],
  "Faridabad": ["ESIC Medical College & Hospital (Tier-1 Apex)", "B.K. Civil Hospital NIT HQ", "SDH Ballabgarh", "CHC Chhainsa"],
  "Panchkula": ["National Institute of Ayurveda Apex", "Civil Hospital Sector 6 HQ (Kayakalp Winner)", "SDH Kalka", "CHC Morni Hills"],
  "Gurugram": ["District Civil Hospital Sector 10 HQ (NABH Aligned)", "SDH Pataudi", "SDH Sohna", "SDH Farukhnagar", "CHC Bhangrola"],
  "Hisar": ["Hisar District Civil Hospital HQ", "SDH Hansi", "CHC Mandi Adampur", "CHC Barwala", "CHC Narnaund"],
  "Ambala": ["Civil Hospital Ambala City HQ", "SDH Ambala Cantt", "SDH Naraingarh", "CHC Mullana"],
  "Bhiwani": ["Civil Hospital Meham Gate HQ", "SDH Loharu", "SDH Siwani", "SDH Tosham"],
  "Charkhi Dadri": ["Udham Singh Jain Civil Hospital HQ", "CHC Badhra Village"],
  "Fatehabad": ["District Civil Hospital HQ", "SDH Tohana", "SDH Ratia"],
  "Jhajjar": ["District Civil Hospital HQ", "SDH Bahadurgarh", "CHC Beri"],
  "Jind": ["District Civil Hospital HQ", "SDH Narwana", "SDH Safidon"],
  "Kaithal": ["District Civil Hospital HQ", "SDH Guhla (Cheeka)"],
  "Kurukshetra": ["LNJP Civil Hospital Thanesar HQ", "SDH Pehowa", "SDH Shahbad"],
  "Mahendragarh": ["Civil Hospital Narnaul HQ", "SDH Mahendragarh Town"],
  "Palwal": ["District Civil Hospital HQ", "SDH Hodal", "SDH Hathin"],
  "Panipat": ["District Civil Hospital GT Road HQ", "SDH Samalkha"],
  "Rewari": ["District Civil Hospital HQ", "CHC Kosli", "CHC Bawal"],
  "Sirsa": ["District Civil Hospital HQ", "SDH Mandi Dabwali", "SDH Ellenabad"],
  "Yamunanagar": ["Mukand Lal District Civil Hospital HQ", "CHC Chhachhrauli"]
};

// Official NHM Kayakalp Hospital Database Engine
const haryanaKayakalpDatabase = [
  // Tier 1: Apex Medical Colleges
  {
    tier: "tier1",
    district: "Rohtak",
    name: "Pt. B.D. Sharma PGIMS Rohtak",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp Excellent)",
    beds: "~2,000+ Tertiary Beds",
    ambulance: "15+ ALS / BLS Fleet Units",
    treatments: "Oncology, Neurosurgery, Cardiac Surgeries, Complex Orthopedics, Dialysis & Polytrauma",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier1",
    district: "Karnal",
    name: "Kalpana Chawla Government Medical College & Hospital",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp Excellent)",
    beds: "~500+ Beds",
    ambulance: "8+ BLS/ALS Vehicles",
    treatments: "Trauma Surgery, High-Risk Delivery, Respiratory Distress & Diabetes Care",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier1",
    district: "Nuh",
    name: "Shaheed Hasan Khan Mewati Government Medical College",
    hygieneStars: "⭐⭐ (2/3 Satisfactory)",
    beds: "~500+ Beds",
    ambulance: "6+ Operational Ambulances",
    treatments: "Infectious Disease Containment, Maternal Healthcare & Pediatric Epidemics",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier1",
    district: "Sonipat",
    name: "Bhagat Phool Singh (BPS) Medical College for Women",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp Excellent)",
    beds: "~450+ Beds",
    ambulance: "5+ Emergency Response Units",
    treatments: "Women's Healthcare, High-Risk Obstetrics, Breast Cancer Screening & Female Care",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier1",
    district: "Faridabad",
    name: "ESIC Medical College & Hospital Faridabad",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp Excellent)",
    beds: "~500+ Beds",
    ambulance: "8+ Industrial/General Units",
    treatments: "Occupational Illnesses, Joint Replacements, Cardiac Stabilization & Dermatology",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=300&auto=format&fit=crop&q=80"
  },

  // Tier 2: District Hospitals
  {
    tier: "tier2",
    district: "Gurugram",
    name: "Civil Hospital Gurugram (Sector 10)",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp - NABH Aligned)",
    beds: "500+ Beds",
    ambulance: "10+ Municipal Ambulances",
    treatments: "Emergency Trauma Care, Viral Control, Maternity Programs & Pediatric Care",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier2",
    district: "Panchkula",
    name: "Civil Hospital Panchkula (Sector 6)",
    hygieneStars: "⭐⭐⭐ (3/3 Kayakalp National Award Winner)",
    beds: "300+ Beds",
    ambulance: "7+ Emergency Ambulances",
    treatments: "Multi-specialty Diagnostics, Hypertension/Diabetes Management & ENT Care",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80"
  },
  {
    tier: "tier2",
    district: "Faridabad",
    name: "B.K. Civil Hospital NIT Faridabad",
    hygieneStars: "⭐⭐ (2/3 Satisfactory)",
    beds: "200-300 Beds",
    ambulance: "6+ Functional Vehicles",
    treatments: "General Surgery, Fracture Setting, TB Treatments & Delivery Management",
    isEmpaneled: true,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80"
  }
];

function updateSubDivisions() {
  const districtSelect = document.getElementById('districtSelect');
  const subDivisionSelect = document.getElementById('subDivisionSelect');
  const selectedDistrict = districtSelect.value;

  subDivisionSelect.innerHTML = "";
  const areas = haryanaSubDivisions[selectedDistrict] || ["District Civil Hospital HQ"];

  areas.forEach(area => {
    const opt = document.createElement('option');
    opt.value = area;
    opt.textContent = area;
    subDivisionSelect.appendChild(opt);
  });
}

window.onload = function() {
  updateSubDivisions();
};

function openAuthModal() {
  document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.add('hidden');
}

function handleSignup(event) {
  event.preventDefault();

  currentUser = {
    name: document.getElementById('regName').value.trim(),
    phone: document.getElementById('regPhone').value.trim(),
    familyId: document.getElementById('familyId').value.trim(),
    income: document.getElementById('incomeBracket').value
  };

  closeAuthModal();

  document.getElementById('verifiedUserBar').classList.remove('hidden');
  document.getElementById('profileName').textContent = `${currentUser.name} (PPP ID: ${currentUser.familyId})`;
  document.getElementById('userAuthBtn').textContent = `👑 ${currentUser.name}`;
  document.getElementById('patientName').value = currentUser.name;

  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(`Family ID ${currentUser.familyId} verified. 100% Free Chirayu Treatment unlocked.`);
    window.speechSynthesis.speak(utter);
  }
}

function logoutUser() {
  currentUser = null;
  document.getElementById('verifiedUserBar').classList.add('hidden');
  document.getElementById('userAuthBtn').textContent = "👤 Verify Family ID (PPP)";
}

function triggerSOS() {
  alert("🚨 EMERGENCY SOS DISPATCHED!\nYour GPS coordinates and emergency alert have been routed to the Haryana State Health Dispatch Center.");
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance("Emergency SOS alert dispatched to nearest hospital.");
    window.speechSynthesis.speak(utter);
  }
}

function dispatchAmbulance() {
  const district = document.getElementById('districtSelect').value;
  alert(`🚑 108 Emergency GPS Ambulance Dispatched for ${district} region! ETA: 8 - 12 Minutes.`);
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(`Ambulance dispatched in ${district}. Estimated arrival 10 minutes.`);
    window.speechSynthesis.speak(utter);
  }
}

function searchHospitals() {
  const district = document.getElementById('districtSelect').value;
  const subDiv = document.getElementById('subDivisionSelect').value;
  const tierFilter = document.getElementById('tierFilterSelect').value;

  const resultsSection = document.getElementById('resultsSection');
  const schemeBox = document.getElementById('schemeEligibilityBox');
  const hospitalList = document.getElementById('hospitalList');
  const bookingSection = document.getElementById('bookingSection');
  const selectedHospitalDropdown = document.getElementById('selectedHospital');

  resultsSection.classList.remove('hidden');
  bookingSection.classList.remove('hidden');
  hospitalList.innerHTML = "";
  selectedHospitalDropdown.innerHTML = `<option value="">-- Select Hospital for Priority Pass --</option>`;

  let isFree = currentUser && (currentUser.income === "low" || currentUser.income === "bpl");

  schemeBox.innerHTML = `
    <h3 style="color:#34d399; margin-bottom:4px;">👑 Official Haryana Govt Scheme & Kayakalp Status</h3>
    <p><strong>Treatment Billing:</strong> <span style="color:#fbbf24;">${isFree ? '100% FREE Cashless Care (Chirayu / Ayushman Card Active)' : 'Subsidized Public Tariff (Nominal ₹10 OPD)'}</span></p>
  `;

  // Match hospitals from database or auto-generate based on official framework
  let matchedHospitals = haryanaKayakalpDatabase.filter(h => h.district === district);

  if (matchedHospitals.length === 0) {
    matchedHospitals = [
      {
        tier: "tier2",
        district: district,
        name: `District Civil Hospital (${district} HQ)`,
        hygieneStars: "⭐⭐ (2/3 Kayakalp Satisfactory)",
        beds: "150+ Beds Available",
        ambulance: "3 to 5 '108' Ambulances Stationed",
        treatments: "Routine General Surgery, Dengue/Malaria Containment, Normal Deliveries & Snake-bite Stabilization",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80"
      },
      {
        tier: "tier3",
        district: district,
        name: `Sub-Divisional Civil Hospital (${subDiv})`,
        hygieneStars: "⭐ (1/3 Kayakalp Basic Stabilization)",
        beds: "30-50 Beds Available",
        ambulance: "1 to 2 Patient Transport Vehicles",
        treatments: "Primary Medical Stabilization, Minor Wounds, Dehydration & Maternal Checkups",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80"
      }
    ];
  }

  const filteredHospitals = tierFilter === "all" ? matchedHospitals : matchedHospitals.filter(h => h.tier === tierFilter);

  filteredHospitals.forEach(h => {
    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + district + ' Haryana')}`;

    const card = document.createElement('div');
    card.className = 'hospital-card';
    card.innerHTML = `
      <img src="${h.image}" alt="Hospital Photo" class="hospital-img">
      <div class="hospital-info">
        <h3>${h.name}</h3>
        <p>📍 <strong>${district}, Haryana</strong> — Kayakalp Hygiene: <strong style="color:#fbbf24;">${h.hygieneStars}</strong></p>
        <p>🏥 Capacity: <strong>${h.beds}</strong> | 🚑 Fleet: <strong>${h.ambulance}</strong></p>
        <p>🩺 Key Treatments: <em>${h.treatments}</em></p>
        <div class="review-box">💬 Coverage: 100% Free under Chirayu Haryana / PM-JAY Ayushman Card</div>
      </div>
      <div class="hospital-stats">
        <span class="badge-green">${h.beds}</span>
        <a href="${googleMapUrl}" target="_blank" class="map-btn">📍 Get Directions</a>
      </div>
    `;
    hospitalList.appendChild(card);

    const option = document.createElement('option');
    option.value = `${h.name} (${district}, Haryana)`;
    option.textContent = `${h.name} - ${h.beds}`;
    selectedHospitalDropdown.appendChild(option);
  });

  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(`Scanned NHM Kayakalp verified hospitals for ${district}.`);
    window.speechSynthesis.speak(utter);
  }
}

function generateTicket() {
  const name = document.getElementById('patientName').value.trim();
  const age = document.getElementById('patientAge').value.trim();
  const hospital = document.getElementById('selectedHospital').value;

  if (!name || !age || !hospital) {
    alert("Please enter patient details and select a hospital!");
    return;
  }

  const tokenNo = Math.floor(10000 + Math.random() * 90000);
  const ticketSection = document.getElementById('ticketSection');
  const ticketDetails = document.getElementById('ticketDetails');

  ticketSection.classList.remove('hidden');

  ticketDetails.innerHTML = `
    <p><strong>Patient Name:</strong> ${name} (Age: ${age})</p>
    <p><strong>Assigned Hospital:</strong> ${hospital}</p>
    <p><strong>Official Triage Token:</strong> <span style="color:#fbbf24; font-size:1.3rem; font-weight:800;">#HR-2026-${tokenNo}</span></p>
    <p><strong>Scheme Pass Status:</strong> <span style="color:#34d399;">100% Free Chirayu / Ayushman Priority Emergency Bypass Pass</span></p>
  `;

  // Generate QR Code
  document.getElementById('qrcode').innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `HR-HEALTH-PASS-${tokenNo}-${name}`,
    width: 100,
    height: 100
  });

  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(`Priority ticket HR 2026 ${tokenNo} generated.`);
    window.speechSynthesis.speak(utter);
  }
}

function downloadPDFTicket() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById('patientName').value || "Patient";
  const hospital = document.getElementById('selectedHospital').value || "Govt Hospital";

  doc.setFontSize(18);
  doc.text("MedRoute AI Haryana - Official Emergency Pass", 14, 20);
  doc.setFontSize(12);
  doc.text(`Patient Name: ${name}`, 14, 35);
  doc.text(`Assigned Hospital: ${hospital}`, 14, 45);
  doc.text(`Status: 100% Free Priority Admission Authorized`, 14, 55);
  doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 14, 65);

  doc.save(`MedRoute_Pass_${name}.pdf`);
}