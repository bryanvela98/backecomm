import { Router } from "express";
import ProductModel from "../models/product.model.js"; // You'll need to create this model

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const { products, pagination } = await ProductModel.getPaginatedProducts({
      limit,
      page,
      sort,
      query,
    });

    // Build links based on current query parameters
    const baseUrl = "/products?";
    const queryString = new URLSearchParams({
      limit: limit || 10,
      ...(sort && { sort }),
      ...(query && { query }),
    });

    const response = {
      status: "success",
      payload: products,
      ...pagination,
      prevLink: pagination.hasPrevPage
        ? `${baseUrl}${queryString}&page=${pagination.prevPage}`
        : null,
      nextLink: pagination.hasNextPage
        ? `${baseUrl}${queryString}&page=${pagination.nextPage}`
        : null,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Error al obtener productos",
      details: error.message,
    });
  }
});

// Get a product by ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Add new product
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock } = req.body;

    if (!title || !description || !code || !price || !stock) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios excepto thumbnails",
      });
    }

    const newProduct = new ProductModel({
      title,
      description,
      code,
      price,
      status: true,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// Update Product
router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body },
      { new: true } // This option returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Delete product by ID
router.delete("/:pid", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.pid);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;
