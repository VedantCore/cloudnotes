const express = require('express');
const router = express.Router();

// Just ONE single import line for all our controllers!
const { getNotes, createNote, updateNote, deleteNote, getSharedNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/notes/share/:id
// @desc    Get a note by ID for public sharing
// @access  Public (No token required)
router.get('/share/:id', getSharedNote);

// @route   GET /api/notes
// @desc    Get all notes for a user
// @access  Private (Requires Token)
router.get('/', protect, getNotes);

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private (Requires Token)
router.post('/', protect, createNote);

// @route   PUT /api/notes/:id
// @desc    Update a specific note
// @access  Private (Requires Token)
router.put('/:id', protect, updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a specific note
// @access  Private (Requires Token)
router.delete('/:id', protect, deleteNote);

module.exports = router;