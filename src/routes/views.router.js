import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    style: "home.css",
  });
});

router.get("/products", (req, res) => {
  res.render("products");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});
