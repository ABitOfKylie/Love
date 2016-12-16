// // const passport = require('passport');

// var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;


// var User = require('../models/user'); //check pathway!!! (previously declared in server.js)
// var configAuth = require('./auth');

// module.exports = function(passport) {

// 	passport.serializeUser(function(user, done){
// 		done(null, user.id);
// 	});

// 	passport.deserializeUser(function(userid, done){
// 		User.findById(id, function(err, user){
// 			done(err, user);
// 		});
// 	});


// 	passport.use('local-signup', new LocalStrategy({
// 		usernameField: 'username',
// 		emailField: 'email',
// 		passwordField: 'password',
// 		// don't think passwordConfirm is necessary
// 		passReqToCallback: true
// 	},

// function(req, username, email, password, done){
// 		process.nextTick(function(){
// 			User.findOne({'username': username}, function(err, user){
// 				if(err)
// 					return done(err);
// 				if(user){
// 					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
// 				// } 
// 				// if(!req.user) {
// 				// 	var newUser = new User();
// 				// 	newUser.username = username;
// 				// 	newUser.email = email;
// 				// 	newUser.password = newUser.generateHash(password);
// 				// 	newUser.save(function(err){
// 				// 		if(err)
// 				// 			throw err;
// 				// 		return done(null, newUser);
// 				// 	})
// 				} else {
// 					var user = req.user;
// 					user.username = username;
// 					user.email = email;
// 					user.password = user.generateHash(password);

// 					user.save(function(err){
// 						if(err)
// 							throw err;
// 						return done(null, user);
// 					})
// 				}
// 			})

// 		});
// 	}));
// 	passport.use('local-signin', new LocalStrategy({
// 			usernameField: 'username',
// 			emailField: 'email',
// 			passwordField: 'password',
// 			passReqToCallback: true
// 		},
// 		function(req, username, email, password, done){
// 			process.nextTick(function(){
// 				User.findOne({ 'username': username}, function(err, user){
// 					if(err)
// 						return done(err);
// 					if(!user)
// 						return done(null, false);
// 					if(user.password.validPassword(password) != password){
// 						return done(null, false);
// 					}
// 					return done(null, user);

// 				});
// 			});
// 		}
// 	));

// // passport.use(new FacebookStrategy({
// // 	    clientID: configAuth.facebookAuth.clientID,
// // 	    clientSecret: configAuth.facebookAuth.clientSecret,
// // 	    callbackURL: configAuth.facebookAuth.callbackURL
// // 	  },
// // 	  function(accessToken, refreshToken, profile, done) {
// // 	    	process.nextTick(function(){
// // 	    		User.findOne({'facebook.id': profile.id}, function(err, user){
// // 	    			if(err)
// // 	    				return done(err);
// // 	    			if(user)
// // 	    				return done(null, user);
// // 	    			else {
// // 	    				var newUser = new User();
// // 	    				newUser.facebook.id = profile.id;
// // 	    				newUser.facebook.token = accessToken;
// // 	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
// // 	    				newUser.facebook.email = profile.emails[0].value; 

// // 	    				newUser.save(function(err){
// // 	    					if(err)
// // 	    						throw err;
// // 	    					return done(null, newUser);
// // 	    				})
// // 	    				console.log(profile);
// // 	    			}
// // 	    		});
// // 	    	});
// // 	    }

// // 	));

// };