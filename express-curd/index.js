import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import UserRouters from "./routes/UserRoutes.js"

const app = express();
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8001;

//route
app.use("/api", UserRouters);

//image upload
app.use("/uploadImages", express.static("uploadImages"));

//start server
app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
})