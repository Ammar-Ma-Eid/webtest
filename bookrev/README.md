# BookRev - Book Review Application

A MERN stack application for managing books and reviews.

## Features

- View a collection of books
- Add new books to the collection
- View detailed information about each book
- Add reviews and ratings for books

## Tech Stack

- MongoDB: Database
- Express: Backend framework
- React: Frontend library
- Node.js: Runtime environment
- Axios: HTTP client

## Project Structure

```
bookrev/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/                # Source files
│       ├── components/     # React components
│       │   ├── books/      # Book-related components
│       │   ├── layout/     # Layout components
│       │   └── pages/      # Page components
│       ├── App.js          # Main App component
│       └── index.js        # Entry point
│
└── server/                 # Express backend
    ├── controllers/        # Route controllers
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    └── server.js           # Server entry point
```

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Add a new book

### Reviews

- `POST /api/reviews` - Add a new review
- `GET /api/reviews/book/:bookId` - Get all reviews for a specific book

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install server dependencies:
   ```
   cd bookrev/server
   npm install
   ```
3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd bookrev/server
   npm run dev
   ```
2. Start the client:
   ```
   cd bookrev/client
   npm start
   ```

## License

This project is open source and available under the [MIT License](LICENSE).
