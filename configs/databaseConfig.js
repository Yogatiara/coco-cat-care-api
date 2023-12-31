const mysql = require('mysql2');

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const mysqlDatabase = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

mysqlDatabase.connect((err) => {
  if (err) {
    console.error(
      `Unable to connect to the database: ${err}`
    );
  } else {
    console.log('Success connect to database');
  }
});

module.exports = mysqlDatabase.promise();
