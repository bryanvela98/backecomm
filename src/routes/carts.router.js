import { Router } from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const router = Router();

// Create a new cart
router.post("/", async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// Get cart with populated products
router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Add a product to the cart
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === req.params.pid
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: req.params.pid,
        quantity: 1,
      });
    }

    const updatedCart = await cart.save();
    await updatedCart.populate("products.product");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

// Delete specific product from cart
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== req.params.pid
    );

    const updatedCart = await cart.save();
    await updatedCart.populate("products.product");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
});

// Update entire cart with new products array
router.put("/:cid", async (req, res) => {
  try {
    const { products } = req.body;

    // Validate products array format
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ error: "El formato de productos es inválido" });
    }

    // Verify all products exist and format is correct
    for (let item of products) {
      if (!item.product || !item.quantity || item.quantity < 0) {
        return res.status(400).json({
          error: "Formato inválido de producto o cantidad",
        });
      }

      const productExists = await Product.findById(item.product);
      if (!productExists) {
        return res.status(404).json({
          error: `Producto ${item.product} no encontrado`,
        });
      }
    }

    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = products;
    const updatedCart = await cart.save();
    await updatedCart.populate("products.product");

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el carrito",
      details: error.message,
    });
  }
});

// Update product quantity in cart
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 0) {
      return res.status(400).json({ error: "Cantidad inválida" });
    }

    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === req.params.pid
    );

    if (productIndex === -1) {
      return res.status(404).json({
        error: "Producto no encontrado en el carrito",
      });
    }

    cart.products[productIndex].quantity = quantity;
    const updatedCart = await cart.save();
    await updatedCart.populate("products.product");

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la cantidad del producto",
    });
  }
});

// Empty cart (delete all products)
router.delete("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = [];
    const updatedCart = await cart.save();
    res.json({
      message: "Carrito vaciado con éxito",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
});

export default router;
