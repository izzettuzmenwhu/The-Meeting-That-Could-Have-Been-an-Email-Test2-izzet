/*
 * Website interactions (carousel-first demo)
 * - CTAs scroll to the preview carousel
 * - Carousel auto-advances (background proof it "works")
 * - Bist du doof™ rotates prompts (English prompts; name stays German)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---- CTA wiring (always works) ----
  const heroBtn = document.getElementById('hero-demo-btn');
  const finalBtn = document.getElementById('final-btn');
  const demoSection = document.getElementById('demo');

  const scrollToDemo = () => {
    if (!demoSection) return;
    demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (heroBtn) heroBtn.addEventListener('click', (e) => { e.preventDefault(); scrollToDemo(); });
  if (finalBtn) finalBtn.addEventListener('click', (e) => { e.preventDefault(); scrollToDemo(); });

  // ---- Hero preview (static but premium) ----
  const heroPreview = document.getElementById('hero-preview');
  if (heroPreview) {
    heroPreview.innerHTML = `
      <div class="panel" style="padding:1rem; max-width:980px; margin:1.8rem auto 0;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:0 0.25rem 0.75rem;">
          <div style="font-weight:650; color:rgba(255,255,255,0.92); letter-spacing:-0.01em;">Before you meet</div>
          <div style="color:rgba(255,255,255,0.55); font-size:0.92rem;">Adaptive dashboard preview</div>
        </div>
        <img src="dash_0_0.png" alt="Dashboard preview" style="width:100%; border-radius:18px; border:1px solid rgba(255,255,255,0.10); display:block;"/>
      </div>
    `;
  }

  // ---- Carousel logic ----
  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const meta = document.getElementById('carousel-meta');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');

  if (track) {
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    let idx = 0;
    let autoTimer = null;
    let userInteracted = false;

    const setIndex = (newIdx) => {
      idx = (newIdx + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      const label = slides[idx].getAttribute('data-label') || '';
      if (meta) meta.textContent = label;

      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          userInteracted = true;
          stopAuto();
          setIndex(i);
        });
        dotsWrap.appendChild(dot);
      });
    };

    const startAuto = () => {
      if (autoTimer || userInteracted) return;
      autoTimer = setInterval(() => setIndex(idx + 1), 4200);
    };

    const stopAuto = () => {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = null;
    };

    // Buttons
    if (prev) prev.addEventListener('click', () => { userInteracted = true; stopAuto(); setIndex(idx - 1); });
    if (next) next.addEventListener('click', () => { userInteracted = true; stopAuto(); setIndex(idx + 1); });

    // Pause on hover / focus (feels premium)
    const viewport = track.closest('.carousel-viewport');
    if (viewport) {
      viewport.addEventListener('mouseenter', () => stopAuto());
      viewport.addEventListener('mouseleave', () => startAuto());
      viewport.addEventListener('focusin', () => stopAuto());
      viewport.addEventListener('focusout', () => startAuto());
    }

    buildDots();
    setIndex(0);
    startAuto();
  }

  // ---- Bist du doof™ prompt rotation (English) ----
  const promptEl = document.getElementById('prompt');
  if (promptEl) {
    const prompts = [
      "Who actually owns this?",
      "What assumption are we not testing?",
      "What breaks first if resources shrink?",
      "How will we know we are wrong?",
      "Which stakeholder will smile, then quietly block it?",
      "If this slips by two weeks, does anything truly change?"
    ];

    let pi = 0;
    setInterval(() => {
      pi = (pi + 1) % prompts.length;
      promptEl.style.opacity = '0';
      setTimeout(() => {
        promptEl.textContent = prompts[pi];
        promptEl.style.opacity = '1';
      }, 160);
    }, 3200);
  }

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }
});
