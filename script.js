/**
 * BEAST FITNESS FACTOR - INTERACTIVE SCRIPT
 * Author: Antigravity AI
 * Features: Sticky nav, mobile drawer, scroll spy, pricing switcher,
 *           programs modal, gallery filters, lightbox viewer, BMI calculator,
 *           form validation, and WhatsApp enquiry integration.
 */

// ==================== CONFIGURATION ====================
// Replace this with your gym's official WhatsApp number (in international format without + or spaces)
const GYM_WHATSAPP_NUMBER = "919150042088"; 

// ==================== BULLETPROOF DOM READY ====================
function initAll() {
  try {
    initNavigation();
    initBillingToggle();
    initProgramModals();
    initGalleryLightbox();
    initBMICalculator();
    initEnquiryForm();
    initAutoYear();
    console.log("Beast Fitness Factor scripts successfully initialized.");
  } catch (err) {
    console.error("Initialization error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  // DOM is already ready
  initAll();
}

// ==================== 1. NAVIGATION & SCROLL ====================
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");

  if (!navbar || !hamburger || !navMenu) return;

  // Hamburger Toggle
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Scroll Listener for Sticky Nav, Scroll Spy & Back-To-Top
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Header shadow & blur on scroll
    if (scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 450) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    // Scroll Spy: highlight active nav link
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Smooth Scroll Back to Top
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

// ==================== 2. MEMBERSHIP BILLING TOGGLE ====================
function initBillingToggle() {
  const switchBtn = document.getElementById("billing-switch");
  const labels = document.querySelectorAll(".billing-label");
  const priceAmounts = document.querySelectorAll(".plan-price .amount");
  const pricePeriods = document.querySelectorAll(".plan-price .period");

  if (!switchBtn) return;

  const durations = ["monthly", "quarterly", "annual"];
  let currentIndex = 0;

  function updatePrices(period) {
    labels.forEach(lbl => {
      lbl.classList.toggle("active", lbl.dataset.period === period);
    });

    switchBtn.className = "toggle-switch " + (period === "monthly" ? "" : period);

    priceAmounts.forEach(amt => {
      const val = amt.getAttribute(`data-${period}`);
      if (val) amt.textContent = val;
    });

    pricePeriods.forEach(prd => {
      const val = prd.getAttribute(`data-${period}`);
      if (val) prd.textContent = val;
    });
  }

  // Clicking the toggle slider advances through durations
  switchBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % durations.length;
    updatePrices(durations[currentIndex]);
  });

  // Clicking label directly switches to it
  labels.forEach((lbl, idx) => {
    lbl.addEventListener("click", () => {
      currentIndex = idx;
      updatePrices(lbl.dataset.period);
    });
  });

  // Plan Selection from Membership cards: Scroll to enquiry and pre-select plan
  const planButtons = document.querySelectorAll(".btn-select-plan");
  const planSelect = document.getElementById("form-plan");
  const nameInput = document.getElementById("form-name");

  planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedPlan = btn.getAttribute("data-plan");
      if (planSelect && selectedPlan) {
        planSelect.value = selectedPlan;
      }
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 500);
    });
  });

  // Trainer Selection: Scroll to enquiry and pre-select coach
  const coachButtons = document.querySelectorAll(".btn-select-coach");
  const coachSelect = document.getElementById("form-coach");

  coachButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const coach = btn.getAttribute("data-coach");
      if (coachSelect) {
        if (coach === "Gowtham") {
          coachSelect.value = "Head Coach Gowtham";
        } else if (coach === "Srinath") {
          coachSelect.value = "Coach Srinath";
        }
      }
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 500);
    });
  });
}

