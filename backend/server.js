import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'

import diseaseRouter from './routes/diseaseRouter.js';
import predictionRouter from './routes/predictionRouter.js';
import diseaseRouterforRemedy from "./routes/contactRemedyRouter.js";
import awa_diseaseRoute from "./routes/awa_diseaseRoute.js"
import remediationRouter from './routes/T_remediationRoute.js'
import userRouter from './routes/userRoute.js'

//app configations
const app = express()
const port = 4000

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/images", express.static('uploads'));

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
//matheesha
app.use("/api/disease",diseaseRouter)
app.use("/images",express.static('uploads'));
app.use("/api/contactRemedy",diseaseRouterforRemedy);
app.use("/api/diseaseInquiry", awa_diseaseRoute);

//sadan
app.use("/api/prediction",predictionRouter)
app.use('/api/user', userRouter)

//Thushan
app.use('/api/remediation', remediationRouter);

//Awandya
app.use("/api/diseaseInquiry", diseaseRouter);

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})