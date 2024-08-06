import express from "express";
import colors from "colors";
import "dotenv/config";
import "./config/dbConnect.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRotes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import razorpayRoutes from "./routes/rzpRoute.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRotes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", razorpayRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to eCommerce app" });
});

app.listen(PORT, () => {
  console.log(`server is runing  on port ${PORT} `.bgMagenta.white);
});
