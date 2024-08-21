import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "ALl fields are required !!" });
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json("User created successfully !!");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }).lean();
    if (!validUser) return next(errorHandler(404, "User not found"));
    // const validPassword = bcrypt.compareSync(password, validUser.password);
    if (password != validUser.password)
      return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const newUser = new User({
        username: name
          .split(" ")
          .join("".toLocaleLowerCase() + Math.random().toString(36).slice(-4)),
        email: email,
        password: generatedPassword,
        avatar: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const newUserObj = newUser.toObject();
      const { password: pass, ...rest } = newUserObj;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export { signup, signin, google, signOut };
