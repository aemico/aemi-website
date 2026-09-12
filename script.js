/* ============================================================
   AEMI EDITABLE SETTINGS
   ============================================================ */

const AEMI = {

  businessName: "AEMI",

  tagline: "A Little Heat. A Lot of Flavor.",

  heroDescription:
    "Bold, savory flavor made to elevate everyday meals.",


  product: {

    name: "AEMI Chili Garlic Oil",

    description:
      "A savory, aromatic blend of garlic, chili, and balanced seasonings, made for rice, noodles, meats, snacks, and everyday meals.",

    ingredients:
      "Garlic · Chili · Oyster Sauce · Black Pepper · Salt · Brown Sugar",

    availability:
      "COMING SOON",

    sizes: [
      {
        label: "60 mL",
        price: null
      },
      {
        label: "120 mL",
        price: null
      }
    ]

  },


  aboutText: `AEMI started with two people, one recipe, and the idea of creating something of our own.

Our first batch was small, but it gave us a glimpse of what AEMI could become. People tried it, enjoyed it, and supported our little start.

But we also learned that making something good was only the beginning. We needed to do more than just make the product—we needed to build the brand behind it.

So, we started again.

AEMI Round 2 is our second try, this time with more planning, better systems, and a clearer vision of where we want to take it.

Still small. Still ours. But this time, we're building it with intention.`,


  delivery: {

    available: true,

    usualTime:
      "2–3 days depending on location",

    feeNote:
      "Delivery fee depends on location."

  },


  pickup: {

    available: true,

    location:
      "Tartaria, Silang, Cavite · De Leon Compound · Sta. Rosa–Tagaytay Road",

    schedule:
      "By arrangement / prior negotiation"

  },


  contact: {

    email: "",

    phone: ""

  },


 socials: {

  facebook: "https://www.facebook.com/share/1BaAQRDfad",

  instagram: "https://www.instagram.com/aemii_co",

  tiktok: "https://www.tiktok.com/@aemii.co",

  messenger: "https://m.me/aemii.co"

}

};


/* ============================================================
   BASIC WEBSITE CONTENT
   ============================================================ */

document.title =
  `${AEMI.businessName} | Chili Garlic Oil`;


const taglineElement =
  document.getElementById("tagline");

if (taglineElement) {

  taglineElement.innerHTML =
    AEMI.tagline.replace(
      ". ",
      ".<br>"
    );

}


const heroDescription =
  document.getElementById("heroDescription");

if (heroDescription) {

  heroDescription.textContent =
    AEMI.heroDescription;

}


const productName =
  document.getElementById("productName");

if (productName) {

  productName.textContent =
    AEMI.product.name;

}


const productDescription =
  document.getElementById("productDescription");

if (productDescription) {

  productDescription.textContent =
    AEMI.product.description;

}


const ingredients =
  document.getElementById("ingredients");

if (ingredients) {

  ingredients.textContent =
    AEMI.product.ingredients;

}


const availability =
  document.getElementById("availability");

if (availability) {

  availability.textContent =
    AEMI.product.availability;

}


const aboutText =
  document.getElementById("aboutText");

if (aboutText) {

  aboutText.textContent =
    AEMI.aboutText;

}


const pickupLocation =
  document.getElementById("pickupLocation");

if (pickupLocation) {

  pickupLocation.textContent =
    AEMI.pickup.location;

}


/* ============================================================
   PRODUCT SIZES
   ============================================================ */

const sizes =
  document.getElementById("sizes");

const productSelect =
  document.getElementById("productSelect");


if (sizes) {

  sizes.textContent =
    AEMI.product.sizes
      .map(item => item.label)
      .join(" · ");

}


if (productSelect) {

  AEMI.product.sizes.forEach(
    item => {

      const option =
        document.createElement("option");


      option.value =
        item.label;


      option.textContent =
        item.price == null
          ? `${item.label} — Price TBD`
          : `${item.label} — ₱${item.price}`;


      productSelect.appendChild(option);

    }
  );

}


/* ============================================================
   ORDER SUMMARY
   ============================================================ */

const quantityInput =
  document.getElementById("quantity");

const orderSummary =
  document.getElementById("orderSummary");


function updateOrderSummary() {

  if (
    !productSelect ||
    !quantityInput ||
    !orderSummary
  ) {

    return;

  }


  const selectedSize =
    productSelect.value;


  const quantity =
    quantityInput.value || 1;


  if (selectedSize) {

    orderSummary.textContent =
      `${selectedSize} × ${quantity}`;

  }

}


if (productSelect) {

  productSelect.addEventListener(
    "change",
    updateOrderSummary
  );

}


if (quantityInput) {

  quantityInput.addEventListener(
    "input",
    updateOrderSummary
  );

}


updateOrderSummary();


/* ============================================================
   CONTACT
   ============================================================ */

const emailLine =
  document.getElementById("emailLine");


if (
  emailLine &&
  AEMI.contact.email
) {

  emailLine.textContent =
    `Email: ${AEMI.contact.email}`;

}


/* ============================================================
   SOCIAL LINKS
   ============================================================ */

