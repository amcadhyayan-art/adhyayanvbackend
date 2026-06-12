import mongoose, { Schema } from 'mongoose';

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
  judgingCriteria: [{ type: String }]
});

export const Competition = mongoose.model('Competition', CompetitionSchema);
export default Competition;
