/* =====================================================================
   ETHEREAL CURVES — PRODUCT CATALOG
   ---------------------------------------------------------------------
   To add a product: copy one block, give it a new unique "id", change
   the text, price and images. Images live in assets/img/ — use the file
   name without ".webp" (each image also needs a small "-sm.webp" copy).

   Prices are in US dollars.
     compareAt: an optional old price to show a sale ("was $20").
     badge:     optional label — "New", "Bestseller", "Limited" …
     soldOut:   true hides the Add to Bag button.
   ===================================================================== */

window.CATEGORIES = [
  { id: "face", name: "Face", collection: "beauty", image: "found-compact", blurb: "Foundations & powders in shades made for melanin." },
  { id: "lips", name: "Lips", collection: "beauty", image: "lacquer", blurb: "Glosses, lacquers and lipsticks with high-shine attitude." },
  { id: "body", name: "Body Glow", collection: "beauty", image: "serum-model", blurb: "Shimmer that catches the light on every curve." },
  { id: "bras", name: "Bras", collection: "curves", image: "strapless-card", blurb: "Lift and support designed for fuller figures." },
  { id: "shapewear", name: "Shapewear", collection: "curves", image: "shapewear", blurb: "Seamless sculpting that feels as good as it looks." },
  { id: "intimates", name: "Intimates", collection: "curves", image: "travel", blurb: "Everyday softness, beautifully made." }
];

window.COLLECTIONS = [
  { id: "beauty", name: "Beauty", blurb: "Face, lips & body glow" },
  { id: "curves", name: "Curves", blurb: "Bras, shapewear & intimates" }
];

/* Shared shade families */
const FOUNDATION_SHADES = [
  { label: "Golden Silk", hex: "#d7ae84", depth: 1 },
  { label: "Caramel Veil", hex: "#c08a58", depth: 2 },
  { label: "Amber Suede", hex: "#a36c46", depth: 3 },
  { label: "Mocha Muse", hex: "#76503f", depth: 4 },
  { label: "Midnight Cocoa", hex: "#3f2b24", depth: 5 }
];

const BRA_BANDS = ["34", "36", "38", "40", "42", "44", "46"];
const BRA_CUPS = ["C", "D", "DD", "DDD/F", "G"];
const BODY_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

