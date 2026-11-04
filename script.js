
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
     4. INDIVIDUAL ARTWORK PAGES
     ---------------------------------------------------------- */

  if (gallery) {

    const artworkIds = {
      "Blue Hour Study": "blue-hour-study",
      "Soft Focus": "soft-focus",
      "Sun on the Windowsill": "sun-on-the-windowsill",
      "Something in Bloom": "something-in-bloom",
      "After the Rain": "after-the-rain",
      "In the Margins": "in-the-margins"
    };

    gallery.querySelectorAll(".art-card").forEach(card => {

      const title =
        card.querySelector("h3")?.textContent.trim();

      const artworkId =
        card.dataset.artworkId || artworkIds[title];

      if (!artworkId) return;

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "link");

      card.setAttribute(
        "aria-label",
        `Open ${title || "artwork"} artwork page`
      );

      function openArtwork() {
        window.location.href =
          `artwork.html?id=${encodeURIComponent(artworkId)}`;
      }

      card.addEventListener("click", event => {

        if (event.target.closest("a, button")) return;

        openArtwork();

      });

      card.addEventListener("keydown", event => {

        if (event.key === "Enter") {
          event.preventDefault();
          openArtwork();
        }

      });

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
const messengerWindow = window.open(
  "https://m.me/aemii.co",
  "_blank"
);
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

     if (!messengerWindow) {
  formHint.textContent =
    "Your inquiry is ready. Please allow pop-ups to open Messenger.";
}

    });

  }

});
