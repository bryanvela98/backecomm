import mongoose from "mongoose";
import ProductModel from "./models/product.model.js";
import { config } from "./config/config.js";

// MongoDB connection string - replace with your actual connection string

const products = [
  {
    title: "iPhone 14 Pro",
    description: "Latest Apple smartphone with A16 Bionic chip",
    code: "APL001",
    price: 999.99,
    stock: 50,
    status: true,
  },
  {
    title: "Samsung Galaxy S23",
    description: "Premium Android smartphone with Snapdragon 8 Gen 2",
    code: "SAM001",
    price: 899.99,
    stock: 45,
    status: true,
  },
  {
    title: "MacBook Pro 16",
    description: "Professional laptop with M2 Pro chip",
    code: "APL002",
    price: 2499.99,
    stock: 25,
    status: true,
  },
  {
    title: "Sony WH-1000XM4",
    description: "Premium noise-cancelling headphones",
    code: "SNY001",
    price: 349.99,
    stock: 30,
    status: true,
  },
  {
    title: "iPad Air",
    description: "Versatile tablet with M1 chip",
    code: "APL003",
    price: 599.99,
    stock: 35,
    status: true,
  },
  {
    title: "Dell XPS 15",
    description: "High-performance Windows laptop",
    code: "DEL001",
    price: 1799.99,
    stock: 20,
    status: true,
  },
  {
    title: "Nintendo Switch OLED",
    description: "Gaming console with enhanced display",
    code: "NIN001",
    price: 349.99,
    stock: 40,
    status: true,
  },
  {
    title: 'LG C2 OLED TV 65"',
    description: "Premium 4K OLED TV",
    code: "LG001",
    price: 1999.99,
    stock: 15,
    status: true,
  },
  {
    title: "Canon EOS R6",
    description: "Professional mirrorless camera",
    code: "CAN001",
    price: 2499.99,
    stock: 10,
    status: true,
  },
  {
    title: "PlayStation 5",
    description: "Next-gen gaming console",
    code: "SNY002",
    price: 499.99,
    stock: 25,
    status: true,
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.URL_MONGODB);
    console.log("Connected to MongoDB");

    // Delete existing products
    await ProductModel.deleteMany({});
    console.log("Existing products deleted");

    // Insert new products
    const insertedProducts = await ProductModel.insertMany(products);
    console.log("Products seeded successfully:", insertedProducts);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
