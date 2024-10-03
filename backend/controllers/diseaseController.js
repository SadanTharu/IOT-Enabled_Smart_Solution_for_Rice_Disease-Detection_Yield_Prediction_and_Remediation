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

// Update disease
const updateDisease = async (req, res) => {
    const id = req.params.id;  // Get the ID from the URL
    const { diseaseName, category, severityLevel } = req.body;  // Destructure fields from the request body
    let image = req.file ? req.file.filename : req.body.image;  // Update the image if a new file is provided

    try {
        // Find the disease by ID and update the details
        const updatedDisease = await diseaseModel.findByIdAndUpdate(
            id,
            {
                diseaseName,
                category,
                severityLevel,
                image
            },
            { new: true }  // Return the updated document
        );

        if (!updatedDisease) {
            return res.status(404).json({ success: false, message: "Disease not found" });
        }

        // If successful, return the updated data
        res.json({ success: true, data: updatedDisease });
    } catch (error) {
        // Log the error and return a failure message
        console.log(error);
        res.json({ success: false, message: "Error updating disease" });
    }
};




export {addDisease,diseaseList,removeDisease,updateDisease}