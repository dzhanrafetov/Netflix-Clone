import mongoose from "mongoose";
import { ENV_VARS } from "./envVars";

export const connectDB = async () => {
  try {
     await mongoose.connect(ENV_VARS.MONGO_URI as string)

    console.log("Mongo DB connected")
  }
  catch (error) {
    console.log(error)
    process.exit(1)

  }
}