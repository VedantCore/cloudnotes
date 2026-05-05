const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled Note'
  },
  content: {
    type: String,
    default: ''
  },
  bookId: {
    type: String,
    default: 'Uncategorized'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);