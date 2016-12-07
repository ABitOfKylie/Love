/*
config.js

Configuration code for zombieAgain
web app..
*/

var
path = require('path'),
env  = process.env.NODE_ENV || 'development',
port = process.env.PORT || 3000,
root = path.normalize(__dirname + '/..');



//Configuration object..
module.exports = {
            root: root,
             app: {
               name: 'zombieAgain'
             },
            port: port,
              db: 'mongodb://localhost/' + env,
      cookiePass: ''
               };
