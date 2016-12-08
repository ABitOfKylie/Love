var zombieController = function(zombie){

	var post = function(req, res) {
        var zombie = new Zombie(req.body);

        zombie.save();
        res.status(201).send(zombie);
    }
}


module.exports = zombieController; 