[
  "facebook",
  "instagram",
  "tiktok",
  "messenger"
].forEach(
  id => {

    const link =
      document.getElementById(id);


    if (!link) {
      return;
    }


    if (AEMI.socials[id]) {

      link.href =
        AEMI.socials[id];

    }

    else {

      link.href =
        "#";


      link.addEventListener(
        "click",
        event => {

          event.preventDefault();

          alert(
            "AEMI's social account is coming soon."
          );

        }
      );

    }

  }
);


/* ============================================================
   YEAR
   ============================================================ */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* ============================================================
   MOBILE MENU
   ============================================================ */

const menuToggle =
  document.querySelector(".menu-toggle");

const nav =
  document.getElementById("nav");


if (
  menuToggle &&
  nav
) {

  menuToggle.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );

}


/* ============================================================
   DELIVERY / PICKUP
   ============================================================ */

const fulfillmentSelect =
  document.getElementById("fulfillmentSelect");

const addressLabel =
  document.getElementById("addressLabel");

const addressField =
  document.getElementById("addressField");


if (
  fulfillmentSelect &&
  addressLabel &&
  addressField
) {

  fulfillmentSelect.addEventListener(
    "change",
    () => {

      if (
        fulfillmentSelect.value ===
        "Delivery"
      ) {

        addressLabel.childNodes[0].textContent =
          "Delivery address";

        addressField.placeholder =
          "Enter your complete delivery address";

        addressField.required =
          true;

      }


      else if (
        fulfillmentSelect.value ===
        "Pickup"
      ) {

        addressLabel.childNodes[0].textContent =
          "Pickup details";

        addressField.placeholder =
          "Preferred pickup time or other pickup details";

        addressField.required =
          false;

      }


      else {

        addressLabel.childNodes[0].textContent =
          "Address / pickup details";

        addressField.placeholder =
          "";

        addressField.required =
          true;

      }

    }
  );

}


/* ============================================================
   ORDER TRACKING
   ============================================================ */

const trackingForm =
  document.getElementById("trackingForm");

const orderNumberInput =
  document.getElementById("orderNumber");

const trackingResult =
  document.getElementById("trackingResult");


/*
 * CURRENT AEMI GOOGLE APPS SCRIPT WEB APP
 */

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbw_557rqSYN1cMQ_srMHtutr4TvYW6bkvbc8oJU6wNXxPgRjGFhGmadY7l0fZ66o7vo/exec";

if (trackingForm) {

  trackingForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const orderNumber =
        orderNumberInput.value
          .trim()
          .toUpperCase();


      if (!orderNumber) {

        return;

      }


      trackingResult.innerHTML = `
        <p>Checking your order...</p>
      `;


      const callbackName =
        "aemiTracking_" +
        Date.now();


      window[callbackName] =
        function (data) {


          if (!data.success) {

            trackingResult.innerHTML = `

              <div class="tracking-card">

                <h2>
                  Order Not Found
                </h2>

                <p>
                  We couldn't find that order number.
                  Please check it and try again.
                </p>

              </div>

            `;


            delete window[callbackName];

            return;

          }


          const fulfillment =
            String(
              data.fulfillment || ""
            ).toLowerCase();


          const status =
            String(
              data.status || "Pending"
            );


          let steps;


          if (
            fulfillment ===
            "delivery"
          ) {

            steps = [

              "Pending",

              "Confirmed",

              "Processing",

              "Out for Delivery",

              "Delivered"

            ];

          }

          else {

            steps = [

              "Pending",

              "Confirmed",

              "Ready for Pickup",

              "Picked Up"

            ];

          }


          const currentIndex =
            steps.indexOf(status);


          const timeline =
  steps
    .map(
      (step, index) => {

        let className = "";

        if (
          currentIndex >= 0 &&
          index < currentIndex
        ) {

          className = "completed";

        }

        else if (
          index === currentIndex
        ) {

          className = "current";

        }

        return `

          <div
            class="tracking-step ${className}"
          >

            <div class="tracking-dot">

              ${
                index < currentIndex
                  ? "✓"
                  : index === currentIndex
                    ? "●"
                    : ""
              }

            </div>

            <div class="tracking-label">

              <span>
                ${step}
              </span>

              ${
                index === currentIndex
                  ? `
                    <small class="tracking-active">
                      CURRENT STATUS
                    </small>
                  `
                  : ""
              }

            </div>

          </div>

        `;

      }
    )
    .join("");


          trackingResult.innerHTML = `

            <div class="tracking-card">

              <p class="eyebrow">
                ORDER NUMBER
              </p>


              <h2>
                ${data.orderNumber}
              </h2>


              <p>
                ${
                  fulfillment === "delivery"
                    ? "Delivery"
                    : "Pickup"
                }
              </p>


              <div class="tracking-timeline">

                ${timeline}

              </div>


              <p class="tracking-current">

                Current status:

                <strong>
                  ${status}
                </strong>

              </p>

            </div>

          `;


          delete window[callbackName];

        };


      const script =
        document.createElement(
          "script"
        );


      script.src =
        WEB_APP_URL +
        "?order=" +
        encodeURIComponent(
          orderNumber
        ) +
        "&callback=" +
        callbackName;


      script.onerror =
        function () {

          trackingResult.innerHTML = `

            <div class="tracking-card">

              <h2>
                Something went wrong
              </h2>

              <p>
                Please try again in a moment.
              </p>

            </div>

          `;


          delete window[callbackName];

        };


      document.body.appendChild(
        script
      );

    }
  );

}
