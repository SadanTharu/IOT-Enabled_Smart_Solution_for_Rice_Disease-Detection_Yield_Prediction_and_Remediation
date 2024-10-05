import express from "express";
import { addDiseaseInquiry, listDiseaseInquiry, removeDiseaseInquiry, updateInquiry } from "../controllers/awa_InquiryController.js";
import multer from "multer";

const diseaseRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);  // Fixed filename formatting
    }
});

const upload = multer({ storage: storage });

// Routes
diseaseRouter.post("/add", upload.single("images"), addDiseaseInquiry);
diseaseRouter.get("/list", listDiseaseInquiry);
diseaseRouter.post("/remove", removeDiseaseInquiry);
diseaseRouter.put("/update/:id", upload.single("images"), updateInquiry);

export default diseaseRouter;
