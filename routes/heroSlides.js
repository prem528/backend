// routes/heroSlides.js
const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all hero slides
router.get('/', async (req, res) => {
  try {
    const slides = await prisma.hero_slides.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new hero slide
router.post('/', async (req, res) => {
  const { title, description, background_url, button_text } = req.body;

  if (!title || !description || !background_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newSlide = await prisma.hero_slides.create({
      data: {
        title,
        description,
        background_url,
        button_text,
      },
    });
    res.status(201).json(newSlide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create hero slide' });
  }
});

// PUT (update a slide by ID)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, background_url, button_text } = req.body;

  try {
    const updatedSlide = await prisma.hero_slides.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        background_url,
        button_text,
      },
    });
    res.json(updatedSlide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update hero slide' });
  }
});

// DELETE a slide
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.hero_slides.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete hero slide' });
  }
});

module.exports = router;