const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressValidator = require('express-validator')
// const passport = require('passport-local');
const flash = require('connect-flash');

  // mongoose.Promise = global.Promise;  //assert not recognized
    // assert.equal(query.exec().constructor, global.Promise);


// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// require('./config/passport')(passport);

// *********'love'is the name of the db.*************
// var db;

// if(process.env.ENV == "Test")
// 	db = mongoose.connect("mongodb://localhost:27017/love_test");
// else{
	// db = mongoose.connect("mongodb://localhost:27017/loveTest");
// }


// var User = require('./models/user');

// *******************
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// *******************

// use morgan to log requests to the console 
app.use(morgan('dev'));
app.use(cookieParser('secret string')); // session used to require cookie parser, after ver. 1.?, no longer required
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({secret: 'thisisUPtoyou',
				 saveUninitialized: true,  //persistant storage
				 maxAge: 60000,
				 resave: true}));
// app.set('superSecret', config.secret); // secret variable
// *********cookie - session test run************
// app.use('/cookie', function(req, res){
// 	res.send('cookie/session in action!');
// 	console.log(req.cookies);
// 	console.log('================');
// 	console.log(req.session);
// });

// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions must come AFTER express session

//***************connect-flash tester********
// app.use(flash()); // use connect-flash for flash messages stored in session
	//  app.all('/', function(req, res){
	//   req.flash('test', 'it worked');
	//   res.redirect('/test')
	// });

	// app.all('/test', function(req, res){
	//   res.send(JSON.stringify(req.flash('test')));
	// });

	// app.use(function(req,res,next){
	// 	res.locals.message= req.flash();
	// 	next();
	// });

// *********************Routers***************
// you will need following 2 lines when you divide up routers into auth and secure in the routes folder.
// var authRouter = require('./routes/authRoutes');

// app.use('auth/authRouter');

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


require('./routes/routes.js')(app);


var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Gulp is running my app on Port: " + port);
	console.log('Magic happens at http://localhost:' + port);

});

// module.exports = app;