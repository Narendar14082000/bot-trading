// src/bot.js
const { getStockPrice } = require('./api');
const { calculateMovingAverage } = require('./utils');

// Bot's starting balance and initial parameters
let balance = 10000;  // Starting balance (in dollars)
let shares = 0;       // Number of shares currently held
let buyPrice = 0;     // Price at which shares were bought
let tradingHistory = [];  // Record of all trades

const movingAverageWindow = 5;  // Moving average window (e.g., for 5 ticks)
let pricesHistory = [];         // History of prices for moving average calculation

// Simulate a basic trading strategy
function executeTrade() {
  const currentPrice = parseFloat(getStockPrice());
  pricesHistory.push(currentPrice);

  // Keep pricesHistory limited to movingAverageWindow length
  if (pricesHistory.length > movingAverageWindow) {
    pricesHistory.shift();
  }

  const movingAverage = calculateMovingAverage(pricesHistory);

  if (shares === 0 && currentPrice < movingAverage * 0.98) {
    // Buy condition: buy when price is 2% below moving average
    const sharesToBuy = Math.floor(balance / currentPrice);
    balance -= sharesToBuy * currentPrice;
    shares = sharesToBuy;
    buyPrice = currentPrice;
    tradingHistory.push({ action: 'buy', price: currentPrice, shares: sharesToBuy });
    console.log(`Bought ${sharesToBuy} shares at $${currentPrice}`);
  } else if (shares > 0 && currentPrice > buyPrice * 1.03) {
    // Sell condition: sell when price is 3% above the buy price
    balance += shares * currentPrice;
    tradingHistory.push({ action: 'sell', price: currentPrice, shares });
    console.log(`Sold ${shares} shares at $${currentPrice}`);
    shares = 0;  // Reset shares after selling
  }

  return {
    balance: balance.toFixed(2),
    shares,
    currentPrice: currentPrice.toFixed(2),
    tradingHistory,
  };
}

module.exports = { executeTrade };
