var http = require('http')
  , async = require('async');
var host = process.argv[2];
var port = process.argv[3];
var post = function (options, data, callback) {
  var req = http.request(options, function(res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk.toString();
    });
    res.on('end', function(chunk){
        callback(null, body);
    });
  });
  req.on('error', function(e) {
    callback(e);
  });

  req.write(data);
  req.end();
 }

var get = function(url,callback){
  var body = '';
  http.get(url.toString().trim(), function(res){
    res.on('data', function(chunk){
      body += chunk.toString();
    });
    res.on('end', function(chunk){
      callback(null, body);
    });
    }).on('error', function(err) {
      callback(err);
    });
}

function createUser(userId, callback){
  var postData = JSON.stringify({'user_id' : userId});
  var options = {
    hostname: host,
    port: port,
    path: '/users/create',
    method: 'POST'
  };
  post(options,postData,callback);
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
    get(url,done);
  }
},
  function(err, result){
      if (err) return console.error(err);
      console.log(result.get);
    });
