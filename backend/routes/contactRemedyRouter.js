import express from 'express';
import { addDiseaseForRemedyMng,getAllmessages , deleteMessage} from '../controllers/contactRemedyController.js';
import multer from 'multer';

const diseaseRouterforRemedy = express.Router();

//image storege engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage:storage})


diseaseRouterforRemedy.post("/addDataForRemedy",upload.single("image") ,addDiseaseForRemedyMng);
diseaseRouterforRemedy.get('/messages', getAllmessages);
diseaseRouterforRemedy.delete('/messages/:id', deleteMessage);


export default diseaseRouterforRemedy