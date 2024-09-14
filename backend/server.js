// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




//LUfYMeKRY4naNUo5