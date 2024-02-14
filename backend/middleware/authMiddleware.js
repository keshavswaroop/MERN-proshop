import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

//protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the jwt from cookie
  token = req.cookies.jwt; //jwt is as same as in userController.js res.cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JET_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    re.status(401);
    throw new Error("Not authorized, no tokens");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { admin };
