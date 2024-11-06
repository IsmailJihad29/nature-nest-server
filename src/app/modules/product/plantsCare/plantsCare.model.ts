// src/models/plantsCare.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface TPlantCare extends Document {
  category: string;
  shortTips: string[];
  careDetails: string[];
}

const PlantCareSchema: Schema = new Schema({
  category: { type: String, required: true, unique: true },
  shortTips: { type: [String], required: true },
  careDetails: { type: [String], required: true },
});

const PlantCare = mongoose.model<TPlantCare>('PlantCare', PlantCareSchema);

export default PlantCare;
