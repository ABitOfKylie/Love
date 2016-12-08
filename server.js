const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// 'love'is the name of the db.
var db;

if(process.env.ENV == "Test")
	db = mongoose.connect("mongodb://localhost/love_test");
else{
	db = mongoose.connect("mongodb://localhost/love");
}

var Zombie = require('./models/zombieModel');



var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// injecting Zombie variable from above
zombieRouter = require('./Routes/zombieRoutes')(Zombie);

app.use('/api/zombies', zombieRouter);
// app.use('/api/users', userRouter);


app.get("/", function( req, res){
	res.send('Welcome to my API!');
}); 

app.listen(port, function(){
	console.log("Gulp is running my app on Port: " + port);
});

module.exports.app;