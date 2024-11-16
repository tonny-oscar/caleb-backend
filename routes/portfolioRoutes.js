const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Add a new portfolio
router.post('/', async (req, res) => {
  const { title, description, images } = req.body;
  try {
    const newPortfolio = new Portfolio({ title, description, images });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(400).json({ message: 'Error creating portfolio', error: err });
  }
});

// Delete a portfolio
router.delete('/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting portfolio', error: err });
  }
});

module.exports = router;
