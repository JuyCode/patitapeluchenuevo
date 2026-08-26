// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCqLHY7scsdGbQTIk2KhfCEB7pH6KzSNz8",
    authDomain: "patitapeluche-3b99f.firebaseapp.com",
    projectId: "patitapeluche-3b99f",
    storageBucket: "patitapeluche-3b99f.firebasestorage.app",
    messagingSenderId: "87497637833",
    appId: "1:87497637833:web:0fae477a79563102e77218",
    measurementId: "G-TGKJ7NHD59"
};

let db = null;
try {
    if (typeof firebase !== "undefined" && firebase.firestore) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
    } else {
        console.warn("Firebase no disponible: la tienda funciona igual, pero los pedidos no se guardan en la base de datos.");
    }
} catch (err) {
    console.warn("Error inicializando Firebase:", err);
}

const VENDEDOR_WHATSAPP = "543885830282";

const productsDatabase = [
    // CARTUCHERAS
    { id: 22, name: "Cartuchera Cinnamoroll", price: 12000, emoji: "☁️", category: "scoops", soldOut: false,
      desc: "Cartuchera de Cinnamoroll, ideal para el colegio o como cosmetiquera. Espaciosa y súper adorable.",
      images: ["img/cinnamoroll-cartuchera.jpeg"] },
    { id: 25, name: "Cartuchera Stitch", price: 14000, emoji: "👽", category: "scoops", soldOut: false,
      desc: "Cartuchera de Stitch súper adorables, ideales para el colegio o como cosmetiquera. Consultá por los diseños disponibles.",
      images: ["img/stitch-cartuchera-1.jpeg", "img/stitch-cartuchera-2.jpeg", "img/stitch-cartuchera-3.jpeg"] },
    { id: 26, name: "Cartuchera Gatitos", price: 14000, emoji: "🐱", category: "scoops", soldOut: false,
      desc: "Cartuchera de gatitos súper tiernas, ideales para el colegio o como cosmetiquera.",
      variants: ["Negro", "Gris"],
      images: ["img/gatitos-cartuchera-1.jpeg", "img/gatitos-cartuchera-2.jpeg", "img/gatitos-cartuchera-3.jpeg", "img/gatitos-cartuchera-4.jpeg"] },
    { id: 1, name: "Cartuchera Kitty", price: 15800, emoji: "🎀", category: "scoops", soldOut: false,
      images: ["img/kitty-cartuchera-1.jpeg", "img/kitty-cartuchera-2.jpeg"] },
    { id: 2, name: "Cartuchera Pompompurin", price: 15800, emoji: "🍮", category: "scoops", soldOut: true,
      desc: "Cartuchera de Pompompurin, ideal para el colegio o como cosmetiquera. Súmer adorable y espaciosa.",
      images: ["img/pompompurin-cartuchera-1.jpeg", "img/pompompurin-cartuchera-2.jpeg", "img/pompompurin-cartuchera-3.jpeg", "img/pompompurin-cartuchera-4.jpeg"] },
    { id: 3, name: "Cartuchera Ternurin", price: 15000, emoji: "💕", category: "scoops", soldOut: true,
      desc: "Cartuchera de Ternurin súper tierna, ideal para el colegio o como cosmetiquera.",
      images: ["img/ternurin-cartuchera-1.jpeg", "img/ternurin-cartuchera-2.jpeg", "img/ternurin-cartuchera-3.jpeg"] },
    { id: 5, name: "Snoopy Cartuchera", price: 15800, emoji: "🐶", category: "scoops", soldOut: true,
      images: ["img/snoopy-cartuchera-1.jpeg", "img/snoopy-cartuchera-2.jpeg", "img/snoopy-cartuchera-3.jpeg", "img/snoopy-cartuchera-4.jpeg"] },
    { id: 7, name: "Cartuchera My Sweet Piano", price: 12000, emoji: "🎹", category: "scoops", soldOut: true,
      images: ["img/piano-cartuchera-1.jpeg"] },
    { id: 8, name: "Cartuchera Pompompurin", price: 12000, emoji: "🌼", category: "scoops", soldOut: true,
      images: ["img/pompompurin-cartuchera-5.jpeg", "img/pompompurin-cartuchera-6.jpeg"] },
    { id: 9, name: "Neceser Pusheen", price: 18000, emoji: "😺", category: "scoops", soldOut: true,
      desc: "Neceser de Pusheen, súper práctico y adorable.",
      images: ["img/neceser-pusheen-1.jpeg", "img/neceser-pusheen-2.jpeg", "img/neceser-pusheen-3.jpeg", "img/neceser-pusheen-4.jpeg"] },

    // LLAVEROS
    { id: 21, name: "Ositos Cariñositos Llaveros", price: 9000, promo: "2 x $16.000", emoji: "🧸", category: "makeup", soldOut: false,
      desc: "Llaveros de los Ositos Cariñositos súper suaves y adorables. Ideales para regalar o coleccionar. ¡Llevando 2 aprovechás el precio especial!",
      variants: ["Gruñonsito", "Divertosito", "Alegrosita", "Generosita"],
      images: ["img/ositos-carinositos-1.jpeg", "img/ositos-carinositos-2.jpeg", "img/ositos-carinositos-3.jpeg", "img/ositos-carinositos-4.jpeg", "img/ositos-carinositos-5.jpeg", "img/ositos-carinositos-6.jpeg", "img/ositos-carinositos-7.jpeg", "img/ositos-carinositos-8.jpeg", "img/ositos-carinositos-9.jpeg", "img/ositos-carinositos-10.jpeg"] },
    { id: 24, name: "Kitty Llaveros", price: 8000, emoji: "🐱", category: "makeup", soldOut: false,
      desc: "Llaveros de Hello Kitty súper adorables, ideales para regalar o para tu llavero. Consultá por los diseños disponibles.",
      images: ["img/kitty-llavero-1.jpeg", "img/kitty-llavero-2.jpeg", "img/kitty-llavero-3.jpeg", "img/kitty-llavero-4.jpeg"] },
    { id: 11, name: "Llaverito Pusheen", price: 7500, emoji: "🍩", category: "makeup", soldOut: true,
      desc: "Llaveritos de Pusheen, súper suaves y adorables.",
      images: ["img/pusheen-llaveros-1.jpeg", "img/pusheen-llaveros-2.jpeg", "img/pusheen-llaveros-3.jpeg"] },
    { id: 12, name: "Pochacco y Gatito Negro", price: 8000, emoji: "🕶️", category: "makeup", soldOut: true,
      desc: "Llaveros de Pochacco y Gatito Negro, súper originales y tiernos.",
      images: ["img/gatito-pochacco-llavero-1.jpeg", "img/gatito-pochacco-llavero-2.jpeg", "img/gatito-pochacco-llavero-3.jpeg"] },
    { id: 13, name: "Ositos Cariñositos Llaveros", price: 8000, emoji: "🧸", category: "makeup", soldOut: true },

    // PELUCHES
    { id: 17, name: "Pusheen Dragon (16x16 cm)", price: 16000, emoji: "🐉", category: "skincare", soldOut: true,
      desc: "Peluche de Pusheen dragón de 16x16 cm, súper suave y adorable.",
      images: ["img/pusheen-peluche-1.jpeg"] },
    { id: 18, name: "Pusheen Galleta (18x14 cm)", price: 16000, emoji: "🍪", category: "skincare", soldOut: true,
      desc: "Peluche de Pusheen galleta de 18x14 cm, súper suave y adorable.",
      images: ["img/pusheen-peluche-3.jpeg", "img/pusheen-peluche-4.jpeg"] },
    { id: 19, name: "Pusheen León (28x21 cm)", price: 18000, emoji: "🦁", category: "skincare", soldOut: true,
      desc: "Peluche de Pusheen león de 28x21 cm, súper suave y adorable.",
      images: ["img/pusheen-peluche-leon-1.jpeg", "img/pusheen-peluche-leon-2.jpeg"] }
];

