const Joi = require('Joi');

module.exports.noteSchema = Joi.object({
  heading: Joi.string().min(1).max(30).required(),
  description: Joi.string().min(1).max(1000).required(), 
  dateCreated: Joi.string().required(),
})

module.exports.sectionSchema = Joi.object({
  name: Joi.string().required(),
  tasks: Joi.string().hex().length(24),
})

module.exports.taskSchema = Joi.object({
  title: Joi.string().required(),
  descirption: Joi.string().required(),
  dueDate: Joi.string().required(),
})

module.exports.todaySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  currentDate: Joi.string(),
})