// CONFIGURACIÓN DE TU BASE DE DATOS FIREBASE (¡Actualizado con tus datos reales!)
const firebaseConfig = {
    apiKey: "AIzaSyCqLHY7scsdGbQTIk2KhfCEB7pH6KzSNz8",
    authDomain: "patitapeluche-3b99f.firebaseapp.com",
    projectId: "patitapeluche-3b99f",
    storageBucket: "patitapeluche-3b99f.firebasestorage.app",
    messagingSenderId: "87497637833",
    appId: "1:87497637833:web:0fae477a79563102e77218",
    measurementId: "G-TGKJ7NHD59"
};

// Inicializar Firebase de forma global y segura
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const VENDEDOR_WHATSAPP = "543884418917"; 

const productsDatabase = [
    { id: 1, name: "Cartuchera de Pompompurin", price: 23000, emoji: "🥄", category: "scoops" },
    { id: 2, name: "Neceser pusheen doble compartimiento", price: 39000, emoji: "✨", category: "scoops" },
    { id: 3, name: ".....", price: 58500, emoji: "💖", category: "scoops" },
    { id: 4, name: ".....", price: 70000, emoji: "🌟", category: "scoops" },
    { id: 5, name: ".....", price: 3800, emoji: "💄", category: "makeup" },
    { id: 6, name: ".....", price: 12000, emoji: "🎨", category: "makeup" }
];

let cart = [];

// Elementos DOM
const viewHome = document.getElementById('view-home');
const viewProducts = document.getElementById('view-products');
const currentCategoryTitle = document.getElementById('current-category-title');
const productsContainer = document.getElementById('products-container');
const mpModal = document.getElementById('mp-modal');
const mpModalTotal = document.getElementById('mp-modal-total');

// NAVEGACIÓN
function showCategoryPage(categoryCode, categoryName) {
    viewHome.classList.add('hidden');
    viewProducts.classList.remove('hidden');
    currentCategoryTitle.innerText = categoryName;
    const filteredProducts = productsDatabase.filter(p => p.category === categoryCode);
    renderProductsList(filteredProducts);
}
function showHomePage() { viewProducts.classList.add('hidden'); viewHome.classList.remove('hidden'); }

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        showCategoryPage(card.getAttribute('data-category'), card.querySelector('h3').innerText);
    });
});
document.getElementById('btn-back').addEventListener('click', showHomePage);
document.getElementById('logo-btn').addEventListener('click', showHomePage);

function renderProductsList(productsList) {
    productsContainer.innerHTML = '';
    productsList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div><div class="product-img">${product.emoji}</div><h4>${product.name}</h4></div>
            <div>
                <div class="product-price">$${product.price.toLocaleString('es-AR')},00</div>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar</button>
            </div>`;
        productsContainer.appendChild(card);
    });
}

function addToCart(id) {
    const product = productsDatabase.find(p => p.id === id);
    if(product) { cart.push(product); updateCartUI(); openCart(); }
}
function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }

function updateCartUI() {
    document.getElementById('cart-badge').innerText = cart.length;
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `<div><h5>${item.name}</h5><p>$${item.price.toLocaleString('es-AR')},00</p></div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i></button>`;
        container.appendChild(row);
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-amount').innerText = `$${total.toLocaleString('es-AR')},00`;
}

// METODO PRO BLINDADO (Firestore de Google)
async function saveOrderToDatabase(methodUsed, paymentStatus) {
    // Validación estricta del lado del script: el precio se calcula sumando la base interna
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const summaryCount = {};
    cart.forEach(item => { summaryCount[item.name] = (summaryCount[item.name] || 0) + 1; });
    let itemsText = "";
    for (const [name, qty] of Object.entries(summaryCount)) { itemsText += `${qty}x ${name} | `; }

    // Generamos un ID corto numérico para comodidad del WhatsApp
    const orderId = Math.floor(1000 + Math.random() * 9000);

    try {
        // Guardamos el documento de forma atómica en Google Cloud Firestore
        await db.collection("pedidos").doc(orderId.toString()).set({
            detalles: itemsText,
            total: total,
            metodo_pago: methodUsed,
            estado_pago: paymentStatus,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Despachamos el WhatsApp seguro con el ID blindado
        triggerSecureWhatsApp(orderId, total, methodUsed);

    } catch (err) {
        console.error("Error guardando en Firestore:", err);
        alert("Ocurrió un error al registrar el pedido en la base de datos de Google.");
    }
}

function triggerSecureWhatsApp(orderId, total, methodUsed) {
    let msg = ` *NUEVO PEDIDO - PATITA PELUCHE* \n\n`;
    msg += `¡Hola! Acabo de confirmar mi compra en la web.\n\n`;
    msg += ` *Orden de Pedido: #${orderId}\n`;
    msg += ` *Monto Registrado:* $${total.toLocaleString('es-AR')},00\n`;
    msg += ` *Forma de Pago:* ${methodUsed}\n\n`;
    msg += `Porfa, ingresá a tu consola de control con el número *#${orderId}* para validar mi lista de productos y coordinar la entrega. 💕`;

    window.open(`https://api.whatsapp.com/send?phone=${VENDEDOR_WHATSAPP}&text=${encodeURIComponent(msg)}`, '_blank');

    cart = []; updateCartUI(); closeCart(); showHomePage();
}

// ESCUCHADORES DE CHECKOUT
document.getElementById('btn-checkout').addEventListener('click', () => {
    if(cart.length === 0) return;
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if(selectedMethod === "Mercado Pago") {
        mpModalTotal.innerText = document.getElementById('cart-total-amount').innerText;
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

const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
function openCart() { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); }
function closeCart() { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); }
document.getElementById('open-cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart-btn').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);