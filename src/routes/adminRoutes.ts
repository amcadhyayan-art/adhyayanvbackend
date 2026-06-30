import { Router, Response } from 'express';
import { sendReceiptEmail } from '../utils/mailer';
import jwt from 'jsonwebtoken';
import { verifyAdminToken, AuthRequest } from '../middleware/auth';
import { Workshop } from '../models/Workshop';
import { Competition } from '../models/Competition';
import { Accommodation } from '../models/Accommodation';
import { Registration } from '../models/Registration';

const router = Router();

// 1. Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production';
    const token = jwt.sign({ id: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// All routes below require token verification
router.use(verifyAdminToken);

// 2. Workshops CRUD
router.post('/workshops', async (req, res) => {
  try {
    if (!req.body.id && req.body.title) {
      req.body.id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    const newWorkshop = new Workshop(req.body);
    await newWorkshop.save();
    res.status(201).json(newWorkshop);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/workshops/:id', async (req, res) => {
  try {
    if (!req.body.id && req.body.title) {
      req.body.id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    const updated = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Workshop not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/workshops/:id', async (req, res) => {
  try {
    const deleted = await Workshop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workshop not found' });
    res.json({ message: 'Workshop deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Competitions CRUD
router.post('/competitions', async (req, res) => {
  try {
    if (!req.body.id && req.body.title) {
      req.body.id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    const newComp = new Competition(req.body);
    await newComp.save();
    res.status(201).json(newComp);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/competitions/:id', async (req, res) => {
  try {
    if (!req.body.id && req.body.title) {
      req.body.id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    const updated = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Competition not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/competitions/:id', async (req, res) => {
  try {
    const deleted = await Competition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Competition not found' });
    res.json({ message: 'Competition deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Accommodation CRUD
router.post('/accommodation', async (req, res) => {
  try {
    const newAcc = new Accommodation(req.body);
    await newAcc.save();
    res.status(201).json(newAcc);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/accommodation/:id', async (req, res) => {
  try {
    const updated = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Accommodation option not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/accommodation/:id', async (req, res) => {
  try {
    const deleted = await Accommodation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Accommodation option not found' });
    res.json({ message: 'Accommodation option deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Fetch Registrations List
router.get('/registrations', async (req: AuthRequest, res: Response) => {
  try {
    const list = await Registration.find()
      .populate('itemsSelected.workshops', 'title slots')
      .populate('itemsSelected.competitions', 'title')
      .populate('itemsSelected.accommodation.option', 'type')
      .sort({ registeredAt: -1 });
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

import Razorpay from 'razorpay';

// 5.5 Fetch Raw Razorpay Payments for Audit
router.get('/razorpay-payments', async (req: AuthRequest, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
    });
    // Fetch up to 100 recent payments from Razorpay
    const payments = await razorpay.payments.all({ count: 100 });
    res.json(payments.items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// 5.6 Sync Missing Razorpay Payment
router.post('/razorpay-sync-manual', async (req: AuthRequest, res: Response) => {
  try {
    const { payment } = req.body;
    
    if (!payment || !payment.id) {
      return res.status(400).json({ message: 'Payment data missing' });
    }

    const existing = await Registration.findOne({
      $or: [
        { 'payment.paymentId': payment.id },
        { 'payment.transactionId': payment.id },
        { 'payment.orderId': payment.order_id }
      ]
    });
    if (existing) {
      return res.status(400).json({ message: 'Registration already exists for this payment' });
    }

    const registration = new Registration({
      userDetails: {
        fullName: payment.notes?.name || payment.email?.split('@')[0] || 'Unknown',
        email: payment.email || 'unknown@example.com',
        phone: payment.contact || 'N/A',
        college: 'N/A',
        year: 'N/A'
      },
      itemsSelected: { workshops: [], competitions: [] },
      foodRequired: 'no',
      accommodationRequired: 'no',
      payment: {
        orderId: payment.order_id || 'manual_sync',
        paymentId: payment.id,
        amount: (payment.amount || 0) / 100,
        status: 'success',
        paymentApp: 'Razorpay'
      },
      verified: true
    });

    const count = await Registration.countDocuments({ adhyayanId: { $exists: true, $ne: null } });
    registration.adhyayanId = `ADHYAYAN2026-${(count + 1).toString().padStart(4, '0')}`;

    await registration.save();
    
    console.log('Initiating receipt email dispatch for manual sync...');
    await sendReceiptEmail(registration);
    console.log('Receipt email dispatch complete.');

    res.json({ message: 'Synced successfully and email sent', registration });
  } catch (error: any) {
    console.error('Razorpay sync error:', error);
    res.status(500).json({ message: error.message });
  }
});


// 6. Verify Registration (Manual UPI)
router.put('/registrations/:id/verify', async (req: AuthRequest, res: Response) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('itemsSelected.workshops')
      .populate('itemsSelected.competitions')
      .populate('itemsSelected.accommodation.option');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (registration.verified) {
      return res.status(400).json({ message: 'Registration is already verified' });
    }

    // Update status
    if (registration.payment) {
      registration.payment.status = 'success';
    }
    
    // Generate Adhyayan ID
    if (!registration.adhyayanId) {
      const count = await Registration.countDocuments({ adhyayanId: { $exists: true, $ne: null } });
      registration.adhyayanId = `ADHYAYAN2026-${(count + 1).toString().padStart(4, '0')}`;
    }

    registration.verified = true;
    await registration.save();

    // Increment filled slots
    if (registration.itemsSelected && registration.itemsSelected.workshops && registration.itemsSelected.workshops.length > 0) {
      const workshopIds = registration.itemsSelected.workshops.map((w: any) => w._id);
      const slotIdx = (registration as any).selectedSlotIndex;

      if (typeof slotIdx === 'number' && slotIdx >= 0) {
        await Workshop.updateMany(
          { _id: { $in: workshopIds } },
          {
            $inc: {
              slotsFilled: 1,
              [`slots.${slotIdx}.slotsFilled`]: 1
            }
          }
        );
      } else {
        await Workshop.updateMany({ _id: { $in: workshopIds } }, { $inc: { slotsFilled: 1 } });
      }
    }

    // Trigger SMTP confirmation email
    console.log('Initiating receipt email dispatch for manually verified registration...');
    await sendReceiptEmail(registration);
    console.log('Receipt email dispatch complete.');

    res.json({ message: 'Registration verified and confirmation email sent.', registration });
  } catch (error: any) {
    console.error('Verify Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 7. Resend Confirmation Email
router.post('/registrations/:id/resend-email', async (req: AuthRequest, res: Response) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('itemsSelected.workshops')
      .populate('itemsSelected.competitions')
      .populate('itemsSelected.accommodation.option');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    console.log(`Manual request to resend email for ${registration._id}...`);
    await sendReceiptEmail(registration);

    res.json({ message: 'Email resent successfully', registration });
  } catch (error: any) {
    console.error('Resend Email Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
