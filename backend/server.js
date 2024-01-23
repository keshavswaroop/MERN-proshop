import express from "express";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

connectDB(); //connecting to the database

const app = express(); //initialize express

app.get("/", (req, res) => res.send(`API is running on port : ${port}`));
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10); //convert it to int
  const prod = products.find((p) => p._id === productId);
  res.json(prod);
});

app.listen(port, () => console.log("Server is running")); //start server
