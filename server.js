var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.listen(5000, function(){
    console.log("Magic happens now at port 5000");
});
