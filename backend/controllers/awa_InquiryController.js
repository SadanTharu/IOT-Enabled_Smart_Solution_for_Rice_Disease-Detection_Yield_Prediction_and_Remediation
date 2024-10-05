import diseaseInquiryModel from "../models/awa_DiseaseInquiryModels.js";
import fs from 'fs';

// Add Disease Inquiry
const addDiseaseInquiry = async (req, res) => {
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
    });

    try {
        await disease.save();
        res.json({ success: true, message: "Disease Inquiry Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding inquiry" });  // Improved error handling
    }
};

// List all Disease Inquiries
const listDiseaseInquiry = async (req, res) => {
    try {
        const diseaseInquiry = await diseaseInquiryModel.find({});
        res.json({ success: true, data: diseaseInquiry });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching inquiries" });
    }
};

// Remove Disease Inquiry
const removeDiseaseInquiry = async (req, res) => {
    try {
        const diseaseInquiry = await diseaseInquiryModel.findById(req.body.id);
        
        if (diseaseInquiry.images) {
            fs.unlink(`uploads/${diseaseInquiry.images}`, (err) => {
                if (err) {
                    console.log(`Failed to delete image: ${err.message}`);
                }
            });
        }

        await diseaseInquiryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Disease Inquiry removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing inquiry" });
    }
};

const updateInquiry = async (req, res) => {
    try {
        const diseaseInquiry = await diseaseInquiryModel.findById(req.params.id);  // Fetch ID from URL params

        if (!diseaseInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        let image_filename = req.file ? req.file.filename : diseaseInquiry.images;

        // If a new image is uploaded, delete the old one
        if (req.file && diseaseInquiry.images) {
            fs.unlink(`uploads/${diseaseInquiry.images}`, (err) => {
                if (err) {
                    console.log(`Failed to delete old image: ${err.message}`);
                }
            });
        }

        diseaseInquiry.farmerName = req.body.farmerName || diseaseInquiry.farmerName;
        diseaseInquiry.email = req.body.email || diseaseInquiry.email;
        diseaseInquiry.phone = req.body.phone || diseaseInquiry.phone;
        diseaseInquiry.inquiryDate = req.body.inquiryDate || diseaseInquiry.inquiryDate;
        diseaseInquiry.inquiryTopic = req.body.inquiryTopic || diseaseInquiry.inquiryTopic;
        diseaseInquiry.symptoms = req.body.symptoms || diseaseInquiry.symptoms;
        diseaseInquiry.area = req.body.area || diseaseInquiry.area;
        diseaseInquiry.location = req.body.location || diseaseInquiry.location;
        diseaseInquiry.images = image_filename;
        diseaseInquiry.priorityLevel = req.body.priorityLevel || diseaseInquiry.priorityLevel;

        await diseaseInquiry.save();
        res.json({ success: true, message: "Inquiry updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating inquiry" });
    }
};

export { addDiseaseInquiry, listDiseaseInquiry, removeDiseaseInquiry, updateInquiry };
