var express = require('express');
const path = require('path');
const multer = require('multer');
const insertToMongo = require('./db');

var app = express();
const PORT = 3000;

app.use(multer().none());
app.use(express.static(path.join(__dirname, './public')));

// Create objects encompassing the account, personal, and payment info
// Then save them to a database and send a success response.
app.post('/checkout', (req, res, next) => {
  insertToMongo(req.body)
  .then(result => {
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end('{"success" : true}');
  });
});

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
