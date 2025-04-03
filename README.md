# E-commerce API Project

A RESTful API for an e-commerce platform built with Node.js, Express, MongoDB, and Handlebars. This project provides endpoints for managing products and shopping carts with full CRUD operations.

## Features

- Product management (CRUD operations)
- Shopping cart functionality
- Pagination and filtering for products
- Real-time product-cart relationship
- Server-side rendering with Handlebars
- MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone
cd ecommerceapi
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
```

## Running the Application

Development mode (with hot reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Products

- `GET /products` - Get all products (with pagination)

  - Query Parameters:
    - `limit`: Number of items per page (default: 10)
    - `page`: Page number (default: 1)
    - `sort`: Sort by price ('asc' or 'desc')
    - `query`: Search term for filtering products

- `GET /products/:pid` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/:pid` - Update a product
- `DELETE /products/:pid` - Delete a product

### Carts

- `POST /carts` - Create a new cart
- `GET /carts/:cid` - Get cart contents
- `POST /carts/:cid/product/:pid` - Add product to cart
- `DELETE /carts/:cid/products/:pid` - Remove product from cart
- `PUT /carts/:cid` - Update entire cart
- `PUT /carts/:cid/products/:pid` - Update product quantity in cart
- `DELETE /carts/:cid` - Empty cart

## Technologies Used

- **Express**: Web application framework
- **Mongoose**: MongoDB object modeling
- **Express-Handlebars**: Template engine
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reload

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
```

## Testing

To run tests (when implemented):

```bash
npm test
```

## Version

1.0.0
