// src/server.js
const express = require('express');
const { monitorStockPrice, executeTrade,generateSummaryReport } = require('./bot');
const { fetchStockPrice } = require('./api');


const app = express();
const PORT = 3000;

// API endpoint to get the latest stock price
app.get('/stock-price', async (req, res) => {
  const stockData = await fetchStockPrice();
  res.json(stockData); // Return structured price data
});
app.get('/summary', (req, res) => {
    const summary = generateSummaryReport();
    res.json(summary);
  });
// API endpoint to get bot status and trade history
app.get('/bot-status', async (req, res) => {
  const report = await executeTrade();
  res.json(report);
});

// Start monitoring the stock price
monitorStockPrice(); // Start the bot's price monitoring and trading decisions

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
