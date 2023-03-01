//npm i mongoose 
//using for the database connectivity
import mongoose from "mongoose"



const Connection= async (USERNAME,PASSWORD)=>{
    //this is the mongoDB cluster url , containing the cluster username and password for the connection
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@blog-application.qzrrhso.mongodb.net/?retryWrites=true&w=majority`;

    //since its async function so we have to use try , catch block 
    try{
        //connect() is a async function thats why we have used async above
        await mongoose.connect(URL,{ useNewUrlParser : true});
        console.log("Database connected successfully");
    }catch(error){
        console.log("error while connecting with the database ", error);
    }
}

export default Connection;