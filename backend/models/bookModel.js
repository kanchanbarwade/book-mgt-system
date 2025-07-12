const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  isbn: { type: String, required: true, unique: true },
  category: String,
  copies: { type: Number, default: 1 }
});

module.exports = mongoose.model('Book', bookSchema);
