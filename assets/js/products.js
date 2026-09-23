/* =====================================================================
   ETHEREAL CURVES — PRODUCT CATALOG
   ---------------------------------------------------------------------
   To add a product: copy one block, give it a new unique "id", change
   the text, price and images. Images live in assets/img/ — use the file
   name without ".webp" (each image also needs a small "-sm.webp" copy).

   Each product has a "category" (see CATEGORIES below) and, for makeup,
   a "sub" collection (lipstick, gloss, matte-gloss, foundation,
   loose-powder, pressed-powder, designer).

   Prices are in US dollars.
     compareAt: an optional old price to show a sale ("was $20").
     badge:     optional label — "New", "Bestseller", "Limited" …
     soldOut:   true hides the Add to Bag button.
   ===================================================================== */

/* ---------------------------------------------------------------------
   CATEGORIES — shown on the home page, in the menu and in the shop.
   "image" is optional: categories without one get an elegant gold icon.
   "blurb" is the short line on the home page tile; "description" is
   the full collection text shown at the top of the category page.
   A category with no products yet shows as "Coming soon".
   --------------------------------------------------------------------- */
window.CATEGORIES = [
  {
    id: "makeup", name: "Makeup", title: "The Ethereal Curves Makeup Collection", image: "found-compact", icon: "sparkle",
    blurb: "Lipsticks, glosses, foundations and face powders for every complexion.",
    description: "Lipsticks, glosses, foundations and face powders selected to celebrate every complexion — from warm and golden to rich and melanin-deep. Luxury Designed for You.",
    subs: [
      {
        id: "lipstick", name: "Lipstick", title: "Luxury Lipstick Collection",
        description: "Make every look unforgettable with the Ethereal Curves Luxury Lipstick Collection—where rich, high-impact color meets effortless sophistication. Created for the modern woman, each lipstick is designed to enhance your natural lip contours with luxurious, comfortable formulas available in satin-matte, hydrating cream, and velvet demi-matte finishes. Whether you want a bold, velvety matte, a luminous and nourishing sheen, or a soft, cushion-like demi-matte, every shade delivers beautiful color, comfortable wear, and effortless confidence. Encased in our signature metallic silver bullet and blush-pink base, and presented in our minimalist white luxury packaging, every detail reflects our philosophy: Luxury Designed for You."
      },
      {
        id: "gloss", name: "Glossy Lip Gloss", title: "Glossy Lip Gloss Collection",
        description: "Add the perfect touch of shine with the Ethereal Curves Glossy Lip Gloss Collection—a luxurious edit of high-shine formulas created to give your lips a smooth, radiant, and irresistibly glossy finish. From sheer everyday glow to rich, statement-making shades, each gloss is designed to enhance your natural lip color while leaving lips looking fuller, polished, and beautifully luminous. Wear it alone for effortless shine or layer it over your favorite lipstick for added dimension and glamour. Gloss, glow, and confidence in every swipe. Luxury Designed for You."
      },
      {
        id: "matte-gloss", name: "Matte Lip Gloss", title: "Matte Lip Gloss Collection",
        description: "Make a statement with the Ethereal Curves Matte Lip Gloss Collection, where bold, velvety color meets a lightweight, comfortable finish. Designed to enhance your lips with rich, buildable pigment, each gloss delivers a smooth, sophisticated matte look without compromising on effortless wear. From everyday neutrals to captivating statement shades, our collection offers colors to complement every mood, style, and complexion. Wear it alone for a polished look or layer it with your favorite lip liner for added definition. Bold color. Soft confidence. Effortless luxury."
      },
      {
        id: "foundation", name: "Foundation", title: "Matte Liquid Foundation",
        description: "Create a flawless, refined complexion with the Ethereal Curves Matte Liquid Foundation, thoughtfully selected to deliver smooth, buildable coverage with a sophisticated soft-matte finish. Designed to beautifully complement a diverse range of skin tones, the lightweight formula helps even the appearance of the complexion while creating a polished, comfortable base that wears beautifully throughout the day. Whether you're going for natural everyday elegance or a more perfected glam look, this foundation provides the confidence to let your beauty shine through. Flawless coverage. Beautifully balanced. Luxury designed for you."
      },
      {
        id: "loose-powder", name: "Loose Face Powder", title: "Loose Face Powder Collection",
        description: "Set, smooth, and perfect your complexion with the Ethereal Curves Loose Face Powder Collection, curated to give your makeup a flawless, polished finish while keeping your look feeling light and effortless. Finely milled for a soft, silky texture, our loose powders help set foundation, reduce excess shine, blur the appearance of imperfections, and extend the wear of your makeup. With thoughtfully selected shades to complement a range of skin tones, including rich and melanin-deep complexions, each formula is designed to enhance your natural beauty without looking heavy or cakey. A flawless finish, beautifully set—Luxury Designed for You."
      },
      {
        id: "pressed-powder", name: "Pressed & Compact Powder", title: "Pressed & Compact Face Powder Collection",
        description: "Perfect your complexion wherever the day takes you with the Ethereal Curves Pressed & Compact Face Powder Collection, thoughtfully curated for effortless coverage, smoothness, and shine control. Our selection of finely milled pressed powders provides a soft, polished finish while helping even out the appearance of your complexion and set your makeup beautifully. Available in a range of shades suited to diverse skin tones, from warm and golden to rich and melanin-deep complexions, these versatile powders can be worn alone for a natural finish or layered over foundation for added coverage. Beautifully compact and easy to carry, they are the perfect everyday essential for quick touch-ups and a flawless finish on the go. Effortless beauty, anytime, anywhere—Luxury Designed for You."
      },
      {
        id: "designer", name: "Designer & Brands", title: "Curated Designer & Brand Collection",
        description: "Discover a carefully curated selection of designer and sought-after beauty brands, thoughtfully chosen to bring you exceptional quality, beautiful shades, and effortless luxury. Our collection features carefully selected makeup and beauty essentials from renowned and emerging brands, including statement-making lip colors, complexion products, and must-have beauty favorites. From timeless neutrals to bold, expressive shades, we curate pieces that celebrate individuality and complement a wide range of skin tones and beauty styles. Whether you're searching for an everyday essential or a signature shade that makes a statement, our Curated Designer & Brand Collection brings the world of beauty closer to you—beautifully selected, effortlessly luxurious, and always designed with you in mind."
      }
    ]
  },
  {
    id: "sculpture", name: "Sculpture", title: "Sculpture Shapewear Collection", image: "shapewear", icon: "hanger",
    blurb: "Seamless shapewear that smooths, contours and moves with you.",
    description: "Sculpt, smooth, and embrace every curve with the Ethereal Curves Sculpture Collection—premium shapewear designed to enhance your natural silhouette while keeping you comfortable and confident. Thoughtfully selected for fuller figures, our collection features seamless, supportive pieces designed to smooth, contour, lift, and create a beautifully streamlined foundation beneath your favorite looks. From everyday smoothing essentials to sculpting styles for special occasions, each piece is made to move with you, not against you, so you can feel supported without feeling restricted. Your curves are already beautiful. Sculpture simply helps you wear them with confidence. Luxury Designed for You."
  },
  {
    id: "intimates", name: "Intimates & Lingerie", short: "Intimates", title: "Intimates & Lingerie Collection", image: "strapless-card", icon: "heart",
    blurb: "Bras, panties and lingerie with thoughtful support for fuller figures.",
    description: "Celebrate your curves from the inside out with the Ethereal Curves Intimates & Lingerie Collection—thoughtfully curated bras, panties, and lingerie designed to make you feel supported, comfortable, confident, and beautiful. From everyday essentials that feel effortless against your skin to alluring lingerie made for special moments, our collection brings together flattering fits, feminine details, luxurious textures, and thoughtful support for fuller figures. Whether you're looking for the perfect everyday bra, comfortable panties, or something a little more captivating, every piece is chosen to help you feel beautiful in your own skin, confident in your curves, and effortlessly feminine. Luxury Designed for You."
  },
  {
    id: "essence", name: "Essence", title: "Essence Collection", image: null, icon: "perfume",
    blurb: "Fragrances and finishing touches for your signature presence.",
    description: "Leave a lasting impression with the Ethereal Curves Essence Collection, a curated world of beautiful fragrances and personal essentials designed to become part of your signature presence. Discover an evolving selection of perfumes, fragrance-inspired essentials, and luxurious finishing touches for women and men, with scents ranging from soft and sensual to fresh, sophisticated, and captivating. Whether you prefer a subtle everyday fragrance or a statement scent for special moments, our collection invites you to express your personality through fragrance and make every entrance memorable. Because luxury is not only what you wear—it is the essence you leave behind."
  },
  {
    id: "essentials", name: "Essentials", title: "Luxury Essentials Collection", image: null, icon: "bag",
    blurb: "Shoes, handbags, jewelry and watches for women and men.",
    description: "Elevate the everyday with the Ethereal Curves Luxury Essentials Collection—a curated selection of timeless pieces designed to add sophistication, style, and effortless polish to every look. Discover thoughtfully selected shoes, handbags, jewelry, and watches for both women and men, bringing together statement pieces and everyday essentials for every occasion. From elegant footwear and refined bags to delicate jewelry and distinctive timepieces, each piece is chosen to complement your personal style and bring a touch of quiet luxury to your wardrobe. Whether you're dressing for a special occasion or simply elevating your everyday look, our Luxury Essentials Collection makes finishing every outfit feel effortless. Because true luxury is in the details—and every detail should be designed for you."
  },
  {
    id: "vitality", name: "Vitality", title: "Vitality Collection", image: null, icon: "leaf",
    blurb: "Wellness and nutritional support, from the inside out.",
    description: "Nourish your everyday wellness with the Ethereal Curves Vitality Collection, a curated selection of wellness and nutritional supplements chosen to complement a balanced, active lifestyle. From daily nutritional support to beauty and wellness-focused essentials, our collection brings together carefully selected products designed to help you prioritize self-care from the inside out. Whether you're supporting your daily routine, caring for your body, or simply making more intentional choices for your wellbeing, Vitality is about creating space for you to feel your best—inside and out. Because true beauty begins with feeling good in your own skin. Luxury Designed for You."
  },
  {
    id: "accessories", name: "Accessories", title: "Accessories Collection", image: null, icon: "gem",
    blurb: "Cosmetic bags and finishing touches for your everyday ritual.",
    description: "Complete the look with thoughtfully curated accessories, cosmetic bags and everyday essentials that bring a touch of luxury to your routine. Luxury Designed for You."
  },
  {
    id: "radiance", name: "Radiance", title: "Radiance Skincare Collection", image: "serum-model", icon: "drop",
    blurb: "Korean and American skincare and body glow for radiant skin.",
    description: "Discover skincare curated to help your skin look, feel, and glow at its best. The Ethereal Curves Skincare Collection brings together carefully selected Korean and American skincare products, combining innovative beauty rituals, effective formulations, and everyday self-care. From gentle cleansers and hydrating toners to serums, moisturizers, masks, and targeted treatments, our collection is designed to support healthy-looking, radiant skin across a range of skin types and tones. Whether you are building a simple daily routine or creating a more elevated skincare ritual, Ethereal Curves makes it easy to find products that complement your skin and your lifestyle. Beautiful skin starts with care—and your glow deserves luxury designed for you."
  }
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
  /* ============================ MAKEUP · LIPS ============================ */
  {
    id: "plump-shine-gloss",
    name: "Plump & Shine Lip Gloss",
    category: "makeup", sub: "gloss",
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
    category: "makeup", sub: "gloss",
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
    category: "makeup", sub: "matte-gloss",
    price: 18,
    images: ["lacquer"],
    short: "Bold, velvety matte color with rich, buildable pigment and a lightweight, comfortable finish.",
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
    category: "makeup", sub: "matte-gloss",
    price: 16,
    images: ["liquid-lip"],
    short: "Matte liquid lipstick or luminous lip gloss — rich, buildable color in our black-and-gold signature box. 0.23 fl oz / 6 ml.",
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
    id: "luxury-lipstick",
    name: "Luxury Lipstick",
    category: "makeup", sub: "lipstick",
    price: 18,
    images: ["balm", "satin-lip"],
    short: "Rich, high-impact color in satin-matte, hydrating cream or velvet demi-matte — in our metallic silver bullet and blush-pink base.",
    description: "Make every look unforgettable with the Ethereal Curves Luxury Lipstick Collection—where rich, high-impact color meets effortless sophistication. Created for the modern woman, each lipstick is designed to enhance your natural lip contours with luxurious, comfortable formulas. Whether you want a bold, velvety matte, a luminous and nourishing sheen, or a soft, cushion-like demi-matte, every shade delivers beautiful color, comfortable wear, and effortless confidence. Encased in our signature metallic silver bullet and blush-pink base, and presented in our minimalist white luxury packaging.",
    benefits: ["Rich, high-impact color", "Three finishes: satin-matte, hydrating cream, velvet demi-matte", "Comfortable, luxurious wear", "Signature silver bullet, blush-pink base and white luxury packaging"],
    howTo: "Apply directly from the bullet, starting at the center of the lips and working outward. Blot and reapply for deeper color.",
    details: "Finishes: Satin-Matte, Hydrating Cream, Velvet Demi-Matte",
    claims: ["Satin-matte", "Hydrating cream", "Velvet demi-matte"],
    options: [
      { name: "Finish", type: "button", values: [{ label: "Satin-Matte" }, { label: "Hydrating Cream" }, { label: "Velvet Demi-Matte" }] },
      { name: "Shade", type: "swatch", values: [{ label: "Peach Nude", hex: "#e39a78" }, { label: "Toffee Nude", hex: "#a8704f" }] }
    ]
  },

  /* ============================ MAKEUP · FACE ============================ */
  {
    id: "matte-liquid-foundation",
    name: "Matte Finish Liquid Foundation",
    category: "makeup", sub: "foundation",
    price: 30,
    badge: "Bestseller",
    bestseller: true,
    images: ["found-bottle", "found-swatch", "found-drip", "found-model", "found-collage"],
    short: "Smooth, buildable coverage with a sophisticated soft-matte finish, in shades from Golden Silk to Midnight Cocoa.",
    description: "Create a flawless, refined complexion with the Ethereal Curves Matte Liquid Foundation, thoughtfully selected to deliver smooth, buildable coverage with a sophisticated soft-matte finish. Designed to beautifully complement a diverse range of skin tones, the lightweight formula helps even the appearance of the complexion while creating a polished, comfortable base that wears beautifully throughout the day. Whether you're going for natural everyday elegance or a more perfected glam look, this foundation provides the confidence to let your beauty shine through. Flawless coverage. Beautifully balanced. Luxury designed for you.",
    benefits: ["Soft-matte, natural-looking finish", "Buildable medium-to-full coverage", "Blends seamlessly", "Shades made for melanin-rich skin"],
    howTo: "Pump a small amount onto the back of your hand. Apply from the center of the face outward with a brush or damp sponge and build where needed.",
    details: "Pump bottle · 5 shades",
    claims: ["Matte finish", "Inclusive shades"],
    options: [{ name: "Shade", type: "swatch", values: FOUNDATION_SHADES }]
  },
  {
    id: "coverage-foundation-spf15",
    name: "Liquid Coverage Foundation SPF 15",
    category: "makeup", sub: "foundation",
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
    category: "makeup", sub: "pressed-powder",
    price: 25,
    badge: "Bestseller",
    bestseller: true,
    images: ["pressed-card", "found-compact", "easter", "pressed-poster"],
    short: "Finely milled pressed powder for coverage, smoothness and shine control — perfect for touch-ups on the go. Net wt 11 g.",
    description: "Perfect your complexion wherever the day takes you with the Ethereal Curves Pressed Face Powder, thoughtfully curated for effortless coverage, smoothness, and shine control. Finely milled for a soft, polished finish, it helps even out the appearance of your complexion and set your makeup beautifully. Available in shades suited to diverse skin tones, from warm and golden to rich and melanin-deep, it can be worn alone for a natural finish or layered over foundation for added coverage. Beautifully compact and easy to carry — the perfect everyday essential for quick touch-ups and a flawless finish on the go. Effortless beauty, anytime, anywhere—Luxury Designed for You.",
    benefits: ["Flawless, soft-focus finish", "Controls shine all day", "Finely milled, never cakey", "Mirrored compact for touch-ups"],
    howTo: "Press lightly over foundation with a puff or sweep on with a fluffy brush. Touch up through the day.",
    details: "Net wt 11 g · 0.4 oz · Mirrored compact",
    claims: ["Shine control", "Travel-friendly"],
    options: [{ name: "Shade", type: "swatch", values: FOUNDATION_SHADES }]
  },
  {
    id: "loose-setting-powder",
    name: "Loose Setting Powder",
    category: "makeup", sub: "loose-powder",
    price: 22,
    images: ["loose-powder"],
    short: "Finely milled loose powder that sets, smooths and perfects — without looking heavy or cakey.",
    description: "Set, smooth, and perfect your complexion with the Ethereal Curves Loose Face Powder, curated to give your makeup a flawless, polished finish while keeping your look feeling light and effortless. Finely milled for a soft, silky texture, it helps set foundation, reduce excess shine, blur the appearance of imperfections, and extend the wear of your makeup. With shades to complement a range of skin tones, including rich and melanin-deep complexions, it enhances your natural beauty without looking heavy or cakey. A flawless finish, beautifully set—Luxury Designed for You.",
    benefits: ["Sets makeup for long wear", "Blurs pores and texture", "Weightless, breathable feel", "Great for baking"],
    howTo: "Tap a little into the lid, pick up with a puff or damp sponge and press onto skin. Let sit, then dust away the excess.",
    details: "Clear jar with sifter · Black signature lid",
    claims: ["Long-wear", "Blurring"],
    options: [{ name: "Shade", type: "swatch", values: [{ label: "Translucent", hex: "#efe3d3" }].concat(FOUNDATION_SHADES) }]
  },

  /* ============================ RADIANCE ============================ */
  {
    id: "shimmer-body-serum",
    name: "Shimmer Body Serum",
    category: "radiance",
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

  /* ============================ SCULPTURE & INTIMATES ============================ */
  {
    id: "strapless-bra",
    name: "The Strapless Bra",
    category: "intimates",
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
    category: "sculpture",
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
    category: "sculpture",
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
