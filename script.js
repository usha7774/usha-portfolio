// ===================================
// 1. TYPING ANIMATION
// ===================================

const typingText = document.getElementById("typingText");

const phrases = [
    "beautiful websites",
    "responsive layouts",
    "interactive experiences",
    "creative web projects"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentPhrase.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentPhrase.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

if (typingText) {
    typeEffect();
}


// ===================================
// 2. DARK MODE TOGGLE
// ===================================

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
}

updateThemeButton();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });
}


// ===================================
// 3. MOBILE NAVIGATION MENU
// ===================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}


// ===================================
// 4. SCROLL REVEAL ANIMATIONS
// ===================================

document.body.classList.add("js-ready");

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, .project-card, .contact-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// ===================================
// 5. CONTACT FORM DEMO
// ===================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        formMessage.textContent =
            `Thank you, ${name}! This is a demo form and your message has not been sent.`;

        contactForm.reset();
    });
}


// ===================================
// 6. PROJECT DEMO PLACEHOLDER
// ===================================

// Smart Farmer Live Demo
document.querySelectorAll('[data-project="farmer"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        window.open(
            "https://steady-valkyrie-fbb274.netlify.app/",
            "_blank",
            "noopener,noreferrer"
        );
    });
});

// ===================================
// 7. CURRENT YEAR IN FOOTER
// ===================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===================================
// 8. SMOOTH SCROLL FOR NAVIGATION
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});