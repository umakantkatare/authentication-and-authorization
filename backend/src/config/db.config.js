import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("url is not defined");
}

async function dbConnected() {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("db connected succesfull!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnected;
