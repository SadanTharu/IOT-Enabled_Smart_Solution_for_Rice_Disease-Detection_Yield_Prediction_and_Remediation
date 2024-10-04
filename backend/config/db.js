import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sadantharu:123@cluster0.wvv0poj.mongodb.net/IOT-App').then(()=>console.log("DB connected"));
}
