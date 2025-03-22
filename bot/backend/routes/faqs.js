const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/faqs.json');

// Helper function to read JSON data
const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Helper function to write JSON data
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// GET /faqs: Retrieve all FAQs
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.GST_FAQs); // Access the correct key
});

// POST /faqs: Add new FAQs dynamically
router.post('/', (req, res) => {
  const data = readData();
  const newFAQ = req.body;

  if (!newFAQ.id || !newFAQ.question || !newFAQ.answer) {
    return res.status(400).json({ message: 'Invalid FAQ data. Please provide id, question, and answer.' });
  }

  data.GST_FAQs.push(newFAQ); // Correctly push to GST_FAQs
  writeData(data);
  res.status(201).json({ message: 'FAQ added successfully', faq: newFAQ });
});

// PUT /faqs/:id: Update an existing FAQ
router.put('/:id', (req, res) => {
  const data = readData();
  const faqIndex = data.GST_FAQs.findIndex((faq) => faq.id === req.params.id);

  if (faqIndex === -1) {
    return res.status(404).json({ message: 'FAQ not found' });
  }

  data.GST_FAQs[faqIndex] = { ...data.GST_FAQs[faqIndex], ...req.body };
  writeData(data);
  res.json({ message: 'FAQ updated successfully', faq: data.GST_FAQs[faqIndex] });
});

// DELETE /faqs/:id: Delete an FAQ
router.delete('/:id', (req, res) => {
  const data = readData();
  const updatedFAQs = data.GST_FAQs.filter((faq) => faq.id !== req.params.id);

  if (updatedFAQs.length === data.GST_FAQs.length) {
    return res.status(404).json({ message: 'FAQ not found' });
  }

  writeData({ GST_FAQs: updatedFAQs });
  res.json({ message: 'FAQ deleted successfully' });
});

// POST /query: Process user queries and return the best match
router.post('/query', (req, res) => {
  const data = readData();
  const query = req.body.query.toLowerCase();
  const bestMatch = data.GST_FAQs.find((faq) =>
    faq.question.toLowerCase().includes(query)
  );

  if (!bestMatch) {
    return res.status(404).json({ message: 'No matching FAQ found' });
  }

  res.json(bestMatch);
});

module.exports = router;