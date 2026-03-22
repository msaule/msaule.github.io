// ═══════════════════════════════════════════════════════════
// ENHANCEMENTS.JS — Portfolio Visual Engine
// ═══════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ── Scroll Reveal (IntersectionObserver) ──
  function initReveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-stagger, .reveal-left, .reveal-scale")
      .forEach((el) => obs.observe(el));
  }

  // ── Card Mouse Glow Tracking ──
  function initCardGlow() {
    document.querySelectorAll(".project-card, .flagship-panel").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", e.clientX - rect.left + "px");
        card.style.setProperty("--mouse-y", e.clientY - rect.top + "px");
      });
    });
  }

  // ── Animated Counters ──
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = el.getAttribute("data-count");
          const suffix = el.getAttribute("data-suffix") || "";
          const prefix = el.getAttribute("data-prefix") || "";
          const isDecimal = target.includes(".");
          const end = parseFloat(target);
          const duration = 2000;
          const startTime = performance.now();

          function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = ease * end;
            el.textContent =
              prefix +
              (isDecimal
                ? current.toFixed(4)
                : Math.floor(current).toLocaleString()) +
              suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => counterObs.observe(el));
  }

  // ── Project Filtering ──
  function initFiltering() {
    const filterBar = document.querySelector(".filter-bar");
    if (!filterBar) return;

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.getAttribute("data-filter");
      const cards = document.querySelectorAll(".project-grid .project-card");

      cards.forEach((card) => {
        if (
          cat === "all" ||
          (card.getAttribute("data-category") || "").includes(cat)
        ) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  }

  // ── Timeline Reveal ──
  function initTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (!timelineItems.length) return;

    const tObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            tObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineItems.forEach((el) => tObs.observe(el));
  }

  // ── Magnetic Buttons ──
  function initMagneticButtons() {
    document.querySelectorAll(".btn-primary, .btn-ghost").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // ── Parallax Floating Elements ──
  function initParallax() {
    const hero = document.querySelector(".hero-panel");
    if (!hero) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const rate = scrolled * 0.3;
          hero.style.setProperty("--parallax-y", rate + "px");
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Typed Text Effect (layout-stable, adaptive cursor) ──
  function initTypedText() {
    const el = document.querySelector(".typed-text");
    if (!el) return;

    const phrases = JSON.parse(el.getAttribute("data-phrases") || "[]");
    if (!phrases.length) return;

    // Wrap: outer span reserves space (min-width), inner span hugs text (cursor follows)
    const wrapper = document.createElement("span");
    wrapper.className = "typed-slot";
    const inner = document.createElement("span");
    inner.className = "typed-cursor";
    el.replaceWith(wrapper);
    wrapper.appendChild(inner);

    // Measure longest phrase to lock wrapper width
    const sizer = document.createElement("span");
    sizer.style.cssText =
      "visibility:hidden;position:absolute;white-space:nowrap;font:inherit;";
    wrapper.parentNode.appendChild(sizer);
    let maxW = 0;
    phrases.forEach((p) => {
      sizer.textContent = p;
      maxW = Math.max(maxW, sizer.offsetWidth);
    });
    sizer.remove();
    wrapper.style.display = "inline-block";
    wrapper.style.minWidth = maxW + 6 + "px";
    wrapper.style.textAlign = "left";
    wrapper.style.verticalAlign = "bottom";

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseEnd = 0;

    function tick() {
      const now = Date.now();
      if (now < pauseEnd) {
        requestAnimationFrame(tick);
        return;
      }

      const current = phrases[phraseIndex];

      if (!isDeleting) {
        charIndex++;
        inner.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          pauseEnd = now + 2200;
        }
      } else {
        charIndex--;
        inner.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pauseEnd = now + 400;
        }
      }

      const speed = isDeleting ? 35 : 65;
      setTimeout(() => requestAnimationFrame(tick), speed);
    }

    setTimeout(() => requestAnimationFrame(tick), 800);
  }

  // ── Custom Footer Injection ──
  function initFooter() {
    const existingFooter = document.querySelector("footer.footer");
    if (!existingFooter) return;

    existingFooter.innerHTML = `
      <div class="custom-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <strong>Markuss Saule</strong>
            <span>Data & Analytics</span>
          </div>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="projects.html">Projects</a>
            <a href="resume.html">Resume</a>
            <a href="about.html">About</a>
          </div>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/markuss-saule/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/msaule" target="_blank" rel="noopener" aria-label="GitHub">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
    existingFooter.classList.add("custom-footer-active");
  }

  // ── Navbar Scroll Shrink ──
  function initNavbarShrink() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            navbar.classList.add("navbar-scrolled");
          } else {
            navbar.classList.remove("navbar-scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Progress Bar ──
  function initProgressBar() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winH = document.documentElement.scrollHeight - window.innerHeight;
          const pct = winH > 0 ? (window.scrollY / winH) * 100 : 0;
          bar.style.width = pct + "%";
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Init Everything ──
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCardGlow();
    initCounters();
    initFiltering();
    initTimeline();
    initMagneticButtons();
    initParallax();
    initTypedText();
    initFooter();
    initNavbarShrink();
    initProgressBar();
  });
})();
