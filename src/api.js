// src/api.js
let stockPrice = 100;  // Initial price

// Simulate stock price changes (mock API)
function getStockPrice() {
  // Random price fluctuation between -1% to +1%
  const change = stockPrice * ((Math.random() - 0.5) / 50);
  stockPrice += change;
  return stockPrice.toFixed(2); // Returns the stock price with 2 decimal places
}

module.exports = { getStockPrice };
