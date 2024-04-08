import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.err("Error connecting to DB: ", err.message)
        process.exit(1);
    }
}