import express from "express";
import authRouter from "./routes/authRoute.js";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api", authRouter);

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
