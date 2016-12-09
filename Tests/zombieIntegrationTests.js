var should = require('should'),
	request = require('supertest'),
	app = require("../server.js"),
	mongoose = require('mongoose'),
	Zombie = mongoose.model("Zombie"),
	agent = require.agent(server);

describe("Zombie Crud Test", function(){
	it("Should allow a Zombie to be posted and return a read and _id" , function(done){
		var zombiePost = {name: 'new Zombie', image: 'boo', location: 'Disneyland'};
	})
}) 