class Book {
  constructor(title, author, year) {
    if (title === null || !title.trim()) {
      throw new Error("Title cannot be null or empty");
    }
    if (author === null || !author.trim()) {
      throw new Error("Author cannot be null or empty");
    }
    if (year < 0 || year > 2100) {
      throw new Error("Year must be between 0 and 2100");
    }

    this.title = title.trim();
    this.author = author.trim();
    this.year = year;
  }

  toString() {
    return `${this.title} by ${this.author} (${this.year})`;
  }

  equals(other) {
    if (!(other instanceof Book)) {
      return false;
    }
    return this.title === other.title &&
           this.author === other.author &&
           this.year === other.year;
  }
}

module.exports = Book;
