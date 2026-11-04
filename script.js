
/* =========================================
   AEMI ART SPACE
   Gallery, navigation and commission inquiry
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  // Mobile navigation
  if (menuToggle && siteNav) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        siteNav.classList.contains("is-open") &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  // Gallery artist filters
  const filterButtons = document.querySelectorAll(".filter-button");
  const artCards = document.querySelectorAll(".art-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;

        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      artCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.artist === filter;

        card.hidden = !matches;
      });
    });
  });

  // Current year in footer
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Commission inquiry
  const commissionForm = document.getElementById("commission-form");
  const formHint = document.getElementById("form-hint");

  if (commissionForm) {
    commissionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!commissionForm.reportValidity()) {
        return;
      }

      const formData = new FormData(commissionForm);

      const name = String(formData.get("name") || "").trim();
      const contact = String(formData.get("contact") || "").trim();
      const artist = String(formData.get("artist") || "").trim();
      const details = String(formData.get("details") || "").trim();

      if (!name || !contact || !artist || !details) {
        return;
      }

      const message = [
        "Hello, AEMI! I'd like to inquire about an art commission.",
        "",
        `Name: ${name}`,
        `Preferred artist: ${artist}`,
        `My contact: ${contact}`,
        "",
        "About my idea:",
        details,
        "",
        "Thank you!"
      ].join("\n");

      const messengerUrl =
        "https://m.me/aemii.co?text=" + encodeURIComponent(message);

      if (formHint) {
        formHint.textContent =
          "Your inquiry is prepared. Messenger will open in a new tab if supported. Please check the message before sending it.";
      }

      const messengerWindow = window.open(
        messengerUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!messengerWindow && formHint) {
        formHint.textContent =
          "Your inquiry is ready, but Messenger did not open. You can copy the details below and send them to m.me/aemii.co.";
        
        let messageBox = document.getElementById("commission-message-preview");

        if (!messageBox) {
          messageBox = document.createElement("textarea");
          messageBox.id = "commission-message-preview";
          messageBox.readOnly = true;
          messageBox.rows = 8;
          messageBox.setAttribute("aria-label", "Prepared commission message");
          messageBox.style.width = "100%";
          messageBox.style.marginTop = "12px";
          messageBox.style.padding = "12px";
          messageBox.style.border = "1px solid #d6e2e4";
          messageBox.style.background = "#fbf8ef";
          commissionForm.appendChild(messageBox);
        }

        messageBox.value = message;
        messageBox.focus();
        messageBox.select();
      }
    });
  }
});

/* =========================================
   AEMI GALLERY — SEE MORE ART
   Shows artworks in batches of six
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery-grid");
  const moreSection = document.querySelector(".gallery-more");
  const moreButton = document.getElementById("see-more-art");

  if (!gallery || !moreSection || !moreButton) return;

  const batchSize = 6;
  let visibleCount = batchSize;

  function updateGallery() {
    const artworks = Array.from(
      gallery.querySelectorAll(".art-card")
    );

    artworks.forEach((artwork, index) => {
      artwork.hidden = index >= visibleCount;
    });

    const hasMore = artworks.length > visibleCount;

    moreSection.hidden = !hasMore;
    moreButton.hidden = !hasMore;
  }

  moreButton.addEventListener("click", () => {
    const artworks = gallery.querySelectorAll(".art-card");

    visibleCount = Math.min(
      visibleCount + batchSize,
      artworks.length
    );

    updateGallery();

    const remaining = artworks.length - visibleCount;

    if (remaining > 0) {
      moreButton.innerHTML =
        'See more art <span aria-hidden="true">↓</span>';
    }
  });

  // Keep the gallery ready for future artwork additions.
  updateGallery();
});