// ==================== 3. PROGRAM DETAILS MODAL ====================
function initProgramModals() {
  const modal = document.getElementById("program-modal");
  if (!modal) return;

  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = modal.querySelector(".modal-backdrop");
  const enquireBtn = document.getElementById("modal-enquire-btn");

  const titleEl = document.getElementById("modal-program-title");
  const descEl = document.getElementById("modal-program-desc");
  const tagEl = document.getElementById("modal-program-tag");
  const freqEl = document.getElementById("modal-program-frequency");
  const levelEl = document.getElementById("modal-program-level");
  const outcomeEl = document.getElementById("modal-program-outcome");
  const bulletsEl = document.getElementById("modal-program-bullets");

  // Program Information Database
  const programDetails = {
    strength: {
      tag: "POWER & IRON DISCIPLINE",
      title: "Strength Training & Powerlifting",
      desc: "Our Strength Training program is engineered around heavy compound barbell lifts: Squat, Bench Press, Deadlift, and Overhead Press. Designed to maximize neuromuscular recruitment, raw torque, and joint integrity under heavy loads.",
      freq: "3 - 4 Sessions / week",
      level: "Intermediate to Advanced",
      outcome: "Maximum raw strength, power output & bone density",
      bullets: [
        "Periodized linear and undulating progressive overload schemes",
        "Bar velocity and mechanical barbell trajectory analysis",
        "Access to calibrated competition bars, bumper plates & power cages",
        "Direct technique audits by Head Coach Gowtham"
      ],
      goalValue: "Strength Training"
    },
    muscle: {
      tag: "MAXIMUM HYPERTROPHY",
      title: "Muscle Building & Hypertrophy",
      desc: "An evidence-based bodybuilding pathway designed to stimulate maximum muscle fiber recruitment and cross-sectional hypertrophy through mechanical tension, metabolic fatigue, and specialized muscle isolation.",
      freq: "4 - 5 Sessions / week",
      level: "All Fitness Levels",
      outcome: "Dense, balanced, symmetrical muscular development",
      bullets: [
        "Targeted push/pull/legs or upper/lower volume distribution",
        "Biomechanically optimized machine & dumbbell execution",
        "Intensity techniques: rest-pause, drop sets, and eccentric emphasis",
        "Guidance on high-protein nutrition & muscle recovery windows"
      ],
      goalValue: "Muscle Building"
    },
    weight: {
      tag: "METABOLIC RECOMPOSITION",
      title: "Weight Management & Fat Loss",
      desc: "Ditch crash diets and endless boring cardio. Our body recomposition program utilizes high-metabolic resistance training paired with interval conditioning to burn stubborn fat while preserving hard-earned lean muscle.",
      freq: "3 - 5 Sessions / week",
      level: "Beginner to Advanced",
      outcome: "Sustainable fat loss, lean tone & elevated metabolism",
      bullets: [
        "Metabolic resistance circuits and complex training protocols",
        "Body composition tracking and circumference assessments",
        "Practical calorie and macro targets without starving yourself",
        "Coaching on consistent habits and sleep hygiene"
      ],
      goalValue: "Weight Management"
    },
    pt: {
      tag: "ELITE 1-ON-1 COACHING",
      title: "Dedicated Personal Training",
      desc: "Direct private coaching with Head Coach Gowtham or Coach Srinath. Every set, rep, tempo, and rest period is actively coached to unlock your peak potential safely and rapidly.",
      freq: "Flexible (2 - 5 Sessions / week)",
      level: "Customized for YOU",
      outcome: "Accelerated transformation with total accountability",
      bullets: [
        "Complete musculoskeletal and mobility assessment",
        "Custom training curriculum tailored to your specific biomechanics",
        "Continuous technique correction and zero wasted gym time",
        "Direct WhatsApp line for nutritional and lifestyle check-ins"
      ],
      goalValue: "Personal Training"
    },
    cardio: {
      tag: "CARDIOVASCULAR POWER",
      title: "Cardio & Conditioning",
      desc: "Build a powerhouse engine with High-Intensity Interval Training (HIIT), sprint intervals, assault bikes, rowers, and aerobic endurance training designed to maximize VO2 max and stamina.",
      freq: "3 - 4 Sessions / week",
      level: "All Fitness Levels",
      outcome: "Explosive lung capacity, stamina & heart health",
      bullets: [
        "Assault bike and rowing ergometer sprint conditioning",
        "Heart rate zone tracking and aerobic base building",
        "Low-impact endurance options to safeguard joint longevity",
        "Rapid calorie burn and enhanced athletic recovery"
      ],
      goalValue: "Cardio & Endurance"
    },
    functional: {
      tag: "ATHLETIC AGILITY & MOBILITY",
      title: "Functional Fitness & Movement",
      desc: "Develop dynamic athletic capability with kettlebells, battle ropes, medicine balls, plyometrics, and multi-planar movement patterns. Build a body that performs just as well as it looks.",
      freq: "3 - 4 Sessions / week",
      level: "All Levels & Athletes",
      outcome: "Real-world athleticism, core stability & injury prevention",
      bullets: [
        "Rotational strength and core stabilization drills",
        "Thoracic spine and hip mobility protocols",
        "Dynamic kettlebell flows and explosive ground work",
        "Supervised by Coach Srinath"
      ],
      goalValue: "Functional Fitness"
    }
  };

  let activeProgramGoal = "";

  // Open Modal Buttons
  document.querySelectorAll(".btn-program-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const progKey = btn.getAttribute("data-program");
      const data = programDetails[progKey];
      if (!data) return;

      activeProgramGoal = data.goalValue;
      if (tagEl) tagEl.textContent = data.tag;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (freqEl) freqEl.textContent = data.freq;
      if (levelEl) levelEl.textContent = data.level;
      if (outcomeEl) outcomeEl.textContent = data.outcome;

      // Populate bullets
      if (bulletsEl) {
        bulletsEl.innerHTML = "";
        data.bullets.forEach(bullet => {
          const li = document.createElement("li");
          li.textContent = bullet;
          bulletsEl.appendChild(li);
        });
      }

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // When clicking "Enquire for this program" inside modal
  if (enquireBtn) {
    enquireBtn.addEventListener("click", () => {
      closeModal();
      const goalSelect = document.getElementById("form-goal");
      if (goalSelect && activeProgramGoal) {
        goalSelect.value = activeProgramGoal;
      }
      const nameInput = document.getElementById("form-name");
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 500);
    });
  }
}

