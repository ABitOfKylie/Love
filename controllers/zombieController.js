var zombieController = function(Zombie){

	var post = function(req, res) {
        var zombie = new Zombie(req.body);

        if(!req.body.image){
        	res.status(400);
        	res.send("Image is required");
        }
        else{
        zombie.save();
        res.status(201);
        res.send(zombie);
    	}	
    }
    var get = function(req, res) {
    	var query = {};

    	if(req.query.genre){
    		query.genre = req.query.genre;
    	}
        Zombie.find(query, function(err, zombies) {
            if (err)
                res.status(500).send(err);
            else{

            	var returnZombies = [];
            	zombies.forEach(function(element, index, array){
            		var newZombie = element.JSON();	
            		newZombie.links = {};
            		// this loop for every zombie(book) it's going to send back the zombie + a link to get that individual zombie
            		// this returns each zombie: name, location, imageurl whatever  in the api list+ the hyperlink to view that particular zombie info only
            		newZombie.links.self = 'http://'+ req.headers.host + '/api/zombies/' + newZombie_id

            		returnZombies.push(newZombie);
            	});
                res.json(returnZombies);
            }
        }); 
}
// return that which the outside world will have access to/see
	return{
		post:post,
		get:get
	} 
}
module.exports = zombieController; 

