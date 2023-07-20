const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Importing the routes
const compression = require('compression');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

// Initializing the express app
const app = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB =
  'mongodb+srv://myAtlasDBUser:test123@myatlasclusteredu.8ul4ofr.mongodb.net/odin-localLibrary?retryWrites=true&w=majority';

// Wait for database to connect, logging an error if there is a problem
async function connectToDB() {
  await mongoose.connect(mongoDB);
}

connectToDB().catch((err) => console.log(err));

// const Genre = require('./models/genre');

// async function genreCreate(index, name) {
//   const genre = new Genre({ name });
//   await genre.save();
// }

// genreCreate(6, 'test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setting up the middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

// Declaring the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exporting the app
module.exports = app;
