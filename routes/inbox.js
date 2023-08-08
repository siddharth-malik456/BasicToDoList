const express = require('express');
const { campgroundSchema } = require( '../../../1-Coding/YelpCamp/schemas' );
const router = express.Router();
const app = express();
const Section = require('../models/sections');
const Task = require('../models/tasks');
const { taskSchema, sectionSchema } = require('../schemas');

const validateInbox = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new Error();
  } else {
    next();
  }
}
// CREATE NEW SECTION
router.get('/', async (req, res) => {
  const sections = await Section.find({}).populate('tasks');
  res.render('inbox/index', {sections});
})

router.get('/section/new', (req, res) => {
  res.render('inbox/section/new');
})

router.post('/section', async (req, res) => {
  const { name } = req.body;
  const newSection = new Section({name});
  await newSection.save() .then(console.log(newSection));
  res.redirect('/inbox');
})

// DELETE SECTION
router.delete('/:id/section', async (req, res) => {
  const { id } = req.params;
  const deletedSection = await Section.findByIdAndDelete(id);
  console.log(deletedSection);
  res.redirect('/inbox');
})

// UPDATE SECTION
router.get('/:id/section/edit', async (req, res) => {
  const { id } = req.params;
  const section = await Section.findById(id);
  res.render('inbox/section/edit', { section });
})
router.put('/:id/section', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedSection = await Section.findByIdAndUpdate(id, {name});
  console.log(updatedSection)
  res.redirect('/inbox');
})

// TASK ROUTES
// CREATE NEW TASK
router.get('/task/:sectionId/new', async (req, res) => {
  const { sectionId } = req.params;
  const section = await Section.findById(sectionId);
  res.render('inbox/task/new', { section });
})

router.post('/task/:sectionId', async (req, res) => {
  const { sectionId } = req.params;
  const { title, description, date} = req.body;
  const section = await Section.findById(sectionId).populate('tasks');
  const newTask = await new Task({title, description, dueDate: date});
  section.tasks.push(newTask);
  await section.save();
  await newTask.save();
  res.redirect('/inbox');
})

// DELETE TASK
router.delete('/:taskId/task', async (req, res) => {
  const { taskId } = req.params;
  const deletedTask = await Task.findByIdAndDelete(taskId);
  res.redirect('/inbox');
})

// UPDATE TASK
router.get('/:taskId/task/edit', async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  res.render('inbox/task/edit', { task });
})

router.put('/:taskId/task', async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body);
  res.redirect('/inbox');
})

module.exports = router;