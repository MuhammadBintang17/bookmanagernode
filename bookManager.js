const Book = require('./book');

class BookManager {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (book === null) {
      throw new Error("Book cannot be null");
    }
    this.books.push(book);
  }

  removeBook(title) {
    if (title === null || !title.trim()) {
      throw new Error("Title cannot be null or empty");
    }

    const titleLower = title.trim().toLowerCase();
    const initialLength = this.books.length;
    this.books = this.books.filter(book =>
      book.title.toLowerCase() !== titleLower
    );
    return this.books.length < initialLength;
  }

  getAllBooks() {
    return [...this.books];
  }

  findBooksByAuthor(author) {
    if (author === null || !author.trim()) {
      throw new Error("Author cannot be null or empty");
    }

    const authorLower = author.trim().toLowerCase();
    return this.books.filter(book =>
      book.author.toLowerCase() === authorLower
    );
  }

  findBooksByYear(year) {
    if (year < 0 || year > 2100) {
      throw new Error("Year must be between 0 and 2100");
    }

    return this.books.filter(book => book.year === year);
  }

  getBookCount() {
    return this.books.length;
  }

  containsBook(title) {
    if (title === null || !title.trim()) {
      throw new Error("Title cannot be null or empty");
    }

    const titleLower = title.trim().toLowerCase();
    return this.books.some(book =>
      book.title.toLowerCase() === titleLower
    );
  }

  clearAllBooks() {
    this.books = [];
  }
}

module.exports = BookManager;
