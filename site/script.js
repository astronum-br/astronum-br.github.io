// ---------- mobile nav toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- contact form (front-end only, no backend yet) ----------
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome") || "";
    note.textContent = `Obrigado, ${nome.split(" ")[0]}! Este formulário ainda não está conectado a um servidor — configure um endpoint (Formspree, EmailJS etc.) para receber os pedidos de leitura.`;
    form.reset();
  });
}

// ---------- ambient star field ----------
const canvas = document.getElementById("star-field");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  let width, height;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.documentElement.scrollHeight;
  }

  function makeStars() {
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      const twinkle = prefersReducedMotion ? 0.7 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242, 207, 126, ${0.15 + twinkle * 0.55})`;
      ctx.fill();
    }
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  makeStars();
  requestAnimationFrame(draw);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      makeStars();
      if (prefersReducedMotion) draw(0);
    }, 200);
  });
}
