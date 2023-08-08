// NPM Packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');


// LOCAL PACKAGES
const Today = require('./models/today');
const Section = require('./models/sections');
const Task = require('./models/tasks');
const Note = require('./models/notes');

// ROUTES IMPORT
const todayRoutes = require('./routes/today');
const inboxRoutes = require('./routes/inbox');
const noteRoutes = require('./routes/notes');

const { Schema } = mongoose;
const PORT = 3000;
const app = express();

// MONGOOSE FUNCTIONS
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todoDB');
  console.log('Connection open')
} 

// MIDDLEWARE FUNCTIONS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));



// ROUTES
app.use('/today', todayRoutes);
app.use('/inbox', inboxRoutes);
app.use('/notes', noteRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the homepage')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
