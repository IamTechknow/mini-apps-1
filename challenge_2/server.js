var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './client')));

app.post('/csv', (req, res, next) => {
  console.log(req.body);
  res.status(201).send(req.body);
});

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});