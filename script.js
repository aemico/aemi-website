
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

  const artistInstagram = {
    "Yua — painting": "https://ig.me/m/yxuas_",
    "CJ — pencil drawing": "https://ig.me/m/artby_cjj"
  };

  if (commissionForm) {

    commissionForm.addEventListener("submit", async event => {

      event.preventDefault();

      if (!commissionForm.reportValidity()) return;

      const formData = new FormData(commissionForm);

      const name = String(formData.get("name") || "").trim();
      const contact = String(formData.get("contact") || "").trim();
      const artist = String(formData.get("artist") || "").trim();
      const budget = String(formData.get("budget") || "").trim();
      const details = String(formData.get("details") || "").trim();

      if (!name || !contact || !artist || !details) {
        if (formHint) {
          formHint.textContent =
            "Please complete all required fields before continuing.";
        }
        return;
      }

      const instagramURL = artistInstagram[artist];

      if (!instagramURL) {
        if (formHint) {
          formHint.textContent = "Please choose a valid artist.";
        }
        return;
      }

      const artistName = artist.startsWith("Yua") ? "Yua" : "CJ";

      const message = [
        `Hello ${artistName}! I'd like to ask about a commission.`,
        "",
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Preferred artist: ${artist}`,
        budget ? `Preferred budget: ${budget}` : "",
        "",
        "My idea:",
        details
      ].filter(line => line !== "").join("\n");

      // Create the message preview.
      let preview = document.getElementById("inquiry-preview");

      if (!preview) {
        preview = document.createElement("textarea");
        preview.id = "inquiry-preview";
        preview.readOnly = true;
        preview.setAttribute(
          "aria-label",
          "Your prepared commission inquiry"
        );

        preview.style.cssText =
          'width:100%;min-height:145px;margin-top:12px;padding:12px;border:1px solid #d8e3e2;background:#fffdf7;color:#26383e;font:12px/1.7 "DM Sans",Arial,sans-serif;resize:vertical;';

        if (formHint) {
          formHint.insertAdjacentElement("afterend", preview);
        } else {
          commissionForm.appendChild(preview);
        }
      }

      preview.value = message;

      // Create a manual copy button.
      let copyButton = document.getElementById("copy-inquiry");

      if (!copyButton) {
        copyButton = document.createElement("button");
        copyButton.id = "copy-inquiry";
        copyButton.type = "button";
        copyButton.className = "button button-dark";
        copyButton.style.marginTop = "12px";

        preview.insertAdjacentElement("afterend", copyButton);
      }

      copyButton.textContent = "Copy inquiry";

      // Manual copy fallback for mobile browsers.
      copyButton.onclick = async () => {
        try {
          if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard unavailable");
          }

          await navigator.clipboard.writeText(preview.value);
          copyButton.textContent = "Copied! ✓";

        } catch (error) {
          preview.focus();
          preview.select();
          preview.setSelectionRange(0, preview.value.length);

          copyButton.textContent =
            "Message selected — tap Copy";

          if (formHint) {
            formHint.textContent =
              "Your message is selected. Use your phone's Copy option, then paste it into Instagram.";
          }
        }
      };

      // Start copying while the original submit interaction is active.
      let copyPromise = null;
      let copied = false;

      try {
        if (navigator.clipboard?.writeText) {
          copyPromise = navigator.clipboard.writeText(message);
        } else {
          preview.focus();
          preview.select();
          copied = document.execCommand("copy");
        }
      } catch (error) {
        copied = false;
      }

      // Open Instagram immediately, without waiting for copying.
      const instagramWindow = window.open(
        instagramURL,
        "_blank"
      );

      // Finish checking the clipboard result.
      if (copyPromise) {
        try {
          await copyPromise;
          copied = true;
        } catch (error) {
          copied = false;
        }
      }

      if (formHint) {
        if (copied) {
          formHint.textContent =
            `Your inquiry is copied! Instagram is opening ${artistName}'s chat. Paste your message and send it.`;
          copyButton.textContent = "Copy again";
        } else {
          formHint.textContent =
            `Your inquiry is ready! If it wasn't copied automatically, use the Copy inquiry button below.`;
        }

        if (!instagramWindow) {
          formHint.textContent +=
            ` If Instagram did not open, tap here to open ${artistName}'s chat: `;

          const link = document.createElement("a");
          link.href = instagramURL;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Open Instagram";

          formHint.appendChild(link);
        }
      }

    });

  }

});
