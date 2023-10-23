const express = require('express');
const morgan = require('morgan');

const mainRouter = require('./router/mainRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(mainRouter);

app.all('*', (req, res) => {
  return res.status(404).json({
    status: 'failed',
    message: 'Route does not exist',
  });
});

module.exports = app;
