// DATA PRODUK

var PRODUCTS = [
  {
    id: 1,
    name: "Kursi Plastik",
    price: 59000,
    cat: "Kursi",
    desc: "Kursi plastik serbaguna, cocok untuk indoor maupun outdoor.",
    img: "kursiplastik"
  },
  {
    id: 2,
    name: "Kursi Santai",
    price: 245000,
    cat: "Kursi",
    desc: "Kursi santai dengan sandaran nyaman untuk ruang tamu atau teras.",
    img: "kursisantai"
  },
  {
    id: 3,
    name: "Lemari Pakaian 2 Pintu",
    price: 799000,
    cat: "Lemari",
    desc: "Lemari pakaian 2 pintu dengan ruang gantung dan rak lipat.",
    img: "lemaripakaian2p"
  },
  {
    id: 4,
    name: "Lemari Pakaian 3 Pintu",
    price: 1199000,
    cat: "Lemari",
    desc: "Lemari pakaian 3 pintu kapasitas besar, cocok untuk keluarga.",
    img: "lemaripakaian3p"
  },
  {
    id: 5,
    name: "Meja Belajar Minimalis",
    price: 330000,
    cat: "Meja",
    desc: "Meja belajar minimalis dengan ruang untuk buku dan perlengkapan tulis.",
    img: "mejabelajarminimalis"
  },
  {
    id: 6,
    name: "Meja Lipat Serbaguna",
    price: 120000,
    cat: "Meja",
    desc: "Meja lipat praktis, mudah disimpan dan dipindahkan.",
    img: "mejalipat"
  },
  {
    id: 7,
    name: "Meja Makan Set 4 Kursi",
    price: 1850000,
    cat: "Meja",
    desc: "Satu set meja makan dengan 4 kursi, cocok untuk ruang makan keluarga.",
    img: "mejamakan4"
  },
  {
    id: 8,
    name: "Meja TV Minimalis",
    price: 359000,
    cat: "Meja",
    desc: "Meja TV minimalis dengan ruang penyimpanan untuk perangkat dan dekorasi.",
    img: "mejatvminimalis"
  },
  {
    id: 9,
    name: "Rak Buku",
    price: 259000,
    cat: "Rak",
    desc: "Rak buku sederhana untuk kamar atau ruang kerja.",
    img: "rakbuku"
  },
  {
    id: 10,
    name: "Rak Sepatu Kecil",
    price: 149000,
    cat: "Rak",
    desc: "Rak sepatu hemat tempat, cocok di dekat pintu masuk.",
    img: "raksepatukecil"
  },
  {
    id: 11,
    name: "Rak Serbaguna 4 Susun",
    price: 189000,
    cat: "Rak",
    desc: "Rak serbaguna 4 susun untuk dapur, kamar mandi, atau ruang keluarga.",
    img: "rakserbaguna4susun"
  },
  {
    id: 12,
    name: "Sofa L Minimalis",
    price: 1999000,
    cat: "Sofa",
    desc: "Sofa L minimalis yang nyaman untuk ruang keluarga.",
    img: "sofaL"
  }
];

// STATE SEDERHANA

var state = {
  search: "",
  category: "all",
  fav: [],        
  cart: {}        
};

// ELEMENT DOM

var grid = document.getElementById("koleksi");
var searchInput = document.getElementById("q");
var subtotalEl = document.getElementById("subtotal");
var cartDrawer = document.getElementById("cart-drawer");
var favDrawer = document.getElementById("fav-drawer");
var detailModal = document.getElementById("detail-modal");
var cartListEl = document.getElementById("cart-list");
var favListEl = document.getElementById("fav-list");
var btnCart = document.getElementById("btn-cart");
var btnFav = document.getElementById("btn-fav");
var detailBody = document.getElementById("detail-body");
var yearSpan = document.getElementById("year");
var contactForm = document.getElementById("contact-form");

// HELPER

function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function isFav(id) {
  return state.fav.indexOf(id) !== -1;
}

function toggleFav(id) {
  var idx = state.fav.indexOf(id);
  if (idx === -1) {
    state.fav.push(id);
  } else {
    state.fav.splice(idx, 1);
  }
}

// RENDER PRODUK GRID