let cart = [];

// DOM
const viewHome = document.getElementById('view-home');
const viewProducts = document.getElementById('view-products');
const currentCategoryTitle = document.getElementById('current-category-title');
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const mpModal = document.getElementById('mp-modal');
const mpModalTotal = document.getElementById('mp-modal-total');

// --- NAVEGACIÓN ---
function showHomePage() {
    viewProducts.classList.add('hidden');
    document.getElementById('view-product-detail').classList.add('hidden');
    viewHome.classList.remove('hidden');
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategoryPage(categoryCode, categoryName) {
    viewHome.classList.add('hidden');
    document.getElementById('view-product-detail').classList.add('hidden');
    viewProducts.classList.remove('hidden');
    currentCategoryTitle.innerText = categoryName;
    const filtered = productsDatabase.filter(p => p.category === categoryCode);
    renderProductsList(filtered, productsGrid);
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menú hamburguesa (categorías)
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu() { mobileMenu.classList.toggle('open'); }
function closeMenu() { mobileMenu.classList.remove('open'); }

hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target)) closeMenu();
});

// Click en categorías del menú
document.querySelectorAll('.mobile-menu a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showCategoryPage(link.getAttribute('data-category'), link.innerText);
    });
});

document.getElementById('btn-back').addEventListener('click', showHomePage);
document.getElementById('logo-btn').addEventListener('click', showHomePage);

