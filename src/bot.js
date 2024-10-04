// src/bot.js
const { fetchStockPrice } = require('./api');
const { calculateMovingAverage, calculateMovingAverages } = require('./utils');

// Bot's starting balance and initial parameters
let balance = 10000; // Starting balance (in dollars)
let shares = 0;      // Number of shares currently held
let buyPrice = 0;    // Price at which shares were bought
let tradingHistory = []; // Record of all trades
let totalProfitLoss = 0; // Track overall profit/loss

const movingAverageWindow = 5; // Moving average window (for simple strategy)
const shortWindow = 3; // Short-term window for crossover strategy
const longWindow = 5;  // Long-term window for crossover strategy
let pricesHistory = []; // History of prices for moving average calculation

// Monitor stock prices and execute trade decisions
function monitorStockPrice() {
  setInterval(() => {
    executeTrade();
  }, 5000); // Checks every 5 seconds for simplicity
}

// Simulate a basic trading strategy
async function executeTrade() {
  const { price: currentPrice } = await fetchStockPrice(); // Fetch stock price
  pricesHistory.push(currentPrice);

  // Keep pricesHistory limited to movingAverageWindow length
  if (pricesHistory.length > movingAverageWindow) {
    pricesHistory.shift();
  }

  const movingAverage = calculateMovingAverage(pricesHistory);

  // Calculate short-term and long-term moving averages for crossover
  const { shortTermMA, longTermMA } = calculateMovingAverages(pricesHistory, shortWindow, longWindow);

  // Trading strategy - Buy/Sell logic
  if (shares === 0) {
    if (currentPrice < movingAverage * 0.98) {
      // Buy condition: buy when price is 2% below moving average
      const sharesToBuy = Math.floor(balance / currentPrice);
      balance -= sharesToBuy * currentPrice;
      shares = sharesToBuy;
      buyPrice = currentPrice;
      tradingHistory.push({ action: 'buy', price: currentPrice, shares: sharesToBuy });
      console.log(`Bought ${sharesToBuy} shares at $${currentPrice}`);
    } else if (shortTermMA > longTermMA) {
      // Crossover Buy condition
      const sharesToBuy = Math.floor(balance / currentPrice);
      balance -= sharesToBuy * currentPrice;
      shares = sharesToBuy;
      buyPrice = currentPrice;
      tradingHistory.push({ action: 'buy', price: currentPrice, shares: sharesToBuy });
      console.log(`Bought ${sharesToBuy} shares at $${currentPrice} (Crossover)`);
    }
  } else if (shares > 0) {
    if (currentPrice > buyPrice * 1.03) {
      // Sell condition: sell when price is 3% above the buy price
      balance += shares * currentPrice;
      totalProfitLoss += (currentPrice - buyPrice) * shares; // Calculate profit/loss
      tradingHistory.push({ action: 'sell', price: currentPrice, shares });
      console.log(`Sold ${shares} shares at $${currentPrice}`);
      shares = 0; // Reset shares after selling
    } else if (shortTermMA < longTermMA) {
      // Crossover Sell condition
      balance += shares * currentPrice;
      totalProfitLoss += (currentPrice - buyPrice) * shares; // Calculate profit/loss
      tradingHistory.push({ action: 'sell', price: currentPrice, shares });
      console.log(`Sold ${shares} shares at $${currentPrice} (Crossover)`);
      shares = 0; // Reset shares after selling
    }
  }

  // Return status for API endpoint
  return {
    balance: balance.toFixed(2),
    shares,
    currentPrice: currentPrice.toFixed(2),
    tradingHistory,
    totalProfitLoss: totalProfitLoss.toFixed(2), // Include total profit/loss
  };
}

// Function to generate a summary report
function generateSummaryReport() {
  const totalTrades = tradingHistory.length;
  const summary = {
    totalTrades,
    finalBalance: balance.toFixed(2),
    totalProfitLoss: totalProfitLoss.toFixed(2),
    tradingHistory,
  };
  console.log("Summary Report:", summary);
  return summary;
}

module.exports = { monitorStockPrice, executeTrade, generateSummaryReport };
