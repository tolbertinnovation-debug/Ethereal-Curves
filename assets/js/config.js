/* =====================================================================
   ETHEREAL CURVES — STORE SETTINGS
   ---------------------------------------------------------------------
   This is the one file to edit for business details, delivery fees,
   payment numbers and promo codes. Products live in products.js.
   ===================================================================== */
window.STORE = {
  brand: "Ethereal Curves",
  tagline: "Luxury Designed For You",
  company: "The Ethereal Collective Inc",
  founder: "Musu Deshield Mitchell",

  // Phone numbers in international format, digits only (no + or spaces)
  whatsapp: "231886519747",          // orders are sent to this WhatsApp
  phones: ["231886519747", "231770267112"],
  email: "etherealcurves55@gmail.com",

  location: "Monrovia, Liberia",
  storeAddress: "Near the Kailondo Hotel, Old Road, Monrovia",
  hours: "9:00 AM – 8:00 PM",

  social: {
    instagram: "https://www.instagram.com/ethereal_curves1",
    facebook: "",
    tiktok: "https://www.tiktok.com/@etherealcurves"
  },

  /* ---------------- Currency ----------------
     Prices in products.js are in US dollars.
     Customers can switch the display to Liberian dollars.
     UPDATE lrdRate whenever the exchange rate moves. */
  currency: {
    lrdRate: 182.4,          // 1 USD = 182.4 LRD (mid-market, Oct 2026 — update regularly)
    default: "USD"           // "USD" or "LRD"
  },

  /* ---------------- Delivery ---------------- */
  freeDeliveryOver: 50,      // USD. Monrovia delivery is free above this
  delivery: [
    { id: "monrovia", label: "Delivery within Monrovia", note: "1 – 2 business days", fee: 5, freeEligible: true },
    { id: "pickup", label: "Pick up at our store", note: "Near the Kailondo Hotel, Old Road, Monrovia", fee: 0 },
    { id: "county", label: "Delivery outside Monrovia", note: "3 – 5 business days, all 15 counties", fee: 10 },
    { id: "international", label: "International shipping", note: "We'll send a shipping quote on WhatsApp", fee: null }
  ],

  /* ---------------- Payment ----------------
     Orange Money is switched off until the account is registered.
     To turn it back on, add an entry like this to the list below:
     { id: "orange", label: "Orange Money", color: "#ff7900", number: "07xxxxxxxx",
       accountName: "The Ethereal Collective Inc",
       steps: "Dial *144#, choose Transfer Money, send the total to the number above and use your order number as the reference." }, */
  payments: [
    {
      id: "mtn",
      label: "Lonestar MTN Mobile Money",
      color: "#ffcc00",
      number: "0555098503",
      accountName: "The Ethereal Collective Inc",
      steps: "Dial *156#, choose Transfer Money, send the total to the number above and use your order number as the reference."
    },
    {
      id: "ecobank",
      label: "Ecobank bank transfer",
      color: "#005a9c",
      bank: "Ecobank Liberia",
      accountName: "The Ethereal Collective",
      accounts: [
        { currency: "USD", label: "US Dollar account", number: "6103458881" },
        { currency: "LRD", label: "Liberian Dollar account", number: "610303458681" }
      ],
      steps: "Transfer the total to the Ecobank account in your chosen currency and use your order number as the reference. Then send a photo of your transfer slip to us on WhatsApp."
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      color: "#1c1714",
      steps: "Pay in cash (USD or LRD) when your order arrives. Available for Monrovia delivery and pickup."
    }
  ],

  /* ---------------- Promo codes ----------------
     type: "percent" or "fixed" (USD). Remove any you don't want. */
  promoCodes: {
    WELCOME10: { type: "percent", value: 10, label: "10% off your first order" }
  },

  /* ---------------- Newsletter ----------------
     Leave empty to collect sign-ups through WhatsApp.
     Or paste a form endpoint (Formspree, Mailchimp, etc.). */
  newsletterEndpoint: "",

  /* ---------------- Campaign ----------------
     Breast Cancer Awareness campaign + #Breasties raffle.
     It shows on the site until the end of "endsOn", then hides itself.
     raffleMin is in USD and counts the bag total after discounts,
     before delivery. */
  campaign: {
    title: "Love Your Breasts",
    tagline: "Your Girls Deserve the Best",
    honoree: "Dr. Nina Collins",
    hashtag: "#Breasties",
    raffleMin: 75,
    drawDate: "October 31, 2026",
    endsOn: "2026-10-31"
  },

  announcements: [
    "Free delivery in Monrovia on orders over $50",
    "Pay with Lonestar MTN MoMo, Ecobank transfer or cash on delivery",
    "New: The Ethereal Signature VIP Box — save $45",
    "New in: Plus Size Comfort Set & Minimizer Bras",
    "Use code WELCOME10 for 10% off your first order"
  ]
};
