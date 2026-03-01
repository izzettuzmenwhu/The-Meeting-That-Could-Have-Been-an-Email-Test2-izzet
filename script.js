document.addEventListener('DOMContentLoaded', () => {
  // CTAs
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.getElementById('hero-demo-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo('demo');
  });

  document.getElementById('final-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo('demo');
  });

  // Transformation stages
  const stages = Array.from(document.querySelectorAll('.transformation-panel .stage'));
  if (stages.length) {
    let i = 0;
    setInterval(() => {
      stages.forEach(s => s.classList.remove('active'));
      stages[i].classList.add('active');
      i = (i + 1) % stages.length;
    }, 3000);
  }

  // Examples carousel
  const slides = Array.from(document.querySelectorAll('#examples .carousel-slide'));
  const labelEl = document.getElementById('carousel-label');
  const labels = ['Decision', 'Momentum', 'Reality', 'Impact'];
  let idx = 0;

  const render = () => {
    slides.forEach(s => s.classList.remove('active'));
    if (slides[idx]) slides[idx].classList.add('active');
    if (labelEl) labelEl.textContent = labels[idx] || 'Examples';
  };

  const next = () => { idx = (idx + 1) % slides.length; render(); };
  const prev = () => { idx = (idx - 1 + slides.length) % slides.length; render(); };

  document.querySelector('#examples .carousel-btn.next')?.addEventListener('click', () => next());
  document.querySelector('#examples .carousel-btn.prev')?.addEventListener('click', () => prev());

  if (slides.length) {
    render();
    setInterval(next, 5200);
  }

  // Bist du doof™ rotation (English only)
  const promptEl = document.getElementById('prompt');
  if (promptEl) {
    const prompts = [
      "Who owns this when things go sideways?",
      "What assumption is doing the most work here?",
      "If this slips by two weeks, what truly breaks?",
      "Which stakeholder will smile, then block it later?",
      "What are we pretending is not a risk?"
    ];
    let pi = 0;
    setInterval(() => {
      pi = (pi + 1) % prompts.length;
      promptEl.style.opacity = '0';
      setTimeout(() => {
        promptEl.textContent = prompts[pi];
        promptEl.style.opacity = '1';
      }, 180);
    }, 3200);
  }

  // Reveal on scroll
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

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  if (slides.length) {
    let idx = slides.findIndex(s => s.classList.contains("active"));
    if (idx < 0) idx = 0;
    const show = (i) => {
      slides.forEach(s => s.classList.remove("active"));
      slides[i].classList.add("active");
    };
    show(idx);
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    nextBtn?.addEventListener("click", () => { idx = (idx + 1) % slides.length; show(idx); });
    prevBtn?.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; show(idx); });
    setInterval(() => { idx = (idx + 1) % slides.length; show(idx); }, 4500);
  }
});


// ============================
// Examples carousel (rebuilt)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("ex-image");
  const label = document.getElementById("ex-label");
  const hint  = document.getElementById("ex-hint");

  if (!image || !label || !hint) return;

  const slides = [
    { src: "dash_0_0.png", label: "Decision",  hint: "Decisions required, owners assigned, risks surfaced." },
    { src: "dash_0_1.png", label: "Momentum",  hint: "Execution tracked, blockers visible, next steps locked." },
    { src: "dash_1_0.png", label: "Reality",   hint: "Assumptions challenged, gaps exposed, tradeoffs explicit." },
    { src: "dash_1_1.png", label: "Impact",    hint: "Outcomes measured, commitments honored, learning captured." }
  ];

  let idx = 0;
  let timer = null;

  function setSlide(i){
    idx = (i + slides.length) % slides.length;

    // micro loading cue
    image.style.opacity = "0.35";

    const next = slides[idx];
    const preload = new Image();
    preload.onload = () => {
      image.src = next.src;
      label.textContent = next.label;
      hint.textContent = next.hint;
      requestAnimationFrame(() => {
        image.style.opacity = "1";
      });
    };
    preload.onerror = () => {
      // If assets are not being served, make it obvious
      label.textContent = "Example";
      hint.textContent = "Dashboard images failed to load. Check that dash_*.png files are served from the same folder as index.html.";
      image.style.opacity = "0.25";
    };
    preload.src = next.src;
  }

  function start(){
    if (timer) clearInterval(timer);
    timer = setInterval(() => setSlide(idx + 1), 4800);
  }

  document.querySelector("#examples .ex-next")?.addEventListener("click", () => { setSlide(idx + 1); start(); });
  document.querySelector("#examples .ex-prev")?.addEventListener("click", () => { setSlide(idx - 1); start(); });

  // initial
  setSlide(0);
  start();
});

/* DEMO MODE TRANSITIONS */
document.addEventListener("DOMContentLoaded",()=>{
  const modes=document.querySelectorAll('.demo-mode');
  if(!modes.length) return;

  let i=0;
  setInterval(()=>{
    modes.forEach(m=>m.classList.add('hidden'));
    modes[i].classList.remove('hidden');
    i=(i+1)%modes.length;
  },4200);
});

/* ROTATING BIST DU DOOF PROMPTS */
document.addEventListener("DOMContentLoaded",()=>{
  const prompts=[
    "If this slips two weeks, what actually breaks?",
    "Who owns this decision tomorrow?",
    "Is this a plan or a discussion?",
    "What assumption are we protecting?"
  ];
  const el=document.querySelector('.bdd-prompt');
  if(!el) return;

  let p=0;
  setInterval(()=>{
    el.style.opacity=0;
    setTimeout(()=>{
      p=(p+1)%prompts.length;
      el.textContent=prompts[p];
      el.style.opacity=1;
    },250);
  },5200);
});

/* SCROLL REVEAL */
document.addEventListener("DOMContentLoaded",()=>{
  const els=document.querySelectorAll('section');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    });
  },{threshold:.12});

  els.forEach(el=>{
    el.classList.add('reveal');
    io.observe(el);
  });
});
