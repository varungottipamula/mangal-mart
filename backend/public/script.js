// ===================================================
// 🛍️ Mangal Mart Unified Script
// ===================================================

// -------------------------------
// 1️⃣ Initialize cart safely
// -------------------------------
let cart = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(cart)) cart = [];

// Clear old cart only if desired (optional)
// if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("products.html")) {
//     cart = [];
//     localStorage.setItem("cart", JSON.stringify(cart));
// }

// -------------------------------
// 2️⃣ All Product Data (Shared)
// -------------------------------
const products = [
  // Thali
  { name: "Classic Brass Pooja Thali", price: 2100, category: "thali", img: "images/pooja-thali1.jpg" },
  { name: "Silver Plated Pooja Thali", price: 1499, category: "thali", img: "images/pooja-thali2.jpg" },
  { name: "Copper Pooja Thali", price: 550, category: "thali", img: "images/pooja-thali3.jpg" },
  { name: "Lotus Design Brass Thali", price: 1699, category: "thali", img: "images/pooja-thali4.jpg" },

  // Idols
  { name: "Lord Ganesha Brass Idol", price: 1299, category: "idol", img: "images/brass-ganesha.jpg" },
  { name: "Goddess Lakshmi Idol(Brass)", price: 1099, category: "idol", img: "images/brass-lakshmi.jpg" },
  { name: "Lord Vishnu Brass Idol", price: 1499, category: "idol", img: "images/brass-vishnu.jpg" },
  { name: "Lord Shiva Brass Idol", price: 999, category: "idol", img: "images/brass-shiva.jpg" },

  // Diyas
  { name: "Brass Akhand Diya", price: 599, category: "diya", img: "images/brass-diya1.jpg" },
  { name: "Peacock Brass Diya", price: 799, category: "diya", img: "images/brass-diya2.jpg" },
  { name: "Hanging Brass Diya(Chain)", price: 899, category: "diya", img: "images/brass-diya3.jpg" },

  // Incense
  { name: "Lavender Dhoop Cones", price: 249, category: "incense", img: "images/incense2.jpg" },
  { name: "Sandalwood Incense Sticks", price: 299, category: "incense", img: "images/incense1.jpg" },
  { name: "Wooden Incense Holder", price: 349, category: "incense", img: "images/incense3.jpg" },

  // Rudraksha
  { name: "5 Mukhi Rudraksha Mala", price: 799, category: "rudraksha", img: "images/rudraksha1.jpg" },
  { name: "1 Mukhi Rudraksha (Certified)", price: 2499, category: "rudraksha", img: "images/rudraksha2.jpg" },
  { name: "Natural Tulsi Mala", price: 499, category: "rudraksha", img: "images/rudraksha3.jpg" },

  // Kalash
  { name: "Pure Copper Kalash (Medium)", price: 699, category: "kalash", img: "images/kalash1.jpg" },
  { name: "Brass Pooja Kalash with Coconut Lid", price: 899, category: "kalash", img: "images/kalash2.jpg" },
  { name: "Silver Plated Decorative Kalash", price: 1299, category: "kalash", img: "images/kalash3.jpg" },

  // Essentials
  { name: "Pure Cow Ghee (250ml)", price: 299, category: "essentials", img: "images/ghee.jpg" },
  { name: "Cotton Wicks (Pack of 100)", price: 99, category: "essentials", img: "images/wicks.jpg" },
  { name: "Loose Cotton for Pooja (100g)", price: 120, category: "essentials", img: "images/loose-cotton.jpg" },
  { name: "Pure Pooja Oil (500ml)", price: 180, category: "essentials", img: "images/pooja-oil.jpg" },
  { name: "Camphor Tablets (100g)", price: 150, category: "essentials", img: "images/camphor.jpg" },
  { name: "Roli & Chawal Set", price: 79, category: "essentials", img: "images/roli-chawal.jpg" },
  { name: "Temple Match Box (Long Sticks)", price: 49, category: "essentials", img: "images/matchbox.jpg" },

  // Books
  { name: "Bhagavad Gita (Hardcover Edition)", price: 499, category: "books", img: "images/book1.jpg" },
  { name: "Hanuman Chalisa Pocket Edition", price: 199, category: "books", img: "images/book2.jpg" },
  { name: "Shri Ramcharitmanas (Hindi)", price: 799, category: "books", img: "images/book3.jpg" },
];

if (!localStorage.getItem("defaultProducts")) {
  localStorage.setItem("defaultProducts", JSON.stringify(products));
}


// -------------------------------
// 3️⃣ Render Products (Homepage / Products Page)
// -------------------------------
function renderProducts(containerId, list = products) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list
    .map(
      (p) => `
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
      `
    )
    .join("");
}

renderProducts("featured-products");
renderProducts("product-list");

// -------------------------------
// 4️⃣ Category Filter + Sort (for products.html)
// -------------------------------
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const productList = document.getElementById("product-list");

function updateProductList() {
  let filtered = [...products];

  // Filter
  const category = filterSelect?.value || "all";
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Sort
  const sort = sortSelect?.value || "default";
  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  renderProducts("product-list", filtered);
}

if (filterSelect && sortSelect) {
  filterSelect.addEventListener("change", updateProductList);
  sortSelect.addEventListener("change", updateProductList);
}

// -------------------------------
// 5️⃣ Add to Cart
// -------------------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.dataset.name;
    const price = +e.target.dataset.price;
    const img = e.target.dataset.img;

    const existing = cart.find((item) => item.name === name);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({ name, price, img, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  }
});

// -------------------------------
// 6️⃣ Mobile Hamburger Toggle
// -------------------------------
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");
if (hamburger && nav) {
  hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("show");
  };
}

// -------------------------------
// 7️⃣ Homepage Featured Limit (Optional)
// -------------------------------
const featuredSection = document.getElementById("featured-products");
if (featuredSection) {
  renderProducts("featured-products", products.slice(0, 4));
}

localStorage.removeItem("products");
