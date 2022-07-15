var express = require('express');
var app = express();
app.get('/', function (req, res) {
res.send("Welocme to GeeksforGeeks!");
});
app.listen(5000);