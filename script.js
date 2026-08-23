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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const VENDEDOR_WHATSAPP = "543884418917";

const productsDatabase = [
    // CARTUCHERAS
    { id: 22, name: "Cartuchera Cinnamoroll", price: 12000, emoji: "☁️", category: "scoops", soldOut: false,
      desc: "Cartuchera de Cinnamoroll, ideal para el colegio o como cosmetiquera. Espaciosa y súper adorable.",
      images: ["img/cinnamoroll-cartuchera.jpeg"] },
    { id: 23, name: "Kitty Cartuchera/Cosmetiquero", price: 14000, emoji: "🎀", category: "scoops", soldOut: false,
      desc: "Cartuchera de Hello Kitty súper tierna, ideal para el colegio o como cosmetiquera.",
      images: ["img/kitty-cartuchera-1.jpeg", "img/kitty-cartuchera-2.jpeg"] },
    { id: 25, name: "Cartucheras Stitch", price: 14000, emoji: "👽", category: "scoops", soldOut: false,
      desc: "Cartucheras de Stitch súper adorables, ideales para el colegio o como cosmetiquera. Consultá por los diseños disponibles.",
      images: ["img/stitch-cartuchera-1.jpeg", "img/stitch-cartuchera-2.jpeg", "img/stitch-cartuchera-3.jpeg"] },
    { id: 26, name: "Cartucheras Gatitos", price: 14000, emoji: "🐱", category: "scoops", soldOut: false,
      desc: "Cartucheras de gatitos súper tiernas, ideales para el colegio o como cosmetiquera. Disponibles solo en gris y negro.",
      images: ["img/gatitos-cartuchera-1.jpeg", "img/gatitos-cartuchera-2.jpeg", "img/gatitos-cartuchera-3.jpeg", "img/gatitos-cartuchera-4.jpeg"] },
    { id: 1, name: "Kitty Cartuchera/Cosmetiquero", price: 15800, emoji: "🎀", category: "scoops", soldOut: false },
    { id: 2, name: "Pompompurin Cartuchera/Cosmetiquero (Diseño acostado)", price: 15800, emoji: "🍮", category: "scoops", soldOut: false },
    { id: 3, name: "Ternurin Cartuchera/Cosmetiquero", price: 15000, emoji: "💕", category: "scoops", soldOut: false },
    { id: 4, name: "Gatitos Cartucheras/Cosmetiquero (Gris, negro, marrón)", price: 15800, emoji: "🐱", category: "scoops", soldOut: false },
    { id: 5, name: "Snoopy Cartuchera", price: 15800, emoji: "🐶", category: "scoops", soldOut: true },
    { id: 6, name: "Cartuchera Stitch", price: 15800, emoji: "👽", category: "scoops", soldOut: false },
    { id: 7, name: "Cartuchera My Sweet Piano", price: 12000, emoji: "🎹", category: "scoops", soldOut: true },
    { id: 8, name: "Cartuchera Pompompurin (Cara redonda, cierre marrón)", price: 12000, emoji: "🌼", category: "scoops", soldOut: true },
    { id: 9, name: "Neceser Pusheen Doble Compartimiento", price: 18000, emoji: "😺", category: "scoops", soldOut: true },

    // LLAVEROS
    { id: 21, name: "Ositos Cariñositos Llaveros", price: 9000, promo: "2 x $16.000", emoji: "🧸", category: "makeup", soldOut: false,
      desc: "Llaveros de los Ositos Cariñositos súper suaves y adorables. Ideales para regalar o coleccionar. ¡Llevando 2 aprovechás el precio especial!",
      images: ["img/ositos-carinositos-1.jpeg", "img/ositos-carinositos-2.jpeg", "img/ositos-carinositos-3.jpeg", "img/ositos-carinositos-4.jpeg", "img/ositos-carinositos-5.jpeg"] },
    { id: 24, name: "Kitty Llaveros", price: 8000, emoji: "🐱", category: "makeup", soldOut: false,
      desc: "Llaveros de Hello Kitty súper adorables, ideales para regalar o para tu llavero. Consultá por los diseños disponibles.",
      images: ["img/kitty-llavero-1.jpeg", "img/kitty-llavero-2.jpeg", "img/kitty-llavero-3.jpeg", "img/kitty-llavero-4.jpeg"] },
    { id: 10, name: "Kitty Llavero (Peluche blanco con cadena dorada)", price: 8000, emoji: "⭐", category: "makeup", soldOut: false },
    { id: 11, name: "Llaveritos Pusheen (Forma de dona)", price: 7500, emoji: "🍩", category: "makeup", soldOut: true },
    { id: 12, name: "Pochacco y Gatito Negro (Peluche con antiparras)", price: 8000, emoji: "🕶️", category: "makeup", soldOut: true },
    { id: 13, name: "Ositos Cariñositos Llaveros", price: 8000, emoji: "🧸", category: "makeup", soldOut: true },
    { id: 14, name: "Ty Beanie Boos Llavero (Ratoncita con brillos)", price: 6000, emoji: "✨", category: "makeup", soldOut: false },
    { id: 15, name: "Gatitos de Chenille", price: 6500, emoji: "🐈", category: "makeup", soldOut: false },
    { id: 16, name: "Nutrias Bebes Llavero", price: 6000, emoji: "🦦", category: "makeup", soldOut: false },

    // PELUCHES
    { id: 17, name: "Pusheen Dragon (16x16 cm)", price: 16000, emoji: "🐉", category: "skincare", soldOut: true },
    { id: 18, name: "Pusheen Galleta (18x14 cm)", price: 16000, emoji: "🍪", category: "skincare", soldOut: true },
    { id: 19, name: "Pusheen León (28x21 cm)", price: 18000, emoji: "🦁", category: "skincare", soldOut: true },

    // OTROS
    { id: 20, name: "Rilakkuma Monedero (Peluche de osito con galleta)", price: 7500, emoji: "🍯", category: "beauty", soldOut: false }
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
    const sorted = [...productsList].sort((a, b) =>
        (b.images && b.images.length > 0 ? 1 : 0) - (a.images && a.images.length > 0 ? 1 : 0)
    );
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

function updateGalleryDOM(key) {
    const gallery = document.getElementById(`${key}-gallery`);
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
    updateGalleryDOM(key);
}

function setSlide(prefix, productId, index) {
    const key = `${prefix}-${productId}`;
    const product = productsDatabase.find(p => p.id === productId);
    if (!product || !product.images || galleryState[key] === undefined) return;
    const total = product.images.length;
    if (index < 0 || index >= total) return;
    galleryState[key] = index;
    updateGalleryDOM(key);
}

// Controles de galería (flechas y puntos) — delegación en fase de captura
document.addEventListener('click', (e) => {
    const arrow = e.target.closest('.gallery-arrow');
    const dot = e.target.closest('.gallery-dot');
    if (!arrow && !dot) return;
    e.stopPropagation();
    const galleryEl = (arrow || dot).closest('.product-gallery');
    const match = galleryEl && galleryEl.id.match(/^(.+)-gallery-(\d+)$/);
    if (!match) return;
    const prefix = match[1];
    const productId = Number(match[2]);
    if (arrow) {
        changeSlide(prefix, productId, Number(arrow.dataset.dir));
    } else {
        setSlide(prefix, productId, Number(dot.dataset.index));
    }
}, true);

// --- DETALLE DE PRODUCTO ---
function openProductDetail(id) {
    const product = productsDatabase.find(p => p.id === id);
    if (!product) return;

    document.getElementById('detail-gallery').innerHTML = galleryHTML(product, 'detail');
    document.getElementById('detail-info').innerHTML = `
        ${product.promo && !product.soldOut ? `<span class="badge-promo" style="font-size: 0.85rem;"><i class="fa-solid fa-tags"></i> ${product.promo}</span>` : ''}
        <h2>${product.name}</h2>
        <div class="detail-price">$${product.price.toLocaleString('es-AR')},00</div>
        <p class="detail-desc">${product.desc || 'Accesorio adorable de Patita Peluche, elegido con mucho amor. Consultá por diseños y colores disponibles.'}</p>
        ${product.soldOut
            ? `<span class="badge-agotado" style="width: auto;"><i class="fa-solid fa-ban"></i> Agotado</span>`
            : `<button class="btn-add-cart btn-detail-add" onclick="addToCart(${product.id})">
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

document.getElementById('btn-back-detail').addEventListener('click', showHomePage);

// --- CARRITO ---
function addToCart(id) {
    const product = productsDatabase.find(p => p.id === id);
    if (!product) return;
    const exist = cart.find(item => item.id === id);
    if (exist) { exist.qty++; } else { cart.push({ ...product, qty: 1 }); }
    updateCartUI();
    openCart();
}

function updateQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) { cart = cart.filter(item => item.id !== id); }
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
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
            <div class="cart-item-emoji">${item.emoji}</div>
            <div class="cart-item-details">
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-meta">$${item.price.toLocaleString('es-AR')},00 c/u</div>
                </div>
                <div class="cart-item-bottom">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="btn-remove-item" onclick="removeItem(${item.id})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openCart() { cartDrawer.classList.add('open'); cartOverlay.classList.add('active'); }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('active'); }

document.getElementById('open-cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart-btn').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// --- CHECKOUT ---
async function saveOrderToDatabase(methodUsed, paymentStatus) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const summaryCount = {};
    cart.forEach(item => { summaryCount[item.name] = (summaryCount[item.name] || 0) + item.qty; });
    let itemsText = "";
    for (const [name, qty] of Object.entries(summaryCount)) { itemsText += `${qty}x ${name} | `; }

    const orderId = Math.floor(1000 + Math.random() * 9000);

    try {
        await db.collection("pedidos").doc(orderId.toString()).set({
            detalles: itemsText,
            total: total,
            metodo_pago: methodUsed,
            estado_pago: paymentStatus,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });
        triggerSecureWhatsApp(orderId, total, methodUsed);
    } catch (err) {
        console.error("Error guardando en Firestore:", err);
        alert("Ocurrió un error al registrar el pedido.");
    }
}

function triggerSecureWhatsApp(orderId, total, methodUsed) {
    let msg = ` *NUEVO PEDIDO - PATITA PELUCHE* \n\n`;
    msg += `¡Hola! Acabo de confirmar mi compra en la web.\n\n`;
    msg += ` *Orden de Pedido: #${orderId}\n`;
    msg += ` *Monto Registrado:* $${total.toLocaleString('es-AR')},00\n`;
    msg += ` *Forma de Pago:* ${methodUsed}\n\n`;

    let itemsList = "";
    cart.forEach(item => { itemsList += `• ${item.qty}x ${item.name} ($${(item.price * item.qty).toLocaleString('es-AR')},00)\n`; });
    msg += `*Productos:*\n${itemsList}\n`;
    msg += `Porfa, ingresá a tu consola con el número *#${orderId}* para validar y coordinar la entrega. 💕`;

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
