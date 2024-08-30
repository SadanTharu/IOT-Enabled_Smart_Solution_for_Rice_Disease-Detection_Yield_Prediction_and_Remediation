import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({

    cropType: { type: String, required: true },
    location: { type: String, required: true },
    fieldSize: { type: Number, required: true },
    plantingDate: { type: Date, required: true },
    disease: { type: String},
    diseaseSpreadSize: { type: Number}
})

const predictionModel = mongoose.models.prediction || mongoose.model("prediction",predictionSchema)
export default predictionModel;