import mongoose from "mongoose";

const tokenSchema=mongoose.Schema({
    toekn: {
        type: String,
        required: true
    }
})

const token=mongoose.model('token',tokenSchema);

export default token;