// ==================== 4. GALLERY FILTERS & LIGHTBOX ====================
function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (!lightbox) return;

  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxBackdrop = lightbox.querySelector(".lightbox-backdrop");

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      galleryItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.style.display = "block";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });
    });
  });

  // Open Lightbox on item click
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const highRes = item.getAttribute("data-src") || item.querySelector("img")?.src || "";
      const title = item.getAttribute("data-title") || item.querySelector("h4")?.textContent || "";

      if (lightboxImg) lightboxImg.src = highRes;
      if (lightboxCaption) lightboxCaption.textContent = title;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  // Global ESC key to close any active modal or lightbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active, .lightbox.active").forEach(el => {
        el.classList.remove("active");
        el.setAttribute("aria-hidden", "true");
      });
    }
  });
}

// ==================== 5. INTERACTIVE BMI & FITNESS CALCULATOR ====================
function initBMICalculator() {
  const btnCalc = document.getElementById("btn-calculate-bmi");
  if (!btnCalc) return;

  const inputWeight = document.getElementById("calc-weight");
  const inputHeight = document.getElementById("calc-height");
  const selectGoal = document.getElementById("calc-goal");
  const resultBox = document.getElementById("calc-result");
  const bmiVal = document.getElementById("bmi-val");
  const bmiCategory = document.getElementById("bmi-category");
  const bmiAdvice = document.getElementById("bmi-advice");
  const btnApplyCalc = document.getElementById("btn-apply-calc");

  btnCalc.addEventListener("click", () => {
    if (!inputWeight || !inputHeight) return;

    const weight = parseFloat(inputWeight.value);
    const height = parseFloat(inputHeight.value);

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid weight (kg) and height (cm) values.");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    if (bmiVal) bmiVal.textContent = bmi;
    if (resultBox) resultBox.style.display = "block";

    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight / Calorie Surplus Needed";
      advice = "Focus on muscle hypertrophy, progressive overload, and a controlled caloric surplus with Head Coach Gowtham.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Healthy Athletic Range";
      advice = "Ideal baseline! Focus on body recomposition, compound strength progression, and lean muscle density.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight / Muscular Bulk";
      advice = "Depending on your muscle mass, a structured metabolic conditioning and strength routine will sculpt your physique.";
    } else {
      category = "High BMI / Recomposition Target";
      advice = "A dedicated program blending resistance training with nutrition guidance from Coach Srinath will yield steady fat loss.";
    }

    if (bmiCategory) bmiCategory.textContent = category;
    if (bmiAdvice) bmiAdvice.textContent = advice;
  });

  // Apply to form
  if (btnApplyCalc && selectGoal) {
    btnApplyCalc.addEventListener("click", () => {
      const goalMap = {
        muscle: "Muscle Building",
        fatloss: "Weight Management",
        strength: "Strength Training",
        maintenance: "Functional Fitness"
      };
      const formGoal = document.getElementById("form-goal");
      if (formGoal && goalMap[selectGoal.value]) {
        formGoal.value = goalMap[selectGoal.value];
      }
    });
  }
}

