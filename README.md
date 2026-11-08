# EasyMart Backend

Professional REST API backend for the EasyMart e-commerce platform, built with Node.js and Express.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

## Overview

EasyMart Backend is a production-ready RESTful API powering an online shopping experience. It provides authentication, user and address management, product catalog, shopping cart, order processing, product reviews, image uploads, and admin dashboard capabilities.

## Features

- **Authentication & Authorization** — User registration, login, JWT access/refresh tokens, logout, and session verification.
- **User Management** — Profile CRUD, address book with default-address support.
- **Product Catalog** — Browse products, view product details, and admin-controlled create/update/delete.
- **Shopping Cart** — Add, update, remove, and clear cart items per user.
- **Order Management** — Place orders, view order history, and update order status (admin).
- **Product Reviews** — Create, read, update, and delete reviews for products and users.
- **Image Uploads** — Cloudinary integration for product and profile images via Multer.
- **Admin Dashboard** — Dashboard statistics and administrative controls.
- **Request Validation** — Joi-based input validation for all mutating endpoints.
- **Error Handling** — Centralized error middleware with consistent API responses.
- **Request Logging** — Built-in logger middleware for request tracing.

## Tech Stack

- Runtime: Node.js
- Framework: Express 5
- Authentication: JSON Web Tokens (jsonwebtoken)
- Password Hashing: bcryptjs
- Validation: Joi
- File Uploads: Multer + Cloudinary
- CORS: cors

## Project Structure

```
easymart-backend/
├── src/
│   ├── app.js                  # Express application entry point
│   ├── config/                 # Application configuration
│   ├── controllers/            # Route controllers (business logic)
│   ├── middleware/             # Auth, admin, validation, upload, error, logger
│   ├── models/                 # Data models (User, Product, Order, Cart, Review)
│   ├── routes/                 # API route definitions
│   ├── seeders/                # Seed data (JSON)
│   └── uploads/                # Local upload directory
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/easymart-backend.git
cd easymart-backend
npm install
```

### Running the server

Start the application:

```bash
node src/app.js
```

The server starts and listens on the configured port (default `5000`). A health-check route is available at `GET /` returning `"EasyMart API is running"`.

## API Reference

Base path: all routes are mounted under `/api`.

### Authentication
`POST /api/auth/register` — Register a new user account  
`POST /api/auth/login` — Authenticate and receive access/refresh tokens  
`POST /api/auth/refresh` — Refresh an expired access token  
`POST /api/auth/logout` — Log out the current session  
`GET /api/auth/me` — Get the authenticated user's profile (requires auth)  
`POST /api/auth/check-exists` — Check if a username or email is already taken

### Users
`GET /api/users` — List all users (auth required)  
`GET /api/users/:id` — Get a user by ID (auth required)  
`POST /api/users` — Create a user (auth required)  
`PUT /api/users/:id` — Update a user (auth required)  
`PUT /api/users/:id/address` — Add an address (auth required)  
`PUT /api/users/:id/address/:addressId` — Edit an address (auth required)  
`PUT /api/users/:id/address/:addressId/default` — Set default address (auth required)  
`DELETE /api/users/:id/address/:addressId` — Delete an address (auth required)

### Products
`GET /api/products` — List all products  
`GET /api/products/:id` — Get a product by ID  
`POST /api/products` — Create a product (auth + admin required)  
`PUT /api/products/:id` — Update a product (auth + admin required)  
`DELETE /api/products/:id` — Delete a product (auth + admin required)

### Cart
`GET /api/carts/:userId` — Get a user's cart (auth required)  
`POST /api/carts/add` — Add an item to cart (auth required)  
`PUT /api/carts/update/:userId` — Update a cart item (auth required)  
`DELETE /api/carts/remove/:userId/:productId` — Remove an item from cart (auth required)  
`DELETE /api/carts/clear/:userId` — Clear a user's cart (auth required)

### Orders
`GET /api/orders` — List all orders (auth required)  
`GET /api/orders/:id` — Get an order by ID (auth required)  
`GET /api/orders/user/:userId` — Get orders by user ID (auth required)  
`POST /api/orders` — Create an order (auth required)  
`PATCH /api/orders/:id/status` — Update order status (auth required)

### Reviews
`GET /api/reviews` — List all reviews  
`GET /api/reviews/user/:userId` — Get reviews by user ID  
`GET /api/reviews/product/:productId` — Get reviews by product ID  
`POST /api/reviews` — Create a review (auth required)  
`PUT /api/reviews/:id` — Update a review (auth required)  
`DELETE /api/reviews/:id` — Delete a review (auth required)

### Upload
`POST /api/upload` — Upload an image file (form field: `image`)

### Admin
`GET /api/admin/dashboard` — Get dashboard statistics (auth + admin required)

## Authentication

Protected endpoints require a valid JWT access token sent in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Use the `/auth/refresh` endpoint to obtain a new access token when it expires.

## Response Format

Successful responses follow a consistent structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for bug fixes, features, or improvements.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the ISC License.
