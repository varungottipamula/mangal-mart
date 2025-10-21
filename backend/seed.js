// seed.js
import connectDB from "./database.js";  // ✅ default import
import Product from "./models/productModel.js";

async function seed() {
  try {
    await connectDB();
    console.log("✅ Connected to DB");

    await Product.deleteMany({});
    console.log("🗑️ Old products deleted");

    const seedProducts = [
      { name: "Clay Diya (Set of 10)", price: 120, image: "diya.jpg", description: "Handmade traditional diyas for pooja and festivals." },
      { name: "Pure Incense Sticks (20 pcs)", price: 80, image: "incense.jpg", description: "Fragrant natural incense for meditation and pooja." },
      { name: "Rudraksha Mala", price: 350, image: "rudraksha.jpg", description: "Authentic rudraksha mala for devotion and meditation." },
      { name: "Brass Bell", price: 499, image: "bell.jpg", description: "High-quality brass bell for home temple." },
      { name: "Copper Kalash", price: 699, image: "kalash.jpg", description: "Traditional copper kalash for rituals." },
      { name: "Camphor Tablets (250g)", price: 150, image: "camphor.jpg", description: "Pure camphor for aarti and pooja." }
    ];

    const inserted = await Product.insertMany(seedProducts);
    console.log(`✅ Seed complete. Inserted ${inserted.length} products:`);
    inserted.forEach(p => console.log(`   - ${p.name} ($${p.price})`));

  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    process.exit(0);
  }
}

seed();
