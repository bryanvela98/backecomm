const express = require('express');
const fs = require('fs');
const path = require('path');


const router = express.Router();
const filePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeProducts = (products) => {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

// Get all the products
router.get('/', (req, res) => {
    const products = readProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Get a product by ID
router.get('/:pid', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.pid));
    product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
});

// Add new product
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son obligatorios excepto thumbnails" });
    }

    const products = readProducts();
    const newProduct = {
        id: (products.length + 1),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// Update Product
router.put('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });

    const updatedProduct = { ...products[index], ...req.body, id: products[index].id };
    products[index] = updatedProduct;
    writeProducts(products);
    res.json(updatedProduct);
});

// Delete product by ID
router.delete('/:pid', (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id !== req.params.pid);
    writeProducts(products);
    res.json({ message: "Producto eliminado" });
});

module.exports = router;
