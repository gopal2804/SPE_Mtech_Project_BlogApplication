//npm i express
//express is used to establish the server 
import express from 'express';

//used to store the sensitive inofrmation(in .env file)
import dotenv from 'dotenv';

//Importing our database file here
import Connection from './database/db.js';

//Importing the Routers
import router from './routes/route.js';

//initializing dotenv
dotenv.config();

const app=express();

app.use('/',router);

//specifying the port number for our backend url
const PORT=8000;

//will listen to this port number and if the connection is establised then the console.log will be displayed
app.listen(PORT,()=>console.log(`server is running successfully on PORT ${PORT}`));

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


//calling the Connection() function
Connection(USERNAME,PASSWORD);
