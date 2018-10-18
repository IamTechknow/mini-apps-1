var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './public')));

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
});
