// var express = require('express');

// var routes = function(zombie) {
//     var zombieRouter = express.Router();

// // using controllers for Unit Testing
//     var zombieController = require('../controllers/zombieController')(zombieController)
//     zombieRouter.route('/')
//         .post(zombieController.post) 
//         .get(zombieController.get);
//     zombieRouter.use('/:zombieId', function(req, res, next) {
//         Zombie.findById(rq.params.zombieId, function(err, zombie) {
//             if (err)
//                 res.status(500).send(err);
//             else if(zombie)
//             {
//             	req.zombie= zombie;
//             	next();
//             }
//             else
//         	{
//         		res.status(404).send('no zombie found');
//         	}
//         });
//     }); 
//     zombieRouter.route('/:zombieId')
//         .get(function(req, res) {

//         	var returnZombie = req.zombie.toJSON();
//         	returnZombie.links = {};
//         	var newLink = 'http://'+ req.headers.host + '/api/zombies/?location=' + returnZombie.location;
//         	returnZombie.links.FilterByThisLocation = newLink.replace(" ", '%20');
//         	res.json(returnZombie);

//         }) 
//         // put will allow user to change the data in the db. (ex. username/password - just using Zombie now for testing)
//         .put(function(req, res) {
            
//             req.zombie.name = req.body.title;
//             req.zombie.location = req.body.location;
//             req.zombie.read = req.body.read;
//             req.zombie.save(function(err){
//     			if(err)
//     				res.status(500).send(err);
//     			else{
//            			res.json(req.zombie);
//     			}
//     		});

//          })
//         .patch(function(req,res){
//         	if(req.body._id)
//         		delete req.body._id; 

//         	for(var p in req.body)
//     		{
//     			req.zombie[p] = req.body[p];
//     		}

//     		req.zombie.save(function(err){
//     			if(err)
//     				res.status(500).send(err);
//     			else{
//            			res.json(req.zombie);
//     			}
//     		});

//         })
//         .delete(function(req,res){
//         	req.zombie.remove(function(err){
//         		if(err)
//     				res.status(500).send(err);
//     			else{
//            			res.status(204).send("Removed");
//     			}
//     		});
//         });
//     return zombieRouter;
// };

// module.exports = routes;
