
import mongoose from "mongoose";
import colors from "colors"
// import 'dotenv/config'


async function dbConnect() {
    // console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongodb database ${mongoose.connection.host}`.bgCyan.red)
    }
    catch (error) {
        console.log(`Error in mongoDB ${error}`.bgRed.white)
    }
}
dbConnect()