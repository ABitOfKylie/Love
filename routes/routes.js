var User = require('../models/user');
var bcrypt = require('bcrypt');
var zCollection = require('../models/zombiescript')
var salt = 10;
// var Zombies = require('..models/zombiescript')
module.exports = function(app) {
        app.get('/', function(req, res) {
            res.render('home');
        });
        app.get('/signup', function(req, res) {
            res.render('signUp');
         // following validator-style   
         // res.render('signUp',{title:Form Validation, success: req.session.success; errors: req.session.errors});
         // req.session.errors = null;

        });


        app.post('/signUp', function(req, res) {
            // following belongs to validator
            // req.check('email','Invalid email address').isEmail();
            // req.check('password' "Password is invalid").isLength({min:4}).equals(req.body.confirmPassword);

            // var errors = req.validationErrors();
            // if(errors){
            //     req.session.errors = errors;
            // }
            var user = new User({username: req.body.username, email: req.body.email});
            bcrypt.genSalt(salt, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    user.password = hash;
                    user.save(function(err, res) {
                        if (err) throw err;
                        console.log('We saved: ', res);
                    })
                })
            })
            // console.log(req.body);
            res.redirect('/signUp');
        });

        app.get('/signin', function(req, res) {
            // res.render('signin', { message: req.flash('signinMessage') });
            res.render('signin');

            // 	if signin successful then res.redirect('/zChoice');
            // });
        });
        app.post('/signin', function(req, res) {
            User.findOne({email: req.body.email}, function(err, result) {
                console.log(err, result);
                if (result === null) {
                    return res.redirect('/signin');
                }
                else{
                    bcrypt.compare(req.body.password, result.password, function(err, result) {
                        console.log(result);
                        if(err) res.redirect('/signin');

                        return res.redirect('/zchoice');
                    })
                }
            })
        });


       

        // app.get('/profile', isLoggedIn, function(req, res) {
        //     res.render('profile', { user: req.user });
        // });
        // 	if signin successful then res.redirect('/zChoice');
        // });
        // app.get('/:username/:password', function(req, res){
        // 	var newUser = new User();
        // 	newUser.username = req.params.username;
        // 	newUser.password = req.params.password;
        // 	console.log(newUser.username + " " + newUser.password);
        // 	newUser.save(function(err){
        // 		if(err)
        // 			throw err;
        // 	});
        // 	res.send("Success!");
        // });
        // }) no longer in use testing only
        // redirect user to Facebook for authentication
        // app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

        // app.get('/auth/facebook/callback',
        //     passport.authenticate('facebook', {
        //         successRedirect: '/profile', //alt '/zChoice'
        //         failureRedirect: '/'
        //     }));



        // req.logout is a passport function that adds to express
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });


        function isLoggedIn(req, res, next) { // see line 33 calls function
            if (req.isAuthenticated()) {
                return next();
            }

            res.redirect('/signin');
        };

        app.get("/zChoice", function(req, res) {
            res.render('zChoice');
        });
        app.get("/snow", function(req, res) {
    		res.render('snow');
		});

		app.get("/swamp", function( req, res){
			res.render('swamp',{
				Question: zCollection.zombie1.questions[0].question,
                answer1: zCollection.zombie1.questions[0].responses[0].response,
                answer2: zCollection.zombie1.questions[0].responses[1].response,
                answer3: zCollection.zombie1.questions[0].responses[2].response,
				answer4: zCollection.zombie1.questions[0].responses[3].response
			});
		}); 

		app.get("/beach", function(req, res) {
		    res.render('beach');
		});
		app.get("/mansion", function(req, res) {
		    res.render('mansion');
		});

}; //this is final closing bracket -
