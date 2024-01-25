import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import users from "./data/users";
import products from "./data/products";
import User from "../backend/models/userModel.js";
import Product from "../backend/models/productModel.js";
import Order from "../backend/models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //first we delete all the data in the collections i.e the models.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //we insert users data into User
    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id; // Here we get the details of the admin

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
  } catch (error) {}
};
