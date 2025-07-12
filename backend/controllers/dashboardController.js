const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

exports.getDashboardStats = async (req, res) => {
  const { userEmail, userRole } = req;

  try {
    if (userRole === 'admin') {
      const books = await Book.find();
      const totalCopies = books.reduce((acc, book) => acc + (book.copies || 0), 0);

      // Get all issued books and map their book._id
      const issued = await Issue.find({ returned: false }).populate('book');
      const issuedCopies = issued.length;

      const totalAvailableCopies = totalCopies;
      const totalBookCopies = totalAvailableCopies + issuedCopies;

      const users = await User.countDocuments();

      return res.json({
        totalBookCopies,
        availableCopies: totalAvailableCopies,
        issuedCopies,
        users
      });
    } else {
      const userIssues = await Issue.find({ userEmail, returned: false });
      return res.json({
        issuedCopies: userIssues.length
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Dashboard fetch failed', error: err.message });
  }
};

