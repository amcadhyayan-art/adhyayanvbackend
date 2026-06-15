import mongoose, { Schema } from 'mongoose';

const AccommodationSchema = new Schema({
  type: { type: String, required: true }, // e.g. "Girls Hostel (Triple Sharing)"
  price: { type: String, required: true }, // e.g. "₹500/head per day"
  pricePerDay: { type: Number, default: 0 }, // For payment calculation
  occupancy: { type: String, default: '' },
  amenities: [{ type: String }],
  image: { type: String, default: '' },
  availableRooms: { type: Number, default: 50 },
  venue: { type: String, default: '' },
  contacts: [{
    name: { type: String },
    phone: { type: String }
  }]
});

export const Accommodation = mongoose.model('Accommodation', AccommodationSchema);
export default Accommodation;
