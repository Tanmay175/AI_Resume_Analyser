import jwt from 'jsonwebtoken'
import blacklistModel from "../models/blacklist.model.js";

async   function authUser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    const isBlackListed=await blacklistModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({
            message:"Token is blacklisted"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.jwt_secret);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

export default {authUser}
