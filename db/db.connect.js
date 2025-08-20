import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;

const initializeDB = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log("Error connecting to db", error));
};

export default initializeDB;
