import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv to load environment variables from .env file
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MOngoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
