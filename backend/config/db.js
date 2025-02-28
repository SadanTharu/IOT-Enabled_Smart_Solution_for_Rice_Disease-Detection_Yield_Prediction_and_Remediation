import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://Matheesha:Matheesha@cluster0.xqfraot.mongodb.net/")
    .then(() => console.log("DB connected"));
};
