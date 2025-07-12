const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const auth = require('../middleware/auth');

router.post('/issue', auth, issueController.issueBook);
router.put('/return/:issueId', auth, issueController.returnBook);
router.get('/', auth, issueController.getIssuedBooks);

module.exports = router;
