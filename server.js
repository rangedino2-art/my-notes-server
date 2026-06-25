const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// GET all notes
app.get('/api/notes', (req, res) => {
  const data = fs.existsSync('notes.json')
    ? JSON.parse(fs.readFileSync('notes.json'))
    : [];
  res.json(data);
});

// SAVE a note
app.post('/api/notes', (req, res) => {
  const notes = fs.existsSync('notes.json')
    ? JSON.parse(fs.readFileSync('notes.json'))
    : [];
  const note = { id: Date.now(), ...req.body };
  notes.push(note);
  fs.writeFileSync('notes.json', JSON.stringify(notes));
  res.json(note);
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  let notes = fs.existsSync('notes.json')
    ? JSON.parse(fs.readFileSync('notes.json'))
    : [];
  notes = notes.filter(n => n.id != req.params.id);
  fs.writeFileSync('notes.json', JSON.stringify(notes));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
