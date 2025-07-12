const Book = require('../models/bookModel');

// GET all books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// GET book by ID
// exports.getBookById = async (req, res) => {
//   const book = await Book.findById(req.params.id);
//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// };

exports.getBookByIsbn = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST create book
exports.createBook = async (req, res) => {
  try {
    const existingBook = await Book.findOne({ isbn: req.body.isbn });
    if (existingBook) {
      return res.status(409).json({ message: 'ISBN already exists' }); // <-- Conflict
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// PUT update book
// exports.updateBook = async (req, res) => {
//   const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (updated) {
//     res.json(updated);
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// };

exports.updateBookByIsbn = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { isbn: req.params.isbn },
      req.body,
      { new: true }
    );

    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE book
// exports.deleteBook = async (req, res) => {
//   const book = await Book.findByIdAndDelete(req.params.id);
//   if (book) {
//     res.json({ message: 'Book deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// };

exports.deleteBookByIsbn = async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ isbn: req.params.isbn });

    if (deletedBook) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