// Nav links
document.getElementById('nav-home').addEventListener('click', (e) => { e.preventDefault(); showHomePage(); });
document.getElementById('nav-shop').addEventListener('click', (e) => { e.preventDefault(); closeMenu(); document.getElementById('tienda-section').scrollIntoView({ behavior: 'smooth' }); });
document.getElementById('nav-checkout').addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openCart(); });

// --- RENDER PRODUCTOS ---
function renderProductsList(productsList, gridElement) {
    const targetGrid = gridElement || document.getElementById('home-products-grid');
    const sorted = [...productsList].sort((a, b) => {
        if (a.soldOut !== b.soldOut) return a.soldOut ? 1 : -1;
        return (b.images && b.images.length > 0 ? 1 : 0) - (a.images && a.images.length > 0 ? 1 : 0);
    });
    targetGrid.innerHTML = sorted.map(product => `
        <div class="product-card ${product.soldOut ? 'sold-out' : ''}" onclick="openProductDetail(${product.id})">
            ${galleryHTML(product, 'card')}
            <div class="product-info-header">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">$${product.price.toLocaleString('es-AR')},00</span>
            </div>
            ${product.promo && !product.soldOut ? `<span class="badge-promo"><i class="fa-solid fa-tags"></i> ${product.promo}</span>` : ''}
            ${product.soldOut
                ? `<span class="badge-agotado"><i class="fa-solid fa-ban"></i> Agotado</span>`
                : product.variants
                    ? `<button class="btn-add-cart" onclick="openProductDetail(${product.id}); event.stopPropagation();">
                        <i class="fa-solid fa-sliders"></i> Elegir Opciones
                    </button>`
                    : `<button class="btn-add-cart" onclick="addToCart(${product.id}); event.stopPropagation();">
                        <i class="fa-solid fa-shopping-cart"></i> Agregar al Carrito
                    </button>`
            }
        </div>
    `).join('');
}

let galleryState = {};

function galleryHTML(product, prefix) {
    if (!product.images || product.images.length === 0) {
        return `<div class="product-img">${product.emoji}</div>`;
    }
    galleryState[`${prefix}-${product.id}`] = 0;
    const imgs = product.images.map((src, i) => `<img src="${src}" alt="${product.name}" class="gallery-slide ${i === 0 ? 'active' : ''}" data-index="${i}">`).join('');
    const dots = product.images.map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('');
    return `
        <div class="product-gallery" id="${prefix}-gallery-${product.id}">
            <div class="gallery-track">${imgs}</div>
            <button type="button" class="gallery-arrow prev" data-dir="-1" aria-label="Imagen anterior"><i class="fas fa-chevron-left"></i></button>
            <button type="button" class="gallery-arrow next" data-dir="1" aria-label="Imagen siguiente"><i class="fas fa-chevron-right"></i></button>
            <div class="gallery-dots">${dots}</div>
        </div>
    `;
}

function updateGalleryDOM(prefix, productId) {
    const key = `${prefix}-${productId}`;
    const gallery = document.getElementById(`${prefix}-gallery-${productId}`);
    if (!gallery) return;
    gallery.querySelectorAll('.gallery-slide').forEach(slide => {
        slide.classList.toggle('active', Number(slide.dataset.index) === galleryState[key]);
    });
    gallery.querySelectorAll('.gallery-dot').forEach(dot => {
        dot.classList.toggle('active', Number(dot.dataset.index) === galleryState[key]);
    });
}

function changeSlide(prefix, productId, direction) {
    const key = `${prefix}-${productId}`;
    const product = productsDatabase.find(p => p.id === productId);
    if (!product || !product.images || galleryState[key] === undefined) return;
    const total = product.images.length;
    galleryState[key] = (galleryState[key] + direction + total) % total;
    updateGalleryDOM(prefix, productId);
}