// ==================== 6. MEMBERSHIP ENQUIRY FORM & WHATSAPP ====================
function initEnquiryForm() {
  const form = document.getElementById("membership-form");
  if (!form) return;

  const btnWhatsApp = document.getElementById("btn-whatsapp-enquiry");
  const feedbackModal = document.getElementById("feedback-modal");
  const feedbackClose = document.getElementById("feedback-close-btn");
  const feedbackOk = document.getElementById("feedback-ok-btn");
  const feedbackBackdrop = feedbackModal ? feedbackModal.querySelector(".modal-backdrop") : null;
  const feedbackSummary = document.getElementById("feedback-summary");

  // Validate single input
  function validateField(input, errorId, condition) {
    if (!input) return false;
    const formGroup = input.closest(".form-group");
    if (!formGroup) return false;

    if (!condition) {
      formGroup.classList.add("has-error");
      return false;
    } else {
      formGroup.classList.remove("has-error");
      return true;
    }
  }

  // Validate entire form
  function validateAll() {
    const name = document.getElementById("form-name");
    const phone = document.getElementById("form-phone");
    const email = document.getElementById("form-email");
    const plan = document.getElementById("form-plan");
    const goal = document.getElementById("form-goal");

    const isNameValid = validateField(name, "name-error", name && name.value.trim().length >= 2);
    const isPhoneValid = validateField(phone, "phone-error", phone && /^[0-9+\s-]{7,16}$/.test(phone.value.trim()));
    const isEmailValid = validateField(email, "email-error", email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    const isPlanValid = validateField(plan, "plan-error", plan && plan.value !== "");
    const isGoalValid = validateField(goal, "goal-error", goal && goal.value !== "");

    return isNameValid && isPhoneValid && isEmailValid && isPlanValid && isGoalValid;
  }

  // Live input error removal
  form.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", () => {
      const fg = el.closest(".form-group");
      if (fg) fg.classList.remove("has-error");
    });
  });

  // Get Clean Form Data
  function getFormData() {
    return {
      name: (document.getElementById("form-name")?.value || "").trim(),
      phone: (document.getElementById("form-phone")?.value || "").trim(),
      email: (document.getElementById("form-email")?.value || "").trim(),
      plan: document.getElementById("form-plan")?.value || "",
      goal: document.getElementById("form-goal")?.value || "",
      coach: document.getElementById("form-coach")?.value || "Any Available Coach",
      message: (document.getElementById("form-message")?.value || "").trim()
    };
  }

  // Form Submit Handler (Demo Submission)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    const data = getFormData();

    // Populate feedback modal
    if (feedbackSummary) {
      feedbackSummary.innerHTML = `
        <p><strong>Member Name:</strong> ${escapeHTML(data.name)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHTML(data.email)}</p>
        <p><strong>Chosen Plan:</strong> ${escapeHTML(data.plan)}</p>
        <p><strong>Fitness Goal:</strong> ${escapeHTML(data.goal)}</p>
        <p><strong>Preferred Coach:</strong> ${escapeHTML(data.coach)}</p>
        ${data.message ? `<p><strong>Note:</strong> ${escapeHTML(data.message)}</p>` : ""}
      `;
    }

    if (feedbackModal) {
      feedbackModal.classList.add("active");
      feedbackModal.setAttribute("aria-hidden", "false");
    }
    form.reset();
  });

  // WhatsApp Enquiry Button Handler
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", () => {
      if (!validateAll()) {
        alert("Please fill in your Name, Phone, Email, Plan, and Goal before forwarding to WhatsApp.");
        return;
      }

      const data = getFormData();
      const rawMessage = 
`🏋️ *BEAST FITNESS FACTOR - GYM ENQUIRY*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
✉️ *Email:* ${data.email}
🏆 *Interested Plan:* ${data.plan}
🎯 *Fitness Goal:* ${data.goal}
💪 *Coach Preference:* ${data.coach}
${data.message ? `📝 *Note:* ${data.message}\n` : ""}━━━━━━━━━━━━━━━━━━━━
Hi Coach Gowtham & Coach Srinath, I would like to schedule a visit and start training!`;

      const encodedText = encodeURIComponent(rawMessage);
      const whatsappURL = `https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${encodedText}`;

      // Open WhatsApp
      window.open(whatsappURL, "_blank");
    });
  }

  // Modal close handlers
  function closeFeedback() {
    if (feedbackModal) {
      feedbackModal.classList.remove("active");
      feedbackModal.setAttribute("aria-hidden", "true");
    }
  }

  if (feedbackClose) feedbackClose.addEventListener("click", closeFeedback);
  if (feedbackOk) feedbackOk.addEventListener("click", closeFeedback);
  if (feedbackBackdrop) feedbackBackdrop.addEventListener("click", closeFeedback);
}

// Helper: Escape HTML to avoid injection in demo modal
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ==================== 7. DYNAMIC CURRENT YEAR ====================
function initAutoYear() {
  const yearEl = document.getElementById("year-span");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
