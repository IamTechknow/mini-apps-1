var express = require('express');
var CSVParser = require('./CSVParser.js')
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var parser = new CSVParser();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client')));

app.post('/csv', (req, res, next) => {
  // Acquire submitted JSON. Assume it is valid JSON.
  var json = req.body.message;

  // Send response back as CSV
  res.set('Content-Type', 'text/plain');
  res.status(201).send(parser.readJSON(JSON.parse(json)));
});

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
