import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
  

    diseaseName: { type: String, required: true },  // Name of the disease (e.g., Rice Blast Disease)
    symptoms: { type: String, required: true },    // Description of symptoms caused by the disease
    severityLevel: { type: Number, required: true }, // Severity level of the disease (e.g., on a scale of 1-10)
    image: { type: String, required: true },        // Image of the disease symptoms
    category: { type: String, required: true },     // Category of the disease (e.g., fungal, bacterial)
  

})

const diseaseModel = mongoose.models.disease || mongoose.model("disease",diseaseSchema)
export default diseaseModel;