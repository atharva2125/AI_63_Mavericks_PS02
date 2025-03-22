const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const faqsRoutes = require('./routes/faqs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/faqs', faqsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});