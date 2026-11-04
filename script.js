
/* ============================================================
   AEMI ART SPACE — WEBSITE FUNCTIONALITY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. FOOTER YEAR
     ---------------------------------------------------------- */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ----------------------------------------------------------
     2. MOBILE NAVIGATION
     ---------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.classList.remove("is-open");
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.classList.toggle("is-open", !isOpen);
      siteNav.classList.toggle("open", !isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (
        siteNav.classList.contains("open") &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }


  /* ----------------------------------------------------------
     3. GALLERY FILTERS + SEE MORE
     ---------------------------------------------------------- */

  const gallery = document.getElementById("art-grid");
  const filterButtons =
    document.querySelectorAll(".filter-button");

  const moreSection =
    document.querySelector(".gallery-more");

  const moreButton =
    document.getElementById("see-more-art");

  const batchSize = 6;

  let activeFilter = "all";
  let visibleCount = batchSize;

  if (gallery) {

    const artworkCards = Array.from(
      gallery.querySelectorAll(".art-card")
    );

    function getFilteredCards() {
      return artworkCards.filter(card => {
        return (
          activeFilter === "all" ||
          card.dataset.artist === activeFilter
        );
      });
    }

    function updateGallery() {

      const filteredCards = getFilteredCards();

      artworkCards.forEach(card => {
        card.hidden = true;
      });

      filteredCards.forEach((card, index) => {
        card.hidden = index >= visibleCount;
      });

      const hasMore =
        filteredCards.length > visibleCount;

      if (moreSection) {
        moreSection.hidden = !hasMore;
      }

      if (moreButton) {
        moreButton.hidden = !hasMore;

        const remaining =
          filteredCards.length - visibleCount;

        moreButton.innerHTML =
          remaining > 0
            ? 'See more art <span aria-hidden="true">↓</span>'
            : 'All caught up <span aria-hidden="true">✳</span>';
      }
    }

    filterButtons.forEach(button => {

      button.addEventListener("click", () => {

        activeFilter = button.dataset.filter || "all";
        visibleCount = batchSize;

        filterButtons.forEach(item => {
          const isActive = item === button;

          item.classList.toggle("is-active", isActive);

          item.setAttribute(
            "aria-pressed",
            String(isActive)
          );
        });

        updateGallery();
      });
    });

    if (moreButton) {
      moreButton.addEventListener("click", () => {

        visibleCount += batchSize;

        updateGallery();
      });
    }

    updateGallery();
  }


  /* ----------------------------------------------------------
     4. ARTWORK LIGHTBOX
     ---------------------------------------------------------- */

  if (gallery) {

    const lightbox = document.createElement("div");

    lightbox.className = "art-lightbox";
    lightbox.id = "art-lightbox";
    lightbox.hidden = true;

    lightbox.innerHTML = `
      <div
        class="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
      >
        <button
          class="lightbox-close"
          type="button"
          aria-label="Close artwork preview"
        >
          ×
        </button>

        <div class="lightbox-artwork"></div>

        <div class="lightbox-information">
          <p class="eyebrow lightbox-artist"></p>
          <h2 id="lightbox-title"></h2>
          <p class="lightbox-description"></p>
        </div>
      </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxPanel =
      lightbox.querySelector(".lightbox-panel");

    const lightboxArtwork =
      lightbox.querySelector(".lightbox-artwork");

    const lightboxTitle =
      lightbox.querySelector("#lightbox-title");

    const lightboxArtist =
      lightbox.querySelector(".lightbox-artist");

    const lightboxDescription =
      lightbox.querySelector(".lightbox-description");

    const closeButton =
      lightbox.querySelector(".lightbox-close");

    let previouslyFocused = null;

    function closeLightbox() {

      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");

      if (previouslyFocused) {
        previouslyFocused.focus();
      }
    }

    function openLightbox(card) {

      const title =
        card.querySelector("h3")?.textContent.trim()
        || "Untitled artwork";

      const description =
        card.querySelector(".art-card-info p")
          ?.textContent.trim()
        || "An original piece from AEMI.";

      const artist =
        card.dataset.artist === "yua"
          ? "YUA / PAINTING"
          : "CJ / PENCIL DRAWING";

      const preview =
        card.querySelector(".art-preview");

      previouslyFocused = card;

      lightboxArtwork.replaceChildren();

      if (preview) {
        const previewCopy = preview.cloneNode(true);
        previewCopy.removeAttribute("id");
        lightboxArtwork.appendChild(previewCopy);
      }

      lightboxTitle.textContent = title;
      lightboxArtist.textContent = artist;
      lightboxDescription.textContent = description;

      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");

      closeButton.focus();
    }

    gallery.querySelectorAll(".art-card").forEach(card => {

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      card.setAttribute(
        "aria-label",
        `View ${card.querySelector("h3")?.textContent || "artwork"}`
      );

      card.addEventListener("click", () => {
        openLightbox(card);
      });

      card.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openLightbox(card);
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", event => {

      if (lightbox.hidden) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "Tab") {

        const focusable = [
          closeButton
        ];

        const first = focusable[0];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    });

  }


  /* ----------------------------------------------------------
     5. COMMISSION INQUIRY
     ---------------------------------------------------------- */

  const commissionForm =
    document.getElementById("commission-form");

  const formHint =
    document.getElementById("form-hint");

  if (commissionForm) {

    commissionForm.addEventListener("submit", async event => {

      event.preventDefault();

      if (!commissionForm.reportValidity()) return;

      const formData = new FormData(commissionForm);

      const name =
        String(formData.get("name") || "").trim();

      const contact =
        String(formData.get("contact") || "").trim();

      const artist =
        String(formData.get("artist") || "").trim();

      const details =
        String(formData.get("details") || "").trim();

      if (!name || !contact || !artist || !details) {
        if (formHint) {
          formHint.textContent =
            "Please complete all fields before preparing your inquiry.";
        }
        return;
      }

      const message = [
        "Hello, AEMI! I'd like to ask about a commission.",
        "",
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Preferred artist: ${artist}`,
        "",
        "My idea:",
        details
      ].join("\n");

      const messengerURL = "https://m.me/aemii.co";

      let copied = false;

      try {

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(message);
          copied = true;
        }

      } catch (error) {
        copied = false;
      }

      if (!copied) {

        const temporaryField =
          document.createElement("textarea");

        temporaryField.value = message;
        temporaryField.style.position = "fixed";
        temporaryField.style.opacity = "0";

        document.body.appendChild(temporaryField);

        temporaryField.select();

        try {
          copied = document.execCommand("copy");
        } catch (error) {
          copied = false;
        }

        temporaryField.remove();
      }

      if (formHint) {

        formHint.textContent = copied
          ? "Your inquiry has been copied. Messenger will open next — paste your message into the chat and send it."
          : "Messenger will open. Please copy your inquiry details before sending your message.";

      }

      window.open(
        messengerURL,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }

});
