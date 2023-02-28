import mongoose from "mongoose"





const Connection= async ()=>{
    const URL=`mongodb+srv://gopalgupta2804:Hellounclesam%4025@blog-application.qzrrhso.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{ useNewUrlParser : true});
        console.log("Database connected successfully");
    }catch(error){
        console.log("error while connecting with the database ", error);
    }
}

export default Connection;