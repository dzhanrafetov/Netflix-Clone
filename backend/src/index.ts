import express from "express";
import authRoute from "./routes/authRoute";
import movieRoute from "./routes/movieRoute"
import { ENV_VARS } from "./config/envVars";
import { connectDB } from "./config/db";


const app = express()
app.use(express.json());
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/movie",movieRoute);


const PORT= ENV_VARS.PORT;

app.listen(PORT, () => {
   connectDB();
  console.log("Server is running")
})
