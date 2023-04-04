const express = require("express");
const {UserModel} = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")
require("dotenv").config();
const userRouter = express.Router();

userRouter.get("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try{
        bcrypt.hash(password,5, async(err,sec_pass)=>{
            if(err){
                console.log(err)
            } else {
                const user = new UserModel({name,email,password: sec_pass})
                await user.save()
                res.send({"msg":"User Has benn Registered Successfully"})
            }
        })
    } catch(err){
        res.send({"msg": "Error when registering"});
        console.log(err);
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        const hash_pass = user[0].password
        if(user.length>0){
            bcrypt.compare(password,hash_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID: user[0]._id},process.env.key);
                    res.send(({"msg":"Login Successfull","Token": token}))
                } else {
                    res.send({"msg": "Wrong Credentials"});
                }
            })
        } else {
            res.send({"msg": "Wrong Credentials"});
        }
    } catch(err){
        res.send({"msg": "Something whent Wrong while Login "});
        console.log(err);
    }
})

module.exports={
    userRouter
}