function renderProducts() {
  if (!grid) return;

  var html = "";
  var keyword = state.search.trim().toLowerCase();

  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];

    // filter kategori
    if (state.category !== "all" && p.cat !== state.category) {
      continue;
    }

    // filter search
    if (keyword !== "" && p.name.toLowerCase().indexOf(keyword) === -1) {
      continue;
    }

    var favActive = isFav(p.id) ? "true" : "false";

    html +=
      '<article class="card product-card" data-id="' + p.id + '" tabindex="0" aria-label="' + p.name + '">' +
        '<div class="thumb" aria-hidden="true" ' +
          'style="background-image:url(\'gambar/' + p.img + '.jpg\');' +
                 'background-size:cover;' +
                 'background-position:center;">' +
          '<button class="fav" aria-pressed="' + favActive + '" aria-label="Favoritkan ' + p.name + '" data-fav="' + p.id + '">❤</button>' +
        '</div>' +
        '<div class="info">' +
          '<div class="name">' + p.name + '</div>' +
          '<div class="meta">' +
            '<span>' + p.cat + '</span>' +
            '<strong>' + formatRupiah(p.price) + '</strong>' +
          '</div>' +
          '<button class="link-detail" type="button" data-detail="' + p.id + '">Lihat selengkapnya</button>' +
        '</div>' +
        '<div class="buy">' +
          '<div class="qty" data-qty="' + p.id + '">' +
            '<button data-dec="' + p.id + '" aria-label="Kurangi">−</button>' +
            '<input type="text" value="1" inputmode="numeric" aria-label="Jumlah" />' +
            '<button data-inc="' + p.id + '" aria-label="Tambah">+</button>' +
          '</div>' +
          '<button class="btn primary add" data-add="' + p.id + '">Tambah</button>' +
        '</div>' +
      '</article>';
  }

  grid.innerHTML = html;
}

// RENDER FAVORIT

