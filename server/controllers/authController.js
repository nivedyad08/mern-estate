import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  console.log(34567890);
  const { username, email, password } = req.body;
  console.log(req.body);
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json("User created successfully !!");
  } catch (error) {
    next(error);
  }
};

export { signup };
