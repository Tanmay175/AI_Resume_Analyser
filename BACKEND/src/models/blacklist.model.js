import mongoose from "mongoose";

const blacklistSchema= new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"]
    } 
},{timestamp:true})

const blacklistModel= mongoose.model("blacklistToken",blacklistSchema)

export default blacklistModel