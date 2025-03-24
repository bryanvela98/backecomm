import __dirname from "./src/utils/utils";

const express = require("express");
const app = express();
const productsRouter = require("./src/routes/products");
const cartsRouter = require("./src/routes/carts");

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/products", productsRouter); // Products router
app.use("/api/carts", cartsRouter); // Carts router

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
