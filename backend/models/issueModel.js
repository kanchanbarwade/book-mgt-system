const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userEmail: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  returned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Issue', issueSchema);
