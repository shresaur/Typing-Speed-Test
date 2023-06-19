const sqlite3 = require('sqlite3').verbose();

// Create a new database object and connect to it
const db = new sqlite3.Database('./data.db');

// Create the users table
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`
  );
});

// Close the database connection
db.close();