// -------------------------------
// 1️⃣ Initialize cart safely
// -------------------------------
let cart = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(cart)) cart = [];

// Optional: clear old cart when loading homepage/products
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("products.html")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------------
// 2️⃣ Product list
// -------------------------------
let products = [
  {name: "Brass Bell", price: 499, img: "images/brassbell.jpg"},
  {name: "Incense Sticks", price: 199, img: "images/incense.jpg"},
  {name: "Camphor Tablets (250g)", price: 150, img: "images/camphor.jpg"},
  {name: "Decorative Lamp", price: 299, img: "images/diya.jpg"}
];

// Save products for consistency
localStorage.setItem("products", JSON.stringify(products));

// -------------------------------
// 3️⃣ Render products on homepage or products page
// -------------------------------
function renderProducts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="btn add-to-cart" 
                data-name="${p.name}" 
                data-price="${p.price}" 
                data-img="${p.img}">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Call render
renderProducts("featured-products");
renderProducts("product-list");

// -------------------------------
// 4️⃣ Add to Cart functionality
// -------------------------------
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
        const name = e.target.dataset.name;
        const price = +e.target.dataset.price;
        const img = e.target.dataset.img;

        cart.push({ name, price, img });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    }
});

// -------------------------------
// 5️⃣ Hamburger toggle for mobile
// -------------------------------
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");
if (hamburger) {
    hamburger.onclick = () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("show");
    };
}

// Display featured products on home page
const product = JSON.parse(localStorage.getItem("products")) || [];
const featuredSection = document.getElementById("featured-products");

if (featuredSection && products.length > 0) {
  featuredSection.innerHTML = products
    .slice(0, 4)
    .map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn add-to-cart" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
      </div>
    `)
    .join("");
}
