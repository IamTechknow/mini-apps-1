var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client')));

var getCSV = function(json) {
  // First, get the keys for the object which shall be the header.
  var keys = Object.keys(JSON.parse(json));
  var csv = keys.join() + '\n';
  
  // Iterate through each object starting from json, each time you do so, form a CSV line
  
  return csv;
};

app.post('/csv', (req, res, next) => {
  // Acquire submitted JSON. Assume it is valid JSON.
  var json = req.body.message;

  // Send response back as CSV
  res.set('Content-Type', 'text/plain');
  res.status(201).send(getCSV(json));
});

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
