import { error } from "console";
import diseaseModel from "../models/diseaseModel.js";
import fs from 'fs';
//add disease 
const addDisease = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const disease = new diseaseModel({
   

        diseaseName: req.body.diseaseName,
        symptoms: req.body.symptoms,
        severityLevel: req.body.severityLevel,
        category: req.body.category,
        image: image_filename,
        hasRemedy: false,

    })
    try{
        await disease.save();
        res.json({success:true,message:"disease added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//all disease lists
const diseaseList = async (req,res)=>{
    try{
        const disease = await diseaseModel.find({});
        res.json({success:true,data:disease})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove disease 
const removeDisease = async (req,res)=>{
    try{
        const disease = await diseaseModel.findById(req.body.id);
        fs.unlink(`uploads/${disease.image}`,()=>{})
        await diseaseModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"disease removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Fetch diseases without remedies
const getDiseasesWithoutRemedies = async (req, res) => {
    try {
      // Fetch all diseases with optional remedies population if necessary
      const diseases = await diseaseModel.find({}, 'diseaseName symptoms hasRemedy').exec(); // Fetch only diseaseName, symptoms, and hasRemedy fields
      
      // Filter diseases without remedies
      const diseasesWithoutRemedies = diseases.filter(disease => !disease.hasRemedy);
      
      res.status(200).json({ success: true, data: diseasesWithoutRemedies });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching diseases without remedies', error });
    }
  };
  

export {addDisease,diseaseList,removeDisease, getDiseasesWithoutRemedies }