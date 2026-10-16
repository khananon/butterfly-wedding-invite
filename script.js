/**
 * Invitely Luxury Digital Wedding Invitation
 * Dynamic Single-File Configuration (config.js) & Seamless Intro Video
 * Dr. Faizan Siddiqui & Sayma Wedding Celebration
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const invitationContainer = document.getElementById("invitationContainer");
  const videoIntroLayer = document.getElementById("videoIntroLayer");
  const introVideo = document.getElementById("introVideo");
  const coverTapOverlay = document.getElementById("coverTapOverlay");
  const btnOpenInvitation = document.getElementById("btnOpenInvitation");
  const btnScrollDown = document.getElementById("btnScrollDown");
  const heroScreen = document.getElementById("heroScreen");
  const websiteScrollViewport = document.getElementById("websiteScrollViewport");
  const fixedCardBg = document.getElementById("fixedCardBg");

  const bgAudio = document.getElementById("bgAudio");
  const btnToggleMusic = document.getElementById("btnToggleMusic");

  // State: 'idle' | 'playing' | 'fading' | 'done'
  let introState = "idle";
  let isMusicPlaying = false;

  // --- 1. Populate All Text, Dates, Schedule & Links from config.js ---
  const cfg = window.WEDDING_CONFIG || {};

  function populateFromConfig() {
    if (!cfg) return;

    // 1. Islamic Bismillah & Couple
    if (cfg.bismillah) {
      const el = document.getElementById("bismillahHeader");
      if (el) el.textContent = cfg.bismillah;
    }
    if (cfg.groomName) {
      const el = document.getElementById("groomName");
      if (el) el.textContent = cfg.groomName;
    }
    if (cfg.conjunction) {
      const el = document.getElementById("coupleAmp");
      if (el) el.textContent = cfg.conjunction;
    }
    if (cfg.brideName) {
      const el = document.getElementById("brideName");
      if (el) el.textContent = cfg.brideName;
    }
    if (cfg.invitationGreeting) {
      const el = document.getElementById("invitationGreeting");
      if (el) el.textContent = cfg.invitationGreeting;
    }

    // 2. Quranic Verse & Couple Story
    if (cfg.quranVerse) {
      if (cfg.quranVerse.arabic) {
        const el = document.getElementById("quranArabic");
        if (el) el.textContent = cfg.quranVerse.arabic;
      }
      if (cfg.quranVerse.translation) {
        const el = document.getElementById("quranTranslation");
        if (el) el.textContent = cfg.quranVerse.translation;
      }
      if (cfg.quranVerse.surah) {
        const el = document.getElementById("quranRef");
        if (el) el.textContent = cfg.quranVerse.surah;
      }
    }
    if (cfg.coupleStory && cfg.coupleStory.text) {
      const el = document.getElementById("coupleStoryText");
      if (el) el.textContent = cfg.coupleStory.text;
    }

    // 3. Date
    if (cfg.date) {
      if (cfg.date.day) {
        const el = document.getElementById("eventDateDay");
        if (el) el.textContent = cfg.date.day;
      }
      if (cfg.date.monthYear) {
        const el = document.getElementById("eventDateMonthYear");
        if (el) el.textContent = cfg.date.monthYear;
      }
      if (cfg.date.dayOfWeekAndTime) {
        const el = document.getElementById("eventDateSub");
        if (el) el.textContent = cfg.date.dayOfWeekAndTime;
      }
    }

    // 4. Wedding Events Schedule (Save The Dates - Compact & Engraved)
    if (Array.isArray(cfg.schedule)) {
      const list = document.getElementById("eventsScheduleList");
      if (list) {
        list.innerHTML = "";
        cfg.schedule.forEach((item) => {
          const card = document.createElement("div");
          card.className = "event-item-card";
          const descHtml = item.description ? `<div class="event-desc">${escapeHtml(item.description)}</div>` : "";
          card.innerHTML = `
            <div class="event-header-row">
              <span class="event-title">${escapeHtml(item.title || "")}</span>
              <span class="event-time-badge">${escapeHtml(item.time || "")}</span>
            </div>
            <div class="event-date-line">${escapeHtml(item.dateStr || "")}</div>
            ${descHtml}
          `;
          list.appendChild(card);
        });
      }
    }

    // 5. Our Journey (Love Story Milestones - Sleek & Compact)
    if (Array.isArray(cfg.journey)) {
      const jRow = document.getElementById("journeyChipsRow");
      if (jRow) {
        jRow.innerHTML = "";
        cfg.journey.forEach((j) => {
          const chip = document.createElement("div");
          chip.className = "journey-chip";
          const descHtml = j.description ? `<div class="journey-desc">${escapeHtml(j.description)}</div>` : "";
          chip.innerHTML = `
            <div class="journey-year">${escapeHtml(j.year || "")}</div>
            <div class="journey-title">${escapeHtml(j.title || "")}</div>
            ${descHtml}
          `;
          jRow.appendChild(chip);
        });
      }
    }

    // 6. Venue & Location
    if (cfg.venue) {
      if (cfg.venue.sectionEyebrow) {
        const el = document.getElementById("venueEyebrow");
        if (el) el.textContent = cfg.venue.sectionEyebrow;
      }
      if (cfg.venue.name) {
        const el = document.getElementById("venueName");
        if (el) el.textContent = cfg.venue.name;
      }
      if (cfg.venue.address) {
        const el = document.getElementById("venueAddress");
        if (el) el.textContent = cfg.venue.address;
      }
      const phoneEl = document.getElementById("venuePhoneLine");
      if (phoneEl) {
        if (cfg.venue.phone) {
          phoneEl.textContent = "Phone: " + cfg.venue.phone;
          phoneEl.style.display = "";
        } else {
          phoneEl.style.display = "none";
        }
      }
      const mapEl = document.getElementById("venueMapIframe");
      if (mapEl) {
        if (cfg.venue.mapEmbedUrl) {
          mapEl.src = cfg.venue.mapEmbedUrl;
          if (mapEl.parentElement) mapEl.parentElement.style.display = "";
        } else {
          if (mapEl.parentElement) mapEl.parentElement.style.display = "none";
        }
      }
      if (cfg.venue.directionsUrl) {
        const el = document.getElementById("btnVenueDirections");
        if (el) el.href = cfg.venue.directionsUrl;
      }
      if (cfg.venue.directionsButtonText) {
        const el = document.getElementById("venueDirectionsText");
        if (el) el.textContent = cfg.venue.directionsButtonText;
      }
    }

    // 7. RSVP Text Config
    if (cfg.rsvp) {
      if (cfg.rsvp.sectionEyebrow) {
        const el = document.getElementById("rsvpEyebrow");
        if (el) el.textContent = cfg.rsvp.sectionEyebrow;
      }
      if (cfg.rsvp.acceptOptionText) {
        const el = document.getElementById("rsvpAcceptLabel");
        if (el) el.textContent = cfg.rsvp.acceptOptionText;
      }
      if (cfg.rsvp.declineOptionText) {
        const el = document.getElementById("rsvpDeclineLabel");
        if (el) el.textContent = cfg.rsvp.declineOptionText;
      }
      if (cfg.rsvp.namePlaceholder) {
        const el = document.getElementById("rsvpName");
        if (el) el.placeholder = cfg.rsvp.namePlaceholder;
      }
      if (cfg.rsvp.notePlaceholder) {
        const el = document.getElementById("rsvpNote");
        if (el) el.placeholder = cfg.rsvp.notePlaceholder;
      }
      if (cfg.rsvp.submitButtonText) {
        const el = document.getElementById("rsvpSubmitText");
        if (el) el.textContent = cfg.rsvp.submitButtonText;
      }
    }

    // 8. Guestbook Wishes Config
    if (cfg.guestbook) {
      if (cfg.guestbook.sectionEyebrow) {
        const el = document.getElementById("guestbookEyebrow");
        if (el) el.textContent = cfg.guestbook.sectionEyebrow;
      }
      if (cfg.guestbook.heading) {
        const el = document.getElementById("guestbookHeading");
        if (el) el.textContent = cfg.guestbook.heading;
      }
      const subEl = document.getElementById("guestbookSubtext");
      if (subEl) {
        if (cfg.guestbook.subtext) {
          subEl.textContent = cfg.guestbook.subtext;
          subEl.style.display = "";
        } else {
          subEl.style.display = "none";
        }
      }
      if (cfg.guestbook.namePlaceholder) {
        const el = document.getElementById("wishAuthor");
        if (el) el.placeholder = cfg.guestbook.namePlaceholder;
      }
      if (cfg.guestbook.messagePlaceholder) {
        const el = document.getElementById("wishMessage");
        if (el) el.placeholder = cfg.guestbook.messagePlaceholder;
      }
      if (cfg.guestbook.postButtonText) {
        const el = document.getElementById("wishSubmitText");
        if (el) el.textContent = cfg.guestbook.postButtonText;
      }
    }

    // 9. Alhamdulillah Footer
    if (cfg.footer) {
      if (cfg.footer.alhamdulillah) {
        const el = document.getElementById("arabicAlhamdulillah");
        if (el) el.textContent = cfg.footer.alhamdulillah;
      }
      if (cfg.footer.coupleNames) {
        const el = document.getElementById("footerCouple");
        if (el) el.textContent = cfg.footer.coupleNames;
      }
      if (cfg.footer.dateAndCity) {
        const el = document.getElementById("footerDateCity");
        if (el) el.textContent = cfg.footer.dateAndCity;
      }
      if (cfg.footer.tagline) {
        const el = document.getElementById("footerTagline");
        if (el) el.textContent = cfg.footer.tagline;
      }
    }

    // 10. Brand & Advertisement
    if (cfg.brand) {
      const linkEl = document.getElementById("brandAdLink");
      if (linkEl && cfg.brand.url) linkEl.href = cfg.brand.url;
      const prefixEl = document.getElementById("brandAdPrefix");
      if (prefixEl && cfg.brand.prefix) prefixEl.textContent = cfg.brand.prefix;
      const titleEl = document.getElementById("brandAdTitle");
      if (titleEl && cfg.brand.name) titleEl.textContent = cfg.brand.name;
      const logoEl = document.getElementById("brandAdLogo");
      if (logoEl && cfg.brand.icon) logoEl.src = cfg.brand.icon;
    }
  }

  populateFromConfig();

  // --- 2. Initial Setup: Lock Scroll ---
  function lockScroll() {
    document.documentElement.classList.add("intro-active");
    document.documentElement.classList.remove("intro-done");
    document.body.classList.add("intro-active");
    document.body.classList.remove("intro-done");
    if (invitationContainer) {
      invitationContainer.classList.add("intro-active");
      invitationContainer.classList.remove("intro-done");
    }
  }

  function unlockScroll() {
    document.documentElement.classList.remove("intro-active");
    document.documentElement.classList.add("intro-done");
    document.body.classList.remove("intro-active");
    document.body.classList.add("intro-done");
    if (invitationContainer) {
      invitationContainer.classList.remove("intro-active");
      invitationContainer.classList.add("intro-done");
    }
  }

  lockScroll();

  // --- 3. Seamless Video Flow ---
  function startIntroVideo() {
    if (introState !== "idle") return;
    introState = "playing";

    // Immediately hide tap button overlay
    videoIntroLayer.classList.add("playing");

    // Play video
    introVideo.currentTime = 0;
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay was prevented by browser policy:", err);
      });
    }

    // Start background music
    startAudio();

    // Listen for video completion
    introVideo.addEventListener("ended", finishVideoIntro, { once: true });
  }

  function finishVideoIntro() {
    if (introState === "fading" || introState === "done") return;
    introState = "fading";

    // 1. Smooth fade transition of video layer
    videoIntroLayer.classList.add("fading");

    // 2. Unlock scroll & reveal invitation content underneath
    unlockScroll();

    // 3. Trigger hero animations
    restartHeroAnimations();

    // 4. Trigger luxury reveal events
    window.dispatchEvent(new CustomEvent("luxuryIntroRevealStart"));

    // 5. Hide video layer completely
    setTimeout(() => {
      introState = "done";
      videoIntroLayer.classList.add("hidden");
      videoIntroLayer.classList.remove("fading");
      introVideo.pause();

      window.dispatchEvent(new CustomEvent("luxuryIntroVisible"));
    }, 400);
  }

  function restartHeroAnimations() {
    if (!heroScreen) return;
    const animEls = heroScreen.querySelectorAll(".an");
    animEls.forEach((el) => {
      el.style.animation = "none";
      el.offsetHeight; // trigger reflow
      el.style.animation = "";
    });
  }

  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener("click", (e) => {
      e.stopPropagation();
      startIntroVideo();
    });
  }

  if (coverTapOverlay) {
    coverTapOverlay.addEventListener("click", startIntroVideo);
  }
  if (videoIntroLayer) {
    videoIntroLayer.addEventListener("click", () => {
      if (introState === "idle") {
        startIntroVideo();
      }
    });
  }
  if (invitationContainer) {
    invitationContainer.addEventListener("click", () => {
      if (introState === "idle") {
        startIntroVideo();
      }
    });
  }

    // --- 4. 5-Part Center Scroll Tracking & Smooth Controller ---
  const invitationParts = Array.from(document.querySelectorAll(".invitation-part"));
  const navDots = Array.from(document.querySelectorAll(".parts-nav-dots .nav-dot"));
  let currentPartIndex = 0;
  let isSmoothScrolling = false;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function setActivePart(index) {
    if (index < 0 || index >= invitationParts.length) return;
    currentPartIndex = index;

    invitationParts.forEach((part, i) => {
      part.classList.remove("part-active", "part-passed", "part-upcoming");
      if (i === index) {
        part.classList.add("part-active");
      } else if (i < index) {
        part.classList.add("part-passed");
      } else {
        part.classList.add("part-upcoming");
      }
    });

    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    if (sandCanvasController) {
      sandCanvasController.burst();
    }
  }

  function slowScrollTo(targetY, duration = 850) {
    if (!websiteScrollViewport) return;
    const startY = websiteScrollViewport.scrollTop;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;

    isSmoothScrolling = true;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      websiteScrollViewport.scrollTop = startY + diff * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        websiteScrollViewport.scrollTop = targetY;
        setTimeout(() => {
          isSmoothScrolling = false;
        }, 80);
      }
    }

    requestAnimationFrame(step);
  }

  function navigateToPart(newIndex) {
    if (newIndex < 0 || newIndex >= invitationParts.length) return;
    setActivePart(newIndex);
    const targetEl = invitationParts[newIndex];
    if (targetEl) {
      if (isTouchDevice) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        slowScrollTo(targetEl.offsetTop, 850);
      }
    }
  }

  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const partNum = parseInt(dot.getAttribute("data-part"), 10) - 1;
      if (!isNaN(partNum)) {
        navigateToPart(partNum);
      }
    });
  });

  // Desktop Mouse Wheel Navigation
  if (websiteScrollViewport && !isTouchDevice) {
    websiteScrollViewport.addEventListener(
      "wheel",
      (e) => {
        if (introState !== "done") return;
        if (isSmoothScrolling) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) > 20) {
          e.preventDefault();
          if (e.deltaY > 0) {
            navigateToPart(currentPartIndex + 1);
          } else {
            navigateToPart(currentPartIndex - 1);
          }
        }
      },
      { passive: false }
    );
  }

  // Smooth scroll position observer (Used on both mobile and desktop)
  let scrollThrottleTimer = null;
  if (websiteScrollViewport) {
    websiteScrollViewport.addEventListener(
      "scroll",
      () => {
        if (isSmoothScrolling) return;
        if (scrollThrottleTimer) return;

        scrollThrottleTimer = setTimeout(() => {
          scrollThrottleTimer = null;
          const viewportRect = websiteScrollViewport.getBoundingClientRect();
          const centerY = viewportRect.top + viewportRect.height / 2;

          let closestIndex = 0;
          let minDistance = Infinity;

          invitationParts.forEach((part, i) => {
            const rect = part.getBoundingClientRect();
            const partCenter = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - partCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          });

          if (closestIndex !== currentPartIndex) {
            setActivePart(closestIndex);
          }
        }, 50);
      },
      { passive: true }
    );
  }

  // Scroll Down button
  if (btnScrollDown) {
    btnScrollDown.addEventListener("click", () => {
      navigateToPart(1);
    });
  }

  // --- 5. Ambient Golden Sand Particle Canvas ---
  const sandCanvas = document.getElementById("sandCanvas");
  let sandCanvasController = null;

  if (sandCanvas && sandCanvas.getContext) {
    const ctx = sandCanvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    const isMobile = window.innerWidth <= 480;
    const PARTICLE_COUNT = isMobile ? 18 : 40;

    function resizeCanvas() {
      if (!websiteScrollViewport) return;
      width = websiteScrollViewport.clientWidth || 360;
      height = websiteScrollViewport.clientHeight || 860;
      sandCanvas.width = width;
      sandCanvas.height = height;
    }

    class SandGrain {
      constructor(burst = false) {
        this.reset(burst);
      }

      reset(burst = false) {
        this.x = Math.random() * (width || 360);
        this.y = burst ? height / 2 + (Math.random() * 160 - 80) : Math.random() * (height || 860);
        this.size = Math.random() * 2.2 + 0.6;
        this.speedY = -(Math.random() * 0.22 + 0.08);
        this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.18;
        this.opacity = Math.random() * 0.65 + 0.2;
        this.baseOpacity = this.opacity;
        this.hue = Math.random() > 0.3 ? "212, 175, 105" : "235, 217, 191";
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.pulse) * 0.15;
        this.pulse += this.pulseSpeed;
        this.opacity = this.baseOpacity * (0.6 + 0.4 * Math.sin(this.pulse));

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hue}, ${this.opacity})`;
        ctx.shadowColor = `rgba(${this.hue}, 0.8)`;
        if (!isMobile) { ctx.shadowBlur = this.size * 2; }
        ctx.fill();
      }
    }

    function initSand() {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new SandGrain(false));
      }
    }

    function animateSand() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateSand);
    }

    window.addEventListener("resize", resizeCanvas);
    initSand();
    animateSand();

    sandCanvasController = {
      burst: () => {
        for (let i = 0; i < 22; i++) {
          particles.push(new SandGrain(true));
        }
        if (particles.length > 85) {
          particles.splice(0, particles.length - 60);
        }
      }
    };
  }

  // --- 6. Audio Control (Headphones Button) ---
  function startAudio() {
    if (!bgAudio) return;
    bgAudio.volume = 0.35;
    bgAudio
      .play()
      .then(() => {
        isMusicPlaying = true;
        btnToggleMusic.classList.add("playing");
        btnToggleMusic.classList.remove("muted");
        btnToggleMusic.setAttribute("aria-pressed", "true");
      })
      .catch((e) => {
        console.log("Audio play blocked by browser policy:", e);
      });
  }

  function toggleAudio() {
    if (!bgAudio) return;
    if (isMusicPlaying) {
      bgAudio.pause();
      isMusicPlaying = false;
      btnToggleMusic.classList.remove("playing");
      btnToggleMusic.classList.add("muted");
      btnToggleMusic.setAttribute("aria-pressed", "false");
    } else {
      bgAudio
        .play()
        .then(() => {
          isMusicPlaying = true;
          btnToggleMusic.classList.add("playing");
          btnToggleMusic.classList.remove("muted");
          btnToggleMusic.setAttribute("aria-pressed", "true");
        })
        .catch((e) => console.log("Play failed:", e));
    }
  }

  btnToggleMusic.addEventListener("click", toggleAudio);

  // --- 7. Live Dynamic Countdown Timer (Driven by config.js) ---
  const countdownTargetStr =
    cfg.date && cfg.date.countdownTarget
      ? cfg.date.countdownTarget
      : "2026-11-15T19:00:00+05:30";
  const weddingDate = new Date(countdownTargetStr).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById("countDays");
    const hoursEl = document.getElementById("countHours");
    const minsEl = document.getElementById("countMinutes");
    const secsEl = document.getElementById("countSeconds");

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minsEl) minsEl.textContent = "00";
      if (secsEl) secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 8. Add to Calendar (Google Calendar link from config.js) ---
  const btnAddToCalendar = document.getElementById("btnAddToCalendar");
  if (btnAddToCalendar) {
    btnAddToCalendar.addEventListener("click", () => {
      const cal = cfg.calendar || {};
      const title = encodeURIComponent(cal.eventTitle || "Dr. Faizan Siddiqui & Sayma Wedding");
      const details = encodeURIComponent(cal.description || "");
      const location = encodeURIComponent(cal.location || "White Palace");
      const dates = `${cal.isoStart || "20261115T133000Z"}/${cal.isoEnd || "20261115T183000Z"}`;

      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, "_blank");
    });
  }

    // --- 9. RSVP Form Handling (In-Theme Luxury Submission) ---
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpSuccessBanner = document.getElementById("rsvpSuccessBanner");
  const guestCountField = document.getElementById("guestCountField");
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value.toLowerCase().includes("decline")) {
        if (guestCountField) guestCountField.style.display = "none";
      } else {
        if (guestCountField) guestCountField.style.display = "block";
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("btnSubmitRsvp");
      const submitText = document.getElementById("rsvpSubmitText");
      if (btn) btn.disabled = true;
      if (submitText) submitText.textContent = "Submitting...";

      setTimeout(() => {
        if (btn) btn.style.display = "none";
        if (rsvpSuccessBanner) rsvpSuccessBanner.classList.remove("hidden");
      }, 500);
    });
  }

  // --- 10. Warm Wishes (In-Theme Gold Button with WhatsApp Transmission) ---
  const wishForm = document.getElementById("wishForm");
  const wishSuccessBanner = document.getElementById("wishSuccessBanner");

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const authorInput = document.getElementById("wishAuthor");
      const messageInput = document.getElementById("wishMessage");

      const author = authorInput.value.trim();
      const message = messageInput.value.trim();

      if (!author || !message) return;

      const phone = (cfg.guestbook && cfg.guestbook.whatsappNumber) || "918377978651";
      const waMessage = `*Warm Wedding Wishes & Duas for Dr. Faizan Siddiqui & Sayma* ✨\n\nFrom: ${author}\n\n"${message}"\n\nMay Allah bless the couple with endless love, harmony and barakah in their married life! 🤲`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;

      if (wishSuccessBanner) {
        wishSuccessBanner.classList.remove("hidden");
      }
      const btn = document.getElementById("btnWishSend");
      const btnText = document.getElementById("wishSubmitText");
      if (btn) btn.disabled = true;
      if (btnText) btnText.textContent = "Sending...";

      setTimeout(() => {
        window.open(waUrl, "_blank");
        authorInput.value = "";
        messageInput.value = "";
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = (cfg.guestbook && cfg.guestbook.postButtonText) || "Send Wishes";
      }, 500);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
});
