import mongoose, { Schema } from 'mongoose';

const RegistrationSchema = new Schema({
  userDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    rollNo: { type: String, default: '' }
  },
  itemsSelected: {
    workshops: [{ type: Schema.Types.ObjectId, ref: 'Workshop' }],
    competitions: [{ type: Schema.Types.ObjectId, ref: 'Competition' }],
    accommodation: {
      option: { type: Schema.Types.ObjectId, ref: 'Accommodation' },
      days: { type: Number, default: 0 },
      checkIn: { type: Date }
    }
  },
  payment: {
    orderId: { type: String, default: '' },
    paymentId: { type: String, default: '' },
    amount: { type: Number, required: true }, // Total amount in INR
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    }
  },
  registeredAt: { type: Date, default: Date.now }
});

export const Registration = mongoose.model('Registration', RegistrationSchema);
export default Registration;
