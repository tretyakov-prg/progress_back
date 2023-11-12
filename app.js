var createError = require('http-errors');
var express = require('express');
const fs = require("fs");
var path = require('path');
require('dotenv/config');
const bodyParser = require("body-parser");
const cors = require('cors');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var indexRouter = require('./routes/index.router');
var JWTRouter = require('./routes/jwt.router');
var TaskRouter = require('./routes/task.router');

const Port = process.env.PORT || 7000
//var logger = morgan('combined');
var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('short', { stream: accessLogStream }))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// view engine setup
//app.use('/',    indexRouter);
app.use('/jwt', JWTRouter);
app.use('/task', TaskRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(Port, function () {
    console.debug(`Node server is running localhost:${Port}`);
})
.on('error', (e) => {
  console.log('Error happened: ', e.message)
});