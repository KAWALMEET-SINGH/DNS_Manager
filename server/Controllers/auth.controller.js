import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const passwordLock = bcryptjs.hashSync(password, 12);
  const newUser = new User({  email, password: passwordLock });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (e) {
    next(e);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invaild Password "));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pord, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async(req,res,next) =>{
  try {
    res.clearCookie("access_token");
    res.status(200).json({message:"Successfully Logged Out"})
  } catch (error) {
    next(error)
  }
}