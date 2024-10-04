// src/api.js
let stockPrice = 100; // Initial price

// Function to get the current stock price
function getStockPrice() {
  // Random price fluctuation between -1% to +1%
  const change = stockPrice * ((Math.random() - 0.5) / 50);
  stockPrice += change;
  return stockPrice.toFixed(2); // Returns the stock price with 2 decimal places
}

// New function to simulate fetching price from an endpoint
function fetchStockPrice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const price = getStockPrice();
      resolve({ price: parseFloat(price) }); // Return price in a structured format
    }, 1000); // Simulate API delay
  });
}

module.exports = { fetchStockPrice };
