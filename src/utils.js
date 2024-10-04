// src/utils.js
function calculateMovingAverage(prices) {
    if (prices.length === 0) return 0;
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return sum / prices.length;
  }
  
  module.exports = { calculateMovingAverage };
  