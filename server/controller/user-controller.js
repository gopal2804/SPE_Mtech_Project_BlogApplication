//will contain all the user api

//npm i bcrypt , used to enrypt the password before storing 
import bcrypt from 'bcrypt';
import { request, response } from 'express';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import Token from '../model/token.js';


import User from "../model/user.js";
//request will contain all the info entered by user in front-end
//response is used to send the info from backend to frontend
export const signupUser= async (request,response)=>{
    try{

        // const salt= await bcrypt.genSalt();
        // const hashedPassword= await bcrypt.hash(request.body.password,salt);

        const hashedPassword=await bcrypt.hash(request.body.password,10);

        const user={username : request.body.username , name: request.body.name , password: hashedPassword }

        //used to validate the info coming from the front-end
        const newUser=new User(user);

        //after validating the save() function of mongoDB will save the object in the database
        await newUser.save();

        //sending the signup successfull msg to front-end
        return response.status(200).json({msg: 'signup successfull'})
    }catch(error){
        return response.status(500).json({msg: 'error while signup the user'})
    }
}

export const loginUser=async (request,response)=>{
    let user= await User.findOne({username: request.body.username});
    if(!user){
        return response.status(400).json({msg: 'Username does not match'});
    }

    try{
        let match=await bcrypt.compare(request.body.password,user.password);
        if(match){
            //use of JWT authentication
            //npm i jasonwebtoken -> json web token library is used to implement jwt authenticaton
            //accessToken is generated with two things : body in json format + secret key
            //generating secret key by:
            //in terminal write node
            // > require('crypto').randomBytes(64).toString('hex')
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{ expiresIn: '15m'});
            //refreshToken is needed because accessToken is not permanent , it has a expiary time (you can keep expairy time but default it is 15mins)
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            //saving the refresh token in database
            const newToken=new Token({token:refreshToken});
            await newToken.save();

            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name:user.name, username:user.username });


        }else{
            response.status(400).json({msg: 'Password does not match'});
        }
    }catch(error){
        return response.status(500).json({msg: 'Error while loogin in user'});
    }
}