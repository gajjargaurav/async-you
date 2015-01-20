var async = require('async')
  , wrapper = require('./httpwrapper');
var host = process.argv[2];
var port = process.argv[3];

function createUser(userId, callback){
  var postData = JSON.stringify({'user_id' : userId});
  var options = {
    hostname: host,
    port: port,
    path: '/users/create',
    method: 'POST'
  };
  wrapper.post(options,postData,callback);
}

async.series({
  post:function(done){
    async.times(5, function(n, next){
      createUser(++n, function(err, user){
        next(err,user)
      });
    },function(err, users) {
      if (err) return done(err);
        done(null, users);     
    }); 
  },
  get:function(done){
    var url = 'http://' + host + ':' + port + '/users';
    wrapper.get(url,done);
  }
},
  function(err, result){
      if (err) return console.error(err);
      console.log(result.get);
    });
