// will contain all the routes , routes is a endpoint to the API 
// example : google.com/about (google.com is api and /about is end-point i.e route)
// so api will be same and end-points will be differnt 
//this file is only for routes

//express have Router() function which is used to create routes
import express from 'express';

import { signupUser } from '../controller/user-controller.js'; 

import { loginUser } from '../controller/user-controller.js';

const router=express.Router();

router.post('/signup',signupUser);

router.post('/login',loginUser);

export default router;