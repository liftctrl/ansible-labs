var express = require('express');
var app = express();

app.get('/', function(req, res){
res.send('Hello World!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Express server started successfully on port 3000');
});
