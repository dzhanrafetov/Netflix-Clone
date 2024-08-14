import express from "express";
import authRoute from "./routes/authRoute";
import movieRoute from "./routes/movieRoute"
import tvRoute from "./routes/tvRoute"
import { ENV_VARS } from "./config/envVars";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute";
const app = express()
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);


const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running")
})
