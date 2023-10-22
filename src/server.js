const app = require('./app');

const { PORT, HOST } = process.env;

const server = app.listen(PORT, () => {
  console.log(
    `Local is running : http://${HOST}:${PORT} `
  );
});

module.exports = server;
