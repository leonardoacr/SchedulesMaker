import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema({
  stringEJS: { type: String, required: true },
  description: String
});

const collectionName = 'Appointments';
const HomeModel = mongoose.model(collectionName, HomeSchema);

export { HomeModel };
