import  express from "express";
import colors from "colors"
import 'dotenv/config'
import "./config/dbConnect.js"
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js"

const app = express();
const PORT = process.env.PORT || 3040;


app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

 
app.get("/", (req, res)=>{
    res.status(200).json({msg:"Welcome to eCommerce app"})
})


app.listen(PORT , ()=>{
    console.log(`server is runing  on port ${PORT} `.bgMagenta.white)
})
