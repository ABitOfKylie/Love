const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// 'love'is the name of the db.
var db;

if(process.env.ENV == "Test")
	db = mongoose.connect("mongodb://localhost/love_test");
else{
	db = mongoose.connect("mongodb://localhost/love");
}

var Zombie = require('./models/zombieModel');
var User = require('./models/user');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// injecting Zombie variable from above
// zombieRouter = require('./Routes/zombieRoutes')(Zombie);

// app.use('/api/zombies', zombieRouter);
// app.use('/api/users', userRouter);


app.get("/", function( req, res){
	res.render('home');
}); 

app.get("/zChoice", function( req, res){
	res.render('zChoice');
}); 

app.get("/snow", function( req, res){
	res.render('snow');
}); 

app.get("/swamp", function( req, res){
	res.render('swamp');
}); 

app.get("/beach", function( req, res){
	res.render('beach');
}); 
app.get("/mansion", function( req, res){
	res.render('mansion');
}); 

app.get("/signin", function( req, res){
	res.render('signin');
}); 

app.get("/frog", function( req, res){
	res.render('frog');
}); 


var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Gulp is running my app on Port: " + port);
});

module.exports.app;