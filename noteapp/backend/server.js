const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with local storage for a real application)
let notes = [];

// Routes
// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update a note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index !== -1) {
    notes[index] = { ...notes[index], title, content };
    res.json(notes[index]);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index !== -1) {
    notes.splice(index, 1);
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
