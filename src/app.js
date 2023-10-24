const express = require('express');
const morgan = require('morgan');

const mainRouter = require('./router/mainRouter');
const ErrorHandler = require('./utils/ErrorHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(mainRouter);
app.all('*', (req, res, next) => {
  next(
    new ErrorHandler(
      `Route ${req.originalUrl} does not exist`,
      404
    )
  );
});

app.use(errorHandler);

module.exports = app;
