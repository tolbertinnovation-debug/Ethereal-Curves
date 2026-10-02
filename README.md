# Ethereal Curves — Online Store

**Luxury Designed For You.** The e-commerce website for **Ethereal Curves**, a brand of
**The Ethereal Collective Inc**, founded by **Musu Deshield Mitchell**.

This is a fast, mobile-first store for the brand's collections: **Makeup** (lipstick, glossy and
matte lip gloss, foundation, loose and pressed powder, designer & brands), **Radiance** (skincare,
body care, body shimmer and men's grooming — with curated brands such as COSRX, Isntree, Vaseline,
Dr Teal's, Medix 5.5, EELHOE, Handaiyan, Seline Girl, LOOKME, Balance Active Formula and East Moon), **Sculpture** (shapewear), **Intimates & Lingerie**, **Essence** (fragrance),
**Essentials** (shoes, handbags, jewelry, watches), **Accessories** and **Vitality** (wellness).
Collections without products yet show an elegant "Coming soon" page. It needs **no server, database or monthly platform fee**. It's plain
HTML, CSS and JavaScript, and you can host it free on GitHub Pages, Netlify or Cloudflare Pages.

---

## What the store does

| Feature | Details |
|---|---|
| **Luxury black & gold design** | Matches your packaging, with your gold moon logo, elegant serif and script fonts, and smooth animations |
| **Home page** | Rotating hero slideshow, category tiles, "Most Loved" product tabs, an interactive 24-shade lip gloss bar, a shapewear feature, the Shade Finder, brand promises, a lookbook gallery and a VIP sign-up |
| **Shop** | Filter by category, price and highlights (new, bestseller, vegan). Sort by price, name and more. Live search across products and shade names |
| **Product pages** | Photo gallery with zoom (desktop) and swipe (phone), colour swatches for shades, size pickers, quantity, wishlist, "Ask on WhatsApp", details sections, "You may also love" and "Recently viewed" |
| **Quick view** | Pick a shade and add to the bag without leaving the page |
| **Shopping bag** | Slide-out bag, free-delivery progress bar, promo codes, "Complete your look" suggestions, plus a one-tap "Order on WhatsApp" |
| **Checkout built for Liberia** | Delivery in Monrovia, pickup, all 15 counties, or international. Payment by **Lonestar MTN Mobile Money**, **Ecobank bank transfer** (USD or LRD) or **cash on delivery**. The order goes straight to your WhatsApp with every detail |
| **Order confirmation** | Order number, mobile money number and amount with copy buttons, a full receipt, and a resend by WhatsApp or email |
| **USD ⇄ LRD** | Customers can view prices in Liberian dollars at the rate you set |
| **Shade Finder** | A 3-question quiz that matches foundation, powder, lip gloss and body serum. Customers can add the whole look to their bag in one tap |
| **Size Guide** | Bra size calculator (inches or cm) and a shapewear size finder |
| **Pages** | Our Story, Contact (sends through WhatsApp or email), FAQ with delivery, returns and payment info, Wishlist |
| **Extras** | Floating WhatsApp button, search-engine data (SEO), share previews for social media, can be installed on phones like an app, keyboard- and screen-reader friendly |

---

## How to edit your store (no coding needed)

All your settings live in **two files**:

### 1. `assets/js/config.js`: business settings
- WhatsApp number that receives orders, phone numbers, email
- **Exchange rate** (`lrdRate`). Update it when the rate changes
- Delivery options and fees, and the free-delivery amount
- **Mobile money numbers and account names.** ⚠️ Please confirm these are correct
- Promo codes (for example `WELCOME10`)
- Announcement bar messages
- Instagram, Facebook and TikTok links (paste them in and the icons appear automatically)

### 2. `assets/js/products.js`: your collections and products
The `CATEGORIES` list at the top holds each collection's name, short tile text and full
description. Each product has a `category` (for example `"sculpture"`) and, for makeup, a `sub`
collection (for example `"lipstick"`). When you add the first product to Essence, Essentials,
Accessories or Vitality, "Coming soon" disappears for that collection automatically.

Each product is one block. To **change a price**, edit `price: 15`. To **add a product**,
copy an existing block, give it a new `id`, and change the text, price, shades and images.
- `badge: "New"` shows a label on the product
- `compareAt: 20` shows a sale price (the old price crossed out)
- `soldOut: true` replaces "Add to bag" with "Notify me on WhatsApp"

### Adding photos
Put images in `assets/img/` as `.webp` files, in two sizes: `name.webp` (about 1200px) and
`name-sm.webp` (about 600px). In `products.js`, list them by name without `.webp`, for example
`images: ["my-new-gloss"]`. Free converter: https://squoosh.app

---

## ⚠️ Still to confirm

1. **Isntree prices.** The Green Tea Fresh Emulsion is $40. You sent $40 for the sun gel + moist
   cream poster; the site sells those two at $20 each. Change them in `products.js` if it is $40 each.
2. **COSRX Salicylic Acid Cleanser** price ($16) is still a placeholder.
3. **Shimmer Body Serum (Handaiyan)** shows shades #3 and #4 only. Add #1 Pearl Glow and #2 Rose
   Glow in `products.js` if you stock them.
4. **Bra & panty sizes** for the Everyday Bras and Everyday Panties are typical ranges — check them
   against your stock.
5. **Store opening days.** Hours show 9:00 AM – 8:00 PM; add the days in `config.js` if needed.
6. **Orange Money** is switched off until the account is registered (see `config.js`).
7. **Exchange rate** is L$182.4 = $1 (October 2026). Update `lrdRate` in `config.js` when it moves.
8. **Returns policy (FAQ page)** says 7-day exchanges for unopened items. Adjust it to your policy.

---

## Putting the site online (free) with GitHub Pages

1. Merge this branch into `main`.
2. On GitHub, open the repository → **Settings** → **Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, then **main** and **/ (root)**,
   and click **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.
5. Optional: to use your own domain (for example `etherealcurves.com`), add it under
   **Custom domain** on the same page.

To preview on your own computer, run `python3 -m http.server` in this folder and open
http://localhost:8000.

---

## How orders work

The store has no card processor or server, which suits how customers pay in Liberia.
1. The customer fills in the bag and checkout.
2. When they tap **"Place order & confirm on WhatsApp"**, WhatsApp opens with the complete order
   ready to send to you: items, shades, sizes, totals in USD and LRD, address and payment method.
3. The confirmation page shows them your mobile money number, the amount and the order number
   to use as the payment reference.
4. You confirm the order, receive the payment, and arrange delivery on WhatsApp.

**Ready to grow?** When you want card payments, stock tracking and an admin dashboard, the same
design and products can move to Shopify, or connect to a payment provider that serves Liberia.

---

© The Ethereal Collective Inc. All rights reserved.
