/* ============================================================
   AEMI EDITABLE SETTINGS
   Change the values below when AEMI's information changes.
   ============================================================ */

const AEMI = {
  businessName: "AEMI",
  tagline: "A Little Heat. A Lot of Flavor.",
  heroDescription: "Bold, savory flavor made to elevate everyday meals.",

  product: {
    name: "AEMI Chili Garlic Oil",
    description: "A savory, aromatic blend of garlic, chili, and balanced seasonings, made for rice, noodles, meats, snacks, and everyday meals.",
    ingredients: "Garlic · Chili · Oyster Sauce · Black Pepper · Salt · Brown Sugar",
    availability: "COMING SOON",
    sizes: [
      { label: "60 mL", price: null },
      { label: "120 mL", price: null }
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
    usualTime: "2–3 days depending on location",
    feeNote: "Delivery fee depends on location."
  },

  pickup: {
    available: true,
    location: "Tartaria, Silang, Cavite · De Leon Compound · Sta. Rosa–Tagaytay Road",
    schedule: "By arrangement / prior negotiation"
  },

  contact: {
    email: "", // Put AEMI's email here later.
    phone: ""  // Put AEMI's contact number here later.
  },

  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
    messenger: ""
  }
};

/* ============================================================
   WEBSITE LOGIC — normally you don't need to edit below here.
   ============================================================ */

document.title = `${AEMI.businessName} | Chili Garlic Oil`;
document.getElementById("tagline").innerHTML = AEMI.tagline.replace(". ", ".<br>");
document.getElementById("heroDescription").textContent = AEMI.heroDescription;
document.getElementById("productName").textContent = AEMI.product.name;
document.getElementById("productDescription").textContent = AEMI.product.description;
document.getElementById("ingredients").textContent = AEMI.product.ingredients;
document.getElementById("availability").textContent = AEMI.product.availability;
document.getElementById("aboutText").textContent = AEMI.aboutText;
document.getElementById("pickupLocation").textContent = AEMI.pickup.location;

const sizeText = AEMI.product.sizes.map(item => item.label).join(" · ");
document.getElementById("sizes").textContent = sizeText;

const productSelect = document.getElementById("productSelect");
AEMI.product.sizes.forEach((item, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = item.price == null ? `${item.label} — Price TBD` : `${item.label} — ₱${item.price}`;
  productSelect.appendChild(option);
});
const quantityInput = document.getElementById("quantity");
const orderSummary = document.getElementById("orderSummary");

function updateOrderSummary() {
  const selectedIndex = Number(productSelect.value);
  const selectedSize = AEMI.product.sizes[selectedIndex];
  const quantity = quantityInput.value || 1;

  if (selectedSize) {
    orderSummary.textContent = `${selectedSize.label} × ${quantity}`;
  }
}
productSelect.addEventListener("change", updateOrderSummary);
quantityInput.addEventListener("input", updateOrderSummary);

updateOrderSummary();
const emailLine = document.getElementById("emailLine");
if (AEMI.contact.email) emailLine.textContent = `Email: ${AEMI.contact.email}`;

["facebook", "instagram", "tiktok", "messenger"].forEach(id => {
  const link = document.getElementById(id);
  if (AEMI.socials[id]) {
    link.href = AEMI.socials[id];
  } else {
    link.href = "#";
    link.addEventListener("click", e => {
      e.preventDefault();
      alert("AEMI's social account is coming soon.");
    });
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
const fulfillmentSelect = document.querySelector('select[name="fulfillment"]');
const addressLabel = document.getElementById("addressLabel");
const addressField = document.getElementById("addressField");

fulfillmentSelect.addEventListener("change", () => {
  if (fulfillmentSelect.value === "Delivery") {
    addressLabel.firstChild.textContent = "Delivery address";
    addressField.placeholder = "Enter your complete delivery address";
    addressField.required = true;
  } else if (fulfillmentSelect.value === "Pickup") {
    addressLabel.firstChild.textContent = "Pickup details";
    addressField.placeholder = "Preferred pickup time or other pickup details";
    addressField.required = false;
  } else {
    addressLabel.firstChild.textContent = "Address / pickup details";
    addressField.placeholder = "";
    addressField.required = true;
  }
});
  } else {
    addressLabel.firstChild.textContent = "Address / pickup details";
    addressField.placeholder = "";
    addressField.required = true;
  }
});
