// src/utils.js

/**
 * Calculate the moving average from a given array of prices.
 * @param {number[]} prices - Array of prices.
 * @returns {number} - The calculated moving average.
 */
function calculateMovingAverage(prices) {
    const total = prices.reduce((sum, price) => sum + price, 0);
    return total / prices.length;
  }
  
  /**
   * Calculate short-term and long-term moving averages for crossover strategy.
   * @param {number[]} prices - Array of prices.
   * @param {number} shortWindow - The window size for the short-term moving average.
   * @param {number} longWindow - The window size for the long-term moving average.
   * @returns {object} - Contains short and long moving averages.
   */
  function calculateMovingAverages(prices, shortWindow, longWindow) {
    const shortTermMA = calculateMovingAverage(prices.slice(-shortWindow));
    const longTermMA = calculateMovingAverage(prices.slice(-longWindow));
    return { shortTermMA, longTermMA };
  }
  
  module.exports = { calculateMovingAverage, calculateMovingAverages };
  