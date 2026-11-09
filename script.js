
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
     3. GALLERY FILTERS + FAVORITES + SEE MORE
     ---------------------------------------------------------- */

  const gallery = document.getElementById("art-grid");
  const filterButtons = document.querySelectorAll(".filter-button");
  const moreSection = document.querySelector(".gallery-more");
  const moreButton = document.getElementById("see-more-art");
  const savedCount = document.getElementById("saved-count");

  const batchSize = 6;
  const STORAGE_KEY = "aemi-saved-artworks";

  let activeFilter = "all";
  let visibleCount = batchSize;
  let savedArtworks = [];

  try {
    savedArtworks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (!Array.isArray(savedArtworks)) savedArtworks = [];
  } catch (error) {
    savedArtworks = [];
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArtworks));
    } catch (error) {
      console.warn("Could not save favorites in this browser.", error);
    }
  }

  if (gallery) {
    const artworkCards = Array.from(
      gallery.querySelectorAll(".art-card")
    );

    const emptyMessage = document.createElement("p");
    emptyMessage.className = "favorites-empty";
    emptyMessage.textContent = "No saved artworks yet. Tap the heart on a piece you love.";
    emptyMessage.hidden = true;
    gallery.insertAdjacentElement("afterend", emptyMessage);

    function getArtworkTitle(card) {
      return card.querySelector("h3")?.textContent.trim() || "";
    }

    function updateFavoriteButtons() {
      artworkCards.forEach(card => {
        const title = getArtworkTitle(card);
        const isSaved = savedArtworks.includes(title);
        const info = card.querySelector(".art-card-info");

        if (!info) return;

        let button = info.querySelector(".favorite-button");

        if (!button) {
          button = document.createElement("button");
          button.type = "button";
          button.className = "favorite-button";
          button.addEventListener("click", event => {
            event.stopPropagation();

            const currentTitle = getArtworkTitle(card);
            const alreadySaved = savedArtworks.includes(currentTitle);

            savedArtworks = alreadySaved
              ? savedArtworks.filter(item => item !== currentTitle)
              : [...savedArtworks, currentTitle];

            saveFavorites();
            updateFavoriteButtons();
            updateGallery();
          });

          info.appendChild(button);
        }

        button.textContent = isSaved ? "♥ Saved" : "♡ Save";
        button.setAttribute("aria-pressed", String(isSaved));
        button.setAttribute(
          "aria-label",
          `${isSaved ? "Remove" : "Add"} ${title} ${isSaved ? "from" : "to"} favorites`
        );
      });

      if (savedCount) {
        savedCount.textContent = savedArtworks.length;
      }
    }

    function getFilteredCards() {
      return artworkCards.filter(card => {
        if (activeFilter === "saved") {
          return savedArtworks.includes(getArtworkTitle(card));
        }

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

      const hasMore = filteredCards.length > visibleCount;

      if (moreSection) {
        moreSection.hidden = !hasMore;
      }

      if (moreButton) {
        moreButton.hidden = !hasMore;

        const remaining = filteredCards.length - visibleCount;

        moreButton.innerHTML = remaining > 0
          ? 'See more art <span aria-hidden="true">↓</span>'
          : 'All caught up <span aria-hidden="true">✳</span>';
      }

      emptyMessage.hidden = !(activeFilter === "saved" && filteredCards.length === 0);
    }

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";
        visibleCount = batchSize;

        filterButtons.forEach(item => {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
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

    updateFavoriteButtons();
    updateGallery();


    /* ----------------------------------------------------------
       4. ARTWORK QUICK VIEW
       ---------------------------------------------------------- */

    const lightbox = document.getElementById("art-lightbox");
    const lightboxArtwork = document.getElementById("lightbox-artwork");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxArtist = document.getElementById("lightbox-artist");
    const lightboxDescription = document.getElementById("lightbox-description");
    const lightboxFullPage = document.getElementById("lightbox-full-page");
    const lightboxClose = document.getElementById("lightbox-close");

    const artworkIds = {
      "Blue Hour Study": "blue-hour-study",
      "Soft Focus": "soft-focus",
      "Sun on the Windowsill": "sun-on-the-windowsill",
      "Something in Bloom": "something-in-bloom",
      "After the Rain": "after-the-rain",
      "In the Margins": "in-the-margins"
    };

    function closeLightbox() {
      if (!lightbox) return;

      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
    }

    function openLightbox(card) {
      if (!lightbox) return;

      const title = getArtworkTitle(card) || "Untitled artwork";
      const artist = card.dataset.artist === "yua" ? "YUA" : "CJ";
      const artworkId = card.dataset.artworkId || artworkIds[title];
      const preview = card.querySelector(".art-preview");

      lightboxTitle.textContent = title;
      lightboxArtist.textContent = artist + " · " +
        (artist === "YUA" ? "PAINTING" : "PENCIL DRAWING");

      lightboxDescription.textContent =
        "Take a closer look at this piece from the AEMI gallery. Visit its artwork page for more details.";

      lightboxArtwork.innerHTML = "";

      if (preview) {
        const previewCopy = preview.cloneNode(true);
        previewCopy.querySelector(".preview-placeholder")?.remove();
        lightboxArtwork.appendChild(previewCopy);
      }

      lightboxFullPage.href = artworkId
        ? `artwork.html?id=${encodeURIComponent(artworkId)}`
        : "#";

      lightboxFullPage.hidden = !artworkId;

      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxClose?.focus();
    }

    artworkCards.forEach(card => {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      const title = getArtworkTitle(card);

      card.setAttribute("aria-label", `Preview ${title || "artwork"}`);

      card.addEventListener("click", event => {
        if (event.target.closest("a, button")) return;
        openLightbox(card);
      });

      card.addEventListener("keydown", event => {
        if (
          (event.key === "Enter" || event.key === " ") &&
          event.target === card
        ) {
          event.preventDefault();
          openLightbox(card);
        }
      });
    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && lightbox && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }


 
  /* ----------------------------------------------------------
     5. COMMISSION INQUIRY — SUPABASE CONNECTION
     ---------------------------------------------------------- */

  const commissionForm =
    document.getElementById("commission-form");

  const formHint =
    document.getElementById("form-hint");

  const CREATE_COMMISSION_URL =
    "https://sonoqrxbbowgmidzhiwi.supabase.co/functions/v1/create-commission";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_DTd8ysaf9mkHpbzJXGInPA_mkgjWKwO";

  if (commissionForm) {
    let isSubmitting = false;

    let resultPanel = document.getElementById(
      "commission-result"
    );

    if (!resultPanel) {
      resultPanel = document.createElement("section");
      resultPanel.id = "commission-result";
      resultPanel.hidden = true;
      resultPanel.setAttribute("aria-live", "polite");
      resultPanel.style.cssText = [
        "margin-top:24px",
        "padding:22px",
        "background:#edf5f7",
        "border:1px solid #b9d8e3",
        "color:#26383e",
        "line-height:1.7"
      ].join(";");

      commissionForm.insertAdjacentElement(
        "afterend",
        resultPanel
      );
    }

    commissionForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (isSubmitting) return;
      if (!commissionForm.reportValidity()) return;

      const formData = new FormData(commissionForm);

      const name = String(formData.get("name") || "").trim();
      const contact = String(formData.get("contact") || "").trim();
      const selectedArtist = String(formData.get("artist") || "").trim();
      const budget = String(formData.get("budget") || "").trim();
      const details = String(formData.get("details") || "").trim();

      const preferredArtist = selectedArtist.startsWith("Yua")
        ? "Yua"
        : selectedArtist.startsWith("CJ")
          ? "CJ"
          : "";

      if (!name || !contact || !preferredArtist || !details) {
        if (formHint) {
          formHint.textContent =
            "Please complete all required fields and select an artist.";
        }
        return;
      }

      const commissionDetails = [
        details,
        budget ? `Preferred budget: ${budget}` : ""
      ].filter(Boolean).join("\n\n");

      const submitButton = commissionForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      const originalButtonText = submitButton
        ? (submitButton.tagName === "INPUT"
            ? submitButton.value
            : submitButton.textContent)
        : "";

      isSubmitting = true;

      if (submitButton) {
        submitButton.disabled = true;

        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Submitting...";
        } else {
          submitButton.textContent = "Submitting...";
        }
      }

      if (formHint) {
        formHint.textContent =
          "Please wait while we securely submit your inquiry...";
      }

      resultPanel.hidden = true;
      resultPanel.innerHTML = "";

      try {
        const response = await fetch(CREATE_COMMISSION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_PUBLISHABLE_KEY
          },
          body: JSON.stringify({
            client_name: name,
            client_contact: contact,
            preferred_artist: preferredArtist,
            commission_details: commissionDetails
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || result.message ||
            "We couldn't submit your inquiry. Please try again."
          );
        }

        if (!result.reference || !result.accessCode) {
          throw new Error(
            "The inquiry was submitted, but the tracking details were missing. Please contact AEMI before submitting again."
          );
        }

        const heading = document.createElement("h3");
        heading.textContent = "Your inquiry has been received.";

        const explanation = document.createElement("p");
        explanation.textContent =
          "Keep these tracking details somewhere private. You'll need both to check your commission's progress.";

        const referenceLabel = document.createElement("p");
        referenceLabel.textContent = "Your tracking reference";

        const referenceValue = document.createElement("strong");
        referenceValue.textContent = result.reference;

        const accessLabel = document.createElement("p");
        accessLabel.textContent = "Your private access code";

        const accessValue = document.createElement("strong");
        accessValue.textContent = result.accessCode;

        const warning = document.createElement("p");
        warning.textContent =
          "Important: Save both details now. Your access code will not be shown again after you leave this page.";

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "button button-dark";
        copyButton.textContent = "Copy tracking details";

        copyButton.addEventListener("click", async () => {
          const credentials =
            `AEMI ART SPACE — COMMISSION TRACKING\n` +
            `Reference: ${result.reference}\n` +
            `Access code: ${result.accessCode}`;

          try {
            await navigator.clipboard.writeText(credentials);
            copyButton.textContent = "Copied! ✓";
          } catch (error) {
            copyButton.textContent =
              "Please copy the details manually";
          }
        });

        const trackerLink = document.createElement("a");
        trackerLink.href = "track-commission.html";
        trackerLink.textContent = "Go to commission tracking";

        resultPanel.append(
          heading,
          explanation,
          referenceLabel,
          referenceValue,
          accessLabel,
          accessValue,
          warning,
          copyButton,
          document.createElement("br"),
          trackerLink
        );

        resultPanel.hidden = false;

        if (formHint) {
          formHint.textContent =
            "Submission successful. Your tracking details are shown below.";
        }

        commissionForm.reset();

        resultPanel.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      } catch (error) {
        if (formHint) {
          formHint.textContent =
            error.message ||
            "Something went wrong. Please try again.";
        }

      } finally {
        isSubmitting = false;

        if (submitButton) {
          submitButton.disabled = false;

          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalButtonText;
          } else {
            submitButton.textContent = originalButtonText;
          }
        }
      }
    });
  }

});