function renderFavorites() {
  if (!favListEl) return;

  if (state.fav.length === 0) {
    favListEl.innerHTML =
      '<p style="color:var(--muted);font-size:14px">Belum ada produk yang difavoritkan. Klik ikon ❤ di produk untuk menambahkannya.</p>';
    return;
  }

  var html = "";

  for (var i = 0; i < state.fav.length; i++) {
    var id = state.fav[i];
    var p = PRODUCTS.find(function(x) { return x.id === id; });
    if (!p) continue;

    html +=
      '<div class="cart-item">' +
        '<div class="thumb" aria-hidden="true" ' +
          'style="background-image:url(\'gambar/' + p.img + '.jpg\');' +
                 'background-size:cover;' +
                 'background-position:center;"></div>' +
        '<div>' +
          '<strong style="font-size:15px">' + p.name + '</strong>' +
          '<div class="meta">' + p.cat + ' • ' + formatRupiah(p.price) + '</div>' +
          '<p style="margin-top:6px;font-size:13px;color:var(--muted);">' + p.desc + '</p>' +
          '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">' +
            '<button class="btn outline" data-jump="' + p.id + '">Lihat di Produk</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  favListEl.innerHTML = html;
}

// RENDER KERANJANG

function renderCart() {
  if (!cartListEl || !subtotalEl) return;

  var keys = Object.keys(state.cart);
  if (keys.length === 0) {
    cartListEl.innerHTML = "<p>Keranjang kosong.</p>";
    subtotalEl.textContent = formatRupiah(0);
    return;
  }

  var html = "";
  var subtotal = 0;

  for (var i = 0; i < keys.length; i++) {
    var id = keys[i];
    var item = state.cart[id];
    var p = item.product;
    var qty = item.qty;
    subtotal += p.price * qty;

    html +=
      '<div class="cart-item" data-id="' + p.id + '">' +
        '<div class="thumb" aria-hidden="true" ' +
          'style="background-image:url(\'gambar/' + p.img + '.jpg\');' +
                 'background-size:cover;' +
                 'background-position:center;"></div>' +
        '<div>' +
          '<strong style="font-size:15px">' + p.name + '</strong>' +
          '<div class="meta">' + p.cat + ' • ' + formatRupiah(p.price) + '</div>' +
          '<div style="margin-top:6px;font-size:13px;color:var(--muted);">Qty: ' + qty + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;margin-top:4px;">' +
          '<div class="qty" data-cart-qty="' + p.id + '">' +
            '<button data-cart-dec="' + p.id + '">−</button>' +
            '<input type="text" value="' + qty + '" />' +
            '<button data-cart-inc="' + p.id + '">+</button>' +
          '</div>' +
          '<button class="btn outline" data-cart-remove="' + p.id + '">Hapus</button>' +
        '</div>' +
      '</div>';
  }

  cartListEl.innerHTML = html;
  subtotalEl.textContent = formatRupiah(subtotal);
}


// DETAIL PRODUK 

function openDetail(id) {
  if (!detailModal || !detailBody) return;

  var p = PRODUCTS.find(function(x) { return x.id === id; });
  if (!p) return;

  var html =
    '<div class="cart-item">' +
      '<div class="thumb" aria-hidden="true" ' +
        'style="background-image:url(\'gambar/' + p.img + '.jpg\');' +
               'background-size:cover;' +
               'background-position:center;"></div>' +
      '<div>' +
        '<strong style="font-size:16px">' + p.name + '</strong>' +
        '<div class="meta" style="margin-top:4px;">' +
          '<span>' + p.cat + '</span>' +
          '<strong>' + formatRupiah(p.price) + '</strong>' +
        '</div>' +
        '<p style="margin-top:10px;font-size:13px;color:var(--muted);line-height:1.5;">' +
          p.desc +
        '</p>' +
        '<ul style="margin:8px 0 0 18px;font-size:13px;color:var(--muted);padding-left:0;">' +
          '<li>Cocok untuk rumah, kos, atau usaha kecil.</li>' +
          '<li>Detail ukuran & warna mengikuti stok di toko.</li>' +
          '<li>Pemesanan dan cek stok bisa melalui WhatsApp / Instagram.</li>' +
        '</ul>' +
        '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">' +
          '<button class="btn primary" data-add-detail="' + p.id + '">Tambah ke Keranjang</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  detailBody.innerHTML = html;
  detailModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  if (!detailModal) return;
  detailModal.classList.remove("open");
  document.body.style.overflow = "";
}

// HIGHLIGHT PRODUK DARI FAVORIT

function highlightProduct(id) {
  var section = document.getElementById("produk");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  setTimeout(function() {
    var cards = document.querySelectorAll(".product-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("highlight");
    }

    var card = document.querySelector('.product-card[data-id="' + id + '"]');
    if (card) {
      card.classList.add("highlight");
      card.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(function() {
        card.classList.remove("highlight");
      }, 2000);
    }
  }, 250);
}

// EVENT DI GRID PRODUK

if (grid) {
  grid.addEventListener("click", function(e) {
    var target = e.target;

    // favorit
    var favBtn = target.closest("[data-fav]");
    if (favBtn) {
      var favId = parseInt(favBtn.getAttribute("data-fav"), 10);
      toggleFav(favId);
      renderProducts();
      if (favDrawer && favDrawer.classList.contains("open")) {
        renderFavorites();
      }
      return;
    }

    // plus / minus qty
    var incAttr = target.closest("[data-inc]");
    var decAttr = target.closest("[data-dec]");
    if (incAttr || decAttr) {
      var qId = parseInt((incAttr || decAttr).getAttribute(incAttr ? "data-inc" : "data-dec"), 10);
      var qtyWrap = grid.querySelector('[data-qty="' + qId + '"]');
      if (!qtyWrap) return;
      var input = qtyWrap.querySelector("input");
      var val = parseInt(input.value || "1", 10);
      if (isNaN(val) || val < 1) val = 1;
      if (incAttr) val++;
      if (decAttr && val > 1) val--;
      input.value = val;
      return;
    }

    // tambah ke keranjang
    var addBtn = target.closest("[data-add]");
    if (addBtn) {
      var id = parseInt(addBtn.getAttribute("data-add"), 10);
      var prod = PRODUCTS.find(function(x) { return x.id === id; });
      if (!prod) return;

      var qtyInput = grid.querySelector('[data-qty="' + id + '"] input');
      var qtyVal = parseInt(qtyInput && qtyInput.value ? qtyInput.value : "1", 10);
      if (isNaN(qtyVal) || qtyVal < 1) qtyVal = 1;

      if (!state.cart[id]) {
        state.cart[id] = { qty: qtyVal, product: prod };
      } else {
        state.cart[id].qty += qtyVal;
      }
      renderCart();
      openCart();
      return;
    }

    // detail
    var detBtn = target.closest("[data-detail]");
    if (detBtn) {
      var did = parseInt(detBtn.getAttribute("data-detail"), 10);
      openDetail(did);
      return;
    }
  });
}

// SEARCH & FILTER

if (searchInput) {
  searchInput.addEventListener("input", function() {
    state.search = searchInput.value;
    renderProducts();
  });
}

var chips = document.querySelectorAll(".chip");
chips.forEach(function(chip) {
  chip.addEventListener("click", function() {
    chips.forEach(function(c) { c.classList.remove("active"); });
    chip.classList.add("active");
    state.category = chip.getAttribute("data-cat");
    renderProducts();
  });
});


// CART DRAWER

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("open");
  document.body.style.overflow = "";
}

