import mongoose from 'mongoose';

const RemediationSchema = new mongoose.Schema({
    diseaseName: { type: String, required: true },
    symptoms: { type: String, required: true },
    steps: { type: String, required: true },
    materials: { type: String, required: true },
    youtubeTutorial: { type: String },
    notes: { type: String },
    image: { type: String }
}, { timestamps: true });  

const RemediationModel = mongoose.model('Remediation', RemediationSchema);

export default RemediationModel;
