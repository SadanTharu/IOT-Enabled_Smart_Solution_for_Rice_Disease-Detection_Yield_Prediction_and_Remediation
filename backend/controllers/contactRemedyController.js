import contactRemedyModel from "../models/contactRemedyManagementModel.js";
import fs from 'fs';

// Add data
const addDiseaseForRemedyMng = async (req, res) => {
    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file provided." });
    }

    const image_filename = `${req.file.filename}`;

    // Validate incoming data (implement your validation logic here)
    const { newDiseaseName, symptoms, severityLevel, category, recomendedTreatment } = req.body;
    if (!newDiseaseName || !symptoms || !severityLevel || !category || !recomendedTreatment) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const contactRemedy = new contactRemedyModel({
        newDiseaseName,
        symptoms,
        severityLevel,
        category,
        recomendedTreatment,
        image: image_filename,
    });

    try {
        await contactRemedy.save();
        res.json({ success: true, message: "Contact remedy data added." });
    } catch (error) {
        console.error("Error saving contact remedy data:", error);
        res.status(500).json({ success: false, message: "Error saving data to database." });
    }
};

// Get all messages
const getAllmessages = async (req, res) => {
    try {
        const remedies = await contactRemedyModel.find(); // Fetch all remedies from the database
        res.json(remedies); // Send the remedies data as JSON
    } catch (error) {
        console.error("Error fetching remedies:", error);
        res.status(500).json({ message: 'Error fetching remedies' });
    }
};

// Delete a message by ID
const deleteMessage = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        // Find and delete the message by its ID
        const deletedMessage = await contactRemedyModel.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        // Optionally, remove the associated image file from the server (if applicable)
        const imagePath = `./uploads/${deletedMessage.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            }
        });

        res.json({ success: true, message: "Message deleted successfully." });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ success: false, message: "Error deleting message." });
    }
};


export { addDiseaseForRemedyMng, getAllmessages, deleteMessage };
