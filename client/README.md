# Shopify Storefront with React and TypeScript

This project is a React and TypeScript storefront that uses the Shopify Storefront API to display products. It includes mock product data for development and testing, along with loading, error handling, and accessibility support.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Shopify store with the Storefront API enabled.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `client` directory.
   - Add your Shopify store domain and storefront access token to the `.env` file:
     ```
     REACT_APP_SHOPIFY_STORE_DOMAIN=your-shop-name.myshopify.com
     REACT_APP_SHOPIPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
     ```

### Running the Application

- **To run with mock data:**
  - The application is currently configured to use mock data by default.
  - Start the development server:
    ```bash
    npm start
    ```

- **To run with real data from Shopify:**
  - Open `src/App.tsx`.
  - Comment out the line that sets products from `mockProducts`.
  - Uncomment the lines that fetch products using `fetchProducts()`.
  - Start the development server:
    ```bash
    npm start
    ```

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the app from Create React App.

