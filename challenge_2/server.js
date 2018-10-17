var express = require('express');
var CSVParser = require('./CSVParser.js')
const path = require('path');

// Forms
var multer = require('multer');

var app = express();
var parser = new CSVParser();
const PORT = 3000;

var fileCount = 1;
var latestData = '';

// Middleware
app.use(multer().single('text'));
app.use(express.static(path.join(__dirname, './client')));

app.post('/csv', (req, res, next) => {
  // Acquire submitted JSON. Assume it is valid JSON.
  var json = req.file.buffer.toString();
  latestData = parser.readJSON(JSON.parse(json));
  
  // Send response back as JSON, client will create link
  res.writeHead(201, {'Content-Type': 'application/json'});
  res.end('{"result" : "/latest"}');
});

// Create route for the CSV file.
app.get('/latest', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=result.csv'});
  res.end(latestData);
});

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
