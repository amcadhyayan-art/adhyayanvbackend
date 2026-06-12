import mongoose, { Schema } from 'mongoose';

const AccommodationSchema = new Schema({
  type: { type: String, required: true, unique: true }, // e.g. "Non-AC Shared", "AC Single"
  description: { type: String, default: '' },
  pricePerDay: { type: Number, required: true },
  availableRooms: { type: Number, required: true }
});

export const Accommodation = mongoose.model('Accommodation', AccommodationSchema);
export default Accommodation;
