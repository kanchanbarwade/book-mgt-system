const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const requireAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

// router.get('/', bookController.getAllBooks);
// router.get('/isbn/:isbn', bookController.getBookByIsbn);
// router.post('/', bookController.createBook);
// router.put('/isbn/:isbn', bookController.updateBookByIsbn);
// router.delete('/isbn/:isbn', bookController.deleteBookByIsbn);

router.get('/', bookController.getAllBooks); // public

router.get('/isbn/:isbn', bookController.getBookByIsbn); // public

router.post('/', auth, requireAdmin, bookController.createBook);        // protected
router.put('/isbn/:isbn', auth, requireAdmin, bookController.updateBookByIsbn); // protected
router.delete('/isbn/:isbn', auth, requireAdmin, bookController.deleteBookByIsbn); // protected

module.exports = router;
