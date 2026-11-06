
/* ============================================================
   AEMI ART SPACE — INDIVIDUAL ARTWORK PAGES
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. ARTWORK COLLECTION
     Add new artworks and edit their details here.
     ---------------------------------------------------------- */

  const artworks = {

    "blue-hour-study": {
      title: "Blue Hour Study",
      artist: "Yua",
      category: "Original Painting",
      medium: "Painting",
      year: "2026",
      description:
        "An original painting by Yua. A little study of color, atmosphere, and the feelings found in quiet moments.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "Blue Hour Study, an original painting by Yua"
    },

    "soft-focus": {
      title: "Soft Focus",
      artist: "CJ",
      category: "Pencil Drawing",
      medium: "Graphite pencil",
      year: "2026",
      description:
        "A pencil drawing by CJ, exploring delicate lines, expression, and the beauty of little details.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "Soft Focus, a pencil drawing by CJ"
    },

    "sun-on-the-windowsill": {
      title: "Sun on the Windowsill",
      artist: "Yua",
      category: "Original Painting",
      medium: "Painting",
      year: "2026",
      description:
        "An original painting by Yua, inspired by the warmth and stillness of an ordinary afternoon.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "Sun on the Windowsill, an original painting by Yua"
    },

    "something-in-bloom": {
      title: "Something in Bloom",
      artist: "CJ",
      category: "Pencil Drawing",
      medium: "Graphite pencil",
      year: "2026",
      description:
        "A pencil drawing by CJ, inspired by the quiet beauty of flowers and things slowly coming into bloom.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "Something in Bloom, a pencil drawing by CJ"
    },

    "after-the-rain": {
      title: "After the Rain",
      artist: "Yua",
      category: "Original Painting",
      medium: "Painting",
      year: "2026",
      description:
        "An original painting by Yua, inspired by the calm that follows a passing rain.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "After the Rain, an original painting by Yua"
    },

    "in-the-margins": {
      title: "In the Margins",
      artist: "CJ",
      category: "Pencil Drawing",
      medium: "Graphite pencil",
      year: "2026",
      description:
        "A pencil drawing by CJ, celebrating the little sketches and thoughts that find their way into the margins.",
      story: "",
      status: "Details soon",
      image: "",
      imageAlt: "In the Margins, a pencil drawing by CJ"
    }

  };


  /* ----------------------------------------------------------
     2. GET SELECTED ARTWORK
     ---------------------------------------------------------- */

  const params = new URLSearchParams(window.location.search);
  const artworkId = params.get("id");
  const artwork = artworks[artworkId];

  const content = document.getElementById("artwork-content");
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (!content) return;


  /* ----------------------------------------------------------
     3. HANDLE UNKNOWN ARTWORK
     ---------------------------------------------------------- */

  if (!artwork) {
    document.title = "Artwork Not Found | AEMI Art Space";

    content.innerHTML = `
      <div class="artwork-not-found">
        <p class="eyebrow">AEMI / THE GALLERY</p>
        <h1>We couldn't find this piece.</h1>
        <p>
          This artwork may have moved, or the link may be incorrect.
        </p>
        <a class="button button-dark" href="index.html#gallery">
          Return to gallery ↗
        </a>
      </div>
    `;

    return;
  }


  /* ----------------------------------------------------------
     4. PAGE INFORMATION AND ARTIST THEME
     ---------------------------------------------------------- */

  document.title =
    `${artwork.title} by ${artwork.artist} | AEMI Art Space`;

  document.body.classList.add(
    artwork.artist.toLowerCase() === "yua"
      ? "artist-yua"
      : "artist-cj"
  );

  const descriptionMeta =
    document.querySelector('meta[name="description"]');

  if (descriptionMeta) {
    descriptionMeta.content =
      `${artwork.title}, ${artwork.category} by ${artwork.artist} at AEMI Art Space.`;
  }


  /* ----------------------------------------------------------
     5. IMAGE DISPLAY
     ---------------------------------------------------------- */

  const imageMarkup = artwork.image
    ? `
      <img
        class="artwork-main-image"
        src="${artwork.image}"
        alt="${artwork.imageAlt}"
      >
    `
    : `
      <div class="artwork-image-placeholder">
        <span>ARTWORK IMAGE</span>
        <p>The original artwork will be placed here.</p>
      </div>
    `;


  /* ----------------------------------------------------------
     6. MORE ARTWORKS BY THE SAME ARTIST
     ---------------------------------------------------------- */

  const moreArtworks = Object.entries(artworks)
    .filter(([id, item]) =>
      id !== artworkId && item.artist === artwork.artist
    );

  const moreMarkup = moreArtworks.length
    ? moreArtworks.map(([id, item]) => `
        <a
          class="artwork-more-card"
          href="artwork.html?id=${id}"
        >
          <span class="artwork-more-category">
            ${item.category}
          </span>
          <h3>${item.title}</h3>
          <span class="artwork-more-link">
            Explore artwork ↗
          </span>
        </a>
      `).join("")
    : `
      <p>More works from this artist are coming soon.</p>
    `;


  /* ----------------------------------------------------------
     7. STORY SECTION
     ---------------------------------------------------------- */

  const storyMarkup = artwork.story
    ? artwork.story
    : "The artist's personal note about this piece will be added soon.";


  /* ----------------------------------------------------------
     8. DISPLAY THE ARTWORK PAGE
     ---------------------------------------------------------- */

  content.innerHTML = `

    <div class="artwork-detail-grid">

      <div class="artwork-visual">
        ${imageMarkup}
      </div>

      <div class="artwork-information">

        <p class="eyebrow">
          AEMI / ${artwork.artist.toUpperCase()}
        </p>

        <h1 id="artwork-title">
          ${artwork.title}
        </h1>

        <p class="artwork-category">
          ${artwork.category}
        </p>

        <div class="artwork-divider"></div>

        <p class="artwork-description">
          ${artwork.description}
        </p>

        <div class="artwork-metadata">

          <div>
            <span>ARTIST</span>
            <strong>${artwork.artist}</strong>
          </div>

          <div>
            <span>MEDIUM</span>
            <strong>${artwork.medium}</strong>
          </div>

          <div>
            <span>YEAR</span>
            <strong>${artwork.year}</strong>
          </div>

          <div>
            <span>AVAILABILITY</span>
            <strong>${artwork.status}</strong>
          </div>

        </div>

        <div class="artwork-actions">

          <a
            class="button button-dark artwork-inquiry"
            href="https://m.me/aemii.co?text=${encodeURIComponent(
              `Hello AEMI! I would like to inquire about "${artwork.title}" by ${artwork.artist}.`
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inquire about this piece ↗
          </a>

          <button
            class="button button-dark artwork-share"
            id="share-artwork"
            type="button"
          >
            Share this artwork ↗
          </button>

        </div>

        <p
          class="artwork-share-message"
          id="share-message"
          aria-live="polite"
        ></p>

        <a
          class="text-link artwork-back-link"
          href="index.html#gallery"
        >
          ← Back to all artworks
        </a>

      </div>

    </div>


    <div class="artwork-extra">

      <section class="artwork-extra-section artwork-story">

        <p class="eyebrow">A CLOSER LOOK</p>

        <h2>The story behind the piece</h2>

        <p>${storyMarkup}</p>

      </section>


      <section class="artwork-extra-section">

        <p class="eyebrow">THE DETAILS</p>

        <h2>A little more about this work</h2>

        <div class="artwork-facts">

          <div class="artwork-fact">
            <span>Artwork</span>
            <strong>${artwork.title}</strong>
          </div>

          <div class="artwork-fact">
            <span>Created by</span>
            <strong>${artwork.artist}</strong>
          </div>

          <div class="artwork-fact">
            <span>Medium</span>
            <strong>${artwork.medium}</strong>
          </div>

          <div class="artwork-fact">
            <span>Year</span>
            <strong>${artwork.year}</strong>
          </div>

        </div>

      </section>


      <section class="artwork-extra-section artwork-more">

        <p class="eyebrow">KEEP EXPLORING</p>

        <h2>More from ${artwork.artist}</h2>

        <div class="artwork-more-grid">
          ${moreMarkup}
        </div>

      </section>


      <div class="artwork-bottom-link">

  <p>Every piece has its own little story.</p>

  <a
    class="artwork-gallery-button"
    href="index.html#gallery"
  >
    Explore the AEMI gallery
    <span aria-hidden="true">↗</span>
  </a>

</div>

  `;


  /* ----------------------------------------------------------
     9. SHARE BUTTON
     ---------------------------------------------------------- */

  const shareButton = document.getElementById("share-artwork");
  const shareMessage = document.getElementById("share-message");

  if (shareButton) {
    shareButton.addEventListener("click", async () => {

      const shareData = {
        title: `${artwork.title} | AEMI Art Space`,
        text: `Take a look at "${artwork.title}" by ${artwork.artist}.`,
        url: window.location.href
      };

      try {

        if (navigator.share) {
          await navigator.share(shareData);

          if (shareMessage) {
            shareMessage.textContent = "Thanks for sharing this artwork!";
          }

        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);

          if (shareMessage) {
            shareMessage.textContent = "Artwork link copied!";
          }

        } else {
          window.prompt("Copy this artwork link:", window.location.href);
        }

      } catch (error) {

        if (error.name !== "AbortError" && shareMessage) {
          shareMessage.textContent =
            "Sharing wasn't available. You can copy the page link from your browser.";
        }

      }

    });
  }

});
