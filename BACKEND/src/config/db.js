import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected")
    }
    catch(err){
        console.log(err);
    }
}

export default connectdb