const products = [
    { id: 1, name: "Noise Cancelling Headphones", price: 299, category: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 2, name: "Ultra Smart Watch", price: 199, category: "Wearables", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 3, name: "Portable Speaker", price: 89, category: "Audio", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTArayFXVlyETLZ78bEkY3uMhcpVgSQxqi-HkJU481Bz8D2DEqXp63CzIVHu-9ar6PDHAN8kvjD6pP2VO0p1ua_286oOVTiKD1Uyip_DV55U1oae8qzKtzsh_gk" },
    { id: 4, name: "Mechanical Keyboard", price: 129, category: "Computing", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300" },
    { id: 5, name: "Gaming Mouse", price: 59, category: "Computing", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTSk4ZhcyffL0qGD0Mfc3yXsB_aAV15yPp1ieewf5Yfz_GZkkFxE849SeaYFKAFLpeLUVAQ33jmrZmqlrlMJBzU3p8HjtDoySLDsMqV9KX-cuEO-7fVwvWs4Q" }
];

let cart = JSON.parse(localStorage.getItem('NEX_CART')) || [];

// Render Product Cards
function renderProducts(items = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <small>${p.category}</small>
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Search & Filter
function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cat = document.getElementById('category-filter').value;
    
    const filtered = products.filter(p => {
        return (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(query);
    });
    renderProducts(filtered);
}

// Cart Actions
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        const p = products.find(p => p.id === id);
        cart.push({ ...p, qty: 1 });
    }
    updateUI();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    item.qty += change;
    if (item.qty < 1) cart = cart.filter(i => i.id !== id);
    updateUI();
}

function updateUI() {
    localStorage.setItem('NEX_CART', JSON.stringify(cart));
    const cartList = document.getElementById('cart-items');
    
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                $${item.price} x ${item.qty}
            </div>
            <div class="quantity-controls">
                <button onclick="updateQty(${item.id}, -1)">-</button>
                <button onclick="updateQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('cart-hidden');
}

function checkout() {
    if(cart.length === 0) return alert("Cart is empty!");
    alert("🚀 Order Placed successfully!");
    cart = [];
    updateUI();
    toggleCart();
}

// Start
renderProducts();
updateUI();