window.PRODUCTS = [
  /* ============================ LIPS ============================ */
  {
    id: "plump-shine-gloss",
    name: "Plump & Shine Lip Gloss",
    category: "lips",
    price: 15,
    badge: "Bestseller",
    bestseller: true,
    images: ["gloss-yg-card", "gloss-yg-poster", "gloss-yg-swatches"],
    short: "A cushiony, high-shine gloss that makes lips look fuller, hydrated and glossy — in 24 shades.",
    description: "Our signature plumping gloss glides on with a lightweight, non-sticky feel and a glass-like finish that lasts. Wear it alone for a juicy sheen or layer it over lipstick to turn the volume up.",
    benefits: ["Instant plumping — visibly fuller lips in seconds", "Hydrating & nourishing, keeps lips soft all day", "High-shine finish that lasts", "Non-sticky, lightweight formula", "Vegan & cruelty-free"],
    howTo: "Apply from the center of your lips outward. Layer for more shine, or tap over lipstick for dimension.",
    details: "24 shades · Square bottle with doe-foot applicator",
    claims: ["Vegan", "Cruelty free", "Plumping", "Long-lasting"],
    options: [{
      name: "Shade", type: "swatch", values: [
        { label: "YG01 · Flame Red", hex: "#cf2f2a" }, { label: "YG02 · Raspberry", hex: "#ad2340" },
        { label: "YG03 · Coral Red", hex: "#df4649" }, { label: "YG04 · Tangerine", hex: "#df6238" },
        { label: "YG05 · Pink Coral", hex: "#e05266" }, { label: "YG06 · Petal Pink", hex: "#d98a97" },
        { label: "YG07 · Salmon", hex: "#ea6b62" }, { label: "YG08 · Hot Pink", hex: "#d83f6e" },
        { label: "YG09 · Mauve Nude", hex: "#c68886" }, { label: "YG10 · Plum", hex: "#8c2954" },
        { label: "YG11 · Peach Nude", hex: "#db8d85" }, { label: "YG12 · Blush Nude", hex: "#e5a29c" },
        { label: "YG13 · Cinnamon", hex: "#b57762" }, { label: "YG14 · Burnt Orange", hex: "#cf663d" },
        { label: "YG15 · Mocha Mauve", hex: "#8a595d" }, { label: "YG16 · Berry Mauve", hex: "#9b495c" },
        { label: "YG17 · Wine", hex: "#7b1a22" }, { label: "YG18 · Poppy", hex: "#d7382b" },
        { label: "YG19 · Magenta", hex: "#c01e6c" }, { label: "YG20 · Bubblegum", hex: "#df4f87" },
        { label: "YG21 · Violet", hex: "#a34cbf" }, { label: "YG22 · Rosewood", hex: "#d57979" },
        { label: "YG23 · Watermelon", hex: "#df606d" }, { label: "YG24 · True Red", hex: "#d32a24" }
      ]
    }]
  },
  {
    id: "charm-gloss",
    name: "Charm Lip Gloss with Keychain",
    category: "lips",
    price: 15,
    badge: "New",
    isNew: true,
    images: ["gloss-cc-card", "gloss-cc-poster"],
    short: "Waterproof, long-lasting shine in a cute clip-on tube — take your gloss everywhere.",
    description: "A smooth, non-sticky gloss that delivers high shine for fuller-looking lips, in a heart-topped tube with a charm keychain. Clip it to your bag, keys or belt loop and shine confidently, naturally you.",
    benefits: ["Glossy & plumping finish", "Waterproof & long-lasting", "Lightweight, non-greasy texture", "Keeps lips soft and moisturized", "Portable keychain design"],
    howTo: "Swipe across clean lips. Reapply on the go — it's always on your keys.",
    details: "24 shades — the first 12 are shown here. Ask us on WhatsApp for CC13 – CC24.",
    claims: ["Waterproof", "Non-sticky", "Hydrating"],
    options: [{
      name: "Shade", type: "swatch", values: [
        { label: "CC01 · Crystal Nude", hex: "#e3b4a7" }, { label: "CC02 · Rose Nude", hex: "#c3867d" },
        { label: "CC03 · Pink Sand", hex: "#dd9f93" }, { label: "CC04 · Coral Kiss", hex: "#e67879" },
        { label: "CC05 · Cherry Pop", hex: "#df4954" }, { label: "CC06 · Toffee", hex: "#a8705b" },
        { label: "CC07 · Red Carpet", hex: "#d41f26" }, { label: "CC08 · Berry Crush", hex: "#c22353" },
        { label: "CC09 · Caramel", hex: "#a5603b" }, { label: "CC10 · Flame", hex: "#e1472a" },
        { label: "CC11 · Violet Dream", hex: "#9f44c3" }, { label: "CC12 · Mocha Shimmer", hex: "#9d7365" }
      ]
    }]
  },
  {
    id: "luxe-lip-lacquer",
    name: "Luxe Lip Lacquer",
    category: "lips",
    price: 18,
    images: ["lacquer"],
    short: "A velvet-matte liquid colour with full, one-swipe pigment and a gold signature cap.",
    description: "Luxe Lip Lacquer delivers bold, saturated colour in a single stroke and sets to a soft, comfortable matte. Precise applicator, rich pigment, zero compromise.",
    benefits: ["Full-coverage, one-swipe pigment", "Soft velvet-matte finish", "Comfortable, lightweight wear", "Precision applicator"],
    howTo: "Outline the lips with the tip of the applicator, then fill in. Let set for 30 seconds before pressing lips together.",
    details: "Shade #24 shown. More shades available — message us on WhatsApp.",
    claims: ["Matte", "Long-wear"],
    options: [{ name: "Shade", type: "swatch", values: [{ label: "#24 · Signature Red", hex: "#d2321f" }] }]
  },
  {
    id: "signature-liquid-lip",
    name: "Signature Liquid Lip",
    category: "lips",
    price: 16,
    images: ["liquid-lip"],
    short: "Choose your finish: a matte liquid lipstick or a luminous lip gloss. 0.23 fl oz / 6 ml.",
    description: "One shade story, two moods. The Matte Liquid Lipstick sets to a smooth, transfer-resistant finish, while the Luminous Lip Gloss wraps lips in a radiant, cushiony shine. Both arrive in our black-and-gold signature box.",
    benefits: ["Matte or luminous finish", "Rich, even colour payoff", "Comfortable on the lips", "Gift-ready black & gold packaging"],
    howTo: "Apply from the center of the lips outward. For matte, allow to set before blotting.",
    details: "0.23 fl oz · 6 ml",
    claims: ["Gift-ready"],
    options: [
      { name: "Finish", type: "button", values: [{ label: "Matte Liquid Lipstick" }, { label: "Luminous Lip Gloss" }] },
      { name: "Shade", type: "swatch", values: [{ label: "VP06 · Terracotta", hex: "#c24d33" }] }
    ]
  },
  {
    id: "satin-lipstick",
    name: "Satin Bullet Lipstick",
    category: "lips",
    price: 18,
    images: ["satin-lip"],
    short: "A creamy, satin-finish lipstick in a pearl-white and gold case.",
    description: "Silky colour that melts onto the lips with a satin glow. The pearlescent case and gold detailing make it the lipstick you'll want to pull out in public.",
    benefits: ["Creamy satin finish", "Buildable colour", "Comfortable, cushiony feel", "Pearl & gold luxury case"],
    howTo: "Apply directly from the bullet, starting at the center of the lips. Blot and reapply for deeper colour.",
    details: "Shade shown: Toffee Nude",
    claims: ["Satin finish"],
    options: [{ name: "Shade", type: "swatch", values: [{ label: "Toffee Nude", hex: "#a8704f" }] }]
  },
  {
    id: "silk-tint-balm",
    name: "Silk Tint Lip Balm",
    category: "lips",
    price: 14,
    images: ["balm"],
    short: "A sheer, nourishing tinted balm in a crystal-clear case.",
    description: "Everyday colour with the comfort of a balm. Silk Tint glides on with a sheer wash of colour and a soft, hydrated finish — the easiest way to look put together.",
    benefits: ["Sheer, buildable tint", "Nourishing balm texture", "Everyday comfort", "Crystal-clear luxury case"],
    howTo: "Swipe on bare lips whenever you need moisture and a hint of colour.",
    details: "Shade shown: Peach Nude",
    claims: ["Hydrating"],
    options: [{ name: "Shade", type: "swatch", values: [{ label: "Peach Nude", hex: "#e39a78" }] }]
  },

  /* ============================ FACE ============================ */
  {
    id: "matte-liquid-foundation",
    name: "Matte Finish Liquid Foundation",
    category: "face",
    price: 30,
    badge: "Bestseller",
    bestseller: true,
    images: ["found-bottle", "found-swatch", "found-drip", "found-model", "found-collage"],
    short: "Soft-matte, skin-perfecting coverage in rich shades from Golden Silk to Midnight Cocoa.",
    description: "A silky liquid foundation that blends into skin for a smooth, even, soft-matte finish without looking flat. Created with deeper skin tones front and center, so your undertone shines through — not ashy, never grey.",
    benefits: ["Soft-matte, natural-looking finish", "Buildable medium-to-full coverage", "Blends seamlessly", "Shades made for melanin-rich skin"],
    howTo: "Pump a small amount onto the back of your hand. Apply from the center of the face outward with a brush or damp sponge and build where needed.",
    details: "Pump bottle · 5 shades",
    claims: ["Matte finish", "Inclusive shades"],
    options: [{ name: "Shade", type: "swatch", values: FOUNDATION_SHADES }]
  },
  {
    id: "coverage-foundation-spf15",
    name: "Liquid Coverage Foundation SPF 15",
    category: "face",
    price: 32,
    images: ["coverage"],
    short: "Full, flawless coverage with everyday SPF 15. 35 ml / 1.25 fl oz.",
    description: "Our liquid coverage foundation evens skin tone, blurs imperfections and adds a layer of SPF 15 for daily wear. A gold-capped bottle that belongs on your vanity.",
    benefits: ["Full, flawless coverage", "SPF 15 for daily wear", "Smooth, even finish", "35 ml / 1.25 fl oz"],
    howTo: "Shake well. Apply with fingertips, brush or sponge. For best protection, apply generously 15 minutes before sun exposure.",
    details: "35 ml · 1.25 fl oz · SPF 15",
    claims: ["SPF 15", "Full coverage"],
    options: [{ name: "Shade", type: "swatch", values: FOUNDATION_SHADES }]
  },
  {
    id: "pressed-face-powder",
    name: "Luxury Pressed Face Powder",
    category: "face",
    price: 25,
    badge: "Bestseller",
    bestseller: true,
    images: ["pressed-card", "found-compact", "easter", "pressed-poster"],
    short: "A velvety pressed powder for a flawless, shine-free finish. Net wt 11 g.",
    description: "Set your look, control shine and touch up on the go. Our finely milled pressed powder melts into skin for a smooth, flawless finish, housed in a mirrored black compact with our signature gold emblem.",
    benefits: ["Flawless, soft-focus finish", "Controls shine all day", "Finely milled, never cakey", "Mirrored compact for touch-ups"],
    howTo: "Press lightly over foundation with a puff or sweep on with a fluffy brush. Touch up through the day.",
    details: "Net wt 11 g · 0.4 oz · Mirrored compact",
    claims: ["Shine control", "Travel-friendly"],
    options: [{ name: "Shade", type: "swatch", values: FOUNDATION_SHADES }]
  },
  {
    id: "loose-setting-powder",
    name: "Loose Setting Powder",
    category: "face",
    price: 22,
    images: ["loose-powder"],
    short: "A weightless loose powder that locks in makeup with a soft, blurred glow.",
    description: "Bake, set or finish — our loose powder locks your makeup in place and blurs texture for a smooth, lit-from-within look. Presented in a clear jar with a black signature lid.",
    benefits: ["Sets makeup for long wear", "Blurs pores and texture", "Weightless, breathable feel", "Great for baking"],
    howTo: "Tap a little into the lid, pick up with a puff or damp sponge and press onto skin. Let sit, then dust away the excess.",
    details: "Clear jar with sifter · Black signature lid",
    claims: ["Long-wear", "Blurring"],
    options: [{ name: "Shade", type: "swatch", values: [{ label: "Translucent", hex: "#efe3d3" }].concat(FOUNDATION_SHADES) }]
  },

  /* ============================ BODY ============================ */
  {
    id: "shimmer-body-serum",
    name: "Shimmer Body Serum",
    category: "body",
    price: 20,
    badge: "Bestseller",
    bestseller: true,
    images: ["serum-card", "serum-model", "serum-poster"],
    short: "Glow. Define. Radiate. A silky shimmer for face, collarbones, shoulders and legs.",
    description: "A lightweight, quick-absorbing liquid highlighter for the body that delivers a luminous, long-lasting glow. It blends seamlessly, never feels greasy, and comes in four universal shades for every skin tone.",
    benefits: ["Instant, luminous glow", "Hydrating & nourishing", "Silky, non-greasy, quick-absorbing", "Long-lasting shimmer", "Vegan & cruelty-free"],
    howTo: "Pump onto your palm and smooth over collarbones, shoulders and legs — or mix a drop into foundation for a radiant face.",
    details: "Pump bottle · 4 universal shades",
    claims: ["Vegan", "Cruelty free", "Hydrating", "Long-lasting"],
    options: [{
      name: "Shade", type: "swatch", values: [
        { label: "Pearl Glow", hex: "#ead8cf" }, { label: "Rose Glow", hex: "#c88e7e" },
        { label: "Golden Glow", hex: "#d39a4f" }, { label: "Bronze Glow", hex: "#a2592c" }
      ]
    }]
  },

  /* ============================ CURVES ============================ */
  {
    id: "strapless-bra",
    name: "The Strapless Bra",
    category: "bras",
    price: 38,
    badge: "New",
    isNew: true,
    images: ["strapless-card", "strapless-poster"],
    short: "Support that celebrates you — the ultimate in comfort and lift for every beautiful curve.",
    description: "From our new Strapless Collection. A smooth, contour-cup strapless bra built for fuller busts, with a secure underwire, a firm band that stays put and a soft finish that disappears under your favourite off-shoulder looks.",
    benefits: ["Secure lift without straps", "Stay-put band", "Smooth contour cups", "Designed for fuller busts"],
    howTo: "Fasten on the loosest hook first. Lean forward and settle each breast into the cup before straightening up.",
    details: "Colour: Cocoa · Bands 34 – 46 · Cups C – G",
    claims: ["Size inclusive"],
    sizeGuide: "bra",
    options: [
      { name: "Colour", type: "swatch", values: [{ label: "Cocoa", hex: "#5a3a2e" }] },
      { name: "Band", type: "button", values: BRA_BANDS.map(function (v) { return { label: v }; }) },
      { name: "Cup", type: "button", values: BRA_CUPS.map(function (v) { return { label: v }; }) }
    ]
  },
  {
    id: "sculpting-bodysuit",
    name: "Sculpting Shapewear Bodysuit",
    category: "shapewear",
    price: 48,
    badge: "Bestseller",
    bestseller: true,
    images: ["shapewear", "shapewear-poster"],
    short: "You deserve shapewear that feels as good as it looks. Modest. Comfortable. Beautiful.",
    description: "A seamless mid-thigh bodysuit with gentle waist and tummy sculpting, smooth thigh coverage and breathable premium fabric you can wear all day. Smooths without squeezing, so you feel supported — not restricted.",
    benefits: ["Gentle waist & tummy sculpting", "All-day, seamless comfort", "Breathable premium fabric", "Mid-thigh length prevents chafing"],
    howTo: "Step in and roll up gradually, smoothing as you go. Hand wash cold and lay flat to dry.",
    details: "Colour: Cocoa · Sizes S – 4XL",
    claims: ["Seamless", "Size inclusive", "Breathable"],
    sizeGuide: "body",
    options: [
      { name: "Colour", type: "swatch", values: [{ label: "Cocoa", hex: "#5a3a2e" }] },
      { name: "Size", type: "button", values: BODY_SIZES.map(function (v) { return { label: v }; }) }
    ]
  },
  {
    id: "v-neck-bodysuit",
    name: "Seamless V-Neck Bodysuit",
    category: "shapewear",
    price: 42,
    images: ["bodysuit"],
    short: "A sleek, lightly shaping bodysuit that doubles as a top.",
    description: "Smooth lines, soft molded cups and a flattering V-neckline. Wear it under a blazer, with jeans, or as your invisible base layer. Light shaping through the midsection with a comfortable brief cut.",
    benefits: ["Molded, supportive cups", "Light midsection shaping", "Seamless under clothes", "Wear it as a top"],
    howTo: "Hand wash cold, lay flat to dry.",
    details: "Colour: Cocoa · Sizes S – 4XL",
    claims: ["Seamless", "Size inclusive"],
    sizeGuide: "body",
    options: [
      { name: "Colour", type: "swatch", values: [{ label: "Cocoa", hex: "#5a3a2e" }] },
      { name: "Size", type: "button", values: BODY_SIZES.map(function (v) { return { label: v }; }) }
    ]
  },
  {
    id: "everyday-luxe-set",
    name: "Everyday Luxe Bralette & Brief",
    category: "intimates",
    price: 35,
    images: ["travel"],
    short: "Buttery-soft bralette and signature waistband brief — from the runway to the window seat.",
    description: "The set you'll live in. A wire-free bralette with soft support and a full-coverage brief with our Ethereal Curves waistband. Made for travel days, work days and every day in between.",
    benefits: ["Wire-free comfort", "Signature logo waistband", "Soft, breathable fabric", "Full-coverage brief"],
    howTo: "Machine wash cold on delicate in a laundry bag. Do not tumble dry.",
    details: "Colours: Cocoa, Teal, Mauve · Sizes S – 4XL",
    claims: ["Breathable", "Size inclusive"],
    sizeGuide: "body",
    options: [
      { name: "Colour", type: "swatch", values: [{ label: "Cocoa", hex: "#5a3a2e" }, { label: "Teal", hex: "#1f6b78" }, { label: "Mauve", hex: "#8c6567" }] },
      { name: "Size", type: "button", values: BODY_SIZES.map(function (v) { return { label: v }; }) }
    ]
  }
];
