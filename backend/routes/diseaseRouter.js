import express from 'express';
import { addDisease } from '../controllers/diseaseController.js';
import { diseaseList } from '../controllers/diseaseController.js';
import { removeDisease } from '../controllers/diseaseController.js';
import {getDiseasesWithoutRemedies } from '../controllers/diseaseController.js'
import{updateDisease} from '../controllers/diseaseController.js';

import multer from 'multer';

const diseaseRouter = express.Router();

//image storege engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage:storage})

diseaseRouter.post("/add",upload.single("image"),addDisease)
diseaseRouter.get("/list",diseaseList)
diseaseRouter.post("/remove",removeDisease)
diseaseRouter.get("/diseaseListWithoutRemedies",getDiseasesWithoutRemedies)
diseaseRouter.put("/update/:id", upload.single("image"), updateDisease);









export default diseaseRouter;
