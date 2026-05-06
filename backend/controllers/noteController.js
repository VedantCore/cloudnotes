const Note = require('../models/Note');

// @desc    Get all notes for the logged-in user
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    // Only fetch notes that belong to the user's JWT ID
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching notes' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const { title, content, bookId } = req.body;

    const newNote = new Note({
      user: req.user.id,
      title,
      content,
      bookId
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating note' });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Make sure the user actually owns the note they are trying to update
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating note' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Make sure the user actually owns the note they are trying to delete
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting note' });
  }
};

exports.getSharedNote = async (req, res) => {
  try {
    // We use .populate() to get the username of the author without exposing their email/password
    const note = await Note.findById(req.params.id).populate('user', 'username');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching shared note' });
  }
};