var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gundamRouter = require('./routes/gundam.js');
var hotwheelRouter = require('./routes/hotwheel.js');


var mongoose = require('mongoose')
//var db = "mongodb://localhost:27017/toystore";
var db = 'mongodb+srv://admin:admin@cluster0.nrru4jv.mongodb.net/toystore'
mongoose.connect(db, { useNewUrlParser: true})

var hbs = require('hbs')
hbs.registerHelper('equal', require('handlebars-helper-equal'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/gundam', gundamRouter);
app.use('/hotwheel', hotwheelRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log("http://localhost:7000")
})

module.exports = app;
