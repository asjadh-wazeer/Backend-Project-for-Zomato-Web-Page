import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { UserModel } from "../../database/user";
const Router = express.Router();

//models
import { UserModel } from "../../database/user"

/*
Route      /signup
Descrip    Signup with email and password
Params     None
Access     Public
Method     POST
*/

Router.post("/signup",async(req,res)=>{
    try {
        const {email,password,fullname,phoneNumber}=req.body.credentials

        //check whether email or phone number exists
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail||checkUserByPhone) {
            return res.json({error: "Uer alredy exists"})
        }


        const bcryptSalt = await bcrypt.genSalt(8) //8 itarations //salting

        //we have to tell what is ur password,how to pass our password, what is the parameter
        const hashedPassword = await bcrypt.hash(password, bcryptSalt) //our pasword is hashed


        //inside our database(mongodb) we ill be creating database we will be storing certaing things inside that //& we pushed everything inside mongodb
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        }) 

        //JWT uth Token
        //create our token
        const token = jwt.sign({user:{fullname, email}}, "ZomatoApp") //what is the name of our application :ZomatoApp //username,email: you provide ur f.name & email for accessing JWT token

        return res.status(200).json({token}); //if chech status code is 200 or not, and respond with JSON format of your token

    } catch(error) {
        res.status(500).json({error: error.message})
    }
})

export default Router;