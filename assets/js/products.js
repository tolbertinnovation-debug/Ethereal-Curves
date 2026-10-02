/* =====================================================================
   ETHEREAL CURVES — PRODUCT CATALOG
   ---------------------------------------------------------------------
   To add a product: copy one block, give it a new unique "id", change
   the text, price and images. Images live in assets/img/ — use the file
   name without ".webp" (each image also needs a small "-sm.webp" copy).

   Each product has a "category" (see CATEGORIES below) and, for makeup,
   a "sub" collection (lipstick, gloss, matte-gloss, foundation,
   loose-powder, pressed-powder, designer); for Radiance, a "sub" of
   body-shimmer or skincare.

   Prices are in US dollars.
     compareAt: an optional old price to show a sale ("was $20").
     badge:     optional label — "New", "Bestseller", "Limited" …
     soldOut:   true hides the Add to Bag button.
     featured:  optional number (1 = first) to choose the order products
                appear in on collection pages. Others follow afterwards.
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
        id: "sets", name: "Sets & Bundles", title: "Makeup Sets & Bundles",
        description: "Our curated makeup sets bring the essentials together for less — from a flawless complexion routine to a quick everyday lip-and-cheek glam, all the way to the complete Ethereal Signature Full Face VIP Box. Beauty that enhances the real you. Luxury Designed for You."
      },
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
        id: "concealer", name: "Concealer", title: "Concealer",
        description: "Brighten, correct and perfect with the Ethereal Curves Liquid Concealer — a creamy, buildable formula that conceals and blends seamlessly into your foundation for a smooth, photo-ready finish. Luxury Designed for You."
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
        id: "highlight", name: "Highlight & Contour", title: "Highlight & Contour Collection",
        description: "Sculpted to perfection, kissed by light. Cream contour defines your bone structure while our bronzer, highlighter powder and shimmering glow spray melt together for that effortless, lit-from-within warmth. Catch the light from every single angle. Luxury Designed for You."
      },
      {
        id: "cheek", name: "Cheek Glitter", title: "Cheek Glitter Collection",
        description: "A pop of luminous sparkle for cheeks that catch the light. Our cheek glitter powders add instant, radiant color for everyday glam or a night out. Luxury Designed for You."
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
    id: "intimates", name: "Intimates & Lingerie", short: "Intimates", title: "Intimates & Lingerie Collection", image: "br-floral-pushup", icon: "heart",
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
    id: "radiance", name: "Radiance", title: "The Ethereal Curves Radiance Collection", image: "serum-model", icon: "drop",
    blurb: "Korean & American skincare, body care, body shimmer and men's grooming.",
    description: "Skincare, body care and body shimmer curated to help your skin look, feel, and glow at its best — because every woman deserves to feel radiant in her own skin. Luxury Designed for You.",
    subs: [
      {
        id: "skincare", name: "Skincare", title: "Skincare Collection",
        description: "Discover skincare curated to help your skin look, feel, and glow at its best. The Ethereal Curves Skincare Collection brings together carefully selected Korean and American skincare products, combining innovative beauty rituals, effective formulations, and everyday self-care. From gentle cleansers and hydrating toners to serums, moisturizers, masks, and targeted treatments, our collection is designed to support healthy-looking, radiant skin across a range of skin types and tones. Whether you are building a simple daily routine or creating a more elevated skincare ritual, Ethereal Curves makes it easy to find products that complement your skin and your lifestyle. Beautiful skin starts with care—and your glow deserves luxury designed for you."
      },
      {
        id: "body-care", name: "Body Care", title: "Body Care Collection",
        description: "Turn every shower and every evening into a ritual. Our Body Care Collection brings together trusted favorites — nourishing bath and body oils, body washes, lotions and treatment creams — chosen to cleanse gently, lock in moisture and leave your skin soft, smooth and glowing from head to toe. Because self-care should always feel like luxury. Luxury Designed for You."
      },
      {
        id: "body-shimmer", name: "Body Shimmer", title: "Body Shimmer Collection",
        description: "Glow from every angle with the Ethereal Curves Body Shimmer Collection, created to give your skin a beautiful, luminous finish that catches the light and elevates your look. Our curated body shimmers add a touch of radiant sparkle while leaving skin looking smooth, polished, and irresistibly glowing. Perfect for everyday glamour, special occasions, date nights, celebrations, or whenever you simply want to shine a little brighter. Because your skin deserves to glow, your curves deserve to shimmer, and every woman deserves to feel radiant in her own skin. Luxury Designed for You."
      },
      {
        id: "mens", name: "Men's Grooming", title: "Men's Grooming Collection",
        description: "Skincare made simple for him. Our Men's Grooming Collection features grass-fed tallow essentials — a face wash, serum and balm — selected to cleanse, nourish and protect skin that faces the day. A thoughtful gift, or a daily ritual he'll actually keep. Luxury Designed for You."
      }
    ]
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
    price: 15,
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
    price: 25,
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
    price: 35,
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
    price: 35,
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
    price: 30,
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
    price: 30,
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
    category: "radiance", sub: "body-shimmer",
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
    badge: "Coming Soon",
    comingSoon: true,
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
    name: "Premium Full-Body Seamless Shapewear",
    category: "sculpture",
    price: 25,
    badge: "Bestseller",
    bestseller: true,
    images: ["shapewear", "ic-shapewear-model", "shapewear-poster", "ic-flyer"],
    short: "You deserve shapewear that feels as good as it looks. Modest. Comfortable. Beautiful.",
    description: "A seamless mid-thigh bodysuit with gentle waist and tummy sculpting, smooth thigh coverage and breathable premium fabric you can wear all day. Smooths without squeezing, so you feel supported — not restricted.",
    benefits: ["Tummy control, perfect shape and all-day comfort", "Gentle waist & tummy sculpting", "All-day, seamless comfort", "Breathable premium fabric", "Mid-thigh length prevents chafing"],
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
    price: 25,
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
    badge: "Coming Soon",
    comingSoon: true,
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
  },

  /* ============================ RADIANCE · SKINCARE, BODY CARE & MEN'S ============================
     Curated brands. Prices are placeholders — please confirm. */
  {
    id: "cosrx-salicylic-cleanser",
    brand: "COSRX",
    name: "Salicylic Acid Daily Gentle Cleanser",
    category: "radiance",
    sub: "skincare",
    price: 16,
    isNew: true,
    images: ["sk-cosrx-cleanser", "sk-cosrx-cleanser-poster"],
    short: "Your daily solution for clear, blemish-free skin. 150 mL / 5.07 fl. oz.",
    description: "A gentle daily foam cleanser formulated with salicylic acid to control excess sebum, clear pores and remove impurities — gentle enough for everyday use.",
    benefits: ["Deep pore cleansing — salicylic acid works into pores to remove impurities", "Gentle exfoliation of dead skin cells without irritation", "Controls excess sebum and helps prevent future blemishes", "Calms and hydrates with gentle botanical ingredients"],
    howTo: "Massage a small amount onto damp skin, focusing on oily or congested areas, then rinse well. Use morning and/or evening.",
    details: "150 mL / 5.07 fl. oz. · Korean skincare",
    claims: ["Salicylic acid", "Daily use", "K-beauty"]
  },
  {
    id: "cosrx-6-peptide",
    brand: "COSRX",
    name: "The 6 Peptide Skin Booster Serum",
    category: "radiance",
    sub: "skincare",
    price: 40,
    isNew: true,
    images: ["sk-cosrx-peptide", "sk-cosrx-peptide-poster"],
    short: "Your essential step for radiant, resilient skin — with hyaluronic acid, NAG and amino acids.",
    description: "A lightweight booster serum with six peptides, hyaluronic acid, NAG and amino acids that layers easily into any routine for brighter, smoother, more resilient-looking skin.",
    benefits: ["Even skin tone — promotes a brighter, more uniform complexion", "Intense, long-lasting hydration", "Firmness & smoothness — improves the look of elasticity and texture", "Pore & sebum care — helps minimize the look of pores and balance oil"],
    howTo: "After cleansing and toning, smooth 1–2 pumps over face and neck. Follow with moisturizer, and sunscreen in the morning.",
    details: "Hyaluronic Acid + NAG + Amino Acids · Korean skincare",
    claims: ["Dermatologically tested", "Hypoallergenic", "Cruelty free"]
  },
  {
    id: "isntree-ha-moist-cream",
    brand: "Isntree",
    name: "Hyaluronic Acid Moist Cream",
    category: "radiance",
    sub: "skincare",
    price: 20,
    isNew: true,
    images: ["sk-isntree-cream", "sk-isntree-cream-poster"],
    short: "Unlock your skin's ultimate hydration with 5 types of hyaluronic acid. 80 mL / 2.70 fl. oz.",
    description: "A rich yet breathable cream with five types of hyaluronic acid that deeply moisturizes, balances oil and moisture, and reinforces the skin barrier for plump, dewy-looking skin.",
    benefits: ["Deep moisturization — 5 types of hyaluronic acid replenish moisture", "Oil-moisture balance for a healthy barrier", "Reinforces the skin barrier to lock in hydration", "Plump, dewy, radiant-looking skin"],
    howTo: "Apply as the last step of your evening routine, or under sunscreen in the morning. Pat gently until absorbed.",
    details: "80 mL / 2.70 fl. oz. · Korean skincare",
    claims: ["Hyaluronic acid", "All skin types", "K-beauty"]
  },
  {
    id: "isntree-watery-sun-gel",
    brand: "Isntree",
    name: "Hyaluronic Acid Watery Sun Gel SPF 50+",
    category: "radiance",
    sub: "skincare",
    price: 20,
    isNew: true,
    images: ["sk-isntree-sungel", "sk-isntree-sungel-poster"],
    short: "Your daily hydration & protection — SPF 50+ PA++++ with no white cast. 50 mL / 1.69 fl. oz.",
    description: "A refreshing, watery sun gel with broad-spectrum SPF 50+ PA++++ and eight types of hyaluronic acid. Lightweight, fast-absorbing and non-greasy, it leaves no white cast — perfect for melanin-rich skin.",
    benefits: ["High SPF 50+ PA++++ broad-spectrum UVA/UVB protection", "8 types of hyaluronic acid for multi-layer hydration", "Watery gel texture — lightweight, fast-absorbing, no white cast", "Soothing botanical extracts, suitable for all skin types"],
    howTo: "Apply generously as the last step of your morning routine, 15 minutes before sun exposure. Reapply every 2 hours outdoors.",
    details: "50 mL / 1.69 fl. oz. · SPF 50+ PA++++ · Korean skincare",
    claims: ["SPF 50+", "No white cast", "K-beauty"]
  },
  {
    id: "balance-niacinamide-serum",
    brand: "Balance Active Formula",
    name: "Niacinamide Blemish Recovery Serum",
    category: "radiance",
    sub: "skincare",
    price: 25,
    isNew: true,
    images: ["sk-balance", "sk-balance-poster"],
    short: "Calm & clear with 15% active niacinamide. 30 mL / 1 fl. oz.",
    description: "A targeted serum with 15% active niacinamide for blemish-prone skin. It helps improve skin texture and calm the skin for a clearer, more even-looking complexion.",
    benefits: ["Targets blemish-prone skin", "Improves skin texture", "Calms the skin", "For a calm & clear complexion"],
    howTo: "Apply 2–3 drops to clean skin morning and/or evening, before moisturizer. Introduce gradually if you have sensitive skin.",
    details: "30 mL / 1 fl. oz. · 15% active niacinamide",
    claims: ["15% niacinamide", "Dermatologically tested"]
  },
  {
    id: "wrinkle-bounce-multi-balm",
    brand: "Ulak er moin",
    name: "Wrinkle Bounce Multi Balm",
    category: "radiance",
    sub: "skincare",
    price: 20,
    isNew: true,
    images: ["sk-bounce-balm", "sk-bounce-balm-poster"],
    short: "A swipe-on balm for bouncy, hydrated, dewy skin — anytime, anywhere. Net wt. 9 g / 0.32 oz.",
    description: "A portable multi balm stick that glides over skin to hydrate and visibly smooth. Keep it in your bag for a dewy glow on the go.",
    benefits: ["Visibly reduces the appearance of fine lines and wrinkles", "Improves the look of elasticity and firmness", "Infuses skin with intense moisture for a dewy glow", "Multi-use on face, neck and dry areas"],
    howTo: "Twist up and glide over clean skin — cheekbones, forehead, smile lines, neck or any dry area. Reapply throughout the day.",
    details: "Net wt. 9 g / 0.32 oz.",
    claims: ["Dermatologically tested", "Hypoallergenic", "Cruelty free"]
  },
  {
    id: "eelhoe-placenta-cream",
    brand: "EELHOE",
    name: "Sheep Placenta Extract Collagen Cream",
    category: "radiance",
    sub: "skincare",
    price: 70,
    isNew: true,
    images: ["sk-eelhoe", "sk-eelhoe-poster"],
    short: "A luxury anti-aging collagen cream with sheep placenta extract. Net 50 g / 1.76 oz.",
    description: "A rich anti-aging cream with sheep placenta extract and collagen, presented in a gold-embossed luxury box. Formulated to hydrate, brighten and visibly firm for a youthful-looking glow.",
    benefits: ["Reduces the look of fine lines & wrinkles", "Intensive anti-aging formula", "Brightens and evens the look of skin tone", "Formulated to support collagen", "Replenishes & hydrates", "Improves the look of elasticity & firmness"],
    howTo: "Smooth a small amount over clean face and neck, morning and evening. Patch test before first use.",
    details: "Net 50 g / 1.76 oz. · Suitable for all skin types",
    claims: ["Anti-aging", "Collagen"]
  },
  {
    id: "vaseline-healthy-bright",
    brand: "Vaseline",
    name: "Healthy Bright Serum Burst Lotion",
    category: "radiance",
    sub: "body-care",
    price: 25,
    isNew: true,
    images: ["sk-vaseline", "sk-vaseline-poster"],
    short: "Unlock your brightest & softest skin — choose Luminous Defense SPF 50 or Gluta-Hya Cocoa Radiant.",
    description: "Two serum-burst body lotions from Vaseline Healthy Bright. Luminous Defense is a lightweight SPF 50 PA+++ sunscreen lotion with GlutaGlow, hyaluron and vitamin C. Gluta-Hya Cocoa Radiant is a UV lotion with cocoa butter, hyaluron and vitamin E that prevents dryness and leaves skin with a radiant glow. Both are non-sticky.",
    benefits: ["Luminous Defense: SPF 50 PA+++ lightweight UVA/UVB protection", "Luminous Defense: GlutaGlow + hyaluron + vitamin C for brighter-looking skin", "Cocoa Radiant: cocoa butter + hyaluron + vitamin E with ultra-hydrating lipids", "Non-sticky, fast-absorbing serum-burst texture"],
    howTo: "Smooth generously over clean, dry skin every day. For sun protection, apply Luminous Defense 15 minutes before going outdoors.",
    details: "Healthy Bright range",
    claims: ["Non-sticky", "SPF 50 option"],
    options: [{"name": "Formula", "type": "button", "values": [{"label": "Luminous Defense SPF 50"}, {"label": "Gluta-Hya Cocoa Radiant"}]}]
  },
  {
    id: "drteals-bath-body-oil",
    brand: "Dr Teal's",
    name: "Moisturizing Bath & Body Oil",
    category: "radiance",
    sub: "body-care",
    price: 20,
    isNew: true,
    images: ["sk-drteals-oils", "sk-drteals-oils-poster"],
    short: "Power up your shower & bath routine — find your perfect ritual. 8.8 fl oz / 260 mL.",
    description: "Moisturizing bath and body oils with coconut oil, borage, argan oil and aloe vera. Choose your ritual: Probiotic Lemon Balm for balanced skin, Glow & Hydrate Avocado Oil for a radiance boost, or Soothe & Sleep Lavender for a relaxing bedtime.",
    benefits: ["Balanced Skin Ritual (Lemon Balm): microbiome-friendly, gently cleanses, deep hydration", "Radiance Boost Ritual (Avocado Oil): restores moisture, improves skin texture, soothes & softens", "Relaxing Bedtime Ritual (Lavender): calming, promotes restful sleep, nourishes skin", "Paraben & phthalate free"],
    howTo: "Add a capful to warm bath water, or smooth onto damp skin after showering and pat dry.",
    details: "8.8 fl oz / 260 mL",
    claims: ["Paraben free", "Phthalate free"],
    options: [{"name": "Ritual", "type": "button", "values": [{"label": "Probiotic Lemon Balm"}, {"label": "Glow & Hydrate Avocado Oil"}, {"label": "Soothe & Sleep Lavender"}]}]
  },
  {
    id: "drteals-citrus-body-wash",
    brand: "Dr Teal's",
    name: "Citrus & Collagen Body Wash",
    category: "radiance",
    sub: "body-care",
    price: 25,
    isNew: true,
    images: ["sk-drteals-wash", "sk-drteals-duo-poster"],
    short: "Gentle cleansing with pure Epsom salt and citrus essential oils. 24 fl oz / 710 mL.",
    description: "A balancing body wash with pure Epsom salt, citrus essential oils and collagen, plus shea butter, aloe vera and vitamin E. Pair it with the Citrus & Collagen Body Lotion for the full Balanced & Glowing Ritual.",
    benefits: ["Gentle cleansing with pure Epsom salt", "Microbiome-friendly prebiotic helps keep skin in balance", "Deep hydration with shea butter, aloe vera & vitamin E", "Paraben & phthalate free"],
    howTo: "Lather onto wet skin with your hands or a loofah, then rinse. Follow with Dr Teal's Citrus Body Lotion.",
    details: "24 fl oz / 710 mL",
    claims: ["Paraben free", "Epsom salt"]
  },
  {
    id: "drteals-citrus-body-lotion",
    brand: "Dr Teal's",
    name: "Citrus & Collagen Body Lotion",
    category: "radiance",
    sub: "body-care",
    price: 25,
    isNew: true,
    images: ["sk-drteals-lotion", "sk-drteals-duo-poster"],
    short: "Lock in moisture & shine — 24-hour moisture with vitamin C and citrus oils. 18 fl oz / 532 mL.",
    description: "A nourishing body lotion with pure Epsom salt, citrus essential oils and collagen, plus cocoa butter, shea butter and vitamin E for soft, smooth, healthy-looking skin.",
    benefits: ["24-hour moisture", "Promotes glowing, youthful-looking skin with vitamin C & citrus essential oils", "Nourishes & protects with cocoa butter, shea butter & vitamin E", "Paraben & phthalate free"],
    howTo: "Massage into skin after bathing, while skin is still slightly damp.",
    details: "18 fl oz / 532 mL",
    claims: ["24-hour moisture", "Paraben free"]
  },
  {
    id: "medix-retinol-body-cream",
    brand: "Medix 5.5",
    name: "Retinol + Ferulic Acid Age Rewind Body Cream",
    category: "radiance",
    sub: "body-care",
    price: 25,
    isNew: true,
    images: ["sk-medix", "sk-medix-poster"],
    short: "Reverse the signs of aging from head to toe. 15 fl oz / 444 mL.",
    description: "A smoothing body cream with retinol and ferulic acid in a pH-balanced formula with shea butter. It helps smooth the look of wrinkles, even skin tone and firm skin for a more youthful-looking appearance.",
    benefits: ["Smoothes wrinkles — retinol helps improve the look of elasticity and fine lines", "Evens skin tone — ferulic acid helps brighten for a more uniform complexion", "Deep hydration — pH 5.5 balance with shea butter", "Firms skin — antioxidants support a more youthful appearance"],
    howTo: "Apply to clean skin in the evening. Retinol can make skin more sensitive to the sun, so use sunscreen during the day. Patch test before first use.",
    details: "15 fl oz / 444 mL · pH 5.5",
    claims: ["Retinol", "Ferulic acid"]
  },
  {
    id: "eastmoon-tallow-face-wash",
    brand: "East Moon",
    name: "Tallow Face Wash for Men",
    category: "radiance",
    sub: "mens",
    price: 15,
    isNew: true,
    images: ["sk-eastmoon-wash", "sk-eastmoon-wash-poster"],
    short: "Pure goat and tallow face wash that cleans deep without stripping. Net 120 mL / 4 fl. oz.",
    description: "A rich, gentle face wash for men made with pure goat and tallow. It removes impurities, excess oil and daily grime without stripping natural moisture — perfect after shaving or for sensitive skin.",
    benefits: ["Deep pore cleansing without stripping moisture", "Rich nourishment — grass-fed tallow with vitamins A, D, E & K and essential fatty acids", "Soothing & calming — gentle on redness and post-shave irritation", "Helps strengthen the skin's natural protective barrier"],
    howTo: "Pump onto wet hands, lather and massage over damp face, then rinse. Use morning and night.",
    details: "Net 120 mL / 4 fl. oz. · Skin for men",
    claims: ["For men", "Grass-fed tallow"]
  },
  {
    id: "eastmoon-tallow-serum",
    brand: "East Moon",
    name: "Tallow Serum for Men",
    category: "radiance",
    sub: "mens",
    price: 10,
    isNew: true,
    images: ["sk-eastmoon-serum", "sk-eastmoon-serum-poster"],
    short: "Unlock your skin's vitality with pure grass-fed tallow. Net 30 mL / 1 fl. oz.",
    description: "A nourishing face serum powered by pure grass-fed tallow, rich in essential fatty acids and vitamins A, D, E and K. It reinforces the skin barrier and calms post-shave redness for a more resilient appearance.",
    benefits: ["Deep nourishment with essential fatty acids and vitamins A, D, E & K", "Reinforces the skin barrier against environmental stressors", "Soothes & calms redness and post-shave irritation", "Supports the skin's natural renewal for a more youthful look"],
    howTo: "Warm 2–3 drops between your fingertips and press into clean skin, morning and evening.",
    details: "Net 30 mL / 1 fl. oz. · Skin for men",
    claims: ["For men", "Grass-fed tallow"]
  },
  {
    id: "eastmoon-tallow-balm",
    brand: "East Moon",
    name: "Wrinkle Defense Tallow Balm for Men",
    category: "radiance",
    sub: "mens",
    price: 10,
    isNew: true,
    images: ["sk-eastmoon-balm", "sk-eastmoon-balm-poster"],
    short: "Your ultimate skin defense, powered by pure grass-fed tallow. Net 50 g / 1.76 oz.",
    description: "A rich face balm with pure grass-fed tallow that intensely moisturizes and helps reduce the look of fine lines, leaving skin supple, revitalized and protected.",
    benefits: ["Reduces the look of fine lines & wrinkles", "Deep hydration & nourishment for supple skin", "Rich in vitamins and fatty acids to help repair the skin barrier", "Soothes irritation & redness"],
    howTo: "Warm a small amount between your fingertips and press into clean face and neck. Ideal after shaving and before bed.",
    details: "Net 50 g / 1.76 oz. · Skin for men",
    claims: ["For men", "Grass-fed tallow"]
  },

  /* ============================ NEW: MAKEUP SETS, INTIMATES & SHAPEWEAR ============================ */
  {
    id: "ethereal-signature-vip-box",
    name: "The Ethereal Signature Full Face VIP Box",
    category: "makeup",
    sub: "sets",
    price: 180,
    compareAt: 225,
    badge: "VIP · Save $45",
    isNew: true,
    images: ["mk-vip-box", "mk-vip-box-poster"],
    short: "The ultimate launch VIP box — eleven Ethereal Curves essentials in one collector's box. Value $225.",
    description: "The complete vision. Unapologetic luxury. Everything you need to rule the room: high-performance base wear, dimension-defining highlights and rich lip pigments, all packaged into one ultimate collector's box. Available while first-run launch boxes last.",
    benefits: ["Liquid Foundation", "Concealer", "Loose Face Powder", "Compact Face Powder", "Cream Contour", "Bronzer / Luminizer", "Highlighter Powder", "Shimmer Glow Spray", "Lipstick (matte / velvet)", "Lip Gloss (glossy / shimmering)", "Cheek Glitter Powder"],
    howTo: "Choose your foundation shade below. Not sure of your match? Use our Shade Finder or send us a daylight selfie on WhatsApp and we'll match your complexion products.",
    details: "Launch price $180 (value $225) · While first-run launch boxes last",
    claims: ["VIP box", "Save $45", "Limited"],
    options: [{"name": "Shade", "type": "swatch", "values": FOUNDATION_SHADES}]
  },
  {
    id: "flawless-base-routine",
    name: "The Flawless Base Routine",
    category: "makeup",
    sub: "sets",
    price: 95,
    compareAt: 115,
    badge: "Save $20",
    isNew: true,
    images: ["mk-flawless", "mk-flawless-poster"],
    short: "The complexion essentials — your second-skin secret. Foundation, concealer, loose and compact powder. Value $115.",
    description: "Perfect canvas, zero filter needed. From velvety liquid foundation to shine-controlling powders, this bundle is crafted to keep your complexion smooth, seamless and photo-ready through heat, hustle and high glam.",
    benefits: ["Liquid Foundation ($35)", "Concealer ($20)", "Loose Face Powder ($30)", "Compact Face Powder ($30)"],
    howTo: "Choose your shade below — we'll match the foundation, concealer and powders to it. Not sure? Try our Shade Finder or WhatsApp us a daylight selfie.",
    details: "Bundle launch price $95 (retail value $115)",
    claims: ["Bundle", "Save $20"],
    options: [{"name": "Shade", "type": "swatch", "values": FOUNDATION_SHADES}]
  },
  {
    id: "divine-lip-cheek-trio",
    name: "The Divine Lip & Cheek Trio",
    category: "makeup",
    sub: "sets",
    price: 45,
    compareAt: 55,
    badge: "Save $10",
    isNew: true,
    images: ["mk-divine", "mk-divine-poster"],
    short: "Quick everyday glam — lipstick, lip gloss and cheek glitter. Effortless color, instant presence. Value $55.",
    description: "The 5-minute glow-up. Whether you want a statement matte pout, a high-shine gloss or a pop of luminous cheek sparkle, this everyday trio makes elevated glam quick and easy — and keeps your everyday bag stocked.",
    benefits: ["Lipstick (matte / velvet) — rich, long-lasting color that stays put ($25)", "Lip Gloss (glossy / shimmering) — high-shine, non-sticky ($15)", "Cheek Glitter Powder — a pop of luminous sparkle ($15)"],
    howTo: "Choose your lipstick and gloss finish below. Tell us your preferred shades in the order notes or on WhatsApp.",
    details: "Trio price $45 (value $55)",
    claims: ["Bundle", "Save $10"],
    options: [{"name": "Lipstick finish", "type": "button", "values": [{"label": "Matte"}, {"label": "Velvet"}]}, {"name": "Gloss finish", "type": "button", "values": [{"label": "Glossy"}, {"label": "Shimmering"}]}]
  },
  {
    id: "liquid-concealer",
    name: "Liquid Concealer",
    category: "makeup",
    sub: "concealer",
    price: 20,
    isNew: true,
    images: ["mk-concealer", "mk-flawless-poster"],
    short: "A creamy, buildable concealer that blends seamlessly for a flawless, photo-ready finish.",
    description: "Brighten under the eyes, cover blemishes and perfect your base. The Ethereal Curves Liquid Concealer has a precise doe-foot applicator and a creamy texture that blends into skin without creasing.",
    benefits: ["Buildable, natural-looking coverage", "Creamy texture that blends seamlessly", "Precise doe-foot applicator", "Shades to match our foundation range"],
    howTo: "Dot where needed — under the eyes, around the nose, over blemishes — and blend with a sponge or fingertip. Set with loose powder.",
    details: "Part of The Flawless Base Routine",
    claims: ["Buildable", "Melanin-rich shades"],
    options: [{"name": "Shade", "type": "swatch", "values": FOUNDATION_SHADES}]
  },
  {
    id: "cheek-glitter-powder",
    name: "Cheek Glitter Powder",
    category: "makeup",
    sub: "cheek",
    price: 15,
    isNew: true,
    images: ["mk-cheek-glitter", "mk-divine-poster"],
    short: "A pop of luminous sparkle for cheeks that catch the light.",
    description: "A finely milled glitter powder that adds radiant color and shimmer to the cheeks. Tap on for a soft glow or build up for full sparkle.",
    benefits: ["Luminous, light-catching sparkle", "Buildable color", "Easy to blend", "Part of The Divine Lip & Cheek Trio"],
    howTo: "Tap a brush into the powder, tap off the excess and sweep over the tops of the cheeks.",
    details: "Jar with sifter",
    claims: ["Shimmer", "Buildable"],
    options: [{"name": "Shade", "type": "swatch", "values": [{"label": "Rose Glow", "hex": "#e2737f"}]}]
  },
  {
    id: "plus-size-comfort-set",
    featured: 7,
    name: "Plus Size Comfort Set",
    category: "intimates",
    price: 35,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["ic-comfort-set", "ic-comfort-set-poster"],
    short: "Bra + panty set: supportive, breathable, everyday comfort. Designed for curves. Made for you.",
    description: "A complete comfort set made for curves — a full-coverage molded-cup bra with supportive underwire and wide bands, paired with a soft, breathable panty. Style meets everyday ease.",
    benefits: ["Full-coverage molded cup for a smooth shape", "Supportive underwire with wide bands for lift", "Breathable mesh panels and soft fabric", "U-shaped back for a smooth look and extra support", "Adjustable straps and back closure"],
    howTo: "Hand wash cold and lay flat to dry. Use our Size Guide to convert your size to European band sizes.",
    details: "Colours: Black, Nude · European band sizes 75–95 (≈ US 34–42) · Cups DD–HH, with extended I–JK",
    claims: ["Plus size", "Bra + panty set", "Breathable"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#e3a283"}]}, {"name": "Band (EU)", "type": "button", "values": [{"label": "75"}, {"label": "80"}, {"label": "85"}, {"label": "90"}, {"label": "95"}]}, {"name": "Cup", "type": "button", "values": [{"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}, {"label": "I"}, {"label": "J"}, {"label": "JJ"}, {"label": "K"}, {"label": "JK"}]}]
  },
  {
    id: "plus-size-minimizer-bra",
    featured: 9,
    name: "Satin Minimizer Bra — Plus Size",
    category: "intimates",
    price: 20,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["ic-minimizer", "ic-minimizer-poster"],
    short: "Less bulk. More shape. All-day support. Designed for full busts — in six colours.",
    description: "A soft satin minimizer bra that visibly reduces bust projection for a smoother silhouette without flattening. Underwire and inner sling lift and shape, while a wide band and hook closure keep it secure all day.",
    benefits: ["Minimizer effect for a smoother silhouette", "Full coverage for confidence and comfort", "Breathable, soft satin fabric", "Wide, adjustable straps", "Underwire and inner sling for natural lift"],
    howTo: "Hand wash cold and lay flat to dry. Use our Size Guide to convert your size to European band sizes.",
    details: "European band sizes 75–95 (≈ US 34–42) · Cups DD–HH, with extended I–JK",
    claims: ["Plus size", "Minimizer", "Satin"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#cf9a63"}, {"label": "Royal Blue", "hex": "#1c3f8e"}, {"label": "Fuchsia", "hex": "#d42a9c"}, {"label": "Wine", "hex": "#5a0f21"}, {"label": "Emerald Green", "hex": "#0d5a39"}]}, {"name": "Band (EU)", "type": "button", "values": [{"label": "75"}, {"label": "80"}, {"label": "85"}, {"label": "90"}, {"label": "95"}]}, {"name": "Cup", "type": "button", "values": [{"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}, {"label": "I"}, {"label": "J"}, {"label": "JJ"}, {"label": "K"}, {"label": "JK"}]}]
  },
  {
    id: "everyday-bra-plus",
    featured: 10,
    name: "Everyday Bra — Plus Size",
    category: "intimates",
    price: 25,
    sizeGuide: "bra",
    images: ["ic-bra-plus", "ic-flyer"],
    short: "A perfectly fitted, smooth everyday bra for fuller figures.",
    description: "Your everyday essential: a smooth, molded-cup bra cut for plus-size figures with supportive underwire and comfortable straps.",
    benefits: ["Smooth molded cups", "Supportive fit for fuller busts", "Comfortable all day"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Message us on WhatsApp.",
    details: "Colour: Nude · Confirm your size with us on WhatsApp",
    claims: ["Plus size"],
    options: [{"name": "Band (EU)", "type": "button", "values": [{"label": "75"}, {"label": "80"}, {"label": "85"}, {"label": "90"}, {"label": "95"}]}, {"name": "Cup", "type": "button", "values": [{"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}]}]
  },
  {
    id: "everyday-bra-regular",
    featured: 11,
    name: "Everyday Bra — Regular",
    category: "intimates",
    price: 20,
    sizeGuide: "bra",
    images: ["ic-bra-regular", "ic-flyer"],
    short: "A perfectly fitted, smooth everyday bra in regular sizes.",
    description: "A smooth, molded-cup everyday bra with supportive underwire — the comfortable basic every wardrobe needs.",
    benefits: ["Smooth molded cups", "Supportive, comfortable fit", "Invisible under clothes"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Message us on WhatsApp.",
    details: "Colour: Nude · Confirm your size with us on WhatsApp",
    claims: ["Everyday"],
    options: [{"name": "Band (EU)", "type": "button", "values": [{"label": "70"}, {"label": "75"}, {"label": "80"}, {"label": "85"}]}, {"name": "Cup", "type": "button", "values": [{"label": "A"}, {"label": "B"}, {"label": "C"}, {"label": "D"}]}]
  },
  {
    id: "everyday-panties",
    featured: 12,
    name: "Everyday Panties",
    category: "intimates",
    price: 5,
    images: ["ic-panties", "ic-flyer"],
    short: "Soft, comfortable everyday panties.",
    description: "Comfortable everyday underwear in classic black and nude — soft, breathable and easy to wear.",
    benefits: ["Soft, breathable fabric", "Comfortable everyday fit"],
    howTo: "Machine wash cold on delicate.",
    details: "Colours: Black, Nude",
    claims: ["Everyday"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#d69a72"}]}, {"name": "Size", "type": "button", "values": [{"label": "S"}, {"label": "M"}, {"label": "L"}, {"label": "XL"}, {"label": "2XL"}]}]
  },
  {
    id: "tummy-control-panty",
    name: "High-Control Tummy Control Panty",
    category: "sculpture",
    price: 5,
    images: ["ic-tummy-panty", "ic-flyer"],
    short: "High-waist shaping panty for a smooth, sculpted midsection.",
    description: "A seamless high-waist shaping panty with firm tummy control that smooths your midsection under any outfit.",
    benefits: ["Firm tummy control", "Seamless under clothes", "Comfortable, breathable fabric"],
    howTo: "Hand wash cold and lay flat to dry.",
    details: "Colours: Black, Nude",
    claims: ["Tummy control", "Seamless"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#dcae86"}]}, {"name": "Size", "type": "button", "values": [{"label": "S"}, {"label": "M"}, {"label": "L"}, {"label": "XL"}]}]
  },
  {
    id: "low-waist-shaping-thong",
    name: "Low Waist Shaping Thong",
    category: "sculpture",
    price: 5,
    badge: "New",
    isNew: true,
    images: ["ic-thong", "ic-thong-poster", "ic-thong-poster2"],
    short: "Smooth. Sculpt. Slim. Confidence in every curve.",
    description: "A low-waist shaping thong with a textured, firm-control waistband that won't roll down. Cotton-lined, seamless and invisible under clothes.",
    benefits: ["Tummy control with firm compression", "Slimming effect for a sleek silhouette", "Breathable, cotton-lined fabric", "Textured waistband that doesn't roll down", "Seamless finish — disappears under clothes"],
    howTo: "Hand wash cold and lay flat to dry.",
    details: "Colours: Black, Nude, Pink, Gray · Sizes S (54 waist), M (58), L (62), XL (66)",
    claims: ["Seamless", "Tummy control"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#e0aa7c"}, {"label": "Pink", "hex": "#e2a7a2"}, {"label": "Gray", "hex": "#a7a7ad"}]}, {"name": "Size", "type": "button", "values": [{"label": "S (54 waist)"}, {"label": "M (58 waist)"}, {"label": "L (62 waist)"}, {"label": "XL (66 waist)"}]}]
  },

  /* ============================ NEW: BRAS & GLOW ============================ */
  {
    id: "lace-minimizer-bra",
    featured: 3,
    name: "Lace Minimizer Bra — Plus Size",
    category: "intimates",
    price: 25,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-lace-minimizer", "br-lace-minimizer-poster"],
    short: "Less bulk. More shape. All-day support. Floral lace and mesh, engineered for full busts.",
    description: "A beautiful lace-and-mesh minimizer bra that reduces bust projection for a smoother silhouette without flattening. Underwire and side support give natural shape and lift, with wide adjustable straps and a secure back closure for all-day comfort.",
    benefits: ["Minimizer effect for a smoother look", "Secure full-cup coverage", "Underwire and structured seams for lift", "Breathable mesh keeps you cool", "Wide, adjustable straps", "High-quality materials built to last"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "European band sizes 75–95 (≈ US 34–42) · Cups DD–HH, with extended I–JK",
    claims: ["Plus size", "Minimizer", "Lace"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#c4935a"}, {"label": "Royal Blue", "hex": "#1c3f8e"}, {"label": "Fuchsia", "hex": "#e03ba8"}, {"label": "Wine", "hex": "#5a0f21"}, {"label": "Emerald Green", "hex": "#0d4a2e"}]}, {"name": "Band (EU)", "type": "button", "values": [{"label": "75"}, {"label": "80"}, {"label": "85"}, {"label": "90"}, {"label": "95"}]}, {"name": "Cup", "type": "button", "values": [{"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}, {"label": "I"}, {"label": "J"}, {"label": "JJ"}, {"label": "K"}, {"label": "JK"}]}]
  },
  {
    id: "full-cup-lace-bra",
    featured: 5,
    name: "High Quality Full Cup Bra — Plus Size",
    category: "intimates",
    price: 25,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-fullcup-lace", "br-fullcup-lace-poster"],
    short: "Full coverage. Beautiful lift. Unmatched support — in eight colours.",
    description: "Premium support, beautiful by design. A full-cup underwire bra with an elegant lace and mesh finish and a multi-strap design that lifts and shapes beautifully. Wide wings and fully adjustable straps keep it comfortable and secure all day.",
    benefits: ["Full-cup coverage for confidence all day", "Multi-strap design for strong lift and support", "Exquisite lace design", "Breathable mesh", "Wide wings and secure fit", "Fully adjustable straps"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 34–42 · Cups DD–HH",
    claims: ["Plus size", "Full cup", "Lace"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Beige", "hex": "#e4c9a3"}, {"label": "Nude", "hex": "#cf9563"}, {"label": "Rose Dust", "hex": "#d29f9b"}, {"label": "Dusty Blue", "hex": "#9db0c9"}, {"label": "Wine", "hex": "#6b1a1f"}, {"label": "Dark Purple", "hex": "#4b2160"}, {"label": "Forest Green", "hex": "#1d5a3c"}]}, {"name": "Band", "type": "button", "values": [{"label": "34"}, {"label": "36"}, {"label": "38"}, {"label": "40"}, {"label": "42"}]}, {"name": "Cup", "type": "button", "values": [{"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}]}]
  },
  {
    id: "seamless-pushup-bra",
    featured: 8,
    name: "Seamless Push-Up Bra — Plus Size",
    category: "intimates",
    price: 20,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-seamless-pushup", "br-seamless-pushup-poster"],
    short: "Smooth. Supportive. Sculpting. Support where you need it, shape where you want it.",
    description: "A seamless push-up bra with 360° remodeling that gathers and lifts for a flattering shape. Smoothing side wings give a sleek silhouette with no bulge, and it's invisible under any outfit.",
    benefits: ["Push-up lift enhances shape and cleavage", "Smoothing side wings — no bulge", "Seamless and invisible under clothes", "Soft, breathable fabric", "Adjustable straps for a custom fit"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 36–48 · Cups C–F · 8 colours",
    claims: ["Plus size", "Seamless", "Push-up"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Dark Green", "hex": "#123d33"}, {"label": "Earth Yellow", "hex": "#d19a55"}, {"label": "Light Gray Purple", "hex": "#8f8aa3"}, {"label": "Red", "hex": "#a5161b"}, {"label": "Coffee", "hex": "#5d3424"}, {"label": "Dark Gray", "hex": "#3d3d40"}, {"label": "Bean Sand", "hex": "#d6a77c"}]}, {"name": "Band", "type": "button", "values": [{"label": "36"}, {"label": "38"}, {"label": "40"}, {"label": "42"}, {"label": "44"}, {"label": "46"}, {"label": "48"}]}, {"name": "Cup", "type": "button", "values": [{"label": "C"}, {"label": "D"}, {"label": "E"}, {"label": "F"}]}]
  },
  {
    id: "floral-lace-pushup-bra",
    featured: 1,
    name: "Floral Lace Push-Up Bra — Plus Size",
    category: "intimates",
    price: 25,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-floral-pushup", "br-floral-pushup-poster"],
    short: "Floral lace over sheer mesh with full-cup coverage and strong lift. Feel beautiful, feel you.",
    description: "A full-cup push-up bra in delicate floral lace over sheer mesh. The multi-strap design lifts and shapes beautifully, wide wings keep it secure, and smoothing side wings give a sleek line under clothes.",
    benefits: ["Full-cup coverage", "Strong lift and support", "Comfortable and secure wide wings", "Smoothing side wings", "Adjustable straps"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 36–48 · Cups C–F",
    claims: ["Plus size", "Lace", "Push-up"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Dark Blue", "hex": "#1f3f99"}, {"label": "Taupe Floral", "hex": "#a89a8a"}, {"label": "Pink Floral", "hex": "#e040c8"}]}, {"name": "Band", "type": "button", "values": [{"label": "36"}, {"label": "38"}, {"label": "40"}, {"label": "42"}, {"label": "44"}, {"label": "46"}, {"label": "48"}]}, {"name": "Cup", "type": "button", "values": [{"label": "C"}, {"label": "D"}, {"label": "E"}, {"label": "F"}]}]
  },
  {
    id: "strappy-mesh-pushup-bra",
    featured: 4,
    name: "Strappy Mesh Push-Up Bra — Plus Size",
    category: "intimates",
    price: 25,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-strappy-pushup", "br-strappy-pushup-poster"],
    short: "Sheer mesh, lace detail and a statement multi-strap design. Seamless, smooth and supportive.",
    description: "A modern full-cup push-up bra with breathable sheer mesh, lace detailing and a statement multi-strap neckline. 360° remodeling lifts and shapes, while smoothing side wings and adjustable straps give a secure, custom fit.",
    benefits: ["Push-up enhancement for shape and cleavage", "Seamless and smooth under any outfit", "Breathable mesh keeps you cool", "Smoothing side wings", "Adjustable straps"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 36–48 · Cups C–F",
    claims: ["Plus size", "Mesh", "Push-up"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Dark Blue", "hex": "#1b2a55"}, {"label": "Taupe Floral", "hex": "#cdb3a8"}, {"label": "Pink Floral", "hex": "#e070d0"}]}, {"name": "Band", "type": "button", "values": [{"label": "36"}, {"label": "38"}, {"label": "40"}, {"label": "42"}, {"label": "44"}, {"label": "46"}, {"label": "48"}]}, {"name": "Cup", "type": "button", "values": [{"label": "C"}, {"label": "D"}, {"label": "E"}, {"label": "F"}]}]
  },
  {
    id: "lace-mesh-underwire-set",
    featured: 2,
    name: "Lace & Mesh Underwire Set — Plus Size",
    category: "intimates",
    price: 25,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-lace-mesh-set", "br-lace-mesh-set-poster"],
    short: "Supportive. Breathable. Beautiful. Support your shape, celebrate your curves.",
    description: "A plus-size lace and mesh underwire bra set with soft lace details, breathable mesh and adjustable straps. Underwire lifts and shapes beautifully — available in an extended range of cup sizes.",
    benefits: ["Underwire lift and support", "Breathable mesh", "Adjustable straps for a custom fit", "Soft lace details", "Extended cup sizes up to T"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 38–48 · Cups DD–HH, with extended I–T",
    claims: ["Plus size", "Lace", "Set"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Black", "hex": "#161414"}, {"label": "Nude", "hex": "#d3a07a"}, {"label": "Royal Blue", "hex": "#1c3f9a"}, {"label": "Fuchsia", "hex": "#e03ba8"}]}, {"name": "Band", "type": "button", "values": [{"label": "38"}, {"label": "40"}, {"label": "42"}, {"label": "44"}, {"label": "46"}, {"label": "48"}]}, {"name": "Cup", "type": "button", "values": [{"label": "D"}, {"label": "DD"}, {"label": "E"}, {"label": "F"}, {"label": "FF"}, {"label": "G"}, {"label": "GG"}, {"label": "H"}, {"label": "HH"}, {"label": "I"}, {"label": "J"}, {"label": "JJ"}, {"label": "K"}, {"label": "KK"}, {"label": "L"}, {"label": "M"}, {"label": "N"}, {"label": "O"}, {"label": "P"}, {"label": "Q"}, {"label": "R"}, {"label": "S"}, {"label": "T"}]}]
  },
  {
    id: "lace-plus-size-bra",
    featured: 6,
    name: "Lace Plus Size Bra",
    category: "intimates",
    price: 20,
    badge: "New",
    isNew: true,
    sizeGuide: "bra",
    images: ["br-lace-bra", "br-lace-bra-poster"],
    short: "Confidence. Comfort. Curves. Beautiful lace support in every size.",
    description: "A lace underwire bra thoughtfully designed for all-day comfort, lift and a flawless fit, with adjustable straps and a secure hook-and-eye back.",
    benefits: ["Supportive underwire fit", "Soft and comfortable lace", "Made for curves", "Confidence in every detail"],
    howTo: "Hand wash cold and lay flat to dry. Not sure of your size? Use our Size Guide or message us on WhatsApp.",
    details: "US band sizes 34–48 · Cups C and D",
    claims: ["Plus size", "Lace"],
    options: [{"name": "Colour", "type": "swatch", "values": [{"label": "Navy", "hex": "#1d2550"}, {"label": "Teal", "hex": "#0c6a70"}, {"label": "Red", "hex": "#c0151c"}]}, {"name": "Band", "type": "button", "values": [{"label": "34"}, {"label": "36"}, {"label": "38"}, {"label": "40"}, {"label": "42"}, {"label": "44"}, {"label": "46"}, {"label": "48"}]}, {"name": "Cup", "type": "button", "values": [{"label": "C"}, {"label": "D"}]}]
  },
  {
    id: "golden-hour-glow-kit",
    name: "The Golden Hour Glow Kit",
    category: "makeup",
    sub: "sets",
    price: 62,
    compareAt: 75,
    badge: "Save $13",
    isNew: true,
    images: ["mk-golden-hour", "mk-golden-hour-poster"],
    short: "Radiance & dimension — sculpted to perfection, kissed by light. Value $75.",
    description: "Catch the light from every single angle. Cream contour defines your bone structure while our bronzer and shimmering spray melt together for that effortless, lit-from-within warmth. Limited launch stock available.",
    benefits: ["Cream Contour ($15)", "Bronzer / Luminizer ($20)", "Highlighter Powder ($20)", "Shimmering Glow Spray ($20)"],
    howTo: "Contour under the cheekbones and along the jaw, sweep bronzer where the sun hits, tap highlighter on the high points and mist the glow spray to finish.",
    details: "Bundle launch price $62 (retail value $75) · Limited launch stock",
    claims: ["Bundle", "Save $13", "Limited"]
  },
  {
    id: "cream-contour",
    name: "Cream Contour Stick",
    category: "makeup",
    sub: "highlight",
    price: 15,
    isNew: true,
    images: ["mk-cream-contour", "mk-collection"],
    short: "A creamy contour stick that defines your bone structure with ease.",
    description: "Sculpt and define with a creamy, blendable contour stick in a gold-and-black case. Swipe on, blend out and build for soft or dramatic definition.",
    benefits: ["Creamy, blendable texture", "Buildable definition", "Easy swipe-on stick"],
    howTo: "Swipe under the cheekbones, along the jaw and the sides of the nose, then blend with a sponge or brush.",
    details: "Part of The Golden Hour Glow Kit",
    claims: ["Contour"]
  },
  {
    id: "bronzer-luminizer",
    name: "Bronzer / Luminizer",
    category: "makeup",
    sub: "highlight",
    price: 20,
    isNew: true,
    images: ["mk-bronzer", "mk-collection"],
    short: "A warm, radiant bronzer for sun-kissed, lit-from-within warmth.",
    description: "A finely milled bronzing and luminizing powder that adds warmth and a soft glow to melanin-rich skin.",
    benefits: ["Warm, radiant finish", "Finely milled and blendable", "Buildable glow"],
    howTo: "Sweep where the sun naturally hits — forehead, cheekbones and jaw.",
    details: "Part of The Golden Hour Glow Kit",
    claims: ["Bronzer", "Glow"]
  },
  {
    id: "highlighter-powder",
    name: "Highlighter Powder",
    category: "makeup",
    sub: "highlight",
    price: 20,
    isNew: true,
    images: ["mk-highlighter", "mk-collection"],
    short: "A luminous highlighter powder that catches the light from every angle.",
    description: "A silky highlighting powder with a radiant, light-catching finish for cheekbones, brow bones and the bridge of the nose.",
    benefits: ["Light-catching radiance", "Silky, blendable texture", "Buildable from soft glow to statement shine"],
    howTo: "Tap onto the high points of the face with a fan or small brush.",
    details: "Part of The Golden Hour Glow Kit",
    claims: ["Highlighter", "Glow"]
  },
  {
    id: "shimmer-glow-spray",
    name: "Shimmer Glow Spray",
    category: "makeup",
    sub: "highlight",
    price: 20,
    isNew: true,
    images: ["mk-glow-spray", "mk-collection"],
    short: "A shimmering glow spray that melts into skin for an effortless finish.",
    description: "Mist on for an all-over luminous sheen that sets and illuminates your makeup. Use on the face, collarbones and shoulders.",
    benefits: ["All-over shimmering glow", "Fine, even mist", "Finishes and illuminates your look"],
    howTo: "Shake well and mist 20 cm from the face after makeup, or over collarbones and shoulders.",
    details: "Part of The Golden Hour Glow Kit",
    claims: ["Glow", "Shimmer"]
  }
];
