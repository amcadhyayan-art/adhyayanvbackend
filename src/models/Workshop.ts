import mongoose, { Schema } from 'mongoose';

const SlotSchema = new Schema({
  label: { type: String, required: true },   // e.g. "9:00 AM - 1:00 PM | July 12, 2026"
  url: { type: String, default: '' },         // Razorpay/external link (kept for reference)
  slotsTotal: { type: Number, default: 50 },
  slotsFilled: { type: Number, default: 0 }
}, { _id: false });

const WorkshopSchema = new Schema({
  id: { type: String, default: '' },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  speaker: { type: String, required: true },
  venue: { type: String, default: '' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  price: { type: Number, required: true },
  slotsTotal: { type: Number, default: 100 },   // overall total (sum of all slot totals)
  slotsFilled: { type: Number, default: 0 },    // overall filled (sum of all slot fills)
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
  topics: [{ type: String }],
  contacts: [{
    name: { type: String },
    phone: { type: String }
  }],
  slots: [SlotSchema]
});

export const Workshop = mongoose.model('Workshop', WorkshopSchema);
export default Workshop;
