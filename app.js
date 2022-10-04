import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import "dotenv/config";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api", authRouter);

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
