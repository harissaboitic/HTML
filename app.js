const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // replace with your MySQL host
  user: 'your_username', // replace with your MySQL username
  password: 'your_password', // replace with your MySQL password
  database: 'your_database_name' // replace with your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// Get criminal news
app.get('/api/criminal', (req, res) => {
  const query = 'SELECT * FROM news WHERE title LIKE "%criminal%"';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});