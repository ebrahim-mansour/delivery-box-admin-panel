const express = require('express');
// const users = require('./models/users');
const path = require('path');

// Initializing Express and port number
const app = express();
const port = process.env.port || 3000;

// serve static files such as images, CSS files, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/trips', (req, res) => {
  res.sendFile('trips.html');
});

app.get('/availableDrivers', (req, res) => {
  res.sendFile('availableDrivers.html');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});