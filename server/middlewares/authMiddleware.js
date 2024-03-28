import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'
//protecred Routes token base

export const requireSignIn = async (req, res, next) => {
  try {
console.log( req.headers.authorization)
// const scKey = process
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode)

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
