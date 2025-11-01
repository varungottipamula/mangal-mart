// ===================================================
// 🛍️ Mangal Mart Unified Script (FINAL UPDATED)
// ===================================================

// -------------------------------
// ✅ CART INITIALIZATION
// -------------------------------
let cart = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(cart)) cart = [];


// -------------------------------
// ✅ LOAD PRODUCTS (Admin + Default)
// -------------------------------
const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

const defaultProducts = [
  // Thali
  { name: "Classic Brass Pooja Thali", price: 2100, category: "thali", img: "images/pooja-thali1.jpg" },
  { name: "Silver Plated Pooja Thali", price: 1499, category: "thali", img: "images/pooja-thali2.jpg" },
  { name: "Copper Pooja Thali", price: 550, category: "thali", img: "images/pooja-thali3.jpg" },
  { name: "Lotus Design Brass Thali", price: 1699, category: "thali", img: "images/pooja-thali4.jpg" },

  // Idols
  { name: "Lord Ganesha Brass Idol", price: 1299, category: "idol", img: "images/brass-ganesha.jpg" },
  { name: "Goddess Lakshmi Idol (Brass)", price: 1099, category: "idol", img: "images/brass-lakshmi.jpg" },
  { name: "Lord Vishnu Brass Idol", price: 1499, category: "idol", img: "images/brass-vishnu.jpg" },
  { name: "Lord Shiva Brass Idol", price: 999, category: "idol", img: "images/brass-shiva.jpg" },

  // Diyas
  { name: "Brass Akhand Diya", price: 599, category: "diya", img: "images/brass-diya1.jpg" },
  { name: "Peacock Brass Diya", price: 799, category: "diya", img: "images/brass-diya2.jpg" },
  { name: "Hanging Brass Diya (Chain)", price: 899, category: "diya", img: "images/brass-diya3.jpg" },

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
  { name: "Brass Kalash with Coconut Lid", price: 899, category: "kalash", img: "images/kalash2.jpg" },
  { name: "Silver Decorative Kalash", price: 1299, category: "kalash", img: "images/kalash3.jpg" },

  // Essentials
  { name: "Pure Cow Ghee (250ml)", price: 299, category: "essentials", img: "images/ghee.jpg" },
  { name: "Cotton Wicks (Pack of 100)", price: 99, category: "essentials", img: "images/wicks.jpg" },
  { name: "Loose Cotton (100g)", price: 120, category: "essentials", img: "images/loose-cotton.jpg" },
  { name: "Pure Pooja Oil (500ml)", price: 180, category: "essentials", img: "images/pooja-oil.jpg" },
  { name: "Camphor Tablets (100g)", price: 150, category: "essentials", img: "images/camphor.jpg" },
  { name: "Roli & Chawal Set", price: 79, category: "essentials", img: "images/roli-chawal.jpg" },
  { name: "Temple Long Match Box", price: 49, category: "essentials", img: "images/matchbox.jpg" },

  // Books
  { name: "Bhagavad Gita", price: 499, category: "books", img: "images/book1.jpg" },
  { name: "Hanuman Chalisa", price: 199, category: "books", img: "images/book2.jpg" },
  { name: "Shri Ramcharitmanas", price: 799, category: "books", img: "images/book3.jpg" },
];

// ✅ Load Default Products ONLY if not loaded before
if (!localStorage.getItem("defaultsLoaded")) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
  localStorage.setItem("defaultsLoaded", "yes");
}

// ✅ Always get final product list
let products = JSON.parse(localStorage.getItem("products")) || [];

// -------------------------------
// ✅ Render Products Helper
// -------------------------------
function renderProducts(containerId, list = products) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = list.length
    ? list.map(
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
        </div>`
      ).join("")
    : `<p>No products available</p>`;
}

// ✅ Home Featured Products
if (document.getElementById("featured-products")) {
  renderProducts("featured-products", products.slice(0, 4));
}

// ✅ Products Page
if (document.getElementById("product-list")) {
  renderProducts("product-list");
}


// -------------------------------
// ✅ Filter + Sort (Products Page)
// -------------------------------
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

function updateProductList() {
  let list = [...products];

  if (filterSelect?.value !== "all")
    list = list.filter(p => p.category === filterSelect.value);

  if (sortSelect?.value === "low-high") list.sort((a, b) => a.price - b.price);
  if (sortSelect?.value === "high-low") list.sort((a, b) => b.price - a.price);

  renderProducts("product-list", list);
}

filterSelect?.addEventListener("change", updateProductList);
sortSelect?.addEventListener("change", updateProductList);


// -------------------------------
// ✅ Add to Cart
// -------------------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const { name, price, img } = e.target.dataset;

    const existing = cart.find((x) => x.name === name);
    if (existing) existing.quantity++;
    else cart.push({ name, price: +price, img, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("hamburger");
  const nav = document.getElementById("nav-menu");

  burger?.addEventListener("click", (e) => {
    e.preventDefault(); // ✅ stop page jump on mobile
    burger.classList.toggle("active");
    nav.classList.toggle("show");
  });
});
