import express from "express";
import authRoute from "./routes/authRoute";
import movieRoute from "./routes/movieRoute"
import tvRoute from "./routes/tvRoute"
import { ENV_VARS } from "./config/envVars";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middlewares/protectRoute";
import searchRoute from "./routes/searchRoute";
import path from "path";

const app = express()
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);
if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../../frontend/dist")))
  app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"../../frontend/dist","index.html"))
  })
}


app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on PORT:"+PORT)
})