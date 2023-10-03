const express = require('express');
const router = express.Router();

const Note = require('../models/notes');


// // NOTES ROUTES
// ADD NEW NOTE

router.get('/new', (req, res) => {
  res.render('notes/new');
})

router.post('/', async (req, res) => {
  const { heading, description, dateCreated } = req.body;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const newNote = await new Note({heading, description, dateCreated: currentDate});
  await newNote.save();
  res.redirect('/notes');
})

// SHOW ALL NOTES

router.get('/', async (req, res) => {
  const colours = ['#FDC1C1', '#FFF6A1', '#CDCCFF', '#FEC7FF', '#FFD29D', '#B4FFBB', '#FFE49E', '#C5FFB0', '#FFC9FA']
  const notes = await Note.find({});
  res.render('notes/index', {notes, colours});
})

// DELETE NOTE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  res.redirect('/notes');
})

// EDIT NOTE
router.get('/:id/edit', async(req, res) => {
  const { id } = req.params;
  const updatedNote = await Note.findById(id);
  res.render('notes/edit', {note:updatedNote});
})

// SEARCH NOTES
router.get('/search', async(req, res) => {
  const colours = ['#FDC1C1', '#FFF6A1', '#CDCCFF', '#FEC7FF', '#FFD29D', '#B4FFBB', '#FFE49E', '#C5FFB0', '#FFC9FA']
  const { search } =  req.query;
  const notes = await Note.find({heading: { $regex: `^${search}`, $options: 'i' }});
  res.render('notes/search', {notes, colours, search})
})
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(id, req.body);
  res.redirect('/notes');
})

module.exports = router;