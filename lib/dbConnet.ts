import mongoose from "mongoose";

 export const dbConnect = async () => {
    try{
        await mongoose?.connect(process?.env?.MONGODB_URI!)
    }
     catch (error) {
        throw new Error ('Connection failed')
     }
}