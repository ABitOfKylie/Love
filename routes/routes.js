// need to tweak lines 4, 5, 8,10,11  right now req.params comes from url
var User = require('./models/user');
module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('home');
	});

	app.get('/signin', function(req, res){
		res.render('signin', { message: req.flash('signinMessage') });


	// 	if signin successful then res.redirect('/zChoice');
	// });
	});
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/zChoice',  //alt '/profile'
		failureRedirect: '/signin',
		failureFlash: true
	}));

	
	app.get('/signup', function(req, res){
		res.render('signUp',{ message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/zChoice', // alt '/profile'
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile', {user: req.user});
	});
	// 	if signin successful then res.redirect('/zChoice');
	// });
	// app.get('/:username/:password', function(req, res){
	// 	var newUser = new User();
	// 	newUser.username = req.params.username;
	// 	newUser.password = req.params.password;
	// 	console.log(newUser.username + " " + newUser.local.password);
	// 	newUser.save(function(err){
	// 		if(err)
	// 			throw err;
	// 	});
	// 	res.send("Success!");

	// }) no longer in use testing only
	// redirect user to Facebook for authentication
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/zChoice', //alt '/profile'
	                                      failureRedirect: '/' }));



// req.logout is a passport function that adds to express
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

	function isLoggedIn(req, res, next) {  // see line 33 calls function
		if(req.isAuthenticated()){
			return next();
		}

		res.redirect('/signin');
	}

	app.get("/zChoice", function( req, res){
			res.render('zChoice');
	});
} //this is final closing bracket - 
