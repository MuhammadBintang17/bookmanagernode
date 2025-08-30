const Book = require('../book');
const BookManager = require('../bookManager');

describe('BookManager', () => {
  let bookManager;

  beforeEach(() => {
    bookManager = new BookManager();
  });

  // ==========================
  // Test case awal
  // ==========================
  test('Test menambahkan buku', () => {
    const book = new Book("Test Book", "Test Author", 2023);
    bookManager.addBook(book);
    expect(bookManager.getBookCount()).toBe(1);
  });

  test('Test menghapus buku yang ada', () => {
    const book = new Book("To Remove", "Author", 2023);
    bookManager.addBook(book);

    const removed = bookManager.removeBook("To Remove");
    expect(removed).toBe(true);
    expect(bookManager.getBookCount()).toBe(0);
  });

  test('Test menghapus buku yang tidak ada', () => {
    const removed = bookManager.removeBook("Nonexistent Title");
    expect(removed).toBe(false);
    expect(bookManager.getBookCount()).toBe(0);
  });

  test('Test mencari buku berdasarkan author', () => {
    bookManager.addBook(new Book("Book A", "Andi", 2020));
    bookManager.addBook(new Book("Book B", "Budi", 2021));
    bookManager.addBook(new Book("Book C", "Andi", 2022));

    const foundBooks = bookManager.findBooksByAuthor("Andi");
    expect(foundBooks.length).toBe(2);
    expect(foundBooks[0].author).toBe("Andi");
    expect(foundBooks[1].author).toBe("Andi");
  });

  test('Test mendapatkan semua buku', () => {
    const book1 = new Book("Book 1", "Author 1", 2000);
    const book2 = new Book("Book 2", "Author 2", 2005);
    bookManager.addBook(book1);
    bookManager.addBook(book2);

    const allBooks = bookManager.getAllBooks();
    expect(allBooks.length).toBe(2);
    expect(allBooks).toContain(book1);
    expect(allBooks).toContain(book2);
  });

  // ==========================
  // Positive Test Cases
  // ==========================
  test('Test Valid Book Creation', () => {
    const book = new Book("Valid Title", "Valid Author", 2022);
    expect(book.title).toBe("Valid Title");
    expect(book.author).toBe("Valid Author");
    expect(book.year).toBe(2022);
  });

  test('Test Book Search by Author', () => {
    const b1 = new Book("Book 1", "Alice", 2020);
    const b2 = new Book("Book 2", "Bob", 2021);
    const b3 = new Book("Book 3", "Alice", 2022);
    bookManager.addBook(b1);
    bookManager.addBook(b2);
    bookManager.addBook(b3);

    const found = bookManager.findBooksByAuthor("Alice");
    expect(found.length).toBe(2);
    expect(found).toContain(b1);
    expect(found).toContain(b3);
  });

  test('Test Book Search by Year', () => {
    const b1 = new Book("Book 1", "Author 1", 2020);
    const b2 = new Book("Book 2", "Author 2", 2020);
    bookManager.addBook(b1);
    bookManager.addBook(b2);

    const found = bookManager.findBooksByYear(2020);
    expect(found.length).toBe(2);
    expect(found).toContain(b1);
    expect(found).toContain(b2);
  });

  test('testMultipleBooksAdded', () => {
    const books = [
      new Book("B1", "A", 2000),
      new Book("B2", "B", 2001),
      new Book("B3", "C", 2002),
    ];
    books.forEach(b => bookManager.addBook(b));
    expect(bookManager.getBookCount()).toBe(3);
    expect(bookManager.getAllBooks()).toEqual(books);
  });

  // ==========================
  // Negative Test Cases
  // ==========================
  test('Test Invalid Book Title', () => {
    expect(() => new Book("", "Author", 2020)).toThrow("Title cannot be null or empty");
    expect(() => new Book(null, "Author", 2020)).toThrow("Title cannot be null or empty");
  });

  test('Test Invalid Year', () => {
    expect(() => new Book("Title", "Author", -1)).toThrow("Year must be between 0 and 2100");
    expect(() => new Book("Title", "Author", 3000)).toThrow("Year must be between 0 and 2100");
  });

  test('Test Remove Non-existent Book', () => {
    const result = bookManager.removeBook("Unknown Book");
    expect(result).toBe(false);
  });

  test('testSearchNonExistentAuthor', () => {
    bookManager.addBook(new Book("Book 1", "Alice", 2020));
    const found = bookManager.findBooksByAuthor("Bob");
    expect(found.length).toBe(0);
  });

  // ==========================
  // Edge Cases
  // ==========================
  test('Test Empty BookManager', () => {
    expect(bookManager.getAllBooks().length).toBe(0);
    expect(bookManager.getBookCount()).toBe(0);
  });

  test('Test Duplicate Books', () => {
    const book = new Book("Duplicate", "Author", 2021);
    bookManager.addBook(book);
    bookManager.addBook(book);
    expect(bookManager.getBookCount()).toBe(2);
  });

  test('Test Large Dataset', () => {
    for (let i = 0; i < 1000; i++) {
      bookManager.addBook(new Book(`Book ${i}`, "Author", 2000 + (i % 20)));
    }
    expect(bookManager.getBookCount()).toBe(1000);
  });

  test('testCaseSensitivityInAuthorSearch', () => {
    bookManager.addBook(new Book("Book 1", "Alice", 2020));
    const found = bookManager.findBooksByAuthor("alice");
    expect(found.length).toBe(1);
    expect(found[0].author).toBe("Alice");
  });
});
