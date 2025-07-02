const BOOK_KEY = 'books';

export const getBooks = () => JSON.parse(localStorage.getItem(BOOK_KEY)) || [];

export const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};

export const deleteBook = (isbn) => {
  const books = getBooks().filter(b => b.isbn !== isbn);
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};

export const getBookById = (isbn) => getBooks().find(b => b.isbn === isbn);

export const updateBook = (updatedBook) => {
  const books = getBooks().map(b => b.isbn === updatedBook.isbn ? updatedBook : b);
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};
