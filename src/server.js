// src/server.js
const express = require('express');
const { executeTrade } = require('./bot');

const app = express();
const PORT = 3000;

// API endpoint to get bot status and trade history
app.get('/bot-status', (req, res) => {
  const report = executeTrade();
  res.json(report);
});

// Run the bot every 5 seconds
setInterval(() => {
  executeTrade();
}, 5000);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
