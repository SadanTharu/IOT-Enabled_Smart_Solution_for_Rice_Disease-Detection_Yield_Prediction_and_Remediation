import express from "express";
import { addDiseaseInquiry, listDiseaseInquiry, removeDiseaseInquiry, updateDiseaseInquiry } from "../controllers/awa_InquiryController.js";
import multer from "multer";

const diseaseRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Define API endpoints
diseaseRouter.post("/add", upload.single("images"), addDiseaseInquiry);
diseaseRouter.get("/list", listDiseaseInquiry);
diseaseRouter.post("/remove", removeDiseaseInquiry);
diseaseRouter.put("/update/:id", upload.single("images"), updateDiseaseInquiry); // Update to include :id in the route

export default diseaseRouter;
