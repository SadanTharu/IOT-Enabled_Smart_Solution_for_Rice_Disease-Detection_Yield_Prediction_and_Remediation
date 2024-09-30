import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import diseaseRouter from './routes/diseaseRouter.js';
import predictionRouter from './routes/predictionRouter.js';
import diseaseRouterforRemedy from "./routes/contactRemedyRouter.js";

//app configations
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
//matheesha
app.use("/api/disease",diseaseRouter)
app.use("/images",express.static('uploads'))

app.use("/api/contactRemedy",diseaseRouterforRemedy)

//sadan
app.use("/api/prediction",predictionRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})