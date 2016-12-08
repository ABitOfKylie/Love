var should = require('should'),
	sinon = require('sinon');

describe('Zombie Controller Tests', function(){
	describe('Post', function(){
		it('should not allow a empty title on post', function(){
			var Zombie = function(zombie){this.save = function(){}};

			var req = {
				body: {
					name: 'Swamp'
				}
			}

			var res = {
				// creating a spy that is going to keep track of what is called, what with, how many times
				status: sinon.spy(),
					send: sinon.spy()
			} 
			var zombieController = require ('../controllers/zombieController')(Zombie);

			zombieController.post(req,res); 

			res.status.calledWith(400).should.equal(true, "Bad Status " + res.status.args[0][0]);
			res.send.calledWith('Image is required').should.equal(true);
		})
	})
})   