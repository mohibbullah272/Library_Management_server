# Library Management System
A  Library Management System built with Express, TypeScript, and MongoDB (via Mongoose). This system allows users to manage books, perform borrowing operations, and analyze borrowing trends using advanced features like aggregation pipelines, custom Mongoose methods, and middleware.

# Table of Contents
* Features
* Installation
* Usage
* API Endpoints
* Data Models
* Configuration
* Examples
* Troubleshooting





## Features

Schema validation using Mongoose

* Borrowing enforcement and book availability tracking
* Aggregation pipeline for borrow summary
* Mongoose instance/static methods for logic encapsulation
* Middleware hooks (pre/post) for automatic handling
* Filtering, sorting, and pagination on book queries
* TypeScript-powered development

## Installation
```bash

# Clone the repository
git clone <your-repo-url>
cd library-management-system

# Install dependencies
npm install

# Create a .env file
cp .env.example .env

# Start the server
npm run dev
```

## Usage
Start the development server:
```bash

npm run dev
The server will start on the port specified in your .env file (default: http://localhost:5000).
```
## API Endpoints
### 📘 Books
Method	Endpoint	Description
POST	/api/books	Create a new book
GET	/api/books	Retrieve all books
GET	/api/books/:bookId	Get a book by ID
PUT	/api/books/:bookId	Update book info
DELETE	/api/books/:bookId	Delete a book

### Filters & Query Parameters
filter: Filter by genre (FICTION, SCIENCE, etc.)

sortBy: Field to sort by (e.g., createdAt)

sort: asc or desc

limit: Limit number of results

### 📕 Borrow
Method	Endpoint	Description
POST	/api/borrow	Borrow a book
GET	/api/borrow	Borrow summary (uses aggregation)

Borrowing checks for available copies and adjusts accordingly. If no copies are left, the book becomes unavailable.

# Data Models
### 📗 Book
```TS
{
  title: string;        // Required
  author: string;       // Required
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"; // Required
  isbn: string;         // Required, unique
  description?: string;
  copies: number;       // Required, non-negative
  available?: boolean;  // Defaults to true
}
```
### 📘 Borrow
```ts

{
  book: ObjectId;       // Required, references Book
  quantity: number;     // Required, positive integer
  dueDate: Date;        // Required
}
```
#  Configuration
Create a .env file with the following environment variables:

```BASH

PORT=5000
DB_USER=************
DB_PASS=************
```

# Examples
Create Book
```json
Copy
Edit
POST /api/books
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "copies": 5
}
```
Borrow Book
```json

POST /api/borrow
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```
Aggregated Borrow Summary
```json

GET /api/borrow
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```
# Troubleshooting
Validation Errors: Ensure all required fields are present and correctly typed.

Book Unavailable: Attempting to borrow more copies than available will trigger an error.

MongoDB Connection: Confirm your MongoDB URI in .env is correct.