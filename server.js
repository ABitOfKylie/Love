const express = require('express');
const exphbs = require('express-handlebars');
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

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// injecting Zombie variable from above
zombieRouter = require('./Routes/zombieRoutes')(Zombie);

app.use('/api/zombies', zombieRouter);
// app.use('/api/users', userRouter);


app.get("/", function( req, res){
	res.render('home');
}); 

var port = process.env.PORT || 8000;

app.listen(port, function(){
	console.log("Gulp is running my app on Port: " + port);
});

module.exports.app;