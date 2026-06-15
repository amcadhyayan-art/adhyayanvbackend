import mongoose, { Schema } from 'mongoose';

const SlotSchema = new Schema({
  label: { type: String, required: true },   // e.g. "9:00 AM – 1:00 PM | July 12, 2026"
  slotsTotal: { type: Number, default: 50 },
  slotsFilled: { type: Number, default: 0 }
}, { _id: false });

const CompetitionSchema = new Schema({
  id: { type: String, default: '' },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  rules: [{ type: String }],
  teamSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 }
  },
  prizePool: { type: String, default: '' },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  deadline: { type: Date },
  category: { type: String, default: 'General' },
  contacts: [{
    name: { type: String },
    phone: { type: String }
  }],
  guidelines: [{ type: String }],
  topics: [{ type: String }],
  judgingCriteria: [{ type: String }],
  slots: [SlotSchema]
});

export const Competition = mongoose.model('Competition', CompetitionSchema);
export default Competition;
