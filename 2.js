var http = require('http')
 	, async = require('async');
function getData(data, cb){
        var body = '';
        http.get(data.toString().trim(), function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });

          res.on('end', function(chunk){
            cb(null, body);
          });
        }).on('error', function(err) {
          cb(err);
        });
      }
 async.series({
 	requestOne: function(done){
 		 getData(process.argv[2], done);
 	},
 	requestTwo: function(done){
 		 getData(process.argv[3], done);
 	}
 }, function(err, result){
 	if (err) return console.error(err);
      console.log(result);
 });