const Book = require('./book');
const BookManager = require('./bookManager');


describe('BookManager', () => {
  let bookManager;

  beforeEach(() => {
    bookManager = new BookManager();
  });

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

  // ✅ Test menghapus buku yang tidak ada
  test('Test menghapus buku yang tidak ada', () => {
    const removed = bookManager.removeBook("Nonexistent Title");
    expect(removed).toBe(false);
    expect(bookManager.getBookCount()).toBe(0);
  });

  // ✅ Test mencari buku berdasarkan author
  test('Test mencari buku berdasarkan author', () => {
    bookManager.addBook(new Book("Book A", "Andi", 2020));
    bookManager.addBook(new Book("Book B", "Budi", 2021));
    bookManager.addBook(new Book("Book C", "Andi", 2022));

    const foundBooks = bookManager.findBooksByAuthor("Andi");
    expect(foundBooks.length).toBe(2);
    expect(foundBooks[0].author).toBe("Andi");
    expect(foundBooks[1].author).toBe("Andi");
  });

  // ✅ Test mendapatkan semua buku
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
});
