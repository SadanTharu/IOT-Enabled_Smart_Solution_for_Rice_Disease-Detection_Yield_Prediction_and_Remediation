import mongoose from "mongoose";

const remediationSchema = new mongoose.Schema({
    diseaseName: { type: String, required: true },
    symptoms: { type: String, required: true },
    steps: { type: String, required: true },
    materials: { type: String, required: true },
    youtubeTutorial: { type: String, required: true },
    notes: { type: String, required: true },
    image: { type: String, required: true },
});

const RemediationModel = mongoose.model('Remediation', remediationSchema);

export default RemediationModel;
