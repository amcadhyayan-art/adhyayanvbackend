import { Router } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import { Registration } from '../models/Registration';
import { Workshop } from '../models/Workshop';
import { Competition } from '../models/Competition';
import { Accommodation } from '../models/Accommodation';
import { sendReceiptEmail } from '../utils/mailer';

const router = Router();

// Configure Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// 1. Initiate checkout and create Razorpay Order
router.post('/initiate', async (req, res) => {
  try {
    const { userDetails, itemsSelected } = req.body;
    const { workshops, competitions, accommodation } = itemsSelected;

    let totalAmount = 0;
    const resolvedWorkshopIds: mongoose.Types.ObjectId[] = [];
    const resolvedCompetitionIds: mongoose.Types.ObjectId[] = [];

    // Fetch workshops and sum price
    if (workshops && workshops.length > 0) {
      for (const wId of workshops) {
        const query = mongoose.Types.ObjectId.isValid(wId)
          ? { _id: wId }
          : { id: wId };
        const ws = await Workshop.findOne(query);
        if (ws) {
          resolvedWorkshopIds.push(ws._id as mongoose.Types.ObjectId);
          totalAmount += ws.price;
        }
      }
    }

    // Fetch competitions and sum price
    if (competitions && competitions.length > 0) {
      for (const cId of competitions) {
        const query = mongoose.Types.ObjectId.isValid(cId)
          ? { _id: cId }
          : { id: cId };
        const comp = await Competition.findOne(query);
        if (comp) {
          resolvedCompetitionIds.push(comp._id as mongoose.Types.ObjectId);
          totalAmount += comp.price;
        }
      }
    }

    // Fetch accommodation price
    let resolvedAccOption: mongoose.Types.ObjectId | undefined = undefined;
    if (accommodation && accommodation.option) {
      const query = mongoose.Types.ObjectId.isValid(accommodation.option)
        ? { _id: accommodation.option }
        : { id: accommodation.option };
      const dbAcc = await Accommodation.findOne(query);
      if (dbAcc) {
        resolvedAccOption = dbAcc._id as mongoose.Types.ObjectId;
        totalAmount += dbAcc.pricePerDay * (accommodation.days || 1);
      }
    }

    if (totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total checkout amount' });
    }

    // Create Razorpay Order
    // Note: Razorpay accepts amount in paise (1 INR = 100 paise)
    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Save registration status as pending
    const registration = new Registration({
      userDetails,
      itemsSelected: {
        workshops: resolvedWorkshopIds,
        competitions: resolvedCompetitionIds,
        accommodation: resolvedAccOption ? {
          option: resolvedAccOption,
          days: accommodation.days || 0,
          checkIn: accommodation.checkIn
        } : undefined
      },
      payment: {
        orderId: order.id,
        amount: totalAmount,
        status: 'pending'
      }
    });

    await registration.save();

    res.json({
      registrationId: registration._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || ''
    });
  } catch (error: any) {
    console.error('Payment initiate error:', error);
    res.status(500).json({ message: error.message || 'Payment initiation failed' });
  }
});

// 2. Verify Razorpay Payment Signature
router.post('/verify', async (req, res) => {
  try {
    const { registrationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
    
    // Generate signature signature verification hash
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
    }

    // Update DB status to success
    const registration = await Registration.findById(registrationId)
      .populate('itemsSelected.workshops')
      .populate('itemsSelected.competitions')
      .populate('itemsSelected.accommodation.option');

    if (!registration) {
      return res.status(404).json({ message: 'Registration record not found.' });
    }

    if (registration.payment) {
      registration.payment.status = 'success';
      registration.payment.paymentId = razorpay_payment_id;
    }
    await registration.save();

    // Increment filled slots for workshops
    if (registration.itemsSelected && registration.itemsSelected.workshops && registration.itemsSelected.workshops.length > 0) {
      const workshopIds = registration.itemsSelected.workshops.map((w: any) => w._id);
      await Workshop.updateMany({ _id: { $in: workshopIds } }, { $inc: { slotsFilled: 1 } });
    }

    // Trigger SMTP confirmation email
    console.log('Initiating receipt email dispatch...');
    await sendReceiptEmail(registration);
    console.log('Receipt email dispatch complete.');

    res.json({ message: 'Payment verified and registration successful.', registrationId });
  } catch (error: any) {
    console.error('Verify Route Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
