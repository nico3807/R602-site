/**
 * R602 - TP PROMPTING
 * Fichier JavaScript pour les interactions
 */

// ================================================
// GESTION DU MENU MOBILE
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");

  // Toggle du menu au clic sur le bouton hamburger
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navList.classList.toggle("active");
    });
  }

  // Fermer le menu si on clique sur un lien
  if (navList) {
    const navLinks = navList.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navList.classList.remove("active");
      });
    });
  }

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", function (event) {
    const header = document.querySelector(".header");
    if (!header.contains(event.target)) {
      if (navList) {
        navList.classList.remove("active");
      }
    }
  });
});

// ================================================
// GESTION DES CHECKBOXES (synthèse)
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    '.checkbox-item input[type="checkbox"]',
  );

  checkboxes.forEach((checkbox) => {
    // Charger l'état depuis localStorage
    const index = Array.from(checkboxes).indexOf(checkbox);
    const saved = localStorage.getItem(`checklist-item-${index}`);
    if (saved) {
      checkbox.checked = JSON.parse(saved);
    }

    // Sauvegarder au changement
    checkbox.addEventListener("change", function () {
      localStorage.setItem(
        `checklist-item-${index}`,
        JSON.stringify(this.checked),
      );
    });
  });
});

// ================================================
// ACTIVE NAV LINK (détection automatique)
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ================================================
// SMOOTH SCROLL (amélioration de la transition)
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  // Ajouter des animations subtiles au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observer les sections de contenu
  const sections = document.querySelectorAll(
    ".content-section, .exercise, .concept-card, .tool-card",
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});

// ================================================
// RESPONSIVE CODE BLOCKS
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  const codeBlocks = document.querySelectorAll(".code-block");

  codeBlocks.forEach((block) => {
    // Ajouter un boutton copy (optionnel)
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = "📋 Copier";
    copyBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px 10px;
            background-color: rgba(255, 255, 255, 0.1);
            color: #e0e0e0;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    block.style.position = "relative";
    block.appendChild(copyBtn);

    block.addEventListener("mouseenter", () => {
      copyBtn.style.opacity = "1";
    });

    block.addEventListener("mouseleave", () => {
      copyBtn.style.opacity = "0";
    });

    copyBtn.addEventListener("click", () => {
      const text = block.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = "✓ Copié !";
        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copier";
        }, 2000);
      });
    });
  });
});

// ================================================
// ANALYTICS DE SCROLL (bonus)
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  let scrollProgress = 0;

  window.addEventListener("scroll", function () {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    scrollProgress = (scrollTop / (docHeight - windowHeight)) * 100;
  });
});

// ================================================
// AMÉLIORATION DU CONTRASTE (accessibilité)
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  // Détecte le thème préféré de l'utilisateur
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // L'utilisateur préfère le mode sombre (optionnel à implémenter)
  }

  // Détecte les préférences de mouvement
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    // Réduire les animations pour les utilisateurs sensibles
    document.documentElement.style.scrollBehavior = "auto";
    const elements = document.querySelectorAll('[style*="transition"]');
    elements.forEach((el) => {
      el.style.transition = "none";
    });
  }
});

// ================================================
// GESTION DES TABLES RESPONSIVES
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  const tables = document.querySelectorAll(".crtfc-table, .comparison-table");

  tables.forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-responsive";
    table.parentNode.replaceChild(wrapper, table);
    wrapper.appendChild(table);
  });
});

// ================================================
// KEYBOARD NAVIGATION (accessibilité)
// ================================================

document.addEventListener("keydown", function (e) {
  // Escape pour fermer le menu mobile
  if (e.key === "Escape") {
    const navList = document.getElementById("navList");
    if (navList) {
      navList.classList.remove("active");
    }
  }
});

// ================================================
// INITIALISATION AU CHARGEMENT
// ================================================

console.log("R602 - TP Prompting : Site chargé avec succès !");
console.log(
  "Pages disponibles : Accueil, Méthode CRTFC, Exercices Web, Dispositifs, Copilot Avancé, Synthèse",
);
