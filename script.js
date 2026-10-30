// Année dans le pied de page
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Compteurs animés (section À propos)
function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Apparition des éléments au défilement
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      const counter = entry.target.querySelector("[data-count]");
      if (counter) animateCount(counter);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Formulaire de contact (validation simple, sans envoi réel)
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    status.textContent = "Merci de remplir correctement tous les champs.";
    status.className = "form-status error";
    return;
  }

  status.textContent = "Merci ! Votre message a bien été pris en compte.";
  status.className = "form-status ok";
  form.reset();
});
