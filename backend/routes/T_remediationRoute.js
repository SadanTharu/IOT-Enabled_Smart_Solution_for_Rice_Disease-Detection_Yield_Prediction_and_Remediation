import express from "express";
import multer from 'multer'; // Import multer for handling file uploads
import { addRemedy, getAllRemedies } from "../controllers/RemedyController.js"; 

const remediationRouter = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({ storage });

// Add a new remedy
remediationRouter.post("/", upload.single('image'), addRemedy); // Handle image upload

// Get all remedies
remediationRouter.get("/", getAllRemedies);

export default remediationRouter;
