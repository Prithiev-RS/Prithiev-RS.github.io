// --- Small personal touch links (edit these) ---
const LINKS = {
  github: "https://github.com/",      // TODO: replace with your GitHub profile
  project: "https://github.com/"      // TODO: replace with your SIH project repo/demo
};

// --- Year ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Mobile nav ---
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link (mobile)
navLinks?.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// --- Theme toggle (remember preference) ---
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const icon = themeToggle?.querySelector("i");
  if (!icon) return;
  icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";

  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");

  localStorage.setItem("theme", next || "");
  updateThemeIcon();
});

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));

// --- Contact form -> mailto (no backend needed) ---
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
  );

  // Opens user's email client
  window.location.href = `mailto:prithievrs@gmail.com?subject=${subject}&body=${body}`;
  if (hint) hint.textContent = "Opening your email app…";
});

// --- Inject personal links ---
const githubLink = document.getElementById("githubLink");
const projectLink = document.getElementById("projectLink");

if (githubLink) githubLink.href = LINKS.github;
if (projectLink) projectLink.href = LINKS.project;