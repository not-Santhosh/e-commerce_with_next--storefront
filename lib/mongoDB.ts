import mongoose from "mongoose";

let isConnected:boolean = false;

export const connectToDB = async(): Promise<void> => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoDB is connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "" ,{
            dbName: "Gofor_it_ecomm_store"
        })
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);        
    }
}