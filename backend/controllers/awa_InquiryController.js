import { response } from "express";
import diseaseInquiryModel from "../models/awa_DiseaseInquiryModels.js";
import fs from 'fs'
import { log } from "console";


// add Disease inquires

const addDiseaseInquiry = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const disease = new diseaseInquiryModel({
        farmerName: req.body.farmerName,
        email: req.body.email,
        phone: req.body.phone,
        inquiryDate: req.body.inquiryDate,
        inquaryTopic: req.body.inquaryTopic,
        symptoms: req.body.symptoms,
        area: req.body.area,
        description: req.body.description,
        location: req.body.location,
        images: image_filename,
        priorityLevel: req.body.priorityLevel,
        status: req.body.status
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



export {addDiseaseInquiry,listDiseaseInquiry,removeDiseaseInquiry}