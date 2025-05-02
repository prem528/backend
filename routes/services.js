// routes/services.js
const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.services.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET a single service by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.services.findUnique({
      where: { id: parseInt(id) },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  const { title, description, icon_url } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newService = await prisma.services.create({
      data: { title, description, icon_url },
    });
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT (update a service by ID)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, icon_url } = req.body;

  try {
    const updated = await prisma.services.update({
      where: { id: parseInt(id) },
      data: { title, description, icon_url },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.services.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
