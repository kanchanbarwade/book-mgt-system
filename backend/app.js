const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const app = express();


app.use(cors()); //mension url, methods to restrict from accessing
app.use(express.json());

// router.post('/', auth, bookController.createBook);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/issues', issueRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Book Management Backend API');
});

module.exports = app;
