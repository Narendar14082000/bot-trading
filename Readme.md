---

# Trading Bot Simulation

## Overview

This project implements a simple trading bot that simulates trading in a hypothetical stock market. The bot monitors stock prices, executes trades based on predefined strategies, and tracks its performance metrics, including profit/loss. It serves as a practical example of how to handle stock trading logic programmatically.

## Features

- Continuous monitoring of stock prices using mock data.
- Basic trading strategies including:
  - Buy when stock price drops by 2% below the moving average.
  - Sell when stock price rises by 3% above the buy price.
  - Crossover trading logic using moving averages.
- Real-time tracking of the bot's balance, positions, and profit/loss.
- Summary report generation showing trades made and final profit/loss statement.

## Technologies Used

- Node.js
- Express.js
- Axios for HTTP requests
- Mock API for simulating stock prices

## Project Structure

```
trading-bot/
│
├── src/
│   ├── api.js           # Mock API for stock prices
│   ├── bot.js           # Trading bot logic and strategies
│   ├── server.js        # Express server setup and API endpoints
│   └── utils.js         # Utility functions for calculations
│
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Installation

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/trading-bot.git
   cd trading-bot
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Running the Application

To run the trading bot, use the following command:

```bash
node src/server.js
```

The server will start and listen for requests on `http://localhost:3000`.

## Live API Endpoints

You can interact with the trading bot using the following live API endpoints:

### 1. Bot Status

To view the current status of the trading bot, including balance, shares held, and current stock price, use the following endpoint:

```http
GET https://bot-trading-b56q.onrender.com/bot-status
```

**Response:**
```json
{
  "balance": "xxxx.xx",
  "shares": 0,
  "currentPrice": "xx.xx",
  "tradingHistory": [
    {
      "action": "buy",
      "price": xx.xx,
      "shares": 10
    },
    ...
  ],
  "totalProfitLoss": "xxx.xx"
}
```

### 2. Summary Report

To generate a summary report showing the total trades, final balance, and overall profit/loss, use the following endpoint:

```http
GET https://bot-trading-b56q.onrender.com/summary
```

**Response:**
```json
{
  "totalTrades": 5,
  "finalBalance": "xxxx.xx",
  "totalProfitLoss": "xx.xx",
  "tradingHistory": [
    {
      "action": "buy",
      "price": xx.xx,
      "shares": 10
    },
    ...
  ]
}
```

### 3. Stock Price

To get the latest stock prices, use the following endpoint:

```http
GET https://bot-trading-b56q.onrender.com/stock-price
```

**Response:**
```json
{
  "price": "xx.xx",
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
}
```

## Trading Logic

The trading bot employs the following strategies:

1. **Buy Strategy:**
   - The bot will buy shares if the current price is 2% lower than the moving average price of the last `movingAverageWindow` prices.
   - Additionally, if the short-term moving average crosses above the long-term moving average, it indicates a buying opportunity.

2. **Sell Strategy:**
   - The bot will sell shares if the current price rises by 3% above the buy price.
   - Similarly, if the short-term moving average crosses below the long-term moving average, it indicates a selling opportunity.

3. **Profit/Loss Tracking:**
   - The bot tracks the total profit or loss from trades and updates its balance accordingly after each buy or sell action.

## Conclusion

This trading bot simulation provides a simple yet effective way to understand basic trading logic, how to monitor stock prices, and how to handle trading operations programmatically. You can extend this bot with additional strategies, improve the mock API, or integrate it with a real stock market API for live trading.

---