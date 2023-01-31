import express from "express";
import { productosRouter } from "./routers/productosRouter.js";
import { carritosRouter } from "./routers/carritosRouter.js";
import morgan from "morgan";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);


app.use("/productos", (req, res) => {
    res.render("productos");
});
app.use("/carritos", (req, res) => {
    res.render("carritos");
});
app.get("*", (req, res) => {
    res.render("home");
});

export default app;