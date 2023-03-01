//npm i express
//express is used to establish the server 
import express from 'express';

//Importing our database file here
import Connection from './database/db.js';

const app=express();

//specifying the port number for our backend url
const PORT=9000;

//will listen to this port number and if the connection is establised then the console.log will be displayed
app.listen(PORT,()=>console.log(`server is running successfully on PORT ${PORT}`));

//calling the Connection() function
Connection();
