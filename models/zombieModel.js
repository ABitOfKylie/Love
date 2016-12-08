var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var zombieModel = new Schema({
	name: {
		type: String
	},
		location: {type: String},
		image: {type: String},
		read: {type: Boolean, default: false}

	
});

module.exports = mongoose.model('zombie', zombieModel);