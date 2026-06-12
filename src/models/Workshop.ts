import mongoose, { Schema } from 'mongoose';

const WorkshopSchema = new Schema({
  id: { type: String, default: '' },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  speaker: { type: String, required: true },
  venue: { type: String, default: '' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  price: { type: Number, required: true },
  slotsTotal: { type: Number, default: 100 },
  slotsFilled: { type: Number, default: 0 },
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
  topics: [{ type: String }],
  contacts: [{
    name: { type: String },
    phone: { type: String }
  }],
  slots: [{ type: String }]
});

export const Workshop = mongoose.model('Workshop', WorkshopSchema);
export default Workshop;
