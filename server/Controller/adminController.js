const express=require('express');
const User = require("../Models/userSchema.js");
const generateToken = require("../utils/jwtToken.js");
const cloudinary = require("cloudinary");
const bcrypt = require('bcryptjs');

const getallAdminDetails=async(req,res,next)=>{
    try{
        const admin=await User.find({role:"Admin"});
        res.status(200).json({
            success:true,
            admin
        })
    }catch(err){
        console.log(err);s
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

module.exports={getallAdminDetails}