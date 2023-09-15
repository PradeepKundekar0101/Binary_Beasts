const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const Item = require('../models/item'); // Import your Item model

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the destination folder for storing images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename (you can modify this as needed)
  },
});

const upload = multer({ storage });
// Create a new item
router.post('/items', upload.single('image'), async (req, res) => {
  try {
    const { name, description, quantity, location, category } = req.body;
    const imagePath = req.file.path; // Get the path to the uploaded image

    const newItem = new Item({
      name,
      description,
      image: imagePath,
      quantity,
      location,
      category,
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve all items
router.get('/items', async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Retrieve an item by ID
router.get('/items/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update an item by ID
router.put('/items/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
      const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Delete an item by ID
router.delete('/items/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
      const deletedItem = await Item.findByIdAndRemove(itemId);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(deletedItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
        
module.exports = router;