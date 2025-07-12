const Issue = require('../models/issueModel');
const Book = require('../models/bookModel');

exports.issueBook = async (req, res) => {
  const { isbn } = req.body;
  const userEmail = req.userEmail;

  const book = await Book.findOne({ isbn });

  if (!book || book.copies <= 0) {
    return res.status(400).json({ message: 'Book not available' });
  }

  await Issue.create({ book: book._id, userEmail });
  book.copies -= 1;
  await book.save();

  res.json({ message: 'Book issued successfully' });
};

exports.returnBook = async (req, res) => {
  const { issueId } = req.params;

  const issue = await Issue.findById(issueId).populate('book');
  if (!issue || issue.returned) {
    return res.status(400).json({ message: 'Already returned or not found' });
  }

  issue.returned = true;
  issue.returnDate = new Date();
  await issue.save();

  const book = issue.book;
  book.copies += 1;
  await book.save();

  res.json({ message: 'Book returned successfully' });
};

exports.getIssuedBooks = async (req, res) => {
  const { userEmail, userRole } = req;

  let filter = {};
  if (userRole !== 'admin') {
    filter.userEmail = userEmail;
  }

  const issues = await Issue.find(filter).populate('book');
  res.json(issues);
};
