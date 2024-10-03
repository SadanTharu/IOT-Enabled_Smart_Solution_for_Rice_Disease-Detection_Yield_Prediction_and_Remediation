import { response } from "express";
import diseaseInquiryModel from "../models/awa_DiseaseInquiryModels.js";
import fs from 'fs'
import { log } from "console";
import multer from 'multer';


// add Disease inquires

const addDiseaseInquiry = async (req,res) => {
    let image_filename = req.file ? req.file.filename : null;

    const disease = new diseaseInquiryModel({
        farmerName: req.body.farmerName,
        email: req.body.email,
        phone: req.body.phone,
        inquiryDate: req.body.inquiryDate,
        inquiryTopic: req.body.inquiryTopic,
        symptoms: req.body.symptoms,
        area: req.body.area,
        location: req.body.location,
        images: image_filename,
        priorityLevel: req.body.priorityLevel
        
    })

    try{
        await disease.save();
        res.json({success:true,message: "Disease Inquiry Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message: "Error"})
    }

}



// All disease inquiry list

const listDiseaseInquiry = async(req,res)  => {
    try{
        const diseaseInquiry = await diseaseInquiryModel.find({});
        res.json({success:true,data:diseaseInquiry})
    } catch (error){
        console.log(error);
        res.json({success:false,message: "Error"})
    }
}

// remove disease inquiry

const removeDiseaseInquiry = async(req,res) =>{
    try {
        const diseaseInquiry = await diseaseInquiryModel.findById(req.body.id);
        fs.unlink(`uploads/${diseaseInquiry.images}`, () => {})

        await diseaseInquiryModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Disease Inquiry removed"})
    } catch (error) {
        console.log (error);
        res.json({success:false,message:"Error"})
    }
}


// Update disease inquiry
const updateDiseaseInquiry = async (req, res) => {
    const { id } = req.params; // Get the id from request parameters
    console.log(`Updating inquiry with ID: ${id}`); // Log the ID

    try {
        const image_filename = req.file ? req.file.filename : req.body.images;

        const updatedData = {
            farmerName: req.body.farmerName,
            email: req.body.email,
            phone: req.body.phone,
            inquiryDate: req.body.inquiryDate,
            inquiryTopic: req.body.inquiryTopic,
            symptoms: req.body.symptoms,
            area: req.body.area,
            location: req.body.location,
            priorityLevel: req.body.priorityLevel,
            images: image_filename
        };

        const updatedInquiry = await diseaseInquiryModel.findByIdAndUpdate(id, updatedData, { new: true });
        
        // Check if the inquiry was found and updated
        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({ success: true, message: "Disease Inquiry updated", data: updatedInquiry });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating inquiry" });
    }
};



export {addDiseaseInquiry,listDiseaseInquiry,removeDiseaseInquiry,updateDiseaseInquiry};