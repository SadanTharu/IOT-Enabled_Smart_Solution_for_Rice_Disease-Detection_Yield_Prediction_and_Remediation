import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import diseaseRouter from "./routes/awa_diseaseRoute.js"

//app configations
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

// api endpoints
app.use("/api/diseaseInquiry", diseaseRouter);
app.use("/images",express.static('uploads'));

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})