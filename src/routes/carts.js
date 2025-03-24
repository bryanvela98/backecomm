import { Router } from "express";
const fs = require("fs");
const path = require("path");

const router = Router();
const filePath = path.join(__dirname, "../data/carts.json");
const productsPath = path.join(__dirname, "../data/products.json");

//Reading carts file
const readCarts = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeCarts = (carts) => {
  fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
};

// Obtain all carts
router.post("/", (req, res) => {
  const carts = readCarts();
  const newCart = { id: carts.length + 1, products: [] };
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

// Obtain cart products by ID
router.get("/:cid", (req, res) => {
  const carts = readCarts();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  cart
    ? res.json(cart.products)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

// Adding a product to the cart
router.post("/:cid/product/:pid", (req, res) => {
  const carts = readCarts();
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  const productExists = products.find((p) => p.id === req.params.pid);
  if (!productExists)
    return res.status(404).json({ error: "Producto no encontrado" });

  const productInCart = cart.products.find((p) => p.product === req.params.pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }

  writeCarts(carts);
  res.json(cart);
});

module.exports = router;
