/* ==========================================================================
   Refonte Haute Conversion - Scripts JavaScript Dora ?lysiane
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. COMPTE ? REBOURS DYNAMIQUE PERSISTANT (30 MINUTES)
  const DURATION_SECONDS = 30 * 60; // 30 minutes
  const STORAGE_KEY = "elysiane_biblio_timer_end";
  
  let targetEndTime = localStorage.getItem(STORAGE_KEY);
  const now = Math.floor(Date.now() / 1000);

  if (!targetEndTime || parseInt(targetEndTime, 10) <= now) {
    targetEndTime = now + DURATION_SECONDS;
    localStorage.setItem(STORAGE_KEY, targetEndTime.toString());
  } else {
    targetEndTime = parseInt(targetEndTime, 10);
  }

  function updateTimers() {
    const current = Math.floor(Date.now() / 1000);
    let remaining = targetEndTime - current;

    if (remaining <= 0) {
      remaining = 0;
      // Optionnel: R?initialiser ? 10 min pour maintenir l'urgence sans casser la page
      targetEndTime = Math.floor(Date.now() / 1000) + (10 * 60);
      localStorage.setItem(STORAGE_KEY, targetEndTime.toString());
    }

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const timerElements = document.querySelectorAll(".timer-display");
    timerElements.forEach((el) => {
      el.textContent = formattedTime;
    });
  }

  updateTimers();
  setInterval(updateTimers, 1000);

  // 2. FAQ ACCORD?ON INTERACTIF
  const faqCards = document.querySelectorAll(".faq-card");

  faqCards.forEach((card) => {
    const trigger = card.querySelector(".faq-toggle-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      // Fermer les autres cartes ouvertes pour un effet ?pur?
      faqCards.forEach((c) => {
        if (c !== card) {
          c.classList.remove("active");
          const body = c.querySelector(".faq-body-collapse");
          if (body) body.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add("active");
        const body = card.querySelector(".faq-body-collapse");
        if (body) {
          body.style.maxHeight = body.scrollHeight + "px";
        }
      } else {
        card.classList.remove("active");
        const body = card.querySelector(".faq-body-collapse");
        if (body) {
          body.style.maxHeight = null;
        }
      }
    });
  });

  // 3. BARRE FLOTTANTE D'ACHAT (STICKY BOTTOM BAR)
  const stickyBar = document.querySelector(".sticky-footer-cta");
  const firstCTA = document.querySelector("#primary-deal-cta");

  if (stickyBar && firstCTA) {
    window.addEventListener("scroll", () => {
      const ctaRect = firstCTA.getBoundingClientRect();
      // Si l'utilisateur a d?fil? au-del? du premier CTA principal
      if (ctaRect.bottom < 0) {
        stickyBar.classList.add("show");
      } else {
        stickyBar.classList.remove("show");
      }
    });
  }

  // 4. LECTEURS VID?OS : PAUSER LES AUTRES LORS DE LA LECTURE D'UNE VID?O
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
});
