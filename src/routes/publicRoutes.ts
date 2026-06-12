import { Router } from 'express';
import { Workshop } from '../models/Workshop';
import { Competition } from '../models/Competition';
import { Accommodation } from '../models/Accommodation';

const router = Router();

// Get all workshops
router.get('/workshops', async (req, res) => {
  try {
    const list = await Workshop.find();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all competitions
router.get('/competitions', async (req, res) => {
  try {
    const list = await Competition.find();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all accommodations
router.get('/accommodation', async (req, res) => {
  try {
    const list = await Accommodation.find();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single workshop by ID or slug id
router.get('/workshops/:id', async (req, res) => {
  try {
    let workshop = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      workshop = await Workshop.findById(req.params.id);
    }
    if (!workshop) {
      workshop = await Workshop.findOne({ id: req.params.id });
    }
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single competition by ID or slug id
router.get('/competitions/:id', async (req, res) => {
  try {
    let competition = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      competition = await Competition.findById(req.params.id);
    }
    if (!competition) {
      competition = await Competition.findOne({ id: req.params.id });
    }
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
