const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const config = require('../config.js');


// Create a new database object and connect to it
const db = new sqlite3.Database('./data.db');

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/login', (req,res) => {
    res.render('login')

})

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      if (!row) {
        return res.status(401).send('Invalid username or password');
      }

      // Compare the provided password with the stored hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, row.password);

      if (!isPasswordValid) {
        return res.status(401).send('Invalid username or password');
      }

      // Generate a JWT token
      const token = jwt.sign({ username }, config.jwtSecretKey);

      // Send the token in the response
      res.status(200).json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  
router.get('/register', (req, res) => {
    res.render('register')
 
 })
 
// User registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      if (row) {
        return res.status(409).send('Username already exists');
      }

      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        // Save the user details in the database
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }

          res.status(201).send('User created successfully');
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;