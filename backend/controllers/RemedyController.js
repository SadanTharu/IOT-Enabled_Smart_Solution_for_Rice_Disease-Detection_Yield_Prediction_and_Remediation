import RemediationModel from "../models/T_RemediationModel.js"; 
import path from 'path';
import fs from 'fs';

// Add a new remedy
const addRemedy = async (req, res) => {
    try {
        const { diseaseName, symptoms, steps, materials, youtubeTutorial, notes } = req.body;
        
        // Construct the full URL for the image
        const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : '';

        const remediation = new RemediationModel({
            diseaseName,
            symptoms,
            steps,
            materials,
            youtubeTutorial,
            notes,
            image: imageUrl, // Store the full image URL
        });

        await remediation.save();
        res.status(201).json(remediation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all remedies
const getAllRemedies = async (req, res) => {
    try {
        const remedies = await RemediationModel.find();
        res.status(200).json(remedies); // Send remedies with the image URLs
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export { addRemedy, getAllRemedies };
