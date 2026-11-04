
/* ============================================================
   AEMI ART SPACE — INDIVIDUAL ARTWORK PAGES
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. ARTWORK COLLECTION
     Add new artworks here as your gallery grows.
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


  /* ----------------------------------------------------------
     3. HANDLE UNKNOWN ARTWORK
     ---------------------------------------------------------- */

  if (!artwork) {

    document.title = "Artwork Not Found | AEMI Art Space";

    if (content) {
      content.innerHTML = `
        <div class="artwork-not-found">
          <p class="eyebrow">AEMI / THE GALLERY</p>

          <h1>We couldn't find this piece.</h1>

          <p>
            This artwork may have moved, or the link may be incorrect.
          </p>

          <a class="button button-dark"
             href="index.html#gallery">
            Return to gallery ↗
          </a>
        </div>
      `;
    }

    return;
  }


  /* ----------------------------------------------------------
     4. UPDATE PAGE INFORMATION
     ---------------------------------------------------------- */

  document.title =
    `${artwork.title} by ${artwork.artist} | AEMI Art Space`;

  const descriptionMeta =
    document.querySelector('meta[name="description"]');

  if (descriptionMeta) {
    descriptionMeta.content =
      `${artwork.title}, ${artwork.category} by ${artwork.artist} at AEMI Art Space.`;
  }


  /* ----------------------------------------------------------
     5. DISPLAY ARTWORK
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
        <p>We’ll place the original artwork here.</p>
      </div>
    `;


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

        <a
          class="button button-dark artwork-inquiry"
          href="https://m.me/aemii.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inquire about this piece ↗
        </a>

        <a
          class="text-link artwork-back-link"
          href="index.html#gallery"
        >
          ← Back to all artworks
        </a>

      </div>

    </div>

  `;

});
