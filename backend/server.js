import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

import path from 'path';
import { fileURLToPath } from 'url';

import diseaseRouter from './routes/diseaseRouter.js';
import predictionRouter from './routes/predictionRouter.js';
import remediationRouter from './routes/T_remediationRoute.js'

//app configations
const app = express()
const port = 4000

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
//matheesha
app.use("/api/disease",diseaseRouter)
app.use("/images",express.static('uploads'))

//sadan
app.use("/api/prediction",predictionRouter)

//Thushan
app.use('/api/remediation', remediationRouter);

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})