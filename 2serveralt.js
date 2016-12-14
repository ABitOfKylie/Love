// these are example api routes. with partial jwt

// **************temp. api routes to be moved to api routes file when working***
// get an instance of the router for api routes
var apiRoutes = express.Router(); 


// TODO: route to authenticate a user (POST http://localhost:3000/api/authenticate)

// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// ****************end of temp api routes **********************

app.get('/setup', function(req, res) {

  // create a sample user
  var jane = new User({ 
    username: 'jane Cerminara', 
    password: 'password2',
    admin: true, 
  });

  // save the sample user
  jane.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        } else {
            res.send({
                message:'the new user has bees saved'
            });
        }           

    });
})

