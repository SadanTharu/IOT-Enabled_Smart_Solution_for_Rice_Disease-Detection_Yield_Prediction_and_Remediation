import { error } from "console";
import predictionModel from "../models/predictionModel.js";

//add prediction data
const addPrediction = async (req,res)=>{

    const prediction = new predictionModel({
        cropType: req.body.cropType,
        location: req.body.location,
        fieldSize: req.body.fieldSize,
        plantingDate: req.body.plantingDate,
        disease: req.body.disease,
        diseaseSpreadSize: req.body.diseaseSpreadSize,

    })
    try{
        await prediction.save();
        res.json({success:true,message:"Prediction Data Added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//All prediction data lists
const predictionList = async (req,res)=>{
    try{
        const prediction = await predictionModel.find({});
        res.json({success:true,data:prediction})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove prediction data 
const removePrediction = async (req,res)=>{
    try{
        const prediction = await predictionModel.findById(req.body.id);
        await predictionModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"Prediction Removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



export {addPrediction , predictionList , removePrediction}