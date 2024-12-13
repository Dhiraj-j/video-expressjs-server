import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("MONOGO DB CONNECTED", connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongo db connection failed : ", error);
    process.exit(1);
  }
};

export default connectDB;
