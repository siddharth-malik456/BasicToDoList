const express = require('express');
const router = express.Router();
const Today = require('../models/today');
// SHOW ALL TODAY TODOS
router.get('/', async (req, res) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const todays = await Today.find({currentDate: currentDate});
  const overdues = await Today.find({currentDate: {$not : {$eq: currentDate}}});
  res.render('today/index', { todays, overdues, currentDate });
})

// ADD NEW TODO
router.get('/new', async (req, res) => {
  res.render('today/new');
})

router.post('/', async(req, res) => {
  const { title, description } = req.body;
  const todays = await Today.find({});
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const newtodo = await new Today({title, description, currentDate: currentDate});
  await newtodo.save() .then(console.log(newtodo));
  res.redirect('/today');
})

// DELETE TODO
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Today.findByIdAndDelete(id);
  res.redirect('/today');
})

// UPDATE TODO
router.get('/:id/edit', async(req, res) => {
  const { id } = req.params;
  const todo = await Today.findById(id);
  res.render('today/edit', {todo});
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Today.findByIdAndUpdate(id, req.body);
  res.redirect('/today');
})

module.exports = router;