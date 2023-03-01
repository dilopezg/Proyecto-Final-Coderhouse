import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import ProdRoute from "./routes/Producto.route.js";
import CarRoute from "./routes/Carrito.route.js";
import User from "./routes/User.route.js";
import Info from "./routes/Info.route.js";

const app = express();

app.set("port", process.env.PORT || 5001);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//solo test
// app.use(express.static("./src/public"));

//solo para testear chat
// app.get("/", (req, res) => {
//   res.sendFile("index.html");
// });

//test route
app.get("/", (req, res) => {
  res.send("<h1>🆗 OK 🆗</h1>");
});

app.use("/api/productos", ProdRoute);
app.use("/api/carrito", CarRoute);
app.use("/api/user", User);
app.use("/api/info", Info);

export default app;