function setSlide(prefix, productId, index) {
    const key = `${prefix}-${productId}`;
    const product = productsDatabase.find(p => p.id === productId);
    if (!product || !product.images || galleryState[key] === undefined) return;
    const total = product.images.length;
    if (index < 0 || index >= total) return;
    galleryState[key] = index;
    updateGalleryDOM(prefix, productId);
}

// Controles de galería (flechas y puntos) — delegación en fase de captura
document.addEventListener('click', (e) => {
    const arrow = e.target.closest('.gallery-arrow');
    const dot = e.target.closest('.gallery-dot');
    const vbtn = e.target.closest('.variant-btn');
    const addBtn = e.target.closest('.btn-detail-add');

    if (arrow || dot) {
        e.stopPropagation();
        const galleryEl = (arrow || dot).closest('.product-gallery');
        const match = galleryEl && galleryEl.id.match(/^(.+)-gallery-(\d+)$/);
        if (!match) return;
        if (arrow) changeSlide(match[1], Number(match[2]), Number(arrow.dataset.dir));
        else setSlide(match[1], Number(match[2]), Number(dot.dataset.index));
        return;
    }

    if (vbtn) {
        e.stopPropagation();
        selectVariant(Number(vbtn.dataset.product), vbtn.dataset.variant, vbtn);
        return;
    }

    if (addBtn) {
        e.stopPropagation();
        addToCartFromDetail(Number(addBtn.dataset.product));
        return;
    }
}, true);

// --- DETALLE DE PRODUCTO ---
let selectedVariants = {};

