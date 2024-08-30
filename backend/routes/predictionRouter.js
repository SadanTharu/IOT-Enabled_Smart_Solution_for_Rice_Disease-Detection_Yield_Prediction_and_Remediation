import express from 'express';
import { addPrediction, predictionList, removePrediction } from '../controllers/predictionController.js';

const predictionRouter = express.Router();

predictionRouter.post("/add",addPrediction)
predictionRouter.get("/list",predictionList)
predictionRouter.post("/remove",removePrediction)

export default predictionRouter;
