const express = require('express');
const fs = require('fs');
const path = require('path');


const router = express.Router();
const filePath = path.join(__dirname, '../data/carts.json');
const productsPath = path.join(__dirname, '../data/products.json');

const readCarts = () => {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeCarts = (carts) => {
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
};

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = { id: (carts.length + 1), products: [] };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

// Obtener los productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    cart ? res.json(cart.products) : res.status(404).json({ error: "Carrito no encontrado" });
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const productExists = products.find(p => p.id === req.params.pid);
    if (!productExists) return res.status(404).json({ error: "Producto no encontrado" });

    const productInCart = cart.products.find(p => p.product === req.params.pid);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    writeCarts(carts);
    res.json(cart);
});

module.exports = router;