function openProductDetail(id) {
    const product = productsDatabase.find(p => p.id === id);
    if (!product) return;

    if (product.variants) {
        selectedVariants[id] = product.variants[0];
    }

    const variantSelector = product.variants ? `
        <div class="variant-label">Elegí tu osito:</div>
        <div class="variant-selector" id="variant-selector-${product.id}">
            ${product.variants.map((v, i) => `<button type="button" class="variant-btn ${i === 0 ? 'active' : ''}" data-variant="${v}" data-product="${product.id}">${v}</button>`).join('')}
        </div>` : '';

    document.getElementById('detail-gallery').innerHTML = galleryHTML(product, 'detail');
    document.getElementById('detail-info').innerHTML = `
        ${product.promo && !product.soldOut ? `<span class="badge-promo" style="font-size: 0.85rem;"><i class="fa-solid fa-tags"></i> ${product.promo}</span>` : ''}
        <h2>${product.name}</h2>
        <div class="detail-price">$${product.price.toLocaleString('es-AR')},00</div>
        ${variantSelector}
        <p class="detail-desc">${product.desc || 'Accesorio adorable de Patita Peluche, elegido con mucho amor. Consultá por diseños y colores disponibles.'}</p>
        ${product.soldOut
            ? `<span class="badge-agotado" style="width: auto;"><i class="fa-solid fa-ban"></i> Agotado</span>`
            : `<button class="btn-add-cart btn-detail-add" data-product="${product.id}">
                <i class="fa-solid fa-shopping-cart"></i> Agregar al Carrito
            </button>`
        }
    `;

    viewHome.classList.add('hidden');
    viewProducts.classList.add('hidden');
    document.getElementById('view-product-detail').classList.remove('hidden');
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectVariant(productId, variant, btn) {
    selectedVariants[productId] = variant;
    const selector = document.getElementById(`variant-selector-${productId}`);
    selector.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function addToCartFromDetail(id) {
    const product = productsDatabase.find(p => p.id === id);
    if (!product) return;
    const variant = product.variants ? (selectedVariants[id] || product.variants[0]) : null;
    addToCart(id, variant);
}

document.getElementById('btn-back-detail').addEventListener('click', showHomePage);

// --- CARRITO ---
let cartUid = 0;

function addToCart(id, variant) {
    const product = productsDatabase.find(p => p.id === id);
    if (!product) return;
    const exist = cart.find(item => item.id === id && (item.variant || null) === (variant || null));
    if (exist) { exist.qty++; }
    else {
        cartUid++;
        cart.push({
            ...product,
            qty: 1,
            variant: variant || null,
            displayName: variant ? `${product.name} (${variant})` : product.name,
            uid: cartUid
        });
    }
    updateCartUI();
    openCart();
}

function updateQty(uid, change) {
    const item = cart.find(item => item.uid === uid);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) { cart = cart.filter(item => item.uid !== uid); }
    updateCartUI();
}

function removeItem(uid) {
    cart = cart.filter(item => item.uid !== uid);
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge-nav');
    const container = document.getElementById('cart-items-container');
    const totalText = document.getElementById('cart-total-price');

    const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
    badge.innerText = totalItems;

    const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    totalText.innerText = `$${totalPrice.toLocaleString('es-AR')},00`;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; margin-top: 50px; color: var(--text-muted);">
                <i class="fa-regular fa-folder-open" style="font-size: 40px; margin-bottom: 10px; color: #ddd;"></i>
                <p>Tu carrito está vacío.</p>
            </div>`;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            ${item.images && item.images.length > 0
                ? `<img src="${item.images[0]}" alt="${item.displayName}" class="cart-item-img">`
                : `<div class="cart-item-emoji">${item.emoji}</div>`
            }
            <div class="cart-item-details">
                <div>
                    <div class="cart-item-title">${item.displayName}</div>
                    <div class="cart-item-meta">$${item.price.toLocaleString('es-AR')},00 c/u</div>
                </div>
                <div class="cart-item-bottom">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQty(${item.uid}, -1)">-</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.uid}, 1)">+</button>
                    </div>
                    <button class="btn-remove-item" onclick="removeItem(${item.uid})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openCart() { cartDrawer.classList.add('open'); cartOverlay.classList.add('active'); }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('active'); }

document.getElementById('open-cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart-btn').addEventListener('click', closeCart);
document.getElementById('btn-keep-shopping').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// --- CHECKOUT ---
async function saveOrderToDatabase(methodUsed, paymentStatus) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const summaryCount = {};
    cart.forEach(item => { summaryCount[item.displayName || item.name] = (summaryCount[item.displayName || item.name] || 0) + item.qty; });
    let itemsText = "";
    for (const [name, qty] of Object.entries(summaryCount)) { itemsText += `${qty}x ${name} | `; }

    const orderId = Math.floor(1000 + Math.random() * 9000);

    try {
        if (!db) {
            triggerSecureWhatsApp(total);
            return;
        }
        await db.collection("pedidos").doc(orderId.toString()).set({
            detalles: itemsText,
            total: total,
            metodo_pago: methodUsed,
            estado_pago: paymentStatus,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });
        triggerSecureWhatsApp(total);
    } catch (err) {
        console.error("Error guardando en Firestore:", err);
        alert("No se pudo registrar el pedido en la base de datos, pero te vamos a redirigir a WhatsApp para completarlo.");
        triggerSecureWhatsApp(total);
    }
}

function triggerSecureWhatsApp(total) {
    let msg = ` *NUEVO PEDIDO - PATITA PELUCHE* \n\n`;

    cart.forEach(item => {
        msg += `• ${item.qty}x ${item.displayName || item.name} - $${(item.price * item.qty).toLocaleString('es-AR')},00\n`;
    });

    msg += `\n*Total: $${total.toLocaleString('es-AR')},00*\n\n`;
    msg += `¡Gracias por comprar en Patita Peluche! 💕`;

    window.open(`https://api.whatsapp.com/send?phone=${VENDEDOR_WHATSAPP}&text=${encodeURIComponent(msg)}`, '_blank');
    cart = []; updateCartUI(); closeCart(); showHomePage();
}

document.getElementById('btn-checkout').addEventListener('click', () => {
    if (cart.length === 0) return;
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if (selectedMethod === "Mercado Pago") {
        mpModalTotal.innerText = document.getElementById('cart-total-price').innerText;
        mpModal.classList.add('active');
    } else {
        saveOrderToDatabase("Efectivo / Retiro", "Pendiente de cobro en local");
    }
});

document.getElementById('mp-mock-form').addEventListener('submit', (e) => {
    e.preventDefault();
    mpModal.classList.remove('active');
    saveOrderToDatabase("Mercado Pago", "Aprobado en Servidor (Simulado)");
});

document.getElementById('btn-close-mp').addEventListener('click', () => { mpModal.classList.remove('active'); });

// Init
renderProductsList(productsDatabase);
updateCartUI();
