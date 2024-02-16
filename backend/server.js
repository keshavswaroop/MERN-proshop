import express from "express";

import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "../backend/routes/productRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import orderRoutes from "../backend/routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT;

connectDB(); //connecting to the database

const app = express(); //initialize express

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //thses are done so that the data in the request are converted to json and are readable.

// Cookie parser middleware
app.use(cookieParser()); //access req.cookies

app.get("/", (req, res) => res.send(`API is running on port : ${port}`));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port : ${port}`)); //start server
