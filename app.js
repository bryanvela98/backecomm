import __dirname from "./src/utils/utils.js";
import handlebars from "express-handlebars";
import express from "express";
import { Server } from "socket.io";

// Importing routers
import productsRouter from "./src/routes/products.js";
import cartsRouter from "./src/routes/carts.js";

const app = express();
const httpserver = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

//Creating socket server
const io = new Server(httpserver); // Socket.io server

//Config handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Load public folder as static files foldes
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/products", productsRouter); // Products router
app.use("/carts", cartsRouter); // Carts router
