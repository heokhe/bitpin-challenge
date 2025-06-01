# Percentage-Based Order Placement

## Features

- A list of available markets is displayed in the home page. Markets are separated by their base currency (IRT/USDT). The data is fetched from the Bitpin API.
- Upon clicking a market, the user is redirected to the market page where they can see the sell/buy orders, latest transactions, total value, total remain, and the average price of the market. (You can also swipe or scroll horizontally between the tabs!)
- Users can specify a percentage of the total remaining value and see the payable amount for that order, calculated based on the average price.
- The app has light and dark themes which are used based on the user's system preference.

## How to Use

1. First, install dependencies:
   ```sh
   npm i # or using yarn, pnpm or any other package manager
   ```
1. Then, build the app:
   ```sh
   npm run build
   ```
1. Now the app is ready in the `dist` folder. You can serve it using any static file server, or you can use the built-in preview command:
   ```sh
   npm run preview
   ```

## Libraries/tools Used

- Vite for building the app
- React
- React Router
- SWR for fetching and caching data
- Tailwind
- Decimal.js
- class-variance-authority and tailwind-merge for writing better components and styles
- Swiping between tabs is implemeneted using CSS's `scroll-snap` feature and no JavaScript is used for that.
