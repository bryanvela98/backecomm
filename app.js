import __dirname from "./src/utils/utils.js";
import handlebars from "express-handlebars";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";

//Loading env var

dotenv.config();
const urlMongo = process.env.MONGO_URL;
const port = process.env.PORT;

// Importing routers
import productsRouter from "./src/routes/products.js";
import cartsRouter from "./src/routes/carts.js";

const app = express();
const httpserver = app.listen(port, () => {
  console.log( "Server is running on PORT: " + port);
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
