var express = require('express');
const path = require('path');

var app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './public')));

// TODO: Endpoints that will interact with the database

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