if (btnCart && cartDrawer) {
  btnCart.addEventListener("click", function() {
    openCart();
  });

  cartDrawer.addEventListener("click", function(e) {
    if (e.target.hasAttribute("data-close")) {
      closeCart();
    }
  });
}

if (cartListEl) {
  cartListEl.addEventListener("click", function(e) {
    var target = e.target;

    // hapus
    var rm = target.closest("[data-cart-remove]");
    if (rm) {
      var id = parseInt(rm.getAttribute("data-cart-remove"), 10);
      delete state.cart[id];
      renderCart();
      return;
    }

    var inc = target.closest("[data-cart-inc]");
    var dec = target.closest("[data-cart-dec]");
    if (inc || dec) {
      var cid = parseInt((inc || dec).getAttribute(inc ? "data-cart-inc" : "data-cart-dec"), 10);
      var item = state.cart[cid];
      if (!item) return;
      if (inc) item.qty++;
      if (dec && item.qty > 1) item.qty--;
      renderCart();
    }
  });
}

// FAVORIT DRAWER

if (btnFav && favDrawer) {
  btnFav.addEventListener("click", function() {
    renderFavorites();
    favDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  favDrawer.addEventListener("click", function(e) {
    if (e.target.hasAttribute("data-close")) {
      favDrawer.classList.remove("open");
      document.body.style.overflow = "";
      return;
    }

    var jumpBtn = e.target.closest("[data-jump]");
    if (jumpBtn) {
      var id = parseInt(jumpBtn.getAttribute("data-jump"), 10);
      favDrawer.classList.remove("open");
      document.body.style.overflow = "";
      highlightProduct(id);
    }
  });
}

// MODAL DETAIL

if (detailModal) {
  detailModal.addEventListener("click", function(e) {
    if (e.target.hasAttribute("data-close")) {
      closeDetail();
      return;
    }

    var addDet = e.target.closest("[data-add-detail]");
    if (addDet) {
      var id = parseInt(addDet.getAttribute("data-add-detail"), 10);
      var p = PRODUCTS.find(function(x) { return x.id === id; });
      if (!p) return;

      if (!state.cart[id]) {
        state.cart[id] = { qty: 1, product: p };
      } else {
        state.cart[id].qty++;
      }

      renderCart();
      closeDetail();
      openCart();
    }
  });
}

// CTA "LIHAT PRODUK" DI HERO

var ctaBtn = document.getElementById("cta-jelajah");
if (ctaBtn) {
  ctaBtn.addEventListener("click", function() {
    var section = document.getElementById("produk");
    if (!section) return;
    var top = section.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: top, behavior: "smooth" });
  });
}

// NAVBAR SCROLL 

var navLinks = document.querySelectorAll(".menu a");
navLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var targetId = link.getAttribute("href").slice(1);
    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      var top = targetEl.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    navLinks.forEach(function(l) { l.classList.remove("active"); });
    link.classList.add("active");
  });
});

// CONTACT FORM SEDERHANA

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var status = document.getElementById("contact-status");
    if (status) {
      status.textContent =
        "Terima kasih, pesan kamu sudah tercatat. Untuk respon cepat bisa chat via Instagram juga.";
    }
    contactForm.reset();
  });
}

// INIT

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

renderProducts();
renderCart();
