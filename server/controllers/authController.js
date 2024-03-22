import User from "../models/userModel.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json("User created successfully !!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { signup };