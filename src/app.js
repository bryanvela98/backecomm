import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config.js";

// Importing routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* //Config handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars"); */

/* //Load public folder as static files foldes
app.use(express.static(__dirname + "/public")); */

//Connect to MongoDB
mongoose
  .connect(config.URL_MONGODB)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process with failure
  });

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

// Load routers
/* app.use("/", viewsRouter); // Views router */
app.use("/products", productsRouter); // Products router
app.use("/carts", cartsRouter); // Carts router
