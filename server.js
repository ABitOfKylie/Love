const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const passport = require('passport-local');
const flash = require('connect-flash');



const path = require('path');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

require('./config/passport')(passport);


// *********'love'is the name of the db.*************
var db;

if(process.env.ENV == "Test")
	db = mongoose.connect("mongodb://localhost/love_test");
else{
	db = mongoose.connect("mongodb://localhost/love");
}

var Zombie = require('./models/zombieModel');
var User = require('./models/user');

// *******************
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// *******************

// use morgan to log requests to the console 
app.use(morgan('dev'));
app.use(cookieParser()); // session used to require cookie parser, after ver. 1.?, no longer required
app.use(session({secret: 'thisisUPtoyou',
				 saveUninitialized: true,  //persistant storage
				 resave: true}));

// *********cookie - session test run************
// app.use('/cookie', function(req, res){
// 	res.send('cookie/session in action!');
// 	console.log(req.cookies);
// 	console.log('================');
// 	console.log(req.session);
// });


// app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions must come AFTER express session
app.use(flash()); // use connect-flash for flash messages stored in session


// injecting Zombie variable from above
// zombieRouter = require('./Routes/zombieRoutes')(Zombie);

// app.use('/api/zombies', zombieRouter);
// app.use('/api/users', userRouter);
// var zCollection = require('./models/zombiescript');

// app.get("/swamp", function( req, res){
// 	// var currQuestion = {zCollection, zombie1:questions.question[0]};

// 	res.render('swamp',{
// 		// Question: {currQuestion},
// 		answer1: 'Yes it does',
// 		answer2: 'oh yeah',
// 		answer3: 'looking good'

// 	});
// }); 

// app.get("/", function( req, res){
// 	res.render('home');
// }); 

// app.get("/zChoice", function( req, res){
// 	res.render('zChoice');
// }); 

// app.get("/snow", function( req, res){
// 	res.render('snow');
// }); 

// // app.get("/swamp", function( req, res){
// // 	res.render('swamp',{
// // 		Question: {speechzombie1.questions[0]},
// // 		answer1: 'Yes it does'
// // 	});
// // }); 

// app.get("/beach", function( req, res){
// 	res.render('beach');
// }); 
// app.get("/mansion", function( req, res){
// 	res.render('mansion');
// }); 

// app.get("/signin", function( req, res){
// 	res.render('signin');
// }); 

// app.get("/frog", function( req, res){
// 	res.render('frog');
// }); 

require('./routes/routes.js')(app, passport);


var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Gulp is running my app on Port: " + port);
	console.log('Magic happens at http://localhost:' + port);

});

module.exports.app;