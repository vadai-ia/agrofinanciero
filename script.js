const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav] a");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const amountInput = document.querySelector("[data-amount-input]");
const amountLabel = document.querySelector("[data-amount-label]");
const leadForm = document.querySelector("[data-lead-form]");
const formMessage = document.querySelector("[data-form-message]");
const faqItems = document.querySelectorAll(".faq-item");

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

function closeMenu() {
  if (!menuToggle || !nav) return;

  body.classList.remove("nav-open");
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

function updateAmountLabel() {
  if (!amountInput || !amountLabel) return;

  amountLabel.textContent = `${currencyFormatter.format(Number(amountInput.value))} M.N.`;
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.open = false;
    }
  });
});

if (amountInput) {
  amountInput.addEventListener("input", updateAmountLabel);
  updateAmountLabel();
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    if (formMessage) {
      formMessage.textContent = "Solicitud recibida. Te redirigiremos para finalizar.";
    }

    window.setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 700);
  });
}

function setAnswerHeight(item, open) {
  const answer = item.querySelector(".faq-answer");
  if (!answer) return;
  answer.style.maxHeight = open ? `${answer.scrollHeight + 8}px` : "0px";
}

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  if (!button) return;

  setAnswerHeight(item, item.classList.contains("is-open"));

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    setAnswerHeight(item, isOpen);
  });
});

function refreshOpenAnswers() {
  faqItems.forEach((item) => {
    if (item.classList.contains("is-open")) {
      setAnswerHeight(item, true);
    }
  });
}

// Recalcula la altura de las respuestas abiertas tras cargar fuentes/imágenes o al redimensionar.
window.addEventListener("load", refreshOpenAnswers);

window.addEventListener("resize", () => {
  refreshOpenAnswers();

  if (window.innerWidth >= 1024) {
    closeMenu();
  }
});
