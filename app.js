const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const logger = require('morgan');
const routes = require('./routes');

const app = express();


// view engine setup
app.engine(".handlebars", engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('404')
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

module.exports = app;
