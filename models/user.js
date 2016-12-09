const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
const SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
		
			username: {
				type:String, 
				required: "Username is Required", 
				// index: {unique: true}, 
				trim: true
			},

			password: {
				type: String, 
				required: "Password is Required", 
				unique: true, 
				trim: true, 
				validate: [
      				function(input) {
        				return input.length >= 6;
      				},
      			'Password should be longer.'
    			]
			},

    		email: {
    			type: String,
    			unique:true,
    			match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
  			},
			//password hash!
			 userCreated: {
    			type: Date,
    			default: Date.now
  			},

			relationships: {
				"Beach": {
					question: Number,
					score: Number
				},
				"Mansion": {
					question: Number,
					score: Number
				},
				"Swamp": {
					question: Number,
					score: Number
				},
				"Mystery": {
					question: Number,
					score: Number
				}

			}
});

// hash and authenticate below
// hash pw before it is saved
userSchema.pre('save', function(next){
	let user = this;
// only hash pw if it has been modified or new
	if(!user.isModified('password')) return next();
// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
	if (err) return next(err);
	// hash new pw using new salt
	bcrypt.hash(user.password, salt, function (err, hash){
		if (err) return next(err);
		// override the input password with the hashed one
		user.password = hash;
		next();
	});
});

});
// password verification
userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
  		if (err) return cb(err);
		cb(null, isMatch);
}

module.exports = mongoose.model('User', userSchema);


/*
users.js

This file creates and exports the User model for the
zombieAgain web app..


const
mongoose = require('mongoose'),
Schema   = mongoose.Schema;


var usersSchema = new Schema({
                        userName: String,
                          favNum: Number
                      });

//
usersSchema.methods.greet = function() {
  var greeting = 'Well hello ' + this.userName + '!\nYou\'re favorite number is: ' + this.favNum;

  console.log(greeting);
}

var
User = mongoose.model('User', usersSchema);

module.exports = User;
----------*/