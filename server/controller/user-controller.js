//will contain all the user api

import User from "../model/user.js";
//request will contain all the info entered by user in front-end
//response is used to send the info from backend to frontend
export const signupUser= async (request,response)=>{
    try{
        const user=request.body;

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