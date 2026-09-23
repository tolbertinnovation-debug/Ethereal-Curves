/* =====================================================================
   ETHEREAL CURVES — Storefront application
   Single-page store: routing, catalog, bag, checkout, shade finder.
   You normally don't need to edit this file — see config.js and
   products.js for store settings and products.
   ===================================================================== */
(function () {
  "use strict";

  var S = window.STORE;
  var PRODUCTS = window.PRODUCTS;
  var CATS = window.CATEGORIES;
  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });
  function subOf(p) {
    var c = catById[p.category];
    return c && c.subs ? c.subs.find(function (x) { return x.id === p.sub; }) : null;
  }
  function catCount(id) { return PRODUCTS.filter(function (p) { return p.category === id; }).length; }
  function shortName(c) { return c.short || c.name; }

  /* ------------------------------------------------------------------
     Utilities
     ------------------------------------------------------------------ */
  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function img(name, small) { return "assets/img/" + name + (small ? "-sm" : "") + ".webp"; }
  function round2(n) { return Math.round(n * 100) / 100; }
  function fmtPhone(d) { return "+" + d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6, 9) + " " + d.slice(9); }
  function waLink(text) { return "https://wa.me/" + S.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }

  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem("ec_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("ec_" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
    }
  };

  var state = {
    cart: store.get("cart", []),
    wish: store.get("wish", []),
    currency: store.get("currency", S.currency.default || "USD"),
    promo: store.get("promo", null),
    recent: store.get("recent", []),
    orders: store.get("orders", {})
  };
  // drop cart lines whose product was removed from the catalog
  state.cart = state.cart.filter(function (l) { return byId[l.id]; });

  function money(usd, cur) {
    cur = cur || state.currency;
    if (cur === "LRD") return "L$" + Math.round(usd * S.currency.lrdRate).toLocaleString("en-US");
    return "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function altMoney(usd) { return state.currency === "LRD" ? money(usd, "USD") : "≈ " + money(usd, "LRD"); }

  var ICON = {
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20z"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
    mobile: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 16 16 3l5 5L8 21z"/><path d="m7 12 2 2M10 9l2 2M13 6l2 2"/></svg>',
    hanger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a2 2 0 1 1 2-2c0 1.2-2 1.8-2 3.2V9l9 7.5a1 1 0 0 1-.6 1.8H3.6a1 1 0 0 1-.6-1.8L12 9"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
    filter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="8" width="17" height="4"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8c-1-3-5-4-5-1.5S12 8 12 8zm0 0c1-3 5-4 5-1.5S12 8 12 8z"/></svg>',
    drop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/></svg>',
    wa: '<svg viewBox="0 0 32 32" aria-hidden="true" style="stroke:none"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.4 4.6 5 5"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>',
    perfume: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9.5" y="3" width="5" height="3.5" rx=".8"/><path d="M11 6.5v2M13 6.5v2"/><rect x="5.5" y="8.5" width="13" height="12.5" rx="3"/><path d="M9 14.5h6"/></svg>',
    gem: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4h11L21 9l-9 11L3 9z"/><path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ------------------------------------------------------------------
     Overlays (drawers, search, modal, lightbox)
     ------------------------------------------------------------------ */
  var scrim = $("#scrim");
  var openName = null;
  var lastFocus = null;
  var overlayIds = { cart: "cartDrawer", nav: "mobileNav", search: "search", modal: "modal", lightbox: "lightbox", filters: "filters" };

  function overlayEl(name) { return document.getElementById(overlayIds[name]); }

  function openOverlay(name) {
    if (openName) closeOverlay(true);
    var el = overlayEl(name);
    if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add("is-open");
    if (name !== "filters") el.setAttribute("aria-hidden", "false");
    scrim.classList.add("is-on");
    document.body.classList.add("locked");
    openName = name;
    if (name === "nav") $("#menuOpen").setAttribute("aria-expanded", "true");
    setTimeout(function () {
      var f = name === "search" ? $("#searchInput") : el.querySelector("[data-autofocus], button, a[href], input, select");
      if (f) f.focus({ preventScroll: true });
    }, 60);
  }

  function closeOverlay(silent) {
    if (!openName) return;
    var el = overlayEl(openName);
    if (el) {
      el.classList.remove("is-open");
      if (openName !== "filters") el.setAttribute("aria-hidden", "true");
    }
    if (openName === "nav") $("#menuOpen").setAttribute("aria-expanded", "false");
    scrim.classList.remove("is-on");
    document.body.classList.remove("locked");
    openName = null;
    if (!silent && lastFocus && document.body.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  scrim.addEventListener("click", function () { closeOverlay(); });
  $("#modal").addEventListener("click", function (e) { if (e.target.id === "modal") closeOverlay(); });
  $("#lightbox").addEventListener("click", function (e) { if (e.target.id === "lightbox") closeOverlay(); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openName) { closeOverlay(); return; }
    if (e.key === "Tab" && openName) {
      var el = overlayEl(openName);
      if (!el) return;
      var f = $$("a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])", el)
        .filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function openModal(html, textual) {
    $("#modalBody").innerHTML = html;
    $("#modal").classList.toggle("modal--text", !!textual);
    $("#modal .modal__panel").scrollTop = 0;
    openOverlay("modal");
  }

  function openLightbox(src, alt) {
    var i = $("#lightboxImg");
    i.src = src;
    i.alt = alt || "";
    openOverlay("lightbox");
  }

  /* ------------------------------------------------------------------
     Toasts
     ------------------------------------------------------------------ */
  function toast(msg, opts) {
    opts = opts || {};
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = (opts.image ? '<img src="' + img(opts.image, true) + '" alt="">' : "") +
      "<span>" + msg + "</span>" + (opts.link ? '<a href="' + opts.link[1] + '">' + opts.link[0] + "</a>" : "");
    $("#toasts").appendChild(t);
    setTimeout(function () {
      t.classList.add("out");
      setTimeout(function () { t.remove(); }, 400);
    }, opts.ms || 3200);
  }

  function copyText(text, label) {
    function done() { toast((label || "Copied") + " copied to clipboard"); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Please copy: " + esc(text)); }
      ta.remove();
    }
  }

  /* ------------------------------------------------------------------
     Wishlist
     ------------------------------------------------------------------ */
  function isWished(id) { return state.wish.indexOf(id) > -1; }
  function toggleWish(id) {
    var on = !isWished(id);
    if (on) state.wish.push(id); else state.wish = state.wish.filter(function (w) { return w !== id; });
    store.set("wish", state.wish);
    $$('[data-action="wish"][data-id="' + id + '"]').forEach(function (b) {
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on);
    });
    updateCounts();
    toast(on ? "Saved to your wishlist" : "Removed from your wishlist", on ? { image: byId[id].images[0], link: ["View", "#/wishlist"] } : {});
    if (currentRoute.name === "wishlist") render();
  }

  /* ------------------------------------------------------------------
     Cart
     ------------------------------------------------------------------ */
  function lineKey(id, opts) {
    var keys = Object.keys(opts || {}).sort();
    return id + "|" + keys.map(function (k) { return k + "=" + opts[k]; }).join("|");
  }

  function saveCart() {
    store.set("cart", state.cart);
    updateCounts();
    renderCart();
    if (currentRoute.name === "checkout") render();
  }

  function addToCart(id, opts, qty) {
    var key = lineKey(id, opts);
    var line = state.cart.find(function (l) { return l.key === key; });
    if (line) line.qty = Math.min(99, line.qty + qty);
    else state.cart.push({ key: key, id: id, opts: opts || {}, qty: qty });
    saveCart();
    var b = $("#cartCount");
    b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }

  function setQty(key, qty) {
    var line = state.cart.find(function (l) { return l.key === key; });
    if (!line) return;
    if (qty <= 0) state.cart = state.cart.filter(function (l) { return l.key !== key; });
    else line.qty = Math.min(99, qty);
    saveCart();
  }

  function cartCount() { return state.cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function subtotal() { return round2(state.cart.reduce(function (n, l) { return n + byId[l.id].price * l.qty; }, 0)); }

  function discountFor(sub) {
    if (!state.promo) return 0;
    var p = S.promoCodes[state.promo];
    if (!p) return 0;
    return round2(p.type === "percent" ? sub * p.value / 100 : Math.min(p.value, sub));
  }

  function deliveryFee(methodId, afterDiscount) {
    var m = S.delivery.find(function (d) { return d.id === methodId; });
    if (!m) return 0;
    if (m.fee === null) return null;
    if (m.freeEligible && afterDiscount >= S.freeDeliveryOver) return 0;
    return m.fee;
  }

  function applyPromo(code) {
    code = (code || "").trim().toUpperCase();
    if (!code) return;
    if (S.promoCodes[code]) {
      state.promo = code;
      store.set("promo", code);
      toast("Code " + esc(code) + " applied — " + esc(S.promoCodes[code].label));
    } else {
      toast("Sorry, that code isn't valid");
    }
    renderCart();
    if (currentRoute.name === "checkout") render();
  }

  function removePromo() {
    state.promo = null;
    store.set("promo", null);
    renderCart();
    if (currentRoute.name === "checkout") render();
  }

  function optsText(opts) {
    return Object.keys(opts).map(function (k) { return k + ": " + opts[k]; }).join(", ");
  }

  function optsHTML(p, opts) {
    return Object.keys(opts).map(function (k) {
      var o = (p.options || []).find(function (x) { return x.name === k; });
      var v = o && o.values.find(function (x) { return x.label === opts[k]; });
      var dot = v && v.hex ? '<i style="background:' + v.hex + '"></i>' : "";
      return "<span>" + dot + esc(opts[k]) + "</span>";
    }).join("");
  }

  function lineHTML(l, compact) {
    var p = byId[l.id];
    var media = compact
      ? '<span class="qbadge"><img src="' + img(p.images[0], true) + '" alt=""><b>' + l.qty + "</b></span>"
      : '<a href="#/product/' + p.id + '"><img src="' + img(p.images[0], true) + '" alt=""></a>';
    var controls = compact ? "" :
      '<div class="qty qty--sm" role="group" aria-label="Quantity">' +
        '<button type="button" data-action="line-qty" data-key="' + esc(l.key) + '" data-d="-1" aria-label="Decrease quantity">−</button>' +
        '<input type="number" value="' + l.qty + '" min="1" max="99" readonly aria-label="Quantity">' +
        '<button type="button" data-action="line-qty" data-key="' + esc(l.key) + '" data-d="1" aria-label="Increase quantity">+</button>' +
      "</div>";
    return '<div class="line">' + media +
      '<div><a class="line__name" href="#/product/' + p.id + '">' + esc(p.name) + "</a>" +
      '<div class="line__opts">' + optsHTML(p, l.opts) + "</div>" + controls + "</div>" +
      '<div class="line__right"><span class="price">' + money(p.price * l.qty) + "</span>" +
      (compact ? "" : '<button type="button" class="line__remove" data-action="line-remove" data-key="' + esc(l.key) + '">Remove</button>') +
      "</div></div>";
  }

  function shipBarHTML() {
    var sub = subtotal() - discountFor(subtotal());
    var left = S.freeDeliveryOver - sub;
    var pct = Math.min(100, sub / S.freeDeliveryOver * 100);
    var msg = left > 0
      ? "You're <b>" + money(left) + "</b> away from free Monrovia delivery"
      : "✦ You've unlocked <b>free delivery</b> in Monrovia";
    return '<div class="ship-bar">' + msg + '<div class="ship-bar__track"><div class="ship-bar__fill" style="width:' + pct + '%"></div></div></div>';
  }

  function promoHTML() {
    if (state.promo && S.promoCodes[state.promo]) {
      return '<div class="promo"><span class="chip is-active">' + esc(state.promo) + '</span><button type="button" class="link" data-action="promo-remove">Remove</button></div>';
    }
    return '<form class="promo" data-promo-form><input name="code" placeholder="Promo code" aria-label="Promo code" autocomplete="off"><button class="btn btn--outline btn--sm" type="submit">Apply</button></form>';
  }

  function renderCart() {
    var body = $("#cartBody"), foot = $("#cartFoot");
    $("#cartTitle").textContent = "Your Bag" + (cartCount() ? " (" + cartCount() + ")" : "");
    if (!state.cart.length) {
      body.innerHTML = '<div class="empty">' + ICON.bag + '<h3 class="h-md">Your bag is empty</h3><p class="muted">Luxury is waiting for you.</p>' +
        '<div class="actions"><a class="btn btn--dark" href="#/shop?cat=makeup">Shop makeup</a><a class="btn btn--outline" href="#/shop?cat=sculpture">Shop sculpture</a></div></div>';
      foot.innerHTML = "";
      return;
    }
    var inCart = state.cart.map(function (l) { return l.id; });
    var ups = PRODUCTS.filter(function (p) { return p.bestseller && inCart.indexOf(p.id) < 0; }).slice(0, 2);
    body.innerHTML = shipBarHTML() + state.cart.map(function (l) { return lineHTML(l); }).join("") +
      (ups.length ? '<div class="upsell"><h3>Complete your look</h3>' + ups.map(function (p) {
        return '<div class="upsell__item"><img src="' + img(p.images[0], true) + '" alt=""><div><a href="#/product/' + p.id + '">' + esc(p.name) + '</a><br><span class="muted">' + money(p.price) + '</span></div>' +
          '<button class="btn btn--outline btn--sm" data-action="quick" data-id="' + p.id + '">Add</button></div>';
      }).join("") + "</div>" : "");
    var sub = subtotal(), disc = discountFor(sub);
    foot.innerHTML = promoHTML() +
      '<div class="totals"><div><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
      (disc ? '<div class="disc"><span>Discount (' + esc(state.promo) + ')</span><span>−' + money(disc) + "</span></div>" : "") +
      '<div class="grand"><span>Total</span><span>' + money(sub - disc) + "</span></div></div>" +
      '<p class="cart-note">Delivery calculated at checkout · ' + altMoney(sub - disc) + "</p>" +
      '<a class="btn btn--gold btn--block" href="#/checkout" style="margin-top:14px">Checkout ' + ICON.arrow + "</a>" +
      '<a class="btn btn--wa btn--block" style="margin-top:8px" target="_blank" rel="noopener" href="' + waLink(cartMessage()) + '">' + ICON.wa + " Order on WhatsApp</a>";
  }

  function cartMessage() {
    var lines = state.cart.map(function (l) {
      var p = byId[l.id];
      return "• " + l.qty + " × " + p.name + (Object.keys(l.opts).length ? " (" + optsText(l.opts) + ")" : "") + " — " + money(p.price * l.qty, "USD");
    });
    var sub = subtotal(), disc = discountFor(sub);
    return "Hello Ethereal Curves! I'd like to order:\n\n" + lines.join("\n") +
      (disc ? "\n\nPromo " + state.promo + ": −" + money(disc, "USD") : "") +
      "\n\nItems total: " + money(sub - disc, "USD") + "\n\nPlease let me know about delivery. Thank you!";
  }

  function updateCounts() {
    var c = cartCount(), w = state.wish.length;
    var cc = $("#cartCount"), wc = $("#wishCount");
    cc.textContent = c; cc.hidden = !c;
    wc.textContent = w; wc.hidden = !w;
    $("#cartOpen").setAttribute("aria-label", "Open shopping bag, " + c + " item" + (c === 1 ? "" : "s"));
  }

  /* ------------------------------------------------------------------
     Product forms (option selection, qty) — shared by PDP & quick view
     ------------------------------------------------------------------ */
  var forms = {};
  var formSeq = 0;

  function needsChoice(p) { return (p.options || []).some(function (o) { return o.values.length > 1; }); }

  function newForm(p) {
    var id = "f" + (++formSeq);
    var sel = {};
    (p.options || []).forEach(function (o) {
      if (o.values.length === 1 || o.type === "swatch" || o.name === "Finish") sel[o.name] = o.values[0].label;
    });
    forms[id] = { pid: p.id, sel: sel, qty: 1 };
    return id;
  }

  function chooseLabel(p) {
    var o = (p.options || []).find(function (x) { return x.values.length > 1; });
    if (!o) return "Add to bag";
    return "Choose " + (o.name === "Band" || o.name === "Cup" ? "size" : o.name.toLowerCase());
  }

  function optionsHTML(p, fid) {
    var f = forms[fid];
    var guideShown = false;
    return (p.options || []).map(function (o) {
      var cur = f.sel[o.name];
      var guide = "";
      if (p.sizeGuide && o.type === "button" && o.name !== "Finish" && !guideShown) {
        guideShown = true;
        guide = '<button type="button" class="link" data-action="size-guide" data-guide="' + p.sizeGuide + '">' + "Size guide</button>";
      }
      var head = '<div class="opt__head"><div><b>' + esc(o.name) + '</b><span data-optlabel="' + esc(o.name) + '">' + (cur ? esc(cur) : "Please select") + "</span></div>" + guide + "</div>";
      var vals;
      if (o.type === "swatch") {
        vals = '<div class="swatches" role="radiogroup" aria-label="' + esc(o.name) + '">' + o.values.map(function (v) {
          var on = cur === v.label;
          return '<button type="button" class="swatch' + (on ? " is-on" : "") + '" style="background:' + v.hex + '" role="radio" aria-checked="' + on +
            '" aria-label="' + esc(v.label) + '" title="' + esc(v.label) + '" data-action="opt" data-form="' + fid + '" data-opt="' + esc(o.name) + '" data-val="' + esc(v.label) + '"></button>';
        }).join("") + "</div>";
      } else {
        vals = '<div class="sizes" role="radiogroup" aria-label="' + esc(o.name) + '">' + o.values.map(function (v) {
          var on = cur === v.label;
          return '<button type="button" class="size' + (on ? " is-on" : "") + '" role="radio" aria-checked="' + on + '" data-action="opt" data-form="' + fid +
            '" data-opt="' + esc(o.name) + '" data-val="' + esc(v.label) + '">' + esc(v.label) + "</button>";
        }).join("") + "</div>";
      }
      return '<div class="opt" data-optwrap="' + esc(o.name) + '">' + head + vals + "</div>";
    }).join("");
  }

  function qtyHTML(fid) {
    return '<div class="qty" role="group" aria-label="Quantity">' +
      '<button type="button" data-action="qty" data-form="' + fid + '" data-d="-1" aria-label="Decrease quantity">−</button>' +
      '<input type="number" min="1" max="99" value="1" data-qty="' + fid + '" aria-label="Quantity">' +
      '<button type="button" data-action="qty" data-form="' + fid + '" data-d="1" aria-label="Increase quantity">+</button></div>';
  }

  function selectOpt(btn) {
    var f = forms[btn.dataset.form];
    if (!f) return;
    var name = btn.dataset.opt, val = btn.dataset.val;
    f.sel[name] = val;
    $$('[data-action="opt"][data-form="' + btn.dataset.form + '"]').forEach(function (b) {
      if (b.dataset.opt !== name) return;
      var on = b.dataset.val === val;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-checked", on);
    });
    $$("[data-optlabel]").forEach(function (l) {
      if (l.dataset.optlabel === name && l.closest("[data-formroot='" + btn.dataset.form + "']")) l.textContent = val;
    });
    var wrap = btn.closest(".opt");
    if (wrap) wrap.classList.remove("opt--missing");
  }

  function submitForm(fid) {
    var f = forms[fid];
    if (!f) return false;
    var p = byId[f.pid];
    var root = $("[data-formroot='" + fid + "']");
    var missing = (p.options || []).filter(function (o) { return !f.sel[o.name]; });
    if (missing.length) {
      missing.forEach(function (o) {
        var w = root && $$(".opt", root).find(function (x) { return x.dataset.optwrap === o.name; });
        if (w) { w.classList.remove("opt--missing"); void w.offsetWidth; w.classList.add("opt--missing"); }
      });
      var first = root && $(".opt--missing", root);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      toast("Please choose your " + missing.map(function (o) { return o.name.toLowerCase(); }).join(" & "));
      return false;
    }
    var q = $("[data-qty='" + fid + "']");
    var qty = Math.max(1, Math.min(99, parseInt(q ? q.value : f.qty, 10) || 1));
    var opts = {};
    (p.options || []).forEach(function (o) { opts[o.name] = f.sel[o.name]; });
    addToCart(p.id, opts, qty);
    return true;
  }

  function afterAdd(p) {
    closeOverlay(true);
    renderCart();
    openOverlay("cart");
    toast("Added to your bag", { image: p.images[0] });
  }

  /* ------------------------------------------------------------------
     Product card & grids
     ------------------------------------------------------------------ */
  function miniSwatches(p) {
    var o = (p.options || []).find(function (x) { return x.type === "swatch" && x.values.length > 1; });
    if (!o) return "";
    var noun = o.name === "Colour" ? "colours" : "shades";
    var total = p.id === "charm-gloss" ? 24 : o.values.length;
    return '<span class="minisw" aria-label="' + total + " " + noun + '">' + o.values.slice(0, 4).map(function (v) {
      return '<i style="background:' + v.hex + '"></i>';
    }).join("") + "<small>" + total + " " + noun + "</small></span>";
  }

  function badgeHTML(p) {
    if (!p.badge) return p.compareAt ? '<span class="badge badge--sale">Sale</span>' : "";
    var cls = /new/i.test(p.badge) ? " badge--new" : /sale/i.test(p.badge) ? " badge--sale" : "";
    return '<span class="badge' + cls + '">' + esc(p.badge) + "</span>";
  }

  function priceHTML(p) {
    return money(p.price) + (p.compareAt ? "<s>" + money(p.compareAt) + "</s>" : "");
  }

  function cardHTML(p) {
    var alt = p.images[1] ? '<img class="alt" src="' + img(p.images[1], true) + '" alt="" loading="lazy">' : "";
    var choose = needsChoice(p);
    return '<article class="card">' +
      '<a class="card__media" href="#/product/' + p.id + '" aria-label="' + esc(p.name) + '">' + badgeHTML(p) +
        '<img src="' + img(p.images[0], true) + '" alt="' + esc(p.name) + '" loading="lazy">' + alt + "</a>" +
      '<button type="button" class="card__wish' + (isWished(p.id) ? " is-on" : "") + '" data-action="wish" data-id="' + p.id + '" aria-pressed="' + isWished(p.id) + '" aria-label="Save ' + esc(p.name) + ' to wishlist">' + ICON.heart + "</button>" +
      (p.soldOut ? "" : '<div class="card__quick"><button type="button" class="btn" data-action="' + (choose ? "quick" : "add") + '" data-id="' + p.id + '" aria-label="' + (choose ? chooseLabel(p) : "Add to bag") + ": " + esc(p.name) + '">' + ICON.plus + "<span>" + (choose ? chooseLabel(p) : "Add to bag") + "</span></button></div>") +
      '<div class="card__body"><span class="card__cat">' + esc(subOf(p) ? subOf(p).name : shortName(catById[p.category])) + "</span>" +
      '<h3 class="card__name"><a href="#/product/' + p.id + '">' + esc(p.name) + "</a></h3>" +
      '<div class="card__row"><span class="price">' + (p.soldOut ? "Sold out" : priceHTML(p)) + "</span>" + miniSwatches(p) + "</div></div></article>";
  }

  function gridHTML(list, cls) {
    return '<div class="grid ' + (cls || "") + ' reveal-stagger">' + list.map(cardHTML).join("") + "</div>";
  }

  function quickView(id) {
    var p = byId[id];
    var fid = newForm(p);
    openModal('<div class="qv"><div class="qv__img"><img src="' + img(p.images[0]) + '" alt="' + esc(p.name) + '"></div>' +
      '<div class="qv__info" data-formroot="' + fid + '"><p class="pinfo__cat">' + esc(subOf(p) ? subOf(p).name : shortName(catById[p.category])) + "</p>" +
      "<h2>" + esc(p.name) + '</h2><p class="pinfo__price">' + priceHTML(p) + ' <span class="alt">' + altMoney(p.price) + "</span></p>" +
      '<p class="pinfo__short">' + esc(p.short) + "</p>" + optionsHTML(p, fid) +
      '<div class="buy" style="grid-template-columns:auto 1fr">' + qtyHTML(fid) +
      '<button type="button" class="btn btn--dark" data-action="form-add" data-form="' + fid + '" data-autofocus>' + ICON.bag + " Add to bag</button></div>" +
      '<p style="margin-top:18px"><a class="link" href="#/product/' + p.id + '">View full details</a></p></div></div>');
  }

  /* ------------------------------------------------------------------
     Router
     ------------------------------------------------------------------ */
  var app = $("#app");
  var currentRoute = { name: "" };
  var cleanups = [];

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var qi = h.indexOf("?");
    var path = (qi > -1 ? h.slice(0, qi) : h).split("/").filter(Boolean).map(decodeURIComponent);
    var q = new URLSearchParams(qi > -1 ? h.slice(qi + 1) : "");
    return { name: path[0] || "home", arg: path[1], q: q, key: path.join("/") };
  }

  var views = {};

  function setMeta(title, desc) {
    document.title = title ? title + " · Ethereal Curves" : "Ethereal Curves — Luxury Designed For You";
    var m = $('meta[name="description"]');
    if (desc && m) m.setAttribute("content", desc);
  }

  function render() {
    var r = parseHash();
    var samePage = r.key === currentRoute.key;
    cleanups.forEach(function (fn) { fn(); });
    cleanups = [];
    currentRoute = r;
    var ld = $("#ldProduct");
    if (ld) ld.remove();
    document.body.classList.remove("has-sticky");

    var view = views[r.name] || views.notFound;
    app.innerHTML = view(r);
    app.classList.remove("page-enter"); void app.offsetWidth; app.classList.add("page-enter");
    if (view.mount) view.mount(r);
    observeReveals();
    $$(".nav__link").forEach(function (a) {
      var href = a.getAttribute("href");
      var cat = r.name === "shop" ? (r.q.get("cat") || "") : null;
      var on = r.name === "shop"
        ? href === "#/shop?cat=" + cat || (!!cat && (a.dataset.cats || "").split(",").indexOf(cat) > -1)
        : href === "#/" + r.name || (r.name === "home" && href === "#/");
      a.classList.toggle("is-active", on);
    });
    if (!samePage) {
      var root = document.documentElement;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = "";
    }
  }

  window.addEventListener("hashchange", function () {
    if (openName) closeOverlay(true);
    if (location.hash === "#/cart") { history.replaceState(null, "", "#/"); render(); openOverlay("cart"); return; }
    render();
  });

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;

  function observeReveals() {
    $$(".reveal:not(.is-in), .reveal-stagger:not(.is-in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("is-in");
    });
  }

  /* ------------------------------------------------------------------
     HOME
     ------------------------------------------------------------------ */
  var SLIDES = [
    { tone: "noir", image: "pressed-red", pos: "center", eyebrow: "Luxury Pressed Face Powder",
      title: 'Elevate <span class="script gold-text">Your Beauty</span>',
      text: "A velvet, flawless finish in a mirrored black-and-gold compact. Shades created for melanin-rich skin.",
      cta: [["Shop makeup", "#/shop?cat=makeup", "btn--gold"], ["Find your shade", "#/shade-finder", "btn--light"]] },
    { tone: "champagne", image: "strapless-card", pos: "center 18%", eyebrow: "The New Strapless Collection",
      title: 'Support That <span class="script">Celebrates You</span>',
      text: "The ultimate in comfort and lift, designed for every beautiful curve.",
      cta: [["Shop intimates", "#/shop?cat=intimates", "btn--dark"], ["Size guide", "#/size-guide", "btn--outline"]] },
    { tone: "blush", image: "lacquer", pos: "center", eyebrow: "Lipsticks · Glosses · Matte Lip Gloss",
      title: 'Lips That <span class="script">Speak First</span>',
      text: "Plumping glosses in 24 shades, velvet lacquers and satin bullets. Glossy, bold and made to be seen.",
      cta: [["Shop lips", "#/shop?cat=makeup", "btn--dark"], ["24 shades of gloss", "#/product/plump-shine-gloss", "btn--outline"]] },
    { tone: "champagne", image: "shapewear", pos: "center 20%", eyebrow: "The Sculpture Collection",
      title: 'As Good As <span class="script">It Looks</span>',
      text: "Seamless sculpting with all-day comfort and breathable premium fabric. Modest. Comfortable. Beautiful.",
      cta: [["Shop Sculpture", "#/shop?cat=sculpture", "btn--dark"], ["Find my size", "#/size-guide", "btn--outline"]] }
  ];

  views.home = function () {
    setMeta("", "Ethereal Curves: luxury beauty and curve-loving intimates from Monrovia, Liberia.");
    var gloss = byId["plump-shine-gloss"];
    var shades = gloss.options[0].values;
    var fShades = byId["matte-liquid-foundation"].options[0].values;

    var hero = '<section class="hero" aria-roledescription="carousel" aria-label="Featured collections"><div class="hero__slides">' +
      SLIDES.map(function (s, i) {
        return '<div class="slide slide--' + s.tone + (i === 0 ? " is-on" : "") + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + SLIDES.length + '"' + (i ? ' aria-hidden="true"' : "") + ">" +
          '<div class="slide__copy"><p class="eyebrow anim">' + s.eyebrow + '</p><h' + (i ? "2" : "1") + ' class="slide__title anim">' + s.title + "</h" + (i ? "2" : "1") + ">" +
          '<p class="slide__text anim">' + s.text + '</p><div class="slide__cta anim">' +
          s.cta.map(function (c) { return '<a class="btn ' + c[2] + '" href="' + c[1] + '"' + (i ? ' tabindex="-1"' : "") + ">" + c[0] + "</a>"; }).join("") +
          '</div></div><div class="slide__media"><img src="' + img(s.image) + '" alt="" style="object-position:' + s.pos + '"' + (i ? ' loading="lazy"' : ' fetchpriority="high"') + "></div></div>";
      }).join("") + "</div>" +
      '<div class="hero__controls"><div class="hero__dots">' + SLIDES.map(function (s, i) {
        return '<button type="button" class="hero__dot' + (i === 0 ? " is-on" : "") + '" data-action="hero-go" data-i="' + i + '" aria-label="Show slide ' + (i + 1) + '"><span></span></button>';
      }).join("") + '</div><button type="button" class="hero__pause" data-action="hero-pause" aria-label="Pause slideshow">' + ICON.pause + "</button></div></section>";

    var marqueeWords = ["Soft Power", "Quiet Luxury", "Designed For You", "Luxury Is Not A Size", "Designed For Every Curve", "Delivered Across Liberia"];
    var marquee = '<div class="marquee" aria-hidden="true"><div class="marquee__track">' +
      marqueeWords.concat(marqueeWords).map(function (w) { return "<span>" + w + "</span>"; }).join("") + "</div></div>";

    var cats = '<section class="section"><div class="container">' +
      '<div class="section__head center reveal"><p class="eyebrow">Shop by collection</p><h2 class="h-lg">Our Collections</h2><div class="ornament"><i></i></div></div>' +
      '<div class="cats reveal-stagger">' + CATS.map(catTileHTML).join("") + "</div></div></section>";

    var rail = '<section class="section section--cream"><div class="container">' +
      '<div class="section__head reveal"><div><p class="eyebrow">The icons</p><h2 class="h-lg">Most Loved</h2></div>' +
      '<div class="toolbar__chips" role="tablist" aria-label="Filter products">' +
      [["best", "Bestsellers"], ["new", "New In"], ["makeup", "Makeup"], ["sculpture", "Sculpture"], ["intimates", "Intimates"]].map(function (t, i) {
        return '<button type="button" class="chip' + (i === 0 ? " is-active" : "") + '" role="tab" aria-selected="' + (i === 0) + '" data-action="rail" data-tab="' + t[0] + '">' + t[1] + "</button>";
      }).join("") + '</div></div><div id="rail">' + gridHTML(railList("best")) + '</div>' +
      '<div class="center" style="margin-top:44px"><a class="btn btn--outline" href="#/shop">Shop all products</a></div></div></section>';

    var shadebar = '<section class="section section--blush"><div class="container shadebar">' +
      '<div class="shadebar__visual reveal"><img src="' + img("gloss-yg-card") + '" alt="Plump & Shine Lip Gloss bottles" loading="lazy">' +
      '<div class="shadebar__chip"><i id="sbDot" style="background:' + shades[0].hex + '"></i><span id="sbName">' + esc(shades[0].label) + "</span></div></div>" +
      '<div class="reveal"><p class="eyebrow">Plump &amp; Shine Lip Gloss · ' + money(gloss.price) + '</p><h2 class="h-lg">24 Shades. <span class="script" style="color:var(--rose)">One obsession.</span></h2>' +
      '<p class="lead">Fuller-looking, hydrated, glossy lips. Tap a shade to try it on the bottle — then make it yours.</p>' +
      '<div class="shadegrid" role="radiogroup" aria-label="Lip gloss shades">' + shades.map(function (s, i) {
        return '<button type="button" role="radio" aria-checked="' + (i === 0) + '" class="' + (i === 0 ? "is-on" : "") + '" style="background:' + s.hex + '" data-action="sb-pick" data-i="' + i + '" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '"></button>';
      }).join("") + "</div>" +
      '<div class="actions" style="justify-content:flex-start"><button type="button" class="btn btn--dark" data-action="sb-add" id="sbAdd">' + ICON.bag + ' Add <span id="sbCode">' + esc(shades[0].label.split(" ·")[0]) + '</span> to bag</button>' +
      '<a class="btn btn--outline" href="#/product/plump-shine-gloss">See all details</a></div>' +
      '<div class="claims">' + gloss.claims.map(function (c) { return '<span class="claim" style="background:#fff">' + esc(c) + "</span>"; }).join("") + "</div></div></div></section>";

    var split = '<section class="split split--noir"><div class="split__media"><img src="' + img("bodysuit") + '" alt="Seamless cocoa bodysuit on red satin" loading="lazy"></div>' +
      '<div class="split__copy reveal"><p class="eyebrow">The Sculpture Collection</p><h2 class="h-lg">Sculpt, smooth &amp; <span class="script gold-text">embrace every curve</span></h2>' +
      '<p class="lead">Premium shapewear designed to enhance your natural silhouette while keeping you comfortable and confident. Your curves are already beautiful — Sculpture simply helps you wear them with confidence.</p>' +
      '<ul class="checks"><li>Gentle waist &amp; tummy sculpting</li><li>All-day, seamless comfort</li><li>Breathable premium fabric</li><li>Modest coverage that moves with you</li></ul>' +
      '<div class="actions" style="justify-content:flex-start;margin:0"><a class="btn btn--gold" href="#/shop?cat=sculpture">Shop Sculpture</a><a class="btn btn--light" href="#/size-guide">Size guide</a></div></div></section>';

    var teaser = '<section class="section"><div class="container teaser">' +
      '<div class="reveal"><p class="eyebrow">Shade Finder</p><h2 class="h-lg">Your perfect match, <span class="script">in 60 seconds</span></h2>' +
      '<p class="lead">Answer three quick questions and we\'ll match your foundation, powder, gloss and body glow — so everything works together, beautifully.</p>' +
      '<div class="teaser__swatches" aria-hidden="true">' + fShades.map(function (s) { return '<span style="background:' + s.hex + '"></span>'; }).join("") + "</div>" +
      '<div class="muted" style="display:flex;justify-content:space-between;font-size:.8rem;margin:-18px 0 26px">' + '<span>Golden Silk</span><span>Midnight Cocoa</span></div>' +
      '<a class="btn btn--dark" href="#/shade-finder">Find my shade ' + ICON.arrow + "</a></div>" +
      '<div class="teaser__img reveal"><img src="' + img("found-model") + '" alt="Model with radiant glowing skin" loading="lazy"></div></div></section>';

    var values = '<section class="section section--noir"><div class="container">' +
      '<div class="section__head center reveal"><p class="eyebrow">The Ethereal promise</p><h2 class="h-lg">Luxury, <span class="script gold-text">designed for you</span></h2></div>' +
      '<div class="values reveal-stagger">' +
      valueHTML(ICON.sparkle, "Made for melanin", "Rich, true-to-tone shades that never look ashy or grey.") +
      valueHTML(ICON.hanger, "Every curve", "Bras to G cup and shapewear to 4XL, cut for real bodies.") +
      valueHTML(ICON.leaf, "Kind formulas", "Vegan & cruelty-free glosses and body serums.") +
      valueHTML(ICON.truck, "Delivered to you", "Fast Monrovia delivery and shipping to all 15 counties.") +
      "</div></div></section>";

    var looks = [["pressed-poster", "tall"], ["gloss-cc-poster", ""], ["serum-poster", ""], ["strapless-poster", "wide"], ["found-collage", "tall"], ["easter", ""], ["shapewear-poster", ""], ["gloss-yg-poster", ""], ["travel", ""]];
    var lookbook = '<section class="section"><div class="container">' +
      '<div class="section__head reveal"><div><p class="eyebrow">#EtherealCurves</p><h2 class="h-lg">The Lookbook</h2></div>' +
      (S.social.instagram ? '<a class="link" href="' + esc(S.social.instagram) + '" target="_blank" rel="noopener">Follow on Instagram</a>' : '<a class="link" href="' + waLink("Hi! I'd love to see more of your looks.") + '" target="_blank" rel="noopener">Chat with us</a>') +
      '</div><div class="lookbook reveal-stagger">' + looks.map(function (l) {
        return '<button type="button" class="' + l[1] + '" data-action="lightbox" data-src="' + img(l[0]) + '" aria-label="Open image"><img src="' + img(l[0], !l[1]) + '" alt="" loading="lazy"></button>';
      }).join("") + "</div></div></section>";

    var news = '<section class="section newsletter"><div class="container">' +
      '<p class="eyebrow">Join the Ethereal Circle</p><h2 class="h-lg">First access. <span class="script gold-text">Private offers.</span></h2>' +
      '<p class="lead" style="margin:0 auto;color:#bcae9d">Be the first to know about new shades, restocks and members-only offers.</p>' +
      '<form class="newsletter__form" data-newsletter><label class="sr-only" for="nlEmail">Email or WhatsApp number</label><input id="nlEmail" name="contact" required placeholder="Email or WhatsApp number" autocomplete="email">' +
      '<button class="btn btn--gold" type="submit">Join</button></form><small>We respect your privacy. Unsubscribe anytime.</small></div></section>';

    return hero + marquee + cats + rail + shadebar + split + teaser + values + lookbook + news;
  };

  function catTileHTML(c) {
    var soon = !catCount(c.id);
    var label = '<div class="cat__label"><h3>' + esc(c.name) + "</h3><p>" + esc(c.blurb) + '</p><span class="link">' + (soon ? "Coming soon" : "Shop now") + "</span></div>";
    if (c.image) return '<a class="cat" href="#/shop?cat=' + c.id + '"><img src="' + img(c.image) + '" alt="" loading="lazy">' + label + "</a>";
    return '<a class="cat cat--icon" href="#/shop?cat=' + c.id + '"><span class="cat__icon">' + (ICON[c.icon] || ICON.sparkle) + "</span>" + label + "</a>";
  }

  function valueHTML(icon, t, d) {
    return '<div class="value"><div class="value__icon">' + icon + "</div><h3>" + t + "</h3><p>" + d + "</p></div>";
  }

  function railList(tab) {
    if (tab === "best") return PRODUCTS.filter(function (p) { return p.bestseller; }).slice(0, 4);
    if (tab === "new") return PRODUCTS.filter(function (p) { return p.isNew; }).concat(PRODUCTS.filter(function (p) { return !p.isNew && p.category === "makeup"; })).slice(0, 4);
    return PRODUCTS.filter(function (p) { return p.category === tab; }).slice(0, 4);
  }

  var hero = { i: 0, timer: null, paused: false };
  var HERO_MS = 6500;
  views.home.mount = function () {
    hero.i = 0;
    hero.paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var el = $(".hero");
    el.style.setProperty("--hero-ms", HERO_MS + "ms");
    if (hero.paused) { el.classList.add("paused"); setPauseIcon(); }
    startHero();
    cleanups.push(function () { clearInterval(hero.timer); });
    state.sbIndex = 0;
  };
  function startHero() {
    clearInterval(hero.timer);
    if (hero.paused) return;
    hero.timer = setInterval(function () { goHero(hero.i + 1); }, HERO_MS);
  }
  function goHero(i) {
    var slides = $$(".slide"), dots = $$(".hero__dot");
    if (!slides.length) return;
    hero.i = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === hero.i;
      s.classList.toggle("is-on", on);
      s.setAttribute("aria-hidden", !on);
      $$("a", s).forEach(function (a) { if (on) a.removeAttribute("tabindex"); else a.setAttribute("tabindex", "-1"); });
    });
    dots.forEach(function (d, k) {
      d.classList.remove("is-on");
      if (k === hero.i) { void d.offsetWidth; d.classList.add("is-on"); }
    });
  }
  function setPauseIcon() {
    var b = $(".hero__pause");
    if (!b) return;
    b.innerHTML = hero.paused ? ICON.play : ICON.pause;
    b.setAttribute("aria-label", hero.paused ? "Play slideshow" : "Pause slideshow");
  }

  /* ------------------------------------------------------------------
     SHOP
     ------------------------------------------------------------------ */
  var PRICE_BANDS = { u20: ["Under $20", 0, 19.99], "20-35": ["$20 – $35", 20, 35], o35: ["Over $35", 35.01, 1e9] };
  var SORTS = { featured: "Featured", bestsellers: "Bestsellers", new: "New arrivals", "price-asc": "Price: low to high", "price-desc": "Price: high to low", name: "Name A–Z" };

  function shopState(q) {
    var cats = (q.get("cat") || "").split(",").filter(function (c) { return catById[c]; });
    var sub = q.get("sub");
    var c0 = cats.length === 1 ? catById[cats[0]] : null;
    if (!(c0 && c0.subs && c0.subs.some(function (x) { return x.id === sub; }))) sub = null;
    return {
      cats: cats,
      sub: sub,
      price: PRICE_BANDS[q.get("price")] ? q.get("price") : "",
      tags: (q.get("tag") || "").split(",").filter(Boolean),
      sort: SORTS[q.get("sort")] ? q.get("sort") : "featured",
      q: (q.get("q") || "").trim()
    };
  }

  function matchesQuery(p, text) {
    if (!text) return true;
    var c = catById[p.category], sb = subOf(p);
    var hay = [p.name, p.short, c.name, c.title, sb ? sb.name + " " + sb.title : "", (p.claims || []).join(" ")]
      .concat((p.options || []).reduce(function (a, o) { return a.concat(o.values.map(function (v) { return v.label; })); }, []))
      .join(" ").toLowerCase();
    return text.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1 || hay.indexOf(w.replace(/s$/, "")) > -1; });
  }

  function filterProducts(st) {
    var list = PRODUCTS.filter(function (p) {
      if (st.cats.length && st.cats.indexOf(p.category) < 0) return false;
      if (st.sub && p.sub !== st.sub) return false;
      if (st.price) { var b = PRICE_BANDS[st.price]; if (p.price < b[1] || p.price > b[2]) return false; }
      if (st.tags.indexOf("new") > -1 && !p.isNew) return false;
      if (st.tags.indexOf("bestseller") > -1 && !p.bestseller) return false;
      if (st.tags.indexOf("vegan") > -1 && (p.claims || []).indexOf("Vegan") < 0) return false;
      return matchesQuery(p, st.q);
    });
    var idx = function (p) { return PRODUCTS.indexOf(p); };
    var sorters = {
      featured: function (a, b) { return idx(a) - idx(b); },
      bestsellers: function (a, b) { return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) || idx(a) - idx(b); },
      "new": function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || idx(a) - idx(b); },
      "price-asc": function (a, b) { return a.price - b.price; },
      "price-desc": function (a, b) { return b.price - a.price; },
      name: function (a, b) { return a.name.localeCompare(b.name); }
    };
    return list.sort(sorters[st.sort]);
  }

  function shopQuery(st) {
    var q = new URLSearchParams();
    if (st.cats.length) q.set("cat", st.cats.join(","));
    if (st.sub) q.set("sub", st.sub);
    if (st.price) q.set("price", st.price);
    if (st.tags.length) q.set("tag", st.tags.join(","));
    if (st.sort !== "featured") q.set("sort", st.sort);
    if (st.q) q.set("q", st.q);
    var s = q.toString();
    return "#/shop" + (s ? "?" + s : "");
  }

  function shopTitle(st) {
    if (st.q) return ["Results for “" + st.q + "”", "Everything that matches your search."];
    if (st.cats.length === 1) {
      var c = catById[st.cats[0]];
      var sb = st.sub && c.subs.find(function (x) { return x.id === st.sub; });
      if (sb) return [sb.title, sb.description, c.name];
      return [c.title, c.description, "Collection"];
    }
    return ["Shop All", "Soft Power. Quiet Luxury. Premium essentials designed around you.", "Shop"];
  }

  views.shop = function (r) {
    var st = shopState(r.q);
    var t = shopTitle(st);
    setMeta(t[0], t[1]);
    var list = filterProducts(st);
    var chips = [["", "All"]].concat(CATS.map(function (c) { return [c.id, shortName(c)]; }));
    var single = st.cats.length === 1 ? st.cats[0] : (!st.cats.length ? "" : null);

    return '<section class="pagehead"><div class="container"><nav class="crumbs" aria-label="Breadcrumb" style="justify-content:center"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/shop">Shop</a>' +
      (single ? '<span aria-hidden="true">/</span><span>' + esc(catById[single].name) + "</span>" : "") + "</nav>" +
      '<p class="eyebrow" id="shopEyebrow">' + esc(t[2]) + '</p><h1 class="h-lg" id="shopTitle">' + esc(t[0]) + '</h1><p class="lead pagehead__desc" id="shopBlurb">' + esc(t[1]) + '</p>' +
      '<div class="toolbar__chips" style="justify-content:center;margin-top:24px">' + chips.map(function (c) {
        return '<a class="chip' + (single === c[0] ? " is-active" : "") + '" href="#/shop' + (c[0] ? "?cat=" + c[0] : "") + '">' + esc(c[1]) + "</a>";
      }).join("") + '</div><div id="subChips">' + subChipsHTML(st) + "</div></div></section>" +
      '<div class="container shop"><aside class="filters" id="filters" aria-label="Filters"><form id="filterForm">' +
      '<div class="filters__group" style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0">Filter</h3><button type="button" class="link" data-action="filters-clear">Clear all</button></div>' +
      '<div class="filters__group"><h3>Collection</h3>' + CATS.map(function (c) {
        var n = catCount(c.id);
        return '<label><input type="checkbox" name="cat" value="' + c.id + '"' + (st.cats.indexOf(c.id) > -1 ? " checked" : "") + "> " + esc(c.name) + '<span class="count-note">' + (n || "Soon") + "</span></label>";
      }).join("") + "</div>" +
      '<div class="filters__group"><h3>Price</h3><label><input type="radio" name="price" value=""' + (!st.price ? " checked" : "") + "> Any price</label>" +
      Object.keys(PRICE_BANDS).map(function (k) {
        return '<label><input type="radio" name="price" value="' + k + '"' + (st.price === k ? " checked" : "") + "> " + PRICE_BANDS[k][0] + "</label>";
      }).join("") + "</div>" +
      '<div class="filters__group"><h3>Highlights</h3>' + [["new", "New arrivals"], ["bestseller", "Bestsellers"], ["vegan", "Vegan & cruelty-free"]].map(function (tg) {
        return '<label><input type="checkbox" name="tag" value="' + tg[0] + '"' + (st.tags.indexOf(tg[0]) > -1 ? " checked" : "") + "> " + tg[1] + "</label>";
      }).join("") + "</div>" +
      '<div class="filters__group filters__apply" style="border:0"><button type="button" class="btn btn--dark btn--block" data-action="filters-close">Show results</button></div>' +
      "</form></aside>" +
      '<div><div class="toolbar"><div style="display:flex;gap:10px;align-items:center"><button type="button" class="chip filter-toggle" data-action="filters-open">' + ICON.filter + ' Filter</button><span class="muted" id="shopCount">' + countText(list) + "</span></div>" +
      '<label class="select"><span class="sr-only">Sort by</span><select id="sortSel">' + Object.keys(SORTS).map(function (k) {
        return '<option value="' + k + '"' + (st.sort === k ? " selected" : "") + ">" + SORTS[k] + "</option>";
      }).join("") + "</select></label></div>" +
      '<div id="shopGrid">' + shopResultsHTML(st, list) + "</div></div></div>";
  };

  function countText(list) { return list.length + " product" + (list.length === 1 ? "" : "s"); }

  function subChipsHTML(st) {
    var c = st.cats.length === 1 ? catById[st.cats[0]] : null;
    if (!c || !c.subs) return "";
    return '<div class="toolbar__chips subchips">' + [["", "All " + c.name.toLowerCase()]].concat(c.subs.map(function (x) { return [x.id, x.name]; })).map(function (x) {
      return '<a class="chip chip--sub' + ((st.sub || "") === x[0] ? " is-active" : "") + '" href="#/shop?cat=' + c.id + (x[0] ? "&sub=" + x[0] : "") + '">' + esc(x[1]) + "</a>";
    }).join("") + "</div>";
  }

  function comingSoonHTML(c, sub) {
    var name = sub ? sub.title : c.title;
    return '<div class="soon"><span class="soon__icon">' + (ICON[c.icon] || ICON.sparkle) + '</span><p class="eyebrow">Coming soon</p>' +
      '<h3 class="h-md">' + esc(name) + " is arriving soon</h3>" +
      '<p class="muted">We\'re curating this collection now. Message us to ask what\'s available today, or join the Ethereal Circle to hear first when it launches.</p>' +
      '<div class="actions"><a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink("Hi Ethereal Curves! What do you have available in the " + name + "?") + '">' + ICON.wa + " Ask what's available</a></div>" +
      '<form class="newsletter__form soon__form" data-newsletter><label class="sr-only" for="soon_' + c.id + '">Email or WhatsApp number</label><input id="soon_' + c.id + '" name="contact" required placeholder="Email or WhatsApp number"><button class="btn btn--dark" type="submit">Notify me</button></form></div>';
  }

  function shopResultsHTML(st, list) {
    var c = st.cats.length === 1 ? catById[st.cats[0]] : null;
    var plain = !st.q && !st.price && !st.tags.length;
    if (c && plain && !catCount(c.id)) return comingSoonHTML(c);
    if (c && plain && st.sub && !list.length) return comingSoonHTML(c, c.subs.find(function (x) { return x.id === st.sub; }));
    // Makeup overview: one section per sub-collection
    if (c && c.subs && plain && !st.sub && st.sort === "featured") {
      return c.subs.map(function (sb) {
        var items = list.filter(function (p) { return p.sub === sb.id; });
        return '<section class="subsec"><div class="subsec__head"><div><h2 class="h-md">' + esc(sb.title) + '</h2><p class="muted subsec__desc">' + esc(sb.description) + "</p></div>" +
          (items.length ? '<a class="link" href="#/shop?cat=' + c.id + "&sub=" + sb.id + '">View all</a>' : "") + "</div>" +
          (items.length ? gridHTML(items, "grid--3") : '<p class="subsec__soon">' + ICON.sparkle + ' Coming soon — <a class="link" target="_blank" rel="noopener" href="' + waLink("Hi Ethereal Curves! What do you have in the " + sb.title + "?") + '">ask us what\'s available</a></p>') +
          "</section>";
      }).join("");
    }
    return shopGridHTML(list);
  }

  function shopGridHTML(list) {
    if (!list.length) {
      return '<div class="empty">' + ICON.sparkle + '<h3 class="h-md">Nothing matches — yet</h3><p class="muted">Try removing a filter, or ask us on WhatsApp — we may have it in stock.</p>' +
        '<div class="actions"><button type="button" class="btn btn--outline" data-action="filters-clear">Clear filters</button><a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink("Hi! I'm looking for a product on your website.") + '">' + ICON.wa + " Ask us</a></div></div>";
    }
    return gridHTML(list, "grid--3");
  }

  views.shop.mount = function (r) {
    var form = $("#filterForm");
    var init = shopState(r.q);
    var baseQ = init.q, baseSub = init.sub;
    function update() {
      var fd = new FormData(form);
      var cats = fd.getAll("cat");
      var st = {
        cats: cats, sub: cats.length === 1 && cats[0] === "makeup" ? baseSub : null, price: fd.get("price") || "",
        tags: fd.getAll("tag"), sort: $("#sortSel").value, q: baseQ
      };
      baseSub = st.sub;
      var hash = shopQuery(st);
      history.replaceState(null, "", hash);
      currentRoute = parseHash();
      var list = filterProducts(st);
      $("#shopGrid").innerHTML = shopResultsHTML(st, list);
      $("#subChips").innerHTML = subChipsHTML(st);
      $("#shopCount").textContent = countText(list);
      var t = shopTitle(st);
      $("#shopEyebrow").textContent = t[2];
      $("#shopTitle").textContent = t[0];
      $("#shopBlurb").textContent = t[1];
      observeReveals();
    }
    form.addEventListener("change", update);
    $("#sortSel").addEventListener("change", update);
    views.shop.clear = function () {
      $$("input", form).forEach(function (i) { i.checked = i.type === "radio" && i.value === ""; });
      baseQ = "";
      baseSub = null;
      update();
    };
  };

  /* ------------------------------------------------------------------
     PRODUCT DETAIL
     ------------------------------------------------------------------ */
  views.product = function (r) {
    var p = byId[r.arg];
    if (!p) return views.notFound();
    setMeta(p.name, p.short);
    state.recent = [p.id].concat(state.recent.filter(function (x) { return x !== p.id; })).slice(0, 8);
    store.set("recent", state.recent);
    var c = catById[p.category];
    var sb = subOf(p);
    var fid = newForm(p);

    var thumbs = p.images.map(function (im, i) {
      return '<button type="button" class="' + (i === 0 ? "is-on" : "") + '" data-action="thumb" data-i="' + i + '" aria-label="Show image ' + (i + 1) + '"><img src="' + img(im, true) + '" alt=""></button>';
    }).join("");
    var gallery = '<div class="gallery' + (p.images.length > 1 ? "" : " gallery--single") + '">' +
      (p.images.length > 1 ? '<div class="gallery__thumbs">' + thumbs + "</div>" : "") +
      '<div class="gallery__main" id="gMain"><img id="gImg" src="' + img(p.images[0]) + '" alt="' + esc(p.name) + '"></div>' +
      '<div class="gallery__track" id="gTrack">' + p.images.map(function (im, i) {
        return '<img src="' + img(im) + '" alt="' + esc(p.name) + " image " + (i + 1) + '"' + (i ? ' loading="lazy"' : "") + ">";
      }).join("") + "</div>" +
      (p.images.length > 1 ? '<div class="gallery__dots" id="gDots">' + p.images.map(function (im, i) { return "<i" + (i === 0 ? ' class="is-on"' : "") + "></i>"; }).join("") + "</div>" : "") +
      "</div>";

    var inquiry = "Hi Ethereal Curves! I have a question about the " + p.name + ".";
    var info = '<div class="pinfo" data-formroot="' + fid + '">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/shop?cat=' + c.id + '">' + esc(c.name) + "</a>" + (sb ? '<span aria-hidden="true">/</span><a href="#/shop?cat=' + c.id + "&sub=" + sb.id + '">' + esc(sb.name) + "</a>" : "") + "</nav>" +
      '<span class="pinfo__cat">' + esc(sb ? sb.name : c.name) + (p.badge ? " · " + esc(p.badge) : "") + "</span>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<p class="pinfo__price">' + priceHTML(p) + '<span class="alt">' + altMoney(p.price) + "</span></p>" +
      '<p class="pinfo__short">' + esc(p.short) + "</p>" +
      (p.claims ? '<div class="claims">' + p.claims.map(function (x) { return '<span class="claim">' + esc(x) + "</span>"; }).join("") + "</div>" : "") +
      optionsHTML(p, fid) +
      (p.soldOut
        ? '<div class="buy" style="grid-template-columns:1fr"><a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink("Hi! Please let me know when the " + p.name + " is back in stock.") + '">' + ICON.wa + " Notify me on WhatsApp</a></div>"
        : '<div class="buy" id="buyRow">' + qtyHTML(fid) +
          '<button type="button" class="btn btn--dark" data-action="form-add" data-form="' + fid + '">' + ICON.bag + " Add to bag · " + money(p.price) + "</button>" +
          '<button type="button" class="wish-btn' + (isWished(p.id) ? " is-on" : "") + '" data-action="wish" data-id="' + p.id + '" aria-pressed="' + isWished(p.id) + '" aria-label="Save to wishlist">' + ICON.heart + "</button></div>") +
      '<a class="btn btn--outline btn--block buy__wa" target="_blank" rel="noopener" data-action="wa-ask" data-form="' + fid + '" href="' + waLink(inquiry) + '">' + ICON.wa + " Ask about this on WhatsApp</a>" +
      '<div class="perks"><div class="perk">' + ICON.truck + "<span>Free Monrovia delivery over " + money(S.freeDeliveryOver) + "</span></div>" +
      '<div class="perk">' + ICON.mobile + "<span>Orange Money, MTN MoMo &amp; cash</span></div>" +
      '<div class="perk">' + ICON.shield + "<span>Authentic Ethereal Curves</span></div></div>" +
      '<details class="acc" open><summary>Description</summary><div class="acc__body"><p>' + esc(p.description) + "</p>" +
      (p.benefits ? "<ul>" + p.benefits.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" : "") + "</div></details>" +
      (p.howTo ? '<details class="acc"><summary>How to use</summary><div class="acc__body"><p>' + esc(p.howTo) + "</p></div></details>" : "") +
      (p.details ? '<details class="acc"><summary>Details</summary><div class="acc__body"><p>' + esc(p.details) + "</p>" +
        (c.id === "makeup" || c.id === "radiance" ? "<p>For the full ingredient list, see the product packaging or message us on WhatsApp.</p>" : "") + "</div></details>" : "") +
      '<details class="acc"><summary>Delivery &amp; returns</summary><div class="acc__body"><p>Monrovia delivery in 1–2 business days, all 15 counties in 3–5 business days, and international shipping on request. ' +
      'Unopened items can be exchanged within 7 days. <a class="link" href="#/faq">Read the full policy</a></p></div></details>' +
      "</div>";

    var related = PRODUCTS.filter(function (x) { return x.id !== p.id && x.category === p.category; })
      .sort(function (a, b) { return (b.sub === p.sub) - (a.sub === p.sub); })
      .concat(PRODUCTS.filter(function (x) { return x.bestseller && x.category !== p.category; })).slice(0, 4);
    var recent = state.recent.filter(function (x) { return x !== p.id && byId[x]; }).slice(0, 4).map(function (x) { return byId[x]; });

    var sticky = p.soldOut ? "" : '<div class="sticky-buy" id="stickyBuy"><img src="' + img(p.images[0], true) + '" alt=""><div class="sticky-buy__txt"><strong>' + esc(p.name) + "</strong>" + money(p.price) + "</div>" +
      '<button type="button" class="btn btn--dark btn--sm" data-action="form-add" data-form="' + fid + '">Add to bag</button></div>';

    return '<div class="container pdp">' + gallery + info + "</div>" +
      '<section class="section section--cream"><div class="container"><div class="section__head reveal"><div><p class="eyebrow">Complete the look</p><h2 class="h-md">You may also love</h2></div><a class="link" href="#/shop?cat=' + c.id + '">View all</a></div>' + gridHTML(related) + "</div></section>" +
      (recent.length ? '<section class="section section--tight"><div class="container"><div class="section__head reveal"><div><p class="eyebrow">Recently viewed</p><h2 class="h-md">Still thinking about these?</h2></div></div>' + gridHTML(recent) + "</div></section>" : "") +
      sticky;
  };

  views.product.mount = function (r) {
    var p = byId[r.arg];
    if (!p) return;
    // structured data for search engines
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "ldProduct";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description,
      image: p.images.map(function (i) { return new URL(img(i), location.href).href; }),
      brand: { "@type": "Brand", name: "Ethereal Curves" }, sku: p.id,
      offers: { "@type": "Offer", priceCurrency: "USD", price: p.price, availability: "https://schema.org/" + (p.soldOut ? "OutOfStock" : "InStock"), url: location.href }
    });
    document.head.appendChild(ld);

    var main = $("#gMain");
    if (main) {
      main.addEventListener("mousemove", function (e) {
        var b = main.getBoundingClientRect();
        $("#gImg").style.transformOrigin = ((e.clientX - b.left) / b.width * 100) + "% " + ((e.clientY - b.top) / b.height * 100) + "%";
      });
      main.addEventListener("mouseenter", function () { if (window.matchMedia("(hover: hover)").matches) main.classList.add("zoom"); });
      main.addEventListener("mouseleave", function () { main.classList.remove("zoom"); });
      main.addEventListener("click", function () { openLightbox($("#gImg").src, p.name); });
    }
    var track = $("#gTrack"), dots = $$("#gDots i");
    if (track && dots.length) {
      track.addEventListener("scroll", function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach(function (d, k) { d.classList.toggle("is-on", k === i); });
      }, { passive: true });
    }
    var sticky = $("#stickyBuy"), buy = $("#buyRow");
    if (sticky && buy) {
      var onScroll = function () {
        var show = buy.getBoundingClientRect().bottom < 0;
        sticky.classList.toggle("is-on", show);
        document.body.classList.toggle("has-sticky", show && window.innerWidth <= 900);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(function () { window.removeEventListener("scroll", onScroll); });
    }
  };

  /* ------------------------------------------------------------------
     CHECKOUT
     ------------------------------------------------------------------ */
  var COUNTIES = ["Montserrado", "Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland", "Nimba", "River Cess", "River Gee", "Sinoe"];
  var checkoutDraft = store.get("customer", {});

  views.checkout = function () {
    setMeta("Checkout", "Secure checkout — pay with Orange Money, MTN Mobile Money or cash on delivery.");
    if (!state.cart.length) {
      return '<div class="container"><div class="empty" style="padding:100px 0">' + ICON.bag + '<h1 class="h-lg">Your bag is empty</h1><p class="muted">Add something beautiful, then come back to check out.</p>' +
        '<div class="actions"><a class="btn btn--dark" href="#/shop">Continue shopping</a></div></div></div>';
    }
    var d = checkoutDraft;
    var method = d.delivery || "monrovia";
    var pay = d.payment || "orange";
    var sub = subtotal(), disc = discountFor(sub), fee = deliveryFee(method, sub - disc);

    function field(name, label, opts) {
      opts = opts || {};
      return '<div class="field' + (opts.full ? " full" : "") + '" data-field="' + name + '"' + (opts.hidden ? " hidden" : "") + '><label for="co_' + name + '">' + label + (opts.optional ? " <em>(optional)</em>" : "") + "</label>" +
        (opts.textarea ? '<textarea id="co_' + name + '" name="' + name + '" placeholder="' + (opts.ph || "") + '">' + esc(d[name] || "") + "</textarea>"
          : '<input id="co_' + name + '" name="' + name + '" type="' + (opts.type || "text") + '" value="' + esc(d[name] || "") + '" placeholder="' + (opts.ph || "") + '"' + (opts.ac ? ' autocomplete="' + opts.ac + '"' : "") + (opts.optional ? "" : " required") + ">") +
        '<span class="err">' + (opts.err || "Please fill this in") + "</span></div>";
    }

    var deliveryRadios = S.delivery.map(function (m) {
      var f = deliveryFee(m.id, sub - disc);
      var feeTxt = f === null ? "Quote" : f === 0 ? "Free" : money(f);
      return '<label class="radio' + (m.id === method ? " is-on" : "") + '"><input type="radio" name="delivery" value="' + m.id + '"' + (m.id === method ? " checked" : "") + ">" +
        "<span><b>" + esc(m.label) + "</b><small>" + esc(m.note) + "</small></span><span class=\"fee\">" + feeTxt + "</span></label>";
    }).join("");

    var payRadios = S.payments.map(function (m) {
      return '<label class="radio' + (m.id === pay ? " is-on" : "") + '" data-pay="' + m.id + '"><input type="radio" name="payment" value="' + m.id + '"' + (m.id === pay ? " checked" : "") + ">" +
        '<span><b><i class="paydot" style="background:' + m.color + '"></i>' + esc(m.label) + "</b><small>" + (m.number ? "Send to " + esc(m.number) + " after placing your order" : esc(m.steps)) + "</small></span><span></span></label>";
    }).join("");

    var summary = '<aside class="summary"><h2>Order summary</h2>' + state.cart.map(function (l) { return lineHTML(l, true); }).join("") +
      '<p style="margin:10px 0 0"><button type="button" class="link" data-action="open-cart">Edit bag</button></p>' + promoHTML() +
      '<div class="totals"><div><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
      (disc ? '<div class="disc"><span>Discount (' + esc(state.promo) + ')</span><span>−' + money(disc) + "</span></div>" : "") +
      '<div><span>Delivery</span><span id="sumFee">' + (fee === null ? "Quoted on WhatsApp" : fee === 0 ? "Free" : money(fee)) + "</span></div>" +
      '<div class="grand"><span>Total</span><span id="sumTotal">' + money(sub - disc + (fee || 0)) + "</span></div>" +
      '<div class="muted" style="font-size:.84rem;justify-content:flex-end" id="sumAlt">' + altMoney(sub - disc + (fee || 0)) + "</div></div></aside>";

    return '<div class="container checkout"><div>' +
      '<nav class="steps" aria-label="Checkout steps"><button type="button" data-action="open-cart">Bag</button><span aria-hidden="true">›</span><b>Details</b><span aria-hidden="true">›</span><span>Confirm on WhatsApp</span></nav>' +
      '<h1 class="h-lg">Checkout</h1>' +
      '<form id="checkoutForm" novalidate>' +
      '<fieldset class="fieldset"><legend><span>1</span>Your details</legend><div class="fields">' +
      field("firstName", "First name", { ac: "given-name" }) + field("lastName", "Last name", { ac: "family-name" }) +
      '<div class="field" data-field="phone"><label for="co_phone">WhatsApp / phone</label><div class="phone"><span>+231</span><input id="co_phone" name="phone" type="tel" inputmode="tel" required autocomplete="tel-national" placeholder="886 000 000" value="' + esc(d.phone || "") + '"></div><span class="err">Please enter a valid phone number</span></div>' +
      field("email", "Email", { type: "email", optional: true, ac: "email", ph: "you@example.com", err: "Please enter a valid email" }) +
      "</div></fieldset>" +
      '<fieldset class="fieldset"><legend><span>2</span>Delivery</legend><div class="radios" id="deliveryRadios">' + deliveryRadios + "</div>" +
      '<div class="fields" style="margin-top:16px" id="addressFields">' +
      '<div class="field" data-field="county"><label for="co_county">County</label><select id="co_county" name="county">' + COUNTIES.map(function (c) {
        return "<option" + ((d.county || "Montserrado") === c ? " selected" : "") + ">" + c + "</option>";
      }).join("") + '</select><span class="err">Please choose a county</span></div>' +
      field("city", "City / community", { ph: "e.g. Sinkor, Paynesville, Congo Town", ac: "address-level2" }) +
      field("address", "Street & landmark", { full: true, ph: "House / street, closest landmark (e.g. opposite ELWA junction)", ac: "street-address" }) +
      field("country", "Country", { full: true, hidden: true, ph: "Country for international shipping", ac: "country-name" }) +
      "</div></fieldset>" +
      '<fieldset class="fieldset"><legend><span>3</span>Payment</legend><div class="radios" id="payRadios">' + payRadios + "</div>" +
      '<p class="muted" id="codNote" style="font-size:.85rem;margin-top:10px" hidden>Cash on delivery is available for Monrovia delivery and pickup.</p></fieldset>' +
      '<fieldset class="fieldset"><legend><span>4</span>Anything else?</legend><div class="fields">' + field("notes", "Order notes", { full: true, textarea: true, optional: true, ph: "Gift message, preferred delivery time, shade questions…" }) + "</div></fieldset>" +
      '<button type="submit" class="btn btn--gold btn--block" style="min-height:58px">' + ICON.wa + " Place order &amp; confirm on WhatsApp</button>" +
      '<p class="secure">' + ICON.lock + "Your order is sent straight to Ethereal Curves on WhatsApp. No card details needed.</p>" +
      "</form></div>" + summary + "</div>";
  };

  views.checkout.mount = function () {
    var form = $("#checkoutForm");
    if (!form) return;

    function sync() {
      var fd = new FormData(form);
      var method = fd.get("delivery");
      $$(".radio", form).forEach(function (r) { r.classList.toggle("is-on", r.querySelector("input").checked); });
      var pickup = method === "pickup", intl = method === "international";
      $("[data-field='county']").hidden = pickup || intl;
      $("[data-field='city']").hidden = pickup;
      $("[data-field='address']").hidden = pickup;
      $("[data-field='country']").hidden = !intl;
      $("#co_address").required = !pickup;
      $("#co_city").required = !pickup;
      $("#co_country").required = intl;
      var codOk = method === "monrovia" || method === "pickup";
      var cod = $("[data-pay='cod'] input");
      if (cod) {
        cod.disabled = !codOk;
        $("[data-pay='cod']").style.opacity = codOk ? "" : ".5";
        $("#codNote").hidden = codOk;
        if (!codOk && cod.checked) { $("[data-pay='orange'] input").checked = true; sync(); return; }
      }
      var sub = subtotal(), disc = discountFor(sub), fee = deliveryFee(method, sub - disc);
      $("#sumFee").textContent = fee === null ? "Quoted on WhatsApp" : fee === 0 ? "Free" : money(fee);
      $("#sumTotal").textContent = money(sub - disc + (fee || 0));
      $("#sumAlt").textContent = altMoney(sub - disc + (fee || 0));
      // remember details
      var draft = {};
      fd.forEach(function (v, k) { draft[k] = v; });
      checkoutDraft = draft;
    }
    form.addEventListener("change", sync);
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field");
      if (f) f.classList.remove("invalid");
    });
    sync();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      sync();
      var bad = [];
      $$("input[required], select[required]", form).forEach(function (i) {
        var f = i.closest(".field");
        if (!f || f.hidden) return;
        var ok = i.value.trim().length > 0;
        if (i.name === "phone") ok = i.value.replace(/\D/g, "").length >= 7;
        f.classList.toggle("invalid", !ok);
        if (!ok) bad.push(i);
      });
      var em = $("#co_email");
      if (em.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())) { em.closest(".field").classList.add("invalid"); bad.push(em); }
      if (bad.length) { bad[0].focus(); toast("Please check the highlighted fields"); return; }
      placeOrder(new FormData(form));
    });
  };

  function normalizePhone(v) {
    var d = v.replace(/\D/g, "");
    if (d.indexOf("231") === 0) return "+" + d;
    if (d.charAt(0) === "0") d = d.slice(1);
    return "+231" + d;
  }

  function placeOrder(fd) {
    var data = {};
    fd.forEach(function (v, k) { data[k] = String(v).trim(); });
    store.set("customer", { firstName: data.firstName, lastName: data.lastName, phone: data.phone, email: data.email, county: data.county, city: data.city, address: data.address, country: data.country, delivery: data.delivery, payment: data.payment });

    var sub = subtotal(), disc = discountFor(sub);
    var method = S.delivery.find(function (m) { return m.id === data.delivery; });
    var fee = deliveryFee(data.delivery, sub - disc);
    var id = "EC-" + Date.now().toString(36).slice(-6).toUpperCase();
    var order = {
      id: id, date: new Date().toISOString(),
      items: state.cart.map(function (l) { var p = byId[l.id]; return { id: p.id, name: p.name, image: p.images[0], opts: l.opts, qty: l.qty, price: p.price }; }),
      subtotal: sub, promo: disc ? state.promo : null, discount: disc, deliveryLabel: method.label, deliveryFee: fee,
      total: round2(sub - disc + (fee || 0)), payment: data.payment,
      customer: { name: data.firstName + " " + data.lastName, phone: normalizePhone(data.phone), email: data.email },
      address: data.delivery === "pickup" ? "Pickup in Monrovia" : [data.address, data.city, data.delivery === "international" ? data.country : data.county + " County", data.delivery === "international" ? "" : "Liberia"].filter(Boolean).join(", "),
      notes: data.notes
    };
    state.orders[id] = order;
    store.set("orders", state.orders);

    var msg = orderMessage(order);
    window.open(waLink(msg), "_blank", "noopener");

    state.cart = [];
    state.promo = null;
    store.set("promo", null);
    store.set("cart", state.cart);
    updateCounts();
    renderCart();
    location.hash = "#/order/" + id;
  }

  function orderMessage(o) {
    var pay = S.payments.find(function (p) { return p.id === o.payment; });
    return "✨ NEW ORDER " + o.id + " ✨\n\n" +
      "Name: " + o.customer.name + "\nPhone: " + o.customer.phone + (o.customer.email ? "\nEmail: " + o.customer.email : "") + "\n\n" +
      "ITEMS\n" + o.items.map(function (i) {
        return "• " + i.qty + " × " + i.name + (Object.keys(i.opts).length ? " (" + optsText(i.opts) + ")" : "") + " — " + money(i.price * i.qty, "USD");
      }).join("\n") + "\n\n" +
      "Subtotal: " + money(o.subtotal, "USD") +
      (o.discount ? "\nDiscount (" + o.promo + "): −" + money(o.discount, "USD") : "") +
      "\nDelivery (" + o.deliveryLabel + "): " + (o.deliveryFee === null ? "please quote" : o.deliveryFee === 0 ? "FREE" : money(o.deliveryFee, "USD")) +
      "\nTOTAL: " + money(o.total, "USD") + " (≈ " + money(o.total, "LRD") + ")" + (o.deliveryFee === null ? " + shipping" : "") + "\n\n" +
      "Deliver to: " + o.address + "\nPayment: " + (pay ? pay.label : o.payment) +
      (o.notes ? "\nNotes: " + o.notes : "") + "\n\nThank you!";
  }

  /* ------------------------------------------------------------------
     ORDER CONFIRMATION
     ------------------------------------------------------------------ */
  views.order = function (r) {
    var o = state.orders[r.arg];
    setMeta("Order " + (r.arg || ""), "");
    if (!o) return views.notFound();
    var pay = S.payments.find(function (p) { return p.id === o.payment; });
    var totalTxt = money(o.total, "USD") + (o.deliveryFee === null ? " + shipping" : "");
    var payBox = pay && pay.number
      ? '<div class="paybox"><p class="eyebrow">Pay with ' + esc(pay.label) + '</p><div class="paybox__num">' + esc(pay.number) +
        ' <button type="button" class="copy" data-action="copy" data-text="' + esc(pay.number) + '" data-label="Number">Copy</button></div>' +
        '<div class="paybox__row"><span>Account name</span><b>' + esc(pay.accountName || S.brand) + "</b></div>" +
        '<div class="paybox__row"><span>Amount</span><b>' + totalTxt + " · " + money(o.total, "LRD") + "</b></div>" +
        '<div class="paybox__row"><span>Reference</span><b>' + o.id + ' <button type="button" class="copy" data-action="copy" data-text="' + o.id + '" data-label="Order number">Copy</button></b></div>' +
        '<p style="margin:14px 0 0;color:#bcae9d;font-size:.92rem">' + esc(pay.steps) + (o.deliveryFee === null ? " We'll confirm the shipping cost on WhatsApp before you pay." : "") + "</p></div>"
      : '<div class="paybox"><p class="eyebrow">' + esc(pay ? pay.label : "Payment") + '</p><p style="margin:0">' + esc(pay ? pay.steps : "") + '</p><div class="paybox__row" style="margin-top:12px"><span>Amount due</span><b>' + totalTxt + " · " + money(o.total, "LRD") + "</b></div></div>";

    return '<div class="container"><div class="confirm"><div class="center"><div class="confirm__seal">' + ICON.check + "</div>" +
      '<p class="eyebrow">Order ' + o.id + '</p><h1 class="h-lg">Thank you, ' + esc(o.customer.name.split(" ")[0]) + "</h1>" +
      '<p class="lead">Your order has been created. <b>Send it to us on WhatsApp</b> so we can confirm it and arrange delivery — WhatsApp should have opened already.</p>' +
      '<div class="actions"><a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink(orderMessage(o)) + '">' + ICON.wa + " Send order on WhatsApp</a>" +
      '<a class="btn btn--outline" href="mailto:' + S.email + "?subject=" + encodeURIComponent("Order " + o.id) + "&body=" + encodeURIComponent(orderMessage(o)) + '">' + ICON.mail + " Email instead</a></div></div>" +
      payBox +
      '<div class="receipt"><h2 class="h-md">Receipt</h2>' + o.items.map(function (i) {
        var p = byId[i.id];
        return '<div class="line" style="grid-template-columns:60px 1fr auto"><span class="qbadge"><img style="width:60px;height:72px" src="' + img(i.image, true) + '" alt=""><b>' + i.qty + "</b></span>" +
          '<div><span class="line__name">' + esc(i.name) + '</span><div class="line__opts">' + (p ? optsHTML(p, i.opts) : esc(optsText(i.opts))) + "</div></div>" +
          '<span class="price">' + money(i.price * i.qty, "USD") + "</span></div>";
      }).join("") +
      '<div class="totals" style="margin-top:16px"><div><span>Subtotal</span><span>' + money(o.subtotal, "USD") + "</span></div>" +
      (o.discount ? '<div class="disc"><span>Discount (' + esc(o.promo) + ')</span><span>−' + money(o.discount, "USD") + "</span></div>" : "") +
      "<div><span>" + esc(o.deliveryLabel) + "</span><span>" + (o.deliveryFee === null ? "Quote" : o.deliveryFee === 0 ? "Free" : money(o.deliveryFee, "USD")) + "</span></div>" +
      '<div class="grand"><span>Total</span><span>' + totalTxt + "</span></div></div>" +
      '<p class="muted" style="margin:18px 0 0;font-size:.9rem"><b>Deliver to:</b> ' + esc(o.address) + "<br><b>Contact:</b> " + esc(o.customer.phone) + (o.customer.email ? " · " + esc(o.customer.email) : "") + "</p></div>" +
      '<div class="actions"><a class="btn btn--dark" href="#/shop">Continue shopping</a></div></div></div>';
  };

  /* ------------------------------------------------------------------
     WISHLIST
     ------------------------------------------------------------------ */
  views.wishlist = function () {
    setMeta("Wishlist", "");
    var list = state.wish.map(function (id) { return byId[id]; }).filter(Boolean);
    return '<section class="pagehead"><div class="container"><p class="eyebrow">Saved for later</p><h1 class="h-lg">Your Wishlist</h1></div></section>' +
      '<div class="container section--tight" style="padding-bottom:100px">' +
      (list.length ? gridHTML(list) :
        '<div class="empty">' + ICON.heart + '<h2 class="h-md">No favourites yet</h2><p class="muted">Tap the heart on any product to save it here.</p><div class="actions"><a class="btn btn--dark" href="#/shop">Explore the collection</a></div></div>') +
      "</div>";
  };

  /* ------------------------------------------------------------------
     SHADE FINDER
     ------------------------------------------------------------------ */
  var finder = { step: 0, depth: null, tone: null, finish: null };
  var DEPTHS = [
    { v: 1, label: "Light–Medium", hex: "#e2bc97", note: "Burns sometimes, tans easily" },
    { v: 2, label: "Medium", hex: "#c68d62", note: "Warm honey to caramel skin" },
    { v: 3, label: "Tan", hex: "#a36d47", note: "Rich amber, rarely burns" },
    { v: 4, label: "Deep", hex: "#76503e", note: "Deep mocha to chestnut" },
    { v: 5, label: "Rich Deep", hex: "#3f2b24", note: "Deepest espresso tones" }
  ];
  var TONES = [
    { v: "warm", label: "Warm", a: "#d9a441", b: "#b77a3c", note: "Golden or yellow glow. Gold jewellery flatters you; veins look greenish." },
    { v: "neutral", label: "Neutral", a: "#c8956c", b: "#b07d6a", note: "A balance of both. Gold and silver both look great." },
    { v: "cool", label: "Cool", a: "#b9707a", b: "#8a5e78", note: "Pink, red or blue hints. Silver flatters you; veins look blue-purple." }
  ];
  var FINISHES = [
    { v: "matte", label: "Soft Matte", pid: "matte-liquid-foundation", note: "Shine-free, skin-perfecting" },
    { v: "coverage", label: "Full Coverage + SPF", pid: "coverage-foundation-spf15", note: "Flawless coverage with SPF 15" }
  ];
  var SERUM_MAP = {
    warm: ["Golden Glow", "Golden Glow", "Golden Glow", "Bronze Glow", "Bronze Glow"],
    neutral: ["Pearl Glow", "Rose Glow", "Golden Glow", "Bronze Glow", "Bronze Glow"],
    cool: ["Pearl Glow", "Rose Glow", "Rose Glow", "Rose Glow", "Bronze Glow"]
  };
  var GLOSS_MAP = {
    warm: ["YG11 · Peach Nude", "YG11 · Peach Nude", "YG13 · Cinnamon", "YG14 · Burnt Orange", "YG13 · Cinnamon"],
    neutral: ["YG12 · Blush Nude", "YG09 · Mauve Nude", "YG22 · Rosewood", "YG15 · Mocha Mauve", "YG15 · Mocha Mauve"],
    cool: ["YG06 · Petal Pink", "YG05 · Pink Coral", "YG16 · Berry Mauve", "YG16 · Berry Mauve", "YG10 · Plum"]
  };

  function finderPicks() {
    var i = finder.depth - 1;
    var fshade = byId["matte-liquid-foundation"].options[0].values[i];
    var fin = FINISHES.find(function (f) { return f.v === finder.finish; });
    return [
      { pid: fin.pid, opts: { Shade: fshade.label }, why: "Your foundation match" },
      { pid: "pressed-face-powder", opts: { Shade: fshade.label }, why: "Set and touch up in the same tone" },
      { pid: "plump-shine-gloss", opts: { Shade: GLOSS_MAP[finder.tone][i] }, why: "A gloss that flatters your undertone" },
      { pid: "shimmer-body-serum", opts: { Shade: SERUM_MAP[finder.tone][i] }, why: "Your most radiant body glow" }
    ];
  }

  views["shade-finder"] = function () {
    setMeta("Shade Finder", "Find your perfect Ethereal Curves foundation, powder, gloss and body glow shade in 60 seconds.");
    var head = '<section class="pagehead pagehead--noir"><div class="container"><p class="eyebrow">Shade Finder</p><h1 class="h-lg">Find your <span class="script gold-text">perfect match</span></h1><p class="lead" style="margin:0 auto">Three questions. One flawless routine.</p></div></section>';
    return head + '<div class="container"><div class="finder" id="finder">' + finderBody() + "</div></div>";
  };

  function finderBody() {
    var prog = '<div class="finder__progress" aria-hidden="true">' + [0, 1, 2, 3].map(function (i) { return "<i" + (i <= finder.step ? ' class="is-on"' : "") + "></i>"; }).join("") + "</div>";
    var nav = function (canBack) {
      return '<div class="finder__nav">' + (canBack ? '<button type="button" class="link" data-action="finder-back">← Back</button>' : "<span></span>") + '<span class="muted" style="font-size:.85rem">Step ' + (finder.step + 1) + " of 3</span></div>";
    };
    if (finder.step === 0) {
      return prog + '<div class="finder__q"><p class="eyebrow">Step 1</p><h2 class="h-md">Which depth is closest to your skin?</h2><p class="muted">Look at your jawline in natural daylight.</p></div>' +
        '<div class="choices">' + DEPTHS.map(function (d) {
          return '<button type="button" class="choice' + (finder.depth === d.v ? " is-on" : "") + '" data-action="finder-pick" data-k="depth" data-v="' + d.v + '"><span class="choice__sw" style="display:block;background:' + d.hex + '"></span><b>' + d.label + "</b><small>" + d.note + "</small></button>";
        }).join("") + "</div>" + nav(false);
    }
    if (finder.step === 1) {
      return prog + '<div class="finder__q"><p class="eyebrow">Step 2</p><h2 class="h-md">What is your undertone?</h2><p class="muted">The subtle colour beneath the surface of your skin.</p></div>' +
        '<div class="choices">' + TONES.map(function (t) {
          return '<button type="button" class="choice' + (finder.tone === t.v ? " is-on" : "") + '" data-action="finder-pick" data-k="tone" data-v="' + t.v + '"><span class="choice__sw choice__sw--split" style="display:block;--a:' + t.a + ";--b:" + t.b + '"></span><b>' + t.label + "</b><small>" + t.note + "</small></button>";
        }).join("") + '</div><div class="tip"><b>Not sure?</b> Look at the veins on your inner wrist in daylight. Green = warm, blue or purple = cool, hard to tell = neutral.</div>' + nav(true);
    }
    if (finder.step === 2) {
      return prog + '<div class="finder__q"><p class="eyebrow">Step 3</p><h2 class="h-md">How do you like your finish?</h2></div>' +
        '<div class="choices">' + FINISHES.map(function (f) {
          var p = byId[f.pid];
          return '<button type="button" class="choice' + (finder.finish === f.v ? " is-on" : "") + '" data-action="finder-pick" data-k="finish" data-v="' + f.v + '"><img src="' + img(p.images[0], true) + '" alt="" style="width:90px;height:110px;object-fit:cover;border-radius:6px;margin:0 auto 12px"><b>' + f.label + "</b><small>" + f.note + "</small></button>";
        }).join("") + "</div>" + nav(true);
    }
    var picks = finderPicks();
    var fshade = byId["matte-liquid-foundation"].options[0].values[finder.depth - 1];
    var total = picks.reduce(function (n, x) { return n + byId[x.pid].price; }, 0);
    return prog + '<div class="result"><div class="result__hero"><span class="big-sw" style="background:' + fshade.hex + '"></span><div><p class="eyebrow" style="margin-bottom:6px">Your Ethereal match</p>' +
      '<h2 class="h-lg" style="margin:0">' + esc(fshade.label) + '</h2><p style="margin:.3em 0 0;color:#bcae9d">' + DEPTHS[finder.depth - 1].label + " depth · " + finder.tone.charAt(0).toUpperCase() + finder.tone.slice(1) + " undertone</p></div></div>" +
      picks.map(function (x, k) {
        var p = byId[x.pid];
        return '<div class="result__item"><img src="' + img(p.images[0], true) + '" alt=""><div><span class="muted" style="font-size:.78rem;letter-spacing:.14em;text-transform:uppercase">' + x.why + "</span><b>" + esc(p.name) + "</b>" +
          '<span class="line__opts" style="margin:4px 0 0">' + optsHTML(p, x.opts) + " · " + money(p.price) + "</span></div>" +
          '<button type="button" class="btn btn--outline btn--sm" data-action="finder-add" data-k="' + k + '">Add</button></div>';
      }).join("") +
      '<div class="actions"><button type="button" class="btn btn--gold" data-action="finder-add-all">' + ICON.bag + " Add the full look · " + money(total) + '</button><button type="button" class="btn btn--outline" data-action="finder-restart">Start again</button></div>' +
      '<p class="muted center" style="font-size:.9rem">Between two shades? Message us a daylight selfie on <a class="link" target="_blank" rel="noopener" href="' + waLink("Hi! Can you help me find my shade? My Shade Finder match was " + fshade.label + ".") + '">WhatsApp</a> and we\'ll confirm your match.</p></div>';
  }

  function rerenderFinder() {
    var el = $("#finder");
    if (!el) return;
    el.innerHTML = finderBody();
    var q = $(".finder__q h2, .result__hero h2", el);
    if (q) { q.setAttribute("tabindex", "-1"); q.focus({ preventScroll: true }); }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------------
     SIZE GUIDE
     ------------------------------------------------------------------ */
  var BODY_TABLE = [
    ["S", "26–28", "66–71", "36–38", "91–97"], ["M", "29–31", "74–79", "39–41", "99–104"], ["L", "32–34", "81–86", "42–44", "107–112"],
    ["XL", "35–37", "89–94", "45–47", "114–119"], ["2XL", "38–41", "97–104", "48–51", "122–130"], ["3XL", "42–45", "107–114", "52–55", "132–140"],
    ["4XL", "46–49", "117–124", "56–59", "142–150"]
  ];
  var BODY_ROWS = [["S", 28, 38], ["M", 31, 41], ["L", 34, 44], ["XL", 37, 47], ["2XL", 41, 51], ["3XL", 45, 55], ["4XL", 49, 59]];
  var CUPS = ["AA", "A", "B", "C", "D", "DD", "DDD/F", "G", "H", "I"];

  function sizeGuideHTML(tab) {
    tab = tab || "bra";
    var bra = '<div data-sgpanel="bra"' + (tab !== "bra" ? " hidden" : "") + ">" +
      '<div class="calc" data-unit="in"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px"><h3 class="h-md" style="margin:0">Bra size calculator</h3>' +
      '<div class="unit-toggle" role="group" aria-label="Units"><button type="button" class="is-on" data-action="unit" data-u="in">in</button><button type="button" data-action="unit" data-u="cm">cm</button></div></div>' +
      '<div class="calc__row"><div class="field"><label for="sgUnder">Underbust</label><input id="sgUnder" type="number" inputmode="decimal" min="0" placeholder="e.g. 38"></div>' +
      '<div class="field"><label for="sgBust">Fullest bust</label><input id="sgBust" type="number" inputmode="decimal" min="0" placeholder="e.g. 43"></div>' +
      '<button type="button" class="btn btn--dark" data-action="calc-bra">Calculate</button></div><div class="calc__out" id="sgBraOut" aria-live="polite"></div>' +
      '<p class="muted" style="font-size:.88rem;margin:0">Measure snugly around your ribcage just under the bust, then loosely around the fullest part of your bust while wearing a non-padded bra.</p></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Bust − band</th>' + ["3 in", "4 in", "5 in", "6 in", "7 in"].map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" +
      "<tr><td>Cup</td><td>C</td><td>D</td><td>DD</td><td>DDD/F</td><td>G</td></tr></tbody></table></div>" +
      '<p class="muted" style="font-size:.88rem;margin-top:14px">Available in bands 34 – 46 and cups C – G. Between sizes? Choose the larger band and message us — we\'re happy to help you find your fit.</p></div>';

    var body = '<div data-sgpanel="body"' + (tab !== "body" ? " hidden" : "") + ">" +
      '<div class="calc"><h3 class="h-md" style="margin-bottom:14px">Find your shapewear size</h3>' +
      '<div class="calc__row"><div class="field"><label for="sgWaist">Waist (in)</label><input id="sgWaist" type="number" inputmode="decimal" min="0" placeholder="e.g. 34"></div>' +
      '<div class="field"><label for="sgHips">Hips (in)</label><input id="sgHips" type="number" inputmode="decimal" min="0" placeholder="e.g. 46"></div>' +
      '<button type="button" class="btn btn--dark" data-action="calc-body">Find size</button></div><div class="calc__out" id="sgBodyOut" aria-live="polite"></div></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Size</th><th>Waist (in)</th><th>Waist (cm)</th><th>Hips (in)</th><th>Hips (cm)</th></tr></thead><tbody>' +
      BODY_TABLE.map(function (r) { return "<tr>" + r.map(function (c, i) { return "<td>" + (i === 0 ? "<b>" + c + "</b>" : c) + "</td>"; }).join("") + "</tr>"; }).join("") +
      '</tbody></table></div><p class="muted" style="font-size:.88rem;margin-top:14px">If your waist and hips fall in different sizes, choose the larger size for comfort. For firmer sculpting, choose your true size.</p></div>';

    return '<div class="tabs" role="tablist"><button type="button" role="tab" class="' + (tab === "bra" ? "is-on" : "") + '" data-action="sg-tab" data-tab="bra">Bras</button>' +
      '<button type="button" role="tab" class="' + (tab === "body" ? "is-on" : "") + '" data-action="sg-tab" data-tab="body">Shapewear &amp; Intimates</button></div>' + bra + body;
  }

  views["size-guide"] = function () {
    setMeta("Size Guide", "Ethereal Curves bra size calculator and shapewear size chart.");
    return '<section class="pagehead"><div class="container"><p class="eyebrow">Fit help</p><h1 class="h-lg">Size Guide</h1><p class="lead" style="margin:0 auto">The right fit changes everything. Measure once, feel amazing every day.</p></div></section>' +
      '<div class="container" style="max-width:880px;padding-top:40px;padding-bottom:100px">' + sizeGuideHTML("bra") + "</div>";
  };

  function calcBra(root) {
    var unit = $(".calc", root).dataset.unit || "in";
    var k = unit === "cm" ? 1 / 2.54 : 1;
    var ub = parseFloat($("#sgUnder", root).value) * k, bust = parseFloat($("#sgBust", root).value) * k;
    var out = $("#sgBraOut", root);
    if (!(ub > 20) || !(bust > ub)) { out.textContent = "Please enter both measurements (bust larger than underbust)."; return; }
    var band = Math.round(ub / 2) * 2;
    var diff = Math.round(bust - band);
    var cup = CUPS[Math.max(0, Math.min(CUPS.length - 1, diff))];
    var size = band + cup;
    var ok = band >= 34 && band <= 46 && ["C", "D", "DD", "DDD/F", "G"].indexOf(cup) > -1;
    out.innerHTML = "Your estimated size: <b>" + size + "</b>" + (ok ? "" : '<br><span class="muted" style="font-size:1rem">This size isn\'t listed yet — <a class="link" target="_blank" rel="noopener" href="' + waLink("Hi! My bra size is about " + size + ". Do you have a strapless bra that fits?") + '">ask us on WhatsApp</a>.</span>');
  }

  function calcBody(root) {
    var w = parseFloat($("#sgWaist", root).value), h = parseFloat($("#sgHips", root).value);
    var out = $("#sgBodyOut", root);
    if (!(w > 0) || !(h > 0)) { out.textContent = "Please enter your waist and hip measurements."; return; }
    var idx = function (v, col) { for (var i = 0; i < BODY_ROWS.length; i++) if (v <= BODY_ROWS[i][col]) return i; return -1; };
    var a = idx(w, 1), b = idx(h, 2);
    if (a < 0 || b < 0) { out.innerHTML = 'You may need a size above 4XL — <a class="link" target="_blank" rel="noopener" href="' + waLink("Hi! I need shapewear above 4XL. Waist " + w + " in, hips " + h + " in.") + '">message us</a> and we\'ll help.'; return; }
    out.innerHTML = "Your recommended size: <b>" + BODY_ROWS[Math.max(a, b)][0] + "</b>";
  }

  /* ------------------------------------------------------------------
     CONTENT PAGES
     ------------------------------------------------------------------ */
  views.about = function () {
    setMeta("Our Story", "Ethereal Curves is a luxury lifestyle brand created for the full-figured woman. Soft Power. Quiet Luxury. Designed for You.");
    var coll = [
      ["intimates", "Intimates &amp; Lingerie", "", "Beautifully designed with fuller figures in mind, our lingerie collection combines support, comfort, and sensual elegance. From thoughtfully structured bras to delicate lace and everyday panties, every piece is designed to honor your natural silhouette."],
      ["sculpture", "Seamless Shapewear", "Smooth. Supportive. Effortless.", "Our seamless shapewear is designed to move with your body—not against it. Lightweight and comfortable, each piece helps smooth, sculpt, and enhance your natural curves while giving you the confidence to wear your clothes exactly as you envision them."],
      ["", "Apparel &amp; Everyday Wear", "", "From effortless daywear to sophisticated pieces for special occasions, our apparel collection celebrates the beauty of the fuller figure. We look for flattering silhouettes, quality fabrics, and thoughtful details that allow you to express your personal style with confidence."],
      ["makeup", "Beauty, Cosmetics &amp; Accessories", "Beauty should see you.", "Our beauty collection brings together cosmetics and accessories designed to complement your everyday ritual—from rich, high-pigment lip colors and luminous glosses to foundations and beauty essentials selected with diverse skin tones in mind.</p><p>Complete the look with thoughtfully curated accessories, cosmetic bags, shoes, and everyday essentials that bring a touch of luxury to your routine."]
    ];
    return '<section class="pagehead pagehead--noir"><div class="container"><img src="assets/img/logo-figure.png" alt="" style="width:90px;margin:0 auto 16px"><p class="eyebrow">Our story</p>' +
      '<h1 class="h-xl">Ethereal Curves</h1><p class="tagline"><span class="script gold-text">Soft Power. Quiet Luxury. Designed for You.</span></p></div></section>' +

      '<section class="section"><div class="container story"><div class="story__img reveal"><img src="' + img("shapewear") + '" alt="" loading="lazy"></div>' +
      '<div class="reveal prose-block">' +
      '<p class="lead-strong">Ethereal Curves is a luxury lifestyle brand created for the full-figured woman who believes she deserves to feel beautiful, confident, comfortable, and celebrated—exactly as she is.</p>' +
      "<p>Built on the philosophy of <b>“Soft Power. Quiet Luxury.”</b>, Ethereal Curves reimagines everyday essentials through the lens of elegance, functionality, and inclusivity. We believe luxury should not be defined by a size. It should be defined by how something makes you feel.</p>" +
      "<p>Our mission is simple: to create and curate premium essentials designed around the woman—not the other way around.</p>" +
      "<p>From what you wear closest to your skin to the beauty products that enhance your natural glow, every Ethereal Curves piece is selected with the fuller figure in mind. We bring together comfort, quality, sophistication, and effortless femininity so you never have to compromise between looking beautiful and feeling comfortable.</p>" +
      "</div></div></section>" +

      '<section class="section section--cream"><div class="container"><div class="section__head center reveal"><p class="eyebrow">What we offer</p><h2 class="h-lg">Our Collections</h2><div class="ornament"><i></i></div></div>' +
      '<div class="story-cols reveal-stagger">' + coll.map(function (c) {
        return '<article class="story-col"><h3 class="h-md">' + c[1] + "</h3>" + (c[2] ? '<p class="story-col__tag">' + c[2] + "</p>" : "") + "<p>" + c[3] + "</p>" +
          (c[0] ? '<a class="link" href="#/shop?cat=' + c[0] + '">Shop now</a>' : '<span class="muted" style="font-size:.85rem">Coming soon</span>') + "</article>";
      }).join("") + "</div></div></section>" +

      '<section class="section section--noir"><div class="container philosophy reveal">' +
      '<p class="eyebrow">The Ethereal Philosophy</p><h2 class="h-lg">Luxury is not a size. <span class="script gold-text">It is a feeling.</span></h2>' +
      "<p>Ethereal Curves was born from a simple belief: luxury should be designed around you—your skin, your shape, your life.</p>" +
      "<p>For too long, women with fuller figures have had to compromise. Compromise on fit. Compromise on comfort. Compromise on style. And sometimes, simply settle for what is available rather than what they truly desire.</p>" +
      '<p class="philosophy__em">We believe you deserve more.</p>' +
      "<p>From beauty products that celebrate rich, melanin-deep skin to supportive bras, seamless shapewear, and thoughtfully selected essentials made with fuller figures in mind, every piece is chosen to help you feel radiant, supported, confident, and seen.</p>" +
      "<p>Ethereal Curves is more than what you wear. It is a celebration of the woman wearing it.</p>" +
      "<p>It is about embracing your curves without apology, choosing comfort without sacrificing elegance, and experiencing luxury in the everyday moments of your life.</p>" +
      "<p>Because you don't need to fit into a standard of beauty to experience luxury.</p>" +
      '<p class="quote">Luxury was always meant to fit you.</p><p class="philosophy__sign">Luxury Designed for You.</p>' +
      "</div></section>" +

      '<section class="section center"><div class="container" style="max-width:760px">' +
      '<img src="assets/img/logo-figure.png" alt="" style="width:70px;margin:0 auto 18px">' +
      "<p>Ethereal Curves is a brand of <b>" + esc(S.company) + ".</b>, founded by <b>" + esc(S.founder) + "</b> in " + esc(S.location) + ".</p>" +
      '<p class="muted">Born in Liberia and created with a vision that extends beyond borders, Ethereal Curves is building a new expression of inclusive luxury—one that celebrates fuller figures, honors individuality, and makes every woman feel that she belongs in the world of beautiful things.</p>' +
      '<div class="actions"><a class="btn btn--dark" href="#/shop">Discover the collections</a></div></div></section>';
  };

  views.contact = function () {
    setMeta("Contact", "Contact Ethereal Curves on WhatsApp, phone or email.");
    return '<section class="pagehead"><div class="container"><p class="eyebrow">We\'re here for you</p><h1 class="h-lg">Contact Us</h1><p class="lead" style="margin:0 auto">Shade questions, sizing help, orders or wholesale — we\'d love to hear from you.</p></div></section>' +
      '<div class="container contact-grid"><div>' +
      '<div class="contact-card">' + ICON.wa + '<div><b>WhatsApp</b><a target="_blank" rel="noopener" href="' + waLink("Hello Ethereal Curves!") + '">' + fmtPhone(S.whatsapp) + "</a><br><span class=\"muted\">Fastest way to reach us</span></div></div>" +
      '<div class="contact-card">' + ICON.phone + "<div><b>Call</b>" + S.phones.map(function (p) { return '<a href="tel:+' + p + '">' + fmtPhone(p) + "</a>"; }).join("<br>") + "</div></div>" +
      '<div class="contact-card">' + ICON.mail + '<div><b>Email</b><a href="mailto:' + S.email + '">' + S.email + "</a></div></div>" +
      '<div class="contact-card">' + ICON.pin + "<div><b>Based in</b>" + esc(S.location) + "<br><span class=\"muted\">Delivering across Liberia &amp; beyond</span></div></div>" +
      '<div class="contact-card">' + ICON.clock + "<div><b>Hours</b>" + esc(S.hours) + "</div></div></div>" +
      '<form id="contactForm" class="calc" style="margin:0"><h2 class="h-md">Send a message</h2><div class="fields">' +
      '<div class="field"><label for="ctName">Name</label><input id="ctName" name="name" required autocomplete="name"></div>' +
      '<div class="field"><label for="ctPhone">Phone <em>(optional)</em></label><input id="ctPhone" name="phone" type="tel" autocomplete="tel"></div>' +
      '<div class="field full"><label for="ctTopic">Topic</label><select id="ctTopic" name="topic"><option>Product question</option><option>Shade help</option><option>Sizing help</option><option>My order</option><option>Wholesale &amp; partnerships</option><option>Other</option></select></div>' +
      '<div class="field full"><label for="ctMsg">Message</label><textarea id="ctMsg" name="message" required></textarea></div></div>' +
      '<div class="actions" style="justify-content:flex-start"><button class="btn btn--wa" type="submit" data-via="wa">' + ICON.wa + ' Send on WhatsApp</button><button class="btn btn--outline" type="submit" data-via="email">' + ICON.mail + " Send by email</button></div></form></div>";
  };

  views.contact.mount = function () {
    var f = $("#contactForm");
    var via = "wa";
    $$("button[type=submit]", f).forEach(function (b) { b.addEventListener("click", function () { via = b.dataset.via; }); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var d = new FormData(f);
      var text = "Topic: " + d.get("topic") + "\nName: " + d.get("name") + (d.get("phone") ? "\nPhone: " + d.get("phone") : "") + "\n\n" + d.get("message");
      if (via === "email") location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(d.get("topic") + " — " + d.get("name")) + "&body=" + encodeURIComponent(text);
      else window.open(waLink(text), "_blank", "noopener");
      toast("Thank you! We'll get back to you soon.");
    });
  };

  var FAQ = [
    ["Orders & payment", [
      ["How do I place an order?", "Add your favourites to your bag and check out. Your order is sent to us on WhatsApp, where we confirm availability and delivery. You can also simply message us on WhatsApp with what you'd like."],
      ["Which payment methods do you accept?", "Orange Money, MTN Mobile Money, and cash on delivery for Monrovia delivery and pickup. Use your order number as the payment reference so we can match it quickly."],
      ["Can I pay in Liberian dollars?", "Yes. Switch the currency at the top of the page to see prices in LRD. The LRD amount is an estimate based on the current exchange rate — we'll confirm the exact amount on WhatsApp."],
      ["Do you have discount codes?", "Use WELCOME10 for 10% off your first order. Join the Ethereal Circle to hear about private offers first."]
    ]],
    ["Delivery", [
      ["How fast is delivery?", "Within Monrovia: 1–2 business days. Outside Monrovia (all 15 counties): 3–5 business days. International: we'll send a shipping quote and timeline on WhatsApp."],
      ["How much is delivery?", "Monrovia delivery is $5 and free on orders over $" + S.freeDeliveryOver + ". Pickup is free. Delivery outside Monrovia is $10."],
      ["Can I pick up my order?", "Yes — choose \"Pick up in Monrovia\" at checkout and we'll WhatsApp you the pickup point and time."]
    ]],
    ["Returns & exchanges", [
      ["What is your return policy?", "Unopened, unused beauty products can be exchanged within 7 days of delivery. For hygiene reasons, opened beauty products can't be returned unless they arrived damaged."],
      ["Can I exchange a bra or shapewear for a different size?", "Yes. Unworn items with tags and hygiene liners intact can be exchanged for another size within 7 days. Message us on WhatsApp to arrange it."],
      ["My item arrived damaged.", "We're so sorry! Send us a photo on WhatsApp within 48 hours of delivery and we'll make it right."]
    ]],
    ["Products & fit", [
      ["How do I find my foundation shade?", "Try our Shade Finder — three quick questions and we'll match your foundation, powder, gloss and body glow. You can also send us a daylight selfie on WhatsApp."],
      ["Are your products vegan and cruelty-free?", "Our Plump & Shine Lip Gloss and Shimmer Body Serum are vegan and cruelty-free. Ask us about any other product and we'll share the details."],
      ["How do I find my bra or shapewear size?", "Use the calculators in our Size Guide. If you're between sizes, message us — we're happy to help."]
    ]]
  ];

  views.faq = function () {
    setMeta("Help & FAQ", "Ethereal Curves delivery, payment, returns and sizing help.");
    return '<section class="pagehead"><div class="container"><p class="eyebrow">Help centre</p><h1 class="h-lg">Questions &amp; Answers</h1><p class="lead" style="margin:0 auto">Everything you need to know about ordering, delivery and fit.</p></div></section>' +
      '<div class="container"><div class="faq">' + FAQ.map(function (g) {
        return "<h2>" + g[0] + "</h2>" + g[1].map(function (qa) {
          return '<details class="acc"><summary>' + qa[0] + '</summary><div class="acc__body"><p>' + qa[1] + "</p></div></details>";
        }).join("");
      }).join("") +
      '<div class="calc center" style="margin-top:50px"><h2 class="h-md">Still need help?</h2><p class="muted">Our team replies fastest on WhatsApp.</p><div class="actions" style="margin-bottom:0"><a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink("Hello! I have a question.") + '">' + ICON.wa + ' Chat on WhatsApp</a><a class="btn btn--outline" href="#/contact">Contact us</a></div></div>' +
      "</div></div>";
  };

  views.notFound = function () {
    setMeta("Page not found", "");
    return '<div class="container"><div class="empty" style="padding:110px 0"><p class="eyebrow">404</p><h1 class="h-lg">This page has <span class="script">floated away</span></h1><p class="muted">Let\'s get you back to something beautiful.</p><div class="actions"><a class="btn btn--dark" href="#/">Home</a><a class="btn btn--outline" href="#/shop">Shop all</a></div></div></div>';
  };

  /* ------------------------------------------------------------------
     Search
     ------------------------------------------------------------------ */
  var searchInput = $("#searchInput");
  function renderSearch() {
    var q = searchInput.value.trim();
    var out = $("#searchResults");
    if (!q) {
      out.innerHTML = '<p class="eyebrow">Popular searches</p><div class="search__tags">' +
        ["Lipstick", "Lip gloss", "Foundation", "Powder", "Shimmer", "Sculpture", "Strapless", "Nude"].map(function (t) {
          return '<button type="button" class="chip" data-action="search-tag" data-q="' + t + '">' + t + "</button>";
        }).join("") + '</div><p class="eyebrow" style="margin-top:28px">Trending now</p><div class="search__grid">' +
        PRODUCTS.filter(function (p) { return p.bestseller; }).slice(0, 4).map(searchHit).join("") + "</div>";
      return;
    }
    var hits = PRODUCTS.filter(function (p) { return matchesQuery(p, q); });
    out.innerHTML = hits.length
      ? '<p class="eyebrow">' + hits.length + " result" + (hits.length === 1 ? "" : "s") + '</p><div class="search__grid">' + hits.slice(0, 8).map(searchHit).join("") + "</div>" +
        (hits.length > 8 ? '<p style="margin-top:18px"><a class="link" href="#/shop?q=' + encodeURIComponent(q) + '">See all results</a></p>' : "")
      : '<p class="muted">No results for “' + esc(q) + '”. Try “gloss”, “foundation” or “bra” — or <a class="link" target="_blank" rel="noopener" href="' + waLink("Hi! I'm looking for: " + q) + '">ask us on WhatsApp</a>.</p>';
  }
  function searchHit(p) {
    return '<a class="search-hit" href="#/product/' + p.id + '"><img src="' + img(p.images[0], true) + '" alt=""><span><strong>' + esc(p.name) + '</strong><span class="muted">' + money(p.price) + " · " + catById[p.category].name + "</span></span></a>";
  }
  searchInput.addEventListener("input", renderSearch);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && searchInput.value.trim()) {
      closeOverlay(true);
      location.hash = "#/shop?q=" + encodeURIComponent(searchInput.value.trim());
    }
  });

  /* ------------------------------------------------------------------
     Global click handling
     ------------------------------------------------------------------ */
  document.addEventListener("click", function (e) {
    var closer = e.target.closest("[data-close]");
    if (closer) { closeOverlay(); return; }

    var t = e.target.closest("[data-action]");
    if (!t) return;
    var a = t.dataset.action;
    var p, f;

    switch (a) {
      case "wish": e.preventDefault(); toggleWish(t.dataset.id); break;
      case "add":
        p = byId[t.dataset.id];
        var auto = {};
        (p.options || []).forEach(function (o) { auto[o.name] = o.values[0].label; });
        addToCart(p.id, auto, 1); afterAdd(p); break;
      case "quick": quickView(t.dataset.id); break;
      case "opt": selectOpt(t); break;
      case "qty":
        var qi = $("[data-qty='" + t.dataset.form + "']");
        if (qi) qi.value = Math.max(1, Math.min(99, (parseInt(qi.value, 10) || 1) + parseInt(t.dataset.d, 10)));
        break;
      case "form-add":
        f = forms[t.dataset.form];
        if (f && submitForm(t.dataset.form)) afterAdd(byId[f.pid]);
        break;
      case "wa-ask":
        f = forms[t.dataset.form];
        if (f) {
          p = byId[f.pid];
          var chosen = optsText(f.sel);
          t.href = waLink("Hi Ethereal Curves! I'm interested in the " + p.name + (chosen ? " (" + chosen + ")" : "") + ". Is it available?");
        }
        break;
      case "line-qty":
        var line = state.cart.find(function (l) { return l.key === t.dataset.key; });
        if (line) setQty(line.key, line.qty + parseInt(t.dataset.d, 10));
        break;
      case "line-remove": setQty(t.dataset.key, 0); break;
      case "promo-remove": removePromo(); break;
      case "open-cart": renderCart(); openOverlay("cart"); break;
      case "thumb":
        var pid = currentRoute.arg, i = parseInt(t.dataset.i, 10);
        $("#gImg").src = img(byId[pid].images[i]);
        $$(".gallery__thumbs button").forEach(function (b, k) { b.classList.toggle("is-on", k === i); });
        break;
      case "lightbox": openLightbox(t.dataset.src, ""); break;
      case "hero-go": goHero(parseInt(t.dataset.i, 10)); startHero(); break;
      case "hero-pause":
        hero.paused = !hero.paused;
        $(".hero").classList.toggle("paused", hero.paused);
        setPauseIcon();
        if (hero.paused) clearInterval(hero.timer); else { goHero(hero.i + 1); startHero(); }
        break;
      case "rail":
        $$("[data-action='rail']").forEach(function (b) { var on = b === t; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
        $("#rail").innerHTML = gridHTML(railList(t.dataset.tab));
        observeReveals();
        break;
      case "sb-pick":
        var sh = byId["plump-shine-gloss"].options[0].values[parseInt(t.dataset.i, 10)];
        state.sbIndex = parseInt(t.dataset.i, 10);
        $$(".shadegrid button").forEach(function (b) { var on = b === t; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on); });
        $("#sbDot").style.background = sh.hex;
        $("#sbName").textContent = sh.label;
        $("#sbCode").textContent = sh.label.split(" ·")[0];
        break;
      case "sb-add":
        p = byId["plump-shine-gloss"];
        addToCart(p.id, { Shade: p.options[0].values[state.sbIndex || 0].label }, 1);
        afterAdd(p);
        break;
      case "filters-open": openOverlay("filters"); break;
      case "filters-close": closeOverlay(); break;
      case "filters-clear": if (views.shop.clear) views.shop.clear(); break;
      case "size-guide":
        openModal('<h2 class="h-lg">Size Guide</h2>' + sizeGuideHTML(t.dataset.guide), true);
        break;
      case "sg-tab":
        var root = t.closest(".modal__body") || app;
        $$("[data-action='sg-tab']", root).forEach(function (b) { b.classList.toggle("is-on", b === t); });
        $$("[data-sgpanel]", root).forEach(function (pn) { pn.hidden = pn.dataset.sgpanel !== t.dataset.tab; });
        break;
      case "unit":
        var calc = t.closest(".calc");
        calc.dataset.unit = t.dataset.u;
        $$("[data-action='unit']", calc).forEach(function (b) { b.classList.toggle("is-on", b === t); });
        break;
      case "calc-bra": calcBra(t.closest(".modal__body") || app); break;
      case "calc-body": calcBody(t.closest(".modal__body") || app); break;
      case "finder-pick":
        finder[t.dataset.k] = t.dataset.k === "depth" ? parseInt(t.dataset.v, 10) : t.dataset.v;
        finder.step++;
        rerenderFinder();
        break;
      case "finder-back": finder.step = Math.max(0, finder.step - 1); rerenderFinder(); break;
      case "finder-restart": finder = { step: 0, depth: null, tone: null, finish: null }; rerenderFinder(); break;
      case "finder-add":
        var pick = finderPicks()[parseInt(t.dataset.k, 10)];
        addToCart(pick.pid, pick.opts, 1);
        afterAdd(byId[pick.pid]);
        break;
      case "finder-add-all":
        finderPicks().forEach(function (x) { addToCart(x.pid, x.opts, 1); });
        renderCart(); openOverlay("cart");
        toast("Your full look is in your bag ✦");
        break;
      case "copy": copyText(t.dataset.text, t.dataset.label); break;
      case "search-tag": searchInput.value = t.dataset.q; renderSearch(); searchInput.focus(); break;
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.matches("[data-promo-form]")) {
      e.preventDefault();
      applyPromo(f.elements.code.value);
    } else if (f.matches("[data-newsletter]")) {
      e.preventDefault();
      var v = f.elements.contact.value.trim();
      if (!v) return;
      if (S.newsletterEndpoint) {
        var body = new FormData();
        body.append("contact", v);
        fetch(S.newsletterEndpoint, { method: "POST", body: body, headers: { Accept: "application/json" } })
          .then(function () { toast("Welcome to the Ethereal Circle ✦"); f.reset(); })
          .catch(function () { toast("Something went wrong — please try again"); });
      } else {
        window.open(waLink("Hi! Please add me to the Ethereal Circle VIP list: " + v), "_blank", "noopener");
        toast("Welcome to the Ethereal Circle ✦");
        f.reset();
      }
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target.matches("[data-qty]")) {
      e.target.value = Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1));
    }
  });

  /* ------------------------------------------------------------------
     Chrome: header, announcements, currency, footer
     ------------------------------------------------------------------ */
  $("#menuOpen").addEventListener("click", function () { openOverlay("nav"); });
  $("#cartOpen").addEventListener("click", function () { renderCart(); openOverlay("cart"); });
  $("#searchOpen").addEventListener("click", function () { renderSearch(); openOverlay("search"); });
  $$("#mobileNav a").forEach(function (a) { a.addEventListener("click", function () { closeOverlay(true); }); });

  var cur = $("#currencyToggle");
  function syncCurrency() {
    cur.textContent = state.currency === "LRD" ? "LRD" : "USD";
    cur.setAttribute("aria-label", "Prices in " + (state.currency === "LRD" ? "Liberian dollars" : "US dollars") + ". Switch currency");
  }
  cur.addEventListener("click", function () {
    state.currency = state.currency === "USD" ? "LRD" : "USD";
    store.set("currency", state.currency);
    syncCurrency();
    renderCart();
    render();
    toast("Prices now shown in " + (state.currency === "LRD" ? "Liberian dollars (L$" + S.currency.lrdRate + " = $1)" : "US dollars"));
  });

  var header = $("#header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });

  (function announcements() {
    var track = $("#announce");
    track.innerHTML = S.announcements.map(function (m, i) { return '<div class="announce__msg' + (i === 0 ? " is-on" : "") + '">' + esc(m) + "</div>"; }).join("");
    var msgs = $$(".announce__msg", track), i = 0;
    if (msgs.length < 2) return;
    setInterval(function () {
      msgs[i].classList.remove("is-on");
      i = (i + 1) % msgs.length;
      msgs[i].classList.add("is-on");
    }, 4500);
  })();

  (function footer() {
    var c = $("#footerContact");
    var social = ["instagram", "facebook", "tiktok"].filter(function (k) { return S.social[k]; });
    c.innerHTML += '<a target="_blank" rel="noopener" href="' + waLink("Hello Ethereal Curves!") + '">WhatsApp ' + fmtPhone(S.whatsapp) + "</a>" +
      S.phones.map(function (p) { return '<a href="tel:+' + p + '">Call ' + fmtPhone(p) + "</a>"; }).join("") +
      '<a href="mailto:' + S.email + '">' + S.email + "</a><span>" + esc(S.location) + "</span>" +
      (social.length ? '<div class="footer__social">' + social.map(function (k) {
        return '<a href="' + esc(S.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ICON[k] + "</a>";
      }).join("") + "</div>" : "");
    $("#mnavFoot").innerHTML = '<a target="_blank" rel="noopener" href="' + waLink("Hello Ethereal Curves!") + '"><b>WhatsApp</b> ' + fmtPhone(S.whatsapp) + "</a>" +
      '<a href="mailto:' + S.email + '">' + S.email + "</a>" +
      '<button type="button" class="link" style="justify-self:start;margin-top:6px" id="mnavCurrency">Switch to ' + (state.currency === "USD" ? "LRD" : "USD") + "</button>";
    $("#mnavCurrency").addEventListener("click", function () { closeOverlay(true); cur.click(); this.textContent = "Switch to " + (state.currency === "USD" ? "LRD" : "USD"); });
    $("#year").textContent = new Date().getFullYear();
    $("#waFloat").href = waLink("Hello Ethereal Curves! ");
  })();

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  syncCurrency();
  updateCounts();
  renderCart();
  if (location.hash === "#/cart") { history.replaceState(null, "", "#/"); render(); openOverlay("cart"); }
  else render();
})();
