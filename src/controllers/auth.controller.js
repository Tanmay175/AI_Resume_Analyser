import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import blacklistModel from "../models/blacklist.model.js";

import dotenv from 'dotenv'
dotenv.config()

async function registerUserController(req,res){
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const isUserAlreadyExist= await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExist){
        return res.status(404).json({
            message:"Account already existed with this email or username"
        })
    }

    const hash= await bcrypt.hash(password,10)
    const user= await userModel.create({
        username,email,password:hash
    })

    const token=jwt.sign(
        {
            id:user._id, username:user.username
        },
        process.env.jwt_secret,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user created successfully",
        user:{
            id:user._id,
            usernameee:user.username,
            email:user.email
        }
    })



}

async function loginUserController(req,res){
    const{email, password}=req.body;

    const user= await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"Account not found"
        })
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(404).json({
            message:"Invalid Credentials"
        })
    }

    const token=jwt.sign(
        {
            id:user._id, username:user.username
        },
        process.env.jwt_secret,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"Login successful",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

async function logoutUserController(req,res){
    const token=req.cookies.token;
    if (token){
        await blacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"Logout successful"
    })
}

async function getMeController(req,res){
    const userId=req.user.id;
    const user= await userModel.findById(userId).select("-password")

    res.status(200).json({
        message:"User found",
        user
    })
}

export  default {registerUserController, loginUserController, logoutUserController, getMeController}